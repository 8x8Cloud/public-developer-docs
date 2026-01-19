#!/bin/bash
# Poll an asynchronous operation and handle failures with error details
#
# Usage:
#   API_KEY="your-key" OPERATION_ID="op_failed_example" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
OPERATION_ID="${OPERATION_ID:?Error: OPERATION_ID environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

RESPONSE=$(curl -X GET "${BASE_URL}/operations/${OPERATION_ID}" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.operations.v1+json" \
  -w "\nHTTP_STATUS:%{http_code}" \
  -s -S)

echo "$RESPONSE"
echo ""

# Check operation status
STATUS=$(echo "$RESPONSE" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

if [ "$STATUS" = "COMPLETED" ]; then
  echo "Operation completed successfully"
elif [ "$STATUS" = "FAILED" ]; then
  echo "Operation failed! Check the error field in the response above for details."
else
  echo "Operation status: $STATUS"
fi
