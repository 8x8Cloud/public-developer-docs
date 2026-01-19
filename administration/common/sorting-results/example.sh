#!/bin/bash
# Fetch users sorted by specified field(s)
#
# Usage:
#   API_KEY="your-key" SORT_EXPRESSION="+basicInfo.lastName" bash example.sh
#
# Environment variables:
#   API_KEY - Your API authentication key (required)
#   SORT_EXPRESSION - Sort expression (required)
#   BASE_URL - API base URL (default: https://api.8x8.com/admin-provisioning)
#
# Examples:
#   # Ascending by last name (A-Z)
#   SORT_EXPRESSION="+basicInfo.lastName"
#
#   # Descending by creation date (newest first)
#   SORT_EXPRESSION="-basicInfo.createdTime"
#
#   # Multi-field sort
#   SORT_EXPRESSION="+directoryInfo.department,+basicInfo.lastName,+basicInfo.firstName"
#
#   # Ascending without + prefix (equivalent)
#   SORT_EXPRESSION="basicInfo.lastName"

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
SORT_EXPRESSION="${SORT_EXPRESSION:?Error: SORT_EXPRESSION environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

curl -X GET "${BASE_URL}/users?sort=${SORT_EXPRESSION}&pageSize=100" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.users.v1+json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s -S
