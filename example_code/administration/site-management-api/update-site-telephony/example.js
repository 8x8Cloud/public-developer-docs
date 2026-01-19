const axios = require('axios');

/**
 * Update site telephony features (caller ID and external calling permissions).
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} siteId - Site identifier
 * @param {Object} siteData - Complete site object (from GET /sites/{siteId})
 * @param {Object} telephonyConfig - Telephony configuration
 * @param {string} telephonyConfig.mainNumber - Main phone number (e.g., "+14155551234")
 * @param {string} telephonyConfig.displayName - Display name for caller ID
 * @param {string} [telephonyConfig.dialPlanRuleset='DOMESTIC'] - External calling permission
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Operation object with operationId
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * // First, get the current site data
 * // const site = await getSite(apiKey, siteId);
 *
 * const operation = await updateSiteTelephony('your-api-key', '0023OEZiR7qQ_EGb6xYjgg', site, {
 *   mainNumber: '+14155551234',
 *   displayName: 'SF Office',
 *   dialPlanRuleset: 'DOMESTIC'
 * });
 * console.log(`Site update started: ${operation.operationId}`);
 */
async function updateSiteTelephony(apiKey, siteId, siteData, telephonyConfig, baseUrl = 'https://api.8x8.com/admin-provisioning') {
  // Update site data with telephony configuration
  const payload = {
    ...siteData,
    callerIdSettings: {
      mainNumber: telephonyConfig.mainNumber,
      setMainNumberAsCallerId: true,
      shareMainNumberAsCallerId: false,
      displayName: telephonyConfig.displayName
    },
    defaultDialPlanRuleset: telephonyConfig.dialPlanRuleset || 'DOMESTIC'
  };

  try {
    const response = await axios.put(
      `${baseUrl}/sites/${siteId}`,
      payload,
      {
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/vnd.sites.v1+json',
          'Content-Type': 'application/vnd.sites.v1+json'
        },
        timeout: 10000
      }
    );
    return response.data;

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

module.exports = { updateSiteTelephony };
