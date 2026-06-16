# global-user-details-v1

Event used by the Shell MFE to announce all the integrators about the global user details data.

## Emitter

The Shell MFE

## Listener

Any integrator interested in the user details data.

## Event dictionary

The event dictionary can be browsed here: [global-user-details-v1](https://oxygen-dev.8x8.com/events/latest/modules/shell.userDetailsV1.html)

## Payloads

### Payload v1.0.0

Payload schema:

```typescript
export const SHELL_USER_DETAILS_SCHEMA_VERSION = "1.0.0";

export const ShellUserDetailsPayloadSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  name: z.string(),
  userId: z.string(),
  customerId: z.string(),
  loginId: z.string(),
  jobTitle: z.string(),
  email: z.string().optional(),
  language: z.string().optional(),
  schemaVersion: z.literal(SHELL_USER_DETAILS_SCHEMA_VERSION),
});

export type ShellUserDetailsPayload = z.infer<typeof ShellUserDetailsPayloadSchema>

```

Payload example:

```typescript
const payloadV1_0_0 = {
  firstName: 'firstName',
  lastName: 'lastName',
  name: 'firstName lastName',
  userId: 'userId',
  customerId: 'customerId',
  loginId: 'loginId',
  jobTitle: 'jobTitle',
  email: 'email@test.com',
  language: 'en',
  schemaVersion: '1.0.0'
}
```
