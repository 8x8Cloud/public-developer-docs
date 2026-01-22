---
slug: /connect/docs/voice/cpaas-voice-offerings
title: CPaaS Voice offerings
sidebar_label: CPaaS Voice offerings
---

The **[8x8 CPaaS Voice](https://www.8x8.com/products/apis)** offering provides building blocks to deliver voice experiences such as **[WhatsApp Business Calling](/connect/docs/voice/whatsapp-business-calling-overview)**, **[IVR](/connect/docs/voice/ivr/ivr-introduction)**, **[Voice Messaging](/connect/docs/voice/voice-messaging/voice-messaging-guide)**, and **[Number Masking](/connect/docs/voice/number-masking/getting-started)** (call bridging)—with optional **[webhooks](/connect/docs/voice/webhook-guides/voice-call-action-webhook-guide)**, **[recordings](/connect/reference/create-a-new-recording-push-config)**, and **[reporting](/connect/reference/start-voice-log-export-job)** for production use.

> This page is a **guides-first overview**. Each section links you to the relevant guides and (where helpful) the matching API reference pages.

---

## What you can build

### WhatsApp Business Calling

Make and receive voice calls directly within WhatsApp conversations for customer support, sales follow-ups, and appointment confirmations.

What it enables:

- **User-initiated calling** — customers tap to call your business
- **Business-initiated calling** — your agents can proactively call customers
- **Seamless experience** — no dialer switching, calls stay in WhatsApp

Guide:

- [WhatsApp Business Calling Overview](/connect/docs/voice/whatsapp-business-calling-overview)

---

### Interactive Voice Response (IVR)

Create dynamic phone menus with voice prompts and keypad input (DTMF). Route callers based on their selections and integrate with your backend systems.

What it enables:

- Multi-level menus with voice prompts
- Capture caller input via DTMF using `sayAndCapture`
- Route calls based on business logic
- Integrate with CRM and ticketing systems via webhooks

Guides:

- [IVR – Introduction](/connect/docs/voice/ivr/ivr-introduction)
- [Simple IVR – Quick start](/connect/docs/voice/ivr/simple-ivr-guide)
- [Advanced IVR](/connect/docs/voice/ivr/advanced-ivr-guide)

Common supporting guides:

- Webhooks for interactive flows:  [Voice Call Action webhook guide](/connect/docs/voice/webhook-guides/voice-call-action-webhook-guide)
- Errors: [Voice Error Codes](/connect/docs/voice/error-codes/voice-error-codes) (VSS), [Voice Status Codes](/connect/docs/voice/error-codes/voice-status-codes) (API)

---

### Voice Messaging

Send automated voice messages using text-to-speech or pre-recorded audio—commonly used for reminders, delivery notifications, and alerts.

What it enables:

- TTS with configurable voices and languages
- Playback of hosted audio files (MP3/WAV via HTTP/HTTPS)
- Simple one-way message flows (call → play → hang up)
- Delivery/completion outcomes via session status

Guides:

- [Voice Messaging – Guide](/connect/docs/voice/voice-messaging/voice-messaging-guide)

Common supporting guides:

- Session outcomes: [Session Status (Voice Session Summary)](/connect/docs/voice/voice-messaging/session-status)
- Errors: [Voice Error Codes](/connect/docs/voice/error-codes/voice-error-codes) (VSS), [Voice Status Codes](/connect/docs/voice/error-codes/voice-status-codes) (API)

---

### Number Masking (call bridging)

Protect caller privacy by masking phone numbers during calls. Typically implemented by bridging two call legs and controlling session behavior.

What it enables:

- Anonymous calling between two parties
- Dynamic number assignment and session-based privacy controls
- Optional call recording and monitoring (if enabled)
- Webhook-driven call routing decisions

Guides:

- [Getting started with Number Masking](/connect/docs/voice/number-masking/getting-started)
- [How Number Masking Protects Privacy](/connect/docs/voice/number-masking/how-number-masking-protects-customer-privacy)

Common supporting guides:

- Errors: [Number Masking error codes](/connect/docs/voice/error-codes/number-masking-error-codes)

---

### Voice SDK

Embed voice calling into your mobile applications with native iOS and Android SDKs.

Guides:

- [Voice SDK Overview](/connect/docs/voice/voice-sdk-overview)
- [Android – Integrating the SDK](/connect/docs/voice/voice-sdk-android-integrating)
- [iOS – Integrating the SDK](/connect/docs/voice/voice-sdk-ios-integrating)

---

## Webhooks and session outcomes (for production apps)

Interactive experiences ([IVR](/connect/docs/voice/ivr/ivr-introduction), [number masking routing](/connect/docs/voice/number-masking/getting-started), dynamic call logic) typically require webhooks.

### Voice Call Action webhook (VCA)

Use this guide when your backend needs to make decisions **during** a call—most commonly to process DTMF input from [IVR menus](/connect/docs/voice/ivr/simple-ivr-guide) and return the next step.

- [Voice Call Action webhook guide](/connect/docs/voice/webhook-guides/voice-call-action-webhook-guide)

### Voice Session Summary (VSS webhook)

Use these guides when you need reliable end-of-call outcomes for analytics, retries, reporting, and reconciliation delivered via the Voice Session Summary webhook.

Session summary webhook payloads vary by product:

- [Voice Session Summary (VSS) webhook](/connect/docs/voice/webhook-guides/voice-session-summary-webhook) - Overview
- [Session Summary (IVR)](/connect/docs/voice/ivr/session-summary) - IVR-specific payload
- [Session Status (Voice Messaging)](/connect/docs/voice/voice-messaging/session-status) - Voice Messaging-specific payload
- [Session Summary (Number Masking)](/connect/docs/voice/number-masking/session-summary) - Number Masking-specific payload

---

## Error codes and status codes (debugging)

Use these guides to troubleshoot [callflows](/connect/reference/ivr-send-callflow) and runtime outcomes.

**Voice error codes and status codes:**
- [Voice Error Codes](/connect/docs/voice/error-codes/voice-error-codes) - Errors reported in Voice Session Summary (VSS) webhook
- [Voice Status Codes and Status Messages](/connect/docs/voice/error-codes/voice-status-codes) - API response codes from callflow submission

**Number Masking-specific:**
- [Number Masking error codes](/connect/docs/voice/error-codes/number-masking-error-codes)

---

## Useful API reference pages (optional)

Most readers can stay within guides. If you are implementing or validating requests, these reference pages are the authoritative source for endpoints and schemas:

- Callflows: [Send Callflow](/connect/reference/ivr-send-callflow)
- Webhook configuration: [Create a new webhook](/connect/reference/create-a-new-webhook), [Get webhook information](/connect/reference/get-webhooks-information)
- Voice profiles (TTS voices): [Get voice profile information](/connect/reference/get-voice-profile-information)
- Virtual numbers: [Get My Virtual Numbers](/connect/reference/get-virtual-numbers), [Check Virtual Number](/connect/reference/check-virtual-number)
- Recording: [Create a new recording push config](/connect/reference/create-a-new-recording-push-config), [Get recording status](/connect/reference/get-recording-status-information)
- Reporting: [Start voice log export job](/connect/reference/start-voice-log-export-job)

---

## Support Channels

- **Technical support:** [support@cpaas.8x8.com](mailto:support@cpaas.8x8.com)
- **Sales inquiries:** Contact your account manager or visit [cpaas.8x8.com/en/contact-us](https://cpaas.8x8.com/en/contact-us/)
- **Support Portal:** [https://support.cpaas.8x8.com/hc/en-us](https://support.cpaas.8x8.com/hc/en-us)
