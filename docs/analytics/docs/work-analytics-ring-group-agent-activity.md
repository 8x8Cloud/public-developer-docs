# Ring Group Agent Activity

The **Ring Group Agent Activity** report shows per-agent activity for the members of a ring group on a PBX — for each agent in the group, how long they were logged in to, and logged out of, the ring group over the reporting window. It is addressable either by the ring group's id or by its extension.

Two operations back this report:

* `GET /v2/pbxes/{pbxId}/ring-group-agent-activity/{ringGroupId}` — activity for a ring group identified by id. [Ring Group Agent Activity reference](/analytics/reference/get-ring-group-agent-activity)
* `GET /v2/pbxes/{pbxId}/ring-group-agent-activity/by-extension/{ringGroupExtension}` — the same report, addressed by ring group extension. [By Extension reference](/analytics/reference/get-ring-group-agent-activity-by-extension)

## Request

**Method:** GET

#### Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| 8x8-apikey | ✓ | The 8x8-apikey provided | test_key_kjdfidj238jf9123df221 |
| Authorization | ✓ | The `access_token` as a Bearer token | Bearer eyJhbGciOiJSUzI1NiJ9.yyyyyyyy.zzzzzzzzzz |

#### Path

| Name | Required | Applies to | Description | Example |
| --- | --- | --- | --- | --- |
| pbxId | ✓ | both | The opaque id of the PBX (not the PBX name). | P2DlDO1HSKe0uPdZlClziw |
| ringGroupId | ✓ | `/{ringGroupId}` | Id of the ring group | tqteLkZOScyi0Mai9ewUlA |
| ringGroupExtension | ✓ | `/by-extension/{ringGroupExtension}` | Extension of the ring group | 2000 |

#### Query

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| agentExtensions | | Restrict to specific agent extensions within the ring group (comma-separated). If omitted, all agents in the group are returned. | 1006,1014 |
| metrics | | Comma-separated metrics to return (see below). If omitted, all available metrics are returned. | loggedInDuration,loggedOutDuration |
| startDate / endDate | | Historical window in ISO 8601. Omit both for the last 24 hours. | 2026-07-01T00:00:00Z |
| intraDayStart / intraDayEnd | | Optional intra-day window; only valid together with `startDate`/`endDate`. | 09:00:00-07:00 |
| sorting | | Sort field and direction. Sortable field: `agentExtension`. | agentExtension,asc |

### Metrics

The report serves two duration metrics (both in milliseconds). Full descriptions are on the reference pages ([by id](/analytics/reference/get-ring-group-agent-activity), [by extension](/analytics/reference/get-ring-group-agent-activity-by-extension)):

* `loggedInDuration` — total time the agent was logged in to the ring group during the reporting period.
* `loggedOutDuration` — total time the agent was logged out of the ring group during the reporting period.

### Example request

> 📘 **Try it out**
>
> You can try both endpoints from the reference pages linked above.
>
>

```bash
# By ring group id
curl --location --request GET 'https://api.8x8.com/analytics/work/v2/pbxes/{pbxId}/ring-group-agent-activity/{ringGroupId}?startDate=2026-07-01T00:00:00Z&endDate=2026-07-15T23:59:59Z&metrics=loggedInDuration,loggedOutDuration' \
--header 'Authorization: Bearer {access_token here}' \
--header '8x8-apikey: {8x8-apikey input here}'

# By ring group extension
curl --location --request GET 'https://api.8x8.com/analytics/work/v2/pbxes/{pbxId}/ring-group-agent-activity/by-extension/{ringGroupExtension}?metrics=loggedInDuration,loggedOutDuration' \
--header 'Authorization: Bearer {access_token here}' \
--header '8x8-apikey: {8x8-apikey input here}'
```

## Response

Both operations return the same shape: a `ringGroupAgentActivity` array with one entry per agent in the ring group. Each entry carries the agent's `agentExtension` and a `metrics` object holding each requested metric and its value.

> 📘 **Durations are in milliseconds.**
>
>

```json
{
  "ringGroupAgentActivity": [
    {
      "agentExtension": "1014",
      "metrics": {
        "loggedInDuration": 25200000,
        "loggedOutDuration": 3600000
      }
    },
    {
      "agentExtension": "1006",
      "metrics": {
        "loggedInDuration": 18000000,
        "loggedOutDuration": 10800000
      }
    }
  ]
}
```

### Response fields

| Field | Description |
| --- | --- |
| ringGroupAgentActivity[] | One entry per agent in the ring group matching the filters |
| ringGroupAgentActivity[].agentExtension | The agent's phone extension |
| ringGroupAgentActivity[].metrics | Object holding each requested metric and its value (`loggedInDuration`, `loggedOutDuration`) |
