/**
 * Retrieve a specific user by ID from the 8x8 Users API.
 *
 * Requirements:
 * - Node.js 14+
 * - axios: npm install axios
 */
const axios = require('axios');

/**
 * Retrieve detailed information for a specific user.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} userId - Unique identifier for the user
 * @param {string} [baseUrl='https://api.8x8.com'] - API base URL
 * @returns {Promise<Object>} Complete user details
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const user = await getUser('your-api-key', 'user-789');
 * console.log(`User: ${user.basicInfo.firstName} ${user.basicInfo.lastName}`);
 * console.log(`Email: ${user.basicInfo.primaryEmail}`);
 * console.log(`Status: ${user.basicInfo.status}`);
 */
async function getUser(apiKey, userId, baseUrl = 'https://api.8x8.com') {
  try {
    const response = await axios.get(
      `${baseUrl}/v1/users/${userId}`,
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
      if (error.response.status === 404) {
        console.error(`User not found: ${userId}`);
      }
      console.error(`HTTP error ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.message);
    } else {
      console.error('Request error:', error.message);
    }
    throw error;
  }
}

module.exports = { getUser };
