#!/bin/bash
# Create an address for site registration
#
# Usage:
#   API_KEY="your-key" bash example.sh
#
# Or with custom base URL:
#   API_KEY="your-key" BASE_URL="https://api.8x8.com/admin-provisioning" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

curl -X POST "${BASE_URL}/addresses" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.addresses.v1+json" \
  -H "Content-Type: application/vnd.addresses.v1+json" \
  -d '{
    "streetNumber": "7",
    "streetName": "34TH ST",
    "secondaryLocation": "613",
    "city": "New York",
    "state": "NY",
    "postal": "10001",
    "country": "US"
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s -S
