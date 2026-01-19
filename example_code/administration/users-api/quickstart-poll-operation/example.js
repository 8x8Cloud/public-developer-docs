/**
 * Poll an async operation until completion.
 *
 * Requirements:
 * - Node.js 14+
 * - axios: npm install axios
 */
const axios = require('axios');

/**
 * Helper function to sleep for a specified duration.
 *
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise<void>}
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Poll an operation until it completes, fails, or times out.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} operationId - ID of the operation to poll
 * @param {string} [baseUrl='https://api.8x8.com'] - API base URL
 * @param {number} [maxAttempts=30] - Maximum number of polling attempts
 * @param {number} [initialDelay=1000] - Initial delay between polls in milliseconds
 * @returns {Promise<Object>} Operation details when complete
 * @throws {Error} On HTTP errors or timeout
 *
 * @example
 * const operation = await pollOperation('your-api-key', 'op_1234567890abcdef');
 * if (operation.status === 'completed') {
 *   console.log(`Operation completed! Resource ID: ${operation.resourceId}`);
 * } else if (operation.status === 'failed') {
 *   console.log(`Operation failed: ${operation.error}`);
 * }
 */
async function pollOperation(
  apiKey,
  operationId,
  baseUrl = 'https://api.8x8.com',
  maxAttempts = 30,
  initialDelay = 1000
) {
  let delay = initialDelay;
  const maxDelay = 30000;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
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

      const operation = response.data;
      const status = operation.status;
      console.log(`Attempt ${attempt}: Operation status is '${status}'`);

      if (status === 'completed') {
        console.log('Operation completed successfully!');
        return operation;
      } else if (status === 'failed') {
        console.log(`Operation failed: ${operation.error}`);
        return operation;
      } else if (status === 'cancelled') {
        console.log('Operation was cancelled');
        return operation;
      }

      // Still pending or in_progress, wait before next poll
      if (attempt < maxAttempts) {
        console.log(`Waiting ${delay / 1000} seconds before next poll...`);
        await sleep(delay);
        // Exponential backoff with cap
        delay = Math.min(delay * 2, maxDelay);
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
