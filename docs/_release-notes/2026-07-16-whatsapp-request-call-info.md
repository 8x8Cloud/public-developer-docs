---
date: 2026-07-16
products: ["Connect", "APIs"]
channel: "WhatsApp"
changeType: Added
title: "WhatsApp Request Call Info"
---

You can now check a customer's **WhatsApp call permission status** before you place a business-initiated call. Meta requires customers to explicitly grant permission before a business can call them on WhatsApp, and the new Get Call Permission Status endpoint tells you whether that permission is in place, whether you are currently allowed to request it or start a call, and when it expires.

## Query call permission for a destination

```http
GET /api/v1/whatsapp/subaccounts/{subAccountId}/channels/{channelId}/callPermissions?destination=+6500000000
```

Pass the recipient's phone number in E.164 format as the `destination` query parameter.

## What the response tells you

| Field | Description |
| --- | --- |
| `status` | Current permission: `temporary`, `permanent`, or `not_granted`. |
| `actions[]` | For each action (`send_call_permission_request`, `start_call`), whether you can perform it (`canPerformAction`) and its rate `limits` (`timePeriod`, `maxAllowed`, `currentUsage`). |
| `expirationTime` | ISO 8601 timestamp for when the permission expires. |

Use this to decide whether to send a call permission request template first or to go straight to placing the call, and to stay within Meta's rate limits.

## Read more

- [Get Call Permission Status — API reference](/connect/reference/get-call-permission-status)
- [Business-initiated calling](/connect/docs/voice/whatsapp-business-calling/business-initiated)
- [WhatsApp Business Calling overview](/connect/docs/voice/whatsapp-business-calling/overview)
