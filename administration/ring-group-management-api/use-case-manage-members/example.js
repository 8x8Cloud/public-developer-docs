const axios = require('axios');

/**
 * Add or remove members from a ring group.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} ringGroupId - ID of the ring group to modify
 * @param {string[]} [addUserIds] - Array of user IDs to add as members
 * @param {string[]} [removeUserIds] - Array of user IDs to remove from ring group
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Updated ring group with members
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const updatedGroup = await manageRingGroupMembers(
 *   'your-api-key',
 *   'abc123',
 *   ['new_user_1', 'new_user_2'],
 *   ['old_user_1']
 * );
 * console.log(`Ring group now has ${updatedGroup.members?.length || 0} members`);
 */
async function manageRingGroupMembers(
  apiKey,
  ringGroupId,
  addUserIds = null,
  removeUserIds = null,
  baseUrl = 'https://api.8x8.com/admin-provisioning'
) {
  const headers = {
    'X-API-Key': apiKey,
    'Accept': 'application/vnd.ringgroups.v1+json',
    'Content-Type': 'application/vnd.ringgroups.v1+json'
  };

  try {
    // Step 1: Retrieve current ring group with members
    const response = await axios.get(
      `${baseUrl}/ring-groups/${ringGroupId}`,
      { headers, timeout: 10000 }
    );

    const ringGroup = response.data;
    let currentMembers = ringGroup.members || [];
    console.log(`Current members: ${currentMembers.length}`);

    // Step 2: Remove specified members
    if (removeUserIds && removeUserIds.length > 0) {
      currentMembers = currentMembers.filter(m => !removeUserIds.includes(m.userId));
      console.log(`Removed ${removeUserIds.length} members`);
    }

    // Step 3: Add new members
    if (addUserIds && addUserIds.length > 0) {
      const maxSequence = currentMembers.reduce((max, m) => Math.max(max, m.sequenceNumber || 0), 0);
      addUserIds.forEach((userId, index) => {
        currentMembers.push({
          userId,
          sequenceNumber: maxSequence + index + 1,
          voicemailAccessEnabled: true
        });
      });
      console.log(`Added ${addUserIds.length} new members`);
    }

    // Update ring group with modified members
    ringGroup.members = currentMembers;

    // Step 4: Submit update (async operation)
    const updateResponse = await axios.put(
      `${baseUrl}/ring-groups/${ringGroupId}`,
      ringGroup,
      { headers, timeout: 10000 }
    );

    const operation = updateResponse.data;
    const operationId = operation.operationId;
    console.log(`Member update operation initiated (ID: ${operationId})`);

    // Step 5: Poll operation status
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
        // Retrieve updated ring group with members
        const finalResponse = await axios.get(
          `${baseUrl}/ring-groups/${ringGroupId}`,
          { headers, timeout: 10000 }
        );

        return finalResponse.data;

      } else if (status === 'FAILED') {
        const errorMessage = operationStatus.error?.message || 'Unknown error';
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

module.exports = { manageRingGroupMembers };
