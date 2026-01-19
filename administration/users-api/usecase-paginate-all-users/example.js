/**
 * List and filter users with pagination support.
 *
 * Requirements:
 * - Node.js 14+
 * - axios: npm install axios
 */
const axios = require('axios');

/**
 * Retrieve all users matching filter criteria using pagination.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} [filterQuery] - RSQL filter expression
 * @param {number} [pageSize=50] - Items per page (max: 100)
 * @param {string} [baseUrl='https://api.8x8.com'] - API base URL
 * @returns {AsyncGenerator<Object>} Yields each user
 *
 * @example
 * for await (const user of listAndFilterUsers(
 *   'your-api-key',
 *   'status==active;department==Engineering'
 * )) {
 *   console.log(`${user.basicInfo.userName}: ${user.basicInfo.primaryEmail}`);
 * }
 */
async function* listAndFilterUsers(
  apiKey,
  filterQuery = null,
  pageSize = 50,
  baseUrl = 'https://api.8x8.com'
) {
  let params = { pageSize: Math.min(pageSize, 100) };
  if (filterQuery) {
    params.filter = filterQuery;
  }

  let scrollId = null;
  let pageCount = 0;

  while (true) {
    try {
      // Use scrollId for subsequent pages
      if (scrollId) {
        params = { scrollId };
      }

      const response = await axios.get(
        `${baseUrl}/v1/users`,
        {
          headers: {
            'x-api-key': apiKey,
            'Accept': 'application/vnd.users.v1+json'
          },
          params,
          timeout: 10000
        }
      );

      const users = response.data.data || [];
      const pagination = response.data.pagination || {};
      pageCount++;

      console.log(`Page ${pageCount}: Retrieved ${users.length} users`);

      // Yield each user
      for (const user of users) {
        yield user;
      }

      // Check if there are more pages
      if (!pagination.hasMore) {
        console.log(`Completed: Retrieved all users across ${pageCount} pages`);
        break;
      }

      scrollId = pagination.nextScrollId;
      if (!scrollId) {
        console.log('No more pages available');
        break;
      }

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
}

/**
 * Retrieve all users as an array (convenience wrapper).
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} [filterQuery] - RSQL filter expression
 * @param {number} [pageSize=50] - Items per page
 * @param {string} [baseUrl='https://api.8x8.com'] - API base URL
 * @returns {Promise<Array>} All users matching the filter
 *
 * @example
 * const users = await getAllUsersList('your-api-key', 'status==active');
 * console.log(`Found ${users.length} active users`);
 */
async function getAllUsersList(apiKey, filterQuery = null, pageSize = 50, baseUrl = 'https://api.8x8.com') {
  const users = [];
  for await (const user of listAndFilterUsers(apiKey, filterQuery, pageSize, baseUrl)) {
    users.push(user);
  }
  return users;
}

module.exports = { listAndFilterUsers, getAllUsersList };
