#!/bin/bash
# Retrieve a specific user by ID from the 8x8 Users API
#
# Usage:
#   API_KEY="your-key" USER_ID="user-789" BASE_URL="https://api.8x8.com" bash example.sh
#
# Or inline:
#   API_KEY="your-key" USER_ID="user-789" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
USER_ID="${USER_ID:?Error: USER_ID environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com}"

curl -X GET "${BASE_URL}/v1/users/${USER_ID}" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.users.v1+json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s -S
