---
date: 2026-09-02
products: ["Connect", "APIs"]
channel: "Voice"
changeType: Added
title: "Correlation and batch IDs on the Callflows API"
---

The Callflows API now accepts two optional top-level fields for tracking your own requests: `clientRequestId` and `clientBatchId`. Both are echoed back in the Voice Session Summary (VSS) webhook, so you can correlate a webhook back to the request that created it, or to the batch it belongs to, without keeping your own mapping table.

## New request fields

| Field | Type | Description |
| --- | --- | --- |
| `clientRequestId` | string (max 50 chars) | Your own identifier for this call. Echoed back in the session summary webhook. This is a correlation identifier only — it is not an idempotency key, so sending the same value more than once still places more than one call. |
| `clientBatchId` | string (max 50 chars) | Your own identifier for a group of related calls. Set the same value on several callflow requests to tag them as one batch; it is echoed back in the session summary webhook for every call in the group. |

```json
{
  "clientRequestId": "order-4821-reminder",
  "callflow": [
    { "action": "makeCall", "params": { "source": "+6588000000", "destination": "+6590000000" } }
  ]
}
```

Both fields are also documented in the IVR, Number Masking, and Voice Messaging session summary webhook payloads, so you can read `clientRequestId` and `clientBatchId` back out alongside the rest of the session details.

## Also fixed

The `playFile` request example in the Callflows request schema previously showed `fileUrl` and `repetition` as top-level properties. It's corrected to show them nested under `params`, matching the actual request shape:

```json
{
  "action": "playFile",
  "params": {
    "fileUrl": "https://example.com/audio/notification.mp3",
    "repetition": 2
  }
}
```

## Where to look

- [Send Callflow — API reference](/connect/reference/send-callflow)
- [Session Summary (IVR)](/connect/docs/voice/ivr/session-summary)
- [Session Summary (Number Masking)](/connect/docs/voice/number-masking/session-summary)
- [Session Summary (Voice Messaging)](/connect/docs/voice/voice-messaging/session-status)
