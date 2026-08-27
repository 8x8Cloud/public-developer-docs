// Redirect configurations for the 8x8 Developer Portal
// Used by @docusaurus/plugin-client-redirects in docusaurus.config.js

const actionsEventsRedirects = require('./actions-events.js');
const administrationRedirects = require('./administration.js');
const analyticsRedirects = require('./analytics.js');
const connectRedirects = require('./connect.js');
const contactCenterRedirects = require('./contactcenter.js');
const converseRedirects = require('./converse.js');
const jaasRedirects = require('./jaas.js');
const techPartnerRedirects = require('./tech-partner.js');

const redirects = [
  // Actions & Events redirects
  ...actionsEventsRedirects,

  // Administration redirects
  ...administrationRedirects,

  // Analytics redirects
  ...analyticsRedirects,

  // Connect redirects
  ...connectRedirects,

  // Converse redirects
  ...converseRedirects,

  // Contact Center redirects
  ...contactCenterRedirects,

  // JaaS redirects
  ...jaasRedirects,

  // Tech Partner redirects
  ...techPartnerRedirects,
];

module.exports = redirects;
