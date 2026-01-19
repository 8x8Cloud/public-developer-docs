/**
 * Complete user creation workflow with validation, error handling, and polling.
 *
 * Requirements:
 * - Node.js 14+
 * - axios: npm install axios
 */
const axios = require('axios');

/**
 * Validate user data before submission.
 *
 * @param {Object} userData - User data to validate
 * @returns {Object} { valid: boolean, error?: string }
 */
function validateUserData(userData) {
  const required = ['userName', 'firstName', 'lastName', 'primaryEmail', 'siteId', 'siteName'];
  for (const field of required) {
    if (!userData[field]) {
      return { valid: false, error: `Missing required field: ${field}` };
    }
  }

  // Validate email format
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(userData.primaryEmail)) {
    return { valid: false, error: `Invalid email format: ${userData.primaryEmail}` };
  }

  return { valid: true };
}

/**
 * Sleep for specified milliseconds.
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Complete user creation workflow: validate, create, poll, and verify.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {Object} userData - User data object
 * @param {string} [baseUrl='https://api.8x8.com'] - API base URL
 * @param {number} [pollTimeout=300000] - Max time to wait for operation in ms
 * @returns {Promise<Object>} Created user details
 * @throws {Error} On validation, HTTP, or timeout errors
 *
 * @example
 * const user = await createUserComplete('your-api-key', {
 *   userName: 'jane.smith',
 *   firstName: 'Jane',
 *   lastName: 'Smith',
 *   primaryEmail: 'jane.smith@example.com',
 *   siteId: 'site-123',
 *   siteName: 'San Francisco Office',
 *   jobTitle: 'Software Engineer',
 *   department: 'Engineering'
 * });
 * console.log(`User created: ${user.basicInfo.userId}`);
 */
async function createUserComplete(
  apiKey,
  userData,
  baseUrl = 'https://api.8x8.com',
  pollTimeout = 300000
) {
  // Step 1: Validate input data
  const validation = validateUserData(userData);
  if (!validation.valid) {
    throw new Error(`Validation error: ${validation.error}`);
  }

  // Step 2: Submit user creation request
  const requestBody = {
    basicInfo: {
      userName: userData.userName,
      firstName: userData.firstName,
      lastName: userData.lastName,
      primaryEmail: userData.primaryEmail,
      status: 'active',
      locale: userData.locale || 'en-US',
      timezone: userData.timezone || 'America/Los_Angeles',
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

  let operation;
  try {
    console.log('Creating user...');
    const response = await axios.post(
      `${baseUrl}/v1/users`,
      requestBody,
      {
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/vnd.users.v1+json',
          'Accept': 'application/vnd.users.v1+json'
        },
        timeout: 10000
      }
    );
    operation = response.data;
    console.log(`User creation initiated. Operation ID: ${operation.operationId}`);

  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        const errors = error.response.data.errors || [];
        if (errors.length > 0) {
          console.error('Validation errors:');
          errors.forEach(err => console.error(`  - ${err.field}: ${err.message}`));
        } else {
          console.error(`  ${error.response.data.detail}`);
        }
      } else if (error.response.status === 409) {
        console.error(`Conflict: ${error.response.data.detail || 'User might already exist'}`);
      } else {
        console.error(`HTTP error ${error.response.status}:`, error.response.data);
      }
    } else {
      console.error('Request failed:', error.message);
    }
    throw error;
  }

  // Step 3: Poll for operation completion
  console.log('Polling for operation completion...');
  const operationId = operation.operationId;
  let delay = 1000;
  const maxDelay = 30000;
  const startTime = Date.now();

  while (Date.now() - startTime < pollTimeout) {
    try {
      const response = await axios.get(
        `${baseUrl}/v1/operations/${operationId}`,
        {
          headers: {
            'x-api-key': apiKey,
            'Accept': 'application/vnd.users.v1+json'
          },
          timeout: 10000
        }
      );
      operation = response.data;
      const status = operation.status;

      if (status === 'completed') {
        const userId = operation.resourceId;
        console.log(`Operation completed! User ID: ${userId}`);

        // Step 4: Retrieve and verify created user
        console.log('Retrieving user details...');
        const userResponse = await axios.get(
          `${baseUrl}/v1/users/${userId}`,
          {
            headers: {
              'x-api-key': apiKey,
              'Accept': 'application/vnd.users.v1+json'
            },
            timeout: 10000
          }
        );
        return userResponse.data;

      } else if (status === 'failed') {
        const error = operation.error || {};
        throw new Error(`Operation failed: ${error.detail || 'Unknown error'}`);
      }

      // Still pending or in_progress
      await sleep(delay);
      delay = Math.min(delay * 2, maxDelay);

    } catch (error) {
      console.error('Error polling operation:', error.message);
      throw error;
    }
  }

  throw new Error(`Operation timed out after ${pollTimeout / 1000} seconds`);
}

module.exports = { createUserComplete };
