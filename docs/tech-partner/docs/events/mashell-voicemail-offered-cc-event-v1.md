# `voicemail-offered-cc-v1` Event

The `voicemail-offered-cc-v1` event is triggered when a voicemail interaction is received on the 8x8 Contact Center agent panel

## Properties

*Object containing the following properties:*

| Property                 | Description                                           | Type                      |
| :----------------------- | :---------------------------------------------------- | :------------------------ |
| **`eventName`** (\*)     | Name of the event                                     | `'offered'`               |
| **`eventId`** (\*)       | Unique Id generated for each event at runtime         | `string`                  |
| **`method`** (\*)        | Events published to third party are named as mapEvent | `string`                  |
| **`direction`** (\*)     | Shows direction of interaction inbound or outbound    | `'inbound' \| 'outbound'` |
| **`media`** (\*)         | The media type, here it is voicemail                  | `'voicemail'`             |
| **`searchContext`** (\*) | Holds phone number of interaction                     | `string`                  |
| **`callingName`** (\*)   | Name of the caller                                    | `string`                  |
| **`schemaVersion`** (\*) | Current schema version of the event                   | `'1.0.0'`                 |

*(\*) Required.*

## Event Emission

The `voicemail-offered-cc-v1` event is emitted by the 8x8 Mashell UI component when an inbound or outbound voice call is initiated.

## Listeners

The event is consumed by the third-party system, which processes it accordingly.

## Additional Information

Sample Event Payload:

```json
{
  eventType: "mashell-voicemail-offered-cc-event-v1",
  status: "success",
  data: {
    eventName: 'offered',
    eventId: 'eventIdString',
    method: 'mapEvent',
    direction: 'inbound',
    media: 'voicemail',
    searchContext: '+1234567890',
    callingName: 'Jon Doe'
  }
}
```
