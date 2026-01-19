#!/bin/bash
# Verify if a specific phone number exists and is available for assignment
#
# Usage:
#   API_KEY="your-key" PHONE_NUMBER="+14085551234" bash example.sh
#
# The script will output the phone number data and indicate if it's available

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
PHONE_NUMBER="${PHONE_NUMBER:?Error: PHONE_NUMBER environment variable required (e.g., +14085551234)}"
BASE_URL="${BASE_URL:-https://api.8x8.com/admin-provisioning}"

# Make the request and capture both response and HTTP status
RESPONSE=$(curl -s -w "\n%{http_code}" -X GET "${BASE_URL}/phone-numbers/${PHONE_NUMBER}" \
  -H "X-API-Key: ${API_KEY}" \
  -H "Accept: application/vnd.phonenumbers.v1+json")

# Extract HTTP status from last line
HTTP_STATUS=$(echo "$RESPONSE" | tail -n1)
# Extract response body (all but last line)
BODY=$(echo "$RESPONSE" | head -n-1)

echo "HTTP Status: $HTTP_STATUS"
echo ""

if [ "$HTTP_STATUS" = "200" ]; then
  echo "$BODY"
  echo ""

  # Check if status is AVAILABLE (simplified grep)
  if echo "$BODY" | grep -q '"status":"AVAILABLE"'; then
    echo "✓ Number is AVAILABLE for assignment"
  else
    STATUS=$(echo "$BODY" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
    echo "✗ Number exists but status is ${STATUS} (not available)"
  fi
elif [ "$HTTP_STATUS" = "404" ]; then
  echo "✗ Phone number not found in inventory"
else
  echo "Error: $BODY"
fi
