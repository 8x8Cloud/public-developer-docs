const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const { sortEntries, withBaseUrl } = require('../lib/entries');

/**
 * Read + parse every *.md entry in dir into the global-data shape.
 * Body Markdown is rendered to HTML at build time (SSR-safe).
 *
 * Entry frontmatter schema (see technical-notes/internal/release-notes-mechanism.md):
 *   date        ISO YYYY-MM-DD  (required, drives newest-first sort)
 *   products    portfolio areas (required array, e.g. ["Connect", "APIs"])
 *   channel     sub-area label  (optional, e.g. WhatsApp, RCS, Streaming)
 *   changeType  Added|Changed|Fixed|Deprecated  (required)
 *   title       one-line customer-facing headline  (required)
 * The Markdown body is the plain "what changed" summary. No internal references
 * (PR numbers, Jira keys) are stored in entry files — the whole repo is mirrored
 * to the public repo. scripts/validate-release-notes.js enforces this at build
 * time: it rejects unknown frontmatter keys (e.g. prs/tickets) and issue keys in
 * the body (see validateEntry in scripts/lib/release-notes-entry.js).
 *
 * Note: gray-matter parses bare YYYY-MM-DD YAML values as JS Date objects
 * (UTC midnight), not strings. We normalise to YYYY-MM-DD strings so that
 * sortEntries (lexical compare) and React rendering both work correctly.
 */
// Excerpt cap for the list card. The card also clamps to 5 lines in CSS; the full
// body lives on the entry's own page.
const EXCERPT_MAX = 320;

/**
 * A release can span multiple products (e.g. Connect + APIs). Accept a `products`
 * list, falling back to a single `products` string or a legacy `product`. Pure.
 * @returns {string[]}
 */
function normalizeProducts(data) {
  if (Array.isArray(data.products)) return data.products.map(String);
  if (data.products) return [String(data.products)];
  if (data.product) return [String(data.product)];
  return [];
}

/**
 * Plain-text excerpt for the list card, so the list page needn't ship the full
 * rendered body of every entry (keeps the payload flat as the archive grows).
 * First paragraph, Markdown syntax stripped, capped at EXCERPT_MAX. Pure.
 */
function excerptOf(content) {
  const firstPara = content.trim().split(/\n\s*\n/)[0] || '';
  const plain = firstPara.replace(/[`*#>_[\]]/g, '').replace(/\s+/g, ' ').trim();
  return plain.length > EXCERPT_MAX ? `${plain.slice(0, EXCERPT_MAX).trimEnd()}…` : plain;
}

/**
 * Whether an entry has a real article body vs. just a one-line summary. An entry
 * is only given its own /release-notes/<id> page (and a "Read more…" link) when
 * its Markdown body has more than one block — i.e. more than the summary the card
 * already shows. Summary-only entries link straight to the updated docs page.
 * Pure; auto-upgrades once a fuller body is authored.
 */
function isArticle(content) {
  return content.trim().split(/\n\s*\n/).filter((block) => block.trim()).length > 1;
}

function loadEntries(dir, baseUrl = '/') {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const entries = files.map((file) => {
    const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
    const date =
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date);
    const products = normalizeProducts(data);
    return {
      id: file.replace(/\.md$/, ''),
      date,
      products,
      product: products[0] || '',
      channel: data.channel || '',
      changeType: data.changeType,
      title: data.title,
      excerpt: excerptOf(content),
      hasArticle: isArticle(content),
      bodyHtml: withBaseUrl(marked.parse(content.trim()), baseUrl),
    };
  });
  return sortEntries(entries);
}

module.exports = { sortEntries, withBaseUrl, loadEntries, normalizeProducts, excerptOf, isArticle, EXCERPT_MAX };
