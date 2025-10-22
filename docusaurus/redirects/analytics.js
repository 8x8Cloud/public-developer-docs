// Redirect configurations for the 8x8 Developer Portal
// Used by @docusaurus/plugin-client-redirects in docusaurus.config.js

// Analytics redirects
const redirects = [
  {
    from: ['/analytics', '/analytics/docs'],
    to: '/analytics/docs/introduction',
  },
  {
    from: '/analytics/docs/work-analytics-historical-cdr-process',
    to: '/analytics/docs/work-analytics-cdr-report',
  },
  {
    from: '/analytics/reference',
    to: '/analytics/reference/authentication-1',
  },
  {
    from: '/analytics/reference/extension-summary-v2',
    to: '/analytics/reference/extension-summary-v-2',
  },
  {
    from: '/analytics/reference/aggregated_3',
    to: '/analytics/reference/aggregated-3',
  },
  {
    from: '/analytics/reference/interactions-1',
    to: '/analytics/reference/interactions',
  },
  {
    from: '/analytics/reference/users-1',
    to: '/analytics/reference/users',
  },
  {
    from: '/analytics/reference/evaluations-1',
    to: '/analytics/reference/evaluations',
  },
  {
    from: '/analytics/reference/report-access',
    to: '/analytics/reference/cc-historical-report-create',
  },
  {
    from: '/analytics/reference/ring-group-member-summary',
    to: '/analytics/docs/ring-group-member-summary',
  },
];

module.exports = redirects;
