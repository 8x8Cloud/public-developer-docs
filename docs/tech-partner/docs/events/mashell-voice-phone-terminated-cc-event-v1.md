# `voice-phone-terminated-cc-v1` Event

The `voice-phone-terminated-cc-v1` event is triggered when an inbound or outbound voice call ends, after the wrap-up process in the 8x8 Contact Center agent panel.

## Properties

*Object containing the following properties:*

| Property                  | Description                                                         | Type                                                                                                                                                                                                                                                                                                                                    |
| :------------------------ | :------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`** (\*)      | Name of the event                                                   | `'terminated'`                                                                                                                                                                                                                                                                                                                          |
| **`eventId`** (\*)        | Unique Id generated for each event at runtime                       | `string`                                                                                                                                                                                                                                                                                                                                |
| **`method`** (\*)         | Events published to third party are named as mapEvent               | `'mapEvent'`                                                                                                                                                                                                                                                                                                                            |
| **`direction`** (\*)      | Shows direction of interaction inbound or outbound                  | `'inbound' \| 'outbound'`                                                                                                                                                                                                                                                                                                               |
| **`media`** (\*)          | The media type, here it is phone                                    | `'phone'`                                                                                                                                                                                                                                                                                                                               |
| **`searchContext`** (\*)  | Holds phone number of inbound/outbound call                         | `string`                                                                                                                                                                                                                                                                                                                                |
| **`startTime`** (\*)      | Start time of the call                                              | `string`                                                                                                                                                                                                                                                                                                                                |
| **`endTime`** (\*)        | End time of the call                                                | `string`                                                                                                                                                                                                                                                                                                                                |
| **`callDuration`** (\*)   | Duration of the call in seconds                                     | `string`                                                                                                                                                                                                                                                                                                                                |
| `callRecording`           | Shows url of downloadable call recording if call was being recorded | `string`                                                                                                                                                                                                                                                                                                                                |
| **`hasRecording`** (\*)   | Shows if call was recorded                                          | `boolean`                                                                                                                                                                                                                                                                                                                               |
| **`additionalData`** (\*) | Holds additional data related to call                               | *Object with properties:*<ul><li>**`disposition_code`** (\*): `string` - disposition_code is a mandatory field while others are optional.</li><li>`lastTclCodeShort`: `string` - lastTclCodeShort is optional</li><li>`lastTclCodeDesc`: `string` - lastTclCodeDesc is optional</li><li>`notes`: `string` - notes is optional</li></ul> |
| **`schemaVersion`** (\*)  | Current schema version of the event                                 | `'1.0.0'`                                                                                                                                                                                                                                                                                                                               |

*(\*) Required.*

## Event Emission

The `voice-phone-terminated-cc-v1` event is emitted by the Mashell UI component when an inbound or outbound voice call ends. It is consumed by a third-party system for further processing.

## Listeners

The event is consumed by the third-party system, which processes it accordingly.

## Additional Information

Sample Event Payload:

```json
{
  eventType: "mashell-voice-phone-terminated-cc-event-v1",
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
    hasRecording: true/false,
    additionalData: {
      disposition_code: '1000',
      lastTclCodeShort: '',
      lastTclCodeDesc: '',
      notes: ''
    }
  }
}
```
