---
slug: /connect/docs/voice/error-codes/number-masking-error-codes
title: Number Masking Error Codes
---

## Overview

Number Masking error codes are reported in Number Masking-specific callbacks and session summaries when errors occur during call bridging sessions. These codes help diagnose issues specific to Number Masking scenarios such as privacy-protected call routing, virtual number handling, and two-party call bridging.

**When you receive these codes:**
- In the [Session Summary (Number Masking)](/connect/docs/voice/number-masking/session-summary) webhook
- In the [Call Status (Number Masking)](/connect/docs/voice/number-masking/call-status) webhook
- After a Number Masking session has ended or failed
- In the `errorDetails` field of the webhook payload when `sessionStatus` is "ERROR"

**What they indicate:**
- Call bridging and routing failures
- Virtual number configuration issues
- Privacy protection enforcement problems
- Network connectivity or coverage limitations specific to masked call routing

**Related documentation:**
- For general voice errors applicable across all voice products, see [Voice Error Codes](/connect/docs/voice/error-codes/voice-error-codes)
- For API validation errors, see [Voice Status Codes and Status Messages](/connect/docs/voice/error-codes/voice-status-codes)
- For Number Masking implementation guides, see [Getting Started with Number Masking](/connect/docs/voice/number-masking/getting-started)

## Applicable To

These error codes are specific to **Number Masking** (call bridging) scenarios:
- Anonymous call routing between two parties
- Privacy-protected communication sessions
- Virtual number-based call forwarding
- Two-leg call bridging implementations

## Error Codes

| Error Code | Message |
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

## Troubleshooting Common Number Masking Errors

### Error -2004: No coverage available for requested area

This error typically occurs when attempting to route calls to or from regions not supported by your Number Masking configuration. Verify that both caller and callee regions are within your account's coverage area.

### Error -2007: Validity period expired

Number Masking sessions have a validity period to ensure privacy and security. This error indicates the session expired before the call could be established. Consider adjusting your session timeout settings or implementing retry logic.

### Error -2008: Source MSISDN not whitelisted

For privacy and fraud prevention, Number Masking requires caller IDs to be whitelisted. Ensure all source numbers used in your Number Masking flows are registered and approved for your account.

### Error -2010: Trunk capacity exceeded

This indicates your concurrent call limit has been reached. Contact your account manager to review capacity requirements and adjust limits if needed.
