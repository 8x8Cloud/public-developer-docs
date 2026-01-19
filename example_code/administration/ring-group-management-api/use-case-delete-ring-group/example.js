const axios = require('axios');

/**
 * Delete a ring group and verify successful removal.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} ringGroupId - ID of the ring group to delete
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<boolean>} True if deletion successful, false otherwise
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const success = await deleteRingGroupWithVerification(
 *   'your-api-key',
 *   'abc123'
 * );
 * if (success) {
 *   console.log('Ring group deleted successfully');
 * }
 */
async function deleteRingGroupWithVerification(
  apiKey,
  ringGroupId,
  baseUrl = 'https://api.8x8.com/admin-provisioning'
) {
  const headers = {
    'X-API-Key': apiKey,
    'Accept': 'application/vnd.ringgroups.v1+json'
  };

  try {
    // Step 1: Verify ring group exists
    const response = await axios.get(
      `${baseUrl}/ring-groups/${ringGroupId}`,
      { headers, timeout: 10000 }
    );

    const ringGroup = response.data;
    console.log(`Found ring group to delete: ${ringGroup.name}`);

    // Step 2: Initiate deletion (async operation)
    const deleteResponse = await axios.delete(
      `${baseUrl}/ring-groups/${ringGroupId}`,
      { headers, timeout: 10000 }
    );

    const operation = deleteResponse.data;
    const operationId = operation.operationId;
    console.log(`Deletion operation initiated (ID: ${operationId})`);

    // Step 3: Poll operation status until completion
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
        console.log('Deletion operation completed');

        // Step 4: Verify ring group no longer exists (should get 404)
        try {
          await axios.get(
            `${baseUrl}/ring-groups/${ringGroupId}`,
            { headers, timeout: 10000 }
          );
          console.log('Warning: Ring group still exists after deletion');
          return false;
        } catch (verifyError) {
          if (verifyError.response && verifyError.response.status === 404) {
            console.log('Verified: Ring group successfully deleted');
            return true;
          } else {
            throw verifyError;
          }
        }

      } else if (status === 'FAILED') {
        const errorMessage = operationStatus.error?.message || 'Unknown error';
        console.error(`Deletion failed: ${errorMessage}`);
        return false;
      }
    }

    console.error(`Operation timed out after ${maxAttempts * pollInterval / 1000} seconds`);
    return false;

  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log('Ring group not found (may already be deleted)');
      return false;
    }

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

module.exports = { deleteRingGroupWithVerification };
