/**
 * Custom Docusaurus plugin that adds client-side redirects to React Router.
 *
 * This plugin works alongside @docusaurus/plugin-client-redirects:
 * - @docusaurus/plugin-client-redirects: Creates static HTML files for external links (full page loads)
 * - This plugin: Adds React Router routes for internal navigation (client-side navigation)
 *
 * Both are needed for complete redirect coverage.
 */

const path = require('path');

/**
 * Generate redirects with proper baseUrl handling for React Router
 * @param {Array} baseRedirects - Base redirect configurations without baseUrl
 * @param {string} baseUrl - The base URL from Docusaurus config (e.g., '/' or '/pr-15/')
 * @returns {Array} - Array of redirect configurations with baseUrl prepended
 */
function getRedirects(baseRedirects, baseUrl = '/') {
  // For root baseUrl, return redirects as-is
  if (baseUrl === '/') {
    return baseRedirects;
  }

  // For non-root baseUrl (e.g., '/pr-15/'), prepend to all paths
  const normalizedBase = baseUrl.replace(/\/$/, ''); // Remove trailing slash

  return baseRedirects.map(redirect => ({
    from: Array.isArray(redirect.from)
      ? redirect.from.map(path => `${normalizedBase}${path}`)
      : `${normalizedBase}${redirect.from}`,
    to: `${normalizedBase}${redirect.to}`,
  }));
}

module.exports = function clientSideRedirectsPlugin(context, options) {
  return {
    name: 'client-side-redirects-plugin',

    async contentLoaded({ actions }) {
      const { addRoute, createData } = actions;

      // Get baseUrl from context
      const { baseUrl } = context.siteConfig;

      // Load base redirect configurations and generate redirects with baseUrl
      const baseRedirects = require('../../redirects/index.js');
      const redirects = getRedirects(baseRedirects, baseUrl);

      // Process each redirect and add a route
      for (const redirect of redirects) {
        const fromPaths = Array.isArray(redirect.from)
          ? redirect.from
          : [redirect.from];

        for (const fromPath of fromPaths) {
          // Create a unique data file for this redirect
          // Replace slashes with dashes to create valid filenames
          const dataFileName = `redirect-${fromPath.replace(/\//g, '-')}.json`;
          const redirectDataPath = await createData(
            dataFileName,
            JSON.stringify({ to: redirect.to }),
          );

          // Add a route for each 'from' path that redirects to the 'to' path
          // Docusaurus automatically handles baseUrl prepending for routes
          addRoute({
            path: fromPath,
            component: path.resolve(__dirname, './RedirectComponent.js'),
            exact: true,
            // Pass the redirect target via modules (the Docusaurus way)
            modules: {
              redirectTarget: redirectDataPath,
            },
          });
        }
      }
    },
  };
};
