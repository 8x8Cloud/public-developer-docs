# `chat-completed-cc-v1` Event

The `chat-completed-cc-v1` event is triggered when a web chat concludes, before the agent finalizes the wrap-up process in the 8x8 Contact Center agent panel.

## Properties

*Object containing the following properties:*

| Property                  | Description                                            | Type                                                                                                                                                                                                                                  |
| :------------------------ | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`eventName`** (\*)      | Name of the event                                      | `'completed'`                                                                                                                                                                                                                         |
| **`eventId`** (\*)        | Unique Id generated for each event at runtime          | `string`                                                                                                                                                                                                                              |
| **`method`** (\*)         | Events published to third party are named as mapEvent  | `'mapEvent'`                                                                                                                                                                                                                          |
| **`direction`** (\*)      | When agent receives a web chat from customer - inbound | `'inbound' \| 'outbound'`                                                                                                                                                                                                             |
| **`media`** (\*)          | Media type - chat                                      | `'chat'`                                                                                                                                                                                                                              |
| **`mediaType`** (\*)      | Media subtype - web_chat                               | `'web_chat'`                                                                                                                                                                                                                          |
| **`searchContext`** (\*)  | It will hold customer email for inbound chat.          | `string`                                                                                                                                                                                                                              |
| **`endTime`** (\*)        | Timestamp when  agent ends the chat                    | `string`                                                                                                                                                                                                                              |
| **`additionalData`** (\*) | It will hold customer details like name, description   | *Object with properties:*<ul><li>**`name`** (\*): `string` - Customer name provided while initiating chat by customer</li><li>**`description`** (\*): `string` - It will hold chat transcription between customer and agent</li></ul> |
| **`schemaVersion`** (\*)  | Current schema version of the event                    | `'1.0.0'`                                                                                                                                                                                                                             |

*(\*) Required.*

## Event Emission

The `chat-completed-cc-v1` event is emitted by the 8x8 Mashell UI component when a web chat is completed.

## Listeners

The event is consumed by the third-party system, which processes it accordingly.

## Additional Information

Sample event payload:

```json
{
  eventType: "mashell-chat-completed-cc-event-v1",
  status: "success",
  data: {
    eventName: 'completed',
    eventId: 'eventIDString',
    method: 'mapEvent',
    direction: 'inbound',
    media: 'chat',
    mediaType: 'web_chat',
    searchContext: 'test@email.com',
    endTime: '1750053834823',
    additionalData: {
      name: 'test user',
      description: 'chat transcript between agent and customer'
    }
  }
}
```
