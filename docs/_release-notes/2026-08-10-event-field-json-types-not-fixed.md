---
date: 2026-08-10
products: ["Actions & Events"]
changeType: Fixed
title: "Event Streaming field reference corrected: JSON types are not fixed per field"
---

The Event Streaming field reference previously said boolean values in events "are represented as strings... rather than native JSON booleans" — a claim its own example immediately contradicted by showing both a quoted and an unquoted boolean value in the same payload. The section has been corrected and expanded to describe the actual behavior, which is broader than booleans.

## What changed

Two independent behaviors are now documented:

**1. A value loses its quotes when it looks like a JSON boolean or number.** This is decided per value, not per field, so the same field can arrive quoted in one message and unquoted in the next:

| Underlying value | Appears in the event as |
| --- | --- |
| `resume` | `"resume"` |
| `true` | `true` |
| `0` | `0` |
| `0123` | `"0123"` |

A leading zero keeps its quotes, since `0123` is not a valid JSON number.

**2. Some fields carry different types depending on the event.** `status` is boolean on `LineHoldStatus` and `LineMuteStatus`, but text (`"pause"`, `"resume"`) on `RecordingStatus`.

The docs now recommend accepting both quoted and unquoted forms for boolean-like or numeric fields, reading values as text before converting them, and not letting a single unparseable value stop your consumer — an unacknowledged message is redelivered and a client can loop on it.

The section was renamed to **JSON Types Are Not Fixed Per Field**; the previous anchor still resolves for existing links.

See [Field Reference — JSON Types Are Not Fixed Per Field](/actions-events/docs/streaming/field-reference#boolean-string-representation).
