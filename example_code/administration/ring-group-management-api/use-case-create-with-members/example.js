const axios = require('axios');

/**
 * Create a ring group with multiple members and voicemail settings.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} name - Ring group name (2-64 characters)
 * @param {string} extensionNumber - Internal extension number
 * @param {string[]} memberUserIds - Array of user IDs to add as members
 * @param {string} [voicemailEmail] - Email for voicemail notifications (optional)
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Created ring group with members
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const ringGroup = await createRingGroupWithMembers(
 *   'your-api-key',
 *   'Customer Support',
 *   '2001',
 *   ['user_id_1', 'user_id_2', 'user_id_3'],
 *   'support@example.com'
 * );
 * console.log(`Created ring group with ${ringGroup.members?.length || 0} members`);
 */
async function createRingGroupWithMembers(
  apiKey,
  name,
  extensionNumber,
  memberUserIds,
  voicemailEmail = null,
  baseUrl = 'https://api.8x8.com/admin-provisioning'
) {
  const headers = {
    'X-API-Key': apiKey,
    'Accept': 'application/vnd.ringgroups.v1+json',
    'Content-Type': 'application/vnd.ringgroups.v1+json'
  };

  // Build members array with sequence numbers
  const members = memberUserIds.map((userId, index) => ({
    userId,
    sequenceNumber: index + 1,
    voicemailAccessEnabled: true
  }));

  // Ring group payload with members and voicemail
  const ringGroupData = {
    name,
    extensionNumber,
    ringPattern: 'ROUND_ROBIN',
    ringTimeout: 20,
    inboundCallerIdFormat: 'RGNAME_CALLERNUMBER',
    members
  };

  // Add voicemail settings if email provided
  if (voicemailEmail) {
    ringGroupData.voicemailSettings = {
      notificationEmail: voicemailEmail,
      notificationAction: 'NOTIFY_ONLY'
    };
  }

  try {
    // Step 1: Create ring group with members (async operation)
    const response = await axios.post(
      `${baseUrl}/ring-groups`,
      ringGroupData,
      { headers, timeout: 10000 }
    );

    const operation = response.data;
    const operationId = operation.operationId;
    console.log(`Ring group creation with ${members.length} members initiated`);
    console.log(`Operation ID: ${operationId}`);

    // Step 2: Poll operation status until completion
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
        const ringGroupId = operationStatus.resourceId;
        console.log(`Ring group created successfully (ID: ${ringGroupId})`);

        // Step 3: Retrieve ring group with members
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

module.exports = { createRingGroupWithMembers };
