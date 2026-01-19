const axios = require('axios');

/**
 * Check if an address can be deleted by examining its usage counts.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} addressId - Address identifier
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Address with usage information
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const address = await checkAddressUsage('your-api-key', 'addr_ny_shared');
 * const usage = address.addressUsage || {};
 * const totalUsage = Object.values(usage).reduce((sum, count) => sum + count, 0);
 * if (totalUsage === 0) {
 *   console.log('Address can be safely deleted');
 * } else {
 *   console.log(`Address in use: ${totalUsage} references`);
 *   Object.entries(usage).forEach(([category, count]) => {
 *     if (count > 0) console.log(`  - ${category}: ${count}`);
 *   });
 * }
 */
async function checkAddressUsage(apiKey, addressId, baseUrl = 'https://api.8x8.com/admin-provisioning') {
  try {
    const response = await axios.get(
      `${baseUrl}/addresses/${addressId}`,
      {
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/vnd.addresses.v1+json'
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

module.exports = { checkAddressUsage };
