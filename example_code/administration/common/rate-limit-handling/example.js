const axios = require('axios');

/**
 * Fetch users with rate limit handling and exponential backoff.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @param {number} [maxRetries=5] - Maximum retry attempts when rate limited
 * @returns {Promise<Object|null>} User data with rate limit info, or null on error
 *
 * @example
 * try {
 *   const result = await getUsersWithRateLimiting('your-api-key');
 *   if (result) {
 *     console.log(`Retrieved ${result.data.length} users`);
 *     console.log(`Rate limit remaining: ${result.rateLimit.remaining}`);
 *   }
 * } catch (error) {
 *   console.error('Failed to retrieve users');
 * }
 */
async function getUsersWithRateLimiting(apiKey, baseUrl = 'https://api.8x8.com/admin-provisioning', maxRetries = 5) {
  const headers = {
    'x-api-key': apiKey,
    'Accept': 'application/vnd.users.v1+json'
  };

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await axios.get(
        `${baseUrl}/users?pageSize=100`,
        { headers, timeout: 10000, validateStatus: status => status < 500 }
      );

      // Extract rate limit headers
      const rateLimitLimit = response.headers['x-ratelimit-limit'];
      const rateLimitRemaining = response.headers['x-ratelimit-remaining'];
      const rateLimitReset = response.headers['x-ratelimit-reset'];

      // Proactive throttling: slow down if remaining is low
      if (rateLimitRemaining && parseInt(rateLimitRemaining) < 10) {
        console.log(`Rate limit low (${rateLimitRemaining} remaining). Slowing down...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Handle rate limit exceeded
      if (response.status === 429) {
        console.error('Rate limit exceeded');
        console.error(`Limit: ${rateLimitLimit}, Remaining: ${rateLimitRemaining}, Reset: ${rateLimitReset}`);

        if (attempt < maxRetries - 1) {
          // Calculate wait time until reset
          let waitTime;
          if (rateLimitReset) {
            const waitUntilReset = parseInt(rateLimitReset) - Math.floor(Date.now() / 1000);
            waitTime = Math.max(waitUntilReset, 0) * 1000;
          } else {
            // Fallback to exponential backoff if no reset time
            waitTime = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s, 8s, 16s
          }

          console.log(`Waiting ${waitTime / 1000} seconds before retry... (attempt ${attempt + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        } else {
          console.error('Max retries reached');
          return null;
        }
      }

      // Include rate limit info in response
      return {
        data: response.data.data || [],
        pagination: response.data.pagination || {},
        rateLimit: {
          limit: rateLimitLimit,
          remaining: rateLimitRemaining,
          reset: rateLimitReset
        }
      };

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

module.exports = { getUsersWithRateLimiting };
