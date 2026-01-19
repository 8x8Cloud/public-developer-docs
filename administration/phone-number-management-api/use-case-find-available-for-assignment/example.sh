#!/bin/bash
# Find an available phone number for user or ring group assignment
#
# Usage:
#   API_KEY="your-key" bash example.sh
#
# With optional parameters:
#   API_KEY="your-key" COUNTRY="GB" CATEGORY="TOLL_FREE" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"
COUNTRY="${COUNTRY:-US}"
CATEGORY="${CATEGORY:-LOCAL}"

curl -X GET "${BASE_URL}/phone-numbers?filter=status==AVAILABLE;country==${COUNTRY};category==${CATEGORY}&pageSize=1" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Accept: application/vnd.phonenumbers.v1+json" \
  -w "\nHTTP Status: %{http_code}\n" \
  -s -S
