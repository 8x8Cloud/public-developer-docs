# `voice-phone-offered-cc-v1` Event

The `voice-phone-offered-cc-v1` event is triggered when an inbound or outbound voice call is initiated before the call is accepted in the agent panel. This event is also triggered when a manual search is performed in the 8x8 Contact Center agent panel.

## Properties

*Object containing the following properties:*

| Property                 | Description                                           | Type                      |
| :----------------------- | :---------------------------------------------------- | :------------------------ |
| **`eventName`** (\*)     | Name of the event                                     | `'offered'`               |
| **`eventId`** (\*)       | Unique Id generated for each event at runtime         | `string`                  |
| **`method`** (\*)        | Events published to third party are named as mapEvent | `'mapEvent'`              |
| **`direction`** (\*)     | Shows direction of interaction inbound or outbound    | `'inbound' \| 'outbound'` |
| **`media`** (\*)         | The media type, here it is phone                      | `'phone'`                 |
| **`searchContext`** (\*) | Holds phone number of inbound/outbound call           | `string`                  |
| **`schemaVersion`** (\*) | Current schema version of the event                   | `'1.0.0'`                 |

*(\*) Required.*

## Event Emission

The `voice-phone-offered-cc-v1` event is emitted by the Mashell UI component when an inbound or outbound voice call is initiated.

## Listeners

The event is consumed to by the third-party system, which processes it accordingly.

## Additional Information

Sample Event Payload:

```json
{
  eventType: "mashell-voice-phone-offered-cc-event-v1",
  status: "success",
  data: {
    eventName: 'offered',
    eventId: 'eventIdString',
    method: 'mapEvent',
    direction: 'inbound/outbound',
    media: 'phone',
    searchContext: '+1234567890'
  }
}
```
