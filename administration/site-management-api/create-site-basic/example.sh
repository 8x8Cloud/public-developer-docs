#!/bin/bash
# Create a new site (asynchronous operation)
#
# Usage:
#   API_KEY="your-key" bash example.sh
#
# Returns an Operation object with operationId to poll for completion

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

curl -X POST "${BASE_URL}/sites" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.sites.v1+json" \
  -H "Content-Type: application/vnd.sites.v1+json" \
  -d '{
    "name": "Headquarters",
    "pbxName": "pbx01",
    "locale": "en-US",
    "timezone": "America/Los_Angeles",
    "siteCode": "1345",
    "extensionLength": 4,
    "address": {
      "id": "b1c4944a-17a0-4b00-8d48-36001df07e22"
    }
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s -S
