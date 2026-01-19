const axios = require('axios');

/**
 * Retrieve available phone numbers in the United States.
 *
 * @param {string} apiKey - Your API authentication key (must have UC & CC Number Admin scope)
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Phone number data with pagination info
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const result = await listAvailablePhoneNumbers('your-api-key');
 * const phoneNumbers = result.data || [];
 * console.log(`Found ${phoneNumbers.length} available US phone numbers`);
 * phoneNumbers.forEach(number => {
 *   console.log(`  ${number.phoneNumber} - ${number.nationalFormattedNumber}`);
 * });
 */
async function listAvailablePhoneNumbers(apiKey, baseUrl = 'https://api.8x8.com/admin-provisioning') {
  try {
    const response = await axios.get(
      `${baseUrl}/phone-numbers`,
      {
        headers: {
          'X-API-Key': apiKey,
          'Accept': 'application/vnd.phonenumbers.v1+json'
        },
        params: {
          filter: 'status==AVAILABLE;country==US',
          pageSize: 100
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

module.exports = { listAvailablePhoneNumbers };
