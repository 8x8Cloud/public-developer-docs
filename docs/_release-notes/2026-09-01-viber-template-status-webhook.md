---
date: 2026-09-01
products: ["Connect", "APIs"]
channel: "Viber"
changeType: Added
title: "Viber Template Status Webhook"
---

You can now receive a **Viber Template Status Webhook** when Viber moderates a message template you registered, so your systems stay in sync without polling.

## Webhook format

| Field | Description |
| --- | --- |
| `eventId` | Unique event identifier. |
| `timestamp` | Timestamp of event in ISO 8601 format. |
| `provider` | Equal to `viber`. |
| `businessAccountId` | The Viber Service ID the template belongs to. |
| `accountId` | Account associated with the event. |
| `eventType` | Equal to `template_status_update`. |
| `eventDetails.templateName` | The template name you chose at creation. |
| `eventDetails.templateLanguage` | The template's language code (e.g. `en`). |
| `eventDetails.viber.status` | New template status: `PENDING`, `APPROVED`, or `REJECTED`. |

Viber reports moderation outcomes as one of three callback types, which map to a template status:

| Viber callback type | Resulting `viber.status` |
| --- | --- |
| `1002` — created, queued for moderation | `PENDING` |
| `1000` — approved | `APPROVED` |
| `1001` — rejected | `REJECTED` |

These are the same three statuses returned by [Retrieving Templates via API](/connect/docs/viber-templates-management#retrieving-templates-via-api). A template must reach `APPROVED` before you can send with it — sending against a `PENDING` or `REJECTED` template is rejected before the request reaches Viber.

The event identifies the template by **name**, not by Viber's internal template identifier. If the identifier from Viber's callback can't be matched to a template 8x8 has stored, no status update or webhook is sent for that event.

## Read more

- [Viber Template Status Webhook](/connect/docs/viber-template-status-webhook)
- [Viber Templates Management](/connect/docs/viber-templates-management)
- [Webhooks & Delivery Receipts](/connect/docs/viber/webhooks-delivery-receipts)
- [Webhooks Configuration API](/connect/reference/add-webhooks-1)
