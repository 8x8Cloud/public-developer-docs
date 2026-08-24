import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Entry } from './Entry';
import { productPath, monthLabel, monthKey } from './links';
import styles from './styles.module.css';
import mstyles from './month.module.css';

// Rendered for each /release-notes/p/<slug> permalink. `data` = { product,
// entries } — that product's releases, newest first, grouped by month.
export default function ReleaseNoteProduct({ data }) {
  if (!data) return null;
  const { product, entries = [] } = data;

  // Group the product's entries by month, newest first.
  const order = [];
  const buckets = {};
  entries.forEach((e) => {
    const k = monthKey(e.date);
    if (!buckets[k]) { buckets[k] = []; order.push(k); }
    buckets[k].push(e);
  });

  return (
    <Layout title={`${product} release notes`} description={`8x8 Developer Portal release notes for ${product}.`}>
      <main className="container margin-vert--lg">
        <div className="row">
          <div className="col col--10 col--offset-1">
            <Link to="/release-notes" className={mstyles.back}>← All release notes</Link>

            <header className={mstyles.head}>
              <span className={mstyles.badge}>Product</span>
              <h1 className={mstyles.title}>{product}</h1>
              <p className={mstyles.sub}>
                {entries.length} release{entries.length === 1 ? '' : 's'} for {product} on the developer portal, newest first.
              </p>
            </header>

            {order.map((k) => (
              <section key={k} className={mstyles.monthGroup}>
                <h2 className={mstyles.monthHead}>{monthLabel(k)}</h2>
                <div className={styles.cards}>
                  {buckets[k].map((e) => <Entry key={e.id} e={e} />)}
                </div>
              </section>
            ))}

            <p className={mstyles.foot}>
              This is a stable link — <Link to={productPath(product)}>{productPath(product)}</Link>.
              {' '}Browse everything in <Link to="/release-notes">all release notes</Link>.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}
