// Redirects for Converse
//
// Converse moved out of the Connect area into its own top-level `/converse`
// section. Every path below was live under /connect, so it must keep resolving.
//
// Targets are written directly rather than chained — plugin-client-redirects does
// not follow a redirect to another redirect, so /connect/docs/moobidesk/* points
// straight at its final /converse/docs/* destination rather than via
// /connect/docs/converse/*.

const converseRedirects = [
  // Section landing paths. The Guides / API Reference tabs in SectionNavigation link
  // to /converse/docs and /converse/reference, which are route prefixes rather than
  // pages, so each needs a redirect to a real first page — the same pattern the other
  // areas use (/connect/docs -> /connect/docs/8x8-cpaas-products).
  { from: '/converse/docs', to: '/converse/docs/getting-started' },
  { from: '/converse/reference', to: '/converse/reference/close-conversation' },

  // Converse moved from /connect/docs/converse to /converse
  { from: '/connect/docs/converse', to: '/converse' },
  { from: '/connect/docs/converse-overview', to: '/converse' },
  {
    from: '/connect/docs/converse/getting-started',
    to: '/converse/docs/getting-started',
  },
  { from: '/connect/docs/converse/user-roles', to: '/converse/docs/user-roles' },
  { from: '/connect/docs/converse/contacts', to: '/converse/docs/contacts' },
  { from: '/connect/docs/converse/agents', to: '/converse/docs/agents' },
  { from: '/connect/docs/converse/queue', to: '/converse/docs/queue' },
  {
    from: '/connect/docs/converse/conversations',
    to: '/converse/docs/conversations',
  },
  { from: '/connect/docs/converse/reports', to: '/converse/docs/reports' },
  { from: '/connect/docs/converse/settings', to: '/converse/docs/settings' },

  // Moobidesk was renamed to Converse before the move, so the original
  // /connect/docs/moobidesk/* paths are retargeted at the new location directly.
  { from: '/connect/docs/moobidesk', to: '/converse' },
  {
    from: '/connect/docs/moobidesk/getting-started',
    to: '/converse/docs/getting-started',
  },
  {
    from: '/connect/docs/moobidesk/user-roles',
    to: '/converse/docs/user-roles',
  },
  { from: '/connect/docs/moobidesk/contacts', to: '/converse/docs/contacts' },
  { from: '/connect/docs/moobidesk/agents', to: '/converse/docs/agents' },
  { from: '/connect/docs/moobidesk/queue', to: '/converse/docs/queue' },
  {
    from: '/connect/docs/moobidesk/conversations',
    to: '/converse/docs/conversations',
  },
  { from: '/connect/docs/moobidesk/reports', to: '/converse/docs/reports' },
  { from: '/connect/docs/moobidesk/settings', to: '/converse/docs/settings' },
];

module.exports = converseRedirects;
