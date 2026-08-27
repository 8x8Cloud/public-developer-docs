# Converse 2.0 Bot integration

Converse 2.0 can route a conversation to a **bot agent** instead of a human. When it does, it notifies your bot of each inbound message and gives it a way to reply, transfer the conversation, or close it.

There are **two integration models**. Which one applies to your bot is configured by 8x8, along with your bot's URL and credentials.

> 📘
>
> You cannot choose the model yourself, and it is not discoverable from the API. Ask your account manager which model your bot is configured for before you start building.
>

### The two models

| | Model 1 — MO / MT | Model 2 — Bot Response API |
|:--|:------------------|:---------------------------|
| Inbound | Converse 2.0 posts the message to your URL together with your service credentials | Converse 2.0 posts the message to your bot URL with `Authorization: Bearer <your_api_secret>` |
| Outbound | Your bot calls the MT, Transfer and Close APIs itself | Your bot calls the short-lived callback URLs supplied in the notification |
| Credentials your bot holds | Long-lived `apiKey` and `apiSecret` for the tenant | None. A per-conversation token arrives with each message |
| Documented in | [MT Messaging API](/converse/reference/send-mt-message), [Conversation API](/converse/reference/transfer-conversation) | This page and the [Bot Response API](/converse/reference/bot-response-reply) |

Model 2 is the tighter design: the bot never holds tenant-wide credentials, and each token is scoped to a single conversation and expires.

### Model 1 — MO / MT

Converse 2.0 forwards the inbound message to your registered URL, including `botApiKey` and `botApiSecret` for you to verify. The payload format is provided by 8x8 when your URL is registered. Your bot then acts by calling the ordinary APIs:

- Reply — [MT Messaging API](/converse/reference/send-mt-message)
- Transfer — [Transfer a conversation](/converse/reference/transfer-conversation)
- Close — [Close a conversation](/converse/reference/close-conversation)

Because your bot holds the tenant's `apiKey` and `apiSecret`, it can act on any conversation. Store them accordingly.

### Model 2 — Inbound notification

When an inbound message is assigned to a bot agent, Converse 2.0 notifies the bot at its registered URL. The notification carries short-lived callback URLs which the bot uses to respond.

Method: `POST` to `<your_bot_url>`

Header: `Authorization: Bearer <your_api_secret>`

> 🚧
>
> **Timeout is 10 seconds, and the notification is not retried.** If your bot is slow or unavailable, the customer's message is silently dropped — there is no second attempt and no dead-letter queue. Return HTTP 200 promptly and do the work asynchronously.
>

Request body description

| Parameter name | Parameter type | Description |
|:---------------|:---------------|:------------|
| agentUUID | string | The bot agent the conversation is assigned to. |
| conversationUUID | string | The conversation. |
| channelAccountUUID | string | The channel account the message arrived on. |
| chatUUID | string | The inbound message. |
| sendTo | string | The customer's address on the channel — for example the mobile number for WhatsApp. |
| message | string | Text of the inbound message. Empty when the message carries only attachments. |
| attachments | array | Attachments of the inbound message. Empty array when there are none. |
| timestamp | string | When the message was received. |
| contactUUID | string | The contact. |
| contactDisplayName | string | The contact's display name, if known. |
| responseUrl | string | Call this to reply to the customer. |
| closeUrl | string | Call this to close the conversation. |
| transferUrl | string | Call this to transfer the conversation. |

### Expected response

Return HTTP 200 promptly. **The body of your response is not used** — the bot's reply is sent separately by calling the [Bot Response API](/converse/reference/bot-response-reply).

### Sample Webhook

```json title="Bot inbound notification"
{
    "agentUUID": "a1ede29d-808f-4c66-b35f-896ddd6b537a",
    "conversationUUID": "b23f39b9-3ce7-4659-a32a-c0a0c15f093d",
    "channelAccountUUID": "8abc8cde-196e-4d95-9210-3f7b2c1d6e88",
    "chatUUID": "1a0b0dc3-3a3f-4bf8-9d5f-2ed50346d5c4",
    "sendTo": "6596270000",
    "message": "Hi, I would like to check my order status",
    "attachments": [],
    "timestamp": "2026-08-04T02:41:11.000Z",
    "contactUUID": "1cf2ed48-b259-483d-9065-3a7b9c0d1e2f",
    "contactDisplayName": "Joseph Lim",
    "responseUrl": "https://e18.moobidesk.com/response/reply/<TOKEN>",
    "closeUrl": "https://e18.moobidesk.com/response/close/<TOKEN>",
    "transferUrl": "https://e18.moobidesk.com/response/transfer/<TOKEN>"
}
```

### Responding

Use the callback URLs exactly as given — the token is embedded in them. See the [Bot Response API](/converse/reference/bot-response-reply) for the four operations: **Reply**, **Transfer**, **Close** and **List**.

A reply can be plain text or a structured message — reply buttons, a list menu, a URL button, a location or call-permission request, a voice-call offer, a WhatsApp Flow, or a template. Structured replies are supported on **WhatsApp and Viber only**, and the interactive payload follows WhatsApp's own format, so an existing WhatsApp payload can be sent as-is. See [Reply](/converse/reference/bot-response-reply) for the subtypes and payload examples.

> 🚧
>
> A structured reply sent on a channel other than WhatsApp or Viber is rejected with `400` — and that particular check happens **after** the token is used, so it consumes a token use. The other validation errors are returned before the token is touched. The 15-minute window stays open either way, so you can correct and retry.
>

> 🚧
>
> **Mind the token window.** The token is valid for 48 hours, but the *first* call made with it opens a **15-minute window**, and every later call must fall inside that window or be rejected with `403`. Do your lookups, your reply, and any close or transfer within 15 minutes of the first call.
>

The notification does not carry a URL for **List**. To call it, take the `responseUrl` you received and replace `reply` with `list` — the token is the same.

### Reference

- [Bot Response API](/converse/reference/bot-response-reply) — reply, transfer, close, list
- [MT Messaging API](/converse/reference/send-mt-message) — sending the reply in model 1
- [Converse 2.0 APIs](/converse/docs/api-overview) — authentication and conventions
