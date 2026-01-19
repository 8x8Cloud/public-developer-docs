#!/bin/bash
# Delete a site and its associated address (multi-step workflow)
#
# Preconditions:
# - All users must be removed from the site before deletion
# - Address can only be deleted if all usage counts are zero
#
# Usage:
#   API_KEY="your-key" SITE_ID="site-id" ADDRESS_ID="address-id" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
SITE_ID="${SITE_ID:?Error: SITE_ID environment variable required}"
ADDRESS_ID="${ADDRESS_ID:?Error: ADDRESS_ID environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

# Step 1: Delete site (asynchronous)
echo "Step 1: Deleting site..."
SITE_RESPONSE=$(curl -X DELETE "${BASE_URL}/sites/${SITE_ID}" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.sites.v1+json" \
  -w "\nHTTP_STATUS:%{http_code}" \
  -s -S)

echo "$SITE_RESPONSE"
echo ""

# Step 2: Check address usage
echo "Step 2: Checking address usage..."
ADDRESS_INFO=$(curl -X GET "${BASE_URL}/addresses/${ADDRESS_ID}" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.addresses.v1+json" \
  -s -S)

echo "$ADDRESS_INFO"
echo ""

# Check if all usage counts are zero (basic check)
if echo "$ADDRESS_INFO" | grep -q '"site":0.*"userExtension":0'; then
  echo "Address is no longer in use, proceeding with deletion..."

  # Step 3: Delete address (synchronous)
  echo "Step 3: Deleting address..."
  curl -X DELETE "${BASE_URL}/addresses/${ADDRESS_ID}" \
    -H "x-api-key: ${API_KEY}" \
    -H "Accept: application/vnd.addresses.v1+json" \
    -w "\nHTTP Status: %{http_code}\n" \
    -s -S
else
  echo "Address is still in use and cannot be deleted"
fi
