---
date: 2026-10-21
products: ["Connect", "APIs"]
channel: "SMS"
changeType: Added
title: "MMS media support on the Send SMS API"
---

You can now send media (image, audio, video, etc.) along with an SMS as an MMS, by adding a `mediaUrls` field to your send request — up to 10 HTTPS URLs, each up to 4096 characters. MMS is currently supported for US/Canada destinations only; for other destinations `mediaUrls` is ignored and the message is sent as a plain SMS.

The delivery receipt's `outboundContent` object also now includes the `mediaUrls` that were sent, alongside the existing text body.

## Read more

- [Send SMS API](/connect/docs/send-sms-api-reference)
- [Send SMS](/connect/reference/send-sms-single)
- [Delivery receipts for outbound SMS](/connect/docs/delivery-receipts-for-outbound-sms)
