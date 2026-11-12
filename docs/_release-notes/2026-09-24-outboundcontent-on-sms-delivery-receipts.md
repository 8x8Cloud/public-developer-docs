---
date: 2026-09-24
products: ["Connect", "APIs"]
channel: "SMS"
changeType: Added
title: "outboundContent on SMS delivery receipts"
---

SMS delivery receipts now document the `outboundContent` object — a structured copy of the original outbound message the receipt refers to. It lets you reconcile a delivery receipt with the exact content that was sent without keeping your own copy of the outbound payload.

Key points:

- `outboundContent` is attached only to the `queued` receipt sent when the message is accepted for processing. Other `queued` receipts — for example, for scheduled messages — do not include it, and it is omitted from every other status (`sent`, `delivered`, `undelivered`, etc.).
- For SMS, `channel` is always `sms` and `contentType` is always `text`; the message text is carried in `body.text`.
- When PII masking applies to the sub-account or destination country, `body` is omitted and a `meta` object describes the redaction (`redacted`, `redactionReason`) instead.
- Requires delivery receipt format V7 or later. If your account is on an earlier format, contact support to activate the latest version.

The guide includes sample receipts both with plain `outboundContent` and with masked content.

## Read more

- [Delivery receipts for outbound SMS](/connect/docs/delivery-receipts-for-outbound-sms)
