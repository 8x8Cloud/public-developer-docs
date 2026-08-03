---
sidebar_label: 'Getting Started'
---

# Getting Started with LINE over the 8x8 API

This guide takes a developer who has been handed working credentials from nothing to a first LINE message accepted by the platform. It starts with what both LINE products share, authentication and the regional base URLs, then splits: one section for the two-way **LINE Official Account (LOA)** channel, and one for the one-way **LINE Official Notification (LON)** product. They use different endpoints and address recipients differently, so read the section for the product you are integrating.

If you are still waiting on an Official Account, see [Account Provisioning and Onboarding](./account-provisioning-onboarding.md) instead.

## Prerequisites & Checklist

Before you begin, ensure you have the following:

- **An 8x8 account with Messaging Apps enabled.** Contact your account manager to confirm the product is enabled on your account. Sign up at [connect.8x8.com](https://connect.8x8.com) if you do not have an account yet.
- **A LINE sub-account.** LINE requires a **new sub-account ID**. It cannot be an existing SMS sub-account.
- **An API key** generated in the 8x8 Connect portal, scoped to that sub-account.
- **A LINE Official Account linked to the sub-account.** 8x8 configures the channel for you. See [Connecting Your OA to 8x8](./account-provisioning-onboarding.md#connecting-your-oa-to-8x8).
- **A registered webhook.** On the LOA channel you cannot obtain a recipient's `channelUserId` without one, so this is a hard prerequisite rather than a later step. See [Configuring Your Webhook](./loa-webhook.md#configuring-your-webhook).
- **A separate sub-account per product.** LOA and LON have different sending behaviour, so set up each in a different 8x8 sub-account.

## Authentication

The 8x8 Messaging Apps API accepts an **ApiKey Bearer Token** authentication method. Generate tokens from your customer portal at [https://connect.8x8.com/](https://connect.8x8.com/), then include the following header in every request:

```http
Authorization: Bearer {apiKey}
```

Replace `{apiKey}` with the key generated from the customer portal.

> **Important:** The LINE Official Account sub-account token and the LINE Official Notification sub-account token are **separate**. A key that authorises a send on one will not authorise a send on the other.

## Base URLs

Use the base URL that matches the platform region your account is provisioned in. Sending to the wrong region will not reach your sub-account. Both LOA and LON use these same base URLs.

| API Region | Base URL |
| :--- | :--- |
| Asia (default) | `https://chatapps.8x8.com` |
| Europe | `https://chatapps.8x8.uk` |
| North America | `https://chatapps.us.8x8.com` |
| Indonesia | `https://chatapps.8x8.id` |

For more information on platform regions, see [Platform Deployment Regions](/connect/docs/platform-deployment-regions#api-endpoints-and-platform-region).

## Sending on LINE Official Account (LOA)

This is the two-way `line` channel. It carries Text, Image, Video, Audio, and Location messages, and it addresses recipients by their LINE user ID.

### The Send Endpoint

One endpoint sends every LINE Official Account message type. The `type` field selects the content type, and only the `content` object changes with it.

**Endpoint:**

```json
POST https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages
```

**Path Parameters:**

- `{subAccountId}`: The sub-account that owns your LINE channel. 3 to 50 characters, restricted to letters, digits, and the characters `-`, `.`, `_`, and `&`.

The `user`, `type`, and `content` properties are required in the request body.

### Getting the channelUserId First

You cannot send a LINE message to a phone number, and you cannot look a LINE user up. The identifier you need is issued by LINE and reaches you only through an inbound event.

1. A LINE user adds your LINE Official Account as a friend, or sends it a message.
2. LINE notifies 8x8, and 8x8 forwards an inbound message webhook to your registered callback URL.
3. Read the LINE user ID from `payload.user.channelUserId` in that webhook.
4. Store it. That value is what you put in `user.channelUserId` when you send.

The format is `U[0-9a-f]{32}`: the letter `U` followed by exactly 32 lowercase hexadecimal characters. The same person has a **different** user ID under a different LINE provider, so an ID obtained through another integration is not usable in yours.

> **Key Takeaway:** Until a user has interacted with your Official Account, you have no way to address them on the `line` channel. Design your onboarding around capturing `channelUserId` on first contact. See [Identifying a LINE Recipient](./loa-messaging.md#identifying-a-line-recipient).

### Send Your First Message

The minimum viable LINE send is a text message to one user.

**Sample JSON Payload:**

```json
{
  "user": {
    "channelUserId": "U3d3edab4f36c6292e6d8a8131f141b8b"
  },
  "type": "Text",
  "content": {
    "text": "Hello from 8x8 Messaging API"
  },
  "clientMessageId": "<YOUR_MESSAGE_ID>"
}
```

**Key Fields:**

- `user.channelUserId` (required): The LINE user ID of the recipient. Use this instead of `msisdn` when sending to a LINE user on the LINE Official Account channel.
- `type` (required): The content type. Written in Title Case in every 8x8 LINE example: `Text`, `Image`, `Video`, `Audio`, `Location`.
- `content.text` (required for `Text`): The message body.
- `clientMessageId` (optional): Your own unique reference for the message, maximum 50 characters. It is echoed back in the send response and in delivery receipts.

> **Note**
>
> LINE counts a text message in UTF-16 code units, with a maximum of 5,000 characters, and emoji count as more than one character. Per-type payloads and their full constraints are in [LINE Official Account: Behaviour, Messages, and Constraints](./loa-messaging.md).

### The Response

A successful send returns `200` with the message identifier and its initial status.

**Response:**

```json
{
  "umid": "<UNIQUE_MESSAGE_ID>",
  "user": {
    "channelUserId": "U3d3edab4f36c6292e6d8a8131f141b8b"
  },
  "clientMessageId": "<YOUR_MESSAGE_ID>",
  "status": {
    "state": "queued",
    "timestamp": "2026-07-29T08:19:45.99Z"
  }
}
```

**Key Fields:**

- `umid`: The unique message ID (a GUID) generated by the 8x8 platform on submission. It is the platform's identifier for this message, so persist it against your own record.
- `user.channelUserId`: Echoes the recipient you submitted.
- `status.state`: `queued` on a successful submission, meaning the request was accepted and queued for processing. It is not a delivery confirmation.
- `status.timestamp`: UTC, ISO 8601.
- `clientMessageId`: Your own reference, echoed back.

> **Important:** The `line` channel reports **Accepted** and **Sent** delivery statuses but does not report **Delivered** or **Read**. After this synchronous response, delivery receipts will arrive at your callback URL as the message progresses. See [Delivery Receipts](./loa-webhook.md#delivery-receipts).

<!-- SOURCE NOTE: this response section is grounded in the OpenAPI contract for POST /messages, not in captured traffic (the internal Postman collection has no saved example responses for any LINE request). The request/response field-name mismatch flagged in the previous pass is resolved: both the request and the response use user.channelUserId, per product owner confirmation on 2026-07-29. -->

#### Error responses

Failures at submission time come back synchronously with an error body:

| HTTP status | Meaning | Example body |
|---|---|---|
| `400` | Bad request. A parameter is missing or invalid | `{"code": 1002, "message": "Invalid MSISDN format (not E.164 international number)", "errorId": "...", "timestamp": "..."}` |
| `401` | The request was not authenticated | `{"code": 1200, "message": "Request was not authenticated properly", "errorId": "...", "timestamp": "..."}` |
| `500` | Internal server error | `{"code": 2000, "message": "Internal server error", "errorId": "...", "timestamp": "..."}` |

Failures after acceptance arrive asynchronously as delivery receipts with a failing `status.state`. See [Delivery Receipts](./loa-webhook.md#delivery-receipts).

### Optional Request Options

These properties are available on the LOA send request in addition to the required three.

- `scheduled`: An ISO 8601 date-time at which delivery of the message should happen.
- `expiry`: An ISO 8601 date-time after which the message should be discarded if it has not been delivered.
- `dlrCallbackUrl`: A URI that overrides your account's default delivery receipt callback URL, for this message only. Use it to route delivery receipts for a specific message to a separate handler.
- `clientMessageId`: Your own reference, maximum 50 characters.
- `channels`: A channel fallback override array. Each entry takes:
  - `channel` (required): One of `SMS`, `WhatsApp`, `Facebook`, `RCS`, `Viber`, `Line`, `WeChat`, `Zalo`, `Instagram`. Note the capital `L` in `Line` here, which differs from the `line` channel type value used in inbound webhooks.
  - `fallbackAfter`: Seconds to wait before moving to the next channel. Minimum 10, maximum 86400 (one day).
  - `successStatus`: One of `Accepted`, `Sent`, `Delivered`, `Read`. This is the status that counts as success on a fallback target, so set it only to a status the target channel actually reports. The `line` channel reports `Accepted` and `Sent`, so set `successStatus` to one of those values when `Line` is a fallback target.

> **Note:** The fallback chain configured by 8x8 can use the Accepted or Sent status to evaluate whether to proceed to the next channel.

> **Important:** The fallback chain for your account is normally configured by the 8x8 team, including which channels are used, in what order, and the delay between them. Use `channels` only to override that configuration for a specific message.

> **Note**
>
> The `/messages` endpoint is shared across every Messaging Apps channel, so its schema carries `content.interactive`, `content.template`, `content.richCard`, and `content.carousel`. **None of these are supported on the `line` channel.** Do not treat the shared schema as the LINE surface. The supported set is listed in [Supported Types at a Glance](./loa-messaging.md#supported-types-at-a-glance).

## Sending on LINE Official Notification (LON)

LON is a separate product, not a message type on the `line` channel. It is strictly one-way, every message populates a template that LINE has pre-approved, and the recipient is a phone number rather than a LINE user ID. It also has its own sub-account and its own bearer token.

**Endpoint:**

```json
POST https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/lon
```

**Path Parameters:**

- `{subAccountId}`: The sub-account provisioned for LINE Official Notification. This is **not** the same sub-account as your LINE Official Account channel.

The `user` and `content` properties are required in the request body.

**Sample JSON Payload:**

```json
{
  "user": {
    "msisdn": "+15551234567"
  },
  "clientMessageId": "<YOUR_MESSAGE_ID>",
  "content": {
    "title": "Event reminder",
    "company": "8x8",
    "icon": "calendarCheck",
    "greeting": "Can't wait to see you there!",
    "explanation": "Registration opens at 09:00. See you soon."
  }
}
```

**Key Fields:**

- `user.msisdn` (required): The recipient's mobile number. International E.164 format with a leading `+` is preferred.
- `content.title`: The message title.
- `content.company`: The company name shown on the notification.
- `content.icon`: The icon displayed on the notification, one of 38 documented values.
- `content.greeting`: The greeting line.
- `content.explanation`: The explanatory body text.

That example is trimmed. The full content schema also carries an emphasised field, a label-and-value list, action buttons, and an `smsFallback` object. For every property, the complete 38-value icon enumeration, the 500-character template limit, and the response shape, see [LINE Official Notification (LON)](./official-notification-lon.md).

> **Important:** You cannot compose freeform LON content at send time. Your template must be approved by LINE first, and templates are submitted through 8x8. See [Template Approval](./official-notification-lon.md#template-approval).

## Next Steps

**For Developers:**

- [LINE Official Account: Behaviour, Messages, and Constraints](./loa-messaging.md) - How the channel addresses a recipient, a complete request body for each of the five supported types, and LINE's real limits
- [LINE Official Account Webhooks](./loa-webhook.md) - Inbound messages, retry behaviour, and synchronous errors
- [LINE Official Notification (LON)](./official-notification-lon.md) - The full one-way content schema, icon set, and character limits
- [LON Delivery Receipts](./lon-webhook.md) - The only LINE delivery receipt on the platform, and what it reports

**Important Concepts:**

- [Identifying a LINE Recipient](./loa-messaging.md#identifying-a-line-recipient) - Why `channelUserId` and not `msisdn`
- [Delivery Receipts](./loa-webhook.md#delivery-receipts) - What statuses the `line` channel reports and what it does not

**API Reference:**

- [Send Message](/connect/reference/send-message) - The generated reference for `POST /api/v1/subaccounts/{subAccountId}/messages`
- [Send LON Message](/connect/reference/send-lon-message) - The generated reference for `POST /api/v1/subaccounts/{subAccountId}/lon`
- [Getting started with Messaging API](/connect/docs/messaging-apps-api-get-started) - Cross-channel authentication and server regions
