# call-manager-call-conference-drop-v1

Event emitted when a participant is dropped from a conference call

## Emitter

- Call Manager (`call-manager`)

## Listener

Applications consuming call lifecycle events

## Event dictionary

The event dictionary can be browsed here: [call-manager-call-conference-drop-v1](https://oxygen-dev.8x8.com/events/latest/modules/callManager.callConferenceDropV1.html)

## Payloads

### Payload v1.0.0

Payload schema:

```typescript
const CallConferenceDropPayloadSchema = z.object({
    /** Array of remaining normalized call objects after the drop (minimum 1) */
    calls: z.array(NormalizedCallObjectSchema).min(1),
    schemaVersion: z.literal("1.0.0"),
});
```

The `calls` array contains `NormalizedCallObject` items (see `src/callManager/schemas/NormalizedCallObjectSchema.ts`) with call state properties such as `callID`, `eCallState`, `phoneNumber`, `name`, `inboundCall`, call permissions, and metadata fields.

Payload example:

```typescript
const payload = {
    calls: [
        {
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
            allowHold: true,
            allowJoin: false,
            allowMoveToJm: true,
            allowNone: false,
            allowPark: true,
            allowRecord: true,
            allowReject: false,
            allowRetrieve: false,
            allowTransfer: true,
            cSessionId: "27f0da9e-010c-47a8-9c4d-16063ac1e24c",
            callHoldTime: 0,
            callID: "11400c1d000",
            callIncomingTime: 0,
            callParkExt: "",
            callStartTime: 1771343905,
            callUserUUID: "",
            calledDNIS: "",
            ccCall: false,
            ccQueueName: "",
            eCallState: "VOC_CALL_CONNECT",
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
        },
    ],
    schemaVersion: "1.0.0",
}
```
