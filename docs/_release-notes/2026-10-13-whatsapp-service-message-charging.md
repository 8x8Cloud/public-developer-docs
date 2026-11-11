---
date: 2026-10-13
products: ["Connect"]
channel: "WhatsApp"
changeType: Changed
title: "WhatsApp pricing: service messages and in-window Utility templates now charged"
---

The WhatsApp docs now reflect Meta's pricing change effective **October 1, 2026**. Two kinds of message that were free inside an open 24-hour Customer Service Window (CSW) are now charged per delivered message.

## What's charged now

| Message sent inside the CSW | Before | From October 1, 2026 |
| --- | --- | --- |
| **Service message** (non-template / freeform reply) | Free | Charged at the service message rate, after the monthly free tier |
| **Utility template** | Free | Charged at the Utility rate for the recipient's market |

- **Service message rate** is the same as the market's Utility and Authentication rate. Service messages don't qualify for volume tiers.
- **Monthly free tier:** each business phone number gets 1,000 free service messages per month, and 8x8 passes this on to you. Unused messages don't roll over. Charging starts at the 1,001st service message in the month.
- **One charge per message:** a non-template message with promotional content is still a service message. Meta doesn't add a Marketing charge.
- **Free Entry Point window** is not affected and still makes all messages free. It now opens only from a Click-to-WhatsApp ad (Android or iOS app) and can stay open for up to **7 days**, replacing the previous 72-hour description.

## Reporting

- Delivery receipts now list the `pricingCategory` values: `marketing`, `utility`, `authentication`, `authentication_international`, and `service` (non-template messages). A new sample shows a delivered service message.
- `pricingCategory` doesn't tell you whether an individual message was free. Use the Message Usage API for `free` and `charged` counts by pricing category.
- Messaging Apps reports now count free and chargeable traffic per message instead of per conversation.

The glossary adds **Service Message**, **Free Entry Point Window**, and **Volume Tier**. The Coexistence guide notes that freeform messages sent through the Cloud API are chargeable.

## Read more

- [Concepts & Fundamentals](/connect/docs/whatsapp/concepts-fundamentals)
- [Delivery receipts for Outbound Messaging Apps](/connect/docs/delivery-receipts-for-outbound-chatapps)
- [Get message usage](/connect/reference/get-message-usage)
