# wrap-up-codes-v1

Event to send wrap-up codes from interaction.

## Emitter

The Agent Workspace MFE

## Listener

Any integrator interested in receiving wrap-up codes for an interaction.

## Event dictionary

The event dictionary can be browsed here: [wrap-up-codes-v1](https://oxygen-dev.8x8.com/events/latest/modules/agentWorkspace.wrapUpCodesV1.html)

## Payloads

### Payload v1.0.1

Payload schema:

```typescript
export const WRAP_UP_CODES_SCHEMA_VERSION = "1.0.1";

const WrapUpCodeItemSchema = z.object({
    callLineId: z.string(),
    dispositionCode: z.string(),
    id: z.string(),
    menuText: z.string(),
    ordinate: z.string(),
    parentId: z.string(),
    queueObjId: z.string(),
    reportText: z.string(),
    shortCodeText: z.string(),
    shortKeyText: z.string(),
    callBackTime: z.number(),
    description: z.string().optional(), // Optional description field
});

const WrapUpCodeSchema = z.object({
    ani: z.string().optional(),
    assignments: z.object({
        type: z.string(),
        list: z.array(z.string())
    }),
    autoSort: z.boolean(),
    id: z.string(),
    isAgentDefault: z.boolean(),
    items: z.array(WrapUpCodeItemSchema),
    name: z.string(),
    primaryLang: z.string(),
    multiChoice: z.boolean(),
    reqBeforeOutbound: z.boolean(),
    required: z.boolean(),
});

export const WrapUpCodesPayloadSchema = z.object({
    interactionId: z.string(),
    wrapUpCodes: z.array(WrapUpCodeSchema),
    schemaVersion: z.literal(WRAP_UP_CODES_SCHEMA_VERSION)
});

export type WrapUpCodesPayload = z.infer<typeof WrapUpCodesPayloadSchema>
```

Payload example:

```typescript
const payloadV1_0_0_Default = {
  interactionId: 'interaction-12345',
  wrapUpCodes: [
    {
      ani: '1234567890',
      assignments: {
        type: 'agent',
        list: ['agent-1', 'agent-2'],
      },
      autoSort: true,
      id: 'wrap-up-code-1',
      isAgentDefault: false,
      items: [
        {
          callLineId: 'line-1',
          dispositionCode: 'code-1',
          id: 'item-1',
          menuText: 'Menu Item 1',
          ordinate: '1',
          parentId: 'parent-1',
          queueObjId: 'queue-1',
          reportText: 'Report Text 1',
          shortCodeText: 'SC1',
          shortKeyText: 'SK1',
          callBackTime: 60,
          description: 'description', // Optional
        },
      ],
      name: 'Wrap-Up Code 1',
      primaryLang: 'en',
      multiChoice: false,
      reqBeforeOutbound: true,
      required: true,
    },
  ],
};
```

## Field Descriptions

### WrapUpCodeItemSchema Fields

- `callLineId`: Identifier for the call line
- `dispositionCode`: Code representing the disposition
- `id`: Unique identifier for the wrap-up code item
- `menuText`: Display text shown in the menu
- `ordinate`: Ordering position of the item
- `parentId`: Identifier of the parent wrap-up code
- `queueObjId`: Queue object identifier
- `reportText`: Text used for reporting purposes
- `shortCodeText`: Abbreviated code text
- `shortKeyText`: Short key text identifier
- `callBackTime`: Time for callback in seconds
- `description`: Optional descriptive text providing additional context about the wrap-up code item

### WrapUpCodeSchema Fields

- `ani`: Optional Automatic Number Identification
- `assignments`: Assignment configuration with type and list of assigned entities
- `autoSort`: Whether items should be automatically sorted
- `id`: Unique identifier for the wrap-up code group
- `isAgentDefault`: Whether this is the default for the agent
- `items`: Array of wrap-up code items
- `name`: Display name of the wrap-up code group
- `primaryLang`: Primary language code
- `multiChoice`: Whether multiple selections are allowed
- `reqBeforeOutbound`: Whether required before outbound calls
- `required`: Whether the wrap-up code is mandatory
