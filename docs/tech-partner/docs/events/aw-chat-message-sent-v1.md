# `chat-message-sent-v1` Event

The `chat-message-sent-v1` event is triggered when the agent sends a chat message during an active chat interaction.

## Properties

*Object containing the following properties:*

| Property                    | Description                          | Type      |
| :-------------------------- | :----------------------------------- | :-------- |
| **`interactionId`** (\*)    | Unique identifier of the interaction  | `string`  |
| **`message`** (\*)          | The chat message that was sent        | *Object — see ChatMessage below* |
| **`schemaVersion`** (\*)    | Current schema version of the event   | `'1.0.0'` |

*(\*) Required.*

### ChatMessage Properties

| Property                              | Description                                           | Type                      |
| :------------------------------------ | :---------------------------------------------------- | :------------------------ |
| **`id`** (\*)                         | Unique message identifier                             | `string`                  |
| **`timestamp`** (\*)                  | Message creation timestamp (epoch ms)                 | `number`                  |
| **`type`** (\*)                       | Message type                                          | `string`                  |
| **`rawMessage`** (\*)                 | Raw message content                                   | `string \| Record<string, string>` |
| `lastUpdatedTimestamp`                | Timestamp of last update (epoch ms)                   | `number`                  |
| `botName`                             | Name of the bot if message is from a bot              | `string`                  |
| `msgStatus`                           | Message delivery status                               | `string`                  |
| `attachments`                         | File attachments                                      | *Array of Attachment*     |
| `translatedMessage`                   | Translated content if translation is enabled          | `string \| null`          |
| `originalMessage`                     | Original content before translation                   | `string`                  |
| `displayName`                         | Sender display name                                   | `string`                  |
| `author`                              | Author details                                        | *Object with `id`, `email`, `name`* |
| `variables`                           | Custom variables                                      | `Record<string, string>`  |
| `resent`                              | Whether the message was resent                        | `boolean`                 |
| `isBot`                               | Whether the message originated from a bot             | `boolean`                 |
| `isDeleted`                           | Whether the message was deleted                       | `boolean`                 |

## Event Emission

The `chat-message-sent-v1` event is emitted by the Agent Workspace MFE whenever the agent sends a message in an active chat interaction.

## Listeners

The event is consumed by third-party integrators that need to track or log outbound chat messages sent by the agent.

## Additional Information

Sample event payload:

```json
{
  "interactionId": "interaction-12345",
  "message": {
    "id": "msg-abc123",
    "timestamp": 1746522286592,
    "type": "text",
    "rawMessage": "Hello, how can I help you today?",
    "displayName": "Agent Name",
    "author": {
      "id": "agent-001",
      "email": "agent@example.com",
      "name": "Agent Name"
    }
  },
  "schemaVersion": "1.0.0"
}
```
