# `voicemail-completed-cc-v1` Event

The `voicemail-completed-cc-v1` event is triggered when a voicemail interaction concludes, before the agent finalizes the wrap-up process in the 8x8 Contact Center agent panel.

## Properties

*Object containing the following properties:*

| Property                 | Description                                           | Type                                                                                                                       |
| :----------------------- | :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`** (\*)     | Name of the event                                     | `'completed'`                                                                                                              |
| **`eventId`** (\*)       | Unique Id generated for each event at runtime.        | `string`                                                                                                                   |
| **`method`** (\*)        | Events published to third party are named as mapEvent | `'mapEvent'`                                                                                                               |
| **`direction`** (\*)     | Shows direction of interaction inbound or outbound    | `'inbound' \| 'outbound'`                                                                                                  |
| **`media`** (\*)         | The media type, here it is voicemail                  | `'voicemail'`                                                                                                              |
| **`searchContext`** (\*) | Holds phone number of interaction                     | `string`                                                                                                                   |
| **`startTime`** (\*)     | Start time of the voicemail                           | `string`                                                                                                                   |
| **`endTime`** (\*)       | End time of the voicemail                             | `string`                                                                                                                   |
| **`callDuration`** (\*)  | Duration of the call in seconds                       | `string`                                                                                                                   |
| **`callingName`** (\*)   | Name of the caller                                    | `string`                                                                                                                   |
| `additionalData`         | Holds additional data for the voicemail event         | *Object with properties:*<ul><li>`notes`: `string` - Holds notes taken during voicemail or after voicemail ends.</li></ul> |
| **`schemaVersion`** (\*) | Current schema version of the event                   | `'1.0.0'`                                                                                                                  |

*(\*) Required.*

## Event Emission

The `voicemail-completed-cc-v1` event is emitted by the Mashell UI component when an inbound or outbound voice call is completed.

## Listeners

The event is consumed by the third-party system, which processes it accordingly.

## Additional Information

Sample Event Payload:

```json
{
  eventType: "mashell-voicemail-completed-cc-event-v1",
  status: "success",
  data: {
    eventName: 'completed',
    eventId: 'eventIdString',
    method: 'mapEvent',
    direction: 'inbound',
    media: 'voicemail',
    searchContext: '+1234567890',
    startTime: '1751445666638',
    endTime: '1751445695892',
    callDuration: '00:00:22',
    callingName: 'Jon Doe',
    additionalData: {
      notes: ''
    }
  }
}
```
