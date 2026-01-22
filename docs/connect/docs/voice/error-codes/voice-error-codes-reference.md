---
slug: /connect/docs/voice/error-codes/voice-error-codes-reference
title: Voice Error Codes Reference
sidebar_label: Voice Error Codes
---

Quick reference for Voice Session Summary (VSS) webhook error codes. For detailed explanations and troubleshooting guidance, see the [Voice Error Codes Guide](/connect/docs/voice/error-codes/voice-error-codes).

## When You See These

Error codes appear in the **Voice Session Summary (VSS) webhook** after a voice session has ended or failed. These indicate problems during call execution, not API validation issues.

## Error Codes

| Error Code | Description |
| --- | --- |
| -2001 | An internal error has occurred |
| -2002 | An internal connectivity error has occurred |
| -2003 | The call flow provided is invalid |
| -2004 | No coverage available for requested area |
| -2005 | Unable to synthesize text to speech |
| -2006 | Unable to download file for playback |
| -2007 | The validity period of the call flow request has expired |
| -2008 | The provided source MSISDN or caller ID is not whitelisted |
| -2009 | The scenario parameters provided is invalid |
| -2010 | The trunk capacity has been exceeded |
| -9999 | An unknown error has occurred |

## Related Documentation

- **Detailed guide:** [Voice Error Codes](/connect/docs/voice/error-codes/voice-error-codes) - Complete troubleshooting information
- **API response codes:** [Voice Status Codes Reference](/connect/reference/voice-status-codes)
- **Number Masking errors:** [Number Masking Error Codes](/connect/docs/voice/error-codes/number-masking-error-codes)
- **VSS webhook:** [Voice Session Summary Webhook](/connect/docs/voice/webhook-guides/voice-session-summary-webhook)
