# `voicemail-accepted-cc-v1` Event

The `voicemail-accepted-cc-v1` event is triggered when a voicemail is accepted (after call interaction on the voicemail number is rejected) in the 8x8 Contact Center agent panel.

## Properties

*Object containing the following properties:*

| Property                 | Description                                           | Type                      |
| :----------------------- | :---------------------------------------------------- | :------------------------ |
| **`eventId`** (\*)       | Unique Id generated for each event at runtime         | `string`                  |
| **`method`** (\*)        | Events published to third party are named as mapEvent | `string`                  |
| **`direction`** (\*)     | Shows direction of interaction inbound or outbound    | `'inbound' \| 'outbound'` |
| **`media`** (\*)         | The media type, here it is voicemail                  | `'voicemail'`             |
| **`searchContext`** (\*) | Holds phone number of interaction                     | `string`                  |
| **`callingName`** (\*)   | Name of the caller                                    | `string`                  |
| **`eventName`** (\*)     | Name of the event                                     | `'accepted'`              |
| **`schemaVersion`** (\*) | Current schema version of the event                   | `'1.0.0'`                 |

*(\*) Required.*

## Event Emission

The `voicemail-accepted-cc-v1` event is emitted by the 8x8 Mashell UI component when an inbound or outbound voice call is accepted.

## Listeners

The event is consumed by the third-party system, which processes it accordingly.

## Additional Information

Sample event payload:

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
