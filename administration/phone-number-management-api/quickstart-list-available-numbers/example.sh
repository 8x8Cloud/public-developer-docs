#!/bin/bash
# Retrieve available phone numbers in the United States
#
# Usage:
#   API_KEY="your-key" bash example.sh
#
# Or with custom base URL:
#   API_KEY="your-key" BASE_URL="https://api.8x8.com/admin-provisioning" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

curl -X GET "${BASE_URL}/phone-numbers?filter=status==AVAILABLE;country==US&pageSize=100" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Accept: application/vnd.phonenumbers.v1+json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s -S
