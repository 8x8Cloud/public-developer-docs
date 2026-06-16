# chat-message-received-v1

Event to announce when a chat message has been received.

## Emitter

Any integrator interested in when a chat message is received.

## Listener

The Agent Workspace MFE

## Event dictionary

The event dictionary can be browsed here: chat-message-received-v1

## Payloads

### Payload v1.0.0

Payload schema:

```typescript

export const CHAT_MESSAGE_RECEIVED_SCHEMA_VERSION = "1.0.0";
export const ChatMessageReceivedPayloadSchema = z.object({
    interactionId: z.string(),
    message: z.string(),
    schemaVersion: z.literal(CHAT_MESSAGE_RECEIVED_SCHEMA_VERSION)
});
export type ChatMessageReceivedPayload = z.infer<typeof ChatMessageReceivedPayloadSchema>;
```

Payload example:

```typescript
const defaultPayloadV1_0_0 = {
  interactionId: 'cognigy',
   message: 'Hello from Cognigy!',
};
```
