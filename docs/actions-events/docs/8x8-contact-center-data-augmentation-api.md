# Contact Center Data Augmentation API

## **Overview**

The Data Augmentation API allows you to enrich interaction data with custom variables collected from web forms, IVR systems, CRM data, or any external system. This enriched data serves two primary purposes:

### **🎯 Key Use Cases**

1. **Smart Routing**: Use custom variables with the existing **Test Variable** node in IVR scripts to make intelligent routing decisions
2. **Agent Context**: Display valuable customer information in the Agent Workspace when offering interactions

***

## **Authentication**

**Method**: HTTP Basic Authentication

- **Username**: Your tenant ID
- **Password**: Action Request Token (found in Configuration Manager → Integration → API Token)

```http
Authorization: Basic {base64encode(tenantId:actionToken)}
```

***

## **Base URL**

```text
https://{cluster}.8x8.com/api/tstats/interaction/data
```

| Region        | Cluster  | Example URL                                            |
| ------------- | -------- | ------------------------------------------------------ |
| North America | vcc-na12 | <https://vcc-na12.8x8.com/api/tstats/interaction/data> |
| Europe        | vcc-eu1  | <https://vcc-eu1.8x8.com/api/tstats/interaction/data>  |
| Sandbox       | vcc-sb1  | <https://vcc-sb1.8x8.com/api/tstats/interaction/data>  |

***

## **Identifying the Interaction**

Each endpoint takes the interaction in its path, in one of two forms:

| Path               | Identifier                                             |
| ------------------ | ------------------------------------------------------ |
| `/guid/{guid}`     | The interaction GUID, such as `int-1628bb9dbf7-ABC123` |
| `/callId/{callId}` | The SIP Call-ID of the call                            |

***

## **API Endpoints**

### **Set Interaction Variables**

**POST** `/api/tstats/interaction/data/guid/{guid}`

**POST** `/api/tstats/interaction/data/callId/{callId}`

Add or update custom variables for a specific interaction.

#### **Request Body**

```json
{
  "data": [
    {
      "variables": [
        {
          "name": "_customerId",
          "value": "CUST-123456",
          "display": true,
          "displayName": "Customer ID"
        }
      ]
    }
  ]
}
```

Put all variables in one object inside `data`. Only the first element of the `data` array is read; variables in any further element are ignored, and the request still returns `202`.

#### **Variable Properties**

| Property      | Type    | Required | Description             | Constraints                                      |
| ------------- | ------- | -------- | ----------------------- | ------------------------------------------------ |
| `name`        | string  | Yes      | Variable identifier     | Must start with "\_", max 25 chars, alphanumeric |
| `value`       | string  | Yes      | Variable value          | Max 1000 characters                              |
| `ivr`         | boolean | No       | Enable for IVR routing  | Default: false                                   |
| `display`     | boolean | No       | Show in Agent Workspace | Default: false                                   |
| `displayName` | string  | No       | Agent-facing label      | Max 30 characters                                |
| `dataType`    | string  | No       | Data type hint          | text, number, phone, date, time, currency        |
| `privacy`     | boolean | No       | Mask sensitive data     | Default: false                                   |

#### **Responses**

The API waits up to **2 seconds** for 8x8 Contact Center to confirm the variables were set before it answers. Set your HTTP client's timeout above 2 seconds.

| Status                      | When                                                                  |
| --------------------------- | --------------------------------------------------------------------- |
| `202 Accepted`              | The variables were set, or no confirmation arrived within 2 seconds   |
| `404 Not Found`             | The interaction doesn't exist, for example because the call has ended |
| `500 Internal Server Error` | The variables couldn't be set                                         |

**202 Accepted**

```json
{
  "code": "correlationId",
  "value": "c0a8012e-3f4b-4d6a-9b1e-7a2f5c8d9e10"
}
```

`value` identifies the request; quote it when you contact support about this request. A `202` returned without confirmation, after the 2 seconds, doesn't guarantee that the variables were set.

**404 Not Found**

```json
{
  "code": "resource.not_found",
  "message": "Interaction not found",
  "httpStatus": 404
}
```

The variables were not set.

**500 Internal Server Error**

```json
{
  "code": "server.error",
  "message": "Failed to set interaction data",
  "httpStatus": 500
}
```

### **Get Interaction Data**

**GET** `/api/tstats/interaction/data/guid/{guid}`

**GET** `/api/tstats/interaction/data/callId/{callId}`

Retrieve the context data of a specific interaction and the variables set on it with `ivr: true`.

#### **Success Response (200 OK)**

```json
{
  "InteractionId": "int-1628bb9dbf7-ABC123",
  "Channel": "18005551234",
  "CreateTime": "1705314600",
  "ANI": "16175551234",
  "CallerName": "John Doe",
  "QueueId": "101",
  "QueueTime": "1705314612",
  "AgentId": "jdoe",
  "sipId": "a84b4c76e66710@pc33.example.com",
  "userInput": "[{\"_customerTier\":\"VIP\"},{\"_paymentDue\":\"true\"}]"
}
```

| Field           | Description                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| `InteractionId` | The interaction GUID                                                                                 |
| `Channel`       | The number the customer called; inbound calls only                                                   |
| `CreateTime`    | When the interaction was created, in seconds since the Unix epoch                                    |
| `ANI`           | The caller's phone number                                                                            |
| `CallerName`    | The caller's name, when known                                                                        |
| `QueueId`       | The queue the interaction was routed to                                                              |
| `QueueTime`     | When the interaction was queued, in seconds since the Unix epoch                                     |
| `AgentId`       | The agent handling the interaction, if any                                                           |
| `sipId`         | The SIP Call-ID of the call                                                                          |
| `inboundSipId`  | The SIP Call-ID of the inbound leg; only when there is one                                           |
| `sessionId`     | The session ID of the interaction; only when there is one                                            |
| `userInput`     | A string holding a JSON array, with one `{"name": "value"}` object per variable set with `ivr: true` |

All values are strings, and a field without a value is left out. Variables set only with `display: true` are not returned.

#### **Errors**

| Status                      | `message`                                                             | When                                                                  |
| --------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `404 Not Found`             | `Interaction not found`                                               | The interaction doesn't exist, for example because the call has ended |
| `404 Not Found`             | `Interaction has no customer channel`                                 | The interaction has no customer leg, such as an agent-to-agent call   |
| `500 Internal Server Error` | `Failed to read interaction data`                                     | The interaction data couldn't be read                                 |
| `503 Service Unavailable`   | `Server is currently experiencing high load. Please try again later.` | 8x8 Contact Center didn't answer within 10 seconds; retry later       |

A `404` is returned at once:

```json
{
  "code": "resource.not_found",
  "message": "Interaction not found",
  "httpStatus": 404
}
```

***

## **Use Case 1: Smart Routing with Test Variable Node**

Custom variables can be used with the existing **Test Variable** node in IVR scripts for intelligent routing decisions.

### **How It Works:**

1. Set custom variables via API during the interaction
2. Use the **Test Variable** node in your IVR script
3. Test the variable against specific values
4. Route based on the result (True/False exit points)

### **Example: VIP Customer Routing**

```shell
# Set VIP status via API
curl -X POST \
  'https://vcc-na12.8x8.com/api/tstats/interaction/data/guid/int-123456' \
  -H 'Authorization: Basic {credentials}' \
  -H 'Content-Type: application/json' \
  -d '{
    "data": [
      {
        "variables": [
          {
            "name": "_customerTier",
            "value": "VIP",
            "ivr": true
          }
        ]
      }
    ]
  }'
```

**In IVR Script:**

- Add **Test Variable** node
- Variable: `_customerTier`
- Test Condition: `equals "VIP"`
- **True** exit: Route to priority queue
- **False** exit: Route to standard queue

### **Example: Account Balance Routing**

```json
{
  "data": [
    {
      "variables": [
        {
          "name": "_accountBalance",
          "value": "1250.75",
          "ivr": true,
          "dataType": "currency"
        },
        {
          "name": "_paymentDue",
          "value": "true",
          "ivr": true
        }
      ]
    }
  ]
}
```

**Test Variable Scenarios:**

- Test `_paymentDue` equals "true" → Route to billing department
- Test `_accountBalance` less than "0" → Route to collections
- Test `_accountBalance` greater than "10000" → Route to VIP support

***

## **Use Case 2: Agent Context Display**

Variables with `display: true` appear in the Agent Workspace, providing valuable customer context when interactions are offered.

### **Example: Customer Information Display**

```json
{
  "data": [
    {
      "variables": [
        {
          "name": "_customerId",
          "value": "CUST-123456",
          "display": true,
          "displayName": "Customer ID"
        },
        {
          "name": "_membershipLevel",
          "value": "Gold",
          "display": true,
          "displayName": "Membership Level"
        },
        {
          "name": "_lastContactReason",
          "value": "Billing Inquiry",
          "display": true,
          "displayName": "Last Contact Reason"
        },
        {
          "name": "_accountBalance",
          "value": "$1,250.75",
          "display": true,
          "displayName": "Account Balance",
          "dataType": "currency"
        }
      ]
    }
  ]
}
```

**Agent Workspace Display:**

```text
┌─────────────────────────────────────┐
│ Customer Information                │
├─────────────────────────────────────┤
│ Customer ID: CUST-123456            │
│ Membership Level: Gold              │
│ Last Contact Reason: Billing Inquiry│
│ Account Balance: $1,250.75          │
└─────────────────────────────────────┘
```

### **Best Practices for Agent Display:**

- Use clear, business-friendly `displayName` values
- Limit to 5-7 key variables to avoid information overload
- Use appropriate `dataType` for proper formatting
- Mark sensitive data with `privacy: true`

***

## **Complete Example: E-commerce Order Support**

```shell
curl -X POST \
  'https://vcc-na12.8x8.com/api/tstats/interaction/data/guid/int-987654' \
  -H 'Authorization: Basic {credentials}' \
  -H 'Content-Type: application/json' \
  -d '{
    "data": [
      {
        "variables": [
          {
            "name": "_orderStatus",
            "value": "shipped",
            "ivr": true,
            "display": true,
            "displayName": "Order Status"
          },
          {
            "name": "_orderValue",
            "value": "299.99",
            "display": true,
            "displayName": "Order Value",
            "dataType": "currency"
          },
          {
            "name": "_customerTier",
            "value": "Premium",
            "ivr": true,
            "display": true,
            "displayName": "Customer Tier"
          },
          {
            "name": "_shippingDate",
            "value": "2024-07-10",
            "display": true,
            "displayName": "Shipping Date",
            "dataType": "date"
          }
        ]
      }
    ]
  }'
```

**Routing Logic:**

- Test `_orderStatus` equals "cancelled" → Route to order management
- Test `_customerTier` equals "Premium" → Route to priority support
- Test `_orderValue` greater than "500" → Route to specialized support

**Agent Display:**

- Order Status: shipped
- Order Value: $299.99
- Customer Tier: Premium
- Shipping Date: July 10, 2024

***

## **Error Responses**

| Code | When                                                                        | Example Response                                                                                                                       |
| ---- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 400  | The `Content-Type` of a SET isn't `application/json`                        | `<API><Error>400 - Bad request.</Error></API>` (XML)                                                                                   |
| 401  | The tenant ID or token is wrong, or the tenant doesn't exist or is disabled | No JSON body; the response carries a `WWW-Authenticate: Basic` header                                                                  |
| 404  | The interaction doesn't exist                                               | `{"code": "resource.not_found", "message": "Interaction not found", "httpStatus": 404}`                                                |
| 429  | Too many of the tenant's requests are in progress at once                   | `{"reasons": ["No permits available for {cluster}-{tenantId}"], "message": "Too Many Requests"}`                                       |
| 500  | The variables couldn't be set, or the interaction data couldn't be read     | `{"code": "server.error", "message": "Failed to set interaction data", "httpStatus": 500}`                                             |
| 503  | A GET got no answer within 10 seconds                                       | `{"code": "service.unavailable", "message": "Server is currently experiencing high load. Please try again later.", "httpStatus": 503}` |

***

## **API Limits**

| Limit                 | Value                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------- |
| Concurrent requests   | 100 per tenant by default; a request waits up to 5 seconds for a free slot, then gets `429` |
| Variables per request | 50                                                                                          |
| Variable name length  | 25 characters                                                                               |
| Variable value length | 1000 characters                                                                             |
| Display name length   | 30 characters                                                                               |

***

## **Security & Best Practices**

### **Security**

- **HTTPS Required**: All requests must use HTTPS
- **Privacy Protection**: Use `privacy: true` for sensitive data
- **Authentication**: Secure your action tokens

### **Best Practices**

- **Variable Naming**: Always start with underscore (`_customerId`)
- **Data Types**: Use appropriate `dataType` for formatting
- **Agent Display**: Limit to essential information for better UX
- **Error Handling**: Implement retry logic for 429/500/503 errors. A `404` usually means the interaction has ended, so retrying won't help; only a request made in the first moments of an interaction can get a `404` that a retry fixes
- **Timeouts**: Setting variables can take up to 2 seconds; set your HTTP client's timeout above that
- **Testing**: Use sandbox environment for development

### **Variable Naming Rules**

```text
✅ Good: _customerId, _accountBalance, _orderStatus
❌ Bad: customerId, account-balance, order status
```

***

## **Quick Reference**

### **Common Variable Examples**

```json
{
  "data": [
    {
      "variables": [
        {"name": "_customerId", "value": "CUST-123", "display": true, "displayName": "Customer ID"},
        {"name": "_accountBalance", "value": "1250.75", "display": true, "displayName": "Balance", "dataType": "currency"},
        {"name": "_membershipLevel", "value": "Gold", "ivr": true, "display": true, "displayName": "Membership"},
        {"name": "_lastContactDate", "value": "2024-07-10", "display": true, "displayName": "Last Contact", "dataType": "date"},
        {"name": "_accountPin", "value": "1234", "privacy": true, "ivr": true}
      ]
    }
  ]
}
```

### **Test Variable Node Integration**

1. Set variables via API with `"ivr": true`
2. In IVR script, add **Test Variable** node
3. Select your custom variable (e.g., `_customerTier`)
4. Set test condition (equals, greater than, etc.)
5. Connect True/False exits to appropriate routing logic

***

## **Support Resources**

- **8x8 Developer Portal**: <https://developer.8x8.com>
- **Support Center**: <https://support.8x8.com>
- **Status Page**: <https://status.8x8.com>
- **Platform URL Guide**: <https://support.8x8.com/cloud-contact-center/8x8-contact-center/platform-cluster-url>
