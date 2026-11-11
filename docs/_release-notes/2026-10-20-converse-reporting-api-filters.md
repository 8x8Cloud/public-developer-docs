---
date: 2026-10-20
products: ["Converse"]
changeType: Changed
title: "Converse Reporting API: queue and status filters, corrected field reference"
---

**Get conversations data** can now be narrowed by queue and by conversation status, and the Reporting API reference has been corrected to match the API's actual behaviour.

## New optional filters

| Property | Accepts |
| --- | --- |
| `queues` | A queue UUID, or an array of up to 50. Matches the conversation's current queue. |
| `conversationStatus` | A status, or an array of `initialized`, `open`, `assigned`, `read`, `responded`, `closed`. |

Send both to match conversations that satisfy both. Requests without them return the same report as before.

## Clarified behaviour

- `from` and `to` filter on the conversation's **creation** time, and the range must be within **30 days**.
- Results are returned oldest first.
- Errors are returned with HTTP 200 and `status: "Failed"`; the reference now lists each error message.

## Corrected field reference

- Conversation `type` is `inbound` or `outbound_conversation`; `queue`, `agent` and `contact.key` are UUIDs.
- Message records now document attachments, `conversationKey`, `hasAttachments` and the contact.
- Agent `manager` and `supervisor` are booleans.

## Read more

- [Get conversations data — API reference](/converse/reference/get-conversations-report)
- [Get chats data — API reference](/converse/reference/get-chats-report)
- [Get agent data — API reference](/converse/reference/get-agents-report)
