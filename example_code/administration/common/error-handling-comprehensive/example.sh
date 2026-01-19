#!/bin/bash
# Get a user with comprehensive error handling and retry logic
#
# Usage:
#   API_KEY="your-key" USER_ID="hvOB1l3zDCaDAwp9tNLzZA" bash example.sh
#
# Environment variables:
#   API_KEY - Your API authentication key (required)
#   USER_ID - The user ID to retrieve (required)
#   BASE_URL - API base URL (default: https://api.8x8.com/admin-provisioning)
#   MAX_RETRIES - Maximum retry attempts (default: 3)

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
USER_ID="${USER_ID:?Error: USER_ID environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"
MAX_RETRIES="${MAX_RETRIES:-3}"

# Retry loop with exponential backoff
for attempt in $(seq 1 $MAX_RETRIES); do
  # Make request and capture response + status code
  RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "${BASE_URL}/users/${USER_ID}" \
    -H "x-api-key: ${API_KEY}" \
    -H "Accept: application/vnd.users.v1+json")

  HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
  BODY=$(echo "$RESPONSE" | sed '$d')

  # Success
  if [ "$HTTP_CODE" = "200" ]; then
    echo "$BODY"
    exit 0
  fi

  # Authentication error - don't retry
  if [ "$HTTP_CODE" = "401" ]; then
    echo "Authentication failed: Invalid or missing API key"
    echo "$BODY"
    exit 1
  fi

  # Authorization error - don't retry
  if [ "$HTTP_CODE" = "403" ]; then
    echo "Authorization failed: Insufficient permissions"
    echo "$BODY"
    exit 1
  fi

  # Not found - don't retry
  if [ "$HTTP_CODE" = "404" ]; then
    echo "User not found: ${USER_ID}"
    exit 1
  fi

  # Validation error - don't retry
  if [ "$HTTP_CODE" = "400" ]; then
    echo "Validation error:"
    echo "$BODY"
    exit 1
  fi

  # Rate limit or server error - retry with exponential backoff
  if [ "$HTTP_CODE" = "429" ] || [ "$HTTP_CODE" = "500" ]; then
    if [ "$attempt" -lt "$MAX_RETRIES" ]; then
      WAIT_TIME=$((2 ** (attempt - 1)))  # Exponential backoff: 1s, 2s, 4s
      echo "Error ${HTTP_CODE}. Retrying in ${WAIT_TIME} seconds... (attempt ${attempt}/${MAX_RETRIES})"
      sleep $WAIT_TIME
      continue
    else
      echo "Max retries reached. Last error: ${HTTP_CODE}"
      echo "$BODY"
      exit 1
    fi
  fi

  # Other errors - don't retry
  echo "HTTP error ${HTTP_CODE}:"
  echo "$BODY"
  exit 1
done
