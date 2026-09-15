# Streaming Regions Table Generation

The Event Streaming [Connection Guide](../docs/actions-events/docs/streaming/connection.mdx) presents the
8x8 Region (site) to Contact Center cluster mapping twice:

- as the **Available Regions** Markdown table, and
- through the **`<StreamingRegionPicker />`** component, which lets a customer search for their cluster
  and get the WebSocket hostname back.

Both must agree. The table is generated from the component's data module so they cannot drift.

## Source of Truth

`docusaurus/components/StreamingRegionPicker/data.js`

```javascript
export const SITES = [
  {
    site: 'UK3',
    hostname: 'pulsar-ws-euw2.8x8.com',
    clusters: ['EU4', 'EU5', /* ... */],
  },
  // A site with no endpoint yet:
  { site: 'SY1', hostname: null, clusters: ['AU1', 'AU2'] },
];
```

`hostname: null` means the region has not been deployed. It renders as `N/A` / `Pending` in the table, and
as "Currently not available" in the picker.

## Usage

```bash
yarn generate-streaming-regions          # Rewrite the table from data.js
yarn validate:streaming-regions          # Fail if the table is out of date
```

`yarn validate:streaming-regions` runs as part of `yarn build`, so a mismatch fails the build.

## Updating a Region

1. Edit `SITES` in `data.js` — add a site, add a cluster, or replace a `null` hostname with the real one.
2. Run `yarn generate-streaming-regions`.
3. Commit both the data module and `connection.mdx`.

## Why the Table Is Not Rendered from the Component

Rendering the table as JSX would be simpler, but `docusaurus-plugin-llms` reads MDX **source** rather than
rendered output. A JSX table is emitted into `llms.txt` and `llms-full.txt` as the literal string
`<StreamingRegionTable />`, which would remove the region mapping from the AI-facing documentation
entirely. Keeping real Markdown in the file preserves it there, and for readers without JavaScript.

The on-site search index is built from rendered HTML, so it covers both forms.

## Implementation Notes

- The script locates the table by its header row (`| 8x8 Region | CC Cluster | ... |`) rather than by
  comment markers, because MDX v3 does not support HTML comments and would render them as text.
- `connection.mdx` is stored with CRLF line endings; the script preserves whatever the file already uses.
