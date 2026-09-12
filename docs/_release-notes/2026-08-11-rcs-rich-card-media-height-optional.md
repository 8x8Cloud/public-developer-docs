---
date: 2026-08-11
products: ["Connect", "APIs"]
channel: "RCS"
changeType: Fixed
title: "RCS rich card media height documented as optional"
---

The `media.height` field on RCS rich cards was documented as if a value were always required. It is now clarified as **optional**, defaulting to `SHORT` when omitted.

## What changed

| Field | Type | Description |
| --- | --- | --- |
| `media.height` | string | `SHORT`, `MEDIUM`, or `TALL`. Vertical cards only. Optional — defaults to `SHORT` when omitted. |

This applies to vertical rich cards sent through the Messaging API. Horizontal cards are unaffected, since `media.height` only applies to the vertical orientation.

## Where to look

- [RCS message types and samples](/connect/docs/rcs/message-types) — updated rich card field reference
- [Send message — API reference](/connect/reference/send-message)
- [Send message batch — API reference](/connect/reference/send-message-many)
