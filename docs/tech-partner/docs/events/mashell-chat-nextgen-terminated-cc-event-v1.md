# `chat-nextgen-terminated-cc-v1` Event

The `chat-nextgen-terminated-cc-v1` event is triggered when a chat-nextgen (sms or WhatsApp) ends, after the wrap-up process in the 8x8 Contact Center agent panel.

## Properties

*Object containing the following properties:*

| Property                  | Description                                                                                                                                       | Type                                                                                                                                           |
| :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`** (\*)      | Name of the event                                                                                                                                 | `'terminated'`                                                                                                                                 |
| **`eventId`** (\*)        | Unique Id generated for each event at runtime                                                                                                     | `string`                                                                                                                                       |
| **`method`** (\*)         |  Events published to third party are named as mapEvent                                                                                            | `'mapEvent'`                                                                                                                                   |
| **`direction`** (\*)      |  When an agent sends or receives SMS from a customer OR when an agent receives <br /> Whatsapp from a customer.here it can be inbound or outbound | `'inbound' \| 'outbound'`                                                                                                                      |
| **`media`** (\*)          |  Media is chat for chatnextgen                                                                                                                    | `'chat'`                                                                                                                                       |
| **`mediaType`** (\*)      |  Type of chat - sms or whatsapp                                                                                                                   | `'sms' \| 'whatsapp'`                                                                                                                          |
| **`searchContext`** (\*)  |  It will hold the customer's contact number                                                                                                       | `string`                                                                                                                                       |
| **`endTime`** (\*)        | Timestamp when  agent terminated the chat                                                                                                         | `string`                                                                                                                                       |
| **`additionalData`** (\*) | It will hold customer details like description                                                                                                    | *Object with properties:*<ul><li>**`description`** (\*): `string` - It will hold chat transcription between customer and agent<br /></li></ul> |
| **`schemaVersion`** (\*)  | Current schema version of the event                                                                                                               | `'1.0.0'`                                                                                                                                      |

*(\*) Required.*

## Event Emission

The `chat-nextgen-terminated-cc-v1` event is emitted by the 8x8 Mashell UI component when a chat-nextgen (sms or whatsapp) ends.

## Listeners

The event is consumed by the third-party system, which processes it accordingly.

## Additional Information

Sample event payload:

```json
{
  eventType: "mashell-chat-nextgen-terminated-cc-event-v1",
  status: "success",
  data: {
    eventName: 'terminated',
    eventId: 'eventIDString',
    method: 'mapEvent',
    direction: 'inbound/outbound',
    media: 'chat',
    mediaType: 'sms/whatsapp',
    searchContext: '+1234567890',
    endTime: '1750053834829',
    additionalData: {
      description: 'chat transcript between agent and customer'
    }
  }
}

```
