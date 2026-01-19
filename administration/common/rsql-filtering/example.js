const axios = require('axios');

/**
 * Filter users using RSQL query syntax.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} rsqlFilter - RSQL filter expression (will be URL-encoded automatically)
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Array>} Array of users matching the filter
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * // Simple equality filter
 * const users = await filterUsers('your-api-key', 'basicInfo.status==ACTIVE');
 *
 * // Wildcard search
 * const users = await filterUsers('your-api-key', 'basicInfo.primaryEmail==*@example.com');
 *
 * // Logical AND (semicolon)
 * const users = await filterUsers('your-api-key',
 *   'basicInfo.status==ACTIVE;directoryInfo.department==Engineering');
 *
 * // Logical OR (comma)
 * const users = await filterUsers('your-api-key',
 *   'directoryInfo.department==Engineering,directoryInfo.department==Sales');
 *
 * // Complex expression with parentheses
 * const users = await filterUsers('your-api-key',
 *   'basicInfo.status==ACTIVE;(directoryInfo.department==Engineering,directoryInfo.department==Sales)');
 *
 * // Date comparison
 * const users = await filterUsers('your-api-key', 'basicInfo.createdTime>2025-01-01T00:00:00Z');
 *
 * console.log(`Found ${users.length} matching users`);
 */
async function filterUsers(apiKey, rsqlFilter, baseUrl = 'https://api.8x8.com/admin-provisioning') {
  const headers = {
    'x-api-key': apiKey,
    'Accept': 'application/vnd.users.v1+json'
  };

  try {
    // URL-encode the filter
    const encodedFilter = encodeURIComponent(rsqlFilter);
    const url = `${baseUrl}/users?filter=${encodedFilter}&pageSize=100`;

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

module.exports = { filterUsers };
