---
date: 2026-07-28
products: ["Connect"]
channel: "WhatsApp"
changeType: Added
title: "WhatsApp Automatic Events webhook"
---

You can now receive **WhatsApp Automatic Events webhooks** — notifications sent when Meta detects a qualifying conversion event (a **purchase** or a **lead**) inside a WhatsApp thread that originated from a Click-to-WhatsApp ad. 8x8 forwards these detected events to your endpoint so you can feed conversion data into your own analytics and attribution systems.

## Getting the events

To receive them, configure a webhook for **Chat Apps Business Management Updates** (webhook type `CABM`), and subscribe the `automatic_events` field at the WhatsApp Business Account (WABA) level in Meta, with the business opted in under **Settings → Privacy and Data Sharing**.

## Payload shape

Each event is wrapped in a provider-agnostic envelope, with Meta's original payload passed through verbatim inside `eventDetails.rawEvent`:

| Field | Description |
| --- | --- |
| `eventId` | Unique event identifier. |
| `timestamp` | Event time, ISO 8601. |
| `provider` | Equal to `WhatsApp`. |
| `businessAccountId` | The WhatsApp Business Account (WABA) ID. |
| `accountId` | The account the event is associated with. |
| `eventType` | Equal to `whatsapp_automatic_events`. |
| `eventDetails.rawEvent` | Meta's original `change` object, carried through verbatim. |

The envelope uses 8x8's `camelCase` convention, but everything inside `rawEvent` keeps Meta's original `snake_case`. The detected events arrive in `rawEvent.value.automatic_events[]`, each with an `event_name`:

| `event_name` | Meaning |
| --- | --- |
| `LeadSubmitted` | A qualifying lead action, such as submitting a form or sharing contact details. |
| `Purchase` | A completed purchase; carries a `custom_data` object with the conversion `currency` and `value`. |

Because `rawEvent` is a verbatim passthrough, Meta's Automatic Events API documentation is the authoritative reference for the fields inside it.

## Read more

- [WhatsApp Automatic Events Webhook](/connect/docs/whatsapp-automatic-events-webhook)
- [Webhooks Configuration API](/connect/reference/add-webhooks-1)
