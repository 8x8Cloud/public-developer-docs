# `voice-phone-accepted-uc-v1` Event

The `voice-phone-accepted-uc-v1` event is triggered when an inbound or outbound voice call is accepted in the 8x8 UC agent panel.

## Properties

*Object containing the following properties:*

| Property                 | Description                                             | Type                      |
| :----------------------- | :------------------------------------------------------ | :------------------------ |
| **`eventId`** (\*)       | Unique Id generated for each event at runtime           | `string`                  |
| **`method`** (\*)        | Events published to third party are named as mapEvent   | `'mapEvent'`              |
| **`direction`** (\*)     | Shows direction of interaction inbound or outbound      | `'inbound' \| 'outbound'` |
| **`media`** (\*)         | The media type, here it is phone                        | `'phone'`                 |
| **`searchContext`** (\*) | Holds phone number of inbound/outbound call             | `string`                  |
| **`startTime`** (\*)     | It will hold the timestamp when the call was initiated. | `string`                  |
| **`eventName`** (\*)     | Name of the event                                       | `'accepted'`              |
| **`schemaVersion`** (\*) | Current schema version of the event                     | `'1.0.0'`                 |

*(\*) Required.*

## Event Emission

The `voice-phone-accepted-uc-v1` event is emitted by the 8x8 Mashell UI component when an inbound or outbound voice call is accepted from the UC agent panel

## Listeners

The event is consumed by the third-party system, which processes it accordingly.

## Additional Information

Sample Event Payload:

```json
{
  eventType: "mashell-voice-phone-accepted-uc-event-v1",
  status: "success",
  data: {
    eventName: 'accepted',
    eventId: 'eventIdString',
    method: 'mapEvent',
    direction: 'inbound/outbound',
    media: 'phone',
    searchContext: '+1234567890',
    startTime: '1751445666638'
  }
}
```
