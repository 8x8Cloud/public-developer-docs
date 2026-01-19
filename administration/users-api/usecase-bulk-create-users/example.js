const axios = require('axios');
const fs = require('fs');
const csvParse = require('csv-parse/sync');

/**
 * Create multiple users from CSV file with parallel processing.
 *
 * @param {string} apiKey - Your API authentication key
 * @param {string} csvFilePath - Path to CSV file with user data (columns: firstName, lastName, email, department, jobTitle)
 * @param {string} siteId - Site ID to assign all users to
 * @param {string} [baseUrl='https://api.8x8.com'] - API base URL
 * @param {number} [maxConcurrent=5] - Maximum concurrent requests (max recommended: 10)
 * @returns {Promise<Object>} Summary with total, successful, failed counts and detailed results
 *
 * @example
 * const summary = await bulkCreateUsers(
 *   'your-api-key',
 *   'new_employees.csv',
 *   'SAH3U8guQaK4WQhpDZi0rQ'
 * );
 * console.log(`Created ${summary.successful}/${summary.total} users`);
 * summary.results.filter(r => r.status === 'failed').forEach(r => {
 *   console.log(`Failed: ${r.email} - ${r.error}`);
 * });
 */
async function bulkCreateUsers(
  apiKey,
  csvFilePath,
  siteId,
  baseUrl = 'https://api.8x8.com',
  maxConcurrent = 5
) {
  const headers = {
    'X-API-Key': apiKey,
    'Content-Type': 'application/vnd.users.v1+json',
    'Accept': 'application/vnd.users.v1+json'
  };

  // Read and parse CSV
  let usersData;
  try {
    const csvContent = fs.readFileSync(csvFilePath, 'utf-8');
    const records = csvParse.parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });

    usersData = records.filter(row => {
      if (!row.firstName || !row.lastName || !row.email) {
        console.log(`Skipping invalid row: ${JSON.stringify(row)}`);
        return false;
      }
      return true;
    });
  } catch (error) {
    return {
      total: 0,
      successful: 0,
      failed: 0,
      error: `Failed to read CSV: ${error.message}`,
      results: []
    };
  }

  console.log(`Loaded ${usersData.length} users from CSV`);

  /**
   * Create a single user and poll operation to completion.
   */
  async function createSingleUser(userData) {
    const email = userData.email;

    // Build user payload
    const payload = {
      basicInfo: {
        userName: email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        primaryEmail: email,
        status: 'ACTIVE',
        site: { id: siteId }
      }
    };

    // Add optional directory info if present
    if (userData.department || userData.jobTitle) {
      payload.directoryInfo = {};
      if (userData.department) {
        payload.directoryInfo.department = userData.department;
      }
      if (userData.jobTitle) {
        payload.directoryInfo.jobTitle = userData.jobTitle;
      }
    }

    try {
      // Create user
      const createResponse = await axios.post(
        `${baseUrl}/users`,
        payload,
        { headers, timeout: 10000 }
      );

      const operationId = createResponse.data.operationId;
      if (!operationId) {
        return {
          email,
          status: 'failed',
          error: 'No operation ID returned'
        };
      }

      // Poll operation with exponential backoff
      const maxAttempts = 30;
      let waitTime = 1000; // milliseconds

      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        await new Promise(resolve => setTimeout(resolve, waitTime));

        const pollResponse = await axios.get(
          `${baseUrl}/operations/${operationId}`,
          { headers, timeout: 10000 }
        );

        const operation = pollResponse.data;
        const status = operation.status;

        if (status === 'COMPLETED') {
          return {
            email,
            status: 'success',
            userId: operation.resourceId,
            operationId
          };
        } else if (status === 'FAILED') {
          const errorDetail = operation.error?.detail || 'Unknown error';
          return {
            email,
            status: 'failed',
            error: errorDetail,
            operationId
          };
        }

        // Exponential backoff, max 30 seconds
        waitTime = Math.min(waitTime * 2, 30000);
      }

      return {
        email,
        status: 'failed',
        error: 'Operation timeout after 5 minutes',
        operationId
      };

    } catch (error) {
      let errorMsg = error.message;
      if (error.response) {
        errorMsg = `HTTP ${error.response.status}`;
        if (error.response.data?.detail) {
          errorMsg = error.response.data.detail;
        }
      }
      return {
        email,
        status: 'failed',
        error: errorMsg
      };
    }
  }

  // Process users in parallel with concurrency limit
  const results = [];
  let successful = 0;
  let failed = 0;
  let completed = 0;

  console.log(`Creating ${usersData.length} users with max ${maxConcurrent} concurrent requests...`);

  // Process in batches to control concurrency
  for (let i = 0; i < usersData.length; i += maxConcurrent) {
    const batch = usersData.slice(i, i + maxConcurrent);
    const batchPromises = batch.map(user => createSingleUser(user));

    const batchResults = await Promise.all(batchPromises);

    for (const result of batchResults) {
      results.push(result);
      completed++;

      if (result.status === 'success') {
        successful++;
        console.log(`[${completed}/${usersData.length}] ✓ Created: ${result.email}`);
      } else {
        failed++;
        console.log(`[${completed}/${usersData.length}] ✗ Failed: ${result.email} - ${result.error}`);
      }
    }
  }

  // Generate summary
  const summary = {
    total: usersData.length,
    successful,
    failed,
    results
  };

  console.log('\n=== Bulk Create Summary ===');
  console.log(`Total: ${summary.total}`);
  console.log(`Successful: ${summary.successful}`);
  console.log(`Failed: ${summary.failed}`);
  console.log(`Success Rate: ${((successful / usersData.length) * 100).toFixed(1)}%`);

  return summary;
}

module.exports = { bulkCreateUsers };
