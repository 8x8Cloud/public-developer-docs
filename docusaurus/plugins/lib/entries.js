// Shared build-time helpers for entry-aggregating plugins (changelog, release-notes).
// Both plugins read a directory of date-prefixed Markdown files, render bodies with
// `marked`, and sort newest-first — only the frontmatter→entry field mapping differs.
// Keeping these two helpers in one module means the tested copy and the used copy
// can't drift (see the sibling load.test.js files).

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
 * Prepend Docusaurus's baseUrl to root-absolute URLs in rendered HTML.
 *
 * Entry bodies are rendered with `marked` and injected via dangerouslySetInnerHTML,
 * so they never pass through Docusaurus's Link/MDX layer that normally applies
 * baseUrl. Without this, a link like `/administration/docs/suite-common` resolves
 * at the domain root and breaks on any non-root deploy (e.g. PR previews served
 * under `/pr-273/`). Both `href="/…"` and `src="/…"` are rewritten (images in an
 * article body would otherwise 404 on those deploys). External (`https://…`),
 * protocol-relative (`//…`) and pure-anchor (`#…`) URLs are left untouched.
 * At baseUrl `/` the prefix is empty, so production output is unchanged.
 */
function withBaseUrl(html, baseUrl) {
  const prefix = String(baseUrl || '/').replace(/\/$/, '');
  if (!prefix) return html;
  return html.replace(/(href|src)="\/(?!\/)/g, `$1="${prefix}/`);
}

module.exports = { sortEntries, withBaseUrl };
