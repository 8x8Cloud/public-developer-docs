# call-manager-mute-enabled-v1

Event emitted when the audio input is muted at the provider level (applies to all calls).

## Emitter

- Call Manager (`call-manager`)

## Listener

Applications consuming call lifecycle events

## Event dictionary

The event dictionary can be browsed here: [call-manager-mute-enabled-v1](https://oxygen-dev.8x8.com/events/latest/modules/callManager.muteEnabledV1.html)

## Payloads

### Payload v1.0.0

Payload schema:

```typescript
const MuteEnabledPayloadSchema = z.object({
    schemaVersion: z.literal("1.0.0"),
});
```

Payload example:

```typescript
const payload = {
    schemaVersion: "1.0.0",
}
```
