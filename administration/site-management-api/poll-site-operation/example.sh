#!/bin/bash
# Poll an asynchronous operation until completion
#
# Usage:
#   API_KEY="your-key" OPERATION_ID="op_123456789" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
OPERATION_ID="${OPERATION_ID:?Error: OPERATION_ID environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"
MAX_ATTEMPTS="${MAX_ATTEMPTS:-60}"
POLL_INTERVAL="${POLL_INTERVAL:-2}"

for ((i=1; i<=MAX_ATTEMPTS; i++)); do
  echo "Polling attempt $i of $MAX_ATTEMPTS..."

  RESPONSE=$(curl -X GET "${BASE_URL}/operations/${OPERATION_ID}" \
    -H "x-api-key: ${API_KEY}" \
    -H "Accept: application/vnd.operations.v1+json" \
    -s -S)

  STATUS=$(echo "$RESPONSE" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

  echo "Status: $STATUS"

  if [ "$STATUS" = "COMPLETED" ]; then
    echo "Operation completed successfully!"
    echo "$RESPONSE"
    exit 0
  elif [ "$STATUS" = "FAILED" ]; then
    echo "Operation failed!"
    echo "$RESPONSE"
    exit 1
  fi

  sleep $POLL_INTERVAL
done

echo "Operation timed out after $MAX_ATTEMPTS attempts"
exit 1
