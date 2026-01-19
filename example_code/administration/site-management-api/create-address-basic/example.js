const axios = require('axios');

/**
 * Create an address for site registration.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {Object} addressData - Address details
 * @param {string} addressData.streetNumber - Street number (e.g., "7")
 * @param {string} addressData.streetName - Street name (e.g., "34TH ST")
 * @param {string} addressData.city - City name (e.g., "New York")
 * @param {string} addressData.state - State/province code (e.g., "NY")
 * @param {string} addressData.postal - Postal/ZIP code (e.g., "10001")
 * @param {string} addressData.country - ISO 3166-1 alpha-2 country code (e.g., "US")
 * @param {string} [addressData.secondaryLocation] - Optional unit/suite number (e.g., "613")
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Created address with ID
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const address = await createAddress('your-api-key', {
 *   streetNumber: '7',
 *   streetName: '34TH ST',
 *   city: 'New York',
 *   state: 'NY',
 *   postal: '10001',
 *   country: 'US',
 *   secondaryLocation: '613'
 * });
 * console.log(`Address created with ID: ${address.id}`);
 */
async function createAddress(apiKey, addressData, baseUrl = 'https://api.8x8.com/admin-provisioning') {
  const payload = {
    streetNumber: addressData.streetNumber,
    streetName: addressData.streetName,
    city: addressData.city,
    state: addressData.state,
    postal: addressData.postal,
    country: addressData.country
  };

  if (addressData.secondaryLocation) {
    payload.secondaryLocation = addressData.secondaryLocation;
  }

  try {
    const response = await axios.post(
      `${baseUrl}/addresses`,
      payload,
      {
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/vnd.addresses.v1+json',
          'Content-Type': 'application/vnd.addresses.v1+json'
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

module.exports = { createAddress };
