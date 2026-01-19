const axios = require('axios');

/**
 * Update ring group settings while preserving other configuration.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} ringGroupId - ID of the ring group to update
 * @param {string} [newRingPattern] - New ring pattern (ROUND_ROBIN, SEQUENTIAL, SIMULTANEOUS)
 * @param {number} [newRingTimeout] - New ring timeout in seconds
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Updated ring group data
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const updatedGroup = await updateRingGroupSettings(
 *   'your-api-key',
 *   'abc123',
 *   'ROUND_ROBIN',
 *   25
 * );
 * console.log(`Updated ring group: ${updatedGroup.name}`);
 */
async function updateRingGroupSettings(
  apiKey,
  ringGroupId,
  newRingPattern = null,
  newRingTimeout = null,
  baseUrl = 'https://api.8x8.com/admin-provisioning'
) {
  const headers = {
    'X-API-Key': apiKey,
    'Accept': 'application/vnd.ringgroups.v1+json',
    'Content-Type': 'application/vnd.ringgroups.v1+json'
  };

  try {
    // Step 1: Retrieve current ring group configuration
    const response = await axios.get(
      `${baseUrl}/ring-groups/${ringGroupId}`,
      { headers, timeout: 10000 }
    );

    const ringGroup = response.data;
    console.log(`Retrieved ring group: ${ringGroup.name}`);

    // Step 2: Modify specific settings
    if (newRingPattern) {
      ringGroup.ringPattern = newRingPattern;
      console.log(`Changed ring pattern to: ${newRingPattern}`);
    }
    if (newRingTimeout) {
      ringGroup.ringTimeout = newRingTimeout;
      console.log(`Changed ring timeout to: ${newRingTimeout} seconds`);
    }

    // Step 3: Update ring group (async operation)
    const updateResponse = await axios.put(
      `${baseUrl}/ring-groups/${ringGroupId}`,
      ringGroup,
      { headers, timeout: 10000 }
    );

    const operation = updateResponse.data;
    const operationId = operation.operationId;
    console.log(`Update operation initiated (ID: ${operationId})`);

    // Step 4: Poll operation status until completion
    const maxAttempts = 30;
    const pollInterval = 2000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise(resolve => setTimeout(resolve, pollInterval));

      const statusResponse = await axios.get(
        `${baseUrl}/operations/${operationId}`,
        { headers, timeout: 10000 }
      );

      const operationStatus = statusResponse.data;
      const status = operationStatus.status;

      if (status === 'COMPLETED') {
        console.log('Ring group updated successfully');

        // Step 5: Retrieve updated ring group
        const finalResponse = await axios.get(
          `${baseUrl}/ring-groups/${ringGroupId}`,
          { headers, timeout: 10000 }
        );

        return finalResponse.data;

      } else if (status === 'FAILED') {
        const errorMessage = operationStatus.error?.message || 'Unknown error';
        throw new Error(`Update failed: ${errorMessage}`);
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

module.exports = { updateRingGroupSettings };
