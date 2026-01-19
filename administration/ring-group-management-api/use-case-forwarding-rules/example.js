const axios = require('axios');

/**
 * Configure call forwarding rules for a ring group.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} ringGroupId - ID of the ring group to configure
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Updated ring group with forwarding rules
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const updatedGroup = await configureForwardingRules(
 *   'your-api-key',
 *   'abc123'
 * );
 * console.log(`Configured ${updatedGroup.forwardingRules?.length || 0} forwarding rules`);
 */
async function configureForwardingRules(
  apiKey,
  ringGroupId,
  baseUrl = 'https://api.8x8.com/admin-provisioning'
) {
  const headers = {
    'X-API-Key': apiKey,
    'Accept': 'application/vnd.ringgroups.v1+json',
    'Content-Type': 'application/vnd.ringgroups.v1+json'
  };

  try {
    // Step 1: Retrieve current ring group
    const response = await axios.get(
      `${baseUrl}/ring-groups/${ringGroupId}`,
      { headers, timeout: 10000 }
    );

    const ringGroup = response.data;
    console.log(`Retrieved ring group: ${ringGroup.name}`);

    // Step 2: Configure forwarding rules
    const forwardingRules = [
      // NO_ANSWER: Forward to voicemail after timeout
      {
        condition: 'NO_ANSWER',
        enabled: true,
        destinations: [{
          type: 'VOICEMAIL'
        }]
      },
      // BUSY: Forward to another extension when all members busy
      {
        condition: 'BUSY',
        enabled: true,
        destinations: [{
          type: 'EXTENSION_NUMBER',
          destination: '3000'
        }]
      },
      // OUTAGE: Forward to external number during system outages
      {
        condition: 'OUTAGE',
        enabled: true,
        destinations: [{
          type: 'EXTERNAL_NUMBER',
          destination: '+14085551234'
        }]
      }
    ];

    ringGroup.forwardingRules = forwardingRules;
    console.log(`Configured ${forwardingRules.length} forwarding rules`);

    // Step 3: Update ring group (async operation)
    const updateResponse = await axios.put(
      `${baseUrl}/ring-groups/${ringGroupId}`,
      ringGroup,
      { headers, timeout: 10000 }
    );

    const operation = updateResponse.data;
    const operationId = operation.operationId;
    console.log(`Update operation initiated (ID: ${operationId})`);

    // Step 4: Poll operation status
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
        console.log('Forwarding rules configured successfully');

        // Step 5: Retrieve updated ring group
        const finalResponse = await axios.get(
          `${baseUrl}/ring-groups/${ringGroupId}`,
          { headers, timeout: 10000 }
        );

        return finalResponse.data;

      } else if (status === 'FAILED') {
        const errorMessage = operationStatus.error?.message || 'Unknown error';
        throw new Error(`Configuration failed: ${errorMessage}`);
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

module.exports = { configureForwardingRules };
