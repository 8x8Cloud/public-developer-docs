#!/usr/bin/env node

'use strict';

/**
 * generate-streaming-regions.js
 *
 * The Event Streaming connection guide shows the site -> CC cluster mapping
 * twice: as a Markdown table (which is what reaches llms.txt and readers with
 * JavaScript off) and through the <StreamingRegionPicker /> component. Both
 * must agree, so the table is generated from the component's data module.
 *
 * Source of truth:
 *   docusaurus/components/StreamingRegionPicker/data.js
 *
 * Usage:
 *   node scripts/generate-streaming-regions.js            Rewrite the table
 *   node scripts/generate-streaming-regions.js --check    Fail if out of date
 *
 * The --check mode runs as part of `yarn build`, so the two copies cannot
 * drift apart in CI.
 */

const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

// data.js is an ES module imported by a CommonJS script, which makes Node warn
// that package.json declares no "type". The import works; only the noise is
// unwanted, and this runs on every build. Drop that one warning, keep the rest.
process.removeAllListeners('warning');
process.on('warning', warning => {
  if (warning.code !== 'MODULE_TYPELESS_PACKAGE_JSON') {
    console.warn(warning.stack || String(warning));
  }
});

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const repoRoot = path.resolve(__dirname, '..');
const dataPath = path.join(
  repoRoot,
  'docusaurus',
  'components',
  'StreamingRegionPicker',
  'data.js',
);
const docPath = path.join(
  repoRoot,
  'docs',
  'actions-events',
  'docs',
  'streaming',
  'connection.mdx',
);

const HEADER = '| 8x8 Region | CC Cluster | Hostname | Availability |';
const DIVIDER = '|------------|------------|----------|--------------|';

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

/**
 * Renders the Available Regions table. Sites without a hostname have not been
 * deployed yet and show as N/A / Pending.
 */
function buildTable(sites) {
  const rows = sites.map(entry => {
    const clusters = entry.clusters.join(', ');
    const hostname = entry.hostname ? `\`${entry.hostname}\`` : 'N/A';
    const availability = entry.hostname ? 'Available' : 'Pending';
    return `| ${entry.site} | ${clusters} | ${hostname} | ${availability} |`;
  });

  return [HEADER, DIVIDER, ...rows].join('\n');
}

/**
 * Swaps the existing table for a freshly rendered one. The table is located by
 * its header row rather than by comment markers, which MDX v3 would render as
 * literal text.
 */
function replaceTable(source, table) {
  const lines = source.split('\n');
  const start = lines.indexOf(HEADER);

  if (start === -1) {
    throw new Error(
      `Could not find the Available Regions table header in ${path.relative(repoRoot, docPath)}.\n` +
        `Expected a line reading:\n  ${HEADER}`,
    );
  }

  // The table runs until the first line that is not part of it.
  let end = start;
  while (end < lines.length && lines[end].startsWith('|')) {
    end += 1;
  }

  return [
    ...lines.slice(0, start),
    ...table.split('\n'),
    ...lines.slice(end),
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const check = process.argv.includes('--check');

  const { SITES } = await import(pathToFileURL(dataPath).href);

  const raw = fs.readFileSync(docPath, 'utf8');
  const crlf = raw.includes('\r\n');
  const source = raw.replace(/\r\n/g, '\n');

  const updated = replaceTable(source, buildTable(SITES));
  const relDoc = path.relative(repoRoot, docPath).replace(/\\/g, '/');
  const relData = path.relative(repoRoot, dataPath).replace(/\\/g, '/');

  if (updated === source) {
    console.log(`✅ Available Regions table in ${relDoc} is up to date.`);
    return;
  }

  if (check) {
    console.error(
      `❌ The Available Regions table in ${relDoc} is out of date.`,
    );
    console.error(`   It no longer matches ${relData}.`);
    console.error(
      '   Run `yarn generate-streaming-regions` and commit the result.',
    );
    process.exitCode = 1;
    return;
  }

  fs.writeFileSync(docPath, crlf ? updated.replace(/\n/g, '\r\n') : updated);
  console.log(`✅ Regenerated the Available Regions table in ${relDoc}.`);
}

main().catch(error => {
  console.error(error.message);
  process.exitCode = 1;
});
