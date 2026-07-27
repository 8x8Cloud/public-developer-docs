# Queue Agent Activity

The **Queue Agent Activity** report breaks agent interaction handling down **per call queue** — the same agent-level metrics as Agent Activity, but grouped under each queue and attributed to that queue, so you can see how an agent performs in one queue versus another and whether they are a primary or overflow agent.

It is served by a single endpoint:

* `GET /v2/pbxes/{pbxId}/queue-agent-activity` — [Agent Activity per Queue reference](/analytics/reference/get-agent-queue-activity)

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
| queueIds | | Restrict to specific queues (comma-separated). All queues if omitted. | q1,q2 |
| queueStatuses | | Filter by queue status (comma-separated). Valid values: `AVAILABLE_IDLE`, `HANDLING`, `ALERTING`, `PAUSE`, `WRAP_UP`, `BUSY_OTHER`, `DND`, `LOGGED_OUT`, `OFFLINE`. (Primary vs overflow is the agent's role, surfaced via `overflowAgent`/`queueStatus`, not a filter value.) | HANDLING,ALERTING |
| userIds | | Restrict to specific agents (comma-separated). | u1 |
| userStatuses | | Filter by current user status (comma-separated). | AVAILABLE,BUSY |
| siteIds | | Restrict to specific sites (comma-separated). | site1 |
| startDate / endDate | | Historical window in ISO 8601. The interval cannot exceed 1 day. Omit both for the current live state. | 2026-07-01T00:00:00Z |
| intraDayStart / intraDayEnd | | Optional intra-day window; only valid together with `startDate`/`endDate`. | 2026-07-01T09:00:00Z |
| metrics | | Comma-separated metrics to return (see below). | acceptedInteractions,averageTalkingInteractionsTime |
| includeSummary | | Defaults to `true`; pass `false` to omit the per-queue aggregated `summary` of the metrics. | false |

### Metrics

Full descriptions are on the [reference page](/analytics/reference/get-agent-queue-activity). They fall into these groups:

* **Volume** — `enteredInteractions`, `acceptedInteractions`, `acceptedInteractionsPercentage`, `missedInteractions`, `missedInteractionsPercentage`, `rejectedInteractions`, `rejectedInteractionsPercentage`
* **Timing** (seconds) — `agentAverageTimeToAnswer`, `agentTotalTalkTime`, `averageTalkingInteractionsTime`, `averageOnHoldInteractionsTime`, `averageWrapUpTime`, `totalInteractionTime`
* **Status** — `userStatusTime`, `queueStatusTime`
* **Live (ongoing)** — `ongoingHandlingInteractions`, `ongoingTalkingInteractions`, `ongoingOnHoldInteractions`, `ongoingWrapUpInteractions`, `ongoingTalkingInteractionsTime`, `ongoingOnHoldInteractionsTime`, `ongoingWrapUpInteractionsTime`, `ongoingTotalHandlingInteractionsTime`, `ongoingAvgHandlingInteractionsTime`, `ongoingAvgTalkingInteractionsTime`

### Example request

> 📘 **Try it out**
>
> You can try this endpoint from the [reference](/analytics/reference/get-agent-queue-activity).
>
>

```bash
curl --location --request GET 'https://api.8x8.com/analytics/work/v2/pbxes/{pbxId}/queue-agent-activity?queueIds={queueId}&startDate=2026-07-01T00:00:00Z&endDate=2026-07-01T23:59:59Z&metrics=acceptedInteractions,missedInteractions,averageTalkingInteractionsTime' \
--header 'Authorization: Bearer {access_token here}' \
--header '8x8-apikey: {8x8-apikey input here}'
```

## Response

The response groups agents by queue. Each entry in `queuesAgentActivity` identifies the queue (`pbx`, `site`, `queueId`, `queueExtension`, `queueName`, `autoLogin`) and holds a `queueAgentActivity` array of the agents working that queue. Each agent entry carries its `queueStatus` / `userStatus`, whether it is an `overflowAgent`, any current `interaction`, and the requested `metrics`.

> 📘 **Durations are in seconds.** Timing and percentage values may be decimals (percentages are 0–100); only counts are integers.
>
>

```json
{
  "queuesAgentActivity": [
    {
      "pbx": "acmecorp",
      "site": "SanJose",
      "queueId": "tqteLkZOScyi0Mai9ewUlA",
      "queueExtension": "1000",
      "queueName": "Support CQ",
      "autoLogin": true,
      "queueAgentActivity": [
        {
          "userId": "5f2c1a90-1b23-4d56-8e90-abcdef012345",
          "agentExtension": "1014",
          "agentName": "Chandler Hollow",
          "queueStatus": "PRIMARY",
          "userStatus": "AVAILABLE",
          "overflowAgent": false,
          "interaction": {
            "caller": "Chay Hoss",
            "address": "1006"
          },
          "metrics": {
            "acceptedInteractions": 30,
            "missedInteractions": 2,
            "averageTalkingInteractionsTime": 138.6,
            "queueStatusTime": 3600.0
          }
        }
      ],
      "summary": {
        "acceptedInteractions": 30,
        "missedInteractions": 2
      }
    }
  ]
}
```

### Response fields

| Field | Description |
| --- | --- |
| queuesAgentActivity[] | One entry per queue matching the filters |
| queuesAgentActivity[].queueId / queueName / queueExtension | Queue identifier, display name and extension |
| queuesAgentActivity[].autoLogin | Whether the queue uses auto-login |
| queuesAgentActivity[].queueAgentActivity[] | Agents working that queue |
| ...queueAgentActivity[].queueStatus / overflowAgent | The agent's role in this queue (primary vs overflow) |
| ...queueAgentActivity[].interaction | The interaction the agent is currently handling, if any |
| ...queueAgentActivity[].metrics | Object holding each requested metric and its value |
| queuesAgentActivity[].summary | Aggregated metrics for the queue (present by default; omitted when `includeSummary=false`) |
