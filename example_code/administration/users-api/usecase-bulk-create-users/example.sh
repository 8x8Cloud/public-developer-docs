#!/bin/bash
# Bulk create users from CSV file with progress tracking
#
# Usage:
#   API_KEY="your-key" SITE_ID="site-id" CSV_FILE="users.csv" bash example.sh
#
# CSV format (with header):
#   firstName,lastName,email,department,jobTitle
#   John,Doe,john.doe@example.com,Engineering,Software Engineer
#
# Note: This shell implementation processes users sequentially.
# For parallel processing, use the Python or Node.js implementations.

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
SITE_ID="${SITE_ID:?Error: SITE_ID environment variable required}"
CSV_FILE="${CSV_FILE:?Error: CSV_FILE environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com}"

if [ ! -f "$CSV_FILE" ]; then
    echo "Error: CSV file not found: $CSV_FILE"
    exit 1
fi

# Count total users (excluding header)
TOTAL=$(tail -n +2 "$CSV_FILE" | wc -l | tr -d ' ')
SUCCESSFUL=0
FAILED=0
CURRENT=0

echo "Loaded $TOTAL users from CSV"
echo "Creating users..."
echo ""

# Function to poll operation
poll_operation() {
    local operation_id=$1
    local max_attempts=30
    local attempt=0
    local wait_time=1

    while [ $attempt -lt $max_attempts ]; do
        sleep $wait_time

        response=$(curl -s \
            -H "X-API-Key: ${API_KEY}" \
            -H "Accept: application/vnd.users.v1+json" \
            "${BASE_URL}/operations/${operation_id}")

        status=$(echo "$response" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)

        if [ "$status" = "COMPLETED" ]; then
            echo "success"
            return 0
        elif [ "$status" = "FAILED" ]; then
            error=$(echo "$response" | grep -o '"detail":"[^"]*"' | cut -d'"' -f4)
            echo "failed:$error"
            return 1
        fi

        # Exponential backoff, max 30 seconds
        wait_time=$((wait_time * 2))
        [ $wait_time -gt 30 ] && wait_time=30
        attempt=$((attempt + 1))
    done

    echo "timeout"
    return 2
}

# Process each user (skip header row)
tail -n +2 "$CSV_FILE" | while IFS=',' read -r first_name last_name email department job_title; do
    CURRENT=$((CURRENT + 1))

    # Build JSON payload
    json_payload=$(cat <<EOF
{
  "basicInfo": {
    "userName": "$email",
    "firstName": "$first_name",
    "lastName": "$last_name",
    "primaryEmail": "$email",
    "status": "ACTIVE",
    "site": {"id": "$SITE_ID"}
  }
EOF
)

    # Add directoryInfo if department or jobTitle present
    if [ -n "$department" ] || [ -n "$job_title" ]; then
        json_payload="$json_payload,"$(cat <<EOF
  "directoryInfo": {
EOF
)
        if [ -n "$department" ]; then
            json_payload="$json_payload"$(cat <<EOF
    "department": "$department"
EOF
)
            [ -n "$job_title" ] && json_payload="$json_payload,"
        fi
        if [ -n "$job_title" ]; then
            json_payload="$json_payload"$(cat <<EOF
    "jobTitle": "$job_title"
EOF
)
        fi
        json_payload="$json_payload"$(cat <<EOF
  }
EOF
)
    fi

    json_payload="$json_payload"$(cat <<EOF
}
EOF
)

    # Create user
    response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
        -X POST "${BASE_URL}/users" \
        -H "X-API-Key: ${API_KEY}" \
        -H "Content-Type: application/vnd.users.v1+json" \
        -H "Accept: application/vnd.users.v1+json" \
        -d "$json_payload")

    http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d: -f2)
    body=$(echo "$response" | sed '/HTTP_STATUS:/d')

    if [ "$http_status" = "202" ]; then
        operation_id=$(echo "$body" | grep -o '"operationId":"[^"]*"' | cut -d'"' -f4)

        if [ -n "$operation_id" ]; then
            result=$(poll_operation "$operation_id")

            if [ "$result" = "success" ]; then
                SUCCESSFUL=$((SUCCESSFUL + 1))
                echo "[$CURRENT/$TOTAL] ✓ Created: $email"
            else
                FAILED=$((FAILED + 1))
                error_detail=$(echo "$result" | cut -d: -f2-)
                echo "[$CURRENT/$TOTAL] ✗ Failed: $email - $error_detail"
            fi
        else
            FAILED=$((FAILED + 1))
            echo "[$CURRENT/$TOTAL] ✗ Failed: $email - No operation ID"
        fi
    else
        FAILED=$((FAILED + 1))
        error=$(echo "$body" | grep -o '"detail":"[^"]*"' | cut -d'"' -f4)
        echo "[$CURRENT/$TOTAL] ✗ Failed: $email - HTTP $http_status: $error"
    fi
done

# Summary
echo ""
echo "=== Bulk Create Summary ==="
echo "Total: $TOTAL"
echo "Successful: $SUCCESSFUL"
echo "Failed: $FAILED"
if [ $TOTAL -gt 0 ]; then
    SUCCESS_RATE=$(echo "scale=1; $SUCCESSFUL * 100 / $TOTAL" | bc)
    echo "Success Rate: ${SUCCESS_RATE}%"
fi
