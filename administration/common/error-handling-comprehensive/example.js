const axios = require('axios');

/**
 * Get a user with comprehensive error handling and retry logic.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} userId - The user ID to retrieve
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @param {number} [maxRetries=3] - Maximum retry attempts for transient errors
 * @returns {Promise<Object|null>} User data, or null on error
 *
 * @example
 * try {
 *   const user = await getUserWithRetry('your-api-key', 'hvOB1l3zDCaDAwp9tNLzZA');
 *   if (user) {
 *     console.log(`User: ${user.basicInfo?.userName}`);
 *   }
 * } catch (error) {
 *   console.error('Failed to retrieve user');
 * }
 */
async function getUserWithRetry(apiKey, userId, baseUrl = 'https://api.8x8.com/admin-provisioning', maxRetries = 3) {
  const headers = {
    'x-api-key': apiKey,
    'Accept': 'application/vnd.users.v1+json'
  };

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await axios.get(
        `${baseUrl}/users/${userId}`,
        { headers, timeout: 10000 }
      );
      return response.data;

    } catch (error) {
      const statusCode = error.response?.status;
      const responseBody = error.response?.data || {};

      // 401: Authentication error - don't retry
      if (statusCode === 401) {
        console.error('Authentication failed: Invalid or missing API key');
        console.error(`Request ID: ${responseBody.requestId || 'N/A'}`);
        return null;
      }

      // 403: Authorization error - don't retry
      else if (statusCode === 403) {
        console.error('Authorization failed: Insufficient permissions or customer ID mismatch');
        console.error(`Detail: ${responseBody.detail || 'No details provided'}`);
        return null;
      }

      // 404: Not found - don't retry
      else if (statusCode === 404) {
        console.error(`User not found: ${userId}`);
        return null;
      }

      // 400: Validation error - don't retry
      else if (statusCode === 400) {
        console.error('Validation error:');
        const errors = responseBody.errors || [];
        errors.forEach(err => {
          console.error(`  - ${err.field}: ${err.message}`);
        });
        return null;
      }

      // 429: Rate limit - retry with exponential backoff
      else if (statusCode === 429) {
        const resetTime = error.response.headers['x-ratelimit-reset'];
        console.error(`Rate limit exceeded. Reset time: ${resetTime}`);

        if (attempt < maxRetries - 1) {
          const waitTime = Math.pow(2, attempt) * 1000; // Exponential backoff: 1s, 2s, 4s
          console.log(`Retrying in ${waitTime / 1000} seconds... (attempt ${attempt + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        } else {
          console.error('Max retries reached');
          return null;
        }
      }

      // 500: Server error - retry
      else if (statusCode === 500) {
        console.error('Server error occurred');

        if (attempt < maxRetries - 1) {
          const waitTime = Math.pow(2, attempt) * 1000;
          console.log(`Retrying in ${waitTime / 1000} seconds... (attempt ${attempt + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        } else {
          console.error('Max retries reached');
          return null;
        }
      }

      // Other HTTP errors - don't retry
      else if (error.response) {
        console.error(`HTTP error ${statusCode}: ${responseBody.title || 'Unknown error'}`);
        console.error(`Detail: ${responseBody.detail || 'No details provided'}`);
        return null;
      }

      // Network/timeout errors - retry
      else if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
        console.error('Request timed out');

        if (attempt < maxRetries - 1) {
          const waitTime = Math.pow(2, attempt) * 1000;
          console.log(`Retrying in ${waitTime / 1000} seconds... (attempt ${attempt + 1}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          continue;
        } else {
          console.error('Max retries reached');
          return null;
        }
      }

      // Other errors - don't retry
      else {
        console.error(`Request failed: ${error.message}`);
        return null;
      }
    }
  }

  return null;
}

module.exports = { getUserWithRetry };
