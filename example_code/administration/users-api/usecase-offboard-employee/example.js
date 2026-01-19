const axios = require('axios');

/**
 * Three-stage employee offboarding: disable, deprovision licenses, then delete.
 *
 * This function demonstrates the recommended offboarding workflow:
 * - Stage 1: Immediately disable user login (set status to INACTIVE)
 * - Stage 2: After grace period, remove licenses to free them for reassignment
 * - Stage 3: After retention period, permanently delete the user account
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} userId - ID of the user to offboard
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @param {number} [gracePeriodDays=7] - Days before license deprovision (simulated instantly in demo)
 * @param {number} [retentionDays=30] - Days before account deletion (simulated instantly in demo)
 * @returns {Promise<Object>} Status of each stage: {stage1: 'completed', stage2: 'completed', stage3: 'completed'}
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const result = await offboardEmployee('your-api-key', 'hvOB1l3zDCaDAwp9tNLzZA');
 * if (result.stage3 === 'completed') {
 *   console.log('Employee fully offboarded');
 * }
 */
async function offboardEmployee(
  apiKey,
  userId,
  baseUrl = 'https://api.8x8.com/admin-provisioning',
  gracePeriodDays = 7,
  retentionDays = 30
) {
  const headers = {
    'x-api-key': apiKey,
    'Accept': 'application/vnd.users.v1+json',
    'Content-Type': 'application/json'
  };

  const result = {};

  // Stage 1: Disable user immediately
  console.log(`Stage 1: Disabling user ${userId}...`);

  try {
    // Get current user data
    const getUserResponse = await axios.get(
      `${baseUrl}/users/${userId}`,
      { headers, timeout: 10000 }
    );
    const userData = getUserResponse.data;

    // Update status to INACTIVE
    userData.basicInfo.status = 'INACTIVE';

    const putResponse = await axios.put(
      `${baseUrl}/users/${userId}`,
      userData,
      { headers, timeout: 10000 }
    );
    const operation = putResponse.data;

    // Poll operation until completed
    const stage1Status = await pollOperation(baseUrl, operation.operationId, headers);
    result.stage1 = stage1Status;

    if (stage1Status !== 'completed') {
      console.log(`Stage 1 failed with status: ${stage1Status}`);
      return result;
    }

    console.log('Stage 1: User disabled successfully');

  } catch (error) {
    console.error(`Stage 1 failed: ${error.message}`);
    if (error.response) {
      console.error(`HTTP ${error.response.status}:`, error.response.data);
    }
    result.stage1 = 'failed';
    return result;
  }

  // Stage 2: Deprovision licenses (after grace period, simulated instantly for demo)
  console.log(`\nStage 2: Deprovisioning licenses (normally after ${gracePeriodDays} days)...`);
  await sleep(1000); // Simulate grace period with short delay

  try {
    // Get updated user data
    const getUserResponse = await axios.get(
      `${baseUrl}/users/${userId}`,
      { headers, timeout: 10000 }
    );
    const userData = getUserResponse.data;

    // Remove all licenses and extensions
    userData.serviceInfo.licenses = [];
    userData.serviceInfo.extensions = [];

    const putResponse = await axios.put(
      `${baseUrl}/users/${userId}`,
      userData,
      { headers, timeout: 10000 }
    );
    const operation = putResponse.data;

    // Poll operation until completed
    const stage2Status = await pollOperation(baseUrl, operation.operationId, headers);
    result.stage2 = stage2Status;

    if (stage2Status !== 'completed') {
      console.log(`Stage 2 failed with status: ${stage2Status}`);
      return result;
    }

    console.log('Stage 2: Licenses deprovisioned successfully');

  } catch (error) {
    console.error(`Stage 2 failed: ${error.message}`);
    if (error.response) {
      console.error(`HTTP ${error.response.status}:`, error.response.data);
    }
    result.stage2 = 'failed';
    return result;
  }

  // Stage 3: Delete user permanently (after retention period, simulated instantly for demo)
  console.log(`\nStage 3: Deleting user permanently (normally after ${retentionDays} days)...`);
  await sleep(1000); // Simulate retention period with short delay

  try {
    const deleteResponse = await axios.delete(
      `${baseUrl}/users/${userId}`,
      { headers, timeout: 10000 }
    );
    const operation = deleteResponse.data;

    // Poll operation until completed
    const stage3Status = await pollOperation(baseUrl, operation.operationId, headers);
    result.stage3 = stage3Status;

    if (stage3Status === 'completed') {
      console.log('Stage 3: User deleted successfully');
    } else {
      console.log(`Stage 3 failed with status: ${stage3Status}`);
    }

  } catch (error) {
    console.error(`Stage 3 failed: ${error.message}`);
    if (error.response) {
      console.error(`HTTP ${error.response.status}:`, error.response.data);
    }
    result.stage3 = 'failed';
    return result;
  }

  return result;
}

/**
 * Poll operation status until completion or timeout.
 *
 * @param {string} baseUrl - API base URL
 * @param {string} operationId - Operation ID to poll
 * @param {Object} headers - HTTP headers
 * @param {number} [maxAttempts=60] - Maximum polling attempts
 * @returns {Promise<string>} 'completed', 'failed', or 'timeout'
 */
async function pollOperation(baseUrl, operationId, headers, maxAttempts = 60) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await axios.get(
        `${baseUrl}/operations/${operationId}`,
        { headers, timeout: 10000 }
      );
      const operation = response.data;
      const status = operation.status.toLowerCase();

      if (status === 'completed') {
        return 'completed';
      } else if (status === 'failed') {
        const error = operation.error || {};
        console.error(`Operation failed: ${error.detail || 'Unknown error'}`);
        return 'failed';
      } else if (status === 'pending' || status === 'in_progress') {
        await sleep(1000); // Wait before next poll
        continue;
      } else {
        console.error(`Unknown operation status: ${status}`);
        return 'failed';
      }

    } catch (error) {
      console.error(`Error polling operation: ${error.message}`);
      return 'failed';
    }
  }

  console.error(`Operation timed out after ${maxAttempts} attempts`);
  return 'timeout';
}

/**
 * Sleep helper function.
 *
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { offboardEmployee };
