#!/bin/bash
# Test authentication with the 8x8 Users API
#
# Usage:
#   API_KEY="your-key" BASE_URL="https://api.8x8.com" bash example.sh
#
# Or inline:
#   API_KEY="your-key" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com}"

curl -X GET "${BASE_URL}/v1/users?pageSize=1" \
  -H "x-api-key: ${API_KEY}" \
  -H "Content-Type: application/vnd.users.v1+json" \
  -H "Accept: application/vnd.users.v1+json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s -S
