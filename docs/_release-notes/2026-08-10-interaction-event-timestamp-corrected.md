---
date: 2026-08-10
products: ["Actions & Events"]
changeType: Fixed
title: "Event Streaming timestamp field corrected: use interactionEventTS for event time"
---

The Event Streaming field and event reference docs previously told integrators to use `eventTS` to calculate durations between lifecycle events — queue time, ring time, talk time, and wrap-up time. That was incorrect: `eventTS` is the time the interaction was first offered (queue entry), and it carries the identical value on every event for a given interaction. Subtracting one event's `eventTS` from another's always evaluates to zero. The field that carries the event's own time is `interactionEventTS`.

## What changed

- `eventTS` is now documented as the interaction's offer/queue-entry time — constant across every event for that interaction — not as a per-event timestamp.
- The queue time, ring time, talk time, and wrap-up time recipes now use `interactionEventTS`.
- The Go, Java, Python, and Node.js interaction-timeline code samples now read `interactionEventTS`, and handle the event types where it's absent — `GuestChatEnd`, `AgentUpdate`, `AgentLoginUpdate`, and `AgentProvChange` — by falling back to `msgInfo.timestamp` instead of defaulting to zero, which could previously decode as 1 January 1970.
- A new **Choosing a Timestamp** section explains when to use `interactionEventTS`, `eventTS`, or `msgInfo.timestamp`, and notes that the two epoch-second fields are truncated rather than rounded.

See the updated docs:

- [Field Reference — Choosing a Timestamp](/actions-events/docs/streaming/field-reference#choosing-a-timestamp)
- [Event Lifecycle](/actions-events/docs/streaming/event-lifecycle)
- [Event Reference](/actions-events/docs/streaming/event-reference)
- [Message Format](/actions-events/docs/streaming/message-format)
