#!/bin/bash
# Poll an async operation until completion
#
# Usage:
#   API_KEY="your-key" OPERATION_ID="op_123" BASE_URL="https://api.8x8.com" bash example.sh
#
# Or inline:
#   API_KEY="your-key" OPERATION_ID="op_123" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
OPERATION_ID="${OPERATION_ID:?Error: OPERATION_ID environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com}"
MAX_ATTEMPTS="${MAX_ATTEMPTS:-30}"

delay=1
max_delay=30

for ((attempt=1; attempt<=MAX_ATTEMPTS; attempt++)); do
  echo "Attempt ${attempt}: Polling operation status..."

  response=$(curl -X GET "${BASE_URL}/v1/operations/${OPERATION_ID}" \
    -H "x-api-key: ${API_KEY}" \
    -H "Accept: application/vnd.users.v1+json" \
    -s -S -w "\n%{http_code}")

  # Extract status code (last line) and body (everything else)
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')

  if [ "$http_code" != "200" ]; then
    echo "HTTP error ${http_code}"
    echo "$body"
    exit 1
  fi

  # Extract status from JSON (basic parsing)
  status=$(echo "$body" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
  echo "Operation status: ${status}"

  if [ "$status" = "completed" ]; then
    echo "Operation completed successfully!"
    echo "$body"
    exit 0
  elif [ "$status" = "failed" ]; then
    echo "Operation failed!"
    echo "$body"
    exit 1
  elif [ "$status" = "cancelled" ]; then
    echo "Operation was cancelled"
    echo "$body"
    exit 1
  fi

  # Still pending or in_progress
  if [ $attempt -lt $MAX_ATTEMPTS ]; then
    echo "Waiting ${delay} seconds before next poll..."
    sleep $delay
    # Exponential backoff with cap
    delay=$((delay * 2))
    if [ $delay -gt $max_delay ]; then
      delay=$max_delay
    fi
  fi
done

echo "Operation timed out after ${MAX_ATTEMPTS} attempts"
exit 1
