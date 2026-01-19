#!/bin/bash
# Update site telephony features (caller ID and external calling permissions)
#
# Usage:
#   API_KEY="your-key" SITE_ID="site-id" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
SITE_ID="${SITE_ID:?Error: SITE_ID environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

curl -X PUT "${BASE_URL}/sites/${SITE_ID}" \
  -H "x-api-key: ${API_KEY}" \
  -H "Accept: application/vnd.sites.v1+json" \
  -H "Content-Type: application/vnd.sites.v1+json" \
  -d '{
    "name": "San Francisco Office",
    "pbxName": "pbx01",
    "locale": "en-US",
    "timezone": "America/Los_Angeles",
    "siteCode": "SF01",
    "extensionLength": 4,
    "address": {
      "id": "addr_sf_market_st"
    },
    "callerIdSettings": {
      "mainNumber": "+14155551234",
      "setMainNumberAsCallerId": true,
      "shareMainNumberAsCallerId": false,
      "displayName": "SF Office"
    },
    "defaultDialPlanRuleset": "DOMESTIC"
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s -S
