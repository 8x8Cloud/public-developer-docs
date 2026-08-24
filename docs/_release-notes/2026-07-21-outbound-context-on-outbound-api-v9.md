---
date: 2026-07-21
products: ["Connect", "APIs"]
changeType: Changed
title: "Outbound context on Outbound API v9"
---

Outbound Messaging Apps delivery receipts on **version 9** now carry additional context about the message they refer to. A new `outboundContent` object gives you a structured, channel-normalized copy of the WhatsApp message that was delivered, so you can reconcile a delivery receipt with the exact content sent without keeping your own copy of the outbound payload.

## The outboundContent object

`outboundContent` is **WhatsApp only**. It is attached to the receipt that confirms delivery to the recipient (`delivered_to_recipient`) and is omitted from earlier receipts such as `queued` and `delivered_to_operator`. It describes the message through fields such as `contentType`, `header`, `body`, `footer`, `actions`, and `cards`, with a `meta` object for extra flags.

| `contentType` | Description |
| --- | --- |
| `text` | Freeform text message. |
| `media` | Freeform image, video, audio, or document (media type in `header.type`). |
| `location` | Freeform location message. |
| `template` | Standard (non-authentication) template message. |
| `template_auth` | Authentication template — its one-time code is redacted. |
| `carousel` | Carousel template; content is carried per card in the `cards` array. |
| `interactive` | Interactive message; sub-type in `meta.interactiveType`. |

Sensitive content is masked before it reaches your webhook: authentication codes are replaced with `******`, and when PII masking is enabled on your sub-account the content is withheld. In both cases `meta.redacted` is `true` and `meta.redactionReason` explains why.

## Read more

- [Delivery receipts for Outbound Messaging Apps](/connect/docs/delivery-receipts-for-outbound-chatapps)
