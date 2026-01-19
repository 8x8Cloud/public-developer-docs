#!/bin/bash
# Filter users using RSQL query syntax
#
# Usage:
#   API_KEY="your-key" RSQL_FILTER="basicInfo.status==ACTIVE" bash example.sh
#
# Environment variables:
#   API_KEY - Your API authentication key (required)
#   RSQL_FILTER - RSQL filter expression (required)
#   BASE_URL - API base URL (default: https://api.8x8.com/admin-provisioning)
#
# Examples:
#   # Simple equality
#   RSQL_FILTER="basicInfo.status==ACTIVE"
#
#   # Wildcard search
#   RSQL_FILTER="basicInfo.primaryEmail==*@example.com"
#
#   # Logical AND (semicolon)
#   RSQL_FILTER="basicInfo.status==ACTIVE;directoryInfo.department==Engineering"
#
#   # Logical OR (comma)
#   RSQL_FILTER="directoryInfo.department==Engineering,directoryInfo.department==Sales"
#
#   # Complex expression
#   RSQL_FILTER="basicInfo.status==ACTIVE;(directoryInfo.department==Engineering,directoryInfo.department==Sales)"

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
RSQL_FILTER="${RSQL_FILTER:?Error: RSQL_FILTER environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

# URL-encode the filter (basic encoding for common characters)
ENCODED_FILTER=$(echo "$RSQL_FILTER" | sed 's/ /%20/g' | sed 's/;/%3B/g' | sed 's/,/%2C/g' | sed 's/(/%28/g' | sed 's/)/%29/g')

curl -X GET "${BASE_URL}/users?filter=${ENCODED_FILTER}&pageSize=100" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.users.v1+json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s -S
