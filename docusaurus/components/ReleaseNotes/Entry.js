import React from 'react';
import Link from '@docusaurus/Link';
import { P, colorIndex, colorVar, docHref, releasePath, CHANNEL_DOC, longDate } from './links';
import styles from './styles.module.css';

// One release-note card. Shared by the feed (index.js) and the month/product
// permalink pages, so it lives in its own module — importing it must not pull in
// the whole interactive feed.
//
// `headingLevel` sets the card title's tag so the page keeps a gap-free heading
// order: the feed and the by-product page put each card under an <h2> group
// heading, so the default <h3> is correct there; the single-month page has no
// intermediate heading, so it passes 2 to sit directly under the page <h1>.
export function Entry({ e, headingLevel = 3 }) {
  const Title = `h${headingLevel}`;
  const href = docHref(e); // channel/product docs — the fallback link at the card foot
  return (
    <article className={`${styles.entry} ${styles[`type_${e.changeType}`] || ''}`}>
      <div className={styles.top}>
        {e.products.map((name) => {
          const p = P[name];
          const inner = (
            <>
              <span className={styles.dot} style={colorVar(colorIndex(name))} />
              {name}
            </>
          );
          return p && p.doc
            ? <Link key={name} className={styles.product} to={p.doc}>{inner}</Link>
            : <span key={name} className={styles.product}>{inner}</span>;
        })}
        {e.channel && (
          CHANNEL_DOC[e.channel] ? (
            <Link className={styles.channel} to={CHANNEL_DOC[e.channel]}>{e.channel}</Link>
          ) : (
            <span className={styles.channel}>{e.channel}</span>
          )
        )}
        <span className={styles.metaRight}>
          <span className={`${styles.clabel} ${styles[`c_${e.changeType}`] || ''}`}>{e.changeType}</span>
          <time className={styles.date} dateTime={e.date}>{longDate(e.date)}</time>
        </span>
      </div>
      <Title className={styles.title}>
        {/* Only entries with a real article body get a detail page; a summary-only
            entry's title links straight to the updated docs page instead. */}
        {e.hasArticle ? (
          <Link className={styles.titleLink} to={releasePath(e.id)}>{e.title}</Link>
        ) : href ? (
          <Link className={styles.titleLink} to={href}>{e.title}</Link>
        ) : (
          <span className={styles.titleLink}>{e.title}</span>
        )}
      </Title>
      <div className={styles.body}>{e.excerpt}</div>
      <div className={styles.foot}>
        {href ? (
          <Link className={styles.docLink} to={href}>
            View {e.channel || e.product} docs<span aria-hidden="true"> →</span>
          </Link>
        ) : <span />}
        {e.hasArticle && (
          <Link className={styles.readMore} to={releasePath(e.id)}>Read more…</Link>
        )}
      </div>
    </article>
  );
}
