# call-manager-call-transfer-success-v1

Event emitted when a call transfer succeeds

## Emitter

- Call Manager (`call-manager`)

## Listener

Applications consuming call lifecycle events

## Event dictionary

The event dictionary can be browsed here: [call-manager-call-transfer-success-v1](https://oxygen-dev.8x8.com/events/latest/modules/callManager.callTransferSuccessV1.html)

## Payloads

### Payload v1.0.0

Payload schema:

```typescript
const CallTransferSuccessPayloadSchema = z.object({
    /** The ID of the call being transferred */
    callId: z.string(),
    /** The ID of the target call (optional) */
    toCallId: z.string().optional(),
    /** The phone number the call was transferred to (optional) */
    toNumber: z.string().optional(),
    schemaVersion: z.literal("1.0.0"),
});
```

Payload example:

```typescript
const payload = {
    callId: "call-001-abc",
    toCallId: "call-002-def",
    toNumber: "+18005559876",
    schemaVersion: "1.0.0",
}
```
