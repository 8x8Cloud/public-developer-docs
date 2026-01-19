#!/bin/bash
# Create a site with emergency address and notification configuration
#
# This is a two-step workflow: creates address, then creates site
#
# Usage:
#   API_KEY="your-key" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

# Step 1: Create address
echo "Step 1: Creating address..."
ADDRESS_RESPONSE=$(curl -X POST "${BASE_URL}/addresses" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.addresses.v1+json" \
  -H "Content-Type: application/vnd.addresses.v1+json" \
  -d '{
    "streetNumber": "100",
    "streetName": "Market St",
    "city": "San Francisco",
    "state": "CA",
    "postal": "94105",
    "country": "US"
  }' \
  -s -S)

ADDRESS_ID=$(echo "$ADDRESS_RESPONSE" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$ADDRESS_ID" ]; then
  echo "Failed to create address"
  echo "$ADDRESS_RESPONSE"
  exit 1
fi

echo "Address created with ID: $ADDRESS_ID"

# Step 2: Create site with emergency configuration
echo "Step 2: Creating site with emergency notifications..."
curl -X POST "${BASE_URL}/sites" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.sites.v1+json" \
  -H "Content-Type: application/vnd.sites.v1+json" \
  -d "{
    \"name\": \"San Francisco Office\",
    \"pbxName\": \"pbx01\",
    \"locale\": \"en-US\",
    \"timezone\": \"America/Los_Angeles\",
    \"address\": {
      \"id\": \"$ADDRESS_ID\"
    },
    \"emergencyNotifications\": [
      {
        \"type\": \"EMAIL\",
        \"values\": [\"security@company.com\", \"facilities@company.com\"]
      }
    ]
  }" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s -S
