# Converse 2.0 Conversation Status Update Notification

The **Conversation Status Update Notification** is a webhook. Whenever a conversation changes to a status you have subscribed to, Converse 2.0 calls your destination URL.

Use it when an external system needs to react to conversation lifecycle events — when a conversation is opened, assigned to an agent, read by that agent, or closed.

> 📘
>
> This notification supersedes the older close-only notification, which reported closures alone. This one reports all four statuses.
>

### Requirements

To receive these notifications, you need:

- A Converse 2.0 account.
- A destination URL registered with 8x8, one registration per status you want.

> 📘
>
> Registration is done by 8x8 per service, not through an API. Contact your account manager to register or change a destination.
>

### Registration

| Setting | Description |
|:--------|:------------|
| Destination URL | The URL to call. For `GET` it may contain placeholders, which are substituted before the call. |
| Method | `get` or `post`. Defaults to `post`. |
| Secret | Optional. Passed back to your endpoint as `apiSecret` so you can validate the call. |
| Event Type | The conversation status to subscribe to: `open`, `assigned`, `read` or `closed`. Defaults to `closed` when not set. |

> 🚧
>
> **One registration subscribes to one status.** To be notified of more than one status, register one destination per status. The same URL may be used for all of them — so your endpoint must be able to tell the statuses apart by reading `conversationStatus`.
>

The destination URL can be the same as, or different from, the MT API's destination URL.

### Conversation statuses

| Status | Notification is sent when |
|:-------|:--------------------------|
| `open` | The conversation is opened and routed to a queue. |
| `assigned` | The conversation is assigned to an agent. |
| `read` | The conversation is marked as read by the assigned agent. |
| `closed` | The conversation is closed. |

> 🚧
>
> **A status change caused by a transfer does not trigger a notification.** If you rely on these notifications to track conversation ownership, transfers will be invisible to you.
>

### Webhook format

Method: `GET` or `POST` to `<destination_url>`. For `POST` the parameters are sent in the request body; for `GET` they are sent in the query string.

Request body description

| Parameter name | Parameter type | When sent | Description |
|:---------------|:---------------|:----------|:------------|
| apiSecret | string | Only when a secret is registered | Used for validation. This is the secret you gave 8x8 — verify it to authenticate the call. |
| eventType | string | Always | Always the literal value `conversationStatus`. |
| conversationUUID | string | Always | The conversation whose status changed. |
| conversationStatus | string | Always | The new status: `open`, `assigned`, `read` or `closed`. |
| agentUUID | string | Always | The agent the conversation is assigned to. Empty when the conversation has no agent yet, which is typically the case for `open`. |
| contactUUID | string | Always | The contact tagged to the conversation. |
| contactId | string | Always | The channel identifier the conversation was initiated from — a mobile number for SMS and WhatsApp, a user id for Facebook. |

> 🚧
>
> **`eventType` and `conversationStatus` are different things despite the similar names.** `eventType` is *always* the string `conversationStatus` — it identifies the kind of notification, so that one destination URL can distinguish this notification from other Converse 2.0 notifications. The actual conversation status is in the `conversationStatus` property.
>

### Expected response

Return HTTP 200 to acknowledge the notification.

### Sample Webhooks

#### Conversation closed

```json title="conversationStatus — closed"
{
    "apiSecret": <YOUR_REGISTERED_SECRET>,
    "eventType": "conversationStatus",
    "conversationUUID": "7ae6c41a-6fe4-4b5b-8b6d-21a3c4d5e6f7",
    "conversationStatus": "closed",
    "agentUUID": "7b3cd796-7e74-48af-83e6-2c9a7b1e4d55",
    "contactUUID": "1cf2ed48-b259-483d-9065-3a7b9c0d1e2f",
    "contactId": "6596270000"
}
```

#### Conversation opened

`agentUUID` is empty because the conversation has been routed to a queue but not yet assigned.

```json title="conversationStatus — open"
{
    "apiSecret": <YOUR_REGISTERED_SECRET>,
    "eventType": "conversationStatus",
    "conversationUUID": "0a4d6ad7-2a2d-4bdc-b7e5-3c4d5e6f7a8b",
    "conversationStatus": "open",
    "agentUUID": "",
    "contactUUID": "1cf2ed48-b259-483d-9065-3a7b9c0d1e2f",
    "contactId": "6596270000"
}
```

### Reference

- [Close a conversation](/converse/reference/close-conversation) — closing a conversation yourself
- [Converse 2.0 APIs](/converse/docs/api-overview) — authentication and conventions
