const axios = require('axios');

/**
 * Create a new site (asynchronous operation).
 *
 * @param {string} apiKey - Your API authentication key
 * @param {Object} siteData - Site details
 * @param {string} siteData.name - Site name (e.g., "Headquarters")
 * @param {string} siteData.pbxName - Parent PBX name (e.g., "pbx01")
 * @param {string} siteData.addressId - ID of previously created address
 * @param {string} [siteData.locale='en-US'] - Language/locale code
 * @param {string} [siteData.timezone='America/Los_Angeles'] - IANA timezone
 * @param {string} [siteData.siteCode] - Optional site code for extensions
 * @param {number} [siteData.extensionLength] - Optional extension length (digits)
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Operation object with operationId
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const operation = await createSite('your-api-key', {
 *   name: 'Headquarters',
 *   pbxName: 'pbx01',
 *   addressId: 'b1c4944a-17a0-4b00-8d48-36001df07e22',
 *   siteCode: '1345',
 *   extensionLength: 4
 * });
 * console.log(`Site creation started: ${operation.operationId}`);
 * // Poll this operation using pollOperation()
 */
async function createSite(apiKey, siteData, baseUrl = 'https://api.8x8.com/admin-provisioning') {
  const payload = {
    name: siteData.name,
    pbxName: siteData.pbxName,
    locale: siteData.locale || 'en-US',
    timezone: siteData.timezone || 'America/Los_Angeles',
    address: {
      id: siteData.addressId
    }
  };

  if (siteData.siteCode) {
    payload.siteCode = siteData.siteCode;
  }
  if (siteData.extensionLength) {
    payload.extensionLength = siteData.extensionLength;
  }

  try {
    const response = await axios.post(
      `${baseUrl}/sites`,
      payload,
      {
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/vnd.sites.v1+json',
          'Content-Type': 'application/vnd.sites.v1+json'
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

module.exports = { createSite };
