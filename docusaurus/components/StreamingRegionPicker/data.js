/**
 * Site (8x8 Region) -> Contact Center cluster mapping for the Event Streaming
 * WebSocket endpoints.
 *
 * One site hosts one or more CC clusters. Customers generally know only their
 * cluster (the `vcc-<cluster>.8x8.com` host in Configuration Manager), so the
 * picker is keyed on cluster and resolves to the site's hostname.
 *
 * Sites that are not yet deployed take `hostname: null`, which renders as
 * "Currently not available" in the picker and `N/A` / Pending in the table.
 */
export const SITES = [
  {
    site: 'UK3',
    hostname: 'pulsar-ws-euw2.8x8.com',
    clusters: [
      'EU4',
      'EU5',
      'EU6',
      'EU7',
      'EU8',
      'EU9',
      'EU10',
      'EU11',
      'EU12',
      'EU13',
      'EU14',
    ],
  },
  {
    site: 'US1',
    hostname: 'pulsar-ws-use1.8x8.com',
    clusters: [
      'NA1',
      'NA2',
      'NA3',
      'NA4',
      'NA5',
      'NA6',
      'NA11',
      'NA12',
      'NA13',
      'NA14',
      'NA15',
      'NA16',
      'SB1',
    ],
  },
  {
    site: 'US2',
    hostname: 'pulsar-ws-usw2.8x8.com',
    clusters: [
      'NA7',
      'NA8',
      'NA9',
      'NA10',
      'NA17',
      'NA18',
      'NA19',
      'NA20',
      'NA27',
      'NA28',
      'NA29',
      'NA30',
      'NA37',
      'NA38',
      'NA39',
    ],
  },
  { site: 'HK1', hostname: null, clusters: ['AP1'] },
  { site: 'HK2', hostname: null, clusters: ['AP21'] },
  { site: 'LH1', hostname: null, clusters: ['EU21'] },
  { site: 'ON1', hostname: null, clusters: ['BC1', 'BC2', 'BC3'] },
  { site: 'PA1', hostname: null, clusters: ['EU31'] },
  { site: 'SK1', hostname: null, clusters: ['CA1', 'CA2'] },
  { site: 'SY1', hostname: null, clusters: ['AU1', 'AU2'] },
];

/** Flattened cluster -> site lookup, sorted for stable option ordering. */
export const CLUSTERS = SITES.flatMap(entry =>
  entry.clusters.map(cluster => ({ cluster, ...entry })),
).sort((a, b) => a.cluster.localeCompare(b.cluster, 'en', { numeric: true }));
