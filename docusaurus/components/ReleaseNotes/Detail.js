import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useColorMode } from '@docusaurus/theme-common';
import Button from '@8x8/oxygen-button';
import { ArrowRightIcon } from '@8x8/oxygen-icon';
import { buttonNovo, buttonNovoDark } from '@8x8/oxygen-constants';
import { P, colorIndex, colorVar, docHref, longDate } from './links';
import styles from './detail.module.css';

// Rendered for each /release-notes/<id> route created by the release-notes
// plugin. `entry` is passed in as a route module (see the plugin's addRoute).
export default function ReleaseNoteDetail({ entry }) {
  if (!entry) return null;
  const products = entry.products || (entry.product ? [entry.product] : []);
  const href = docHref(entry);
  return (
    <Layout
      title={entry.title}
      description={`${entry.product} — ${entry.title}`}
    >
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <Link to="/release-notes" className={styles.back}>
              ← All release notes
            </Link>

            <div
              className={`${styles.card} ${styles[`type_${entry.changeType}`] || ''}`}
            >
              <div className={styles.meta}>
                {products.map(name => (
                  <span key={name} className={styles.prod}>
                    <span
                      className={styles.dot}
                      style={colorVar(colorIndex(name))}
                    />
                    {name}
                  </span>
                ))}
                {entry.channel && (
                  <span className={styles.channel}>{entry.channel}</span>
                )}
                <span
                  className={`${styles.type} ${styles[`t_${entry.changeType}`] || ''}`}
                >
                  {entry.changeType}
                </span>
                <time className={styles.date} dateTime={entry.date}>
                  {longDate(entry.date)}
                </time>
              </div>

              <h1 className={styles.title}>{entry.title}</h1>
              <div
                className={styles.body}
                // Trusted, build-time-rendered Markdown from the release-note source file.
                dangerouslySetInnerHTML={{ __html: entry.bodyHtml }}
              />

              {href && (
                <OxygenDocsButton
                  href={href}
                  label={`View ${entry.channel || entry.product} docs`}
                />
              )}
            </div>

            <p className={styles.fallbackNote}>
              This is the release entry. For the full feature documentation, use
              the docs link above.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}

function OxygenDocsButton({ href, label }) {
  const { colorMode } = useColorMode();
  return (
    // Render as a Docusaurus <Link> (not a raw <a>): the docs "overview" targets
    // resolve through client-side redirects at the React-Router level and need the
    // site baseUrl applied. A plain anchor skips both, so the link breaks on the
    // non-root PR preview (/pr-<n>/). `as` is forwarded to styled-components.
    <Button
      as={Link}
      className={styles.docBtn}
      to={href}
      size="medium"
      variant="tertiary"
      iconRight={<ArrowRightIcon aria-hidden="true" />}
      theme={colorMode === 'dark' ? buttonNovoDark : buttonNovo}
    >
      {label}
    </Button>
  );
}
