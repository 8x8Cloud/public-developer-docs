---
slug: /connect/docs/viber/sending-viber-messages-api
sidebar_label: 'API Reference'
---

# Sending Viber Messages over API

API reference for sending Viber messages through the 8x8 Messaging Apps API. This page covers the endpoint, request envelope, response format, validation, error codes, and rate limits. For promotional message payloads with screenshots, see the [Promotional Message API Library](/connect/docs/viber/message-types). For template create and send payloads, see the [Transactional Message API Library](/connect/docs/viber/templates). For a quick-start guide with curl examples, see [Getting Started](/connect/docs/viber/getting-started).

> 🚧 **Availability**
>
> Template creation and template send are rolling out. Listing and deleting templates are not yet available. Contact your account manager to confirm availability on your account before you build against this page.

---

## Endpoint

All Viber sends use the same messages endpoint, whether free-form or template:

**Endpoint:**

```http
POST https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages
Authorization: Bearer {apiKey}
Content-Type: application/json
```

**Path Parameters:**

- `{subAccountId}`: Your messaging subaccount ID. Must be a dedicated messaging subaccount, not an existing SMS subaccount

Replace the base URL if your account is provisioned in a different platform region. Sending to the wrong region fails authentication.

| Platform region | Base URL |
| :--- | :--- |
| Asia (default) | `https://chatapps.8x8.com` |
| Europe | `https://chatapps.8x8.uk` |
| North America | `https://chatapps.us.8x8.com` |
| Indonesia | `https://chatapps.8x8.id` |

For more detail, see [Platform Deployment Regions](/connect/docs/platform-deployment-regions#api-endpoints-and-platform-region).

---

## Request Structure

Every send request shares the same outer envelope. The `content` object changes by message type; the outer fields stay the same.

```json
{
  "user": {
    "msisdn": "<RECIPIENT_PHONE>"
  },
  "type": "<MESSAGE_TYPE>",
  "content": {
  },
  "channels": [
    { "channel": "Viber", "channelId": "<CHANNEL_ID>" }
  ]
}
```

**Key Fields:**

- `user.msisdn`: Recipient phone number in E.164 format, for example `"+6512345678"`
- `type`: The message type. Confirmed values: `"text"` for free-form text, `"template"` for template sends
- `content`: Message body. Structure varies by `type`; see the [Promotional Message API Library](/connect/docs/viber/message-types) and [Transactional Message API Library](/connect/docs/viber/templates)
- `channels`: Array identifying the Viber channel. Required for template sends. The confirmed free-form text example does not include it; it may be optional when the subaccount maps to a single channel

**Response:**

A successful send returns:

```json
{
  "state": "queued"
}
```

The message enters the delivery pipeline. Track its progress through [Webhooks and Delivery Receipts](/connect/docs/viber/webhooks-delivery-receipts).

---

## Template Management API

### Create a Template

Template creation uses the shared Messaging Apps templates endpoint. The channel type is derived from `{channelId}`, so the same path serves WhatsApp and Viber.

**Endpoint:**

```http
POST https://chatapps.8x8.com/api/v1/accounts/{accountId}/channels/{channelId}/templates
Authorization: Bearer {apiKey}
Content-Type: application/json
```

**Path Parameters:**

- `{accountId}`: Your 8x8 account ID
- `{channelId}`: The Viber channel to register the template against

For the full request body and example payloads, see the [Transactional Message API Library](/connect/docs/viber/templates).

**Response Codes:**

`200 OK` with an empty body. The template is stored with status `Pending` and enters Viber's moderation queue.

| Status | Cause |
| :--- | :--- |
| `200` | Accepted and queued for moderation |
| `400` | Validation failure, including an invalid template name or a body that breaks the structural rules |
| `409` | A template with this name and language already exists on the channel |
| `401` / `403` | Missing or insufficient credentials. Creation requires an admin role |
| `500` | Unexpected error. The template is not stored |

> 📘
>
> A `200` means Viber accepted the submission, not that the template is usable. Wait for the approval event before sending. See [Template Status Events](#template-status-events).

### Template Status Events

Viber moderates within 24 hours and notifies 8x8, which forwards the result to your webhook. You do not poll.

The event carries the template **name** you chose, not Viber's internal identifier.

| Result | Template status becomes |
| :--- | :--- |
| Created and queued | `Pending` |
| Approved | `Approved` |
| Rejected | `Declined` |

A `Declined` template cannot be sent. Correct the wording, then create a replacement. See [Templates Cannot Be Edited](/connect/docs/viber/templates#templates-cannot-be-edited).

For the webhook payload shape and configuration, see [Webhooks and Delivery Receipts](/connect/docs/viber/webhooks-delivery-receipts).

---

## Validation Before Send

8x8 checks the request against the stored template before calling Viber. These failures come back immediately as a synchronous error rather than as a Viber error code in a delivery receipt:

- The template name does not resolve on this channel
- The template is not `Approved`
- The template has been deleted
- Supplied parameters do not match the template's declared placeholders
- An `OTP` template was sent without a `pin` value

---

## Error Codes

Template-related failures that pass 8x8 validation but fail at Viber surface in your delivery receipt using 8x8 error codes. The Viber code each one maps to is shown for reference when comparing against Viber's own documentation.

| 8x8 Code | Reason | Meaning | Viber Code |
| :--- | :--- | :--- | :--- |
| `2020` | Template ID not found | The template does not exist, was deleted, or does not belong to this service | `38` |
| `2021` | Template validation failed | Supplied parameters did not pass Viber's validation | `39` |
| `2006` | Timeout | Viber server timeout. Viber also returns this when an OTP template is sent without a `pin` value | `7` |

> 🚧
>
> Code `2006` has two meanings. A genuine timeout and a missing OTP `pin` produce the same code. 8x8 rejects a missing `pin` before the send to avoid this ambiguity, but a Viber-side timeout still surfaces as `2006`.

Any non-success response from Viber triggers SMS fallback if you configured it, regardless of which code came back. The fallback body is `content.fallbackText`.

> 📘 **Error Code Reference**
>
> For the complete list of all Viber error codes and their meanings, see [Delivery Error Codes](/connect/docs/delivery-error-codes#viber-error-codes).

---

## Rate Limits

| Operation | Limit |
| :--- | :--- |
| Create template | 50 per second |
| Approval time | Up to 24 hours |
| Templates per Viber Service ID | 2,000, counting every status |

---

## Not Yet Available

| Operation | Status |
| :--- | :--- |
| List templates | In development. Until then, track your registered names and their statuses on your side |
| Delete a template | In development. Deleting at Viber is permanent |
| Retrieve a single template | Not planned as a public endpoint |
| Update a template | Not possible. Viber templates are immutable. See [Templates Cannot Be Edited](/connect/docs/viber/templates#templates-cannot-be-edited) |

---

## Next Steps

| If you want to | Read |
| :--- | :--- |
| Send your first message with working curl examples | [Getting Started](/connect/docs/viber/getting-started) |
| See all promotional message formats with screenshots and payloads | [Promotional Message API Library](/connect/docs/viber/message-types) |
| See template create and send payloads | [Transactional Message API Library](/connect/docs/viber/templates) |
| Handle delivery receipts and inbound messages | [Webhooks and Delivery Receipts](/connect/docs/viber/webhooks-delivery-receipts) |
| Look up a specific error code | [Delivery Error Codes](/connect/docs/delivery-error-codes#viber-error-codes) |
| Understand how traffic is rated | [Billing](/connect/docs/viber/billing) |
