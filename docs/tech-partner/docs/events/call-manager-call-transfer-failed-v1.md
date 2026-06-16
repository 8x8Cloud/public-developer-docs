# call-manager-call-transfer-failed-v1

Event emitted when a call transfer fails

## Emitter

- Call Manager (`call-manager`)

## Listener

Applications consuming call lifecycle events

## Event dictionary

The event dictionary can be browsed here: [call-manager-call-transfer-failed-v1](https://oxygen-dev.8x8.com/events/latest/modules/callManager.callTransferFailedV1.html)

## Payloads

### Payload v1.0.0

Payload schema:

```typescript
const CallTransferFailedPayloadSchema = z.object({
    /** The ID of the call that failed to transfer */
    callId: z.string(),
    /** The ID of the target call (optional) */
    toCallId: z.string().optional(),
    /** The phone number the call attempted to transfer to (optional) */
    toNumber: z.string().optional(),
    schemaVersion: z.literal("1.0.0"),
});
```

Payload example:

```typescript
const payload = {
    callId: "call-001-abc",
    toCallId: "call-002-def",
    schemaVersion: "1.0.0",
}
```
