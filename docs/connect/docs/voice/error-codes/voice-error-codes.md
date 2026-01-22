---
slug: /connect/docs/voice/error-codes/voice-error-codes
title: Voice Error Codes
---

## Overview

Voice error codes are reported in the **Voice Session Summary (VSS)** webhook when errors occur during call execution. Unlike [status codes](/connect/docs/voice/error-codes/voice-status-codes) which are returned immediately in the API response, these error codes indicate problems that happened while the call was being processed.

**When you receive these codes:**
- In the Voice Session Summary (VSS) webhook
- After the voice session has ended or failed
- In the `errorDetails` field or related error information in the VSS payload

**What they indicate:**
- Internal system errors
- Connectivity or routing issues
- Problems with callflow execution (TTS, file playback, etc.)
- Capacity or permission restrictions

## Applicable To

These error codes apply to all voice products using the 8x8 Voice Platform:
- Interactive Voice Response (IVR)
- Voice Messaging
- Number Masking (see also [Number Masking-specific error codes](/connect/docs/voice/error-codes/number-masking-error-codes))
- Any voice application using callflows

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

- [Voice Status Codes and Status Messages](/connect/docs/voice/error-codes/voice-status-codes) - API response validation codes
- [Number Masking Error Codes](/connect/docs/voice/error-codes/number-masking-error-codes) - Number Masking-specific errors
- [Voice Session Summary (VSS) Webhook](/connect/docs/voice/webhook-guides/voice-session-summary-webhook) - Where these error codes appear
