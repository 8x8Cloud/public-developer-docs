---
slug: /connect/docs/voice/error-codes/voice-status-codes-reference
title: Voice Status Codes Reference
sidebar_label: Voice Status Codes
---

Quick reference for Voice API response status codes. For detailed explanations and troubleshooting guidance, see the [Voice Status Codes Guide](/connect/docs/voice/error-codes/voice-status-codes).

## When You See These

Status codes are returned **immediately** in the API response when submitting a callflow to the Callflows API (`POST /api/v1/subaccounts/{subaccountId}/callflows`).

## Status Codes

| Status Code | Message |
| --- | --- |
| 1 | Created |
| -1001 | Invalid JSON request body |
| -1002 | Speech profile or language parameter invalid |
| -1003 | Valid maxDigits required when minDigits provided |
| -1004 | DTMF callback url not provided |
| -1005 | Valid overallTimeout is required when digitTimeout provided |
| -1006 | OverallTimeout should be greater than digitTimeout |
| -1007 | Invalid action type was used |
| -1008 | Valid maxDigits is required when completeOnHash is false |
| -1009 | Invalid call flow entry provided |
| -1010 | Some actions are provided beyond the allowed count |
| -1011 | Multiple destination phone numbers found in the request |
| -1012 | Invalid Callflow: Incorrect use of action Hangup |
| -1013 | Invalid Callflow: First action should be a MakeCall action |
| -1014 | Source or caller ID is not allowed |
| -1015 | The validity period of the call flow request has expired |
| -1016 | Invalid Callflow Content: Some special characters are invalid/unaccepted |
| -1017 | Invalid MSISDN format in Destination |
| -1018 | Invalid Callflow: Execute Scenario cannot be processed together with other actions |
| -1019 | Invalid Callflow Content: scenarioName is null or empty |
| -1020 | Invalid Callflow: Invalid scenarioName or account doesn't have permission |
| -9999 | An unknown error has occurred |

## Related Documentation

- **Detailed guide:** [Voice Status Codes and Status Messages](/connect/docs/voice/error-codes/voice-status-codes) - Complete explanations with examples
- **Session errors:** [Voice Error Codes Reference](/connect/reference/voice-error-codes)
- **API reference:** [Send Callflow](/connect/reference/send-callflow)
