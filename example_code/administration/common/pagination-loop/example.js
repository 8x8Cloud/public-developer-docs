const axios = require('axios');

/**
 * Fetch all users using scroll-based pagination.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @param {number} [pageSize=100] - Number of items per page (max: 1000)
 * @returns {Promise<Array>} Array of all user objects
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const users = await fetchAllUsers('your-api-key', undefined, 50);
 * console.log(`Retrieved ${users.length} users total`);
 * users.forEach(user => {
 *   console.log(`- ${user.basicInfo?.userName}`);
 * });
 */
async function fetchAllUsers(apiKey, baseUrl = 'https://api.8x8.com/admin-provisioning', pageSize = 100) {
  const headers = {
    'x-api-key': apiKey,
    'Accept': 'application/vnd.users.v1+json'
  };

  const allUsers = [];
  let scrollId = null;

  try {
    while (true) {
      // Build URL with scrollId if we have one
      const url = scrollId
        ? `${baseUrl}/users?pageSize=${pageSize}&scrollId=${scrollId}`
        : `${baseUrl}/users?pageSize=${pageSize}`;

      const response = await axios.get(url, { headers, timeout: 10000 });
      const pageData = response.data;

      // Add users from this page
      const usersInPage = pageData.data || [];
      allUsers.push(...usersInPage);

      // Check if more pages exist
      const pagination = pageData.pagination || {};
      const hasMore = pagination.hasMore || false;

      if (!hasMore) {
        break;
      }

      // Get scroll ID for next page
      scrollId = pagination.nextScrollId;
      if (!scrollId) {
        break;
      }
    }

    return allUsers;

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

module.exports = { fetchAllUsers };
