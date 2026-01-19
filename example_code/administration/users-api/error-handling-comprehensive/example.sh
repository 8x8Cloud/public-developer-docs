#!/bin/bash
# Comprehensive error handling wrapper for API calls
#
# Usage:
#   API_KEY="your-key" USER_ID="user-id" bash example.sh
#
# This script demonstrates comprehensive error handling including:
# - Parsing RFC 7807 Problem Details error responses
# - Distinguishing retryable vs non-retryable errors
# - Automatic retry with exponential backoff
# - Rate limit detection and handling
# - Detailed error logging

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
USER_ID="${USER_ID:?Error: USER_ID environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com}"
MAX_RETRIES="${MAX_RETRIES:-3}"

# Function to extract JSON field value
get_json_field() {
    local json="$1"
    local field="$2"
    echo "$json" | grep -o "\"$field\":\"[^\"]*\"" | cut -d'"' -f4
}

# Function to classify error as retryable or non-retryable
is_retryable() {
    local status_code=$1
    case $status_code in
        429|500|502|503|504|424)  # Rate limit, server errors, failed dependency
            return 0  # Retryable
            ;;
        400|401|403|404|409)  # Client errors
            return 1  # Non-retryable
            ;;
        *)
            return 1  # Unknown - don't retry
            ;;
    esac
}

# Function to get user-friendly error message
get_error_message() {
    local status_code=$1
    local detail=$2

    case $status_code in
        400)
            echo "Validation error: $detail"
            ;;
        401)
            echo "Authentication failed: Check your API key"
            ;;
        403)
            echo "Permission denied: $detail"
            ;;
        404)
            echo "Resource not found: $detail"
            ;;
        409)
            echo "Conflict: $detail"
            ;;
        429)
            echo "Rate limit exceeded: $detail"
            ;;
        424)
            echo "Dependency failure: $detail"
            ;;
        500|502|503|504)
            echo "Server error: $detail"
            ;;
        *)
            echo "HTTP $status_code: $detail"
            ;;
    esac
}

# Main function with error handling and retry logic
api_call_with_error_handling() {
    local attempt=0
    local wait_time=1

    while [ $attempt -le $MAX_RETRIES ]; do
        # Make API call
        response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
            -H "X-API-Key: ${API_KEY}" \
            -H "Accept: application/vnd.users.v1+json" \
            "${BASE_URL}/users/${USER_ID}")

        http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d: -f2)
        body=$(echo "$response" | sed '/HTTP_STATUS:/d')

        if [ "$http_status" = "200" ]; then
            # Success
            echo "Success! User retrieved:"
            echo "$body" | head -20
            return 0
        fi

        # Extract error details
        error_title=$(get_json_field "$body" "title")
        error_detail=$(get_json_field "$body" "detail")

        # Build error message
        error_message=$(get_error_message "$http_status" "$error_detail")

        # Log error with details
        echo "Error [Attempt $((attempt + 1))/$((MAX_RETRIES + 1))]: $error_message" >&2
        echo "  HTTP Status: $http_status" >&2
        echo "  Title: $error_title" >&2
        echo "  Detail: $error_detail" >&2

        # Extract field-level errors if present
        field_errors=$(echo "$body" | grep -o '"errors":\[[^]]*\]')
        if [ -n "$field_errors" ]; then
            echo "  Field errors:" >&2
            # Parse field errors (simplified - real implementation would be more robust)
            echo "$body" | grep -o '"field":"[^"]*"' | while read field_line; do
                field=$(echo "$field_line" | cut -d'"' -f4)
                echo "    - Field: $field" >&2
            done
        fi

        # Check if error is retryable
        if is_retryable "$http_status"; then
            attempt=$((attempt + 1))

            if [ $attempt -le $MAX_RETRIES ]; then
                # Handle rate limit with X-RateLimit-Reset header
                if [ "$http_status" = "429" ]; then
                    rate_limit_reset=$(echo "$response" | grep -i "x-ratelimit-reset:" | cut -d: -f2 | tr -d ' \r')
                    if [ -n "$rate_limit_reset" ]; then
                        current_time=$(date +%s)
                        wait_time=$((rate_limit_reset - current_time))
                        wait_time=$((wait_time > 0 ? wait_time : 1))
                        echo "  Rate limited. Waiting ${wait_time}s until reset..." >&2
                        sleep $wait_time
                        continue
                    fi
                fi

                # Exponential backoff
                echo "  Retrying in ${wait_time}s..." >&2
                sleep $wait_time
                wait_time=$((wait_time * 2))
                [ $wait_time -gt 30 ] && wait_time=30
                continue
            else
                echo "" >&2
                echo "RETRYABLE ERROR: Max retries exceeded" >&2
                echo "The service may be temporarily unavailable. Please try again later." >&2
                return 2  # Retryable error code
            fi
        else
            # Non-retryable error
            echo "" >&2
            echo "NON-RETRYABLE ERROR: Cannot retry this error" >&2
            echo "Please check your request and credentials, then try again." >&2
            return 1  # Non-retryable error code
        fi
    done

    return 1
}

# Execute with error handling
echo "Retrieving user with comprehensive error handling..."
echo ""

api_call_with_error_handling
exit_code=$?

echo ""
case $exit_code in
    0)
        echo "✓ Request completed successfully"
        ;;
    1)
        echo "✗ Request failed with non-retryable error"
        echo "  Action required: Fix the request or credentials"
        ;;
    2)
        echo "✗ Request failed with retryable error after max retries"
        echo "  Action required: Service may be unavailable, try again later"
        ;;
esac

exit $exit_code
