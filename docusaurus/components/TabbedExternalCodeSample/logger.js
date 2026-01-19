/**
 * Environment-aware logger that only logs in non-production environments
 * Wraps console methods to prevent logging in production builds
 */

const LOG_PREFIX = '[TabbedExternalCodeSample]';

/**
 * Wraps a console function to only execute in non-production environments
 * @param {Function} fn - Console function to wrap
 * @returns {Function} Wrapped function
 */
function applyLogging(fn) {
  return (...args) => {
    if (process.env.NODE_ENV !== 'production') {
      fn(LOG_PREFIX, ...args);
    }
  };
}

const logger = {
  log: applyLogging(console.log),
  error: applyLogging(console.error),
  warn: applyLogging(console.warn),
  group: applyLogging(console.group),
  groupEnd: () => {
    if (process.env.NODE_ENV !== 'production') {
      console.groupEnd();
    }
  },
};

export default logger;
