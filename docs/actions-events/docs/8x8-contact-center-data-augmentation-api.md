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
https://{cluster}.8x8.com/api/v1/interaction/data
```

| Region        | Cluster  | Example URL                                        |
| ------------- | -------- | -------------------------------------------------- |
| North America | vcc-na12 | <https://vcc-na12.8x8.com/api/v1/interaction/data> |
| Europe        | vcc-eu1  | <https://vcc-eu1.8x8.com/api/v1/interaction/data>  |
| Sandbox       | vcc-sb1  | <https://vcc-sb1.8x8.com/api/v1/interaction/data>  |

***

## **API Endpoints**

### **Set Interaction Variables**

**POST** `/api/v1/interaction/data/{identifier}`

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

#### **Success Response (200 OK)**

```json
{
  "status": "success",
  "message": "Variables successfully set",
  "interactionId": "int-1628bb9dbf7-ABC123",
  "variablesSet": 3
}
```

### **Get Interaction Data**

**GET** `/api/v1/interaction/data/{identifier}`

Retrieve all context data and variables for a specific interaction.

#### **Success Response (200 OK)**

```json
{
  "interactionId": "int-1628bb9dbf7-ABC123",
  "channel": "18005551234",
  "createTime": "2024-01-15T10:30:00Z",
  "ani": "16175551234",
  "callerName": "John Doe",
  "variables": [
    {
      "name": "_customerId",
      "value": "CUST-123456",
      "display": true,
      "displayName": "Customer ID"
    }
  ]
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
  'https://vcc-na12.8x8.com/api/v1/interaction/data/int-123456' \
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
  'https://vcc-na12.8x8.com/api/v1/interaction/data/int-987654' \
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

| Code | Description  | Example Response                                                                                   |
| ---- | ------------ | -------------------------------------------------------------------------------------------------- |
| 400  | Bad Request  | `{"status": "error", "code": 400, "message": "Invalid variable name: must start with underscore"}` |
| 401  | Unauthorized | `{"status": "error", "code": 401, "message": "Authentication failed"}`                             |
| 404  | Not Found    | `{"status": "error", "code": 404, "message": "Interaction not found"}`                             |
| 429  | Rate Limited | `{"status": "error", "code": 429, "message": "Rate limit exceeded"}`                               |
| 500  | Server Error | `{"status": "error", "code": 500, "message": "Internal server error"}`                             |

***

## **API Limits**

| Limit                 | Value           |
| --------------------- | --------------- |
| Requests per minute   | 100 per tenant  |
| Variables per request | 50              |
| Variable name length  | 25 characters   |
| Variable value length | 1000 characters |
| Display name length   | 30 characters   |

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
- **Error Handling**: Implement retry logic for 429/500 errors
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
