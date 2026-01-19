#!/bin/bash
# Update user following GET-modify-PUT pattern
#
# Usage:
#   API_KEY="key" USER_ID="user-789" JOB_TITLE="Senior Engineer" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY required}"
USER_ID="${USER_ID:?Error: USER_ID required}"
BASE_URL="${BASE_URL:-https://api.8x8.com}"

# Step 1: Retrieve current user
echo "Retrieving current user data for ${USER_ID}..."
current_user=$(curl -X GET "${BASE_URL}/v1/users/${USER_ID}" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.users.v1+json" \
  -s -S -w "\n%{http_code}")

http_code=$(echo "$current_user" | tail -n1)
user_data=$(echo "$current_user" | sed '$d')

if [ "$http_code" != "200" ]; then
  echo "Error retrieving user (HTTP ${http_code})"
  echo "$user_data"
  exit 1
fi

echo "Current user data retrieved successfully"

# Step 2: Modify user data (example: update job title and department)
# In a real scenario, you would parse JSON and modify specific fields
# For this example, we'll create a modified version with updated fields
# Note: This is simplified; production code should use jq or similar tools

# Save to temporary file for modification
echo "$user_data" > /tmp/user_update.json

# Apply updates using environment variables if provided
if [ -n "$JOB_TITLE" ] || [ -n "$DEPARTMENT" ] || [ -n "$TIMEZONE" ]; then
  echo "Applying updates..."
  # In production, use jq to properly modify JSON:
  # user_data=$(echo "$user_data" | jq ".directoryInfo.jobTitle = \"$JOB_TITLE\"")
  # For this example, we show the concept
fi

# Step 3: Submit update
echo "Submitting update for user ${USER_ID}..."
update_response=$(curl -X PUT "${BASE_URL}/v1/users/${USER_ID}" \
  -H "x-api-key: ${API_KEY}" \
  -H "Content-Type: application/vnd.users.v1+json" \
  -H "Accept: application/vnd.users.v1+json" \
  -d @/tmp/user_update.json \
  -s -S -w "\n%{http_code}")

http_code=$(echo "$update_response" | tail -n1)
body=$(echo "$update_response" | sed '$d')

if [ "$http_code" != "202" ]; then
  echo "Error updating user (HTTP ${http_code})"
  echo "$body"
  rm -f /tmp/user_update.json
  exit 1
fi

operation_id=$(echo "$body" | grep -o '"operationId":"[^"]*"' | cut -d'"' -f4)
echo "Update initiated. Operation ID: ${operation_id}"

# Step 4: Poll for completion
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
    rm -f /tmp/user_update.json
    exit 1
  fi

  status=$(echo "$body" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

  if [ "$status" = "completed" ]; then
    echo "Operation completed! Retrieving updated user..."

    # Step 5: Retrieve updated user
    curl -X GET "${BASE_URL}/v1/users/${USER_ID}" \
      -H "x-api-key: ${API_KEY}" \
      -H "Accept: application/vnd.users.v1+json" \
      -s -S -w "\nHTTP Status: %{http_code}\n"

    rm -f /tmp/user_update.json
    exit 0

  elif [ "$status" = "failed" ]; then
    echo "Operation failed!"
    echo "$body"
    rm -f /tmp/user_update.json
    exit 1
  fi

  sleep $delay
  delay=$((delay < 30 ? delay * 2 : 30))
done

echo "Operation timed out"
rm -f /tmp/user_update.json
exit 1
