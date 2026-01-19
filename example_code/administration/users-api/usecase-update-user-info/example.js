/**
 * Update user information with complete data retrieval pattern.
 *
 * Requirements:
 * - Node.js 14+
 * - axios: npm install axios
 */
const axios = require('axios');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Update user information following the complete GET-modify-PUT pattern.
 *
 * CRITICAL: PUT operations require ALL user attributes. This function retrieves
 * the current user, applies your updates, and submits the complete object.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} userId - ID of the user to update
 * @param {Object} updates - Fields to update
 * @param {string} [baseUrl='https://api.8x8.com'] - API base URL
 * @param {number} [pollTimeout=300000] - Max time to wait in ms
 * @returns {Promise<Object>} Updated user details
 * @throws {Error} On HTTP or timeout errors
 *
 * @example
 * const user = await updateUser('your-api-key', 'user-789', {
 *   jobTitle: 'Senior Software Engineer',
 *   department: 'R&D',
 *   timezone: 'America/New_York'
 * });
 * console.log(`User updated: ${user.basicInfo.userName}`);
 */
async function updateUser(
  apiKey,
  userId,
  updates,
  baseUrl = 'https://api.8x8.com',
  pollTimeout = 300000
) {
  const headers = {
    'x-api-key': apiKey,
    'Content-Type': 'application/vnd.users.v1+json',
    'Accept': 'application/vnd.users.v1+json'
  };

  // Step 1: Retrieve current user data
  console.log(`Retrieving current user data for ${userId}...`);
  let currentUser;
  try {
    const response = await axios.get(
      `${baseUrl}/v1/users/${userId}`,
      { headers, timeout: 10000 }
    );
    currentUser = response.data;
    console.log('Current user data retrieved successfully');

  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        console.error(`User not found: ${userId}`);
      }
      console.error(`HTTP error ${error.response.status}:`, error.response.data);
    } else {
      console.error('Request failed:', error.message);
    }
    throw error;
  }

  // Step 2: Apply updates to complete user object
  console.log('Applying updates to user data...');
  for (const [field, value] of Object.entries(updates)) {
    // Handle nested fields
    if (['jobTitle', 'department', 'directoryScope', 'displayInDirectory', 'profilePictureURL'].includes(field)) {
      currentUser.directoryInfo[field] = value;
    } else if (['firstName', 'lastName', 'primaryEmail', 'status', 'locale', 'timezone'].includes(field)) {
      currentUser.basicInfo[field] = value;
    } else {
      console.warn(`Warning: Unknown field '${field}', skipping`);
    }
  }

  // Step 3: Submit update request with complete user object
  console.log(`Submitting update for user ${userId}...`);
  let operation;
  try {
    const response = await axios.put(
      `${baseUrl}/v1/users/${userId}`,
      currentUser,
      { headers, timeout: 10000 }
    );
    operation = response.data;
    console.log(`Update initiated. Operation ID: ${operation.operationId}`);

  } catch (error) {
    if (error.response) {
      console.error(`HTTP error ${error.response.status}:`, error.response.data);
    } else {
      console.error('Request failed:', error.message);
    }
    throw error;
  }

  // Step 4: Poll for operation completion
  console.log('Polling for operation completion...');
  const operationId = operation.operationId;
  let delay = 1000;
  const maxDelay = 30000;
  const startTime = Date.now();

  while (Date.now() - startTime < pollTimeout) {
    try {
      const response = await axios.get(
        `${baseUrl}/v1/operations/${operationId}`,
        { headers, timeout: 10000 }
      );
      operation = response.data;
      const status = operation.status;

      if (status === 'completed') {
        console.log('Operation completed! Retrieving updated user...');

        // Step 5: Retrieve and return updated user
        const userResponse = await axios.get(
          `${baseUrl}/v1/users/${userId}`,
          { headers, timeout: 10000 }
        );
        const updatedUser = userResponse.data;

        console.log('\nUpdate summary:');
        Object.keys(updates).forEach(field => console.log(`  ${field}: updated`));

        return updatedUser;

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

module.exports = { updateUser };
