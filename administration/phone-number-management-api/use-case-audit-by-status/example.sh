#!/bin/bash
# Generate inventory report showing phone number counts by status
#
# Usage:
#   API_KEY="your-key" bash example.sh
#
# Note: This script queries each status separately and displays results.
# For comprehensive pagination handling, use the Python or Node.js versions.

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

echo "Phone Number Inventory Summary:"
echo "================================"

for STATUS in AVAILABLE ASSIGNED PORTING PRE_PORTING; do
  echo -n "${STATUS}: "
  curl -X GET "${BASE_URL}/phone-numbers?filter=status==${STATUS}&pageSize=100" \
    -H "X-API-Key: ${API_KEY}" \
    -H "Accept: application/vnd.phonenumbers.v1+json" \
    -s -S 2>/dev/null | \
    grep -o '"data":\[.*\]' | \
    grep -o '{' | \
    wc -l | \
    tr -d ' '
done

echo "================================"
echo "Note: Counts shown are for first page only (max 100 per status)"
echo "For complete inventory counts across all pages, use Python or Node.js version"
