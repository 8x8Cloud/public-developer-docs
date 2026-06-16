# aw-interaction-started-v1

## Events

### aw-interaction-started-v1

Event to announce when an interaction has started.

## Emitter

The agent-workspace emits this event when a new interaction begins (phone, chat, email, or sms).

## Listener

The ai-agent-assist MFE listens to this event to receive interaction context.

## Event dictionary

The event dictionary can be browsed here: [interaction-started-v1](https://oxygen-dev.8x8.com/events/latest/modules/agentWorkspace.interactionStartedV1.html)

## Payloads

### Payload v1.0.0

Payload schema:

```typescript
export const INTERACTION_STARTED_SCHEMA_VERSION = "1.0.0";

export const InteractionStartedPayloadSchema = z.object({
    interactionId: z.string(),
    callId: z.string().optional(),
    interactionType: z.enum(["phone", "chat", "email", "sms"]),
    direction: z.enum(["inbound", "outbound"]),
    queueId: z.string().optional(),
    queueName: z.string().optional(),
    customerName: z.string().optional(),
    customerPhone: z.string().optional(),
    agentName: z.string().optional(),
    agentPhone: z.string().optional(),
    schemaVersion: z.literal(INTERACTION_STARTED_SCHEMA_VERSION)
});

export type InteractionStartedPayload = z.infer<typeof InteractionStartedPayloadSchema>
```

Payload example:

```typescript
const payloadsV1_0_0 = [
    {
        interactionId: 'interaction-123',
        callId: 'call-789',
        interactionType: 'phone',
        direction: 'inbound',
        queueId: 'queue-456',
        queueName: 'Support Queue',
        customerName: 'John Doe',
        customerPhone: '+1234567890',
        agentName: 'Jane Smith',
        agentPhone: '+0987654321',
        schemaVersion: '1.0.0',
    },
]
```
