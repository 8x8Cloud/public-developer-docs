---
sidebar_position: 7
---

# Troubleshooting

:::warning BETA

**The Contact Center Campaigns API is currently in Beta.** See the [Overview](./overview.md) for details.

:::

## Error response format

All errors returned by the Contact Center Campaigns API use a consistent JSON body format.

**Example — a 400 validation error:**

```json
{
  "title": "Validation failed",
  "status": 400,
  "detail": "Campaign already contains record for Id: CRM-12345",
  "instance": "/cc/US1/campaigns/v1/123e4567-e89b-12d3-a456-426614174000/records",
  "time": "2026-04-22T10:30:00Z",
  "errors": [
    {
      "field": "crmRecordId",
      "code": "NotBlank",
      "message": "must not be blank"
    }
  ]
}
```

### Body fields

| Field      | Type                        | Description                                                              |
|------------|-----------------------------|--------------------------------------------------------------------------|
| `title`    | string                      | Short, human-readable summary of the problem                             |
| `status`   | number                      | HTTP status code                                                         |
| `detail`   | string                      | Human-readable explanation specific to this occurrence                   |
| `instance` | string                      | URI reference identifying the specific occurrence of the problem         |
| `time`     | timestamp                   | When the error occurred (ISO 8601)                                       |
| `errors`   | array of `FieldError`       | Field-level validation errors (only present on validation failures)      |

### `FieldError`

| Field     | Type   | Description                       | Example          |
|-----------|--------|-----------------------------------|------------------|
| `field`   | string | Name of the field in error        | `crmRecordId`    |
| `code`    | string | Error code (typically a validator name) | `NotBlank` |
| `message` | string | Human-readable message            | `must not be blank` |

When contacting 8x8 support about an error, include the `instance` URI and `time` — these uniquely identify the occurrence in server logs.

## Common errors by status code

### 400 Bad Request

The request body is malformed or fails validation. Look at `errors[]` for the specific field(s) at fault.

Common causes:

- Malformed JSON — missing braces, trailing commas, wrong quoting
- `records` array is empty, or contains more than 100 items
- `crmRecordId` is blank or longer than 32 characters
- `crmRecordId` values are duplicated within the same request
- `action` is not one of the [allowed values](./field-reference.md#campaignaction)
- `scheduleAt` is not a valid ISO 8601 timestamp

### 401 Unauthorized

The request is missing valid authentication.

Common causes:

- `X-API-Key` header is missing
- The key value is malformed — it must start with `eght_`
- The key has been revoked, or the app has been deleted in Admin Console

See [Authentication](./authentication.mdx#troubleshooting-authentication).

### 403 Forbidden

The API key is valid but is not authorised for this API.

Most common cause:

- The **Contact Center Campaigns** API Product is not attached to the app in Admin Console. Edit the app and add the Product.

### 404 Not Found

The campaign, tenant, or customer site could not be resolved.

Common causes:

- The `campaignId` UUID does not exist within the tenant
- The `X-8x8-Tenant` header is missing or points at a different tenant than the one that owns the campaign
- The `{customer-site}` segment of the URL is wrong — only `US1`, `US2`, and `UK3` are valid

### 409 Conflict

The request is syntactically valid but conflicts with the current server state.

Common causes:

- **Action invalid for current state.** For example, sending `{"action":"PAUSE"}` to a campaign in `CREATED`. See the [State Machine](./state-machine.md#actions-and-their-preconditions) for the valid-from matrix.
- **Duplicate `crmRecordId`.** The record already exists in the campaign from a previous request.
- **Campaign state rejects record additions.** Records cannot be added while the campaign is `BUILDING`, `STARTING`, `COMPLETE`, or `DELETED`.

### 5xx Server Errors

An unexpected server error. These should be rare.

- Retry the request with exponential backoff
- When contacting support, include the `instance` URI and `time` from the error body

## Debugging checklist

When a request doesn't do what you expect, work through the following:

1. **Customer site** — is the `{customer-site}` segment correct for your tenant (`US1`, `US2`, or `UK3`)?
2. **Tenant name** — does the `X-8x8-Tenant` header value match the tenant that owns the campaign?
3. **API Product** — does the Admin Console app that issued the key have the **Contact Center Campaigns** API Product attached?
4. **Media type** — are requests with a body sending `Content-Type: application/vnd.campaigns.v1+json`?
5. **Campaign state** — is the campaign in a state that allows the action you're sending? Check the response from a recent `PATCH` or the [State Machine](./state-machine.md).
6. **Campaign enabled flag** — if the campaign is disabled, only `BUILD` and `RESET` actions are allowed.
7. **Record constraints** — is `crmRecordId` 1-32 characters, unique in the request, and not already present in the campaign? Is the batch between 1 and 100 records?

## Getting help

For issues not resolved by this guide:

1. Check the [Authentication](./authentication.mdx) and [State Machine](./state-machine.md) pages
2. Confirm the [Admin Console setup](./authentication.mdx#admin-console-api-key)
3. Contact 8x8 support, including the `instance` URI and `time` from the error response body
