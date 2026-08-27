# Converse 2.0 APIs

**Converse 2.0** is 8x8's omnichannel conversation platform for contact centres. Its APIs let an external system or bot close and transfer conversations, send and receive messages across WhatsApp, SMS, Email and other channels, react to conversation status changes, and export historical data.

Converse 2.0 was formerly known as **Moobidesk Enterprise**. Hostnames still use the `moobidesk.com` domain.

> 📘
>
> To get access to Converse 2.0, please reach out to your account manager ([cpaas-sales@8x8.com](mailto:cpaas-sales@8x8.com)). Your `apiKey` and `apiSecret` are issued by 8x8 — there is no self-service signup.
>

### The APIs

APIs you call are documented as an interactive reference. APIs that call you are webhooks, documented as pages like this one.

| API | What it does |
|:----|:-------------|
| [Conversation API](/converse/reference/close-conversation) | Close a conversation, transfer it, or list a contact's active conversations. |
| [MT Messaging API](/converse/reference/send-mt-message) | Send an outbound message to a customer. |
| [Conversation Status Update Notification](/converse/docs/conversation-status-update-notification) | Be notified when a conversation opens, is assigned, is read, or closes. Webhook. |
| [Bot integration](/converse/docs/bot-integration) | Connect a bot as an agent. Webhook plus the Bot Response API. |
| [Reporting API](/converse/reference/get-conversations-report) | Export conversation, message and agent data. |
| [Setup API](/converse/reference/list-channel-accounts) | Look up the channel accounts, agents, queues and dispositions the other APIs need. |

### Start with the Setup API

Nearly every Converse 2.0 operation requires a UUID that only your tenant configuration can supply:

| To do this | You need | Get it from |
|:-----------|:---------|:------------|
| Send a message | `channelAccountUUID` | [List channel accounts](/converse/reference/list-channel-accounts) |
| Close a conversation | `dispositionUUID` | [List queues](/converse/reference/list-queues) with `disposition: true` |
| Transfer a conversation | `queueUUID`, `agentUUID` | [List queues](/converse/reference/list-queues), [List agents](/converse/reference/list-agents) |

Call the [Setup API](/converse/reference/list-channel-accounts) first and cache what it returns.

### Base URLs

Converse 2.0 is served from two hosts, and which one an operation uses is not predictable from its path. Each operation's reference page states its host.

```text
https://api18.moobidesk.com
https://e18.moobidesk.com
```

### Authentication

Every API is authenticated with an `apiKey` / `apiSecret` pair issued by 8x8. **Where they go depends on the API** — Converse 2.0 predates 8x8's `x-api-key` header convention and does not use it.

| API | How credentials are sent |
|:----|:-------------------------|
| Conversation, Reporting, Setup | `apiKey` and `apiSecret` as properties of the JSON request body |
| MT Messaging | `apiKey` as a **URL path segment**, `apiSecret` in the request body |
| Bot Response | A short-lived `{token}` in the URL. No key or secret |
| Notification webhooks | Converse 2.0 sends credentials **to you**, for you to verify |

> 🚧
>
> The MT Messaging API carries your `apiKey` in the request URL, where it can be captured by proxy and server access logs. Restrict who can read logs for systems that call it, and treat both credentials as secrets. Never log `apiKey`, `apiSecret`, `botApiKey`, `botApiSecret`, or a Bot Response callback URL.
>

### Response envelope

The Conversation, Reporting and Setup APIs share one envelope:

```json title="Success"
{ "status": "Ok", "message": "Success" }
```

```json title="Failure"
{ "status": "Failed", "message": "<error_message>" }
```

> 🚧
>
> **A rejected request is still returned with HTTP 200 and `status: "Failed"`.** Check the `status` property — do not rely on the HTTP status code alone. The Bot Response API is the exception: it uses real HTTP status codes and a `success` boolean.
>

### Conventions

- All UUIDs are strings, and all timestamps are ISO 8601.
- Numeric values are sent as strings where precision matters.
- Reporting operations page at 100 records per page. The other APIs do not paginate.
- Outbound APIs describe attachments with `contentType` and a coarse group — `image`, `video`, `audio` or `file`. Inbound webhooks use a different field name and a full MIME type, so do not pass an inbound attachment object straight back to an outbound API.
