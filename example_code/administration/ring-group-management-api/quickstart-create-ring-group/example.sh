#!/bin/bash
set -e  # Exit on error

# Create a ring group and poll until creation completes
#
# Usage:
#   API_KEY="your-key" BASE_URL="https://api.8x8.com/admin-provisioning" bash example.sh
#
# Or inline:
#   API_KEY="your-key" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

# Ring group data
RING_GROUP_NAME="Sales Team"
EXTENSION_NUMBER="1001"

echo "Step 1: Creating ring group..."

# Create ring group (async operation)
CREATE_RESPONSE=$(curl -X POST "${BASE_URL}/ring-groups" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Accept: application/vnd.ringgroups.v1+json" \
  -H "Content-Type: application/vnd.ringgroups.v1+json" \
  -d "{
    \"name\": \"${RING_GROUP_NAME}\",
    \"extensionNumber\": \"${EXTENSION_NUMBER}\",
    \"ringPattern\": \"ROUND_ROBIN\",
    \"ringTimeout\": 15,
    \"inboundCallerIdFormat\": \"RGNAME_CALLERNUMBER\"
  }" \
  -s -S -w "\nHTTP_STATUS:%{http_code}")

HTTP_STATUS=$(echo "$CREATE_RESPONSE" | grep -o "HTTP_STATUS:[0-9]*" | cut -d: -f2)
RESPONSE_BODY=$(echo "$CREATE_RESPONSE" | sed -e 's/HTTP_STATUS:[0-9]*$//')

if [ "$HTTP_STATUS" != "202" ]; then
  echo "Error: Failed to create ring group (HTTP $HTTP_STATUS)"
  echo "$RESPONSE_BODY"
  exit 1
fi

OPERATION_ID=$(echo "$RESPONSE_BODY" | grep -o '"operationId":"[^"]*"' | cut -d'"' -f4)
echo "Ring group creation initiated. Operation ID: ${OPERATION_ID}"

# Step 2: Poll operation status until completion
echo "Step 2: Polling operation status..."
MAX_ATTEMPTS=30
POLL_INTERVAL=2

for ((i=1; i<=MAX_ATTEMPTS; i++)); do
  sleep $POLL_INTERVAL

  STATUS_RESPONSE=$(curl -X GET "${BASE_URL}/operations/${OPERATION_ID}" \
    -H "X-API-Key: ${API_KEY}" \
    -H "Accept: application/vnd.ringgroups.v1+json" \
    -s -S)

  STATUS=$(echo "$STATUS_RESPONSE" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
  echo "Operation status: ${STATUS}"

  if [ "$STATUS" = "COMPLETED" ]; then
    RING_GROUP_ID=$(echo "$STATUS_RESPONSE" | grep -o '"resourceId":"[^"]*"' | cut -d'"' -f4)
    echo "Operation completed! Ring group ID: ${RING_GROUP_ID}"

    # Step 3: Retrieve created ring group
    echo "Step 3: Retrieving ring group details..."
    curl -X GET "${BASE_URL}/ring-groups/${RING_GROUP_ID}" \
      -H "X-API-Key: ${API_KEY}" \
      -H "Accept: application/vnd.ringgroups.v1+json" \
      -s -S | jq '.'
    exit 0

  elif [ "$STATUS" = "FAILED" ]; then
    echo "Error: Ring group creation failed"
    echo "$STATUS_RESPONSE" | jq '.error'
    exit 1
  fi
done

echo "Error: Operation timed out after $((MAX_ATTEMPTS * POLL_INTERVAL)) seconds"
exit 1
