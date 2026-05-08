---
sidebar_position: 1
---

# Modify Campaign

:::warning BETA

**The Contact Center Campaigns API is currently in Beta.** See the [Overview](../overview.md) for details.

:::

```text
PATCH https://api.8x8.com/cc/{customer-site}/campaigns/v1/{campaignId}
```

Transitions a campaign through its [state machine](../state-machine.md) and optionally toggles its `enabled` flag.

For request conventions (required headers, media type, `{customer-site}` values) that apply to all endpoints, see [Endpoints](../endpoints.md#common-request-conventions).

## Path parameters

| Name         | Type | Required | Description                                                                                                                                                                                                   |
|--------------|------|----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `campaignId` | UUID | ✓        | Identifier of the campaign to modify. While there is no GET endpoint, the campaign ID can be retrieved from the network tab of your browser when viewing the **New Campaigns** page in Configuration Manager. |

## Request body

| Field     | Type    | Required | Description                                                                                                                |
|-----------|---------|----------|----------------------------------------------------------------------------------------------------------------------------|
| `action`  | enum    | ✓        | The action to perform — one of `BUILD`, `RESET`, `START`, `PAUSE`, `RESUME`, `RETRY`, `CANCEL`, `PURGE`. See [`CampaignAction`](../field-reference.md#campaignaction). |
| `enabled` | boolean | no       | Set to `true` or `false` to enable or disable the campaign. Omit to leave the current value unchanged.                     |

Each action is only valid from certain states. For the complete matrix, see the [Campaign State Machine](../state-machine.md).

### `START` variant — `buildOnStart`

When `action` is `START`, the request body may also include a `buildOnStart` flag:

| Field          | Type    | Required | Description                                                                                                                                                                                                                                                       |
|----------------|---------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `buildOnStart` | boolean | no       | When `true`, the server performs a build-then-start sequence in a single request, avoiding the need for a separate `BUILD` call first. Overrides the campaign's configured "build on start" value. When omitted or `false`, the campaign must already be in `READY`. |

## Response

Returns `200 OK` with a [`Campaign`](../field-reference.md#campaign) representing the campaign's current state *after* the action was accepted. For transient states (`BUILDING`, `STARTING`), the response reflects the in-progress state; the campaign settles into its target state asynchronously.

## Status codes

| Code | Meaning                                                                                                         |
|------|-----------------------------------------------------------------------------------------------------------------|
| 200  | Action accepted; response body contains the current campaign                                                    |
| 400  | Request body is malformed or fails validation — see [Troubleshooting](../troubleshooting.md#400-bad-request)    |
| 401  | Missing or invalid `X-API-Key` — see [Authentication](../authentication.mdx#troubleshooting-authentication)     |
| 403  | API Key valid but the **Contact Center Campaigns** API Product is not attached                                  |
| 404  | Campaign not found for the tenant, or the `{customer-site}` segment is wrong                                    |
| 409  | Action is not valid for the campaign's current state — see the [State Machine](../state-machine.md)             |

## Examples

**Simple action — `BUILD`:**

```bash
curl --request PATCH \
  'https://api.8x8.com/cc/US1/campaigns/v1/123e4567-e89b-12d3-a456-426614174000' \
  --header 'X-API-Key: eght_your_admin_console_key' \
  --header 'X-8x8-Tenant: my-tenant' \
  --header 'Content-Type: application/vnd.campaigns.v1+json' \
  --data '{"action":"BUILD"}'
```

**Toggle `enabled`:**

```bash
curl --request PATCH \
  'https://api.8x8.com/cc/US1/campaigns/v1/123e4567-e89b-12d3-a456-426614174000' \
  --header 'X-API-Key: eght_your_admin_console_key' \
  --header 'X-8x8-Tenant: my-tenant' \
  --header 'Content-Type: application/vnd.campaigns.v1+json' \
  --data '{"action":"BUILD","enabled":true}'
```

**Combined build-and-start:**

```bash
curl --request PATCH \
  'https://api.8x8.com/cc/US1/campaigns/v1/123e4567-e89b-12d3-a456-426614174000' \
  --header 'X-API-Key: eght_your_admin_console_key' \
  --header 'X-8x8-Tenant: my-tenant' \
  --header 'Content-Type: application/vnd.campaigns.v1+json' \
  --data '{"action":"START","buildOnStart":true}'
```

**Example success response:**

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "tenantId": "my-tenant",
  "integrationType": "contactual",
  "startTime": "2026-04-22T10:00:00Z",
  "endTime": "2026-04-22T18:00:00Z",
  "state": "RUNNING",
  "displayStatus": "RUNNING",
  "recordCount": 1500,
  "recordCounts": [
    {
      "type": "DYNAMIC",
      "state": "PENDING",
      "count": 1455
    },
    {
      "type": "DYNAMIC",
      "state": "COMPLETE",
      "result": "SUCCESS",
      "count": 45
    }
  ],
  "lastBuildTime": "2026-04-22T09:55:00Z",
  "startedTime": "2026-04-22T10:00:05Z"
}
```

Fields omitted from the response (for example `completedTime` for a running campaign) are absent from the JSON rather than present with a `null` value.

## Next steps

- [Add Records](./add-records.md) - `POST /campaigns/{campaignId}/records`
- [Campaign State Machine](../state-machine.md) - Valid action and state matrix
- [Field Reference](../field-reference.md) - Full schema for every object and enum
- [Troubleshooting](../troubleshooting.md) - Debugging guide
