# `voice-phone-completed-cc-v1` Event

The `voice-phone-completed-cc-v1` event is published when a phone interaction is concluded but not yet terminated from the 8x8 Contact Center agent panel.

## Properties

*Object containing the following properties:*

| Property                 | Description                                                                                                                                               | Type                                                                                                             |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| **`eventName`** (\*)     | Name of the event                                                                                                                                         | `'completed'`                                                                                                    |
| **`eventId`** (\*)       | Unique Id generated for each event at runtime                                                                                                             | `string`                                                                                                         |
| **`method`** (\*)        | Events published to third party are named as mapEvent                                                                                                     | `'mapEvent'`                                                                                                     |
| **`direction`** (\*)     | Shows direction of interaction inbound or outbound                                                                                                        | `'inbound' \| 'outbound'`                                                                                        |
| **`media`** (\*)         | The media type, here it is phone                                                                                                                          | `'phone'`                                                                                                        |
| **`searchContext`** (\*) | Holds phone number of inbound/outbound call                                                                                                               | `string`                                                                                                         |
| **`startTime`** (\*)     | Holds the timestamp when the call was initiated.                                                                                                          | `string`                                                                                                         |
| **`endTime`** (\*)       | It will hold the timestamp when the call was ended.                                                                                                       | `string`                                                                                                         |
| **`callDuration`** (\*)  | Total duration of the call in seconds.                                                                                                                    | `string`                                                                                                         |
| `callRecording`          | Shows url of downloadable call recording if call was being recorded                                                                                       | `string`                                                                                                         |
| **`hasRecording`** (\*)  | Shows if call was recorded.                                                                                                                               | `boolean`                                                                                                        |
| `additionalData`         | Holds notes taken during call or after call ends.If the notes field isn't present <br /> additionalData object also won't be present in the  event object | *Object with properties:*<ul><li>`notes`: `string` - Holds notes taken during call or after call ends.</li></ul> |
| **`schemaVersion`** (\*) | Current schema version of the event                                                                                                                       | `'1.0.0'`                                                                                                        |

*(\*) Required.*

## Event Emission

The `voice-phone-completed-cc-v1` event is emitted by the 8x8 Mashell UI component when an inbound or outbound voice call is completed.

## Listeners

The event is consumed by the third-party system, which processes it accordingly.

## Additional Information

Sample Event Payload:

```json
{
  eventType: "mashell-voice-phone-completed-cc-event-v1",
  status: "success",
  data: {
    eventName: 'completed',
    eventId: 'eventIdString',
    method: 'mapEvent',
    direction: 'inbound/outbound',
    media: 'phone',
    searchContext: '+1234567890',
    startTime: '1751445666638',
    endTime: '1751445695892',
    callDuration: '00:00:22',
    callRecording: '',
    hasRecording: true/false,
    additionalData: {
      notes: ''
    }
  }
}
```
