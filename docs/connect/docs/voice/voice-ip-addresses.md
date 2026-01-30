---
slug: /connect/docs/voice/voice-ip-addresses
title: Voice IP addresses
sidebar_label: Voice IP addresses
---

## Overview

If you need to restrict inbound traffic to your webhook endpoints, whitelist the following outbound IP addresses. These are the source IPs used by 8x8 Voice services when delivering webhook events to your configured endpoints.

For messaging product IP addresses, see the main [IP Address List](/connect/docs/ip-address-list) page.

## Voice Products and Webhooks

The following outbound IP addresses apply to webhook deliveries from all Voice products.

### Number Masking

Number Masking delivers the following webhooks:

- **Voice Call Action webhook** - Receives in-call events when the platform needs your application to decide the next step in the callflow, used for dynamic routing decisions
- **Voice Session Summary webhook** - Receives end-of-session outcomes with call details, duration, participants, and error information after the call ends
- **Voice Call Status webhook** - Receives real-time call status updates during active calls for monitoring call progress
- **Voice Recording Uploaded webhook** - Receives notifications when call recordings are available for download
- **Virtual Number Updated webhook** - Receives notifications about virtual number lifecycle events, health status changes, and configuration updates

[Learn more about Number Masking](/connect/docs/voice/number-masking/getting-started)

### Voice Messaging

Voice Messaging delivers the following webhooks:

- **Voice Session Summary webhook** - Receives end-of-session outcomes including message delivery status, duration, and error information after the voice message completes

[Learn more about Voice Messaging](/connect/docs/voice/voice-messaging/voice-messaging-guide)

### Interactive Voice Response

Interactive Voice Response delivers the following webhooks:

- **Voice Call Action webhook** - Receives in-call events with DTMF input when the caller presses keys, requiring your application to return the next callflow steps for menu navigation
- **Voice Session Summary webhook** - Receives end-of-session outcomes with call details, menu navigation history, captured DTMF input, and error information after the IVR session ends

[Learn more about Interactive Voice Response](/connect/docs/voice/ivr/ivr-introduction)

### Programmable SIP

Programmable SIP customers receive the following webhooks:

- **Voice Session Summary webhook** - Receives end-of-session outcomes with call details, duration, participants, and error information after the call ends

Contact your account manager for Programmable SIP documentation and setup information.

## IP Addresses to Whitelist

Whitelist the following outbound IP addresses to allow webhook deliveries from 8x8 Voice services to your endpoints:

| Platform Region | IP Addresses |
| --------------- | ------------ |
| Asia Pacific (Singapore) | 18.140.80.2, 52.220.253.234, 54.255.116.8, 52.74.232.241 |

*This list was updated on: January 1st, 2026.*

## Related Pages

- [IP Address List](/connect/docs/ip-address-list) - Complete IP address list including messaging products
- [Security](/connect/docs/security-1) - Security best practices and recommendations
- [Voice Overview](/connect/docs/voice/cpaas-voice-offerings) - CPaaS Voice offerings overview
