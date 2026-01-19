const axios = require('axios');

/**
 * Verify if a specific phone number exists and is available for assignment.
 *
 * @param {string} apiKey - Your API authentication key (must have UC & CC Number Admin scope)
 * @param {string} phoneNumber - Phone number in E.164 format (e.g., +14085551234)
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Object with { available: boolean, data: Object|null }
 *
 * @example
 * const result = await verifyPhoneNumberAvailability('your-api-key', '+14085551234');
 * if (result.available) {
 *   console.log(`Number ${result.data.phoneNumber} is available for assignment`);
 *   // Proceed with User Management or Ring Group Management API
 * } else if (result.data) {
 *   console.log(`Number exists but status is ${result.data.status}`);
 * } else {
 *   console.log('Number not found in inventory');
 * }
 */
async function verifyPhoneNumberAvailability(
  apiKey,
  phoneNumber,
  baseUrl = 'https://api.8x8.com/admin-provisioning'
) {
  try {
    const response = await axios.get(
      `${baseUrl}/phone-numbers/${phoneNumber}`,
      {
        headers: {
          'X-API-Key': apiKey,
          'Accept': 'application/vnd.phonenumbers.v1+json'
        },
        timeout: 10000
      }
    );

    const numberData = response.data;
    const status = numberData.status;

    if (status === 'AVAILABLE') {
      return { available: true, data: numberData };
    } else {
      console.log(`Number exists but status is ${status} (not available)`);
      return { available: false, data: numberData };
    }

  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(`Phone number ${phoneNumber} not found in inventory`);
      return { available: false, data: null };
    }

    if (error.response) {
      console.error(`HTTP error ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.message);
    } else {
      console.error('Request error:', error.message);
    }

    return { available: false, data: null };
  }
}

module.exports = { verifyPhoneNumberAvailability };
