---
date: 2026-07-23
products: ["Analytics"]
changeType: Added
title: "agentAverageTimeToAnswer metric"
---

The `agentAverageTimeToAnswer` metric is now documented on the Work Analytics agent-activity endpoints. It is a timing metric, reported in seconds, and sits alongside the other agent timing metrics such as `agentTotalTalkTime`, `averageTalkingInteractionsTime`, `averageOnHoldInteractionsTime`, and `averageWrapUpTime`.

## Where it's available

Request `agentAverageTimeToAnswer` through the `metrics` query parameter on either agent-activity endpoint:

| Endpoint | Guide |
| --- | --- |
| `GET /v2/pbxes/{pbxId}/agent-activity` | [Agent Activity](/analytics/docs/work-analytics-agent-activity) |
| `GET /v2/pbxes/{pbxId}/queue-agent-activity` | [Queue Agent Activity](/analytics/docs/work-analytics-queue-agent-activity) |

On the per-queue endpoint the metric is attributed to each queue, so you can compare an agent's timing across the queues they work. Timing values are in seconds and may be returned as decimals.

Full descriptions of every metric are on the reference pages:

- [Agent Activity reference](/analytics/reference/get-agent-activity)
- [Agent Activity per Queue reference](/analytics/reference/get-agent-queue-activity)
