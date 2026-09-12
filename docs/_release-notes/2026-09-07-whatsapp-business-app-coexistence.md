---
date: 2026-09-07
products: ["Connect"]
channel: "WhatsApp"
changeType: Added
title: "WhatsApp Business App Coexistence"
---

A new guide documents **Coexistence** — connecting a phone number that's already active in the WhatsApp Business app to the WhatsApp Business Platform (Cloud API) through 8x8 Connect or the ChatApps API, so both keep working on the same number at once. Your team can keep answering 1:1 chats from the mobile app while 8x8 Connect and the ChatApps API handle templates, campaigns, automation, and reporting.

## Where coexistence fits

| Channel Tag | Where You Can Send From | What It Means |
| --- | --- | --- |
| **Cloud API** | Platform only | Standard WhatsApp Cloud API for all template messages. The WhatsApp mobile app cannot be used with this number. |
| **MM Lite API** | Platform only | Optimized MM Lite API for Marketing templates; Utility and Authentication use standard Cloud API. |
| **WhatsApp Business** | Platform and phone | Coexistence — 8x8 Connect for automation **and** the WhatsApp Business mobile app on the same number. |

## Highlights

- **Onboarding** runs through Meta's Embedded Signup flow from the 8x8 Connect **Channels** page, with a step completed on the phone that holds the number. Requires WhatsApp Business app version 2.24.17 or higher, and is limited to the markets Meta currently supports for coexistence.
- **What changes in the app:** message edit/revoke become supported and messages are mirrored to the platform; disappearing messages, view-once messages, live location, and broadcast lists are disabled for 1:1 chats.
- **Manual messages stay free.** Messages sent from the WhatsApp Business app aren't chargeable and don't affect the 24-hour customer service window; they're reported under a new **WA Business** category, distinct from Cloud API traffic.
- **Throughput is fixed at 20 messages per second** for a coexistence-enabled number.
- Every message sent manually from the app is forwarded to your webhook as an `external_app_message` event so you can mirror it in your own conversation thread.
- Device changes (reinstalling the app, re-registering the number) automatically offboard the Cloud API side; reconnection is designed to run automatically with a pre-checked opt-in during re-registration.

## Where to look

- [WhatsApp Business App Coexistence](/connect/docs/whatsapp/whatsapp-business-app-coexistence) — the new guide
- [Getting Started with WhatsApp](/connect/docs/whatsapp/getting-started)
- [Concepts & Fundamentals](/connect/docs/whatsapp/concepts-fundamentals)
- [Delivery receipts for Outbound Messaging Apps](/connect/docs/delivery-receipts-for-outbound-chatapps)
