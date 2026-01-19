const axios = require('axios');

/**
 * Generate inventory report showing phone number counts by status.
 *
 * @param {string} apiKey - Your API authentication key (must have UC & CC Number Admin scope)
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Object with status names as keys and counts as values
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const counts = await auditPhoneNumbersByStatus('your-api-key');
 * console.log('Phone Number Inventory Summary:');
 * console.log(`  Available:    ${counts.AVAILABLE || 0}`);
 * console.log(`  Assigned:     ${counts.ASSIGNED || 0}`);
 * console.log(`  Porting:      ${counts.PORTING || 0}`);
 * console.log(`  Pre-Porting:  ${counts.PRE_PORTING || 0}`);
 * const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
 * console.log(`  Total:        ${total}`);
 */
async function auditPhoneNumbersByStatus(apiKey, baseUrl = 'https://api.8x8.com/admin-provisioning') {
  const statuses = ['AVAILABLE', 'ASSIGNED', 'PORTING', 'PRE_PORTING'];
  const counts = {};

  for (const status of statuses) {
    let count = 0;
    let scrollId = null;
    let hasMore = true;

    try {
      while (hasMore) {
        const params = scrollId
          ? { scrollId }
          : { filter: `status==${status}`, pageSize: 100 };

        const response = await axios.get(
          `${baseUrl}/phone-numbers`,
          {
            headers: {
              'X-API-Key': apiKey,
              'Accept': 'application/vnd.phonenumbers.v1+json'
            },
            params,
            timeout: 10000
          }
        );

        const result = response.data;
        count += (result.data || []).length;

        const pagination = result.pagination || {};
        hasMore = pagination.hasMore || false;
        scrollId = pagination.nextScrollId;
      }

      counts[status] = count;

    } catch (error) {
      if (error.response) {
        console.error(`HTTP error ${error.response.status} querying ${status}:`, error.response.data);
      } else if (error.request) {
        console.error(`No response received for ${status}:`, error.message);
      } else {
        console.error(`Request error for ${status}:`, error.message);
      }
      throw error;
    }
  }

  return counts;
}

module.exports = { auditPhoneNumbersByStatus };
