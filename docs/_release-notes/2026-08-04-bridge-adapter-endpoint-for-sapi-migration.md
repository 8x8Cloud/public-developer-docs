---
date: 2026-08-04
products: ["Actions & Events"]
channel: "Streaming"
changeType: Added
title: "Bridge adapter endpoint for SAPI migration"
---

The Streaming API migration guide now documents a **backwards-compatible adapter (Bridge) endpoint** — a second migration path for existing Streaming API integrations that cannot move to the Pulsar API directly.

## Option 2: adapter migration

Switch to the adapter endpoint with **no code changes** — only the hostname changes:

```text
wss://vcc-sapi-bridge-{region}.8x8.com/...
```

For example, UK3 uses `wss://vcc-sapi-bridge-euw2.8x8.com/...`. The adapter is deployed in the same regions as the Pulsar API and uses the same `{region}` suffixes, and the URL path is unchanged from the legacy Streaming API — so existing clients only replace the hostname.

The adapter is intended for existing integrations only. **New integrations should migrate to the Pulsar API (Option 1)** rather than adopt the adapter.

See the [SAPI streaming migration guide](/actions-events/docs/streaming/migration).
