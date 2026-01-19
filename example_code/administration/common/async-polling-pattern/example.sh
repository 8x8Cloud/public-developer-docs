#!/bin/bash
# Poll an async operation until completion
#
# Usage:
#   API_KEY="your-key" OPERATION_ID="op_123" bash example.sh
#
# Environment variables:
#   API_KEY - Your API authentication key (required)
#   OPERATION_ID - The operation ID to poll (required)
#   BASE_URL - API base URL (default: https://api.8x8.com/admin-provisioning)
#   MAX_WAIT - Maximum seconds to wait (default: 300)

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
OPERATION_ID="${OPERATION_ID:?Error: OPERATION_ID environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"
MAX_WAIT="${MAX_WAIT:-300}"

START_TIME=$(date +%s)
POLL_INTERVAL=1

while true; do
  RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "${BASE_URL}/operations/${OPERATION_ID}" \
    -H "x-api-key: ${API_KEY}" \
    -H "Accept: application/vnd.users.v1+json")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  if [ "$HTTP_CODE" != "200" ]; then
    echo "HTTP error: ${HTTP_CODE}"
    echo "$BODY"
    exit 1
  fi

  STATUS=$(echo "$BODY" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

  if [ "$STATUS" = "COMPLETED" ] || [ "$STATUS" = "FAILED" ]; then
    echo "$BODY"
    exit 0
  fi

  # Check timeout
  CURRENT_TIME=$(date +%s)
  ELAPSED=$((CURRENT_TIME - START_TIME))
  if [ $ELAPSED -ge $MAX_WAIT ]; then
    echo "Operation timed out after ${MAX_WAIT} seconds"
    exit 1
  fi

  sleep $POLL_INTERVAL
done
