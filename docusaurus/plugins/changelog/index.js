const path = require('path');
const { loadEntries } = require('./load');

/**
 * Custom plugin: aggregates changelog entry files from a configured directory
 * into plugin global data for the <Changelog> component.
 *
 * The entries directory is passed via options so the plugin itself stays
 * generic; the current single instance is scoped to the Administration API
 * Suite in docusaurus.config.js. See
 * technical-notes/internal/changelog-mechanism.md for how a second suite could
 * opt in.
 *
 * @param {object} context - Docusaurus plugin context (provides siteDir and
 *   siteConfig.baseUrl).
 * @param {object} options - { path: entries dir relative to siteDir }.
 */
module.exports = function changelogPlugin(context, options = {}) {
  const relDir = options.path || 'docs/administration/_changelog';
  const entriesDir = path.resolve(context.siteDir, relDir);

  return {
    name: 'changelog',

    async loadContent() {
      return { entries: loadEntries(entriesDir, context.siteConfig.baseUrl) };
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData({ entries: content.entries });
    },

    getPathsToWatch() {
      return [path.join(entriesDir, '*.md')];
    },
  };
};
