# aw-interaction-ended-v1

## Events

### aw-interaction-ended-v1

Event to announce when an interaction has ended.

## Emitter

The agent-workspace emits this event when an interaction ends.

## Listener

The ai-agent-assist MFE listens to this event to know when an interaction has concluded.

## Event dictionary

The event dictionary can be browsed here: [interaction-ended-v1](https://oxygen-dev.8x8.com/events/latest/modules/agentWorkspace.interactionEndedV1.html)

## Payloads

### Payload v1.0.0

Payload schema:

```typescript
export const INTERACTION_ENDED_SCHEMA_VERSION = "1.0.0";

export const InteractionEndedPayloadSchema = z.object({
    interactionId: z.string(),
    schemaVersion: z.literal(INTERACTION_ENDED_SCHEMA_VERSION)
});

export type InteractionEndedPayload = z.infer<typeof InteractionEndedPayloadSchema>
```

Payload example:

```typescript
const payloadsV1_0_0 = [
    {
        interactionId: 'interaction-123',
        schemaVersion: '1.0.0',
    },
]
```
