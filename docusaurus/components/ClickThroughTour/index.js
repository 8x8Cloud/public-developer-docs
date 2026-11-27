import React, {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import clsx from 'clsx';
import Accordion from '@8x8/oxygen-accordion';
import Button from '@8x8/oxygen-button';
import Tabs, { Tab } from '@8x8/oxygen-tabs';
import { ContractIcon, ExpandIcon } from '@8x8/oxygen-icon';
import { clamp, placeCallout } from './placement';
import styles from './styles.module.css';

// Docusaurus renders pages on the server, where useLayoutEffect warns.
const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// Below this screenshot width the callout would hide too much of the screen,
// so it moves under the screenshot instead of floating over it.
const OVERLAY_MIN_WIDTH = 720;

/**
 * @typedef {object} Chapter
 * @property {string|number} id Referenced by `Step.chapter`.
 * @property {string} label Shown on the chapter tab, in the transcript, and
 *   as the default kicker of the chapter's steps.
 */

/**
 * @typedef {object} Step
 * @property {string} image Screenshot URL, usually `require('./x.jpg').default`.
 * @property {[number, number, number, number]} rect Spotlight as
 *   `[x, y, width, height]`, each a fraction (0–1) of the screenshot's width
 *   (x, width) or height (y, height). Fractions survive re-exporting the
 *   screenshot at another resolution.
 * @property {string} title Callout heading.
 * @property {string} text Callout body.
 * @property {string|number} [chapter] A `Chapter.id`. Required when the tour
 *   has chapters.
 * @property {string} [kicker] Small label above the title. Defaults to the
 *   step's chapter label.
 * @property {string} [note] Secondary line below the body.
 * @property {string} [alt] Screenshot alt text. Defaults to `title`.
 */

function StepText({ step, kicker }) {
  return (
    <>
      {kicker && <div className={styles.kicker}>{kicker}</div>}
      <p className={styles.title}>{step.title}</p>
      <p className={styles.body}>{step.text}</p>
      {step.note && <p className={styles.note}>{step.note}</p>}
    </>
  );
}

// Consecutive steps that share a chapter, with each step's index in `steps`,
// so the transcript numbers steps correctly even if a chapter's steps are
// split up or a step names a chapter that doesn't exist.
function groupByChapter(steps) {
  const groups = [];
  steps.forEach((step, i) => {
    const prev = groups[groups.length - 1];
    if (prev && prev.chapter === step.chapter) prev.items.push({ step, i });
    else groups.push({ chapter: step.chapter, items: [{ step, i }] });
  });
  return groups;
}

/**
 * ClickThroughTour steps through product screenshots like a carousel. Each
 * step spotlights one area of a screenshot and explains it in a callout.
 * See technical-notes/click-through-tour.md.
 *
 * @param {object} props
 * @param {string} props.title Accessible name of the tour.
 * @param {Step[]} props.steps The steps, in order. At least one.
 * @param {Chapter[]} [props.chapters] Optional chapters. With two or more,
 *   tabs above the screenshot jump to each chapter's first step.
 * @param {string} [props.imageAltPrefix] Prepended to each screenshot's alt
 *   text, for example "8x8 Resolve screen" gives "8x8 Resolve screen: <title>".
 *
 * @example
 * <ClickThroughTour
 *   title="Quick tour"
 *   imageAltPrefix="8x8 Resolve screen"
 *   chapters={[{ id: 1, label: 'The six areas' }]}
 *   steps={[{ chapter: 1, image: require('./a.jpg').default,
 *     rect: [0.004, 0.083, 0.139, 0.298],
 *     title: 'Six areas, one menu', text: '…' }]}
 * />
 */
export default function ClickThroughTour({
  title,
  chapters = [],
  steps = [],
  imageAltPrefix,
}) {
  const [index, setIndex] = useState(0);
  const [stageWidth, setStageWidth] = useState(0);
  const [loadedSrc, setLoadedSrc] = useState(null);
  // Width / height of the current screenshot, read when it loads. Full
  // screen uses it to fit the screenshot to the viewport height.
  const [aspect, setAspect] = useState(null);
  const [geo, setGeo] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const [transcriptOpen, setTranscriptOpen] = useState(false);

  const rootRef = useRef(null);
  const imgRef = useRef(null);
  const tipRef = useRef(null);
  const stageRef = useRef(null);
  const stageId = useId();
  const tabId = chapterId => `${stageId}-tab-${chapterId}`;
  const hasTabs = chapters.length > 1;

  const step = steps[index];
  const last = steps.length - 1;
  const overlay = stageWidth >= OVERLAY_MIN_WIDTH;
  const chapterOf = id => chapters.find(c => c.id === id);
  const kicker = step && (step.kicker ?? chapterOf(step.chapter)?.label);

  const go = useCallback(n => setIndex(clamp(n, 0, last)), [last]);

  if (process.env.NODE_ENV !== 'production' && !steps.length) {
    console.warn(`ClickThroughTour "${title}": no steps, so nothing renders.`);
  }

  // Track the screenshot's rendered width.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(([entry]) =>
      setStageWidth(entry.contentRect.width),
    );
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  // Preload the neighbouring screenshots so Back and Next don't flash,
  // without downloading the whole tour up front.
  useEffect(() => {
    [index - 1, index + 1].forEach(n => {
      if (steps[n]) new Image().src = steps[n].image;
    });
  }, [index, steps]);

  // A cached image can finish loading before React attaches onLoad.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth) onImageLoad();
  }, [step?.image]);

  useEffect(() => {
    setCanFullscreen(Boolean(document.fullscreenEnabled));
    const onChange = () =>
      setFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  function onImageLoad() {
    const img = imgRef.current;
    if (!img) return;
    setLoadedSrc(img.currentSrc || img.src);
    setAspect(img.naturalWidth / img.naturalHeight);
  }

  const measure = useCallback(() => {
    const img = imgRef.current;
    if (!step || !img || !img.naturalWidth || !img.clientWidth) return;
    const W = img.clientWidth;
    const H = img.clientHeight;
    const [fx, fy, fw, fh] = step.rect;
    const spot = { x: fx * W, y: fy * H, w: fw * W, h: fh * H };
    let tip = null;
    if (overlay && tipRef.current) {
      tip = placeCallout(
        spot,
        { w: tipRef.current.offsetWidth, h: tipRef.current.offsetHeight },
        { w: W, h: H },
      );
    }
    setGeo({
      index,
      spot: { left: spot.x, top: spot.y, width: spot.w, height: spot.h },
      tip,
    });
  }, [index, overlay, step]);

  useIsoLayoutEffect(() => {
    measure();
  }, [measure, loadedSrc, stageWidth, fullscreen]);

  // Web fonts change the callout's size, so measure again once they load.
  useEffect(() => {
    let active = true;
    document.fonts?.ready?.then(() => {
      if (active) measure();
    });
    return () => {
      active = false;
    };
  }, [measure]);

  if (!step) return null;

  function onKeyDown(e) {
    // Alt/Cmd + arrow is the browser's Back and Forward. Leave it alone.
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(index - 1);
    }
  }

  function toggleFullscreen() {
    // Browsers can refuse full screen (an embedding frame, a user setting).
    // The tour still works inline, so a refusal is not an error.
    const request = document.fullscreenElement
      ? document.exitFullscreen()
      : rootRef.current?.requestFullscreen?.();
    request?.catch?.(() => {});
  }

  const ready = geo && geo.index === index;
  const chapterStart = id => steps.findIndex(s => s.chapter === id);
  const alt = step.alt ?? step.title;

  return (
    <div className={styles.tourWrap}>
      <section
        ref={rootRef}
        className={clsx(styles.tour, fullscreen && styles.isFullscreen)}
        style={aspect ? { '--tour-aspect': aspect } : undefined}
        aria-roledescription="carousel"
        aria-label={title}
        onKeyDown={onKeyDown}
      >
        {(hasTabs || canFullscreen) && (
          <div className={styles.topBar}>
            {hasTabs && (
              <Tabs aria-label="Chapters" className={styles.chapters}>
                {chapters.map((c, n) => (
                  <Tab
                    key={c.id}
                    value={c.id}
                    isActive={step.chapter === c.id}
                    isDisabled={chapterStart(c.id) === -1}
                    id={tabId(c.id)}
                    aria-controls={stageId}
                    onClick={(_, id) => go(chapterStart(id))}
                  >
                    {n + 1}. {c.label}
                  </Tab>
                ))}
              </Tabs>
            )}
            {canFullscreen && (
              <Button
                className={styles.fullscreenBtn}
                variant="tertiary"
                size="small"
                iconLeft={
                  fullscreen ? (
                    <ContractIcon aria-hidden="true" />
                  ) : (
                    <ExpandIcon aria-hidden="true" />
                  )
                }
                onClick={toggleFullscreen}
              >
                {fullscreen ? 'Exit full screen' : 'Full screen'}
              </Button>
            )}
          </div>
        )}

        <div
          ref={stageRef}
          id={stageId}
          className={styles.stage}
          {...(hasTabs && {
            role: 'tabpanel',
            'aria-labelledby': chapterOf(step.chapter)
              ? tabId(step.chapter)
              : undefined,
          })}
        >
          <img
            ref={imgRef}
            src={step.image}
            alt={imageAltPrefix ? `${imageAltPrefix}: ${alt}` : alt}
            className={styles.shot}
            onLoad={onImageLoad}
          />
          <div
            className={styles.spot}
            style={ready ? geo.spot : { visibility: 'hidden' }}
            aria-hidden="true"
          />
          {overlay && (
            <div
              ref={tipRef}
              className={styles.tip}
              style={ready && geo.tip ? geo.tip : { visibility: 'hidden' }}
              aria-live="polite"
            >
              <StepText step={step} kicker={kicker} />
            </div>
          )}
        </div>
        {!overlay && (
          <div className={styles.panel} aria-live="polite">
            <StepText step={step} kicker={kicker} />
          </div>
        )}

        <div className={styles.controls}>
          {/* Oxygen Button sets aria-disabled, not disabled, so Back keeps
              focus on the first step and the arrow keys keep working. */}
          <Button
            variant="secondary"
            onClick={() => go(index - 1)}
            isDisabled={index === 0}
          >
            Back
          </Button>
          <div className={styles.dots} role="group" aria-label="Steps">
            {steps.map((s, n) => (
              <button
                key={n}
                type="button"
                className={clsx(styles.dot, n === index && styles.dotOn)}
                aria-label={`Step ${n + 1}: ${s.title}`}
                aria-current={n === index ? 'step' : undefined}
                onClick={() => go(n)}
              />
            ))}
          </div>
          <span className={styles.count}>
            {index + 1} of {steps.length}
          </span>
          <Button
            variant="primary"
            onClick={() => (index === last ? setIndex(0) : go(index + 1))}
          >
            {index === last ? 'Start again' : 'Next'}
          </Button>
        </div>
      </section>

      <div className={styles.transcript}>
        {/* Extra Accordion props land on the panel and override Oxygen's.
            Oxygen sets inert="", which React 19 drops, and points
            aria-labelledby at an id that doesn't exist. */}
        <Accordion
          title="Show all steps as text"
          isExpanded={transcriptOpen}
          onChange={(_, open) => setTranscriptOpen(open)}
          inert={!transcriptOpen}
          aria-labelledby={undefined}
        >
          {groupByChapter(steps).map(({ chapter, items }) => {
            const label = chapterOf(chapter)?.label;
            return (
              <div key={items[0].i}>
                {label && <p className={styles.transcriptChapter}>{label}</p>}
                <ol>
                  {items.map(({ step: s, i }) => (
                    <li key={i} value={i + 1}>
                      <strong>{s.title}.</strong> {s.text}
                      {s.note ? ` ${s.note}` : ''}
                    </li>
                  ))}
                </ol>
              </div>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
