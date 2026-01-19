#!/bin/bash
# Best practices for handling API rate limits
#
# Usage:
#   API_KEY="your-key" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY required}"
BASE_URL="${BASE_URL:-https://api.8x8.com}"
MAX_RETRIES="${MAX_RETRIES:-3}"

requests_made=0
rate_limit_hits=0

make_request_with_retry() {
  local endpoint="$1"
  local method="${2:-GET}"
  local data="${3:-}"

  for ((attempt=1; attempt<=MAX_RETRIES; attempt++)); do
    requests_made=$((requests_made + 1))

    # Build curl command
    if [ "$method" = "GET" ]; then
      response=$(curl -X GET "${BASE_URL}${endpoint}" \
        -H "x-api-key: ${API_KEY}" \
        -H "Accept: application/vnd.users.v1+json" \
        -s -S -w "\n%{http_code}\n%{header_json}" \
        -D /tmp/rate_limit_headers.txt)
    else
      response=$(curl -X "${method}" "${BASE_URL}${endpoint}" \
        -H "x-api-key: ${API_KEY}" \
        -H "Content-Type: application/vnd.users.v1+json" \
        -H "Accept: application/vnd.users.v1+json" \
        -d "$data" \
        -s -S -w "\n%{http_code}" \
        -D /tmp/rate_limit_headers.txt)
    fi

    # Extract HTTP code and body
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')

    # Extract rate limit headers
    if [ -f /tmp/rate_limit_headers.txt ]; then
      rate_limit=$(grep -i "X-RateLimit-Limit:" /tmp/rate_limit_headers.txt | cut -d' ' -f2 | tr -d '\r')
      rate_remaining=$(grep -i "X-RateLimit-Remaining:" /tmp/rate_limit_headers.txt | cut -d' ' -f2 | tr -d '\r')
      rate_reset=$(grep -i "X-RateLimit-Reset:" /tmp/rate_limit_headers.txt | cut -d' ' -f2 | tr -d '\r')

      if [ -n "$rate_limit" ] && [ -n "$rate_remaining" ]; then
        echo "Rate Limit: ${rate_remaining}/${rate_limit} requests remaining"

        if [ -n "$rate_reset" ]; then
          reset_time=$(date -r "$rate_reset" 2>/dev/null || date -d "@$rate_reset" 2>/dev/null)
          echo "Rate limit resets at: ${reset_time}"
        fi

        # Warn if getting close to limit
        if [ "$rate_remaining" -lt 10 ]; then
          echo "WARNING: Only ${rate_remaining} requests remaining before rate limit"
        fi
      fi
    fi

    # Handle rate limit (429)
    if [ "$http_code" = "429" ]; then
      rate_limit_hits=$((rate_limit_hits + 1))
      echo "Rate limit hit (attempt ${attempt}/${MAX_RETRIES})"

      if [ $attempt -lt $MAX_RETRIES ]; then
        # Calculate wait time from reset header
        if [ -n "$rate_reset" ]; then
          current_time=$(date +%s)
          wait_time=$((rate_reset - current_time + 1))
          if [ $wait_time -lt 0 ]; then
            wait_time=0
          fi
        else
          wait_time=60
        fi

        if [ $wait_time -gt 0 ]; then
          echo "Rate limit exceeded. Waiting ${wait_time} seconds until reset..."
          sleep $wait_time
        else
          echo "Rate limit should already be reset, retrying..."
        fi
        continue
      else
        echo "Max retries reached for rate limit"
        rm -f /tmp/rate_limit_headers.txt
        return 1
      fi
    fi

    # Return on success
    if [ "$http_code" = "200" ] || [ "$http_code" = "202" ]; then
      echo "$body"
      rm -f /tmp/rate_limit_headers.txt
      return 0
    fi

    # Other errors
    echo "HTTP error ${http_code}"
    echo "$body"
    rm -f /tmp/rate_limit_headers.txt
    return 1
  done

  rm -f /tmp/rate_limit_headers.txt
  return 1
}

# Example: Get users with rate limiting
echo "Fetching users with automatic rate limit handling..."
result=$(make_request_with_retry "/v1/users?pageSize=50")

if [ $? -eq 0 ]; then
  echo ""
  echo "Success! Retrieved users:"
  echo "$result" | head -20  # Show first 20 lines
  echo ""
  echo "Request stats:"
  echo "  Requests made: ${requests_made}"
  echo "  Rate limit hits: ${rate_limit_hits}"
else
  echo "Failed to retrieve users"
  exit 1
fi
