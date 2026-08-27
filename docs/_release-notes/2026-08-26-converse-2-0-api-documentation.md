---
date: 2026-08-26
products: ["Converse"]
changeType: Added
title: "Converse 2.0 API documentation, now at its own /converse section"
---

**Converse** now has full API documentation, and its own top-level section on the developer portal — no longer nested under Connect.

## Five new OpenAPI specs

- **Conversation API** — close a conversation, transfer it, list a contact's active conversations.
- **MT Messaging API** — send an outbound message, plain text or structured.
- **Bot Response API** — reply, transfer, close, and list, with structured replies (buttons, lists, CTAs, location requests, call permission requests, voice calls, and flows) on WhatsApp and Viber.
- **Reporting API** — conversations, chats, and agents.
- **Setup API** — channel accounts, agents, queues, dispositions, and autoresponder / business hours.

Three new guides accompany the specs: an APIs overview, the Conversation Status Update Notification, and Bot integration.

## New URLs

Converse's guides and API reference move from `/connect/docs/converse*` to `/converse`. Every previous URL — including the original `/connect/docs/moobidesk*` paths — keeps working.

| Before | After |
| --- | --- |
| `/connect/docs/converse` | `/converse` |
| `/connect/docs/converse/getting-started` | `/converse/docs/getting-started` |
| `/connect/reference/converse-2-close-conversation` | `/converse/reference/close-conversation` |

Converse is still reached from the CPaaS section on the [Connect](/connect) landing page.

## Read more

- [Converse](/converse)
- [Converse APIs overview](/converse/docs/api-overview)
- [Converse API reference](/converse/reference)
