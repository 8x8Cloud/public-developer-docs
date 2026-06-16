# call-manager-call-hold-v1

Event emitted when a call is placed on hold

## Emitter

- Call Manager (`call-manager`)

## Listener

Applications consuming call lifecycle events

## Event dictionary

The event dictionary can be browsed here: [call-manager-call-hold-v1](https://oxygen-dev.8x8.com/events/latest/modules/callManager.callHoldV1.html)

## Payloads

### Payload v1.0.0

Payload schema:

```typescript
const CallHoldPayloadSchema = NormalizedCallObjectSchema.extend({
    schemaVersion: z.literal("1.0.0"),
});
```

The payload extends the shared `NormalizedCallObjectSchema` (see `src/callManager/schemas/NormalizedCallObjectSchema.ts`) which contains call state properties such as `callID`, `eCallState`, `phoneNumber`, `name`, `inboundCall`, call permissions (`allowHold`, `allowTransfer`, etc.), and metadata fields.

Payload example:

```typescript
const payload = {
    accumulatedMOSLQ: -1,
    alertInfoType: "PROTOCOL_ALERT_INFO_UNKNOWN",
    allowAdd: false,
    allowAlternate: false,
    allowAnswer: false,
    allowAnswerConf: false,
    allowAnswerHold: false,
    allowConf: false,
    allowDropconf: false,
    allowEnd: true,
    allowHold: false,
    allowJoin: false,
    allowMoveToJm: false,
    allowNone: false,
    allowPark: false,
    allowRecord: false,
    allowReject: false,
    allowRetrieve: true,
    allowTransfer: false,
    cSessionId: "27f0da9e-010c-47a8-9c4d-16063ac1e24c",
    callHoldTime: 1771344000,
    callID: "11400c1d000",
    callIncomingTime: 0,
    callParkExt: "",
    callStartTime: 1771343905,
    callUserUUID: "",
    calledDNIS: "",
    ccCall: false,
    ccQueueName: "",
    eCallState: "VOC_CALL_HOLD",
    encrypted: true,
    errorCode: 0,
    flipCall: false,
    groupType: "CALL_GROUP_TYPE_NONE",
    hdAudio: true,
    inboundCall: false,
    initialPhoneNumber: "711159",
    jitsiMeetingInviteURL: "",
    name: "",
    phoneNumber: "711159",
    recording: false,
    restoredCall: false,
    sipCallFromTag: "1140727b400-c4ad-14ece590",
    sipCallID: "515c72df-228078e7c00-14ece55d",
    sipCallToTag: "eccc76a9-a5dc-d15b-9e7c-1aab32c5ca34",
    vccAgentCall: false,
    schemaVersion: "1.0.0",
}
```
