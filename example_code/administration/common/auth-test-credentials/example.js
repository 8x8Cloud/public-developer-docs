const axios = require('axios');

/**
 * Test API credentials with a simple authenticated request.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} API response with user data
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * try {
 *   const result = await testCredentials('your-api-key');
 *   console.log('Credentials are valid!');
 *   console.log(`Found ${result.data?.length || 0} users`);
 * } catch (error) {
 *   console.error('Authentication failed - check your API key');
 * }
 */
async function testCredentials(apiKey, baseUrl = 'https://api.8x8.com/admin-provisioning') {
  try {
    const response = await axios.get(
      `${baseUrl}/users?pageSize=1`,
      {
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/vnd.users.v1+json'
        },
        timeout: 10000
      }
    );
    return response.data;

  } catch (error) {
    if (error.response) {
      console.error(`HTTP error ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.message);
    } else {
      console.error('Request error:', error.message);
    }
    throw error;
  }
}

module.exports = { testCredentials };
