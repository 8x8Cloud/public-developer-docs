---
date: 2026-10-13
products: ["Connect", "APIs"]
channel: "WhatsApp"
changeType: Added
title: "WhatsApp Direct Send"
---

A new guide documents **Direct Send**: you send utility message content directly, and WhatsApp matches it to an existing template or creates one for you. You don't need to create a template or wait for approval before the first send.

## How it works

Add a `content.whatsApp.directSend` object to a request on the existing Send Message endpoint. There's no separate endpoint or setup call.

```json
{
  "user": { "msisdn": "+6500000000" },
  "type": "text",
  "channels": [{ "channel": "WhatsApp" }],
  "content": {
    "text": "Hi Jane, your order #12345 has been shipped and is expected to arrive on March 20.",
    "whatsApp": {
      "directSend": { "category": "utility", "ttlSeconds": 600 }
    }
  }
}
```

- **Category:** `utility` only. Messages are charged at utility rates. Send marketing and authentication messages as template messages.
- **Message types:** text, interactive CTA URL (one button), and interactive reply buttons (1 to 3). Interactive headers must be text.
- **Time-to-live:** optional `ttlSeconds`, from 30 to 43200 seconds. WhatsApp rejects a TTL on any message that isn't a Direct Send message.
- **Recipient:** by phone number (`msisdn`) or BSUID (`channelUserId`).
- **Delivery receipts** carry `whatsapp.templateId`, the template WhatsApp used for the message. Store it: it's the only link between a message and the template that carried it.
- **Generated templates** are named `auto_generated_…`, and you can't edit or delete them. Templates that are created but never used are deleted after 24 hours.

The guide also covers template pauses (error `132015`), category misuse detection, account restrictions, message limits, and an integration checklist.

## Sample submission endpoint removed

Direct Send doesn't need a sample submission step, so the **Submit WhatsApp Direct Send Sample** endpoint (`POST /api/v1/whatsapp/subaccounts/{subAccountId}/channels/{channelId}/directSend/sample`) has been removed from the API reference.

## Read more

- [WhatsApp Direct Send API](/connect/docs/whatsapp/whatsapp-direct-send)
- [Send Message API reference](/connect/reference/send-message)
- [Delivery receipts for Outbound Messaging Apps](/connect/docs/delivery-receipts-for-outbound-chatapps)
