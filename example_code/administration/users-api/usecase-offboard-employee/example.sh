#!/bin/bash
# Three-stage employee offboarding: disable, deprovision licenses, then delete
#
# This script demonstrates the recommended offboarding workflow:
# - Stage 1: Immediately disable user login (set status to INACTIVE)
# - Stage 2: After grace period, remove licenses to free them for reassignment
# - Stage 3: After retention period, permanently delete the user account
#
# Usage:
#   API_KEY="your-key" USER_ID="hvOB1l3zDCaDAwp9tNLzZA" bash example.sh
#
# Or with custom base URL:
#   API_KEY="your-key" USER_ID="user-id" BASE_URL="https://api.8x8.com/admin-provisioning" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
USER_ID="${USER_ID:?Error: USER_ID environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

# Helper function to poll operation status
poll_operation() {
  local operation_id=$1
  local max_attempts=60
  local attempt=0

  while [ $attempt -lt $max_attempts ]; do
    response=$(curl -s -X GET "${BASE_URL}/operations/${operation_id}" \
      -H "x-api-key: ${API_KEY}" \
      -H "Accept: application/vnd.users.v1+json")

    status=$(echo "$response" | grep -o '"status":"[^"]*"' | cut -d'"' -f4 | tr '[:upper:]' '[:lower:]')

    if [ "$status" = "completed" ]; then
      echo "completed"
      return 0
    elif [ "$status" = "failed" ]; then
      echo "failed"
      echo "Error details: $response" >&2
      return 1
    elif [ "$status" = "pending" ] || [ "$status" = "in_progress" ]; then
      sleep 1
      attempt=$((attempt + 1))
    else
      echo "Unknown status: $status" >&2
      return 1
    fi
  done

  echo "Operation timed out after $max_attempts attempts" >&2
  return 1
}

echo "=== Three-Stage Employee Offboarding ==="
echo "User ID: $USER_ID"
echo ""

# Stage 1: Disable user immediately
echo "Stage 1: Disabling user..."

# Get current user data
user_data=$(curl -s -X GET "${BASE_URL}/users/${USER_ID}" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.users.v1+json")

if [ $? -ne 0 ]; then
  echo "Failed to retrieve user" >&2
  exit 1
fi

# Update status to INACTIVE (using jq if available, otherwise manual manipulation)
if command -v jq &> /dev/null; then
  updated_user=$(echo "$user_data" | jq '.basicInfo.status = "INACTIVE"')
else
  # Simple string replacement (works for most cases but not bulletproof)
  updated_user=$(echo "$user_data" | sed 's/"status":"[^"]*"/"status":"INACTIVE"/')
fi

# Submit update
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "${BASE_URL}/users/${USER_ID}" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.users.v1+json" \
  -H "Content-Type: application/json" \
  -d "$updated_user")

http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d':' -f2)
body=$(echo "$response" | sed '/HTTP_STATUS:/d')

if [ "$http_status" != "202" ]; then
  echo "Stage 1 failed with HTTP status: $http_status" >&2
  echo "$body" >&2
  exit 1
fi

operation_id=$(echo "$body" | grep -o '"operationId":"[^"]*"' | cut -d'"' -f4)
stage1_status=$(poll_operation "$operation_id")

if [ "$stage1_status" != "completed" ]; then
  echo "Stage 1 failed with status: $stage1_status" >&2
  exit 1
fi

echo "Stage 1: User disabled successfully"
echo ""

# Stage 2: Deprovision licenses (after grace period, simulated instantly for demo)
echo "Stage 2: Deprovisioning licenses (normally after 7 days)..."
sleep 1  # Simulate grace period

# Get updated user data
user_data=$(curl -s -X GET "${BASE_URL}/users/${USER_ID}" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.users.v1+json")

# Remove licenses and extensions
if command -v jq &> /dev/null; then
  updated_user=$(echo "$user_data" | jq '.serviceInfo.licenses = [] | .serviceInfo.extensions = []')
else
  # Simple approach: remove arrays (not bulletproof but demonstrates intent)
  updated_user=$(echo "$user_data" | sed 's/"licenses":\[[^]]*\]/"licenses":[]/' | sed 's/"extensions":\[[^]]*\]/"extensions":[]/')
fi

# Submit update
response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X PUT "${BASE_URL}/users/${USER_ID}" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.users.v1+json" \
  -H "Content-Type: application/json" \
  -d "$updated_user")

http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d':' -f2)
body=$(echo "$response" | sed '/HTTP_STATUS:/d')

if [ "$http_status" != "202" ]; then
  echo "Stage 2 failed with HTTP status: $http_status" >&2
  echo "$body" >&2
  exit 1
fi

operation_id=$(echo "$body" | grep -o '"operationId":"[^"]*"' | cut -d'"' -f4)
stage2_status=$(poll_operation "$operation_id")

if [ "$stage2_status" != "completed" ]; then
  echo "Stage 2 failed with status: $stage2_status" >&2
  exit 1
fi

echo "Stage 2: Licenses deprovisioned successfully"
echo ""

# Stage 3: Delete user permanently (after retention period, simulated instantly for demo)
echo "Stage 3: Deleting user permanently (normally after 30 days)..."
sleep 1  # Simulate retention period

response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X DELETE "${BASE_URL}/users/${USER_ID}" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.users.v1+json")

http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d':' -f2)
body=$(echo "$response" | sed '/HTTP_STATUS:/d')

if [ "$http_status" != "202" ]; then
  echo "Stage 3 failed with HTTP status: $http_status" >&2
  echo "$body" >&2
  exit 1
fi

operation_id=$(echo "$body" | grep -o '"operationId":"[^"]*"' | cut -d'"' -f4)
stage3_status=$(poll_operation "$operation_id")

if [ "$stage3_status" != "completed" ]; then
  echo "Stage 3 failed with status: $stage3_status" >&2
  exit 1
fi

echo "Stage 3: User deleted successfully"
echo ""
echo "=== Employee Offboarding Complete ==="
