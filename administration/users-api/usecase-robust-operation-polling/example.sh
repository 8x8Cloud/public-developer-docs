#!/bin/bash
# Production-ready robust polling with configurable backoff and timeout
#
# Usage:
#   API_KEY="key" OPERATION_ID="op_123" INITIAL_DELAY=1 MAX_DELAY=30 TIMEOUT=300 bash example.sh

API_KEY="${API_KEY:?Error: API_KEY required}"
OPERATION_ID="${OPERATION_ID:?Error: OPERATION_ID required}"
BASE_URL="${BASE_URL:-https://api.8x8.com}"
INITIAL_DELAY="${INITIAL_DELAY:-1}"
MAX_DELAY="${MAX_DELAY:-30}"
TIMEOUT="${TIMEOUT:-300}"
BACKOFF_MULTIPLIER="${BACKOFF_MULTIPLIER:-2}"

echo "Starting to poll operation ${OPERATION_ID}"
echo "Configuration: initial_delay=${INITIAL_DELAY}s, max_delay=${MAX_DELAY}s, timeout=${TIMEOUT}s"

delay=$INITIAL_DELAY
start_time=$(date +%s)
attempt=0
last_status=""

while true; do
  attempt=$((attempt + 1))
  current_time=$(date +%s)
  elapsed=$((current_time - start_time))

  # Check timeout
  if [ $elapsed -ge $TIMEOUT ]; then
    echo "Timeout: Operation exceeded ${TIMEOUT} seconds"
    exit 1
  fi

  # Poll operation
  response=$(curl -X GET "${BASE_URL}/v1/operations/${OPERATION_ID}" \
    -H "x-api-key: ${API_KEY}" \
    -H "Accept: application/vnd.users.v1+json" \
    -s -S -w "\n%{http_code}")

  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')

  if [ "$http_code" = "404" ]; then
    echo "Operation not found: ${OPERATION_ID}"
    exit 1
  elif [ "$http_code" != "200" ]; then
    echo "HTTP error ${http_code}"
    echo "$body"
    exit 1
  fi

  # Extract status
  status=$(echo "$body" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
  echo "Attempt ${attempt} (${elapsed}s elapsed): Status = ${status}"

  # Check terminal states
  if [ "$status" = "completed" ]; then
    resource_id=$(echo "$body" | grep -o '"resourceId":"[^"]*"' | cut -d'"' -f4)
    echo "Operation completed successfully! Resource ID: ${resource_id}"
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

  # Still pending or in_progress, calculate next delay
  remaining_time=$((TIMEOUT - elapsed))
  if [ $remaining_time -le 0 ]; then
    echo "Timeout: No time remaining"
    exit 1
  fi

  # Apply exponential backoff with cap
  next_delay=$delay
  if [ $next_delay -gt $remaining_time ]; then
    next_delay=$remaining_time
  fi
  if [ $next_delay -gt $MAX_DELAY ]; then
    next_delay=$MAX_DELAY
  fi

  echo "Waiting ${next_delay}s before next poll..."
  sleep $next_delay

  # Increase delay for next iteration using bc if available, otherwise use awk
  if command -v bc &> /dev/null; then
    delay=$(echo "$delay * $BACKOFF_MULTIPLIER" | bc | cut -d'.' -f1)
  else
    delay=$(awk "BEGIN {print int($delay * $BACKOFF_MULTIPLIER)}")
  fi

  if [ $delay -gt $MAX_DELAY ]; then
    delay=$MAX_DELAY
  fi
done
