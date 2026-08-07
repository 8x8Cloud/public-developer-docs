# Viber Templates Management

Viber message templates allow you to create pre-approved message formats for sending transactional messages and OTPs to your customers via Viber. Templates support dynamic parameters that can be substituted at send time.

> 📘 **Admin Role Required**
>
> Creating Viber templates requires an admin role on the account.

## Template Categories

Viber templates currently support two categories:

| Category | Description |
| --- | --- |
| **Transactional** | For sending transactional messages such as order confirmations, shipping updates, and appointment reminders. |
| **OTP** | For sending one-time passwords and verification codes. |

## Creating a Template via API

To create a Viber template, send a `POST` request to the following endpoint:

```http
POST /api/v1/accounts/{accountId}/channels/{viberChannelId}/templates
```

### Path Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `accountId` | string | Yes | Your account ID. |
| `viberChannelId` | string | Yes | The Viber channel ID to associate the template with. |

### Request Body

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | Yes | A unique name for the template. Use lowercase letters, numbers, and underscores only. |
| `category` | string | Yes | Template category. Supported values: `Transactional`, `OTP`. |
| `language` | string | Yes | Language code for the template (e.g., `en` for English, `id` for Indonesian). |
| `text` | string | Yes | The template message text. Use `{{parameter_name}}` syntax for dynamic parameters. |
| `params` | array | Yes | List of parameter definitions used in the template text. |
| `params[].name` | string | Yes | The parameter name, matching the placeholder in the template text. |
| `params[].type` | string | Yes | The parameter type. Currently only `TEXT` is supported. |
| `varExample` | array | Yes | Example values for each parameter, used during the template review process. |
| `varExample[].name` | string | Yes | The parameter name, matching a `params` entry. |
| `varExample[].example` | string | Yes | An example value for the parameter. |

### Authentication

Include your API key in the request header:

```http
Authorization: Bearer {your_api_key}
```

## Examples

### Transactional Template

This example creates an order confirmation template with three dynamic parameters:

```bash
curl -X POST \
  'https://connect.8x8.com/api/v1/accounts/{accountId}/channels/{viberChannelId}/templates' \
  -H 'Authorization: Bearer {your_api_key}' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "test_order_confirmation_001",
    "category": "Transactional",
    "language": "en",
    "text": "Hello {{customer_name}}, your order {{order_id}} has been confirmed. Estimated delivery: {{delivery_date}}. Thank you!",
    "params": [
        {
            "name": "customer_name",
            "type": "TEXT"
        },
        {
            "name": "order_id",
            "type": "TEXT"
        },
        {
            "name": "delivery_date",
            "type": "TEXT"
        }
    ],
    "varExample": [
        {
            "name": "customer_name",
            "example": "John"
        },
        {
            "name": "order_id",
            "example": "ORD-12345"
        },
        {
            "name": "delivery_date",
            "example": "2026-08-01"
        }
    ]
}'
```

**Request body breakdown:**

| Field | Value | Description |
| --- | --- | --- |
| `name` | `test_order_confirmation_001` | Unique template identifier |
| `category` | `Transactional` | Transactional message category |
| `language` | `en` | English language |
| `text` | `Hello {{customer_name}}, your order...` | Template text with three placeholders |
| `params` | 3 parameters | `customer_name`, `order_id`, `delivery_date` — all of type `TEXT` |
| `varExample` | 3 examples | Sample values for each parameter |

### OTP Template

This example creates a simple OTP verification template:

```bash
curl -X POST \
  'https://connect.8x8.com/api/v1/accounts/{accountId}/channels/{viberChannelId}/templates' \
  -H 'Authorization: Bearer {your_api_key}' \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "otp_login_en",
    "category": "OTP",
    "language": "en",
    "text": "Your verification code is {{pin}}. Valid for 5 minutes. Team 8x8",
    "params": [
        {
            "name": "pin",
            "type": "TEXT"
        }
    ],
    "varExample": [
        {
            "name": "pin",
            "example": "123456"
        }
    ]
}'
```

## Template Parameters

Parameters allow you to insert dynamic content into your template messages at send time. Each parameter in the template text must:

1. Be wrapped in double curly braces: `{{parameter_name}}`
2. Have a corresponding entry in the `params` array with a `name` and `type`
3. Have a corresponding entry in the `varExample` array with a sample value

### Parameter Naming

- Use descriptive, lowercase names with underscores (e.g., `customer_name`, `order_id`)
- Parameter names in `text`, `params`, and `varExample` must match exactly

## Best Practices

- **Template names**: Use descriptive names with underscores that indicate the purpose and language (e.g., `order_confirmation_en`, `otp_login_id`)
- **Parameters**: Provide realistic example values in `varExample` to help during the review process
- **Text content**: Keep messages concise and relevant to the template category
- **Language**: Set the correct language code that matches the template text content

## API Reference

For the full API specification, see the [Add Viber Template](/connect/reference/add-viber-template) API reference.
