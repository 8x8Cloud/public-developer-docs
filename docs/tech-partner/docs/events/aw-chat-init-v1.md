# `chat-init-v1` Event

The `chat-init-v1` event is triggered when a chat interaction is successfully initialized, providing the initial message history.

## Properties

*Object containing the following properties:*

| Property                    | Description                          | Type      |
| :-------------------------- | :----------------------------------- | :-------- |
| **`interactionId`** (\*)    | Unique identifier of the interaction  | `string`  |
| **`messages`** (\*)         | Initial message history for the chat  | *Array of ChatMessage — see below* |
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

The `chat-init-v1` event is emitted by the Agent Workspace MFE when a new chat interaction is opened, delivering the existing message history to the integrator.

## Listeners

The event is consumed by third-party integrators that need to display or process the chat history when a new interaction is initialized.

## Additional Information

Sample event payload:

```json
{
  "interactionId": "interaction-12345",
  "messages": [
    {
      "id": "msg-abc123",
      "timestamp": 1746522286592,
      "type": "text",
      "rawMessage": "Hi, I need help with my account",
      "displayName": "Customer Name",
      "author": {
        "id": "customer-001",
        "email": "customer@example.com",
        "name": "Customer Name"
      },
      "isBot": false
    }
  ],
  "schemaVersion": "1.0.0"
}
```
