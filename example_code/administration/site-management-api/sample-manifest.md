# Code Sample Manifest

## Site Management API Guide - Code Samples

**Generated**: 2025-12-22
**Guide**: Site Management API (Administration API Suite)
**Total Samples**: 9 placeholders × 3 languages = 27 files

---

## Sample 1: create-address-basic

**Location**: `create-address-basic/`

**Purpose**: Create an address for site registration (synchronous operation)

**Languages**: Python, Node.js, cURL

**Dependencies**:
- Python: `requests`
- Node.js: `axios`
- cURL: bash

**Demonstrates**:
- Making a synchronous POST request to create an address
- Setting required headers (x-api-key, Accept, Content-Type)
- Providing address fields in request body
- Handling synchronous 200 OK response (not async 202)
- Extracting address ID from response for site creation

**Where Used**: Quick Start - Step 1

---

## Sample 2: create-site-basic

**Location**: `create-site-basic/`

**Purpose**: Create a new site (asynchronous operation)

**Languages**: Python, Node.js, cURL

**Dependencies**:
- Python: `requests`
- Node.js: `axios`
- cURL: bash

**Demonstrates**:
- Making asynchronous POST request to create a site
- Using address ID from previous step in request body
- Setting all required site fields (name, pbxName, locale, timezone, address)
- Handling 202 Accepted response with Operation object (async pattern)
- Extracting operationId for polling

**Where Used**: Quick Start - Step 2

---

## Sample 3: poll-site-operation

**Location**: `poll-site-operation/`

**Purpose**: Poll an asynchronous operation until completion or failure

**Languages**: Python, Node.js, cURL

**Dependencies**:
- Python: `requests`
- Node.js: `axios`
- cURL: bash

**Demonstrates**:
- Polling operation status with GET `/operations/{operationId}`
- Implementing polling loop with appropriate delays
- Checking for COMPLETED status
- Extracting resource link when complete
- Handling FAILED status with error details

**Where Used**: Quick Start - Step 3

---

## Sample 4: create-emergency-ready-site

**Location**: `create-emergency-ready-site/`

**Purpose**: Create a site with emergency address and notification configuration (complete workflow)

**Languages**: Python, Node.js, cURL

**Dependencies**:
- Python: `requests`
- Node.js: `axios`
- cURL: bash

**Demonstrates**:
- Creating an emergency-ready site through complete workflow
- First creating an address with complete street, city, state information
- Then creating a site with emergency notification configuration
- Handling address validation errors if they occur
- Configuring email notifications for emergency calls

**Where Used**: Use Case 1 - Create an Emergency-Ready Site

---

## Sample 5: update-site-telephony

**Location**: `update-site-telephony/`

**Purpose**: Update site telephony features (caller ID and dial plan)

**Languages**: Python, Node.js, cURL

**Dependencies**:
- Python: `requests`
- Node.js: `axios`
- cURL: bash

**Demonstrates**:
- Updating site telephony features
- Configuring caller ID settings (main number, display name)
- Setting external calling permissions with dial plan ruleset
- Handling asynchronous update operation

**Where Used**: Use Case 2 - Configure Site Telephony Features

---

## Sample 6: search-sites-by-name

**Location**: `search-sites-by-name/`

**Purpose**: Search sites by name with wildcard filtering

**Languages**: Python, Node.js, cURL

**Dependencies**:
- Python: `requests`
- Node.js: `axios`
- cURL: bash

**Demonstrates**:
- Searching sites by name with wildcard filtering
- Using RSQL filter syntax with wildcards
- Handling paginated results
- Extracting site data from response

**Where Used**: Use Case 3 - Search Sites by Name

---

## Sample 7: delete-site

**Location**: `delete-site/`

**Purpose**: Delete a site and its associated address (multi-step workflow)

**Languages**: Python, Node.js, cURL

**Dependencies**:
- Python: `requests`
- Node.js: `axios`
- cURL: bash

**Demonstrates**:
- Deleting a site that is no longer needed
- Handling asynchronous delete operation
- Checking address usage before deleting
- Deleting unused address after site deletion
- Multi-step workflow with precondition checks

**Where Used**: Use Case 4 - Delete Site and Unused Address

---

## Sample 8: check-address-usage

**Location**: `check-address-usage/`

**Purpose**: Check if an address can be deleted by examining usage counts

**Languages**: Python, Node.js, cURL

**Dependencies**:
- Python: `requests`
- Node.js: `axios`
- cURL: bash

**Demonstrates**:
- Checking address usage before deletion
- Retrieving address with usage counts
- Understanding addressUsage object categories
- Determining if address can be safely deleted

**Where Used**: Use Case 5 - Check Address Reusability

---

## Sample 9: async-operation-error-example

**Location**: `async-operation-error-example/`

**Purpose**: Handle failed asynchronous operations with error details

**Languages**: Python, Node.js, cURL

**Dependencies**:
- Python: `requests`
- Node.js: `axios`
- cURL: bash

**Demonstrates**:
- Handling failed asynchronous operations
- Checking operation status for FAILED state
- Extracting error details from failed operation
- Understanding error field structure in Operation object

**Where Used**: Error Handling - Asynchronous Operation Errors

---

## Code Quality Standards

All code samples follow the 8x8 Code Sample Quality Standard:

✅ **Function-focused**: Reusable functions, not full CLI scripts
✅ **Parameterized credentials**: Accept API keys as function parameters
✅ **Minimal scaffolding**: No environment variable parsing, no main() wrappers
✅ **Error handling**: Catches HTTP and network errors with helpful messages
✅ **Type safety**: Python uses type hints, Node.js uses JSDoc
✅ **Documented**: Clear docstrings/JSDoc with usage examples
✅ **Tested patterns**: Based on actual API behavior from OAS specifications

## Usage Notes

### Python
```bash
pip install requests
python
>>> from example import function_name
>>> result = function_name("your-api-key", ...)
```

### Node.js
```bash
npm install axios
node
> const { functionName } = require('./example.js');
> functionName('your-api-key', ...).then(console.log);
```

### cURL
```bash
API_KEY="your-api-key" bash example.sh
```

---

**Total Files Generated**: 27 (9 samples × 3 languages)
**API Version**: v1
**Base URL**: https://api.8x8.com/admin-provisioning
