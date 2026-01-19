# Ring Group Management API - Code Sample Manifest

**Generated**: December 23, 2025
**API Version**: 1.0
**Total Samples**: 7
**Languages**: Python, Node.js, cURL (where applicable)

---

## Sample 1: quickstart-create-ring-group

**Purpose**: Create first ring group with async operation tracking
**Placeholder ID**: `quickstart-create-ring-group`
**Location**: `02-code-samples/quickstart-create-ring-group/`
**Languages**: Python, Node.js, cURL

**Demonstrates**:
- Creating a basic ring group with required fields
- Handling 202 Accepted response with operation tracking
- Polling operation status until completion
- Retrieving the created ring group details
- Error handling for common creation failures

**Context**: User has valid authentication credentials and chosen extension number

**Dependencies**:
- **Python**: requests library (`pip install requests`)
- **Node.js**: axios library (`npm install axios`)
- **cURL**: bash, jq for JSON parsing

**API Endpoints Used**:
- `POST /ring-groups` - Create ring group
- `GET /operations/{operationId}` - Poll operation status
- `GET /ring-groups/{ringGroupId}` - Retrieve created ring group

---

## Sample 2: use-case-create-with-members

**Purpose**: Create ring group with multiple members in initial request
**Placeholder ID**: `use-case-create-with-members`
**Location**: `02-code-samples/use-case-create-with-members/`
**Languages**: Python, Node.js

**Demonstrates**:
- Creating ring group with ROUND_ROBIN pattern
- Adding multiple members with sequential numbering
- Setting inboundCallerIdFormat for team context
- Configuring voicemail settings with email notification
- Polling operation until completion
- Retrieving final ring group with members

**Context**: User has list of user IDs to add as members, wants fair call distribution

**Dependencies**:
- **Python**: requests library
- **Node.js**: axios library

**API Endpoints Used**:
- `POST /ring-groups` - Create ring group with members
- `GET /operations/{operationId}` - Poll operation status
- `GET /ring-groups/{ringGroupId}` - Retrieve created ring group

---

## Sample 3: use-case-search-filter

**Purpose**: Search and filter ring groups with RSQL and pagination
**Placeholder ID**: `use-case-search-filter`
**Location**: `02-code-samples/use-case-search-filter/`
**Languages**: Python, Node.js

**Demonstrates**:
- Searching by ring group name with RSQL filter and wildcard
- Searching by extension number range using comparison operators
- Implementing cursor-based pagination with scrollId
- Setting pageSize for optimal performance
- Sorting results alphabetically (ascending and descending)
- Iterating through multiple pages using nextScrollId
- Detecting end of results with hasMore flag
- Handling no results gracefully

**Context**: User manages many ring groups and needs to find specific groups by criteria

**Dependencies**:
- **Python**: requests library
- **Node.js**: axios library

**API Endpoints Used**:
- `GET /ring-groups?filter=...&sort=...&pageSize=...&scrollId=...` - Search with filters and pagination

**RSQL Examples Used**:
- `name=="*Sales*"` - Wildcard name filter
- `extensionNumber>=2000;extensionNumber<=2999` - Range filter with AND operator

---

## Sample 4: use-case-update-settings

**Purpose**: Update ring group configuration (pattern, timeout)
**Placeholder ID**: `use-case-update-settings`
**Location**: `02-code-samples/use-case-update-settings/`
**Languages**: Python, Node.js

**Demonstrates**:
- GET request to retrieve current configuration
- Modifying ringPattern from SEQUENTIAL to ROUND_ROBIN
- Adjusting ringTimeout value
- PUT request with complete ring group object
- Polling operation status
- GET request to verify changes

**Context**: User needs to change call distribution strategy and adjust ring duration

**Dependencies**:
- **Python**: requests library
- **Node.js**: axios library

**API Endpoints Used**:
- `GET /ring-groups/{ringGroupId}` - Retrieve current configuration
- `PUT /ring-groups/{ringGroupId}` - Update ring group
- `GET /operations/{operationId}` - Poll operation status
- `GET /ring-groups/{ringGroupId}` - Verify changes

---

## Sample 5: use-case-manage-members

**Purpose**: Add and remove ring group members
**Placeholder ID**: `use-case-manage-members`
**Location**: `02-code-samples/use-case-manage-members/`
**Languages**: Python, Node.js

**Demonstrates**:
- Retrieving current ring group with members
- Adding new member with appropriate sequenceNumber
- Removing member by userId
- Resequencing remaining members
- Updating voicemailAccessEnabled for specific member
- Submitting update with modified members array
- Polling operation and verifying member changes

**Context**: Team member joining or leaving, need to maintain proper call sequence

**Dependencies**:
- **Python**: requests library
- **Node.js**: axios library

**API Endpoints Used**:
- `GET /ring-groups/{ringGroupId}` - Retrieve ring group with members
- `PUT /ring-groups/{ringGroupId}` - Update with modified members
- `GET /operations/{operationId}` - Poll operation status
- `GET /ring-groups/{ringGroupId}` - Verify member changes

---

## Sample 6: use-case-forwarding-rules

**Purpose**: Configure call forwarding rules for different scenarios
**Placeholder ID**: `use-case-forwarding-rules`
**Location**: `02-code-samples/use-case-forwarding-rules/`
**Languages**: Python, Node.js

**Demonstrates**:
- Creating forwarding rule for NO_ANSWER condition (to VOICEMAIL)
- Creating BUSY forwarding to extension
- Creating OUTAGE forwarding to external E.164 number
- Enabling/disabling rules
- Updating ring group with forwarding rules
- Verifying rule configuration

**Context**: User needs to ensure calls are never lost with different handling for different scenarios

**Dependencies**:
- **Python**: requests library
- **Node.js**: axios library

**API Endpoints Used**:
- `GET /ring-groups/{ringGroupId}` - Retrieve ring group
- `PUT /ring-groups/{ringGroupId}` - Update with forwarding rules
- `GET /operations/{operationId}` - Poll operation status
- `GET /ring-groups/{ringGroupId}` - Verify rules

**Forwarding Rule Examples**:
- NO_ANSWER → VOICEMAIL
- BUSY → EXTENSION_NUMBER (3000)
- OUTAGE → EXTERNAL_NUMBER (+14085551234)

---

## Sample 7: use-case-delete-ring-group

**Purpose**: Delete ring group with verification
**Placeholder ID**: `use-case-delete-ring-group`
**Location**: `02-code-samples/use-case-delete-ring-group/`
**Languages**: Python, Node.js

**Demonstrates**:
- GET request to verify ring group exists
- DELETE request initiating removal
- Polling operation until completion
- Handling failure scenarios
- GET request returning 404 after deletion (verification)
- Error handling for ring group not found

**Context**: User needs to remove obsolete ring group and verify successful deletion

**Dependencies**:
- **Python**: requests library
- **Node.js**: axios library

**API Endpoints Used**:
- `GET /ring-groups/{ringGroupId}` - Verify exists
- `DELETE /ring-groups/{ringGroupId}` - Delete ring group
- `GET /operations/{operationId}` - Poll operation status
- `GET /ring-groups/{ringGroupId}` - Verify deletion (should return 404)

---

## Common Patterns Across All Samples

### Authentication
All samples use **X-API-Key** header authentication:
```
X-API-Key: your-api-key-here
```

### Accept Header
All samples use version-specific Accept header:
```
Accept: application/vnd.ringgroups.v1+json
```

### Content-Type
POST and PUT requests use:
```
Content-Type: application/vnd.ringgroups.v1+json
```

### Asynchronous Operation Handling
Create, Update, and Delete operations return 202 Accepted with Operation object:
1. Initiate operation (POST/PUT/DELETE)
2. Extract operationId from response
3. Poll `GET /operations/{operationId}` every 2 seconds
4. Check status: PENDING → IN_PROGRESS → COMPLETED or FAILED
5. On COMPLETED: retrieve final resource
6. On FAILED: extract error message from operation.error

### Error Handling
All samples include:
- HTTP error handling with status codes
- Network error handling for timeouts/connection failures
- Clear error messages with context
- Response body logging for debugging

---

## Testing Requirements

### Prerequisites for Testing
- Valid API key with ring group management permissions
- Access to test environment or sandbox
- User IDs for member management samples
- Available extension numbers for creation samples

### Environment Variables (for cURL samples)
```bash
export API_KEY="your-api-key"
export BASE_URL="https://api.8x8.com/admin-provisioning"
```

### Test Data Requirements
- **Extension numbers**: Available extensions (e.g., 1001-1999)
- **User IDs**: Valid user IDs for member operations
- **Phone numbers**: E.164 format for forwarding rules (e.g., +14085551234)

---

## Code Quality Notes

All samples follow the **8x8 Code Sample Quality Standard**:
- ✅ Functions accept credentials as parameters (no hardcoded keys)
- ✅ Minimal, focused code (no CLI scaffolding)
- ✅ Self-contained with clear input/output contracts
- ✅ Error handling for HTTP and network errors
- ✅ Timeout values set appropriately (10 seconds)
- ✅ Documentation includes usage examples
- ✅ No environment variable parsing in functions
- ✅ No sys.exit() or process.exit() patterns

---

## Sample Generation Summary

**Total Files Generated**: 17
- Python samples: 7
- Node.js samples: 7
- cURL samples: 1 (quickstart only)
- Manifest: 1

**Total Lines of Code**: ~1800

**Documentation Model**: Suite API (focuses on API-specific examples, references common patterns in suite documentation)

---

## Next Steps

1. **Phase 4: Code Sample Testing** - Validate all samples execute correctly
2. **Phase 5: Final Guide Merge** - Integrate tested samples into guide
3. **Publication** - Deploy final guide to documentation portal
