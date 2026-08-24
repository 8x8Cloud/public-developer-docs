/**
 * Fix URLs in generated llms.txt and llms-full.txt files.
 *
 * docusaurus-plugin-llms hardcodes pathPrefix='docs' when constructing URLs,
 * which prepends /docs/ after the site origin. Because this site uses
 * routeBasePath: '/' (docs served at the root), that segment is incorrect.
 *
 * This script runs after `docusaurus build` and:
 *   1. strips the leading /docs/ segment that appears immediately after the
 *      origin, without touching /docs/ segments deeper in the path (which are
 *      part of the actual content structure); and
 *   2. rewrites the portfolio Release Notes page to its canonical /release-notes
 *      URL. Its source file is docs/portfolio-release-notes.mdx (served at
 *      /release-notes via a slug); the plugin resolves it from the filename, so
 *      it lands at /portfolio-release-notes here. The filename is deliberately
 *      not release-notes.mdx: that path (docs/release-notes) collides in the
 *      plugin's route matcher with each product's own /<area>/docs/release-notes
 *      page (e.g. JaaS) and would shadow them in the index.
 *
 * It then asserts the canonical /release-notes URL is present and that no stale
 * variant leaked, failing the build if the mapping ever regresses.
 *
 * Example:
 *   Before: https://developer.8x8.com/docs/actions-events/docs/streaming/event-reference
 *   After:  https://developer.8x8.com/actions-events/docs/streaming/event-reference
 */

const fs = require('fs');
const path = require('path');

// Load Docusaurus config to derive the site URL and build directory.
// The incorrect /docs/ prefix appears directly after the site origin, so we
// match against config.url (the origin) rather than including baseUrl.
const config = require('../docusaurus.config.js');
const origin = config.url.replace(/\/+$/, '');
const buildDir = path.resolve(__dirname, '..', 'build');

const files = ['llms.txt', 'llms-full.txt'];

// Ordered string replacements applied to each file.
const replacements = [
  // 1. Strip the spurious leading /docs/ segment (origin + /docs/ only).
  { from: `${origin}/docs/`, to: `${origin}/` },
  // 2. Map the portfolio Release Notes page to its canonical slug URL.
  { from: `${origin}/portfolio-release-notes`, to: `${origin}/release-notes` },
];

let totalReplacements = 0;

for (const filename of files) {
  const filePath = path.join(buildDir, filename);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf-8');
  let fileCount = 0;
  for (const { from, to } of replacements) {
    const count = content.split(from).length - 1;
    if (count > 0) {
      content = content.split(from).join(to);
      fileCount += count;
    }
  }

  if (fileCount > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    totalReplacements += fileCount;
    console.log(`[fix-llms-urls] ${filename}: fixed ${fileCount} URL(s)`);
  } else {
    console.log(`[fix-llms-urls] ${filename}: no fixes needed`);
  }
}

if (totalReplacements === 0) {
  console.log('[fix-llms-urls] No URL corrections were needed.');
}

// Guardrail: the portfolio Release Notes page must be indexed at /release-notes,
// and no stale variant may survive. Fail the build if either is wrong so a future
// change to the plugin, the slug, or the redirects can't silently mis-list it.
const llmsPath = path.join(buildDir, 'llms.txt');
if (fs.existsSync(llmsPath)) {
  const llms = fs.readFileSync(llmsPath, 'utf-8');
  const errors = [];
  if (!llms.includes(`(${origin}/release-notes)`)) {
    errors.push(`expected the Release Notes page at ${origin}/release-notes`);
  }
  for (const bad of [
    `${origin}/portfolio-release-notes`,
    `${origin}/connect/docs/release-notes`,
    `${origin}/docs/release-notes`,
  ]) {
    if (llms.includes(bad)) errors.push(`found a stale Release Notes URL: ${bad}`);
  }
  if (errors.length) {
    console.error('[fix-llms-urls] llms.txt Release Notes URL assertion failed:');
    for (const e of errors) console.error(`  - ${e}`);
    process.exit(1);
  }
  console.log(`[fix-llms-urls] llms.txt: Release Notes indexed at ${origin}/release-notes ✓`);
}
