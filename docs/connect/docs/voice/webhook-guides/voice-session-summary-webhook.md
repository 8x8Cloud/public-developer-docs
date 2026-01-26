---
slug: /connect/docs/voice/webhook-guides/voice-session-summary-webhook
title: Voice Session Summary (VSS) webhook
sidebar_label: VSS webhook (overview)
---

The **Voice Session Summary (VSS)** webhook is sent **after a voice session ends**.  It provides a single end-of-session record you can use for monitoring, reporting, retries, and reconciliation.

VSS is configured per **subaccount** as a webhook of type `VSS` using the Webhooks API.

## When VSS is sent

VSS is sent after the platform completes a session (success, no-answer, busy, failed, or error).
If the session cannot be created or completed, the payload may include an `errorDetails` object and/or `sessionStatus: "ERROR"`.

## Configure VSS (Webhooks API)

You register VSS using the Webhooks API:

- API reference: [Create a new webhook](/connect/reference/create-a-new-webhook)
- Setup walkthrough (IVR-focused, but the Webhooks API steps are the same): [Webhook Setup Guide for IVR](/connect/docs/voice/ivr/webhook-setup-guide-for-ivr)

If you need to restrict inbound traffic to your webhook endpoints, see [Voice IP Addresses](/connect/docs/voice/voice-ip-addresses) for the list of outbound IPs used by 8x8 Voice services.

### Example: register a VSS webhook

`POST /api/v1/subaccounts/{subaccountId}/webhooks`

```json
{
  "active": true,
  "type": "VSS",
  "url": "https://your-domain.com/voice/webhooks/vss"
}
```

## Verify and manage VSS webhook (Webhooks API)

### Check current webhook configuration

`GET /api/v1/subaccounts/{subaccountId}/webhooks`

Use this to verify your VSS webhook URL is registered and enabled.

API reference: [Get webhooks information](/connect/reference/get-webhooks-information)

### Delete VSS webhook

`DELETE /api/v1/subaccounts/{subaccountId}/webhooks/VSS`

Use this to remove the VSS configuration for the subaccount (for example, before re-registering with a new URL).

API reference: [Delete a specific type of webhook](/connect/reference/delete-a-specific-type-of-webhook)

## Choose the right payload schema

VSS payloads have **product-specific variants**:

- **IVR** session summary payload: [Session Summary (IVR)](/connect/docs/voice/ivr/session-summary)
- **Voice Messaging** session summary payload: [Session Status](/connect/docs/voice/voice-messaging/session-status)
- **Number Masking** session summary payload:  [Session Summary - Number Masking](/connect/docs/voice/number-masking/session-summary)

## Error codes

If you receive `sessionStatus: "ERROR"` or `errorDetails`, see:

- Voice error codes (VSS): [Voice Error Codes](/connect/docs/voice/error-codes/voice-error-codes)
- API status codes: [Voice Status Codes and Status Messages](/connect/docs/voice/error-codes/voice-status-codes)
- Number Masking error codes: [Number Masking error codes](/connect/docs/voice/error-codes/number-masking-error-codes)

---

## Support Channels

- **Technical support:** [support@cpaas.8x8.com](mailto:support@cpaas.8x8.com)
- **Sales inquiries:** Contact your account manager or visit [cpaas.8x8.com/en/contact-us](https://cpaas.8x8.com/en/contact-us/)
- **Support Portal:** [https://support.cpaas.8x8.com/hc/en-us](https://support.cpaas.8x8.com/hc/en-us)
