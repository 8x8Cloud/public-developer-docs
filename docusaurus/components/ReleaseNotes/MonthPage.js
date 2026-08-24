import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Entry } from './Entry';
import { monthLabel } from './links';
import styles from './styles.module.css';
import mstyles from './month.module.css';

// Rendered for /release-notes/latest (canonical "this month") and each
// /release-notes/m/<YYYY-MM> permalink. `data` = { month, entries, canonical }.
export default function ReleaseNoteMonth({ data }) {
  if (!data) return null;
  const { month, entries = [], canonical } = data;
  const label = monthLabel(month);
  const title = canonical ? 'Latest release notes' : `Release notes — ${label}`;
  return (
    <Layout title={title} description={`8x8 Developer Portal release notes — ${label}.`}>
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <Link to="/release-notes" className={mstyles.back}>← All release notes</Link>

            <header className={mstyles.head}>
              {canonical && <span className={mstyles.badge}>Latest month</span>}
              <h1 className={mstyles.title}>{label}</h1>
              <p className={mstyles.sub}>
                {entries.length} update{entries.length === 1 ? '' : 's'} shipped on the developer portal in {label}.
              </p>
            </header>

            <div className={styles.cards}>
              {/* Cards sit directly under the page <h1> (the month) with no group
                  heading between, so their titles render at <h2> to keep the
                  heading order gap-free (WCAG 1.3.1). */}
              {entries.map((e) => <Entry key={e.id} e={e} headingLevel={2} />)}
            </div>

            <p className={mstyles.foot}>
              This page is a stable link — <Link to={`/release-notes/m/${month}`}>{`/release-notes/m/${month}`}</Link>
              {canonical ? ' (and /release-notes/latest always shows the newest month).' : '.'}
              {' '}Browse the full history in <Link to="/release-notes">all release notes</Link>.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
