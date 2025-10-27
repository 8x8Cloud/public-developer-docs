# `chat-nextgen-offered-cc-v1` Event

The `chat-nextgen-offered-cc-v1` event is triggered when a chat-nextgen (sms or WhatsApp) is initiated, before the chat is accepted in the 8x8 Contact Center agent panel.

## Properties

*Object containing the following properties:*

| Property                 | Description                                                                                                                                      | Type                      |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------ |
| **`eventName`** (\*)     | Name of the event                                                                                                                                | `'offered'`               |
| **`eventId`** (\*)       | Unique Id generated for each event at runtime                                                                                                    | `string`                  |
| **`method`** (\*)        | Events published to third party are named as mapEvent                                                                                            | `'mapEvent'`              |
| **`direction`** (\*)     | When an agent sends or receives SMS from a customer OR when an agent receives <br /> Whatsapp from a customer.here it can be inbound or outbound | `'inbound' \| 'outbound'` |
| **`media`** (\*)         | Media is chat for chatnextgen                                                                                                                    | `'chat'`                  |
| **`mediaType`** (\*)     | Media subtype ‘sms’ for SMS media type and ‘whatsapp’ for Whatsapp media type                                                                    | `'sms' \| 'whatsapp'`     |
| **`searchContext`** (\*) | It will hold the customer's contact number                                                                                                       | `string`                  |
| **`schemaVersion`** (\*) | Current schema version of the event                                                                                                              | `'1.0.0'`                 |

*(\*) Required.*

## Event Emission

The `chat-nextgen-offered-cc-v1` event is emitted by the 8x8 Mashell UI component when a chat-nextgen (sms or whatsapp) is initiated.

## Listeners

The event is consumed by the third-party system, which processes it accordingly.

## Additional Information

Sample event payload:

```json
{
  eventType: "mashell-chat-nextgen-offered-cc-event-v1",
  status: "success",
  data: {
    eventName: 'offered',
    eventId: 'eventIDString',
    method: 'mapEvent',
    direction: 'inbound/outbound',
    media: 'chat',
    mediaType: 'sms/whatsapp',
    searchContext: '+1234567890'
  }
}
```
