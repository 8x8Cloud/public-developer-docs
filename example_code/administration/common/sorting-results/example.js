const axios = require('axios');

/**
 * Fetch users sorted by specified field(s).
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} sortExpression - Sort expression (e.g., "+lastName" or "-createdTime")
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Array>} Array of users in sorted order
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * // Ascending by last name (A-Z)
 * const users = await sortUsers('your-api-key', '+basicInfo.lastName');
 *
 * // Descending by creation date (newest first)
 * const users = await sortUsers('your-api-key', '-basicInfo.createdTime');
 *
 * // Multi-field sort: department (A-Z), then last name (A-Z), then first name (A-Z)
 * const users = await sortUsers('your-api-key',
 *   '+directoryInfo.department,+basicInfo.lastName,+basicInfo.firstName');
 *
 * // Ascending without + prefix (equivalent)
 * const users = await sortUsers('your-api-key', 'basicInfo.lastName');
 *
 * console.log(`Retrieved ${users.length} users in sorted order`);
 * users.slice(0, 5).forEach(user => {
 *   const info = user.basicInfo || {};
 *   console.log(`- ${info.lastName}, ${info.firstName}`);
 * });
 */
async function sortUsers(apiKey, sortExpression, baseUrl = 'https://api.8x8.com/admin-provisioning') {
  const headers = {
    'x-api-key': apiKey,
    'Accept': 'application/vnd.users.v1+json'
  };

  try {
    const url = `${baseUrl}/users?sort=${sortExpression}&pageSize=100`;

    const response = await axios.get(url, { headers, timeout: 10000 });
    return response.data.data || [];

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

module.exports = { sortUsers };
