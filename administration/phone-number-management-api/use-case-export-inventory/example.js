const axios = require('axios');
const fs = require('fs').promises;

/**
 * Export complete phone number inventory using scroll pagination.
 *
 * @param {string} apiKey - Your API authentication key (must have UC & CC Number Admin scope)
 * @param {string} [outputFormat='json'] - Export format ("json" or "csv")
 * @param {string} [outputFile='phone_numbers'] - Output filename without extension
 * @param {string} [baseUrl='https://api.8x8.com/admin-provisioning'] - API base URL
 * @returns {Promise<Array>} List of all phone numbers
 * @throws {Error} On HTTP or network errors
 *
 * @example
 * const phoneNumbers = await exportPhoneNumberInventory('your-api-key', 'csv');
 * console.log(`Exported ${phoneNumbers.length} phone numbers to phone_numbers.csv`);
 */
async function exportPhoneNumberInventory(
  apiKey,
  outputFormat = 'json',
  outputFile = 'phone_numbers',
  baseUrl = 'https://api.8x8.com/admin-provisioning'
) {
  const allNumbers = [];
  let scrollId = null;
  let hasMore = true;

  try {
    // Iterate through all pages using scroll pagination
    while (hasMore) {
      const params = scrollId
        ? { scrollId }
        : { pageSize: 100 };

      const response = await axios.get(
        `${baseUrl}/phone-numbers`,
        {
          headers: {
            'X-API-Key': apiKey,
            'Accept': 'application/vnd.phonenumbers.v1+json'
          },
          params,
          timeout: 10000
        }
      );

      const result = response.data;
      const pageNumbers = result.data || [];
      allNumbers.push(...pageNumbers);

      const pagination = result.pagination || {};
      hasMore = pagination.hasMore || false;
      scrollId = pagination.nextScrollId;
    }

    // Export to specified format
    const filename = `${outputFile}.${outputFormat.toLowerCase()}`;

    if (outputFormat.toLowerCase() === 'csv') {
      // Convert to CSV
      if (allNumbers.length === 0) {
        await fs.writeFile(filename, '');
      } else {
        const headers = Object.keys(allNumbers[0]).join(',');
        const rows = allNumbers.map(num =>
          Object.values(num).map(val => `"${val || ''}"`).join(',')
        );
        const csv = [headers, ...rows].join('\n');
        await fs.writeFile(filename, csv);
      }
      console.log(`Exported ${allNumbers.length} numbers to ${filename}`);

    } else {
      // Export as JSON
      await fs.writeFile(filename, JSON.stringify(allNumbers, null, 2));
      console.log(`Exported ${allNumbers.length} numbers to ${filename}`);
    }

    return allNumbers;

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

module.exports = { exportPhoneNumberInventory };
