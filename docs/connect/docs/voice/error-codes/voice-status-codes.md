---
slug: /connect/docs/voice/error-codes/voice-status-codes
title: Voice Status Codes and Status Messages
---

## Overview

Status codes and status messages are returned in the API response when you submit a callflow to the **Callflows API**. These codes indicate whether your callflow request was successfully accepted and a session was created, or if there were validation errors in your request.

**When you receive these codes:**
- **Immediately** after submitting a callflow via the Callflows API
- As part of the API response body

**What they indicate:**
- **Status Code 1** with **"CREATED"** status - Your callflow passed validation and a session was created
- **Negative status codes** with **"NOT_CREATED"** status - Your callflow has validation errors and was rejected

**Note:** These are API validation codes. Execution errors that occur during the call will be reported via the Voice Session Summary (VSS) webhook, not in the initial API response.

## Applicable To

These status codes apply to all products using the **Callflows API**:
- Interactive Voice Response (IVR)
- Voice Messaging
- Any voice application using callflow submissions

## Status Codes and Messages

| Status Code | Message                                                                                                                                                                                                                                 |
| --- |-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1 | Created                                                                                                                                                                                                                                 |
| -1001 | Invalid JSON request body                                                                                                                                                                                                               |
| -1002 | Speech profile or language parameter invalid                                                                                                                                                                                            |
| -1003 | Valid maxDigits required when minDigits provided                                                                                                                                                                                        |
| -1004 | DTMF callback url not provided                                                                                                                                                                                                          |
| -1005 | Valid overallTimeout is required when digitTimeout provided                                                                                                                                                                             |
| -1006 | OverallTimeout should be greater than digitTimeout                                                                                                                                                                                      |
| -1007 | Invalid action type was used. Accepted action type is [say, sayAndcapture, makeCall, hangup, playFile]                                                                                                                                  |
| -1008 | Valid maxDigits is required when completeOnHash is false                                                                                                                                                                                |
| -1009 | Invalid call flow entry provided. [Additional error details here].<br>Eg: Invalid call flow entry provided. $.callflow[0].params.text: is missing but it is required                                                                    |
| -1010 | Some actions are provided beyond the allowed count                                                                                                                                                                                      |
| -1011 | Multiple destination phone numbers found in the request                                                                                                                                                                                 |
| -1012 | Invalid Callflow : Incorrect use of action Hangup                                                                                                                                                                                       |
| -1013 | Invalid Callflow : First action should be a MakeCall action                                                                                                                                                                             |
| -1014 | Source or caller ID is not allowed                                                                                                                                                                                                      |
| -1015 | The validity period of the call flow request has expired                                                                                                                                                                                |
| -1016 | Invalid Callflow Content: Some special characters are invalid/unaccepted                                                                                                                                                                |
| -1017 | Invalid MSISDN format in Destination                                                                                                                                                                                                    |
| -1018 | "Invalid Callflow: " or <br>"Execute Scenario cannot be processed together with other actions |
| -1019 | Invalid Callflow Content: scenarioName is null or empty                                                                                                                                                                                 |
| -1020 | Invalid Callflow: Invalid scenarioName or the account doesn't have permission to execute this scenario                                                                                                                                  |
| -9999 | An unknown error has occurred.                                                                                                                                                                                                          |
