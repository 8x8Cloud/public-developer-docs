---
date: 2026-08-26
products: ["Actions & Events"]
changeType: Changed
title: "Event Streaming migration guidance updated for general availability"
---

The Event Streaming migration guide and overview no longer describe moving off the legacy Streaming API (SAPI) as optional. Existing customers are automatically migrated to the Pulsar-based Event Streaming service on a rolling schedule, with advance notice sent ahead of each migration.

## What changed

- **Automatic migration replaces "migration is optional."** The overview and migration guide now state that existing customers are migrated automatically; staying on the legacy API indefinitely is no longer presented as a supported choice.
- **"Option 3: Stay on Legacy" is replaced by "What Happens If You Do Nothing."** If you take no action, your integration is automatically switched to the new platform through the backwards-compatible adapter — no code changes required — after you receive advance notice of your migration date.
- **"No forced deadline" is replaced by a rolling schedule with advance notice.** Migrations happen on a per-cluster schedule, each preceded by a notification.
- Options 1 (full migration) and 2 (adapter endpoint) remain available if you want to move, or access new features, ahead of your scheduled migration date.
- Both pages now include an Apache Pulsar trademark attribution.

See the updated docs:

- [Event Streaming Overview](/actions-events/docs/streaming/overview)
- [SAPI Migration Guide](/actions-events/docs/streaming/migration)
