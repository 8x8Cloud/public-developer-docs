---
slug: /connect/docs/voice/ivr/ivr-introduction
title: IVR - Introduction
---

## Overview

8x8 IVR is built on our programmable voice capabilities. 8x8 Interactive Voice Response Service is an automated telephone system that combines pre-recorded messages or text-to-speech (TTS) technology with a dual-tone multi-frequency (DTMF) interface to provide real-time user interaction over the Public Switched Telephone Network.

IVR can be used for interactive outbound call outreach and for handling inbound calls to improve the customer experience by providing a self-service method for customers.

Actions (methods) that can be used in a predefined IVR flow:

- **Say** – Plays synthesized speech into the current call using text-to-speech.
- **SayAndCapture** – Plays a voice file (or TTS) into the call, then captures the caller’s DTMF input and reports it back via the Voice Call Action (VCA) webhook.
- **makeCall** – Initiates an outgoing call to the desired destination. This function should be used to connect the first call with another party.
- **playFile** – Downloads the sound/voice file provided and plays it back in the currently active call.
- **Hangup** – Disconnects all active calls. This terminates the session and triggers the session summary webhook.

Main Voice IVR features include:

- Wide range of languages – use the [Voice Profile API](/connect/reference/get-voice-profile-information) to retrieve the full range of voice profiles
- User input support over DTMF
- Voice Call Action webhook
- Dedicated local numbers where applicable
- Billing per successful call
- Detailed reports and statistics

## IVR flow

The diagram below shows a simple inbound IVR flow:

![IVR Diagram for Public Docsedited](../../../images/voice/e1df0d53239a21206560481ead93b15d57b4fb7cf914657191b36cfee46c7a30-IVR_Diagram_for_Public_Docsedited.png)

## Related Guides

### Getting Started

- **[Simple IVR Guide](/connect/docs/voice/ivr/simple-ivr-guide)** – Build your first IVR menu with step-by-step examples. Perfect for beginners who want to create basic phone menus with DTMF input.

- **[Advanced IVR Guide](/connect/docs/voice/ivr/advanced-ivr-guide)** – Learn advanced techniques like nested menus, database integration, and complex call routing logic.

### Technical References

- **[Voice Call Action Webhook Guide](/connect/docs/voice/webhook-guides/voice-call-action-webhook-guide)** – Understand how Voice Call Action (VCA) webhooks work across all 8x8 voice products (IVR, Number Masking, Voice Messaging). Learn about webhook payload structure and how to respond dynamically.

- **[IVR Call Action Handling](/connect/docs/voice/ivr/call-action-handling)** – Detailed documentation on handling VCA webhook callbacks specifically for IVR, including payload examples and response structures.

### Setup Guides

- **[Webhook Setup Guide for IVR](/connect/docs/voice/ivr/webhook-setup-guide-for-ivr)** – Configure your webhook endpoints to receive IVR events.

## Prerequisites

Before you get started, please contact your account manager to ensure that your account has access to this product and that the following points have been managed:

- You will need a new sub-account ID to enable and set up 8x8’s IVR service.
- To use our inbound IVR product, you require a Virtual Number that will be allocated to your sub-account by our 8x8 team.
- You will need to set up and configure an endpoint where the Voice Call Action webhook will be sent. You can use the [Webhooks APIs](/connect/reference/create-a-new-webhook) to set up your endpoints. Once that is completed you are ready to use our IVR product and begin building your call flows.

---

## Related Documentation

- **IVR Guides:**
  - [Simple IVR](/connect/docs/voice/ivr/simple-ivr-guide)
  - [Advanced IVR](/connect/docs/voice/ivr/advanced-ivr-guide)
  - [IVR Call Action Handling](/connect/docs/voice/ivr/call-action-handling)
  - [Webhook Setup Guide for IVR](/connect/docs/voice/ivr/webhook-setup-guide-for-ivr)

- **Webhooks:**
  - [Session Summary (IVR)](/connect/docs/voice/ivr/session-summary) - Detailed payload reference
  - [Voice Call Action Webhook Guide](/connect/docs/voice/webhook-guides/voice-call-action-webhook-guide)
  - [Voice Session Summary Webhook](/connect/docs/voice/webhook-guides/voice-session-summary-webhook)

- **API Reference:**
  - [Send Callflow](/connect/reference/send-callflow)
  - [Voice API Introduction](/connect/docs/voice/api-introduction)

---

## Error Handling

For error codes that may appear in the Voice Session Summary, see the [Voice Error Codes](/connect/docs/voice/error-codes/voice-error-codes) reference. For API response status codes, see [Voice Status Codes and Status Messages](/connect/docs/voice/error-codes/voice-status-codes).

## Support Channels

- **Technical support:** [support@cpaas.8x8.com](mailto:support@cpaas.8x8.com)
- **Sales inquiries:** Contact your account manager or visit [cpaas.8x8.com/en/contact-us](https://cpaas.8x8.com/en/contact-us/)
- **Support Portal:** [https://support.cpaas.8x8.com/hc/en-us](https://support.cpaas.8x8.com/hc/en-us)
