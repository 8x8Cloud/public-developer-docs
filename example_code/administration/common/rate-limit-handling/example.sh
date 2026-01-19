#!/bin/bash
# Fetch users with rate limit handling and exponential backoff
#
# Usage:
#   API_KEY="your-key" bash example.sh
#
# Environment variables:
#   API_KEY - Your API authentication key (required)
#   BASE_URL - API base URL (default: https://api.8x8.com/admin-provisioning)
#   MAX_RETRIES - Maximum retry attempts (default: 5)

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"
MAX_RETRIES="${MAX_RETRIES:-5}"

# Retry loop with exponential backoff for rate limits
for attempt in $(seq 1 $MAX_RETRIES); do
  # Make request and capture response + headers + status code
  TEMP_FILE=$(mktemp)
  HTTP_CODE=$(curl -s -w "%{http_code}" -D "$TEMP_FILE" -X GET "${BASE_URL}/users?pageSize=100" \
    -H "x-api-key: ${API_KEY}" \
    -H "Accept: application/vnd.users.v1+json")

  # Extract rate limit headers
  RATE_LIMIT=$(grep -i "x-ratelimit-limit:" "$TEMP_FILE" | cut -d' ' -f2 | tr -d '\r')
  RATE_REMAINING=$(grep -i "x-ratelimit-remaining:" "$TEMP_FILE" | cut -d' ' -f2 | tr -d '\r')
  RATE_RESET=$(grep -i "x-ratelimit-reset:" "$TEMP_FILE" | cut -d' ' -f2 | tr -d '\r')

  # Proactive throttling: slow down if remaining is low
  if [ -n "$RATE_REMAINING" ] && [ "$RATE_REMAINING" -lt 10 ]; then
    echo "Rate limit low ($RATE_REMAINING remaining). Slowing down..."
    sleep 1
  fi

  # Success
  if [ "$HTTP_CODE" = "200" ]; then
    cat "$TEMP_FILE"
    echo "Rate limit: ${RATE_LIMIT}, Remaining: ${RATE_REMAINING}, Reset: ${RATE_RESET}"
    rm -f "$TEMP_FILE"
    exit 0
  fi

  # Rate limit exceeded - retry with backoff
  if [ "$HTTP_CODE" = "429" ]; then
    echo "Rate limit exceeded"
    echo "Limit: ${RATE_LIMIT}, Remaining: ${RATE_REMAINING}, Reset: ${RATE_RESET}"

    if [ "$attempt" -lt "$MAX_RETRIES" ]; then
      # Calculate wait time until reset
      if [ -n "$RATE_RESET" ]; then
        CURRENT_TIME=$(date +%s)
        WAIT_TIME=$((RATE_RESET - CURRENT_TIME))
        WAIT_TIME=$((WAIT_TIME > 0 ? WAIT_TIME : 0))
      else
        # Fallback to exponential backoff
        WAIT_TIME=$((2 ** (attempt - 1)))  # 1s, 2s, 4s, 8s, 16s
      fi

      echo "Waiting ${WAIT_TIME} seconds before retry... (attempt ${attempt}/${MAX_RETRIES})"
      sleep $WAIT_TIME
      rm -f "$TEMP_FILE"
      continue
    else
      echo "Max retries reached"
      rm -f "$TEMP_FILE"
      exit 1
    fi
  fi

  # Other errors
  echo "HTTP error ${HTTP_CODE}"
  cat "$TEMP_FILE"
  rm -f "$TEMP_FILE"
  exit 1
done
