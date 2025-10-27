# `chat-nextgen-accepted-cc-v1` Event

The `chat-nextgen-accepted-cc-v1` event is triggered when a chat-nextgen (sms or WhatsApp) is accepted in the 8x8 Contact Center agent panel.

## Properties

*Object containing the following properties:*

| Property                 | Description                                                                                                                                      | Type                      |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------ |
| **`eventId`** (\*)       | Unique Id generated for each event at runtime                                                                                                    | `string`                  |
| **`method`** (\*)        | Events published to third party are named as mapEvent                                                                                            | `'mapEvent'`              |
| **`direction`** (\*)     | When an agent sends or receives SMS from a customer OR when an agent receives <br /> Whatsapp from a customer.here it can be inbound or outbound | `'inbound' \| 'outbound'` |
| **`media`** (\*)         | Media is chat for chatnextgen                                                                                                                    | `'chat'`                  |
| **`mediaType`** (\*)     | Media subtype ‘sms’ for SMS media type and ‘whatsapp’ for Whatsapp media type                                                                    | `'sms' \| 'whatsapp'`     |
| **`searchContext`** (\*) | It will hold the customer's contact number                                                                                                       | `string`                  |
| **`eventName`** (\*)     | Name of the event                                                                                                                                | `'accepted'`              |
| **`schemaVersion`** (\*) | Current schema version of the event                                                                                                              | `'1.0.0'`                 |

*(\*) Required.*

## Event Emission

The `chat-nextgen-accepted-cc-v1` event is emitted by the 8x8 Mashell UI component when a chat-nextgen (sms or whatsapp) is accepted.

## Listeners

The event is consumed by the third-party system, which processes it accordingly.

## Additional Information

Sample event payload:

```json
{
  eventType: "mashell-chat-nextgen-accepted-cc-event-v1",
  status: "success",
  data: {
    eventName: 'accepted',
    eventId: 'eventIDString',
    method: 'mapEvent',
    direction: 'inbound/outbound',
    media: 'chat',
    mediaType: 'sms/whatsapp',
    searchContext: '+1234567890'
  }
}
```
