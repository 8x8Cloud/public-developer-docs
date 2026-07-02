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
 * Read + parse every *.md entry in dir into the global-data shape.
 * Body Markdown is rendered to HTML at build time (SSR-safe).
 *
 * Note: gray-matter parses bare YYYY-MM-DD YAML values as JS Date objects
 * (UTC midnight), not strings. We normalise to YYYY-MM-DD strings so that
 * sortEntries (lexical compare) and React rendering both work correctly.
 */
function loadEntries(dir) {
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
      bodyHtml: marked.parse(content.trim()),
    };
  });
  return sortEntries(entries);
}

module.exports = { sortEntries, loadEntries };
