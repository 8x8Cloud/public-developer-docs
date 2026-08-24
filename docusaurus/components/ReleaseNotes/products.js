// Canonical Release Notes product registry + change types.
//
// CommonJS on purpose: this is the single source of truth shared by two runtimes —
//   • the React component (`links.js`), bundled by webpack, imports it; and
//   • the build-time validator (`scripts/validate-release-notes.js`), run by Node,
//     `require`s it directly.
// Keeping one module means a new product is registered in exactly one place and the
// validator can never drift from what the UI renders.
//
// Display order is meaningful: each product's colour comes from its position here,
// mapped to the Oxygen `--data01…--data11` categorical tokens in styles.module.css
// (product N → --data0N). `colorIndex` is that 1-based position.

const PRODUCTS = [
  { name: 'Connect', doc: '/connect/docs', group: 'CPaaS' },
  { name: 'Converse', doc: '/connect/docs/converse', group: 'CPaaS' },
  { name: 'Video Interaction', doc: '/connect/docs/vi-overview', group: 'CPaaS' },
  { name: 'APIs', doc: '/connect/reference', group: 'CPaaS' },
  { name: 'Integration', doc: '/connect/docs/integrations-overview', group: 'CPaaS' },
  { name: 'Analytics', doc: '/analytics/docs' },
  { name: 'Actions & Events', doc: '/actions-events/docs' },
  { name: 'JaaS', doc: '/jaas/docs' },
  { name: 'Tech Partner', doc: '/tech-partner/docs' },
  { name: 'Administration', doc: '/administration/docs' },
  { name: 'Resolve', doc: '/resolve/docs/overview' },
].map((p, i) => ({ ...p, colorIndex: i + 1 }));

// Allowed changeType values (also the visual stripe order).
const TYPES = ['Added', 'Changed', 'Fixed', 'Deprecated'];

// Parent groups in display order (products with no `group` render on their own).
const PRODUCT_GROUPS = ['CPaaS'];

const PRODUCT_NAMES = PRODUCTS.map((p) => p.name);

// URL-safe slug. Shared so the React link helper (productSlug) and the plugin
// that mints the /release-notes/p/<slug> routes derive slugs identically —
// otherwise a product permalink would 404 with nothing to catch it.
function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
function productSlug(name) {
  return slugify(name);
}

module.exports = { PRODUCTS, TYPES, PRODUCT_GROUPS, PRODUCT_NAMES, slugify, productSlug };
