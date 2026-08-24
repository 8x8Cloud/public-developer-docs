---
date: 2026-07-17
products: ["JaaS"]
changeType: Added
title: "Release 6869 meeting features"
---

JaaS release 6869 adds a set of in-meeting improvements across subtitles, the whiteboard, and recording and transcription controls.

## Recording and transcription

Recording and transcription can now be **started and stopped independently**. The buttons, dialogs, and nudges are capability-aware, so they reflect the services actually available in the meeting. Async transcription now works with a **single participant** — sessions start as soon as transcribing is enabled, without needing to reach a minimum participant count — and there's a new option to render speaker IDs in transcriptions.

## Subtitles

- A new `transcription.translationEnabled` config flag controls live translation.
- Subtitles can be toggled directly when translation is disabled, and the closed-captions button title stays in sync with its state.
- Source-language subtitles are shown on stage, with the on-stage speaker name resolved correctly.

## Whiteboard

- **Image sharing** is now supported on the inline web whiteboard.
- The whiteboard auto-opens for remote participants when metadata propagates after a delay.
- Collaboration data is validated before the whiteboard opens, with a notification shown on failure.
- Non-moderators can now close the whiteboard.

## Keeping the screen awake

The screen now stays awake while a participant is **waiting in the lobby**, so the device doesn't sleep before they're admitted.

For the complete list of changes, language updates, and version details, see the [release 6869 notes](/jaas/docs/release-6869). For more on the collaborative whiteboard, see the [Whiteboard guide](/jaas/docs/whiteboard).
