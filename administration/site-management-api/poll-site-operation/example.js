const axios = require('axios');

/**
 * Poll an asynchronous operation until completion or failure.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} operationId - Operation ID from async operation response
 * @param {Object} [options] - Polling options
 * @param {number} [options.maxAttempts=60] - Maximum number of polling attempts
 * @param {number} [options.pollInterval=2000] - Milliseconds between polling attempts
 * @param {string} [options.baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Completed Operation object
 * @throws {Error} On HTTP errors, network errors, or timeout
 *
 * @example
 * const operation = await pollOperation('your-api-key', 'op_123456789');
 * if (operation.status === 'COMPLETED') {
 *   console.log(`Resource ID: ${operation.resourceId}`);
 * } else if (operation.status === 'FAILED') {
 *   console.error(`Operation failed:`, operation.error);
 * }
 */
async function pollOperation(apiKey, operationId, options = {}) {
  const maxAttempts = options.maxAttempts || 60;
  const pollInterval = options.pollInterval || 2000;
  const baseUrl = options.baseUrl || 'https://api.8x8.com/admin-provisioning';

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const response = await axios.get(
        `${baseUrl}/operations/${operationId}`,
        {
          headers: {
            'x-api-key': apiKey,
            'Accept': 'application/vnd.operations.v1+json'
          },
          timeout: 10000
        }
      );

      const operation = response.data;
      const status = operation.status;

      if (status === 'COMPLETED') {
        return operation;
      } else if (status === 'FAILED') {
        console.error('Operation failed:', operation.error);
        return operation;
      } else if (status === 'PENDING' || status === 'IN_PROGRESS') {
        await new Promise(resolve => setTimeout(resolve, pollInterval));
        continue;
      } else {
        console.error(`Unknown operation status: ${status}`);
        return operation;
      }

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

  throw new Error(`Operation timed out after ${maxAttempts} attempts`);
}

module.exports = { pollOperation };
