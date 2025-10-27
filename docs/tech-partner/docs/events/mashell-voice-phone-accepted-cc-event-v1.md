# `voice-phone-accepted-cc-v1` Event

The `voice-phone-accepted-cc-v1` event is triggered when an inbound or outbound voice call is accepted in the 8x8 Contact Center agent panel.

## Properties

*Object containing the following properties:*

| Property                 | Description                                           | Type                      |
| :----------------------- | :---------------------------------------------------- | :------------------------ |
| **`eventId`** (\*)       | Unique Id generated for each event at runtime         | `string`                  |
| **`method`** (\*)        | Events published to third party are named as mapEvent | `'mapEvent'`              |
| **`direction`** (\*)     | Shows direction of interaction inbound or outbound    | `'inbound' \| 'outbound'` |
| **`media`** (\*)         | The media type, here it is phone                      | `'phone'`                 |
| **`searchContext`** (\*) | Holds phone number of inbound/outbound call           | `string`                  |
| **`eventName`** (\*)     | Name of the event                                     | `'accepted'`              |
| **`schemaVersion`** (\*) | Current schema version of the event                   | `'1.0.0'`                 |

*(\*) Required.*

## Event Emission

The `voice-phone-accepted-cc-v1` event is published when a phone interaction is accepted from the CC agent panel.

## Listeners

The event is consumed by the 3rd party CRM, which processes it accordingly.

## Additional Information

Sample Event Payload:

```json
{
  eventType: "mashell-voice-phone-accepted-cc-event-v1",
  status: "success",
  data: {
    eventName: 'accepted',
    eventId: 'eventIdString',
    method: 'mapEvent',
    direction: 'inbound/outbound',
    media: 'phone',
    searchContext: '+1234567890'
  }
}
```
