---
date: 2026-07-27
products: ["Analytics"]
changeType: Added
title: "Work Analytics metrics and real-time report guides"
---

The Work Analytics documentation now covers the full metric set for per-agent reporting, and the two guides that back the live agent and queue views have been published.

## Real-time report guides

Two guides describe agent interaction handling. Both return the **current live state** when you omit `startDate` and `endDate`, or a historical window when you supply them:

- [Agent Activity](/analytics/docs/work-analytics-agent-activity) — per-agent handling across the PBX (accepted, missed and rejected interactions, talk, wrap-up and on-hold time, current status and the interaction being handled right now). It backs the User Status view in Analytics for Work.
- [Queue Agent Activity](/analytics/docs/work-analytics-queue-agent-activity) — the same agent-level metrics broken down and attributed **per call queue**, so you can compare an agent across queues and see whether they are a primary or overflow agent.

## Metric groups

Both guides document the metrics you can request via the `metrics` query parameter, grouped as:

| Group | Examples |
| --- | --- |
| Volume | `enteredInteractions`, `acceptedInteractions`, `missedInteractions`, `rejectedInteractions` |
| Timing (seconds) | `agentAverageTimeToAnswer`, `agentTotalTalkTime`, `averageTalkingInteractionsTime`, `averageWrapUpTime`, `totalInteractionTime` |
| Status | `userStatusTime` (plus `queueStatusTime` on Queue Agent Activity) |
| Live (ongoing) | `ongoingHandlingInteractions`, `ongoingTalkingInteractions`, `ongoingWrapUpInteractions` |

Pass a comma-separated list of the metrics you want, and set `includeSummary=false` to omit the aggregated summary.

Full metric descriptions are on the [Agent Activity reference](/analytics/reference/get-agent-activity) and [Agent Activity per Queue reference](/analytics/reference/get-agent-queue-activity).
