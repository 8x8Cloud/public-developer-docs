# Agent Activity

The **Agent Activity** report shows per-agent interaction handling across the PBX — how many interactions each agent accepted, missed or rejected, the time they spent talking, wrapping up and on hold, their current status, and any interaction they are handling right now. It backs the User Status view in Analytics for Work.

It is served by a single endpoint:

* `GET /v2/pbxes/{pbxId}/agent-activity` — [Agent Activity reference](/analytics/reference/get-agent-activity)

## Request

**Method:** GET

#### Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| 8x8-apikey | ✓ | The 8x8-apikey provided | test_key_kjdfidj238jf9123df221 |
| Authorization | ✓ | The `access_token` as a Bearer token | Bearer eyJhbGciOiJSUzI1NiJ9.yyyyyyyy.zzzzzzzzzz |

#### Path

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| pbxId | ✓ | The opaque id of the PBX (not the PBX name). | P2DlDO1HSKe0uPdZlClziw |

#### Query

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| userIds | | Restrict to specific agents/users (comma-separated). | u1,u2 |
| userStatuses | | Filter by current user status (comma-separated). | AVAILABLE,BUSY |
| queueIds | | Restrict to agents in specific queues (comma-separated). | q1 |
| siteIds | | Restrict to specific sites (comma-separated). | site1 |
| startDate / endDate | | Historical window in ISO 8601. Omit both for the current live state. | 2026-07-01T00:00:00Z |
| intraDayStart / intraDayEnd | | Optional intra-day window; only valid together with `startDate`/`endDate`. | 2026-07-01T09:00:00Z |
| metrics | | Comma-separated metrics to return (see below). | acceptedInteractions,agentTotalTalkTime |
| includeSummary | | Defaults to `true`; pass `false` to omit the aggregated summary of the metrics. | false |

### Metrics

Full descriptions are on the [reference page](/analytics/reference/get-agent-activity). They fall into these groups:

* **Volume** — `enteredInteractions`, `acceptedInteractions`, `acceptedInteractionsPercentage`, `missedInteractions`, `missedInteractionsPercentage`, `rejectedInteractions`, `rejectedInteractionsPercentage`
* **Timing** (seconds) — `agentAverageTimeToAnswer`, `agentTotalTalkTime`, `averageTalkingInteractionsTime`, `averageOnHoldInteractionsTime`, `averageWrapUpTime`, `totalInteractionTime`
* **Status** — `userStatusTime`
* **Live (ongoing)** — `ongoingHandlingInteractions`, `ongoingTalkingInteractions`, `ongoingOnHoldInteractions`, `ongoingWrapUpInteractions`, `ongoingAvgTalkingInteractionsTime`, `ongoingAvgHandlingInteractionsTime`, `ongoingTalkingInteractionsTime`, `ongoingOnHoldInteractionsTime`, `ongoingWrapUpInteractionsTime`, `ongoingTotalHandlingInteractionsTime`

### Example request

> 📘 **Try it out**
>
> You can try this endpoint from the [reference](/analytics/reference/get-agent-activity).
>
>

```bash
curl --location --request GET 'https://api.8x8.com/analytics/work/v2/pbxes/{pbxId}/agent-activity?startDate=2026-07-01T00:00:00Z&endDate=2026-07-15T23:59:59Z&metrics=acceptedInteractions,missedInteractions,agentTotalTalkTime' \
--header 'Authorization: Bearer {access_token here}' \
--header '8x8-apikey: {8x8-apikey input here}'
```

## Response

Each entry in `agentActivity` identifies the agent (`userId`, `agentExtension`, `agentName`), their `userStatus` / `activityStatus`, the queues they are logged in to, any `interaction` they are currently handling, and the requested `metrics`. When `includeSummary=true`, a top-level `summary` aggregates the metrics.

> 📘 **Durations are in seconds.** Timing and percentage values may be decimals (percentages are 0–100); only counts are integers.
>
>

```json
{
  "agentActivity": [
    {
      "userId": "5f2c1a90-1b23-4d56-8e90-abcdef012345",
      "agentExtension": "1014",
      "agentName": "Chandler Hollow",
      "userStatus": "AVAILABLE",
      "activityStatus": "HANDLING",
      "loggedInQueues": ["Support CQ", "Sales CQ"],
      "interaction": {
        "caller": "Chay Hoss",
        "address": "1006"
      },
      "metrics": {
        "acceptedInteractions": 42,
        "missedInteractions": 3,
        "rejectedInteractions": 1,
        "agentTotalTalkTime": 5820.5,
        "averageWrapUpTime": 12.4,
        "userStatusTime": 3600.0,
        "ongoingTalkingInteractions": 1
      }
    }
  ],
  "summary": {
    "acceptedInteractions": 42,
    "missedInteractions": 3
  }
}
```

### Response fields

| Field | Description |
| --- | --- |
| agentActivity[] | One entry per agent matching the filters |
| agentActivity[].userId / agentExtension / agentName | Agent identifier, extension and display name |
| agentActivity[].userStatus / activityStatus | The agent's presence status and current call-handling activity |
| agentActivity[].loggedInQueues | Queues the agent is currently logged in to |
| agentActivity[].interaction | The interaction the agent is currently handling (`caller`, `address`), if any |
| agentActivity[].metrics | Object holding each requested metric and its value |
| summary | Aggregated metrics across all returned agents (only when `includeSummary=true`) |
