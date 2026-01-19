#!/bin/bash
# Create a new user in the 8x8 Users API
#
# Usage:
#   API_KEY="your-key" BASE_URL="https://api.8x8.com" bash example.sh
#
# Or inline:
#   API_KEY="your-key" bash example.sh

API_KEY="${API_KEY:?Error: API_KEY environment variable required}"
BASE_URL="${BASE_URL:-https://api.8x8.com}"

curl -X POST "${BASE_URL}/v1/users" \
  -H "x-api-key: ${API_KEY}" \
  -H "Content-Type: application/vnd.users.v1+json" \
  -H "Accept: application/vnd.users.v1+json" \
  -d '{
    "basicInfo": {
      "userName": "jane.smith",
      "firstName": "Jane",
      "lastName": "Smith",
      "primaryEmail": "jane.smith@example.com",
      "status": "active",
      "locale": "en-US",
      "timezone": "America/Los_Angeles",
      "site": {
        "id": "site-123",
        "name": "San Francisco Office"
      }
    },
    "directoryInfo": {
      "jobTitle": "Software Engineer",
      "department": "Engineering",
      "displayInDirectory": true
    }
  }' \
  -w "\nHTTP Status: %{http_code}\n" \
  -s -S
