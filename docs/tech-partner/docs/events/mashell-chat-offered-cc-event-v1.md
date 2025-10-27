# `chat-offered-cc-v1` Event

The `chat-offered-cc-v1` event is triggered when a web chat is initiated, before the chat is accepted in the 8x8 Contact Center agent panel.

## Properties

*Object containing the following properties:*

| Property                  | Description                                            | Type                                                                                                                            |
| :------------------------ | :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| **`eventName`** (\*)      | Name of the event                                      | `'offered'`                                                                                                                     |
| **`eventId`** (\*)        | Unique identifier for the event                        | `string`                                                                                                                        |
| **`method`** (\*)         | Method used to generate the event                      | `'mapEvent'`                                                                                                                    |
| **`direction`** (\*)      | When agent receives a web chat from customer - inbound | `'inbound' \| 'outbound'`                                                                                                       |
| **`media`** (\*)          | Type of media, in this case, chat                      | `'chat'`                                                                                                                        |
| **`mediaType`** (\*)      | Type of media, in this case, web_chat                  | `'web_chat'`                                                                                                                    |
| **`searchContext`** (\*)  | Context for searching the event                        | `string`                                                                                                                        |
| **`additionalData`** (\*) | It will hold customer details like name                | *Object with properties:*<ul><li>**`name`** (\*): `string` - Customer name provided while initiating chat by customer</li></ul> |
| **`schemaVersion`** (\*)  | Current schema version of the event                    | `'1.0.0'`                                                                                                                       |

*(\*) Required.*

## Event Emission

The `chat-offered-cc-v1` event is emitted by the 8x8 Mashell UI component when a web chat is initiated

## Listeners

The event is consumed by the third-party system, which processes it accordingly.

## Additional Information

Sample event payload:

```json
{
  eventType: "mashell-chat-offered-cc-event-v1",
  status: "success",
  data: {
    eventName: 'offered',
    eventId: 'eventIDString',
    method: 'mapEvent',
    direction: 'inbound',
    media: 'chat',
    mediaType: 'web_chat',
    searchContext: 'test@email.com',
    additionalData: {
      name: 'test user'
    }
  }
}
```
