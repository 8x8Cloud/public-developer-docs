import React, { useMemo, useState } from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import Select from '@8x8/oxygen-select';
import styles from './styles.module.css';

const API_LABELS = {
  general: 'General (suite-wide)',
  'user-management': 'User Management',
  'ring-group-management': 'Ring Group Management',
  'phone-number-management': 'Phone Number Management',
  'site-management': 'Site Management',
  'address-management': 'Address Management',
  operations: 'Operations',
};

const CHANGE_TYPE_LABELS = {
  'non-breaking': 'Non-breaking',
  breaking: 'Breaking',
  deprecation: 'Deprecation',
  release: 'Release',
  docs: 'Docs',
};

export default function Changelog() {
  const { entries } = usePluginData('changelog');
  const [api, setApi] = useState('all');

  const apisPresent = useMemo(
    () => Array.from(new Set(entries.map((e) => e.api))),
    [entries],
  );

  const options = useMemo(
    () => [
      { value: 'all', label: 'All APIs' },
      ...apisPresent.map((slug) => ({ value: slug, label: API_LABELS[slug] || slug })),
    ],
    [apisPresent],
  );

  const selected = options.find((o) => o.value === api) || options[0];

  const visible = api === 'all' ? entries : entries.filter((e) => e.api === api);

  return (
    <div>
      <div className={styles.filterBar}>
        <label htmlFor="api-filter" className={styles.filterLabel}>Filter by API:</label>
        <div className={styles.filterControl}>
          <Select
            inputId="api-filter"
            options={options}
            value={selected}
            onChange={(opt) => setApi(opt ? opt.value : 'all')}
            isClearable={false}
            isSearchable={false}
          />
        </div>
      </div>

      {visible.length === 0 && <p>No changelog entries yet.</p>}

      {visible.map((entry) => (
        <article key={entry.id} className={styles.entry}>
          <div className={styles.meta}>
            <time className={styles.date}>{entry.date}</time>
            <span className={`${styles.badge} ${styles[`badge_${entry.changeType}`]}`}>
              {CHANGE_TYPE_LABELS[entry.changeType] || entry.changeType}
            </span>
            <span className={styles.api}>{API_LABELS[entry.api] || entry.api}</span>
            <span className={styles.version}>
              {entry.previousVersion ? `${entry.previousVersion} → ${entry.version}` : entry.version}
            </span>
          </div>
          <h3 className={styles.title}>{entry.title}</h3>
          <div
            className={styles.body}
            // Content is our own trusted, build-time-rendered Markdown.
            dangerouslySetInnerHTML={{ __html: entry.bodyHtml }}
          />
        </article>
      ))}
    </div>
  );
}
