#!/bin/bash
# Export complete phone number inventory using scroll pagination
#
# Usage:
#   API_KEY="your-key" bash example.sh > phone_numbers.json
#
# Note: This script outputs to stdout. For comprehensive pagination handling
# and CSV export, use the Python or Node.js versions.

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

echo "{"
echo '  "phoneNumbers": ['

FIRST_PAGE=true
HAS_MORE=true
SCROLL_ID=""

while [ "$HAS_MORE" = "true" ]; do
  if [ -z "$SCROLL_ID" ]; then
    # First page
    RESPONSE=$(curl -s -X GET "${BASE_URL}/phone-numbers?pageSize=100" \
      -H "X-API-Key: ${API_KEY}" \
      -H "Accept: application/vnd.phonenumbers.v1+json")
  else
    # Subsequent pages with scrollId
    RESPONSE=$(curl -s -X GET "${BASE_URL}/phone-numbers?scrollId=${SCROLL_ID}" \
      -H "X-API-Key: ${API_KEY}" \
      -H "Accept: application/vnd.phonenumbers.v1+json")
  fi

  # Extract data array (simplified - production would need proper JSON parsing)
  DATA=$(echo "$RESPONSE" | grep -o '"data":\[.*\]' | sed 's/"data"://')

  if [ "$FIRST_PAGE" = true ]; then
    echo "    $DATA"
    FIRST_PAGE=false
  else
    echo "    ,$DATA"
  fi

  # Check for more pages
  HAS_MORE=$(echo "$RESPONSE" | grep -o '"hasMore":[^,}]*' | cut -d':' -f2 | tr -d ' ')
  SCROLL_ID=$(echo "$RESPONSE" | grep -o '"nextScrollId":"[^"]*"' | cut -d'"' -f4)

  if [ "$HAS_MORE" != "true" ]; then
    break
  fi
done

echo "  ]"
echo "}"
echo ""
echo "# Note: This is a simplified implementation showing pagination concept." >&2
echo "# For production use with proper JSON handling, use Python or Node.js version." >&2
