const axios = require('axios');

/**
 * Find an available phone number for user or ring group assignment.
 *
 * @param {string} apiKey - Your API authentication key (must have UC & CC Number Admin scope)
 * @param {string} [country='US'] - ISO 3166-2 country code
 * @param {string} [category='LOCAL'] - Number category (LOCAL or TOLL_FREE)
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<string|null>} E.164 phone number ready for assignment, or null if none available
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const phoneNumber = await findAvailableNumberForAssignment('your-api-key');
 * if (phoneNumber) {
 *   console.log(`Found available number: ${phoneNumber}`);
 *   // Pass to User Management API for assignment
 * } else {
 *   console.log('No available numbers found');
 * }
 */
async function findAvailableNumberForAssignment(
  apiKey,
  country = 'US',
  category = 'LOCAL',
  baseUrl = 'https://api.8x8.com/admin-provisioning'
) {
  try {
    const response = await axios.get(
      `${baseUrl}/phone-numbers`,
      {
        headers: {
          'X-API-Key': apiKey,
          'Accept': 'application/vnd.phonenumbers.v1+json'
        },
        params: {
          filter: `status==AVAILABLE;country==${country};category==${category}`,
          pageSize: 1  // Only need one number
        },
        timeout: 10000
      }
    );

    const numbers = response.data.data || [];

    if (numbers.length === 0) {
      console.log(`No available ${category} numbers found in ${country}`);
      return null;
    }

    // Return first available number in E.164 format
    return numbers[0].phoneNumber;

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

module.exports = { findAvailableNumberForAssignment };
