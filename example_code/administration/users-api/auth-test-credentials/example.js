/**
 * Test authentication with the 8x8 Users API.
 *
 * Requirements:
 * - Node.js 14+
 * - axios: npm install axios
 */
const axios = require('axios');

/**
 * Test API authentication by making a simple request.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} [baseUrl='https://api.8x8.com'] - API base URL
 * @returns {Promise<Object>} API response data
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * testAuthentication('your-api-key')
 *   .then(() => console.log('Authentication successful!'))
 *   .catch(err => console.error('Authentication failed:', err.message));
 */
async function testAuthentication(apiKey, baseUrl = 'https://api.8x8.com') {
  try {
    const response = await axios.get(
      `${baseUrl}/v1/users`,
      {
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/vnd.users.v1+json',
          'Accept': 'application/vnd.users.v1+json'
        },
        params: {
          pageSize: 1
        },
        timeout: 10000
      }
    );
    console.log('Authentication successful!');
    return response.data;

  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Authentication failed: Invalid or missing API key');
        console.error('Response:', error.response.data);
      } else {
        console.error(`HTTP error ${error.response.status}:`, error.response.data);
      }
    } else if (error.request) {
      console.error('No response received:', error.message);
    } else {
      console.error('Request error:', error.message);
    }
    throw error;
  }
}

module.exports = { testAuthentication };
