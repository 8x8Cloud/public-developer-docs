---
sidebar_label: 'Webhooks & Delivery Receipts'
---

# LINE Official Account Webhooks

Everything that arrives at your callback URL for the two-way LINE Official Account channel: inbound messages and delivery receipts. The `line` channel reports **Accepted** and **Sent** delivery statuses but does not report **Delivered** or **Read**. This page documents the inbound contract in full, the delivery receipt contract, and the webhook mechanics both LINE products share.

LINE Official Notification goes one step further and additionally reports **Delivered**. For that contract, see [LON Delivery Receipts](./lon-webhook.md).

## Delivery Receipts

The LINE Official Account channel reports two delivery statuses:

| Status | Reported on `line` |
|---|---|
| **Accepted** | Yes |
| **Sent** | Yes |
| **Delivered** | **No** |
| **Read** | **No** |

After a successful send, delivery receipts arrive at your callback URL as the message progresses through `Accepted` and `Sent`. No receipt arrives for `Delivered` or `Read`, so do not build delivery-confirmation or read-rate reporting that depends on either.

LINE Official Notification goes one step further and additionally reports `Delivered`. For that contract, see [LON Delivery Receipts](./lon-webhook.md).

Delivery receipts arrive in the **v9** delivery receipt envelope, identical to the one documented in [Delivery receipts for Outbound Messaging Apps](/connect/docs/delivery-receipts-for-outbound-chatapps).

**Sample JSON Payload:**

```json
{
  "version": 9,
  "namespace": "ChatApps",
  "eventType": "outbound_message_status_changed",
  "description": "ChatApps outbound message delivery receipt",
  "payload": {
    "umid": "<UNIQUE_MESSAGE_ID>",
    "clientMessageId": "<YOUR_MESSAGE_ID>",
    "subAccountId": "<SUBACCOUNT_ID>",
    "channel": "line",
    "user": {
      "channelUserId": "U3d3edab4f36c6292e6d8a8131f141b8b"
    },
    "status": {
      "state": "sent",
      "detail": "delivered_to_operator",
      "timestamp": "2026-07-29T08:19:47.12Z"
    }
  }
}
```

**Key Fields:**

- `version`: Equals `9` for this format.
- `eventType`: `outbound_message_status_changed` for a delivery receipt.
- `payload.umid`: The unique message ID returned by the send request. Match it to the `umid` from your send response.
- `payload.channel`: `line` for the LINE Official Account channel.
- `payload.user.channelUserId`: The LINE user ID of the recipient.
- `payload.status.state`: One of `accepted`, `sent`, `rejected`, or `undelivered`. `delivered` and `read` are not reported on this channel.
- `payload.status.detail`: Additional context for the status. See [Message status reference](/connect/reference/message-status-references).

## Configuring Your Webhook

One callback URL serves **every** Messaging Apps channel on your account. You do not register a separate URL for LINE, and you do not register a separate URL for LON.

- Register your callback using the [Webhooks Configuration API](/connect/reference/add-webhooks-1).
- Identify the source of each payload from the channel field. On inbound messages that is `payload.recipient.channel`. On delivery receipts it is `payload.channel`.
- For the LINE Official Account channel the value is `line`. For LINE Official Notification it is `LineNotification`.
- Respond with a `2XX` status. Anything else, including a timeout, triggers the retry sequence described in [Retry Behaviour](#retry-behaviour).

One callback URL carries traffic for every channel on your account. You will receive both inbound messages (with `payload.recipient.channel` of `line`) and delivery receipts (with `payload.channel` of `line`) from the LINE Official Account channel, plus delivery receipts from LON (with `payload.channel` of `LineNotification`).

If you are on Path B provisioning, remember there is a second, separate webhook configuration: the **Webhook URL** you set in LINE Official Account Manager, under **Settings** > **Messaging API**, which points LINE at 8x8. See [Configuring Your Webhook](./account-provisioning-onboarding.md#configuring-your-webhook).

## Inbound Messages

Inbound LINE messages arrive in the **v3** inbound Messaging Apps envelope. Every sample on this page uses v3. Only the LINE Official Account channel has an inbound direction; LON does not.

The envelope is identical for all six inbound types. Only `payload.type` and `payload.content` change, so each sample below repeats the same envelope with the content object that type produces.

> **Note**
>
> The currently published usage sample page for LINE, [Line usage samples](/connect/docs/usage-samples-line), shows these inbound webhooks in an **older, differently shaped envelope**: `eventType` of `inboundMessage`, `version` of `1`, flat top-level fields instead of a nested `payload` object, and `recipient.recipientId` instead of `recipient.channel` and `recipient.channelId`. This page uses the current canonical cross-channel v3 envelope documented in [Inbound Messaging Apps message](/connect/docs/inbound-chatapps-message), which every other channel's documentation also uses. **The two published artefacts disagree, and one of them is wrong.** Confirm the shape your account actually receives with a test send before writing your parser against either.

<!-- NEEDS SOURCE: N12. Envelope version discrepancy, flagged for engineering and the docs team, not resolvable from available sources. The live page docs/connect/docs/usage-samples-line.md shows LINE inbound webhooks as eventType "inboundMessage", version 1, flat top-level fields (channel, umid, subAccountId, timestamp, type, content) with no nested payload object, and recipient.recipientId in place of recipient.channel plus recipient.channelId. This doc set uses the canonical v3 envelope instead, on the assessment made in an earlier pass that the v1 shape on that one page is a stale artifact superseded by the cross-channel v3 contract. That assessment is NOT confirmed by engineering. Reconcile it one way or the other: either update usage-samples-line.md to v3, or confirm v3 is not actually live for the `line` channel specifically, in which case this page must be reverted to the v1 shape. Do not leave both shapes published. -->

### Text

**Sample JSON Payload:**

```json
{
  "version": 3,
  "namespace": "ChatApps",
  "eventType": "inbound_message_received",
  "description": "ChatApps inbound message",
  "payload": {
    "umid": "<UNIQUE_MESSAGE_ID>",
    "subAccountId": "<SUBACCOUNT_ID>",
    "timestamp": "2026-07-29T05:15:30.00Z",
    "user": {
      "channelUserId": "U3d3edab4f36c6292e6d8a8131f141b8b"
    },
    "recipient": {
      "channel": "line",
      "channelId": "<CHANNEL_ID>"
    },
    "type": "Text",
    "content": {
      "text": "Hello from LINE"
    }
  }
}
```

**Key Fields:**

- `version`: Equals `3` for this format.
- `namespace`: Equals `ChatApps` for inbound Messaging Apps messages.
- `eventType`: Equals `inbound_message_received`.
- `payload.umid`: The unique message ID for the inbound message.
- `payload.user.channelUserId`: **The LINE user ID of the sender.** This is the value you store and put back into `user.channelUserId` when you reply.
- `payload.user.msisdn`: **Absent for LINE.** The contract states that `msisdn` is left out for channels where users have no phone number, and names LINE as the example. When a `user` field has no value it is omitted from the JSON entirely, not sent as null.
- `payload.recipient.channel`: `line` for the LINE Official Account channel.
- `payload.recipient.channelId`: The identifier of the channel that received the message.
- `payload.type`: The inbound content type. For LINE: `Text`, `Image`, `Video`, `Audio`, `File`, or `Location`.
- `payload.content.text`: The text the user sent.
- `payload.timestamp`: UTC, ISO 8601.

### Image

**Sample JSON Payload:**

<details>
<summary>View JSON</summary>

```json
{
  "version": 3,
  "namespace": "ChatApps",
  "eventType": "inbound_message_received",
  "description": "ChatApps inbound message",
  "payload": {
    "umid": "<UNIQUE_MESSAGE_ID>",
    "subAccountId": "<SUBACCOUNT_ID>",
    "timestamp": "2026-07-29T05:16:10.00Z",
    "user": {
      "channelUserId": "U3d3edab4f36c6292e6d8a8131f141b8b"
    },
    "recipient": {
      "channel": "line",
      "channelId": "<CHANNEL_ID>"
    },
    "type": "Image",
    "content": {
      "url": "<PRESIGNED_MEDIA_URL>"
    }
  }
}
```

</details>

**Key Fields:**

- `payload.type`: `"Image"`.
- `payload.content.url`: The pre-signed URL of the image 8x8 has stored on your behalf. See [Inbound media URLs expire](#inbound-media-urls-expire).

### Video

**Sample JSON Payload:**

<details>
<summary>View JSON</summary>

```json
{
  "version": 3,
  "namespace": "ChatApps",
  "eventType": "inbound_message_received",
  "description": "ChatApps inbound message",
  "payload": {
    "umid": "<UNIQUE_MESSAGE_ID>",
    "subAccountId": "<SUBACCOUNT_ID>",
    "timestamp": "2026-07-29T05:16:40.63Z",
    "user": {
      "channelUserId": "U3d3edab4f36c6292e6d8a8131f141b8b"
    },
    "recipient": {
      "channel": "line",
      "channelId": "<CHANNEL_ID>"
    },
    "type": "Video",
    "content": {
      "url": "<PRESIGNED_MEDIA_URL>"
    }
  }
}
```

</details>

**Key Fields:**

- `payload.type`: `"Video"`.
- `payload.content.url`: The pre-signed URL of the video file. No duration, file size, or thumbnail is included on the inbound side.

### Audio

**Sample JSON Payload:**

<details>
<summary>View JSON</summary>

```json
{
  "version": 3,
  "namespace": "ChatApps",
  "eventType": "inbound_message_received",
  "description": "ChatApps inbound message",
  "payload": {
    "umid": "<UNIQUE_MESSAGE_ID>",
    "subAccountId": "<SUBACCOUNT_ID>",
    "timestamp": "2026-07-29T05:17:10.00Z",
    "user": {
      "channelUserId": "U3d3edab4f36c6292e6d8a8131f141b8b"
    },
    "recipient": {
      "channel": "line",
      "channelId": "<CHANNEL_ID>"
    },
    "type": "Audio",
    "content": {
      "url": "<PRESIGNED_MEDIA_URL>"
    }
  }
}
```

</details>

**Key Fields:**

- `payload.type`: `"Audio"`.
- `payload.content.url`: The pre-signed URL of the audio file. The `audio.duration` property that an outbound audio send requires has no inbound counterpart.

### File

**Sample JSON Payload:**

<details>
<summary>View JSON</summary>

```json
{
  "version": 3,
  "namespace": "ChatApps",
  "eventType": "inbound_message_received",
  "description": "ChatApps inbound message",
  "payload": {
    "umid": "<UNIQUE_MESSAGE_ID>",
    "subAccountId": "<SUBACCOUNT_ID>",
    "timestamp": "2026-07-29T05:17:30.00Z",
    "user": {
      "channelUserId": "U3d3edab4f36c6292e6d8a8131f141b8b"
    },
    "recipient": {
      "channel": "line",
      "channelId": "<CHANNEL_ID>"
    },
    "type": "File",
    "content": {
      "url": "<PRESIGNED_MEDIA_URL>"
    }
  }
}
```

</details>

**Key Fields:**

- `payload.type`: `"File"`.
- `payload.content.url`: The pre-signed URL of the file.

> **Important:** `File` is **inbound only** on this channel. A LINE user can send your Official Account a file and you will receive it, but there is no outbound `File` type, so you cannot send one back. See [Supported Types at a Glance](./loa-messaging.md#supported-types-at-a-glance).

### Location

**Sample JSON Payload:**

<details>
<summary>View JSON</summary>

```json
{
  "version": 3,
  "namespace": "ChatApps",
  "eventType": "inbound_message_received",
  "description": "ChatApps inbound message",
  "payload": {
    "umid": "<UNIQUE_MESSAGE_ID>",
    "subAccountId": "<SUBACCOUNT_ID>",
    "timestamp": "2026-07-29T05:17:55.35Z",
    "user": {
      "channelUserId": "U3d3edab4f36c6292e6d8a8131f141b8b"
    },
    "recipient": {
      "channel": "line",
      "channelId": "<CHANNEL_ID>"
    },
    "type": "Location",
    "content": {
      "location": {
        "longitude": 103.846375,
        "latitude": 1.289563,
        "name": "Clarke Quay Riverside",
        "address": "Clarke Quay, 179019"
      }
    }
  }
}
```

</details>

**Key Fields:**

- `payload.type`: `"Location"`.
- `payload.content.location.latitude`: Latitude, as a number.
- `payload.content.location.longitude`: Longitude, as a number.
- `payload.content.location.name`: The name or title of the location, as the user's LINE client sent it.
- `payload.content.location.address`: The street address of the location.

### Inbound media URLs expire

> **Important:** Inbound media does not arrive as the sender's original URL. 8x8 hosts the file and gives you a **pre-signed URL that expires after 24 hours**. This applies to `Image`, `Video`, `Audio`, and `File`. Download and persist the file when the webhook arrives if you need it beyond that window, and do not store the URL as though it were permanent.

### No LINE display name in the payload

> **Note**
>
> `payload.user.name` and `payload.user.username` exist in the v3 contract but are WhatsApp profile fields. Do not expect a LINE display name in the inbound payload. `payload.user.channelUserId` is the only identity the inbound webhook carries for a LINE sender.

For the complete field-by-field envelope description, including the `interactive` content sub-objects used by other channels, see [Inbound Messaging Apps message](/connect/docs/inbound-chatapps-message).

## Retry Behaviour

If 8x8 cannot deliver a webhook to your callback URL, it retries.

- **Triggers:** a connection error, a timeout, or an HTTP response code in the `4XX` or `5XX` range.
- **Intervals:** progressive retries at **1, 10, 30, and 90 seconds**.

What this covers differs by product, because the two products produce different webhooks:

- **On the LINE Official Account channel, retry behaviour applies to both inbound message webhooks and delivery receipts.**
- **On LINE Official Notification, it only ever concerns delivery receipts.** LON has no inbound direction.

Design your handler to be idempotent on `umid`, because a retry can result in the same message being delivered to you more than once.

## Per-Message Callback Override

Both LINE endpoints accept a `dlrCallbackUrl` property on the request body. It overrides your account's default delivery receipt callback URL for that one message. The value must be a URI.

- **On LINE Official Notification:** `dlrCallbackUrl` on `POST /api/v1/subaccounts/{subAccountId}/lon`. Use it to route receipts for a particular notification campaign or test run to a separate handler. See [Per-Message Callback Override on /lon](./lon-webhook.md#per-message-callback-override-on-lon).
- **On the LINE Official Account channel:** `dlrCallbackUrl` on `POST /api/v1/subaccounts/{subAccountId}/messages`. Use it to route delivery receipts for a specific LINE message to a separate handler, for example for campaign-level tracking.

## Errors

On the LINE Official Account channel, failures reach you in two ways: synchronously in the HTTP response to your send request, and asynchronously through delivery receipts.

### Synchronous failures

These come back in the HTTP response to your send request, before the message enters the platform. They are identical for `/messages` and `/lon`.

| HTTP status | Meaning |
|---|---|
| `200` | The message was accepted. The body carries `umid` and `status.state` of `queued` |
| `400` | Bad request. A parameter is missing or invalid |
| `401` | The request was not authenticated |
| `500` | Internal server error |

The error body shape is consistent across all three failure codes:

```json
{
  "code": 1002,
  "message": "Invalid MSISDN format (not E.164 international number)",
  "errorId": "<ERROR_ID>",
  "timestamp": "2026-07-29T08:19:45.99Z"
}
```

For the codes that appear in the `code` property of an API error body, see the [API Error Codes](/connect/reference/api-error-codes) reference.

### Asynchronous failures

Failures that occur after a message is accepted arrive as delivery receipts with a `status.state` of `rejected` or `undelivered`. These receipts reach your callback URL in the same v9 envelope described in [Delivery Receipts](#delivery-receipts), with the `status.detail` field carrying additional context. For the codes that can appear, see the [General Error Codes](/connect/reference/message-status-references).

Because the `line` channel does not report `Delivered` or `Read`, you can confirm that a message was sent to the operator but not that the end user received or read it. Build delivery-confirmation and read-rate reporting on channels that support those statuses.

LINE Official Notification additionally reports `Delivered`, giving more visibility into the delivery path. See [Asynchronous Failures](./lon-webhook.md#asynchronous-failures).

## If You Also Receive Webhooks Directly from LINE

This section applies **only** if you run your own LINE bot server alongside 8x8 and receive webhooks from the LINE Platform directly. It does not describe the 8x8 webhook covered above. If 8x8 is your only integration, skip it. Only the LINE Official Account channel has a bot-server relationship with LINE at all, so nothing here applies to LON.

LINE signs the webhooks it sends to a bot server, and expects the bot server to verify that signature:

- **Signature algorithm:** LINE generates a signature with **HMAC-SHA256**, using the webhook event body as the input data and the **channel secret** as the hash key.
- **Header:** The signature is sent in the `x-line-signature` request header.
- **Do not modify the body before verifying.** The signature is computed over the request body as sent.
- **Where the channel secret comes from:** the channel's **Basic settings** tab in the [LINE Developers Console](https://developers.line.biz/console/). Admin privileges on the channel are required to retrieve or reissue it. Reissuing a channel secret immediately invalidates the current one, so assess the impact on anything already using it first.
- **Do not allowlist by IP address.** LINE states that it does not disclose the IP addresses of the LINE Platform, and that they are subject to change without notice. Use signature validation instead.
- **Keep your own logs.** LINE states that it does not provide logs for Messaging API requests or for webhooks it sent, even on request. You are responsible for saving them.

For LINE's full description, see [Verify webhook signature](https://developers.line.biz/en/docs/messaging-api/verify-webhook-signature/) and [Messaging API development guidelines](https://developers.line.biz/en/docs/messaging-api/development-guidelines/).

## Related Resources

**For Developers:**

- [Getting Started with LINE over the 8x8 API](./getting-started.md) - Authentication, base URLs, and the send response
- [LINE Official Account: Behaviour, Messages, and Constraints](./loa-messaging.md) - Outbound payloads, addressing, consent, and message counting
- [LON Delivery Receipts](./lon-webhook.md) - LON's extended delivery receipt coverage, including the Delivered status that the LINE Official Account channel does not report
- [LINE Official Notification (LON)](./official-notification-lon.md) - The one-way product's request contract

**Important Concepts:**

- [Identifying a LINE Recipient](./loa-messaging.md#identifying-a-line-recipient) - Where `channelUserId` fits in your data model

**Cross-channel References:**

- [Inbound Messaging Apps message](/connect/docs/inbound-chatapps-message) - The canonical v3 inbound envelope
- [Webhooks Configuration API](/connect/reference/add-webhooks-1) - Registering your callback URL
- [API Error Codes](/connect/reference/api-error-codes) - The codes returned in a synchronous error body
