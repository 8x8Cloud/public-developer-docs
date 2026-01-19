#!/bin/bash
# List and filter users with pagination
#
# Usage:
#   API_KEY="your-key" FILTER="status==active" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
FILTER="${FILTER:-}"
BASE_URL="${BASE_URL:-https://api.8x8.com}"
PAGE_SIZE="${PAGE_SIZE:-50}"

page_count=0
scroll_id=""

echo "Retrieving users..."

while true; do
  page_count=$((page_count + 1))

  # Build URL with parameters
  if [ -z "$scroll_id" ]; then
    # First request
    url="${BASE_URL}/v1/users?pageSize=${PAGE_SIZE}"
    if [ -n "$FILTER" ]; then
      url="${url}&filter=${FILTER}"
    fi
  else
    # Subsequent requests use scrollId
    url="${BASE_URL}/v1/users?scrollId=${scroll_id}"
  fi

  response=$(curl -X GET "$url" \
    -H "x-api-key: ${API_KEY}" \
    -H "Accept: application/vnd.users.v1+json" \
    -s -S -w "\n%{http_code}")

  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')

  if [ "$http_code" != "200" ]; then
    echo "HTTP error ${http_code}"
    echo "$body"
    exit 1
  fi

  # Count users in this page
  user_count=$(echo "$body" | grep -o '"userId"' | wc -l | tr -d ' ')
  echo "Page ${page_count}: Retrieved ${user_count} users"

  # Display users (basic extraction)
  echo "$body"

  # Check if there are more pages
  has_more=$(echo "$body" | grep -o '"hasMore":[a-z]*' | cut -d':' -f2)
  if [ "$has_more" != "true" ]; then
    echo "Completed: Retrieved all users across ${page_count} pages"
    break
  fi

  # Extract next scrollId
  scroll_id=$(echo "$body" | grep -o '"nextScrollId":"[^"]*"' | cut -d'"' -f4)
  if [ -z "$scroll_id" ]; then
    echo "No more pages available"
    break
  fi

  echo ""
done
