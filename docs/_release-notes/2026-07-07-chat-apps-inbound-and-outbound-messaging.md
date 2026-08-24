---
date: 2026-07-07
products: ["Connect", "APIs"]
changeType: Added
title: "Chat Apps inbound and outbound messaging"
---

You can now follow end-to-end how-to documentation for **sending and receiving Chat Apps messages** on the 8x8 platform. The Chat Apps API lets you reach customers across supported channels — WhatsApp, Viber, RCS, LINE, and others — through a single message API, and receive their replies and delivery updates on the webhook configured for your account.

## Sending messages

Send a message by `POST`ing to the Chat Apps messages endpoint for your sub-account:

```http
POST https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages
```

Each request identifies the recipient in a `user` object (for example `user.msisdn`), sets a `type` (`text`, `image`, `video`, `file`, `location`, `template`, `interactive`, `carousel`, and so on), and carries the message in `content`. Attach your own `clientMessageId` to correlate the message with the delivery receipts you receive later. To send to many recipients in one call, use the batch endpoint.

## Receiving messages and delivery receipts

Two kinds of webhook are delivered to your configured callback URL, both as JSON `POST` requests:

| Webhook | eventType | Purpose |
| --- | --- | --- |
| Inbound message | `inbound_message_received` | A message a user sent you on a linked channel. |
| Delivery receipt | `outbound_message_status_changed` | A status update (queued, delivered, read, failed) for a message you sent. |

If your endpoint returns a 4XX/5XX response or times out, 8x8 retries at progressive intervals: 1, 10, 30, and 90 seconds.

## Read more

- [Send a message — API reference](/connect/reference/send-message)
- [Send messages in a batch — API reference](/connect/reference/send-message-many)
- [Inbound Messaging Apps message](/connect/docs/inbound-chatapps-message)
- [Delivery receipts for Outbound Messaging Apps](/connect/docs/delivery-receipts-for-outbound-chatapps)
- [Get Chat Apps message details — API reference](/connect/reference/get-chatapps-message-details)
- [List of supported Messaging Apps channels](/connect/docs/list-of-supported-chatapps-channels)
