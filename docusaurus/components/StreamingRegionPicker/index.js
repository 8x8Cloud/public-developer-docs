import React, { useMemo, useState } from 'react';
import Select from '@8x8/oxygen-select';
import { CLUSTERS } from './data';
import styles from './styles.module.css';

/**
 * Customers reach for their cluster in several shapes: the bare code (`EU4`),
 * the Configuration Manager host prefix (`vcc-eu4`), or the full hostname
 * pasted from the address bar. Normalise all three before matching, and let
 * the site code (`UK3`) match too.
 */
function filterOption(option, rawInput) {
  const input = rawInput
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^vcc-/, '')
    .replace(/\.8x8\.com.*$/, '');

  if (!input) return true;

  const { cluster, site } = option.data.entry;
  return (
    cluster.toLowerCase().includes(input) || site.toLowerCase().includes(input)
  );
}

/**
 * StreamingRegionPicker lets a customer pick their Contact Center cluster and
 * resolves it to the Event Streaming WebSocket hostname for that site.
 *
 * Customers know their cluster, not the site it lives in, so the search is on
 * the cluster name; the site is shown as part of the result.
 *
 * @example
 * <StreamingRegionPicker />
 */
export default function StreamingRegionPicker() {
  const [selected, setSelected] = useState(null);

  const options = useMemo(
    () =>
      CLUSTERS.map(entry => ({
        value: entry.cluster,
        label: `${entry.cluster} (${entry.site})`,
        entry,
      })),
    [],
  );

  const entry = selected?.entry;
  const available = Boolean(entry?.hostname);

  return (
    <div className={styles.picker}>
      <div className={styles.filterBar}>
        <label htmlFor="cc-cluster-picker" className={styles.filterLabel}>
          Your CC cluster:
        </label>
        <div className={styles.filterControl}>
          <Select
            inputId="cc-cluster-picker"
            options={options}
            value={selected}
            onChange={setSelected}
            filterOption={filterOption}
            placeholder="Search for a cluster, e.g. EU4 or vcc-eu4"
            noOptionsMessage={() => 'No matching cluster'}
            isClearable
            isSearchable
          />
        </div>
      </div>

      {entry && (
        <dl className={styles.result}>
          <dt>8x8 Region</dt>
          <dd>{entry.site}</dd>

          <dt>Availability</dt>
          <dd>
            <span
              className={`${styles.badge} ${
                available ? styles.badgeAvailable : styles.badgePending
              }`}
            >
              {available ? 'Available' : 'Pending'}
            </span>
          </dd>

          <dt>WebSocket URL</dt>
          <dd>
            {available ? (
              <code className={styles.url}>
                {`wss://${entry.hostname}/ws/v2/reader/persistent/{tenant}/event-v1/all`}
              </code>
            ) : (
              'Currently not available — this region has not been deployed yet.'
            )}
          </dd>
        </dl>
      )}
    </div>
  );
}
