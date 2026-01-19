const axios = require('axios');

/**
 * Delete a site and its associated address (multi-step workflow).
 *
 * Preconditions:
 * - All users must be removed from the site before deletion
 * - Address can only be deleted if all usage counts are zero
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} siteId - Site identifier
 * @param {string} addressId - Address identifier
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Object>} Status information about deletions
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const result = await deleteSiteAndAddress(
 *   'your-api-key',
 *   '0023OEZiR7qQ_EGb6xYjgg',
 *   'addr_sf_market_st'
 * );
 * if (result.siteDeleted && result.addressDeleted) {
 *   console.log('Site and address successfully deleted');
 * }
 */
async function deleteSiteAndAddress(apiKey, siteId, addressId, baseUrl = 'https://api.8x8.com/admin-provisioning') {
  const result = {
    siteDeleted: false,
    addressDeleted: false
  };

  // Step 1: Delete site (asynchronous)
  try {
    const siteResponse = await axios.delete(
      `${baseUrl}/sites/${siteId}`,
      {
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/vnd.sites.v1+json'
        },
        timeout: 10000
      }
    );
    const operation = siteResponse.data;
    console.log(`Site deletion started: ${operation.operationId}`);
    result.siteOperation = operation;
    result.siteDeleted = true;
    // Note: You should poll this operation to confirm completion

  } catch (error) {
    console.error('Site deletion failed');
    if (error.response) {
      console.error(`HTTP error ${error.response.status}:`, error.response.data);
    }
    return result;
  }

  // Step 2: Check address usage
  try {
    const addressResponse = await axios.get(
      `${baseUrl}/addresses/${addressId}`,
      {
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/vnd.addresses.v1+json'
        },
        timeout: 10000
      }
    );
    const address = addressResponse.data;
    const usage = address.addressUsage || {};

    // Check if all usage counts are zero
    const totalUsage = Object.values(usage).reduce((sum, count) => sum + count, 0);
    if (totalUsage > 0) {
      console.log(`Address still in use (total usage: ${totalUsage})`);
      result.addressUsage = usage;
      return result;
    }

  } catch (error) {
    console.error('Failed to check address usage');
    if (error.response) {
      console.error(`HTTP error ${error.response.status}:`, error.response.data);
    }
    return result;
  }

  // Step 3: Delete address (synchronous)
  try {
    await axios.delete(
      `${baseUrl}/addresses/${addressId}`,
      {
        headers: {
          'x-api-key': apiKey,
          'Accept': 'application/vnd.addresses.v1+json'
        },
        timeout: 10000
      }
    );
    console.log('Address deleted successfully');
    result.addressDeleted = true;

  } catch (error) {
    console.error('Address deletion failed');
    if (error.response) {
      console.error(`HTTP error ${error.response.status}:`, error.response.data);
    }
  }

  return result;
}

module.exports = { deleteSiteAndAddress };
