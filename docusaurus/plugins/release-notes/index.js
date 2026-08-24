const path = require('path');
const { loadEntries } = require('./load');
// Reuse the same slug helper the React link layer uses, so the route this plugin
// mints (/release-notes/p/<slug>) always matches the href productPath() builds.
const { productSlug } = require('../../components/ReleaseNotes/products');

/**
 * Custom plugin: aggregates portfolio-wide Release Notes entry files from a
 * configured directory into plugin global data for the <ReleaseNotes> component.
 *
 * Unlike the (API-suite-scoped) changelog plugin, this single instance spans
 * every product area — each entry carries a `product` field and the renderer
 * groups by month or by product. See
 * technical-notes/internal/release-notes-mechanism.md.
 *
 * @param {object} context - Docusaurus plugin context (provides siteDir and
 *   siteConfig.baseUrl).
 * @param {object} options - { path: entries dir relative to siteDir }.
 */
module.exports = function releaseNotesPlugin(context, options = {}) {
  const relDir = options.path || 'docs/_release-notes';
  const entriesDir = path.resolve(context.siteDir, relDir);
  const base = (context.siteConfig.baseUrl || '/').replace(/\/$/, '');

  return {
    name: 'release-notes',

    async loadContent() {
      return { entries: loadEntries(entriesDir, context.siteConfig.baseUrl) };
    },

    async contentLoaded({ content, actions }) {
      const { setGlobalData, createData, addRoute } = actions;
      // Light index for the <ReleaseNotes /> list page: everything EXCEPT the
      // rendered body (the card shows `excerpt`). This keeps the list payload
      // proportional to entry count, not to how long each article is.
      const index = content.entries.map(({ bodyHtml, ...rest }) => rest);
      setGlobalData({ entries: index });

      // Give each entry that has a real article body its own page, rendered from
      // its Markdown source. Summary-only entries get no detail page (nor a
      // "Read more…" link) — their card links straight to the updated docs page,
      // so we don't publish a sparse page that just repeats the one-line summary.
      await Promise.all(
        content.entries
          .filter((entry) => entry.hasArticle)
          .map(async (entry) => {
            const data = await createData(`release-note-${entry.id}.json`, JSON.stringify(entry));
            addRoute({
              path: `${base}/release-notes/${entry.id}`,
              component: '@site/docusaurus/components/ReleaseNotes/Detail',
              modules: { entry: data },
              exact: true,
            });
          }),
      );

      // Canonical, shareable month pages. Each month gets a stable permalink at
      // /release-notes/m/<YYYY-MM>, and /release-notes/latest always renders the
      // newest month present — the "this month's releases" link to share.
      const byMonth = {};
      index.forEach((e) => {
        const k = e.date.slice(0, 7);
        (byMonth[k] = byMonth[k] || []).push(e);
      });
      const months = Object.keys(byMonth).sort().reverse();
      await Promise.all(
        months.map(async (mk) => {
          const data = await createData(`release-notes-month-${mk}.json`, JSON.stringify({ month: mk, entries: byMonth[mk] }));
          addRoute({
            path: `${base}/release-notes/m/${mk}`,
            component: '@site/docusaurus/components/ReleaseNotes/MonthPage',
            modules: { data },
            exact: true,
          });
        }),
      );
      if (months.length) {
        const latest = months[0];
        const data = await createData('release-notes-latest.json', JSON.stringify({ month: latest, entries: byMonth[latest], canonical: true }));
        addRoute({
          path: `${base}/release-notes/latest`,
          component: '@site/docusaurus/components/ReleaseNotes/MonthPage',
          modules: { data },
          exact: true,
        });
      }

      // Shareable per-product pages at /release-notes/p/<slug>. An entry appears
      // under each of its products (a release can span e.g. Connect + APIs).
      const byProduct = {};
      index.forEach((e) => {
        (e.products || []).forEach((p) => {
          (byProduct[p] = byProduct[p] || []).push(e);
        });
      });
      await Promise.all(
        Object.keys(byProduct).map(async (product) => {
          const data = await createData(`release-notes-product-${productSlug(product)}.json`, JSON.stringify({ product, entries: byProduct[product] }));
          addRoute({
            path: `${base}/release-notes/p/${productSlug(product)}`,
            component: '@site/docusaurus/components/ReleaseNotes/ProductPage',
            modules: { data },
            exact: true,
          });
        }),
      );
    },

    getPathsToWatch() {
      return [path.join(entriesDir, '*.md')];
    },
  };
};
