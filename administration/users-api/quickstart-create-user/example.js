/**
 * Create a new user in the 8x8 Users API.
 *
 * Requirements:
 * - Node.js 14+
 * - axios: npm install axios
 */
const axios = require('axios');

/**
 * Create a new user and return the operation details.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {Object} userData - User information
 * @param {string} userData.userName - Username for the new user
 * @param {string} userData.firstName - User's first name
 * @param {string} userData.lastName - User's last name
 * @param {string} userData.email - User's primary email address
 * @param {string} userData.siteId - ID of the site to assign the user to
 * @param {string} userData.siteName - Name of the site
 * @param {string} [userData.jobTitle='Employee'] - User's job title
 * @param {string} [userData.department='General'] - User's department
 * @param {string} [baseUrl='https://api.8x8.com'] - API base URL
 * @returns {Promise<Object>} Operation details with operationId
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const operation = await createUser('your-api-key', {
 *   userName: 'jane.smith',
 *   firstName: 'Jane',
 *   lastName: 'Smith',
 *   email: 'jane.smith@example.com',
 *   siteId: 'site-123',
 *   siteName: 'San Francisco Office',
 *   jobTitle: 'Software Engineer',
 *   department: 'Engineering'
 * });
 * console.log(`User creation started. Operation ID: ${operation.operationId}`);
 */
async function createUser(apiKey, userData, baseUrl = 'https://api.8x8.com') {
  const requestData = {
    basicInfo: {
      userName: userData.userName,
      firstName: userData.firstName,
      lastName: userData.lastName,
      primaryEmail: userData.email,
      status: 'active',
      locale: 'en-US',
      timezone: 'America/Los_Angeles',
      site: {
        id: userData.siteId,
        name: userData.siteName
      }
    },
    directoryInfo: {
      jobTitle: userData.jobTitle || 'Employee',
      department: userData.department || 'General',
      displayInDirectory: true
    }
  };

  try {
    const response = await axios.post(
      `${baseUrl}/v1/users`,
      requestData,
      {
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/vnd.users.v1+json',
          'Accept': 'application/vnd.users.v1+json'
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

module.exports = { createUser };
