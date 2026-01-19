const axios = require('axios');

/**
 * Search sites by name with wildcard filtering.
 *
 * Note: Site search has limited RSQL support - only name field with == operator.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} namePattern - Name pattern with wildcards (e.g., "Office*", "*Branch")
 * @param {Object} [options] - Search options
 * @param {number} [options.pageSize=100] - Number of items per page
 * @param {number} [options.pageNumber=0] - Page number (0-indexed)
 * @param {string} [options.baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Paginated site results
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const results = await searchSitesByName('your-api-key', 'Office*');
 * const sites = results.data || [];
 * console.log(`Found ${sites.length} sites`);
 * sites.forEach(site => console.log(`  - ${site.name}`));
 */
async function searchSitesByName(apiKey, namePattern, options = {}) {
  const pageSize = options.pageSize || 100;
  const pageNumber = options.pageNumber || 0;
  const baseUrl = options.baseUrl || 'https://api.8x8.com/admin-provisioning';

  try {
    const response = await axios.get(
      `${baseUrl}/sites`,
      {
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/vnd.sites.v1+json'
        },
        params: {
          filter: `name==${namePattern}`,
          pageSize: pageSize,
          pageNumber: pageNumber
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

module.exports = { searchSitesByName };
