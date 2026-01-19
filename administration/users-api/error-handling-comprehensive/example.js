const axios = require('axios');

/**
 * API Error Classes
 */
class APIError extends Error {
  constructor(message, statusCode = null, errorData = {}) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
    this.errorData = errorData;
  }
}

class RetryableError extends APIError {
  constructor(message, statusCode = null, errorData = {}) {
    super(message, statusCode, errorData);
    this.name = 'RetryableError';
  }
}

class NonRetryableError extends APIError {
  constructor(message, statusCode = null, errorData = {}) {
    super(message, statusCode, errorData);
    this.name = 'NonRetryableError';
  }
}

/**
 * Comprehensive API error handler wrapper with automatic retry logic.
 *
 * @param {Function} apiFunction - Async function to wrap with error handling
 * @param {Object} [options={}] - Configuration options
 * @param {number} [options.maxRetries=3] - Maximum retry attempts
 * @param {number} [options.retryDelay=1000] - Initial retry delay in milliseconds
 * @returns {Function} Wrapped function with error handling
 *
 * @example
 * const getUserWithErrorHandling = withErrorHandling(
 *   async (apiKey, userId, baseUrl = 'https://api.8x8.com') => {
 *     const response = await axios.get(
 *       `${baseUrl}/users/${userId}`,
 *       {
 *         headers: {
 *           'X-API-Key': apiKey,
 *           'Accept': 'application/vnd.users.v1+json'
 *         },
 *         timeout: 10000
 *       }
 *     );
 *     return response.data;
 *   },
 *   { maxRetries: 3, retryDelay: 1000 }
 * );
 *
 * try {
 *   const user = await getUserWithErrorHandling('your-api-key', 'user-123');
 *   console.log(`Found user: ${user.basicInfo.firstName}`);
 * } catch (error) {
 *   if (error instanceof NonRetryableError) {
 *     console.error(`Cannot retry: ${error.message}`);
 *     if (error.errorData.errors) {
 *       error.errorData.errors.forEach(err => {
 *         console.error(`  ${err.field}: ${err.message}`);
 *       });
 *     }
 *   } else if (error instanceof RetryableError) {
 *     console.error(`Service unavailable: ${error.message}`);
 *   }
 * }
 */
function withErrorHandling(apiFunction, options = {}) {
  const { maxRetries = 3, retryDelay = 1000 } = options;

  return async function (...args) {
    let attempt = 0;
    let currentDelay = retryDelay;

    while (attempt <= maxRetries) {
      try {
        return await apiFunction(...args);

      } catch (error) {
        attempt++;

        // Handle Axios errors
        if (error.response) {
          const statusCode = error.response.status;
          const errorData = error.response.data || {};

          // Extract detailed error information
          const errorTitle = errorData.title || 'HTTP Error';
          const errorDetail = errorData.detail || error.message;
          const fieldErrors = errorData.errors || [];

          // Build comprehensive error message
          let errorMessage = `HTTP ${statusCode}: ${errorTitle}`;
          if (errorDetail) {
            errorMessage += ` - ${errorDetail}`;
          }

          // Add field-level errors if present
          if (fieldErrors.length > 0) {
            errorMessage += '\nField errors:';
            fieldErrors.forEach(fieldError => {
              const field = fieldError.field || 'unknown';
              const code = fieldError.code || 'UNKNOWN';
              const msg = fieldError.message || '';
              errorMessage += `\n  - ${field}: [${code}] ${msg}`;
            });
          }

          // Log error details
          console.error('API error:', errorMessage, {
            statusCode,
            errorData,
            attempt,
            maxRetries
          });

          // Classify error as retryable or non-retryable
          if (statusCode === 429) {  // Rate limit
            // Extract retry-after header
            const rateLimitReset = error.response.headers['x-ratelimit-reset'];
            if (rateLimitReset) {
              const waitTime = Math.max(parseInt(rateLimitReset) - Math.floor(Date.now() / 1000), 1);
              console.warn(`Rate limited. Waiting ${waitTime}s until reset...`);
              if (attempt <= maxRetries) {
                await sleep(waitTime * 1000);
                continue;
              }
            }

            // Fall back to exponential backoff
            if (attempt <= maxRetries) {
              console.warn(`Rate limited. Retrying in ${currentDelay / 1000}s... (attempt ${attempt}/${maxRetries})`);
              await sleep(currentDelay);
              currentDelay *= 2;
              continue;
            } else {
              throw new RetryableError(
                `Rate limit exceeded: ${errorMessage}`,
                statusCode,
                errorData
              );
            }

          } else if ([500, 502, 503, 504].includes(statusCode)) {  // Server errors
            if (attempt <= maxRetries) {
              console.warn(`Server error. Retrying in ${currentDelay / 1000}s... (attempt ${attempt}/${maxRetries})`);
              await sleep(currentDelay);
              currentDelay *= 2;
              continue;
            } else {
              throw new RetryableError(
                `Server error after ${maxRetries} retries: ${errorMessage}`,
                statusCode,
                errorData
              );
            }

          } else if (statusCode === 424) {  // Failed dependency
            if (attempt <= maxRetries) {
              console.warn(`Dependency failure. Retrying in ${currentDelay / 1000}s... (attempt ${attempt}/${maxRetries})`);
              await sleep(currentDelay);
              currentDelay *= 2;
              continue;
            } else {
              throw new RetryableError(
                `Dependency failure: ${errorMessage}`,
                statusCode,
                errorData
              );
            }

          } else if ([400, 401, 403, 404, 409].includes(statusCode)) {  // Client errors (non-retryable)
            let message;
            if (statusCode === 400) {
              message = `Validation error: ${errorMessage}`;
            } else if (statusCode === 401) {
              message = 'Authentication failed: Check your API key';
            } else if (statusCode === 403) {
              message = `Permission denied: ${errorDetail}`;
            } else if (statusCode === 404) {
              message = `Resource not found: ${errorDetail}`;
            } else if (statusCode === 409) {
              message = `Conflict: ${errorDetail}`;
            } else {
              message = errorMessage;
            }

            throw new NonRetryableError(message, statusCode, errorData);

          } else {  // Unknown status code
            throw new APIError(
              `Unexpected error: ${errorMessage}`,
              statusCode,
              errorData
            );
          }

        } else if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
          // Timeout error
          console.error('Request timeout:', error.message);

          if (attempt <= maxRetries) {
            console.warn(`Timeout. Retrying in ${currentDelay / 1000}s... (attempt ${attempt}/${maxRetries})`);
            await sleep(currentDelay);
            currentDelay *= 2;
            continue;
          } else {
            throw new RetryableError(
              `Request timeout after ${maxRetries} retries`,
              null,
              { originalError: error.message }
            );
          }

        } else if (error.request) {
          // Connection error (no response received)
          console.error('Connection error:', error.message);

          if (attempt <= maxRetries) {
            console.warn(`Connection error. Retrying in ${currentDelay / 1000}s... (attempt ${attempt}/${maxRetries})`);
            await sleep(currentDelay);
            currentDelay *= 2;
            continue;
          } else {
            throw new RetryableError(
              `Connection error after ${maxRetries} retries: Network unavailable`,
              null,
              { originalError: error.message }
            );
          }

        } else {
          // Generic error (non-retryable)
          console.error('Request failed:', error.message);
          throw new APIError(
            `Request failed: ${error.message}`,
            null,
            { originalError: error.message }
          );
        }
      }
    }
  };
}

/**
 * Sleep utility function
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Example: Get user with comprehensive error handling
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} userId - User ID to retrieve
 * @param {string} [baseUrl='https://api.8x8.com'] - API base URL
 * @returns {Promise<Object>} User data
 * @throws {NonRetryableError} For validation errors, auth failures
 * @throws {RetryableError} For rate limits, server errors after max retries
 *
 * @example
 * try {
 *   const user = await getUserWithErrorHandling('your-api-key', 'user-123');
 *   console.log(`Found user: ${user.basicInfo.firstName}`);
 * } catch (error) {
 *   if (error instanceof NonRetryableError) {
 *     console.error(`Cannot retry: ${error.message}`);
 *     if (error.errorData.errors) {
 *       error.errorData.errors.forEach(err => {
 *         console.error(`  ${err.field}: ${err.message}`);
 *       });
 *     }
 *   } else if (error instanceof RetryableError) {
 *     console.error(`Service unavailable: ${error.message}`);
 *   }
 * }
 */
const getUserWithErrorHandling = withErrorHandling(
  async (apiKey, userId, baseUrl = 'https://api.8x8.com') => {
    const response = await axios.get(
      `${baseUrl}/users/${userId}`,
      {
        headers: {
          'X-API-Key': apiKey,
          'Accept': 'application/vnd.users.v1+json'
        },
        timeout: 10000
      }
    );
    return response.data;
  },
  { maxRetries: 3, retryDelay: 1000 }
);

module.exports = {
  withErrorHandling,
  getUserWithErrorHandling,
  APIError,
  RetryableError,
  NonRetryableError
};
