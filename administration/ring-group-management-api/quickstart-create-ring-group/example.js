const axios = require('axios');

/**
 * Create a ring group and poll until creation completes.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} name - Ring group name (2-64 characters)
 * @param {string} extensionNumber - Internal extension number
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Created ring group data
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const ringGroup = await createRingGroupWithPolling(
 *   'your-api-key',
 *   'Sales Team',
 *   '1001'
 * );
 * console.log(`Created ring group: ${ringGroup.name} (ID: ${ringGroup.id})`);
 */
async function createRingGroupWithPolling(
  apiKey,
  name,
  extensionNumber,
  baseUrl = 'https://api.8x8.com/admin-provisioning'
) {
  const headers = {
    'X-API-Key': apiKey,
    'Accept': 'application/vnd.ringgroups.v1+json',
    'Content-Type': 'application/vnd.ringgroups.v1+json'
  };

  // Ring group payload with required fields
  const ringGroupData = {
    name,
    extensionNumber,
    ringPattern: 'ROUND_ROBIN',
    ringTimeout: 15,
    inboundCallerIdFormat: 'RGNAME_CALLERNUMBER'
  };

  try {
    // Step 1: Create ring group (async operation)
    const response = await axios.post(
      `${baseUrl}/ring-groups`,
      ringGroupData,
      { headers, timeout: 10000 }
    );

    const operation = response.data;
    const operationId = operation.operationId;
    console.log(`Ring group creation initiated. Operation ID: ${operationId}`);

    // Step 2: Poll operation status until completion
    const maxAttempts = 30;
    const pollInterval = 2000; // milliseconds

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise(resolve => setTimeout(resolve, pollInterval));

      const statusResponse = await axios.get(
        `${baseUrl}/operations/${operationId}`,
        { headers, timeout: 10000 }
      );

      const operationStatus = statusResponse.data;
      const status = operationStatus.status;
      console.log(`Operation status: ${status}`);

      if (status === 'COMPLETED') {
        const ringGroupId = operationStatus.resourceId;
        if (!ringGroupId) {
          throw new Error('Operation completed but no resource ID returned');
        }

        // Step 3: Retrieve created ring group
        const ringGroupResponse = await axios.get(
          `${baseUrl}/ring-groups/${ringGroupId}`,
          { headers, timeout: 10000 }
        );

        return ringGroupResponse.data;

      } else if (status === 'FAILED') {
        const errorMessage = operationStatus.error?.message || 'Unknown error';
        throw new Error(`Ring group creation failed: ${errorMessage}`);
      }
    }

    throw new Error(`Operation timed out after ${maxAttempts * pollInterval / 1000} seconds`);

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

module.exports = { createRingGroupWithPolling };
