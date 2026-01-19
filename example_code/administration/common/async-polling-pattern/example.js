const axios = require('axios');

/**
 * Poll an async operation until completion.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} operationId - The operation ID to poll
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @param {number} [maxWait=300] - Maximum seconds to wait
 * @returns {Promise<Object>} Completed operation with resourceId
 * @throws {Error} On HTTP errors or timeout
 *
 * @example
 * // After creating a resource (POST returns 202 with operationId)
 * try {
 *   const operation = await pollOperation('your-api-key', 'op_1a2b3c4d5e6f');
 *   if (operation.status === 'COMPLETED') {
 *     console.log(`Operation completed! Resource ID: ${operation.resourceId}`);
 *   } else if (operation.status === 'FAILED') {
 *     console.error(`Operation failed: ${JSON.stringify(operation.error)}`);
 *   }
 * } catch (error) {
 *   console.error('Operation timed out or failed:', error.message);
 * }
 */
async function pollOperation(apiKey, operationId, baseUrl = 'https://api.8x8.com/admin-provisioning', maxWait = 300) {
  const startTime = Date.now();
  const pollInterval = 1000; // 1 second

  while (Date.now() - startTime < maxWait * 1000) {
    try {
      const response = await axios.get(
        `${baseUrl}/operations/${operationId}`,
        {
          headers: {
            'x-api-key': apiKey,
            'Accept': 'application/vnd.users.v1+json'
          },
          timeout: 10000
        }
      );

      const operation = response.data;
      if (operation.status === 'COMPLETED' || operation.status === 'FAILED') {
        return operation;
      }

      // Wait before next poll
      await new Promise(resolve => setTimeout(resolve, pollInterval));

    } catch (error) {
      if (error.response) {
        console.error(`HTTP error ${error.response.status}:`, error.response.data);
      } else {
        console.error('Request error:', error.message);
      }
      throw error;
    }
  }

  throw new Error(`Operation timed out after ${maxWait} seconds`);
}

module.exports = { pollOperation };
