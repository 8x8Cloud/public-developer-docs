/**
 * Best practices for handling API rate limits.
 *
 * Requirements:
 * - Node.js 14+
 * - axios: npm install axios
 */
const axios = require('axios');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class RateLimitHandler {
  constructor(apiKey, baseUrl = 'https://api.8x8.com') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.requestsMade = 0;
    this.rateLimitHits = 0;
  }

  _getHeaders() {
    return {
      'x-api-key': this.apiKey,
      'Content-Type': 'application/vnd.users.v1+json',
      'Accept': 'application/vnd.users.v1+json'
    };
  }

  _handleRateLimitHeaders(response) {
    const limit = response.headers['x-ratelimit-limit'];
    const remaining = response.headers['x-ratelimit-remaining'];
    const reset = response.headers['x-ratelimit-reset'];

    if (limit && remaining) {
      console.log(`Rate Limit: ${remaining}/${limit} requests remaining`);

      if (reset) {
        const resetTime = new Date(parseInt(reset) * 1000);
        console.log(`Rate limit resets at: ${resetTime.toISOString()}`);
      }

      // Warn if getting close to limit
      const remainingCount = parseInt(remaining);
      if (remainingCount < 10) {
        console.warn(`WARNING: Only ${remainingCount} requests remaining before rate limit`);
      }
    }
  }

  async _waitForRateLimitReset(resetTimestamp) {
    if (!resetTimestamp) {
      // No reset time provided, use default backoff
      const waitTime = 60000;
      console.log(`No reset time provided, waiting ${waitTime / 1000} seconds...`);
      await sleep(waitTime);
      return;
    }

    try {
      const resetTime = parseInt(resetTimestamp);
      const currentTime = Math.floor(Date.now() / 1000);
      const waitTime = Math.max((resetTime - currentTime + 1) * 1000, 0);

      if (waitTime > 0) {
        console.log(`Rate limit exceeded. Waiting ${waitTime / 1000} seconds until reset...`);
        await sleep(waitTime);
      } else {
        console.log('Rate limit should already be reset, retrying...');
      }
    } catch (error) {
      console.log('Invalid reset timestamp, waiting 60 seconds...');
      await sleep(60000);
    }
  }

  /**
   * Make HTTP request with automatic rate limit retry.
   *
   * @param {string} method - HTTP method (GET, POST, PUT, DELETE)
   * @param {string} endpoint - API endpoint (e.g., '/v1/users')
   * @param {number} [maxRetries=3] - Maximum number of retries for rate limit errors
   * @param {Object} [axiosConfig={}] - Additional axios configuration
   * @returns {Promise<Object|null>} Response data if successful, null on failure
   *
   * @example
   * const handler = new RateLimitHandler('your-api-key');
   * const response = await handler.requestWithRetry('GET', '/v1/users', 3, {
   *   params: { pageSize: 10 }
   * });
   * if (response) {
   *   const users = response.data;
   * }
   */
  async requestWithRetry(method, endpoint, maxRetries = 3, axiosConfig = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = { ...this._getHeaders(), ...axiosConfig.headers };

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        this.requestsMade++;
        const response = await axios({
          method,
          url,
          headers,
          timeout: 10000,
          ...axiosConfig,
          validateStatus: status => status < 500  // Don't throw on 4xx
        });

        // Log rate limit info from headers
        this._handleRateLimitHeaders(response);

        // Check for rate limit error
        if (response.status === 429) {
          this.rateLimitHits++;
          console.log(`Rate limit hit (attempt ${attempt}/${maxRetries})`);

          if (attempt < maxRetries) {
            // Wait based on X-RateLimit-Reset header
            const resetTime = response.headers['x-ratelimit-reset'];
            await this._waitForRateLimitReset(resetTime);
            continue;
          } else {
            console.error('Max retries reached for rate limit');
            return null;
          }
        }

        // Handle other errors
        if (response.status >= 400) {
          console.error(`HTTP error ${response.status}:`, response.data);
          return null;
        }

        return response;

      } catch (error) {
        if (error.response) {
          console.error(`HTTP error ${error.response.status}:`, error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.message);
        } else {
          console.error('Request error:', error.message);
        }
        return null;
      }
    }

    return null;
  }

  getStats() {
    return {
      requestsMade: this.requestsMade,
      rateLimitHits: this.rateLimitHits
    };
  }
}

/**
 * Get users with automatic rate limit handling.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {number} [pageSize=50] - Number of users per page
 * @param {string} [filterQuery] - Optional RSQL filter
 * @param {string} [baseUrl='https://api.8x8.com'] - API base URL
 * @returns {Promise<Object|null>} Users data or null on error
 *
 * @example
 * const users = await getUsersWithRateLimiting(
 *   'your-api-key',
 *   100,
 *   'status==active'
 * );
 * if (users) {
 *   console.log(`Retrieved ${users.data.length} users`);
 * }
 */
async function getUsersWithRateLimiting(
  apiKey,
  pageSize = 50,
  filterQuery = null,
  baseUrl = 'https://api.8x8.com'
) {
  const handler = new RateLimitHandler(apiKey, baseUrl);

  const params = { pageSize };
  if (filterQuery) {
    params.filter = filterQuery;
  }

  const response = await handler.requestWithRetry('GET', '/v1/users', 3, { params });

  if (response) {
    const stats = handler.getStats();
    console.log(`\nRequest stats:`, stats);
    return response.data;
  }

  return null;
}

module.exports = { RateLimitHandler, getUsersWithRateLimiting };
