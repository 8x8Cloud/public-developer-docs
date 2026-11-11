---
date: 2026-10-27
products: ["Connect", "APIs"]
channel: "SMS"
changeType: Added
title: "Inbound MMS media on the inbound SMS webhook"
---

When a user sends an MMS to one of your MMS-enabled US/Canada virtual numbers, the inbound SMS webhook (`inbound_message_received`) now includes a `mediaUrls` array with a link to each media file, alongside the message text in `body`. `mediaUrls` is omitted for plain SMS.

The links are not the carrier's own URLs: 8x8 copies each media file into its own storage and sends you a pre-signed URL that is valid for 1 day by default. Download the media when the webhook arrives if you need to keep it. If a media file cannot be copied, the message is still delivered with its text and the remaining media.

Media is only included in the latest inbound SMS format. If your webhook receives a different structure, contact support to activate the latest format for your account.

Delivery receipts for MMS you send use the same `outbound_message_status_changed` webhook as SMS. Only the `queued` receipt sent when the message is accepted carries the `outboundContent` object with the `mediaUrls` that were sent; later receipts report the delivery status only.

## Read more

- [Inbound SMS](/connect/docs/inbound-sms)
- [Delivery receipts for outbound SMS](/connect/docs/delivery-receipts-for-outbound-sms)
- [Send SMS API](/connect/docs/send-sms-api-reference)
