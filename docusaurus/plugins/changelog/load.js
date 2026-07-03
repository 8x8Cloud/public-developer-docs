const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

/**
 * Sort entries newest-first, breaking ties by title ascending.
 * Pure; returns a new array.
 */
function sortEntries(entries) {
  return entries.slice().sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return String(a.title).localeCompare(String(b.title));
  });
}

/**
 * Prepend Docusaurus's baseUrl to root-absolute links in rendered HTML.
 *
 * Entry bodies are rendered with `marked` and injected via
 * dangerouslySetInnerHTML, so they never pass through Docusaurus's Link/MDX
 * layer that normally applies baseUrl. Without this, a link like
 * `/administration/docs/suite-common` resolves at the domain root and breaks
 * on any non-root deploy (e.g. PR previews served under `/pr-273/`).
 *
 * Only root-absolute hrefs (`/...`) are rewritten. External (`https://…`),
 * protocol-relative (`//…`) and pure-anchor (`#…`) links are left untouched.
 * At baseUrl `/` the prefix is empty, so production output is unchanged.
 */
function withBaseUrl(html, baseUrl) {
  const prefix = String(baseUrl || '/').replace(/\/$/, '');
  if (!prefix) return html;
  return html.replace(/href="\/(?!\/)/g, `href="${prefix}/`);
}

/**
 * Read + parse every *.md entry in dir into the global-data shape.
 * Body Markdown is rendered to HTML at build time (SSR-safe).
 *
 * Note: gray-matter parses bare YYYY-MM-DD YAML values as JS Date objects
 * (UTC midnight), not strings. We normalise to YYYY-MM-DD strings so that
 * sortEntries (lexical compare) and React rendering both work correctly.
 */
function loadEntries(dir, baseUrl = '/') {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const entries = files.map((file) => {
    const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
    const date =
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date);
    return {
      id: file.replace(/\.md$/, ''),
      date,
      api: data.api,
      changeType: data.changeType,
      version: data.version,
      previousVersion: data.previousVersion || null,
      title: data.title,
      bodyHtml: withBaseUrl(marked.parse(content.trim()), baseUrl),
    };
  });
  return sortEntries(entries);
}

module.exports = { sortEntries, loadEntries, withBaseUrl };
