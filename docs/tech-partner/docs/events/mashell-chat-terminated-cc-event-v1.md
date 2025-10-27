# `chat-terminated-cc-v1` Event

The `chat-terminated-cc-v1` event is triggered when a web chat ends, after the wrap-up process in the 8x8 Contact Center agent panel.

## Properties

*Object containing the following properties:*

| Property                  | Description                                                        | Type                                                                                                                                                                                                                                  |
| :------------------------ | :----------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`eventName`** (\*)      | Name of the event                                                  | `'terminated'`                                                                                                                                                                                                                        |
| **`eventId`** (\*)        | Unique Id generated for each event at runtime                      | `string`                                                                                                                                                                                                                              |
| **`method`** (\*)         | Events published to third party are named as mapEvent              | `'mapEvent'`                                                                                                                                                                                                                          |
| **`direction`** (\*)      | When an agent receives web chat from a customer.here it is inbound | `'inbound' \| 'outbound'`                                                                                                                                                                                                             |
| **`media`** (\*)          | Type of media, in this case, chat                                  | `'chat'`                                                                                                                                                                                                                              |
| **`mediaType`** (\*)      | Subtype of media - web_chat                                        | `'web_chat'`                                                                                                                                                                                                                          |
| **`searchContext`** (\*)  | It will hold the customer's email address                          | `string`                                                                                                                                                                                                                              |
| **`endTime`** (\*)        | Timestamp when agent terminated the chat.                          | `string`                                                                                                                                                                                                                              |
| **`additionalData`** (\*) | It will hold customer details like name, description               | *Object with properties:*<ul><li>**`name`** (\*): `string` - Customer name provided while initiating chat by customer</li><li>**`description`** (\*): `string` - It will hold chat transcription between customer and agent</li></ul> |
| **`schemaVersion`** (\*)  | Current schema version of the event                                | `'1.0.0'`                                                                                                                                                                                                                             |

*(\*) Required.*

## Event Emission

The `chat-terminated-cc-v1` event is emitted by the 8x8 Mashell UI component when a web chat ends.

## Listeners

The event is consumed to by the third-party system, which processes it accordingly.

## Additional Information

Sample event payload:

```json
{
  eventType: "mashell-chat-terminated-cc-event-v1",
  status: "success",
  data: {
    eventName: 'terminated',
    eventId: 'eventIDString',
    method: 'mapEvent',
    direction: 'inbound',
    media: 'chat',
    mediaType: 'web_chat',
    searchContext: 'test@email.com',
    endTime: '1750053834829',
    additionalData: {
      name: 'test user',
      description: 'chat transcript between agent and customer'
    }
  }
}

```
