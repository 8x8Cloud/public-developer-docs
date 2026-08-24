---
date: 2026-08-06
products: ["Analytics"]
changeType: Changed
title: "alerting.rt scope clarified"
---

The Real-Time Statistics documentation now spells out exactly what the `alerting.rt` metric counts and what it excludes, so it is interpreted consistently. This is a documentation clarification — there is no change to the metric's behaviour.

`alerting.rt` is the number of interactions currently being presented to an agent and awaiting acceptance or rejection. The clarified definition makes two things explicit:

- **Internal interactions are excluded.** Agent-to-agent calls and chats do not count toward `alerting.rt`.
- **Scope depends on the reading.** The queue-scoped reading counts interactions from the current queue only — even though the metric has no `.inQueue` suffix. The agent-scoped reading (v1+ and v5+) counts across all of the agent's queues and includes direct assignments; on v5+ this includes queues not named in the request.

If you build alerting or wallboard views on this metric, re-check your assumptions against the updated definition — particularly the exclusion of internal agent-to-agent interactions.
