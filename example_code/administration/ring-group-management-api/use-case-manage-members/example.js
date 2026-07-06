const axios = require('axios');

/**
 * Apply a targeted add/update/remove delta to a ring group's members using
 * POST /ring-groups/{ringGroupId}/update-members.
 *
 * Only the members you pass are changed; the rest of the ring group's membership
 * and configuration is left untouched, and the whole delta is applied atomically.
 * At least one of add/update/remove must be non-empty. Identify each member by
 * either extensionId or extensionNumber, and never list the same member in more
 * than one array.
 *
 * Requirements:
 * - Node.js 14+
 * - axios: npm install axios
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} ringGroupId - ID of the ring group to modify
 * @param {Object} [modifications] - The membership delta
 * @param {Object[]} [modifications.add] - New members to add
 * @param {Object[]} [modifications.update] - Existing members to modify (omitted fields keep their current value)
 * @param {Object[]} [modifications.remove] - Members to remove
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} The ring group after the delta is applied
 * @throws {Error} On HTTP or network errors, or if no changes are provided
 *
 * @example
 * const result = await updateRingGroupMembers('your-api-key', 'aeP9pOoDRbq8_KKiwtsXhQ', {
 *   add: [{ extensionNumber: '1005', sequenceNumber: 4, voicemailAccessEnabled: true }],
 *   update: [{ extensionNumber: '1002', sequenceNumber: 1 }],
 *   remove: [{ extensionNumber: '1003' }]
 * });
 * console.log(`Ring group now has ${result.members?.length || 0} members`);
 */
async function updateRingGroupMembers(
  apiKey,
  ringGroupId,
  modifications = {},
  baseUrl = 'https://api.8x8.com/admin-provisioning'
) {
  // Include only the arrays that were provided and are non-empty.
  const payload = {};
  if (modifications.add && modifications.add.length > 0) payload.add = modifications.add;
  if (modifications.update && modifications.update.length > 0) payload.update = modifications.update;
  if (modifications.remove && modifications.remove.length > 0) payload.remove = modifications.remove;

  if (Object.keys(payload).length === 0) {
    throw new Error("Provide at least one of 'add', 'update', or 'remove'");
  }

  // A write with a payload carries the version in Content-Type; no Accept is
  // sent (the endpoint always returns an Operation). Reads (the polling GETs
  // below) carry the version in Accept.
  const writeHeaders = {
    'X-API-Key': apiKey,
    'Content-Type': 'application/vnd.ringgroups.update-members.v1+json'
  };
  const operationsHeaders = {
    'X-API-Key': apiKey,
    'Accept': 'application/vnd.operations.v1+json'
  };
  const ringGroupHeaders = {
    'X-API-Key': apiKey,
    'Accept': 'application/vnd.ringgroups.v1+json'
  };

  try {
    // Step 1: Submit the membership delta (async operation)
    const response = await axios.post(
      `${baseUrl}/ring-groups/${ringGroupId}/update-members`,
      payload,
      { headers: writeHeaders, timeout: 10000 }
    );

    const operationId = response.data.operationId;
    console.log(`Member update operation initiated (ID: ${operationId})`);

    // Step 2: Poll operation status until it reaches a terminal state
    const maxAttempts = 30;
    const pollInterval = 2000;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise(resolve => setTimeout(resolve, pollInterval));

      const statusResponse = await axios.get(
        `${baseUrl}/operations/${operationId}`,
        { headers: operationsHeaders, timeout: 10000 }
      );

      const status = statusResponse.data.status;

      if (status === 'COMPLETED') {
        // Step 3: Retrieve the ring group to confirm the applied delta
        const finalResponse = await axios.get(
          `${baseUrl}/ring-groups/${ringGroupId}`,
          { headers: ringGroupHeaders, timeout: 10000 }
        );
        return finalResponse.data;

      } else if (status === 'FAILED') {
        // Validations that are race-condition-prone (member exists, resulting
        // collection size) are performed asynchronously and surface here via
        // the operation's error field.
        const errorMessage = statusResponse.data.error?.message || 'Unknown error';
        throw new Error(`Member update failed: ${errorMessage}`);
      }
    }

    throw new Error('Operation timed out');

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

module.exports = { updateRingGroupMembers };
