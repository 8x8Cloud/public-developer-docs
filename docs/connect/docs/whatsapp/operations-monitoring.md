---
sidebar_label: 'Operations & Monitoring'
---

# Operations, Monitoring & Troubleshooting

This section covers the tools and data you need to monitor your 8x8 WhatsApp solution, diagnose issues, and understand operational costs. Effective monitoring involves a combination of 8x8 Connect portal analytics, API error handling, and processing real-time webhooks.

## Analytics & Monitoring in 8x8 Connect

The 8x8 Connect portal provides a visual dashboard for monitoring your message activity.

### 1. Dashboard

The **Dashboard** provides a high-level, filterable view of your key metrics, including:

- **Message Delivered vs. Undelivered:** Track successful and failed messages.

- **Delivery Rate:** Monitor your overall delivery percentage.

- **Received Messages:** See the volume of inbound messages from users.

- **WhatsApp Conversations:** View a breakdown of conversations by Meta's categories (Authentication, Utility, Service, Marketing).

### 2. Reports

The **Reports** tab provides a detailed, exportable breakdown of your WhatsApp conversation usage and costs, filterable by subaccount, channel, and date range.

### 3. Logs

The **Logs** tab provides a real-time, message-by-message list of all inbound and outbound messages. This is your primary tool for investigating a specific message failure. You can filter by:

- Subaccount

- Channel (WhatsApp)

- Direction (Inbound/Outbound)

- Status (e.g., `Delivered`, `Read`, `Undelivered`, `Rejected`)

- Country

- UMID (the 8x8 Unique Message ID)

## Troubleshooting: API Errors (Synchronous)

Synchronous errors are returned immediately in the API response to your `POST` request. They indicate that your request itself was invalid and was never sent to WhatsApp.

**Example Error Response (`400 Bad Request`):**

```json
{
    "code": 1005,
    "message": "Invalid parameter(s): 'user.msisdn'",
    "errorId": "a1b2c3d4-...",
    "timestamp": "2025-11-10T10:30:00Z"
}
```

|8x8 Code|8x8 Reason|How to Fix|
|---|---|---|
|`1002`|Invalid MSISDN|The `user.msisdn` value is missing, incorrectly formatted, or does not include the country code.|
|`1005`|Invalid Parameter|A required field is missing (like `content.template`) or a field is misspelled. Check the `message` for details.|
|`1200`|Unauthorized Access|Your `Authorization: Bearer` header is missing or your API key is incorrect.|
|`3038`|Template not found|The `name` or `language` in your send payload does not match any approved template.|
|`3040`|Empty template parameters|You sent a template that requires parameters (e.g., `{{1}}`), but you did not include a `parameters` array in your `components` object.|
|`3041`|Invalid Template parameter|You provided the wrong number of parameters (e.g., the template expected 2, you sent 1).|

## Troubleshooting: Delivery Events (Asynchronous Webhooks)

Asynchronous errors occur *after* you have successfully submitted your message (i.e., you received a `200 OK` response). These errors indicate that Meta or the carrier could not deliver your message to the end-user.

You are notified of these failures via the **`outbound_message_status_changed`** webhook.

### Asynchronous Error Webhook Payload

When a message fails, you will receive a webhook with `state: "undelivered"`. The `errorCode` and `errorMessage` fields provide the reason.

```json
{
  "namespace": "ChatApps",
  "eventType": "outbound_message_status_changed",
  "description": "ChatApps outbound message delivery receipt",
  "payload": {
    "umid": "<UNIQUE_MESSAGE_ID>",
    "subAccountId": "<SUBACCOUNT_ID>",
    "channel": "whatsapp",
    "user": { ... },
    "status": {
      "state": "undelivered",
      "detail": "rejected_by_operator",
      "timestamp": "2025-11-10T10:30:05Z",
      "errorCode": 1022,
      "errorMessage": "Message window expired"
    }
  }
}
```

### WhatsApp Error Codes

When a message fails to deliver, you'll receive an `errorCode` and `errorMessage` in the webhook payload. To understand what each error code means and how to resolve it, see the complete reference:

> 📘 **Error Code Reference**
>
> For the complete list of all WhatsApp error codes, including Meta error code mappings, descriptions, and troubleshooting guidance, see the [Messaging Apps Delivery Error Codes](/connect/docs/delivery-error-codes#whatsapp-error-codes) reference.

## Operational Webhooks (Non-Error)

In addition to delivery receipts, you should subscribe to these webhooks to monitor the health of your account and templates.

### 1. Template Status & Quality Updates

These webhooks alert you to changes in your templates, such as rejection, approval, or a quality drop.

- **`eventType: template_status_update`**: Fires when your template is `APPROVED`, `REJECTED`, `PAUSED`, or `DISABLED`.

- **`eventType: template_quality_update`**: Fires when your template's quality score changes (e.g., from `GREEN` to `YELLOW`).

- **`eventType: template_category_update`**: Fires if Meta automatically changes your template's category (e.g., from `UTILITY` to `MARKETING`).

**Sample Payload (Template Rejected):**

```json
{
  "eventId": "0f88f5c4-...",
  "timestamp": "2025-01-01T00:00:00.00Z",
  "provider": "WhatsApp",
  "eventType": "template_status_update",
  "eventDetails": {
    "templateName": "<YOUR_TEMPLATE_NAME>",
    "templateLanguage": "en_US",
    "meta": {
      "status": "REJECTED",
      "reason": "INCORRECT_CATEGORY"
    }
  }
}
```

### 2. Phone Number Quality & Limit Updates

This webhook alerts you to changes in your portfolio's messaging limit (e.g., an upgrade from TIER_1K to TIER_10K) or a change in your number's quality rating.

- **`eventType: phone_number_quality_update`**

**Sample Payload (Messaging Limit Upgrade):**

```json
{
  "eventId": "0f88f5c4-...",
  "timestamp": "2025-01-01T00:00:00.00Z",
  "provider": "WhatsApp",
  "eventType": "phone_number_quality_update",
  "eventDetails": {
    "displayPhoneNumber": "15550783881",
    "meta": {
      "event": "UPGRADE",
      "currentLimit": "TIER_10K",
      "oldLimit": "TIER_1K"
    }
  }
}
```

## WhatsApp Pricing Model (PMP)

WhatsApp Business pricing is based on a **Per-Message Pricing (PMP)** model. Charges are applied when a **template message** is delivered.

### Pricing Model and Chargeable Events

- **Per-Message Pricing (PMP):** As of July 1, 2025, charges apply only when a template message (type: "template") is delivered.

- **Rate Drivers:** Charges vary by two factors:

    1. The template's **category** (`marketing`, `utility`, `authentication`).

    2. The recipient's WhatsApp phone number **country calling code**.

- **Volume Tiers:** Volume discounts are available for `utility` and `authentication` categories. As your monthly message volume increases, you move into higher tiers with lower per-message rates.
  