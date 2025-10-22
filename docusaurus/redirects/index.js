// Redirect configurations for the 8x8 Developer Portal
// Used by @docusaurus/plugin-client-redirects in docusaurus.config.js

const actionsEventsRedirects = require('./actions-events.js');
const analyticsRedirects = require('./analytics.js');
const connectRedirects = require('./connect.js');
const contactCenterRedirects = require('./contactcenter.js');
const jaasRedirects = require('./jaas.js');
const techPartnerRedirects = require('./tech-partner.js');

const redirects = [
  // Actions & Events redirects
  ...actionsEventsRedirects,

  // Analytics redirects
  ...analyticsRedirects,

  // Connect redirects
  ...connectRedirects,

  // Contact Center redirects
  ...contactCenterRedirects,

  // JaaS redirects
  ...jaasRedirects,

  // Tech Partner redirects
  ...techPartnerRedirects,
];

module.exports = redirects;
