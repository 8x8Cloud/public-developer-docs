const axios = require('axios');

/**
 * Poll an asynchronous operation and handle failures with error details.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} operationId - Operation ID from async operation response
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Operation object (may be FAILED)
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const operation = await pollOperationWithErrorHandling('your-api-key', 'op_failed_example');
 * if (operation.status === 'COMPLETED') {
 *   console.log(`Success! Resource: ${operation.resourceId}`);
 * } else if (operation.status === 'FAILED') {
 *   const error = operation.error || {};
 *   console.error(`Operation failed: ${error.title}`);
 *   (error.errors || []).forEach(err => {
 *     console.error(`  - ${err.field}: ${err.message}`);
 *   });
 * }
 */
async function pollOperationWithErrorHandling(apiKey, operationId, baseUrl = 'https://api.8x8.com/admin-provisioning') {
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
      console.log('Operation completed successfully');
      return operation;

    } else if (status === 'FAILED') {
      // Extract error details from the operation
      const error = operation.error || {};
      console.error(`Operation failed: ${error.title || 'Unknown error'}`);

      // Display specific error messages
      const errors = error.errors || [];
      errors.forEach(err => {
        const field = err.field || 'general';
        const code = err.code || 'UNKNOWN';
        const message = err.message || 'No message provided';
        console.error(`  [${code}] ${field}: ${message}`);
      });

      return operation;

    } else {
      console.log(`Operation status: ${status}`);
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

module.exports = { pollOperationWithErrorHandling };
