#!/bin/bash
# Fetch all users using scroll-based pagination
#
# Usage:
#   API_KEY="your-key" bash example.sh
#
# Environment variables:
#   API_KEY - Your API authentication key (required)
#   BASE_URL - API base URL (default: https://api.8x8.com/admin-provisioning)
#   PAGE_SIZE - Number of items per page (default: 100, max: 1000)

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"
PAGE_SIZE="${PAGE_SIZE:-100}"

SCROLL_ID=""
HAS_MORE=true
TOTAL_COUNT=0

while [ "$HAS_MORE" = "true" ]; do
  # Build URL with scrollId if we have one
  if [ -z "$SCROLL_ID" ]; then
    URL="${BASE_URL}/users?pageSize=${PAGE_SIZE}"
  else
    URL="${BASE_URL}/users?pageSize=${PAGE_SIZE}&scrollId=${SCROLL_ID}"
  fi

  # Fetch page
  RESPONSE=$(curl -s -X GET "$URL" \
    -H "x-api-key: ${API_KEY}" \
    -H "Accept: application/vnd.users.v1+json")

  # Extract pagination info
  HAS_MORE=$(echo "$RESPONSE" | grep -o '"hasMore":[^,}]*' | cut -d':' -f2 | tr -d ' ')
  SCROLL_ID=$(echo "$RESPONSE" | grep -o '"nextScrollId":"[^"]*"' | cut -d'"' -f4)

  # Count users in this page
  PAGE_COUNT=$(echo "$RESPONSE" | grep -o '"data":\[' | wc -l)
  TOTAL_COUNT=$((TOTAL_COUNT + PAGE_COUNT))

  echo "Page fetched. Total users so far: ${TOTAL_COUNT}"

  # Break if no more pages
  if [ "$HAS_MORE" != "true" ] || [ -z "$SCROLL_ID" ]; then
    break
  fi
done

echo "Complete! Total users retrieved: ${TOTAL_COUNT}"
