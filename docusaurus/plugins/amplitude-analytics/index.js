/**
 * Custom Docusaurus plugin for Amplitude analytics integration.
 *
 * This plugin provides page view tracking and user properties via Amplitude.
 * It gracefully degrades if AMPLITUDE_API_KEY is not set - no errors will be thrown.
 *
 * Features:
 * - Tracks page views on initial load and navigation
 * - Captures user properties (browser info, session metadata)
 * - Production-only tracking (respects NODE_ENV)
 * - Safe to run without API key configured
 */

const path = require('path');

module.exports = function amplitudeAnalyticsPlugin(context, options) {
  const { siteConfig } = context;
  const { AMPLITUDE_API_KEY } = process.env;

  return {
    name: 'amplitude-analytics-plugin',

    getClientModules() {
      // Return the client module that will be included in the bundle
      return [path.resolve(__dirname, './analytics.js')];
    },

    injectHtmlTags() {
      // Only inject in production and if API key is set
      const isProd = process.env.NODE_ENV === 'production';

      if (!isProd || !AMPLITUDE_API_KEY) {
        return {};
      }

      // Inject Amplitude SDK from CDN
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              type: 'text/javascript',
              src: 'https://cdn.amplitude.com/libs/analytics-browser-2.3.8-min.js.gz',
              async: true,
            },
          },
        ],
      };
    },

    // Pass the API key to the client module via global config
    configureWebpack() {
      return {
        plugins: [
          new (require('webpack')).DefinePlugin({
            'process.env.AMPLITUDE_API_KEY': JSON.stringify(AMPLITUDE_API_KEY || ''),
          }),
        ],
      };
    },
  };
};
