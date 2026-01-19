#!/bin/bash
# Search sites by name with wildcard filtering
#
# Note: Site search has limited RSQL support - only name field with == operator
#
# Usage:
#   API_KEY="your-key" NAME_PATTERN="Office*" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
NAME_PATTERN="${NAME_PATTERN:-Office*}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"
PAGE_SIZE="${PAGE_SIZE:-100}"
PAGE_NUMBER="${PAGE_NUMBER:-0}"

curl -X GET "${BASE_URL}/sites?filter=name==${NAME_PATTERN}&pageSize=${PAGE_SIZE}&pageNumber=${PAGE_NUMBER}" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.sites.v1+json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s -S
