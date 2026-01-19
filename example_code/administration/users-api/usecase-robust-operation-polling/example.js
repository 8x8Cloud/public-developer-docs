/**
 * Production-ready robust polling utility for async operations.
 *
 * Requirements:
 * - Node.js 14+
 * - axios: npm install axios
 */
const axios = require('axios');

const OperationStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
};

class PollingConfig {
  constructor({
    initialDelay = 1000,
    maxDelay = 30000,
    backoffMultiplier = 2.0,
    timeoutMs = 300000
  } = {}) {
    this.initialDelay = initialDelay;
    this.maxDelay = maxDelay;
    this.backoffMultiplier = backoffMultiplier;
    this.timeoutMs = timeoutMs;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Production-ready polling with exponential backoff, timeout, and callbacks.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} operationId - ID of the operation to poll
 * @param {string} [baseUrl='https://api.8x8.com'] - API base URL
 * @param {PollingConfig} [config] - Polling configuration
 * @param {Function} [onStatusChange] - Callback(status, operationData) when status changes
 * @returns {Promise<Object|null>} Operation details when complete, or null on timeout
 * @throws {Error} On network errors
 *
 * @example
 * const config = new PollingConfig({
 *   initialDelay: 500,
 *   maxDelay: 20000,
 *   timeoutMs: 180000
 * });
 *
 * const operation = await pollOperationRobust(
 *   'your-api-key',
 *   'op_1234567890abcdef',
 *   'https://api.8x8.com',
 *   config,
 *   (status, data) => console.log(`Status: ${status}`)
 * );
 *
 * if (operation) {
 *   if (operation.status === 'completed') {
 *     console.log(`Success! Resource: ${operation.resourceId}`);
 *   } else if (operation.status === 'failed') {
 *     console.log(`Failed: ${operation.error.detail}`);
 *   }
 * }
 */
async function pollOperationRobust(
  apiKey,
  operationId,
  baseUrl = 'https://api.8x8.com',
  config = null,
  onStatusChange = null
) {
  if (!config) {
    config = new PollingConfig();
  }

  let delay = config.initialDelay;
  const startTime = Date.now();
  let attempt = 0;
  let lastStatus = null;

  console.log(`Starting to poll operation ${operationId}`);
  console.log(`Configuration: initialDelay=${config.initialDelay}ms, maxDelay=${config.maxDelay}ms, timeout=${config.timeoutMs}ms`);

  while (true) {
    attempt++;
    const elapsed = Date.now() - startTime;

    // Check timeout
    if (elapsed >= config.timeoutMs) {
      console.error(`Timeout: Operation exceeded ${config.timeoutMs}ms`);
      return null;
    }

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
      console.log(`Attempt ${attempt} (${(elapsed / 1000).toFixed(1)}s elapsed): Status = ${status}`);

      // Trigger callback on status change
      if (onStatusChange && status !== lastStatus) {
        onStatusChange(status, operation);
        lastStatus = status;
      }

      // Check terminal states
      if (status === OperationStatus.COMPLETED) {
        const resourceId = operation.resourceId;
        console.log(`Operation completed successfully! Resource ID: ${resourceId}`);
        return operation;

      } else if (status === OperationStatus.FAILED) {
        const error = operation.error || {};
        console.error(`Operation failed: ${error.detail || 'Unknown error'}`);
        console.error(`Error type: ${error.type}`);
        return operation;

      } else if (status === OperationStatus.CANCELLED) {
        console.log('Operation was cancelled');
        return operation;
      }

      // Still pending or in_progress, calculate next delay
      const remainingTime = config.timeoutMs - elapsed;
      if (remainingTime <= 0) {
        console.error('Timeout: No time remaining');
        return null;
      }

      // Apply exponential backoff
      const nextDelay = Math.min(delay, remainingTime, config.maxDelay);
      console.log(`Waiting ${(nextDelay / 1000).toFixed(1)}s before next poll...`);
      await sleep(nextDelay);

      // Increase delay for next iteration
      delay = Math.min(delay * config.backoffMultiplier, config.maxDelay);

    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error(`Operation not found: ${operationId}`);
          return null;
        }
        console.error(`HTTP error ${error.response.status}:`, error.response.data);
        throw error;

      } else if (error.code === 'ECONNABORTED') {
        console.warn(`Request timeout on attempt ${attempt}, retrying...`);
        // Continue polling

      } else {
        console.error('Request error:', error.message);
        throw error;
      }
    }
  }
}

module.exports = { pollOperationRobust, PollingConfig, OperationStatus };
