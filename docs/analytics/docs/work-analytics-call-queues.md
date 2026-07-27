# Call Queues

The **Call Queues** report shows how each call queue is performing — how many interactions entered, were accepted, abandoned or diverted, the timing of those interactions, and the current live state of the queue (waiting, on-hold and talking calls, and agent availability).

It is served by a single endpoint:

* `GET /v2/pbxes/{pbxId}/call-queue-metrics` — [Get Call Queue Metrics reference](/analytics/reference/get-queue-metrics)

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
| queueIds | | Restrict to specific call queues (comma-separated). All queues if omitted. | q1,q2 |
| siteIds | | Restrict to specific sites (comma-separated). All sites if omitted. | site1 |
| startDate / endDate | | Historical window in ISO 8601. Omit both for the current live state. | 2026-07-01T00:00:00Z |
| intraDayStart / intraDayEnd | | Optional intra-day window; only valid together with `startDate`/`endDate`. | 2026-07-01T09:00:00Z |
| metrics | | Comma-separated metrics to return (see below). | enteredCalls,acceptedCalls,divertedCalls |
| includeSummary | | Defaults to `true`; pass `false` to omit the aggregated summary across the selected queues. | false |

### Metrics

The full list and per-metric descriptions are on the [reference page](/analytics/reference/get-queue-metrics). They fall into these groups:

* **Volume** — `enteredCalls`, `acceptedCalls`, `acceptedCallsPercentage`, `completedCalls`, `missedCalls`, `missedCallsPercentage`, `abandonedInWaitingCalls`, `abandonedInWaitingCallsPercentage`, `abandonedInHandlingCalls`, `abandonedInHandlingCallsPercentage`, `divertedCalls`, `divertedCallsPercentage`, `forwardedToVoiceMail`, `activeCalls`
* **Timing** (seconds) — `averageTimeToAnswer`, `averageHandlingTime`, `averageWaitingTime`, `averageOnHoldTime`, `averageTalkTime`, `longestWaitingTime`, `longestHandlingTime`, `longestOnHoldTime`, `longestTalkTime`, `totalHandlingTime`, `totalWaitingTime`, `totalTalkTime`, `totalOnHoldTime`
* **Transfers** — `transferredToCallQueue`, `transferredToCallQueuePercentage`, `transferredToRingGroup`, `transferredToRingGroupPercentage`, `transferredToExternalNumber`
* **Live (ongoing)** — `ongoingWaitingCalls`, `ongoingOnHoldCalls`, `ongoingTalkingCalls`, `ongoingTotalCalls`, `ongoingHandlingCalls`, `ongoingAvailableAgents`, `ongoingEligibleAgents`, `ongoingTotalAgents`, `ongoingEnabledPrimaryAgents`, `ongoingEnabledOverflowAgents`, `ongoingEligiblePrimaryAgents`, `ongoingEligibleOverflowAgents`, `ongoingOverflowAgents`, `ongoingPrimaryWrappingUpAgents`, `ongoingOverflowWrappingUpAgents`, `ongoingWrappingUpAgents`, `ongoingLoggedOutAndDndAgents`, `ongoingLoggedOutAndDndOverflowAgents`, `ongoingAvgHandlingTime`, `ongoingAvgTalkingTime`, `ongoingAvgWaitingTime`, `ongoingTotalHandlingTime`, `ongoingTalkingTime`, `ongoingOnHoldTime`, `ongoingWaitingTime`, `ongoingLongestHandlingTime`, `ongoingLongestOnHoldTime`, `ongoingLongestTalkingTime`, `ongoingAvgOnHoldTime`, `ongoingLongestWaitingTime`

> 📘 **How the volume buckets relate**
>
> Every completed queue entry falls into exactly one outcome: `enteredCalls = acceptedCalls + abandonedInWaitingCalls + divertedCalls + missedCalls + abandonedInHandlingCalls`. `forwardedToVoiceMail` is a **sub-case of `divertedCalls`** — the system routed the caller to voicemail (or another queue, ring group or external number) before any agent was offered the call. `transferredTo*` are agent-initiated and can happen after answer, so they are counted within `acceptedCalls`, not as a separate bucket.
>
>

### Example request

> 📘 **Try it out**
>
> You can try this endpoint from the [reference](/analytics/reference/get-queue-metrics).
>
>

```bash
curl --location --request GET 'https://api.8x8.com/analytics/work/v2/pbxes/{pbxId}/call-queue-metrics?startDate=2026-07-01T00:00:00Z&endDate=2026-07-15T23:59:59Z&metrics=enteredCalls,acceptedCalls,divertedCalls,averageTimeToAnswer&includeSummary=true' \
--header 'Authorization: Bearer {access_token here}' \
--header '8x8-apikey: {8x8-apikey input here}'
```

## Response

Each entry in `callQueues` identifies the queue (`pbx`, `site`, `id`, `name`, `extension`, and a `deleted` flag) and carries the requested metrics in a `metrics` object. Unless `includeSummary=false`, a top-level `metricsSummary` object aggregates the same metrics across all returned queues.

> 📘 **Durations are in seconds.**
>
>

```json
{
  "callQueues": [
    {
      "pbx": "acmecorp",
      "site": "SanJose",
      "id": "tqteLkZOScyi0Mai9ewUlA",
      "name": "Support CQ",
      "deleted": false,
      "extension": "1000",
      "metrics": {
        "enteredCalls": 128,
        "acceptedCalls": 111,
        "acceptedCallsPercentage": 86.7,
        "abandonedInWaitingCalls": 12,
        "divertedCalls": 5,
        "divertedCallsPercentage": 3.9,
        "averageTimeToAnswer": 8.2,
        "averageHandlingTime": 254,
        "ongoingWaitingCalls": 2,
        "ongoingTalkingCalls": 6,
        "ongoingAvailableAgents": 4,
        "ongoingAvgOnHoldTime": 15
      }
    }
  ],
  "metricsSummary": {
    "enteredCalls": 128,
    "acceptedCalls": 111,
    "divertedCalls": 5,
    "completedTotalsSum": 116
  }
}
```

### Response fields

| Field | Description |
| --- | --- |
| callQueues[] | One entry per call queue matching the filters |
| callQueues[].id / name / extension | Queue identifier, display name and extension (a **string**) |
| callQueues[].deleted | `true` if the queue has since been deleted |
| callQueues[].pbx / site | PBX and site the queue belongs to |
| callQueues[].metrics | Object holding each requested metric and its value |
| metricsSummary | Aggregated metrics across all returned queues (present by default; omitted when `includeSummary=false`). Includes `completedTotalsSum`. |
