# Webhooks Events Reference

Webhook events are how 8x8 notifies bots or integrations when something happens in a conversation, such as when an agent sends a message, a member joins, or a conversation is transferred.

Events are sent as **`POST`** requests to your webhook endpoint.

## Common event envelope

All webhook events share a common envelope with the following base fields:

| Field | Type | Description |
| --- | --- | --- |
| `eventType` | string | The type of event. Determines the structure of the rest of the payload. |
| `conversationId` | string | The unique identifier of the conversation this event belongs to. |
| `timestamp` | number | Unix timestamp (in milliseconds) of when the event occurred. |

```json
{
  "eventType": "<EVENT_TYPE>",
  "conversationId": "ID-0",
  "timestamp": 1713100000000
}
```

## Events overview

The following table lists the top-level event types that can be sent to your webhook:

| Event | Description |
| --- | --- |
| [**`CONVERSATION_UPDATE`**](#conversation_update) | The conversation state or assignment has changed. |
| [**`QUEUED`**](#queued) | The interaction has been queued for processing. |
| [**`MEMBERS_CHANGED`**](#members_changed) | A participant (agent or user) joined or left the conversation. |
| [**`TRANSFER`**](#transfer) | The conversation was transferred to another queue. |
| [**`MESSAGE`**](#message) | A new message was added to the conversation. |
| [**`ACTIVITY`**](#activity) | A non-message action occurred (typing, adaptive card submission, quick reply, etc.). |
| [**`WEB_HOOK_VERIFY`**](#web_hook_verify) | A verification request to confirm the webhook endpoint is reachable. |

:::note
The **`ACTIVITY`** event type has multiple subtypes differentiated by the `data.name` field. See [Activity events](#activity) for details.
:::

---

## Lifecycle events

### CONVERSATION_UPDATE

| Property | Value |
| --- | --- |
| `eventType` | `CONVERSATION_UPDATE` |
| **Channels** | All |

The **`CONVERSATION_UPDATE`** event is sent whenever the conversation state, assignment, or user information changes. This includes when a conversation is created, becomes active, or goes idle.

#### Data fields

| Field | Type | Description |
| --- | --- | --- |
| `data.state` | string | The current conversation state. One of: `"created"`, `"active"`, `"idle"`. |
| `data.assignment` | object | Information about the current assignment. |
| `data.assignment.id` | string | The identifier of the assigned resource (agent ID, queue ID, or script ID). |
| `data.assignment.type` | string | The assignment type. One of: `"agent"`, `"queue"`, `"script"`. |
| `data.assignment.resourceId` | string | The resource identifier. Optional; included when available. |
| `data.user` | object | Information about the customer/user in the conversation. |
| `data.user.name` | string | The user's display name. |
| `data.user.userId` | string | The user's unique identifier. |
| `data.user.email` | string | The user's email address. |
| `data.user.phone` | string | The user's phone number. |
| `data.user.company` | string | The user's company name. |
| `data.user.caseId` | string | A case identifier associated with the conversation. |
| `data.user.language` | string | The user's language code (e.g., `"en"`). |
| `data.user.ipaddress` | string | The user's IP address (when available). |
| `data.user.timezoneOffset` | number | The user's timezone offset from UTC (when available). |
| `data.user.additionalProperties` | array | A list of custom key-value pairs. Each item has `key`, `value`, and optionally `id`. |
| `data.msisdn` | string | The user's phone number in MSISDN format (for telephony-based channels). |
| `data.channel` | string | The channel display type (e.g., `"WhatsApp"`, `"SMS"`, `"WebChat"`, `"Facebook"`, `"Viber"`, `"RCS"`, `"Email"`, `"ChatAPI"`). |

#### Example

```json
{
  "eventType": "CONVERSATION_UPDATE",
  "conversationId": "ID-0",
  "timestamp": 1713100000000,
  "data": {
    "state": "active",
    "assignment": {
      "type": "agent",
      "id": "agent-abc-123",
      "resourceId": "resource-123"
    },
    "user": {
      "name": "John Doe",
      "userId": "user-456",
      "email": "john@example.com",
      "phone": "+1234567890",
      "company": "Acme Inc.",
      "caseId": "CASE-789",
      "language": "en",
      "ipaddress": "192.168.1.1",
      "timezoneOffset": -300,
      "additionalProperties": [
        {
          "key": "department",
          "value": "support"
        }
      ]
    },
    "msisdn": "+1234567890",
    "channel": "WhatsApp"
  }
}
```

### QUEUED

| Property | Value |
| --- | --- |
| `eventType` | `QUEUED` |
| **Channels** | All |

The **`QUEUED`** event is sent whenever the interaction is being queued for processing.

The `queueId` and `queueName` attributes provide information about the queue in which your conversation is waiting. You can use the queue ID to fetch additional information (e.g., statistical data) about the queue like the **average waiting time in queue** or **queue size**.

#### Data fields

| Field | Type | Description |
| --- | --- | --- |
| `data.queueId` | string | The unique identifier of the queue. |
| `data.queueName` | string | The display name of the queue. |

#### Example

```json
{
  "eventType": "QUEUED",
  "conversationId": "ID-0",
  "timestamp": 1713100000000,
  "data": {
    "queueId": "queue-abc-123",
    "queueName": "Customer Support"
  }
}
```

### MEMBERS_CHANGED

| Property | Value |
| --- | --- |
| `eventType` | `MEMBERS_CHANGED` |
| **Channels** | All |

The **`MEMBERS_CHANGED`** event is sent whenever members other than the bot joined or left the conversation.

An agent **joined** event indicates that the agent has seen the messages that were added to the conversation prior to the integration, and will observe any follow-up messages. An agent **left** event indicates the agent has left the conversation.

#### Data fields

| Field | Type | Description |
| --- | --- | --- |
| `data.memberType` | string | The type of member. One of: `"user"`, `"agent"`. |
| `data.change` | string | The type of change. One of: `"joined"`, `"left"`. |
| `data.id` | string | The identifier of the member who joined or left. For agents, this is the agent ID. |

#### Example

```json
{
  "eventType": "MEMBERS_CHANGED",
  "conversationId": "ID-0",
  "timestamp": 1713100000000,
  "data": {
    "memberType": "agent",
    "change": "joined",
    "id": "agent-abc-123"
  }
}
```

### TRANSFER

| Property | Value |
| --- | --- |
| `eventType` | `TRANSFER` |
| **Channels** | All |

The **`TRANSFER`** event is sent whenever the handling agent transfers the conversation to another queue. This indicates that a [**`MEMBERS_CHANGED`**](#members_changed) event for a `memberType` of `"agent"` with a change of `"left"` does **not** mark the end of the conversation. Another [**`MEMBERS_CHANGED`**](#members_changed) event will follow with a change of `"joined"` for a new agent.

This event does not include a `data` field.

#### Example

```json
{
  "eventType": "TRANSFER",
  "conversationId": "ID-0",
  "timestamp": 1713100000000
}
```

---

## Message events

### MESSAGE

| Property | Value |
| --- | --- |
| `eventType` | `MESSAGE` |
| **Channels** | All |

The **`MESSAGE`** event is sent whenever a participant adds a new message to the conversation. Messages can contain text, attachments, rich cards, or a combination of these.

#### Data fields

| Field | Type | Description |
| --- | --- | --- |
| `data.isEcho` | boolean | `true` if this message was sent by the bot itself (echoed back). |
| `data.sender` | object | Information about who sent the message. |
| `data.sender.id` | string | The sender's identifier. |
| `data.sender.type` | string | The sender's type (e.g., `"agent"`, `"user"`). |
| `data.text` | string | The text content of the message. |
| `data.attachments` | array | A list of file attachments included with the message. |
| `data.attachments[].id` | string | The attachment identifier. |
| `data.attachments[].type` | string | The attachment type (e.g., `"image"`, `"video"`, `"audio"`, `"file"`). |
| `data.attachments[].preSignedUrl` | string | A pre-signed URL to download the attachment. |
| `data.attachments[].fileName` | string | The original file name of the attachment. |
| `data.cards` | array | A list of rich cards (e.g., Adaptive Cards). |
| `data.cards[].contentType` | string | The card format (e.g., `"application/vnd.microsoft.card.adaptive"`). |
| `data.cards[].content` | object | The card content payload. |

#### Example

```json
{
  "eventType": "MESSAGE",
  "conversationId": "ID-0",
  "timestamp": 1713100000000,
  "data": {
    "isEcho": false,
    "sender": {
      "id": "agent-abc-123",
      "type": "agent"
    },
    "text": "Hello, how can I help you?",
    "attachments": [
      {
        "id": "att-001",
        "type": "image",
        "preSignedUrl": "https://storage.example.com/attachments/att-001?signature=abc",
        "fileName": "screenshot.png"
      }
    ],
    "cards": [
      {
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {}
      }
    ]
  }
}
```

---

## Activity events {#activity}

Activity events share the `eventType` value `"ACTIVITY"` but are differentiated by the `data.name` field. Each activity subtype represents a different kind of non-message action.

The common activity envelope looks like this:

```json
{
  "eventType": "ACTIVITY",
  "conversationId": "ID-0",
  "timestamp": 1713100000000,
  "data": {
    "name": "<activity_subtype>",
    "value": {}
  }
}
```

### Typing indicator

| Property | Value |
| --- | --- |
| `data.name` | `typing` |
| **Channels** | WebChat, WhatsApp, RCS, ChatAPI |

The **typing** activity is sent when participants are actively typing in the conversation. If you receive a typing event with an **empty** `users` list, it means the participants stopped typing.

#### Data fields

| Field | Type | Description |
| --- | --- | --- |
| `data.value.users` | array | A list of users who are currently typing. Empty array means typing has stopped. |
| `data.value.users[].id` | string | The identifier of the typing user. |
| `data.value.users[].type` | string | The type of the typing user (e.g., `"agent"`, `"user"`). |

#### Example: Active typing

```json
{
  "eventType": "ACTIVITY",
  "conversationId": "ID-0",
  "timestamp": 1713100000000,
  "data": {
    "name": "typing",
    "value": {
      "users": [
        {
          "type": "agent",
          "id": "agent-abc-123"
        }
      ]
    }
  }
}
```

#### Example: Typing stopped

```json
{
  "eventType": "ACTIVITY",
  "conversationId": "ID-0",
  "timestamp": 1713100000000,
  "data": {
    "name": "typing",
    "value": {
      "users": []
    }
  }
}
```

### Adaptive Card action

| Property | Value |
| --- | --- |
| `data.name` | `adaptiveCard/action` |
| **Channels** | WebChat |

The **Adaptive Card action** activity is sent when a user interacts with an [Adaptive Card (v1.3)](https://adaptivecards.io/). The `type` indicates the kind of action that was triggered, and the `data` object contains the submitted values.

#### Data fields

| Field | Type | Description |
| --- | --- | --- |
| `data.value.type` | string | The action type. One of: `"Action.Submit"`, `"Action.Execute"`. |
| `data.value.data` | object | The data payload submitted by the user through the Adaptive Card. |

#### Example

```json
{
  "eventType": "ACTIVITY",
  "conversationId": "ID-0",
  "timestamp": 1713100000000,
  "data": {
    "name": "adaptiveCard/action",
    "value": {
      "type": "Action.Submit",
      "data": {
        "feedbackRating": 5,
        "comments": "Great service!"
      }
    }
  }
}
```

### Quick Reply action

| Property | Value |
| --- | --- |
| `data.name` | `quickReply/action` |
| **Channels** | WebChat |

The **Quick Reply action** activity is sent when a user selects a quick reply option. The `title` contains the display text the user selected, and the `payload` contains the programmatic identifier.

#### Data fields

| Field | Type | Description |
| --- | --- | --- |
| `data.value.type` | string | The action type. Currently always `"postback"`. |
| `data.value.data.title` | string | The display text of the selected quick reply option. |
| `data.value.data.payload` | string | The programmatic payload identifier of the selected option. |

#### Example

```json
{
  "eventType": "ACTIVITY",
  "conversationId": "ID-0",
  "timestamp": 1713100000000,
  "data": {
    "name": "quickReply/action",
    "value": {
      "type": "postback",
      "data": {
        "title": "Check order status",
        "payload": "order_status"
      }
    }
  }
}
```

### Read receipts

| Property | Value |
| --- | --- |
| `data.name` | `read-receipts` |
| **Channels** | None (not yet supported) |

:::caution
The read receipts event structure is defined in the API but **no channel currently supports sending or displaying read receipts**. This section is provided for reference only.
:::

The **read receipts** activity would be sent when participants read messages in the conversation.

#### Example

```json
{
  "eventType": "ACTIVITY",
  "conversationId": "ID-0",
  "timestamp": 1713100000000,
  "data": {
    "name": "read-receipts",
    "value": [
      {
        "timestamp": 1713100000000,
        "users": [
          {
            "id": "agent-abc-123",
            "type": "agent"
          }
        ]
      }
    ]
  }
}
```

### CPaaS activity

| Property | Value |
| --- | --- |
| `data.name` | Varies by provider |
| **Channels** | WhatsApp, RCS, Viber |

The **CPaaS activity** is sent for channel-specific interactive events from CPaaS providers (WhatsApp, RCS, Viber). The `data.name` and `data.value` structure vary depending on the channel and the type of interaction.

#### Data fields

| Field | Type | Description |
| --- | --- | --- |
| `data.name` | string | A channel-specific activity type identifier. |
| `data.value` | object | The activity payload. Structure varies by channel and activity type. |

#### Example

```json
{
  "eventType": "ACTIVITY",
  "conversationId": "ID-0",
  "timestamp": 1713100000000,
  "data": {
    "name": "interactive/reply",
    "value": {
      "type": "button_reply",
      "button_reply": {
        "id": "btn-1",
        "title": "Yes"
      }
    }
  }
}
```

---

## System events

### WEB_HOOK_VERIFY

When you add a webhook, you receive a **`WEB_HOOK_VERIFY`** verification event to confirm that a server is listening at the webhook address. This prevents typos, invalid URLs, and other issues that may require further troubleshooting.

The server that receives this verification event **must respond with a 2XX status code**.

:::note
This event includes a `notificationVersion` field and does **not** include `conversationId` or `timestamp` fields.
:::

#### Example

```json
{
  "notificationVersion": "Chat Gateway v1.0",
  "eventType": "WEB_HOOK_VERIFY"
}
```
