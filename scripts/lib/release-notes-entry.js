const matter = require('gray-matter');
const fs = require('fs');
const path = require('path');

// Single source of truth for registered products + change types, shared with the
// React renderer (docusaurus/components/ReleaseNotes/products.js). Requiring it
// here means the validator can never drift from what the UI knows how to render.
const {
  PRODUCT_NAMES,
  TYPES,
} = require(path.join(__dirname, '..', '..', 'docusaurus', 'components', 'ReleaseNotes', 'products.js'));

const REQUIRED = ['date', 'products', 'changeType', 'title'];

// The only keys an entry's frontmatter may carry. Everything here is
// customer-facing; anything else — notably `prs:` or `tickets:` — is an internal
// reference that must not ship, because docs/_release-notes/ is mirrored to the
// public repo. `product` is the accepted legacy singular of `products`.
const ALLOWED_KEYS = new Set([
  'date',
  'products',
  'product',
  'channel',
  'changeType',
  'title',
]);

// Jira-style issue keys (e.g. MSG-4732), matched in the body so internal ticket
// references can't leak into public entry text. A denylist skips standards/tech
// tokens that share the PREFIX-NUMBER shape (SHA-256, UTF-8, RFC-7231, …).
const ISSUE_KEY = /\b([A-Z]{2,})-\d+\b/g;
const ISSUE_KEY_ALLOW = new Set([
  'SHA', 'UTF', 'RFC', 'ISO', 'UTC', 'ASCII', 'BASE', 'IPV', 'IPV4', 'IPV6',
  'HTTP', 'SIP', 'RTP', 'SRTP', 'AES', 'RSA', 'PKCS', 'ES', 'HS', 'PS', 'GB',
]);

/**
 * Normalise the product frontmatter to a list of names.
 * Accepts `products: [..]` (canonical), `products: "X"`, or legacy `product: "X"`.
 * @param {object} data parsed frontmatter
 * @returns {string[]}
 */
function productList(data) {
  const raw = data.products !== undefined ? data.products : data.product;
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string' && raw.trim() !== '') return [raw];
  return [];
}

/**
 * Validate a parsed release-note entry's frontmatter (and, when supplied, its
 * body) — required fields, registered products, known change type, filename/date
 * match, and the "no internal references" rule that gates the public mirror.
 * @param {object} data parsed frontmatter
 * @param {string} filename basename of the entry file
 * @param {string} [content] entry body Markdown (optional; enables the body scan)
 * @returns {string[]} error messages (empty = valid)
 */
function validateEntry(data, filename, content = '') {
  const errors = [];

  for (const key of REQUIRED) {
    const v = data[key];
    const empty = v === undefined || v === null || v === '' || (Array.isArray(v) && v.length === 0);
    if (empty) errors.push(`missing required field "${key}"`);
  }

  // No internal references. Unknown frontmatter keys (e.g. prs/tickets) are the
  // usual leak; the entry files are mirrored to the public repo.
  for (const key of Object.keys(data)) {
    if (!ALLOWED_KEYS.has(key)) {
      errors.push(
        `unknown frontmatter key "${key}" — entry files carry only customer-facing fields (allowed: ${[...ALLOWED_KEYS].join(', ')}); keep PR/ticket references out`,
      );
    }
  }

  // …and no issue keys in the body text.
  for (const match of String(content).matchAll(ISSUE_KEY)) {
    if (!ISSUE_KEY_ALLOW.has(match[1])) {
      errors.push(
        `body contains what looks like an internal issue key "${match[0]}" — keep PR/ticket references out of public entry files`,
      );
      break; // one is enough to fail the build
    }
  }

  // Every named product must be registered in products.js. (An empty list is
  // already reported by the required-field check above.)
  for (const name of productList(data)) {
    if (!PRODUCT_NAMES.includes(name)) {
      errors.push(
        `product "${name}" is not registered in ReleaseNotes/products.js (known: ${PRODUCT_NAMES.join(', ')})`,
      );
    }
  }

  if (data.changeType !== undefined && !TYPES.includes(data.changeType)) {
    errors.push(`changeType "${data.changeType}" is not one of: ${TYPES.join(', ')}`);
  }

  // Filename date prefix must match the date frontmatter.
  const m = filename.match(/^(\d{4}-\d{2}-\d{2})-/);
  if (!m) {
    errors.push(`filename "${filename}" must start with YYYY-MM-DD-`);
  } else if (data.date) {
    // gray-matter parses bare YYYY-MM-DD values as JS Date objects (UTC midnight).
    // Normalise to a YYYY-MM-DD string for comparison regardless of source type.
    const dateStr =
      data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date);
    if (m[1] !== dateStr) {
      errors.push(`filename date ${m[1]} does not match date frontmatter ${dateStr}`);
    }
  }

  return errors;
}

function parseEntryFile(absPath) {
  const raw = fs.readFileSync(absPath, 'utf8');
  const { data, content } = matter(raw);
  return { data, content };
}

module.exports = { validateEntry, parseEntryFile, productList, PRODUCT_NAMES, TYPES };
