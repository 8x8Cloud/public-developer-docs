# `voice-phone-terminated-uc-v1` Event

The `voice-phone-terminated-uc-v1` event is triggered when an inbound or outbound voice call ends in the 8x8 UC agent panel.

## Properties

*Object containing the following properties:*

| Property                 | Description                                                         | Type                      |
| :----------------------- | :------------------------------------------------------------------ | :------------------------ |
| **`eventName`** (\*)     | Name of the event                                                   | `'terminated'`            |
| **`eventId`** (\*)       | Unique Id generated for each event at runtime                       | `string`                  |
| **`method`** (\*)        | Events published to third party are named as mapEvent               | `'mapEvent'`              |
| **`direction`** (\*)     | Shows direction of interaction inbound or outbound                  | `'inbound' \| 'outbound'` |
| **`media`** (\*)         | The media type, here it is phone                                    | `'phone'`                 |
| **`searchContext`** (\*) | Holds phone number of inbound/outbound call                         | `string`                  |
| **`startTime`** (\*)     | Start time of the call                                              | `string`                  |
| **`endTime`** (\*)       | End time of the call                                                | `string`                  |
| **`callDuration`** (\*)  | Duration of the call in seconds                                     | `string`                  |
| `callRecording`          | Shows url of downloadable call recording if call was being recorded | `string`                  |
| **`hasRecording`** (\*)  | Shows if call was recorded                                          | `boolean`                 |
| **`schemaVersion`** (\*) | Current schema version of the event                                 | `'1.0.0'`                 |

*(\*) Required.*

## Event Emission

The `voice-phone-terminated-uc-v1` event is emitted by the 8x8 Mashell UI component when an inbound or outbound voice call ends. It is consumed by third-party system for further processing.

## Listeners

The event is consumed by the third-party system, which processes it accordingly.

## Additional Information

Sample Event Payload:

```json
{
  eventType: "mashell-voice-phone-terminated-uc-event-v1",
  status: "success",
  data: {
    eventName: 'terminated',
    eventId: 'eventIdString',
    method: 'mapEvent',
    direction: 'inbound/outbound',
    media: 'phone',
    searchContext: '+1234567890',
    startTime: '1751445666638',
    endTime: '1751445695892',
    callDuration: '00:00:22',
    callRecording: '',
    hasRecording: true/false
  }
}
```
