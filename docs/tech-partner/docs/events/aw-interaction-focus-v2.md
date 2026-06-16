# interaction-focus-v2

Event used by the Agent Workspace MFE to announce all the integrators about when an interaction is focused.

## Emitter

The Agent Workspace MFE

## Listener

Any integrator interested in when an interaction is focused.

## Event dictionary

The event dictionary can be browsed here: [interaction-focus-v2](https://oxygen-dev.8x8.com/events/latest/modules/agentWorkspace.interactionFocusV2.html)

## Payloads

### Payload v2.0.0

Payload schema:

```typescript
export const INTERACTION_FOCUS_SCHEMA_VERSION = "2.0.0";

export const InteractionFocusPayloadSchema = z.object({
    interactionId: z.string(),
    queue: z.object({
        id: z.string(),
        queueId: z.string(),
        queueName: z.string(),
    }),
    schemaVersion: z.literal(INTERACTION_FOCUS_SCHEMA_VERSION)
});

export type InteractionFocusPayload = z.infer<typeof InteractionFocusPayloadSchema>
```

Payload example:

```typescript
const payloadV2_0_0 = {
    interactionId: 'cognigy',
    queue: {
        id: '12345',
        queueId: 'tenantId~~queue~~chat~~12345',
        queueName: `Queue name`
    }
}
```
