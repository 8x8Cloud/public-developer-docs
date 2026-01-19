#!/bin/bash
# Complete user creation workflow - create, poll, and retrieve
#
# Usage:
#   API_KEY="key" USER_NAME="jane.smith" FIRST_NAME="Jane" LAST_NAME="Smith" \
#   EMAIL="jane@example.com" SITE_ID="site-123" SITE_NAME="SF Office" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY required}"
USER_NAME="${USER_NAME:?Error: USER_NAME required}"
FIRST_NAME="${FIRST_NAME:?Error: FIRST_NAME required}"
LAST_NAME="${LAST_NAME:?Error: LAST_NAME required}"
EMAIL="${EMAIL:?Error: EMAIL required}"
SITE_ID="${SITE_ID:?Error: SITE_ID required}"
SITE_NAME="${SITE_NAME:?Error: SITE_NAME required}"
JOB_TITLE="${JOB_TITLE:-Employee}"
DEPARTMENT="${DEPARTMENT:-General}"
BASE_URL="${BASE_URL:-https://api.8x8.com}"

# Step 1: Create user
echo "Creating user..."
create_response=$(curl -X POST "${BASE_URL}/v1/users" \
  -H "x-api-key: ${API_KEY}" \
  -H "Content-Type: application/vnd.users.v1+json" \
  -H "Accept: application/vnd.users.v1+json" \
  -d "{
    \"basicInfo\": {
      \"userName\": \"${USER_NAME}\",
      \"firstName\": \"${FIRST_NAME}\",
      \"lastName\": \"${LAST_NAME}\",
      \"primaryEmail\": \"${EMAIL}\",
      \"status\": \"active\",
      \"locale\": \"en-US\",
      \"timezone\": \"America/Los_Angeles\",
      \"site\": {
        \"id\": \"${SITE_ID}\",
        \"name\": \"${SITE_NAME}\"
      }
    },
    \"directoryInfo\": {
      \"jobTitle\": \"${JOB_TITLE}\",
      \"department\": \"${DEPARTMENT}\",
      \"displayInDirectory\": true
    }
  }" \
  -s -S -w "\n%{http_code}")

http_code=$(echo "$create_response" | tail -n1)
body=$(echo "$create_response" | sed '$d')

if [ "$http_code" != "202" ]; then
  echo "Error creating user (HTTP ${http_code})"
  echo "$body"
  exit 1
fi

operation_id=$(echo "$body" | grep -o '"operationId":"[^"]*"' | cut -d'"' -f4)
echo "User creation initiated. Operation ID: ${operation_id}"

# Step 2: Poll for completion
echo "Polling for operation completion..."
delay=1
max_attempts=60

for ((attempt=1; attempt<=max_attempts; attempt++)); do
  poll_response=$(curl -X GET "${BASE_URL}/v1/operations/${operation_id}" \
    -H "x-api-key: ${API_KEY}" \
    -H "Accept: application/vnd.users.v1+json" \
    -s -S -w "\n%{http_code}")

  http_code=$(echo "$poll_response" | tail -n1)
  body=$(echo "$poll_response" | sed '$d')

  if [ "$http_code" != "200" ]; then
    echo "Error polling operation (HTTP ${http_code})"
    exit 1
  fi

  status=$(echo "$body" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

  if [ "$status" = "completed" ]; then
    user_id=$(echo "$body" | grep -o '"resourceId":"[^"]*"' | cut -d'"' -f4)
    echo "Operation completed! User ID: ${user_id}"

    # Step 3: Retrieve user
    echo "Retrieving user details..."
    curl -X GET "${BASE_URL}/v1/users/${user_id}" \
      -H "x-api-key: ${API_KEY}" \
      -H "Accept: application/vnd.users.v1+json" \
      -s -S -w "\nHTTP Status: %{http_code}\n"
    exit 0

  elif [ "$status" = "failed" ]; then
    echo "Operation failed!"
    echo "$body"
    exit 1
  fi

  sleep $delay
  delay=$((delay < 30 ? delay * 2 : 30))
done

echo "Operation timed out"
exit 1
