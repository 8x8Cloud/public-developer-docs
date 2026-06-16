# wrap-up-codes-received-v1

Event to announce when wrap-up codes have been received for an interaction.

## Emitter

External integrators or systems that provide wrap-up codes to the Agent Workspace.

## Listener

The Agent Workspace MFE

## Event dictionary

The event dictionary can be browsed here: [wrap-up-codes-received-v1](https://oxygen-dev.8x8.com/events/latest/modules/agentWorkspace.wrapUpCodesReceivedV1.html)

## Payloads

### Payload v1.0.0

Payload schema:

```typescript
export const WRAP_UP_CODES_RECEIVED_SCHEMA_VERSION = "1.0.0";

const WrapUpCodeItemSchema = z.object({
    id: z.string(),
    parentId: z.string(),
});

export const WrapUpCodesReceivedPayloadSchema = z.object({
    interactionId: z.string(),
    wrapUpCodes: z.array(WrapUpCodeItemSchema),
    schemaVersion: z.literal(WRAP_UP_CODES_RECEIVED_SCHEMA_VERSION)
});

export type WrapUpCodesReceivedPayload = z.infer<typeof WrapUpCodesReceivedPayloadSchema>
```

Payload example:

```typescript
const defaultPayloadV1_0_0 = {
  interactionId: 'interaction-12345',
  wrapUpCodes: [
    {
      id: 'item-1',
      parentId: 'parent-1',
    },
  ],
};
```

## Usage

This event is emitted when wrap-up codes are received from an external system or integrator and need to be processed by the Agent Workspace. Each wrap-up code item contains an id and parentId for hierarchical relationships.
