---
date: 2026-07-21
products: ["Connect", "APIs"]
channel: "WhatsApp"
changeType: Added
title: "Business-Scoped User IDs (BSUID)"
---

WhatsApp is rolling out optional usernames, which let people message a business without handing over their phone number. So that those users stay reachable, Meta gives every WhatsApp user a persistent **Business-Scoped User ID (BSUID)**. 8x8 now surfaces the BSUID as `user.channelUserId` throughout the WhatsApp over 8x8 API. The docs for it are live too, covering sending, inbound messages, delivery receipts, and the error handling that goes with them.

## channelUserId across the API

A BSUID looks like `US.13491208655302741918`: a two-letter country code, then a period, then an alphanumeric string. Store and send it back exactly as you received it. The Send Message API accepts `channelUserId` alongside the existing `msisdn`:

| Recipient identifier | Routing behavior |
| --- | --- |
| `msisdn` only | Delivered via standard phone routing. |
| `channelUserId` only | Delivered to the matching BSUID on Meta's network. |
| Both provided | `msisdn` takes precedence. To send using only the BSUID, omit `msisdn`. |

On the newest webhook payloads, `channelUserId` carries the real BSUID: **Inbound Message (MO) v3** adds it alongside an optional `username`, and **Delivery Report (DR) v9** includes it on the receipts WhatsApp itself confirms (`delivered_to_recipient` and `read`). On the older MO v2 / DR v8 payloads, `channelUserId` simply repeated the phone-number digits, so treat it as a distinct identifier, not a phone number.

## New error code

Authentication templates (one-tap, zero-tap, copy-code) still require a physical phone number:

| 8x8 error code | Meta error code | Meaning |
| --- | --- | --- |
| `1054` | `131062` | Business-scoped User ID (BSUID) recipients are not supported for this message. Send OTP/authentication templates to the recipient's `msisdn` instead. |

Store `channelUserId` alongside `msisdn` in your contact records, keep authentication flows on phone numbers, and handle error `1054` by falling back to an `msisdn`.

## Read more

- [WhatsApp Business-Scoped User IDs (BSUID)](/connect/docs/whatsapp/whatsapp-business-scoped-user-ids)
- [Inbound Messaging Apps message](/connect/docs/inbound-chatapps-message)
- [Delivery receipts for Outbound Messaging Apps](/connect/docs/delivery-receipts-for-outbound-chatapps)
- [WhatsApp over 8x8 API](/connect/docs/whatsapp/whatsapp-over-8x8-api)
- [WhatsApp Webhooks Reference](/connect/docs/whatsapp/whatsapp-webhooks)
