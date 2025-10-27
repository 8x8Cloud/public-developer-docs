# `chat-nextgen-completed-cc-v1` Event

The `chat-nextgen-completed-cc-v1` event is triggered when a chat-nextgen (sms or WhatsApp) concludes, before the agent finalizes the wrap-up process in the 8x8 Contact Center agent panel.

## Properties

*Object containing the following properties:*

| Property                  | Description                                                                                                                                    | Type                                                                                                                                     |
| :------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`** (\*)      | Name of the event                                                                                                                              | `'completed'`                                                                                                                            |
| **`eventId`** (\*)        | Unique identifier for the event                                                                                                                | `string`                                                                                                                                 |
| **`method`** (\*)         | Events published to third party are named as mapEvent                                                                                          | `'mapEvent'`                                                                                                                             |
| **`direction`** (\*)      | When an agent sends or receives SMS from a customer OR when an agent receives Whatsapp <br /> from a customer. here it can be inbound/outbound | `'inbound' \| 'outbound'`                                                                                                                |
| **`media`** (\*)          | Type of media, here it is chat                                                                                                                 | `'chat'`                                                                                                                                 |
| **`mediaType`** (\*)      | Type of chat media, here it can be sms/whatsapp                                                                                                | `'sms' \| 'whatsapp'`                                                                                                                    |
| **`searchContext`** (\*)  | It will hold the customer's contact number                                                                                                     | `string`                                                                                                                                 |
| **`endTime`** (\*)        | The time when the chat ends                                                                                                                    | `string`                                                                                                                                 |
| **`additionalData`** (\*) | It will hold customer details like description                                                                                                 | *Object with properties:*<ul><li>**`description`** (\*): `string` - It will hold chat transcription between customer and agent</li></ul> |
| **`schemaVersion`** (\*)  | Current schema version of the event                                                                                                            | `'1.0.0'`                                                                                                                                |

*(\*) Required.*

## Event Emission

The `chat-nextgen-completed-cc-v1` event is emitted by the 8x8 Mashell UI component when a chat-nextgen (sms or whatsapp) is completed.

## Listeners

The event is consumed by the third-party system, which processes it accordingly.

## Additional Information

Sample Event Payload:

```json
{
  eventType: "mashell-chat-nextgen-completed-cc-event-v1",
  status: "success",
  data: {
    eventName: 'completed',
    eventId: 'eventIDString',
    method: 'mapEvent',
    direction: 'inbound/outbound',
    media: 'chat',
    mediaType: 'sms/whatsapp',
    searchContext: '+1234567890',
    endTime: '1750053834820',
    additionalData: {
      description: 'chat transcript between agent and customer'
    }
  }
}
```

Event Attribute details

| Event attribute | Data Type | Optional | Default value                               | Description |
|-----------------|-----------|----------|---------------------------------------------|--------------|
| `eventType` | string | No | mashell-chat-nextgen-completed-cc-event-v1  | Name of event type |
| `status` | string | No | success / failed                            | Status of the event which is emitted from MaestroSDK is successful or failed |
| `data` | object | No | -                                           | Holds details of event |
| `eventName` | string | No | completed                                   | Name of the event |
| `eventId` | string | No | -                                           | Unique identifier for the event |
| `method` | string | No | mapEvent                                    | Events published to third party are named as mapEvent |
| `direction` | string | No | inbound / outbound                          | When an agent sends or receives SMS from a customer OR when an agent receives Whatsapp from a customer. here it can be inbound/outbound |
| `media` | string | No | chat                                        | Type of media, here it is chat |
| `mediaType` | string | No | sms / whatsapp                              | Type of chat media, here it can be sms/whatsapp |
| `searchContext` | string | No | -                                           | It will hold the customer's contact number |
| `endTime` | string | No | -                                           | The time when the chat ends |
| `additionalData` | object | No | -                                           | It will hold customer details like description |
| `description` | string | No | -                                           | It will hold chat transcription between customer and agent |
| `schemaVersion` | string | No | 1.0.0                                       | Current schema version of the event |
