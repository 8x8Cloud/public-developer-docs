const axios = require('axios');

/**
 * Create a site with emergency address and notification configuration.
 *
 * This is a complete two-step workflow: creates address, then creates site.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {Object} config - Site configuration
 * @param {string} config.siteName - Site name (e.g., "San Francisco Office")
 * @param {string} config.pbxName - Parent PBX name (e.g., "pbx01")
 * @param {Object} config.addressData - Address details with streetNumber, streetName, city, state, postal, country
 * @param {string[]} config.emergencyEmails - Email addresses for emergency notifications
 * @param {string} [config.locale='en-US'] - Language/locale code
 * @param {string} [config.timezone='America/Los_Angeles'] - IANA timezone
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Operation object with operationId
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const operation = await createEmergencyReadySite('your-api-key', {
 *   siteName: 'San Francisco Office',
 *   pbxName: 'pbx01',
 *   addressData: {
 *     streetNumber: '100',
 *     streetName: 'Market St',
 *     city: 'San Francisco',
 *     state: 'CA',
 *     postal: '94105',
 *     country: 'US'
 *   },
 *   emergencyEmails: ['security@company.com', 'facilities@company.com']
 * });
 * console.log(`Site creation started: ${operation.operationId}`);
 */
async function createEmergencyReadySite(apiKey, config, baseUrl = 'https://api.8x8.com/admin-provisioning') {
  // Step 1: Create address
  let addressId;
  try {
    const addressResponse = await axios.post(
      `${baseUrl}/addresses`,
      config.addressData,
      {
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/vnd.addresses.v1+json',
          'Content-Type': 'application/vnd.addresses.v1+json'
        },
        timeout: 10000
      }
    );
    addressId = addressResponse.data.id;
    console.log(`Address created with ID: ${addressId}`);

  } catch (error) {
    console.error('Address creation failed');
    if (error.response) {
      console.error(`HTTP error ${error.response.status}:`, error.response.data);
    }
    throw error;
  }

  // Step 2: Create site with emergency configuration
  const sitePayload = {
    name: config.siteName,
    pbxName: config.pbxName,
    locale: config.locale || 'en-US',
    timezone: config.timezone || 'America/Los_Angeles',
    address: {
      id: addressId
    },
    emergencyNotifications: [
      {
        type: 'EMAIL',
        values: config.emergencyEmails
      }
    ]
  };

  try {
    const siteResponse = await axios.post(
      `${baseUrl}/sites`,
      sitePayload,
      {
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/vnd.sites.v1+json',
          'Content-Type': 'application/vnd.sites.v1+json'
        },
        timeout: 10000
      }
    );
    return siteResponse.data;

  } catch (error) {
    console.error('Site creation failed');
    if (error.response) {
      console.error(`HTTP error ${error.response.status}:`, error.response.data);
    }
    throw error;
  }
}

module.exports = { createEmergencyReadySite };
