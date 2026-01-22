---
slug: /connect/docs/voice/webhook-guides/webhooks-overview
title: Webhooks Overview
---

8x8 CPaaS Voice provides webhook types to notify your application about call events and outcomes. Configure these webhooks at the **subaccount** level to receive **HTTP POST** callbacks.

## Webhook Types

### VSS — Voice Session Summary

**When to use:** End-of-session outcome for monitoring, reporting, retries, and reconciliation.

VSS is sent **after a voice session ends** with details about the call outcome, duration, participants, and any errors encountered.

**What it contains:**
- Session outcome (completed, failed, no-answer, busy, etc.)
- Call duration and timestamps
- Participant information
- Error details (if the session failed)

**Payload schemas by product:**
- [Session Summary (IVR)](/connect/docs/voice/ivr/session-summary) - IVR session outcomes including DTMF input and menu navigation
- [Session Status (Voice Messaging)](/connect/docs/voice/voice-messaging/session-status) - Voice message delivery status
- [Session Summary (Number Masking)](/connect/docs/voice/number-masking/session-summary) - Masked call session details

**General webhook guide:**
- [Voice Session Summary (VSS) webhook](/connect/docs/voice/webhook-guides/voice-session-summary-webhook) - Common VSS webhook structure

### VCA — Voice Call Action

**When to use:** In-call decisions for dynamic callflow control (for example, IVR branching, custom call routing).

VCA is sent **during an active call** when the platform requires your application to decide the next step. Your endpoint can return a callflow response to control what happens next. Use this to build dynamic voice applications with custom business logic.

**References:**
- [Voice Call Action webhook guide](/connect/docs/voice/webhook-guides/voice-call-action-webhook-guide)
- [IVR Call Action Handling](/connect/docs/voice/ivr/call-action-handling)
- [Number Masking Call Action Handling](/connect/docs/voice/number-masking/call-action-handling)
- [Webhook setup guide for IVR](/connect/docs/voice/ivr/webhook-setup-guide-for-ivr)

### VCS — Voice Call Status

**When to use:** Real-time call status updates and progress telemetry.

**Reference:**
- [Call Status (Number Masking)](/connect/docs/voice/number-masking/call-status)

### VRU — Voice Recording Uploaded

**When to use:** Recording availability notifications when call recording is enabled.

**Reference:**
- [Number Masking Call Recordings](/connect/docs/voice/number-masking/call-recordings)

### VNU — Virtual Number Updated

**When to use:** Virtual number lifecycle events and configuration changes.

**Reference:**
- [Virtual Number Updated](/connect/docs/virtual-number-updated-event)

## Error Codes and Status Codes

Understanding the difference between error codes and status codes is crucial for effective debugging:

### API Response Status Codes

**When you see them:** Immediately after making an API request (e.g., Send Callflow API)

**What they indicate:** Whether the API request was accepted, rejected, or encountered an error

**Common scenarios:**
- `200 OK` - Request accepted, session created
- `400 Bad Request` - Invalid request payload
- `401 Unauthorized` - Authentication failed
- `404 Not Found` - Invalid subaccount or endpoint

**Reference:**
- [Voice Status Codes and Status Messages](/connect/docs/voice/error-codes/voice-status-codes) - Complete API response codes

### Session Error Codes (in VSS webhooks)

**When you see them:** In the Voice Session Summary (VSS) webhook payload after a session ends

**What they indicate:** Why a voice session failed or what happened during the call

**Common scenarios:**
- Session completed successfully (no error)
- Call rejected (busy, no answer, invalid number)
- Audio playback failed
- Network or routing errors

**References by product:**
- [Voice Error Codes](/connect/docs/voice/error-codes/voice-error-codes) - General voice session errors (IVR, Voice Messaging)
- [Number Masking Error Codes](/connect/docs/voice/error-codes/number-masking-error-codes) - Number Masking-specific errors

### Key Differences

| Type | Timing | Source | Purpose |
|------|--------|--------|---------|
| **API Status Codes** | Immediate (synchronous) | API response | Validate request acceptance |
| **Session Error Codes** | After session ends (asynchronous) | VSS webhook payload | Diagnose call outcome |

**Example workflow:**
1. You send a Send Callflow API request → Receive **200 OK** status code (request accepted)
2. Call is placed and fails → Receive VSS webhook with **error code -1004** (invalid destination)

## Configuration

Configure webhooks using the Webhooks API (per subaccount):

- Create webhook: `POST /api/v1/subaccounts/{subaccountId}/webhooks`
- List webhooks: `GET /api/v1/subaccounts/{subaccountId}/webhooks`
- Delete webhook: `DELETE /api/v1/subaccounts/{subaccountId}/webhooks/{webhookType}`

**API Reference:**
- [Create a new webhook](/connect/reference/create-a-new-webhook)
- [Get webhooks information](/connect/reference/get-webhooks-information)
- [Delete a specific type of webhook](/connect/reference/delete-a-specific-type-of-webhook)

## Security Best Practices

- Use **HTTPS** endpoints
- Validate inbound requests (for example, allowlist source IPs if your environment supports it)
- Implement **idempotency** (assume duplicate deliveries can occur)
- Return **HTTP 200 OK** quickly and process asynchronously where possible

## Next Steps

- [Webhook setup guide for IVR](/connect/docs/voice/ivr/webhook-setup-guide-for-ivr)
- [Voice Call Action webhook guide](/connect/docs/voice/webhook-guides/voice-call-action-webhook-guide)
- [Voice Session Summary (VSS) webhook](/connect/docs/voice/webhook-guides/voice-session-summary-webhook)

## Support Channels

- **Technical support:** [support@cpaas.8x8.com](mailto:support@cpaas.8x8.com)
- **Sales inquiries:** Contact your account manager or visit [cpaas.8x8.com/en/contact-us](https://cpaas.8x8.com/en/contact-us/)
- **Support Portal:** [https://support.cpaas.8x8.com/hc/en-us](https://support.cpaas.8x8.com/hc/en-us)
