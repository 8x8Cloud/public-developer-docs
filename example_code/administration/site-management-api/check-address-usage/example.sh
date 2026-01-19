#!/bin/bash
# Check if an address can be deleted by examining its usage counts
#
# Usage:
#   API_KEY="your-key" ADDRESS_ID="address-id" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
ADDRESS_ID="${ADDRESS_ID:?Error: ADDRESS_ID environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

curl -X GET "${BASE_URL}/addresses/${ADDRESS_ID}" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.addresses.v1+json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s -S
