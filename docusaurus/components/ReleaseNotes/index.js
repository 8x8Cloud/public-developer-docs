import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import { useColorMode } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import Select from '@8x8/oxygen-select';
import Button from '@8x8/oxygen-button';
import {
  buttonNovo,
  buttonNovoDark,
  selectNovo,
  selectNovoDark,
} from '@8x8/oxygen-constants';
import {
  PRODUCTS,
  P,
  colorIndex,
  colorVar,
  PRODUCT_ORDER,
  PRODUCT_GROUPS,
  CHANNEL_ORDER,
  productPath,
  slugify,
  monthKey,
  monthLabel,
} from './links';
import { Entry } from './Entry';
import styles from './styles.module.css';

const GROUPS_PER_PAGE = 3;
const VIEW_OPTIONS = [
  { value: 'month', label: 'By month' },
  { value: 'product', label: 'By product' },
];

function anchorId(key) {
  return `rn-${slugify(key)}`;
}

function SegmentedControl({ label, options, value, onChange }) {
  function handleKeyDown(event, index) {
    const last = options.length - 1;
    let next = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = index === last ? 0 : index + 1;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = index === 0 ? last : index - 1;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = last;
    } else {
      return;
    }

    event.preventDefault();
    onChange(options[next].value);
    event.currentTarget.parentElement
      .querySelectorAll('[role="radio"]')
      [next].focus();
  }

  return (
    <div className={styles.segmented} role="radiogroup" aria-label={label}>
      {options.map((option, index) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            className={styles.segment}
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={event => handleKeyDown(event, index)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function SelectMultiValue({ children, innerProps, removeProps }) {
  return (
    <span {...innerProps} className={styles.selectValue}>
      <span className={styles.selectValueLabel}>{children}</span>
      <button
        {...removeProps}
        type="button"
        className={styles.selectValueRemove}
        aria-label={`Remove ${children}`}
      >
        <span aria-hidden="true">×</span>
      </button>
    </span>
  );
}

export default function ReleaseNotes() {
  const { entries } = usePluginData('release-notes');
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const componentThemes = {
    button: isDark ? buttonNovoDark : buttonNovo,
    select: isDark ? selectNovoDark : selectNovo,
  };

  const [view, setView] = useState('month');
  const [selected, setSelected] = useState(() => new Set()); // empty = all products
  const [channels, setChannels] = useState(() => new Set()); // empty = all channels
  const [q, setQ] = useState('');
  const [page, setPage] = useState(0);
  const [activeId, setActiveId] = useState(null);

  const controlsRef = useRef(null);
  const pendingScroll = useRef(null);

  const countByProduct = useMemo(() => {
    const m = {};
    // An entry can span several products; it counts under each.
    entries.forEach(e => {
      e.products.forEach(p => {
        m[p] = (m[p] || 0) + 1;
      });
    });
    return m;
  }, [entries]);

  const productsPresent = useMemo(
    () => PRODUCT_ORDER.filter(n => countByProduct[n]),
    [countByProduct],
  );

  const productOptions = useMemo(() => {
    const option = product => ({
      value: product.name,
      label: countByProduct[product.name]
        ? `${product.name} (${countByProduct[product.name]})`
        : product.name,
    });
    const grouped = PRODUCT_GROUPS.map(group => ({
      label: group,
      options: PRODUCTS.filter(product => product.group === group).map(option),
    })).filter(group => group.options.length > 0);
    const otherProducts = PRODUCTS.filter(product => !product.group).map(
      option,
    );
    return [
      ...grouped,
      ...(otherProducts.length
        ? [{ label: 'Other products', options: otherProducts }]
        : []),
    ];
  }, [countByProduct]);

  const productOptionsFlat = useMemo(
    () => productOptions.flatMap(option => option.options || [option]),
    [productOptions],
  );

  const countByChannel = useMemo(() => {
    const m = {};
    entries.forEach(e => {
      if (e.channel) m[e.channel] = (m[e.channel] || 0) + 1;
    });
    return m;
  }, [entries]);

  // Channels present: the preferred order first, then any others by frequency.
  const channelsPresent = useMemo(() => {
    const present = Object.keys(countByChannel);
    const ordered = CHANNEL_ORDER.filter(c => present.includes(c));
    const rest = present
      .filter(c => !CHANNEL_ORDER.includes(c))
      .sort(
        (a, b) => countByChannel[b] - countByChannel[a] || a.localeCompare(b),
      );
    return [...ordered, ...rest];
  }, [countByChannel]);

  const channelOptions = useMemo(
    () =>
      channelsPresent.map(name => ({
        value: name,
        label: `${name} (${countByChannel[name]})`,
      })),
    [channelsPresent, countByChannel],
  );

  const selectedProductOptions = productOptionsFlat.filter(option =>
    selected.has(option.value),
  );
  const selectedChannelOptions = channelOptions.filter(option =>
    channels.has(option.value),
  );

  const query = q.trim().toLowerCase();

  // `selected`/`channels` are replaced (never mutated) on every toggle, so their
  // identity is a valid memo dependency — no need to serialise them to a string.
  const visible = useMemo(
    () =>
      entries.filter(e => {
        if (selected.size > 0 && !e.products.some(p => selected.has(p)))
          return false;
        if (channels.size > 0 && !channels.has(e.channel)) return false;
        if (query) {
          const hay =
            `${e.title} ${e.channel} ${e.products.join(' ')} ${e.changeType}`.toLowerCase();
          if (!hay.includes(query)) return false;
        }
        return true;
      }),
    [entries, selected, channels, query],
  );

  const groupsAll = useMemo(() => {
    if (view === 'month') {
      const order = [];
      const buckets = {};
      visible.forEach(e => {
        const k = monthKey(e.date);
        if (!buckets[k]) {
          buckets[k] = [];
          order.push(k);
        }
        buckets[k].push(e);
      });
      return order.map(k => ({
        key: k,
        label: monthLabel(k),
        colorIndex: 0,
        entries: buckets[k],
      }));
    }
    return productsPresent
      .map(name => ({
        key: name,
        label: name,
        colorIndex: colorIndex(name),
        entries: visible.filter(e => e.products.includes(name)),
      }))
      .filter(g => g.entries.length > 0);
  }, [view, visible, productsPresent]);

  // Every filter/grouping change resets to the first page in its own change
  // handler (see the change* helpers below), so `page` is always a valid index
  // into the current result set — no post-render reset effect, and no separate
  // clamped copy of the page number to keep in sync.
  const pageCount = Math.max(1, Math.ceil(groupsAll.length / GROUPS_PER_PAGE));
  const pageGroups = groupsAll.slice(
    page * GROUPS_PER_PAGE,
    page * GROUPS_PER_PAGE + GROUPS_PER_PAGE,
  );
  // Identity of the groups currently on the page — the scroll-spy effect re-runs
  // when this changes. Named here rather than computed inline in the dep array.
  const pageGroupsKey = pageGroups.map(g => g.key).join('|');

  // Keep the sticky ToC offset in sync with the (variable-height) controls bar.
  useEffect(() => {
    const el = controlsRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => {
      document.documentElement.style.setProperty(
        '--rn-controls-h',
        `${el.offsetHeight}px`,
      );
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty('--rn-controls-h');
    };
  }, []);

  // Scroll-spy: highlight the ToC entry for the group currently in view.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const els = pageGroups
      .map(g => document.getElementById(anchorId(g.key)))
      .filter(Boolean);
    if (!els.length) return undefined;
    const seen = new Map();
    const obs = new IntersectionObserver(
      records => {
        records.forEach(r => seen.set(r.target.id, r.isIntersecting));
        const first = els.find(el => seen.get(el.id));
        if (first) setActiveId(first.id);
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [pageGroupsKey]);

  // After a page change requested from the ToC, scroll to (and focus) the target.
  useEffect(() => {
    if (!pendingScroll.current) return;
    const el = document.getElementById(pendingScroll.current);
    pendingScroll.current = null;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el.focus({ preventScroll: true });
    }
  }, [page]);

  // Filter/grouping changes go through these so each resets the pager to the
  // first page in the same event — keeping `page` valid without a reset effect.
  function changeView(next) {
    setView(next);
    setPage(0);
  }
  function changeSelected(options) {
    setSelected(new Set((options || []).map(option => option.value)));
    setPage(0);
  }
  function changeChannels(options) {
    setChannels(new Set((options || []).map(option => option.value)));
    setPage(0);
  }
  function changeQuery(value) {
    setQ(value);
    setPage(0);
  }

  function reset() {
    setSelected(new Set());
    setChannels(new Set());
    setQ('');
    setPage(0);
  }

  // Navigate to a group from the ToC. Same-page groups scroll directly; a group on
  // another pager page switches page first, then the effect above scrolls to it.
  // Rendered as a real anchor so keyboard focus moves to the target section.
  function gotoGroup(ev, key) {
    ev.preventDefault();
    const idx = groupsAll.findIndex(g => g.key === key);
    if (idx < 0) return;
    const target = Math.floor(idx / GROUPS_PER_PAGE);
    const id = anchorId(key);
    if (target !== page) {
      pendingScroll.current = id;
      setPage(target);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        el.focus({ preventScroll: true });
      }
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.controls} ref={controlsRef}>
        <div className={styles.primaryControls}>
          <div className={styles.field}>
            <label className={styles.flabel} htmlFor="rn-search">
              Search
            </label>
            <input
              id="rn-search"
              className={styles.search}
              type="search"
              placeholder="Search features and products…"
              value={q}
              onChange={ev => changeQuery(ev.target.value)}
            />
          </div>
          <SegmentedControl
            label="Group release notes"
            options={VIEW_OPTIONS}
            value={view}
            onChange={changeView}
          />
        </div>

        <div className={styles.filterControls}>
          <div className={styles.field}>
            <label className={styles.flabel} htmlFor="rn-product-filter">
              Product
            </label>
            <Select
              inputId="rn-product-filter"
              aria-label="Filter by product"
              className={styles.filterSelect}
              options={productOptions}
              value={selectedProductOptions}
              onChange={changeSelected}
              placeholder="All products"
              isMulti
              hasCheckbox
              multipleSelectMaxRows={1}
              hideSelectedOptions={false}
              isClearable
              components={{ MultiValue: SelectMultiValue }}
              theme={componentThemes.select}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.flabel} htmlFor="rn-channel-filter">
              Channel
            </label>
            <Select
              inputId="rn-channel-filter"
              aria-label="Filter by channel"
              className={styles.filterSelect}
              options={channelOptions}
              value={selectedChannelOptions}
              onChange={changeChannels}
              placeholder="All channels"
              isMulti
              hasCheckbox
              multipleSelectMaxRows={1}
              hideSelectedOptions={false}
              isClearable
              components={{ MultiValue: SelectMultiValue }}
              theme={componentThemes.select}
            />
          </div>
          <div className={styles.filterStatus}>
            {(selected.size > 0 || channels.size > 0 || q) && (
              <Button
                size="small"
                variant="text"
                onClick={reset}
                theme={componentThemes.button}
              >
                Clear filters
              </Button>
            )}
            <span className={styles.count} role="status" aria-live="polite">
              Showing {visible.length} of {entries.length}
            </span>
          </div>
        </div>
      </div>

      {groupsAll.length === 0 ? (
        <div className={styles.empty} role="status" aria-live="polite">
          <div className={styles.emptyBig}>Nothing matches these filters</div>
          <div>
            Try clearing the search or selecting a different product or channel.
          </div>
        </div>
      ) : (
        <div id="rn-results" className={styles.layout}>
          <aside className={styles.toc} aria-label="On this page">
            <div className={styles.tocTitle}>
              {view === 'month' ? 'Months' : 'Products'}
            </div>
            <nav>
              {groupsAll.map((g, gi) => {
                const gp = Math.floor(gi / GROUPS_PER_PAGE);
                const id = anchorId(g.key);
                const isActive = id === activeId && gp === page;
                return (
                  <a
                    key={g.key}
                    href={`#${id}`}
                    className={`${styles.tocItem} ${isActive ? styles.tocActive : ''} ${gp !== page ? styles.tocOffpage : ''}`}
                    onClick={ev => gotoGroup(ev, g.key)}
                  >
                    {g.colorIndex ? (
                      <span
                        className={styles.tocDot}
                        style={colorVar(g.colorIndex)}
                      />
                    ) : null}
                    <span className={styles.tocLabel}>{g.label}</span>
                    <span className={styles.tocCount}>{g.entries.length}</span>
                  </a>
                );
              })}
            </nav>
            {pageCount > 1 && (
              <div className={styles.tocPage}>
                Page {page + 1} of {pageCount}
              </div>
            )}
          </aside>

          <div className={styles.feed}>
            {pageGroups.map(g => (
              <section
                key={g.key}
                id={anchorId(g.key)}
                className={styles.group}
                tabIndex={-1}
                aria-label={g.label}
              >
                <div className={styles.groupHead}>
                  <h2 className={styles.gt}>
                    {g.colorIndex ? (
                      <span
                        className={styles.gdot}
                        style={colorVar(g.colorIndex)}
                      />
                    ) : null}
                    {g.label}
                  </h2>
                  <span className={styles.gn}>
                    {g.entries.length} update{g.entries.length > 1 ? 's' : ''}
                  </span>
                  <Link
                    className={styles.permalink}
                    to={
                      view === 'month'
                        ? `/release-notes/m/${g.key}`
                        : productPath(g.key)
                    }
                    title={
                      view === 'month'
                        ? 'Shareable link to this month'
                        : 'Shareable link to this product'
                    }
                  >
                    Permalink
                  </Link>
                </div>
                <div className={styles.cards}>
                  {g.entries.map(e => (
                    <Entry key={e.id} e={e} />
                  ))}
                </div>
              </section>
            ))}

            {pageCount > 1 && (
              <nav className={styles.pager} aria-label="Release notes pages">
                <button
                  type="button"
                  className={styles.pageBtn}
                  disabled={page === 0}
                  onClick={() => setPage(page - 1)}
                >
                  <span aria-hidden="true">← </span>Newer
                </button>
                {/* Dots only while few; a plain "Page X of Y" scales to any depth. */}
                {pageCount <= 8 ? (
                  <div className={styles.pageDots}>
                    {Array.from({ length: pageCount }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`${styles.pageDot} ${i === page ? styles.pageDotActive : ''}`}
                        aria-label={`Page ${i + 1}`}
                        aria-current={i === page ? 'page' : undefined}
                        onClick={() => setPage(i)}
                      />
                    ))}
                  </div>
                ) : (
                  <span className={styles.pageInfo}>
                    Page {page + 1} of {pageCount}
                  </span>
                )}
                <button
                  type="button"
                  className={styles.pageBtn}
                  disabled={page === pageCount - 1}
                  onClick={() => setPage(page + 1)}
                >
                  Older<span aria-hidden="true"> →</span>
                </button>
              </nav>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
