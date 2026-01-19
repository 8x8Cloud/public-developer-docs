#!/bin/bash
# Test API credentials with a simple authenticated request
#
# Usage:
#   API_KEY="your-key" BASE_URL="https://api.8x8.com/admin-provisioning" bash example.sh
#
# Or inline:
#   API_KEY="your-key" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

curl -X GET "${BASE_URL}/users?pageSize=1" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.users.v1+json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s -S
