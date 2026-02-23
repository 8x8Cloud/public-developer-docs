---
sidebar_label: 'WhatsApp Flows over 8x8 API'
---

# WhatsApp Flows over 8x8 API

This API reference provides complete technical documentation for developers implementing WhatsApp Flows programmatically.

## Overview

The WhatsApp Flows API enables you to create, manage, publish, and send interactive forms within WhatsApp conversations. Use the API when you need:

- **Automated deployments** from CI/CD pipelines
- **Programmatic flow management** across multiple channels
- **Version control** integration for Flow definitions
- **Custom tooling** and workflow automation
- **Bulk operations** at scale

> **For non-developers:** If you prefer a visual, no-code interface, see the [WhatsApp Flows in 8x8 Connect](./whatsapp-flows-ui-guide.md).

## Prerequisites

Before using the API, ensure you have:

1. **Active WhatsApp Channel** in 8x8 Connect
2. **Channel ID** - Find in 8x8 Connect Portal under Channels
3. **API Key** - Generate in 8x8 Connect Portal under API Keys
4. **Subaccount ID** - Required for sending messages
5. **Webhook endpoint** - Configured to receive Flow submissions

## Authentication

All API requests require Bearer token authentication using your API Key.

**Header:**

```text
Authorization: Bearer YOUR_API_KEY
```

**Example:**

```bash
curl -X GET "https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## Flow Management APIs

**Base URL:** `https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows`

### API Endpoints Overview

| Action | Method | Endpoint | Description |
|--------|--------|----------|-------------|
| [**List Flows**](/connect/reference/get-whatsapp-flows) | GET | `/flows` | Retrieves all Flows for a specified channel |
| [**Create Flow**](/connect/reference/create-whatsapp-flow) | POST | `/flows` | Creates a new Flow in `DRAFT` status |
| [**Get Flow**](/connect/reference/get-whatsapp-flow-details) | GET | `/flows/{flowId}` | Retrieves Flow details and configuration |
| [**Update Flow**](/connect/reference/update-whatsapp-flow) | PUT | `/flows/{flowId}` | Updates a Flow (DRAFT only) |
| [**Delete Flow**](/connect/reference/delete-whatsapp-flow) | DELETE | `/flows/{flowId}` | Deletes a Flow (DRAFT only) |
| [**Publish Flow**](/connect/reference/publish-whatsapp-flow) | POST | `/flows/{flowId}/publish` | Publishes Flow for use in messages |
| [**Deprecate Flow**](/connect/reference/deprecate-whatsapp-flow) | POST | `/flows/{flowId}/deprecate` | Marks Flow as deprecated |
| [**Preview Flow**](/connect/reference/preview-whatsapp-flow) | GET | `/flows/{flowId}/preview` | Generates preview URL for testing |

---

### Create Flow

Upload a new Flow definition to your WhatsApp channel.

**Endpoint:** `POST /config/v1/channels/whatsapp/{channelId}/flows`

**Request Body:**

```json
{
  "name": "Appointment Booking Flow",
  "categories": ["APPOINTMENT_BOOKING"],
  "flowJson": "{\"version\":\"7.3\",\"screens\":[{\"id\":\"WELCOME\",\"title\":\"Book Appointment\",\"terminal\":true,\"success\":true,\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"TextHeading\",\"text\":\"Schedule Your Visit\"},{\"type\":\"DatePicker\",\"name\":\"appointment_date\",\"label\":\"Preferred Date\",\"required\":true},{\"type\":\"Footer\",\"label\":\"Confirm\",\"on-click-action\":{\"name\":\"complete\",\"payload\":{\"date\":\"${form.appointment_date}\"}}}]}}]}"
}
```

**Parameters:**

- **`name`** (string, required): Human-readable Flow name for your reference
- **`categories`** (array, required): Flow categories. Options:
  - `["OTHER"]` - General purpose
  - `["LEAD_GENERATION"]` - Lead capture
  - `["CONTACT_US"]` - Contact forms
  - `["CUSTOMER_SUPPORT"]` - Support requests
  - `["SIGN_UP"]` - Registration
  - `["APPOINTMENT_BOOKING"]` - Appointments
  - `["SURVEY"]` - Feedback collection
- **`flowJson`** (string, required): **Stringified JSON** of your Flow definition

**Important:** The `flowJson` field must be a **JSON string**, not a JSON object. Use `JSON.stringify()` to properly escape your Flow definition.

**Response (201 Created):**

```json
{
  "id": "1234567890123456",
  "name": "Appointment Booking Flow",
  "status": "DRAFT",
  "categories": ["APPOINTMENT_BOOKING"],
  "validation_errors": []
}
```

**Flow Status Values:**
- `DRAFT` - Editable, not usable in messages
- `PUBLISHED` - Live, immutable, usable in messages
- `DEPRECATED` - Published but no longer recommended

**Example with curl:**

```bash
curl -X POST "https://chatapps.8x8.com/config/v1/channels/whatsapp/YOUR_CHANNEL_ID/flows" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Appointment Booking Flow",
    "categories": ["APPOINTMENT_BOOKING"],
    "flowJson": "{\"version\":\"7.3\",\"screens\":[...]}"
  }'
```

---

### Update Flow

Modify an existing Flow definition. **Only works for Flows in `DRAFT` status.**

**Endpoint:** `PUT /config/v1/channels/whatsapp/{channelId}/flows/{flowId}`

**Request Body:** Same structure as Create Flow

**Response (200 OK):** Same as Create Flow response

> **Note**
> Published Flows cannot be updated. To modify a published Flow:
> 1. Create a new Flow with the updated definition
> 2. Publish the new Flow
> 3. Optionally deprecate the old Flow
> 4. Update templates to use the new Flow ID

---

### Get Flow

Retrieve details and JSON definition of a specific Flow.

**Endpoint:** `GET /config/v1/channels/whatsapp/{channelId}/flows/{flowId}`

**Response (200 OK):**

```json
{
  "id": "1234567890123456",
  "name": "Appointment Booking Flow",
  "status": "PUBLISHED",
  "categories": ["APPOINTMENT_BOOKING"],
  "validation_errors": [],
  "flowJson": "{\"version\":\"7.3\",\"screens\":[...]}"
}
```

**Use Cases:**
- Verify Flow status before sending
- Export Flow JSON for version control
- Audit existing Flows

---

### Delete Flow

Permanently delete a Flow. **Only works for Flows in `DRAFT` status.**

**Endpoint:** `DELETE /config/v1/channels/whatsapp/{channelId}/flows/{flowId}`

**Response (204 No Content)**

**Important:**
- Cannot delete published Flows
- Cannot delete Flows currently in use by templates
- Deletion is permanent and cannot be undone

---

### Publish Flow

Publish a Flow to make it available for use in messages. **This action is irreversible.**

**Endpoint:** `POST /config/v1/channels/whatsapp/{channelId}/flows/{flowId}/publish`

**Response (200 OK):**

```json
{
  "id": "1234567890123456",
  "name": "Appointment Booking Flow",
  "status": "PUBLISHED"
}
```

**After Publishing:**
- Flow becomes **immutable** - no edits allowed
- Flow can be used in templates and interactive messages
- Flow status changes from `DRAFT` to `PUBLISHED`

---

### Deprecate Flow

Mark a Flow as deprecated. It remains functional but is flagged as no longer recommended.

**Endpoint:** `POST /config/v1/channels/whatsapp/{channelId}/flows/{flowId}/deprecate`

**Response (200 OK):**

```json
{
  "id": "1234567890123456",
  "name": "Appointment Booking Flow",
  "status": "DEPRECATED"
}
```

**Use Cases:**
- Phasing out old Flow versions
- Migrating users to improved Flows
- Maintaining backward compatibility while promoting new versions

---

### Preview Flow

Generate a preview URL to test the Flow before publishing.

**Endpoint:** `GET /config/v1/channels/whatsapp/{channelId}/flows/{flowId}/preview?refresh=false`

**Query Parameters:**
- **`refresh`** (boolean):
  - `false` - Use cached preview (faster)
  - `true` - Generate new preview with latest changes

**Response (200 OK):**

```json
{
  "preview_url": "https://business.facebook.com/wa/manage/flows/1234567890123456/preview/",
  "expires_at": "2026-02-05T18:00:00Z"
}
```

**Preview URL:**
- Opens WhatsApp Business Manager
- Shows interactive Flow preview
- Expires after set period (usually 48 hours)
- Use `refresh=true` to generate new URL after expiry

---

## Sending Flow Messages

Flows can be sent via two methods:

1. **Template messages** - Business-initiated (proactive outreach)
2. **Interactive messages** - User-initiated (within 24-hour window)

### Via Template Message (Business-Initiated)

Template messages with Flow buttons allow you to initiate conversations or re-open closed service windows.

**Use Cases:**
- Proactive appointment reminders
- Feedback request campaigns
- Re-engagement after window closes
- Marketing with data collection

#### Step 1: Create Template with Flow Button

**Template Structure:**

Templates must be created and approved by WhatsApp before use. See [Template Message API Library](./template-message-api-library.mdx) for complete documentation.

**Flow Button in Template:**

```json
{
  "language": "en_US",
  "name": "appointment_reminder",
  "category": "UTILITY",
  "components": [
    {
      "type": "BODY",
      "text": "Hi {{1}}, your appointment is coming up. Need to reschedule?"
    },
    {
      "type": "BUTTONS",
      "buttons": [
        {
          "type": "FLOW",
          "text": "Reschedule",
          "flowId": "1234567890123456"
        }
      ]
    }
  ]
}
```

#### Step 2: Send Template Message

**Endpoint:** `POST https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages`

**Request:**

```json
{
  "user": {
    "msisdn": "+15551234567"
  },
  "type": "template",
  "content": {
    "template": {
      "language": "en_US",
      "name": "appointment_reminder",
      "components": [
        {
          "type": "body",
          "parameters": [
            {
              "type": "text",
              "text": "John"
            }
          ]
        },
        {
          "type": "button",
          "subType": "flow",
          "index": 0,
          "parameters": [
            {
              "type": "action"
            }
          ]
        }
      ]
    }
  }
}
```

**Key Points:**
- `flowId` is configured in the template, not in the send request
- Flow button uses `subType: "flow"` in the button component
- User taps button to open the Flow

---

### Via Interactive Message (User-Initiated)

Interactive Flow messages are used **within the 24-hour customer service window** after a user sends you a message.

**Use Cases:**
- Response to customer inquiry
- Agent-initiated data collection during support chat
- Follow-up after template interaction

**Endpoint:** `POST https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages`

**Interactive Flow Structure:**

```json
{
  "user": {
    "msisdn": "+15551234567"
  },
  "type": "Interactive",
  "content": {
    "interactive": {
      "type": "flow",
      "header": {
        "type": "text",
        "text": "Schedule Your Appointment"
      },
      "body": {
        "text": "Please select your preferred date and time for your visit."
      },
      "footer": {
        "text": "Available Mon-Fri 9AM-5PM"
      },
      "action": {
        "parameters": {
          "flowId": "1234567890123456",
          "flowCta": "Book Now"
        }
      }
    }
  }
}
```

**Parameters:**
- **`flowId`** (required): The published Flow ID
- **`flowCta`** (required): Button text (max 20 characters)
- **`flowToken`** (optional): Custom token passed to webhook
- **`mode`** (optional): `"draft"` for testing unpublished flows
- **`flowMessageVersion`** (optional): `"3"` for latest features
- **`flowActionData`** (optional): Pre-populate Flow data

  ```json
  "flowActionData": {
    "screen": "SCREEN_ID",
    "data": {
      "field_name": "pre-filled value"
    }
  }
  ```

**Service Window Requirement:**
- Can only send within 24 hours after user's last message
- Outside window, use Template message instead
- See [WhatsApp Conversation Windows](./concepts-fundamentals.md)

**Complete Example:**

```bash
curl -X POST "https://chatapps.8x8.com/api/v1/subaccounts/YOUR_SUBACCOUNT_ID/messages" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "msisdn": "+15551234567"
    },
    "type": "Interactive",
    "content": {
      "interactive": {
        "type": "flow",
        "body": {
          "text": "Complete our quick survey to help us improve."
        },
        "action": {
          "parameters": {
            "flowId": "1234567890123456",
            "flowCta": "Start Survey"
          }
        }
      }
    }
  }'
```

---

## Webhook Integration

When users complete a Flow, submissions are delivered to your webhook as inbound messages.

### Webhook Configuration

**Setup in 8x8 Connect Portal:**
1. Navigate to **Messaging Apps** > **Webhooks**
2. Add your endpoint URL (must be HTTPS)
3. Select event type: `inbound_message_received`
4. Save configuration

**Complete webhook setup guide:** [WhatsApp Webhooks Documentation](./whatsapp-webhooks.md)

### Flow Submission Payload

Flow submissions arrive as `inbound_message_received` events with type `nfmReply`.

**Identifying Flow Submissions:**

```javascript
if (payload.type === "Interactive" &&
    payload.content.interactive.type === "nfmReply") {
  // This is a Flow submission
}
```

**Complete Payload Structure:**

```json
{
  "namespace": "ChatApps",
  "eventType": "inbound_message_received",
  "payload": {
    "umid": "unique-message-id-abc123",
    "subAccountId": "your-subaccount-id",
    "timestamp": "2026-02-03T10:30:00.000Z",
    "user": {
      "msisdn": "+15551234567",
      "channelUserId": "15551234567"
    },
    "recipient": {
      "channel": "whatsapp",
      "channelId": "your-channel-id"
    },
    "type": "Interactive",
    "content": {
      "interactive": {
        "type": "nfmReply",
        "nfmReply": {
          "responseJson": "{\"appointment_date\":\"2026-03-15\",\"service_type\":\"plumbing\",\"flow_token\":\"<TOKEN>\"}"
        }
      }
    }
  }
}
```

### Parsing Submission Data

The `responseJson` field contains a **JSON string** (not a parsed object). You must parse it to access form data.

**Step 1: Extract the JSON String**

```javascript
const responseJsonString = payload.content.interactive.nfmReply.responseJson;
```

**Step 2: Parse to Object**

```javascript
const submissionData = JSON.parse(responseJsonString);
```

**Step 3: Validate and Process**

```javascript
// Validate required fields
if (!submissionData.appointment_date || !submissionData.service_type) {
  console.error('Missing required fields');
  return res.status(200).send('OK'); // Always return 200 to acknowledge receipt
}

// Process the data
await createAppointment({
  customerPhone: payload.user.msisdn,
  appointmentDate: submissionData.appointment_date,
  serviceType: submissionData.service_type,
  flowToken: submissionData.flow_token,
  umid: payload.umid // For idempotency tracking
});

// Send confirmation message
await sendMessage({
  user: { msisdn: payload.user.msisdn },
  type: 'text',
  content: {
    text: `Appointment confirmed for ${submissionData.appointment_date}. We'll send a reminder 24 hours before your visit.`
  }
});

// Return 200 OK within 5 seconds
res.status(200).send('OK');
```

### Webhook Response Requirements

**Your webhook endpoint must:**

1. **Respond with 200 OK** within 5 seconds
2. **Process asynchronously** if operations take longer
3. **Handle duplicates** using `umid` for idempotency
4. **Validate input** before processing
5. **Log errors** without throwing exceptions

**Example Webhook Handler:**

```javascript
const express = require('express');
const app = express();

app.post('/webhook', express.json(), async (req, res) => {
  const { payload } = req.body;

  // Acknowledge receipt immediately
  res.status(200).send('OK');

  // Process asynchronously
  try {
    if (payload.type === 'Interactive' &&
        payload.content.interactive.type === 'nfmReply') {

      // Parse Flow submission
      const data = JSON.parse(payload.content.interactive.nfmReply.responseJson);

      // Check for duplicate using umid
      if (await isProcessed(payload.umid)) {
        console.log('Duplicate submission, skipping');
        return;
      }

      // Mark as processed
      await markProcessed(payload.umid);

      // Process submission
      await handleFlowSubmission(data, payload);
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
    // Log error but don't throw - webhook already acknowledged
  }
});

app.listen(3000);
```

### Response Handling Best Practices

1. **Validate input:** Always validate submission data schema
2. **Handle errors gracefully:** Log parsing errors without crashing
3. **Respond quickly:** Acknowledge within 5 seconds
4. **Store metadata:** Save `umid`, `subAccountId`, `flow_token` for traceability
5. **Implement idempotency:** Check `umid` to prevent duplicate processing
6. **Send confirmation:** Reply to user confirming successful submission
7. **Monitor performance:** Track webhook response times and error rates

---

## Error Handling

### HTTP Error Codes

| Code | Meaning | Common Causes |
|------|---------|---------------|
| **400 Bad Request** | Invalid request format | Malformed JSON, missing required fields, invalid `flowJson` structure |
| **401 Unauthorized** | Authentication failed | Invalid or expired API key |
| **404 Not Found** | Resource doesn't exist | Invalid `channelId` or `flowId` |
| **409 Conflict** | Operation not allowed | Trying to update/delete published Flow |
| **422 Unprocessable Entity** | Validation failed | Invalid Flow JSON schema, unsupported components |
| **429 Too Many Requests** | Rate limit exceeded | Slow down request rate |
| **500 Internal Server Error** | Server error | Temporary issue, retry with exponential backoff |

### Common API Issues

| Error Message | Cause | Solution |
|---------------|-------|----------|
| `Flow not found` | Invalid or deleted Flow ID | Verify Flow exists with GET /flows/{flowId} |
| `Flow must be in DRAFT status` | Attempting to modify published Flow | Create new Flow version instead |
| `Invalid flowJson` | JSON structure doesn't match schema | Validate against WhatsApp Flows schema |
| `flowJson must be a string` | Passed JSON object instead of string | Use `JSON.stringify()` to escape |
| `Flow is not published` | Trying to send unpublished Flow | Publish Flow first with POST /publish |
| `Outside service window` | Interactive message sent >24hrs | Use Template message instead |

### Debugging API Errors

**1. Validate Flow JSON Structure**

Before uploading, validate your Flow definition:

```javascript
// Validate structure
const flowDef = {
  version: "7.3",
  screens: [
    {
      id: "SCREEN1",
      title: "Welcome",
      terminal: true,
      success: true,
      layout: { /* ... */ }
    }
  ]
};

// Test parsing
try {
  const flowJson = JSON.stringify(flowDef);
  JSON.parse(flowJson); // Should succeed
  console.log('Flow JSON is valid');
} catch (error) {
  console.error('Invalid JSON:', error);
}
```

**2. Check Flow Status**

Verify Flow is in correct state:

```bash
curl -X GET "https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows/{flowId}" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

Expected status progression: `DRAFT` → `PUBLISHED`

**3. Test with Preview URL**

Use preview endpoint to test before publishing:

```bash
curl -X GET "https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows/{flowId}/preview?refresh=true" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**4. Log Complete Request/Response**

When debugging, log full API interactions:

```javascript
const axios = require('axios');

try {
  const response = await axios.post(
    `https://chatapps.8x8.com/config/v1/channels/whatsapp/${channelId}/flows`,
    {
      name: 'Test Flow',
      categories: ['OTHER'],
      flowJson: flowJsonString
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  console.log('Success:', response.data);
} catch (error) {
  console.error('Error:', {
    status: error.response?.status,
    statusText: error.response?.statusText,
    data: error.response?.data,
    request: error.config
  });
}
```

---

## Rate Limits

**Flow Configuration API:**
- **100 requests per minute** per API key
- Applies to all Flow management endpoints (create, update, delete, publish)

**Messaging API:**
- **1000 messages per second** per WhatsApp Business Account
- Applies to both template and interactive messages

**Best Practices:**
- Implement exponential backoff on 429 errors
- Batch operations where possible
- Cache Flow IDs to avoid repeated GET requests
- Use webhooks instead of polling for submission status

---

## Testing

### Testing Checklist

Complete end-to-end API testing:

- [ ] **Create Flow:** POST /flows returns 201 with Flow ID
- [ ] **Verify Status:** GET /flows/{flowId} shows `DRAFT` status
- [ ] **Generate Preview:** GET /preview returns valid URL
- [ ] **Test Flow:** Open preview URL and complete Flow
- [ ] **Publish Flow:** POST /publish changes status to `PUBLISHED`
- [ ] **Send Message:** Interactive or Template message delivers successfully
- [ ] **Webhook Received:** Webhook endpoint receives `nfmReply` payload
- [ ] **Parse Data:** All submitted fields parse correctly from `responseJson`
- [ ] **Send Confirmation:** Confirmation message sent back to user

### Testing Tools

**Postman Collection:**
- Import 8x8 Connect API collection
- Set environment variables (channelId, API key)
- Test all Flow endpoints

**cURL Examples:**

```bash
# Create Flow
curl -X POST "https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d @flow-definition.json

# Publish Flow
curl -X POST "https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows/{flowId}/publish" \
  -H "Authorization: Bearer $API_KEY"

# Send Interactive Message
curl -X POST "https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d @interactive-message.json
```

**Webhook Testing:**
- Use tools like ngrok to expose local endpoint
- Use RequestBin to inspect webhook payloads
- Monitor webhook logs for `nfmReply` events

---

## Code Examples

Complete end-to-end examples are available in the [WhatsApp Flows Examples](./whatsapp-flows-examples.md) documentation, including:

- Product Return & Exchange Flow
- Loan Application with KYC
- Service Appointment Booking
- Healthcare Appointment Scheduling
- CPaaS Lead Generation

Each example includes:
- Complete Flow JSON definition
- API requests for creating and publishing
- Template creation
- Webhook handling code
- Best practices

---

## Related Resources

- **[WhatsApp Flows in 8x8 Connect](./whatsapp-flows-ui-guide.md)** - No-code Flow creation interface
- **[WhatsApp Flows Examples](./whatsapp-flows-examples.md)** - Industry-specific Flow templates
- **[WhatsApp Webhooks](./whatsapp-webhooks.md)** - Webhook setup and event types
- **[Template Message API](./template-message-api-library.mdx)** - Complete template syntax
- **[Interactive Message API](./interactive-message-api-library.mdx)** - Interactive message reference
- **[WhatsApp Official Docs](https://developers.facebook.com/docs/whatsapp/flows)** - Meta's Flow documentation
