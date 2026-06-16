# call-manager-call-transfer-blind-success-v1

Event emitted when a blind call transfer succeeds

## Emitter

- Call Manager (`call-manager`)

## Listener

Applications consuming call lifecycle events

## Event dictionary

The event dictionary can be browsed here: [call-manager-call-transfer-blind-success-v1](https://oxygen-dev.8x8.com/events/latest/modules/callManager.callTransferBlindSuccessV1.html)

## Payloads

### Payload v1.0.0

Payload schema:

```typescript
const CallTransferBlindSuccessPayloadSchema = z.object({
    /** The ID of the call being transferred */
    callId: z.string(),
    /** The phone number the call was blind-transferred to */
    toNumber: z.string(),
    schemaVersion: z.literal("1.0.0"),
});
```

Payload example:

```typescript
const payload = {
    callId: "call-001-abc",
    toNumber: "+16469999777",
    schemaVersion: "1.0.0",
}
```
