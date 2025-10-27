# `voicemail-terminated-cc-v1` Event

The `voicemail-terminated-cc-v1` event is published after a voicemail interaction is terminated in the 8x8 Contact Center agent panel.

## Properties

*Object containing the following properties:*

| Property                  | Description                                           | Type                                                                                                                                                                                                                                                                                                                                                                                                             |
| :------------------------ | :---------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`** (\*)      | Name of the event                                     | `'terminated'`                                                                                                                                                                                                                                                                                                                                                                                                   |
| **`eventId`** (\*)        | Unique Id generated for each event at runtime         | `string`                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`method`** (\*)         | Events published to third party are named as mapEvent | `'mapEvent'`                                                                                                                                                                                                                                                                                                                                                                                                     |
| **`direction`** (\*)      | Shows direction of interaction                        | `'inbound' \| 'outbound'`                                                                                                                                                                                                                                                                                                                                                                                        |
| **`media`** (\*)          | The media type, here it is voicemail                  | `'voicemail'`                                                                                                                                                                                                                                                                                                                                                                                                    |
| **`searchContext`** (\*)  | Holds phone number of interaction                     | `string`                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`startTime`** (\*)      | Start time of the voicemail                           | `string`                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`endTime`** (\*)        | End time of the voicemail                             | `string`                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`callDuration`** (\*)   | Duration of the voicemail in seconds                  | `string`                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`callingName`** (\*)    | Name of the caller                                    | `string`                                                                                                                                                                                                                                                                                                                                                                                                         |
| **`additionalData`** (\*) | Holds additional data related to voicemail            | *Object with properties:*<ul><li>**`disposition_code`** (\*): `string` - disposition_code selected by agent after listening to voicemail</li><li>`lastTclCodeShort`: `string` - lastTclCodeShort is an optional field</li><li>`lastTclCodeDesc`: `string` - lastTclCodeDesc is an optional field</li><li>`notes`: `string` - notes taken during voicemail or after voicemail ends is an optional field</li></ul> |
| **`schemaVersion`** (\*)  | Current schema version of the event                   | `'1.0.0'`                                                                                                                                                                                                                                                                                                                                                                                                        |

*(\*) Required.*

## Event Emission

The `voicemail-terminated-cc-v1` event is emitted by the 8x8 Mashell UI component when an inbound or outbound voice call ends.

## Listeners

The event is consumed by the third-party system, which processes it accordingly.

## Additional Information

Sample Event Payload:

```json
{
  eventType: "mashell-voicemail-terminated-cc-event-v1",
  status: "success",
  data: {
    eventName: 'terminated',
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
      disposition_code: '1000',
      lastTclCodeShort: '',
      lastTclCodeDesc: '',
      notes: ''
    }
  }
}
```
