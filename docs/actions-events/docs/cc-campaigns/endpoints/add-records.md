---
sidebar_position: 2
---

# Add Records

:::warning BETA

**The Contact Center Campaigns API is currently in Beta.** See the [Overview](../overview.md) for details.

:::

```text
POST https://api.8x8.com/cc/{customer-site}/campaigns/v1/{campaignId}/records
```

Adds 1-100 records to a campaign's call list in a single request. The campaign **must** be dynamic to add records — see [Campaign state requirements](#campaign-state-requirements) below.

For request conventions (required headers, media type, `{customer-site}` values) that apply to all endpoints, see [Endpoints](../endpoints.md#common-request-conventions).

## Path parameters

| Name         | Type | Required | Description                                                   |
|--------------|------|----------|---------------------------------------------------------------|
| `campaignId` | UUID | ✓        | Identifier of the campaign to add records to. While there is no GET endpoint, the campaign ID can be retrieved from the network tab of your browser when viewing the **Campaign List** page in Configuration Manager. |

## Request body

| Field     | Type  | Required | Description                                                          |
|-----------|-------|----------|----------------------------------------------------------------------|
| `records` | array | ✓        | Array of 1-100 record objects. See below for per-item fields.        |

Each item in `records` is an `AddRecordRequest`:

| Field         | Type      | Required | Constraints                        | Description                                                                                                                                       |
|---------------|-----------|----------|------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|
| `crmRecordId` | string    | ✓        | 1-32 characters; unique in campaign | CRM record identifier. This can be found on the customer record in Agent Workspace.                                                              |
| `scheduleAt`  | timestamp | no       | ISO 8601 (e.g. `2026-04-23T14:00:00Z`) | Earliest time the record may be attempted. Records are ordered by earliest `scheduleAt` first.                                                    |
| `priority`    | enum      | no       | default `HIGH`                     | Dialing priority — `HIGH`, `MEDIUM`, or `LOW`. See [`RecordPriority`](../field-reference.md#recordpriority).                                      |
| `rank`        | number    | no       | auto-assigned if omitted           | Ordering within the priority group. If omitted, the server assigns a rank equal to the current number of records in that priority group plus one. |

## All-or-nothing semantics

Record addition is atomic — the entire request either succeeds or fails. The server rejects the whole request (with no records added) if any of the following are true:

- More than 100 records are supplied
- Two or more records in the request body share the same `crmRecordId`
- Any supplied `crmRecordId` already exists on the campaign
- Any record fails validation (blank `crmRecordId`, `crmRecordId` longer than 32 characters, invalid `scheduleAt`, etc.)

There is no partial-success mode. On failure, no records from the batch are persisted.

## Campaign state requirements

Records can only be added when the campaign is **dynamic** and is in a state that allows record edits. Adding records to a non-dynamic campaign returns `400 Bad Request` with an "Invalid Operation" message indicating that `isDynamic` on the campaign is `false`.

Records also **cannot** be added when the campaign is:

- `BUILDING` or `STARTING` (transient build/start states)
- `COMPLETE` (finished)
- `DELETED` (soft-deleted)

For the full list of campaign states, see the [State Machine](../state-machine.md).

## Response

Returns `200 OK` with an `AddRecordsResponse` containing the server-side representation of each successfully added record. Each record now has a server-assigned `id`, a `state` of `PENDING`, a `nextAttemptAfter` timestamp (set to the supplied `scheduleAt` if one was provided, otherwise to the creation time), and a `type` reflecting how the campaign is configured (typically `DYNAMIC` for records added through this API).

## Status codes

| Code | Meaning                                                                                                                                                                                |
|------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 200  | Records added successfully; response body contains the added records                                                                                                                   |
| 400  | Validation failure — `records` empty, more than 100 items, `crmRecordId` blank or longer than 32 characters, duplicate `crmRecordId` within the request, campaign is not dynamic, etc. |
| 401  | Missing or invalid `X-API-Key`                                                                                                                                                         |
| 403  | API Key valid but the **Contact Center Campaigns** API Product is not attached                                                                                                         |
| 404  | Campaign not found for the tenant                                                                                                                                                      |
| 409  | Campaign is in a state that rejects record additions (e.g. `BUILDING`, `COMPLETE`), or one or more `crmRecordId` values already exist in the campaign                                  |

## Examples

**Single record:**

```bash
curl --request POST \
  'https://api.8x8.com/cc/US1/campaigns/v1/123e4567-e89b-12d3-a456-426614174000/records' \
  --header 'X-API-Key: eght_your_admin_console_key' \
  --header 'X-8x8-Tenant: my-tenant' \
  --header 'Content-Type: application/vnd.campaigns.v1+json' \
  --data '{
    "records": [
      {
        "crmRecordId": "CRM-12345",
        "priority": "HIGH"
      }
    ]
  }'
```

**Multiple records with mixed priorities and schedules:**

```bash
curl --request POST \
  'https://api.8x8.com/cc/US1/campaigns/v1/123e4567-e89b-12d3-a456-426614174000/records' \
  --header 'X-API-Key: eght_your_admin_console_key' \
  --header 'X-8x8-Tenant: my-tenant' \
  --header 'Content-Type: application/vnd.campaigns.v1+json' \
  --data '{
    "records": [
      {
        "crmRecordId": "CRM-12345",
        "priority": "HIGH",
        "rank": 1.0
      },
      {
        "crmRecordId": "CRM-12346",
        "priority": "MEDIUM",
        "scheduleAt": "2026-04-23T14:00:00Z"
      },
      {
        "crmRecordId": "CRM-12347",
        "priority": "LOW"
      }
    ]
  }'
```

**Example success response:**

```json
{
  "records": [
    {
      "id": "789e4567-e89b-12d3-a456-426614174000",
      "type": "DYNAMIC",
      "crmRecordId": "CRM-12345",
      "priority": "HIGH",
      "rank": 1.0,
      "nextAttemptAfter": "2026-04-22T11:00:00Z",
      "retryCount": 0,
      "state": "PENDING"
    },
    {
      "id": "789e4567-e89b-12d3-a456-426614174001",
      "type": "DYNAMIC",
      "crmRecordId": "CRM-12346",
      "priority": "MEDIUM",
      "rank": 2.0,
      "nextAttemptAfter": "2026-04-23T14:00:00Z",
      "retryCount": 0,
      "state": "PENDING"
    },
    {
      "id": "789e4567-e89b-12d3-a456-426614174002",
      "type": "DYNAMIC",
      "crmRecordId": "CRM-12347",
      "priority": "LOW",
      "rank": 3.0,
      "nextAttemptAfter": "2026-04-22T11:00:00Z",
      "retryCount": 0,
      "state": "PENDING"
    }
  ]
}
```

## Next steps

- [Modify Campaign](./modify-campaign.md) - `PATCH /campaigns/{campaignId}`
- [Campaign State Machine](../state-machine.md) - When records can be added
- [Field Reference](../field-reference.md) - Full schema for every object and enum
- [Troubleshooting](../troubleshooting.md) - Debugging guide
