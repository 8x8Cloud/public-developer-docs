const axios = require('axios');

/**
 * Search ring groups with RSQL filters, sorting, and pagination.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} [nameFilter] - Filter ring groups by name (supports wildcards with *)
 * @param {number} [extensionRangeStart] - Filter by minimum extension number
 * @param {number} [extensionRangeEnd] - Filter by maximum extension number
 * @param {string} [sortOrder='name'] - Sort field (use 'name' for ascending, '-name' for descending)
 * @param {number} [pageSize=100] - Number of items per page (default: 100, max: 1000)
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object[]>} Array of ring groups matching the filter criteria
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * // Find all ring groups with "Sales" in the name
 * const groups = await searchRingGroupsWithFilter(
 *   'your-api-key',
 *   '*Sales*',
 *   null,
 *   null,
 *   'name'
 * );
 * console.log(`Found ${groups.length} ring groups`);
 *
 * // Find ring groups by extension range
 * const groups = await searchRingGroupsWithFilter(
 *   'your-api-key',
 *   null,
 *   2000,
 *   2999,
 *   '-name'
 * );
 */
async function searchRingGroupsWithFilter(
  apiKey,
  nameFilter = null,
  extensionRangeStart = null,
  extensionRangeEnd = null,
  sortOrder = 'name',
  pageSize = 100,
  baseUrl = 'https://api.8x8.com/admin-provisioning'
) {
  const headers = {
    'X-API-Key': apiKey,
    'Accept': 'application/vnd.ringgroups.v1+json'
  };

  // Build RSQL filter expression
  const filters = [];
  if (nameFilter) {
    filters.push(`name=="${nameFilter}"`);
  }
  if (extensionRangeStart !== null) {
    filters.push(`extensionNumber>=${extensionRangeStart}`);
  }
  if (extensionRangeEnd !== null) {
    filters.push(`extensionNumber<=${extensionRangeEnd}`);
  }

  const filterExpression = filters.length > 0 ? filters.join(';') : null;

  const allRingGroups = [];
  let scrollId = null;
  let hasMore = true;

  try {
    while (hasMore) {
      // Build query parameters
      const params = {
        pageSize,
        sort: sortOrder
      };
      if (filterExpression) {
        params.filter = filterExpression;
      }
      if (scrollId) {
        params.scrollId = scrollId;
      }

      // Search ring groups
      const response = await axios.get(
        `${baseUrl}/ring-groups`,
        { headers, params, timeout: 10000 }
      );

      const result = response.data;

      // Add ring groups from this page
      const pageData = result.data || [];
      allRingGroups.push(...pageData);
      console.log(`Retrieved page with ${pageData.length} ring groups`);

      // Check for more pages
      const pagination = result.pagination || {};
      hasMore = pagination.hasMore || false;
      scrollId = pagination.nextScrollId;

      if (!hasMore) {
        console.log(`Reached end of results. Total: ${allRingGroups.length} ring groups`);
      }
    }

    return allRingGroups;

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

module.exports = { searchRingGroupsWithFilter };
