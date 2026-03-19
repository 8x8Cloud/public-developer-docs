/**
 * Fix URLs in generated llms.txt and llms-full.txt files.
 *
 * docusaurus-plugin-llms hardcodes pathPrefix='docs' when constructing URLs,
 * which prepends /docs/ after the site origin. Because this site uses
 * routeBasePath: '/' (docs served at the root), that segment is incorrect.
 *
 * This script runs after `docusaurus build` and strips the leading /docs/
 * segment that appears immediately after the origin, without touching /docs/
 * segments deeper in the path (which are part of the actual content structure).
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
const prefix = `${origin}/docs/`;
const replacement = `${origin}/`;

let totalReplacements = 0;

for (const filename of files) {
  const filePath = path.join(buildDir, filename);
  if (!fs.existsSync(filePath)) continue;

  const content = fs.readFileSync(filePath, 'utf-8');
  const updated = content.split(prefix).join(replacement);
  const count = (content.split(prefix).length - 1);

  if (count > 0) {
    fs.writeFileSync(filePath, updated, 'utf-8');
    totalReplacements += count;
    console.log(`[fix-llms-urls] ${filename}: fixed ${count} URL(s)`);
  } else {
    console.log(`[fix-llms-urls] ${filename}: no fixes needed`);
  }
}

if (totalReplacements === 0) {
  console.log('[fix-llms-urls] No URL corrections were needed.');
}
