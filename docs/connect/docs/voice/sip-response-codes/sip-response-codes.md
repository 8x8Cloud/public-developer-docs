---
slug: /connect/docs/voice/sip-response-codes/sip-response-codes
title: CPaaS Voice SIP Response Codes
sidebar_label: SIP Response Codes
---

## Overview

SIP (Session Initiation Protocol) response codes are standardized three-digit codes defined in [RFC 3261](https://tools.ietf.org/html/rfc3261) that indicate the outcome of call setup attempts. These codes appear in Voice Call Action (VCA) and Voice Call Status (VCS) webhooks as `sipCode` and help diagnose call failures, network issues, and endpoint behavior.

**Note:** CDRs (Call Detail Records) are a separate feature available to SIP trunk customers and when a support ticket is created with [8x8 CPaaS Support](mailto:support@cpaas.8x8.com). For CPaaS Voice products (Voice Messaging, IVR, Number Masking, Programmable SIP), call outcomes are available via Voice Session Summary webhooks and the Reporting API, while SIP response codes are exposed via Voice Call Action and Voice Call Status webhooks.

## SIP Response Code Categories

### 1xx - Provisional Responses

Indicates the request has been received and is being processed.

| Code | Reason Phrase | Description |
|------|---------------|-------------|
| 100 | Trying | Request received, processing continues |
| 180 | Ringing | Destination is being alerted (phone is ringing) |
| 181 | Call Is Being Forwarded | Call is being forwarded to another destination |
| 182 | Queued | Destination is temporarily unavailable, request queued |
| 183 | Session Progress | Conveys information about the progress of a call |

### 2xx - Success Responses

Indicates the request was successful.

| Code | Reason Phrase | Description |
|------|---------------|-------------|
| 200 | OK | Request successful (call answered) |
| 202 | Accepted | Request accepted for processing, but processing not complete |

### 3xx - Redirection Responses

Further action is needed to complete the request (typically forwarding scenarios).

| Code | Reason Phrase | Description |
|------|---------------|-------------|
| 300 | Multiple Choices | Multiple options available for the requested resource |
| 301 | Moved Permanently | User can no longer be found at the original address |
| 302 | Moved Temporarily | User temporarily moved to a different address |
| 305 | Use Proxy | Requested resource must be accessed through a proxy |
| 380 | Alternative Service | Call failed but alternative services are available |

### 4xx - Client Error Responses

The request contains bad syntax or cannot be fulfilled by the server.

| Code | Reason Phrase | Description | Common Cause |
|------|---------------|-------------|--------------|
| 400 | Bad Request | Malformed request syntax | Malformed number or SIP headers |
| 401 | Unauthorized | Authentication required | Invalid credentials |
| 402 | Payment Required | Reserved for future use (billing/prepaid scenarios) | - |
| 403 | Forbidden | Server refuses to authorize the request | Unauthorized Caller ID or restricted destination |
| 404 | Not Found | User does not exist at the domain specified | Invalid phone number |
| 405 | Method Not Allowed | Request method not supported for the target | - |
| 406 | Not Acceptable | Response doesn't match acceptable values in request headers | - |
| 407 | Proxy Authentication Required | Client must authenticate with a proxy | - |
| 408 | Request Timeout | Server did not receive a complete request in time | Network issues or destination unreachable |
| 410 | Gone | User previously existed but is no longer available | Number disconnected |
| 413 | Request Entity Too Large | Request body is larger than the server is willing to process | - |
| 414 | Request-URI Too Long | Request-URI is longer than the server can interpret | - |
| 415 | Unsupported Media Type | Message body format is not supported | Codec incompatibility |
| 416 | Unsupported URI Scheme | Request-URI scheme is not recognized | - |
| 420 | Bad Extension | Server did not understand a required protocol extension | - |
| 421 | Extension Required | Server requires a specific extension not listed in request | - |
| 423 | Interval Too Brief | Expiration time is too short | - |
| 480 | Temporarily Unavailable | Callee's endpoint is currently unavailable | Device offline or out of coverage |
| 481 | Call/Transaction Does Not Exist | Server received a request that doesn't match any dialog or transaction | - |
| 482 | Loop Detected | Server detected a loop in the request routing | - |
| 483 | Too Many Hops | Max-Forwards header reached zero | - |
| 484 | Address Incomplete | Request-URI is incomplete | - |
| 485 | Ambiguous | Request-URI is ambiguous | - |
| 486 | Busy Here | Callee's endpoint is busy (user declined or DND enabled) | Line in use |
| 487 | Request Terminated | Request cancelled before completion (caller hung up during ringing) | Caller hung up before answer |
| 488 | Not Acceptable Here | Some aspect of the session description is not acceptable | SDP/codec mismatch |
| 491 | Request Pending | Server has a pending request from the same dialog | - |
| 493 | Undecipherable | Request contains an encrypted body that cannot be decrypted | - |

### 5xx - Server Error Responses

Indicates a server-side issue prevented call completion.

| Code | Reason Phrase | Description | Common Cause |
|------|---------------|-------------|--------------|
| 500 | Server Internal Error | Unexpected server error | Temporary system issue |
| 501 | Not Implemented | Server does not support the functionality required | - |
| 502 | Bad Gateway | Invalid upstream response | Carrier connectivity issue |
| 503 | Service Unavailable | Service temporarily unavailable | System maintenance or capacity |
| 504 | Server Timeout | Upstream timeout | Carrier response delay |
| 505 | Version Not Supported | SIP protocol version is not supported | - |
| 513 | Message Too Large | Message length exceeds server capabilities | - |

### 6xx - Global Failure Responses

Indicates the call cannot be completed anywhere.

| Code | Reason Phrase | Description | Common Cause |
|------|---------------|-------------|--------------|
| 600 | Busy Everywhere | All destinations busy | No available endpoints |
| 603 | Decline | Call declined | Recipient rejected the call |
| 604 | Does Not Exist Anywhere | Destination invalid globally | Number does not exist |
| 606 | Not Acceptable | Call parameters rejected | Incompatible session requirements |

## Call Status in Voice Session Summary

The Voice Session Summary (VSS) webhook provides call outcome information via the `sessionStatus` field (for the overall session) and the `callStatus` field (for individual call legs).

### Session Status Values (`sessionStatus`)

| Status | Description |
|--------|-------------|
| `COMPLETED` | Session was connected and completed successfully |
| `NO_ANSWER` | Call rang but was not answered |
| `BUSY` | Destination was busy |
| `CANCELED` | Call was cancelled before connection |
| `FAILED` | Call could not be completed |
| `ERROR` | An error occurred during the session |

### Call Leg Status Values (`callStatus`)

| Status | Description |
|--------|-------------|
| `COMPLETED` | Call leg was connected and completed successfully |
| `NO_ANSWER` | Call leg rang but was not answered |
| `BUSY` | Destination was busy |
| `CANCELED` | Call leg was cancelled before connection |
| `FAILED` | Call leg could not be completed |

**Note:** The `ERROR` status only applies to `sessionStatus` and does not appear in `callStatus` for individual call legs.

## SIP Code in Webhooks

The `sipCode` field is available in Voice Call Action (VCA) and Voice Call Status (VCS) webhooks. This field typically shows 200 for connected calls.

For call outcome information, use the `callStatus` and `sessionStatus` fields from Voice Session Summary webhooks rather than `sipCode`.

For detailed webhook payload structure, see:
- [Voice Session Summary (Voice Messaging)](/connect/docs/voice/voice-messaging/session-status)
- [Voice Session Summary (IVR)](/connect/docs/voice/ivr/session-summary)
- [Voice Session Summary (Number Masking)](/connect/docs/voice/number-masking/session-summary)

## Best Practices

### Number Formatting

- Use E.164 format for all phone numbers (e.g., `+14155551234`)
- Include the `+` prefix and country code

### Caller ID (CLI)

- Use a verified 8x8 virtual number as your Caller ID
- Ensure CLI is authorized for the destination country

### Error Handling

- Implement retry logic with exponential backoff for 5xx errors
- Do not retry 4xx errors without correcting the request
- Log SIP response codes for troubleshooting

### Codec Support

8x8 CPaaS Voice supports the following codecs:
- G.711 µ-law (PCMU)
- G.711 A-law (PCMA)
- G.722
- Opus (coming soon)

## Troubleshooting

| Issue | Possible SIP Codes | Action |
|-------|-------------------|--------|
| Call not connecting | 480, 408, 487 | Check destination availability and number validity |
| Call rejected immediately | 403, 603 | Verify caller ID, check if number is blocked |
| Invalid number format | 404, 484 | Validate E.164 format, ensure country code is correct |
| Network/routing issues | 500, 502, 503, 504 | Contact [8x8 CPaaS Support](mailto:support@cpaas.8x8.com) if persistent |
| Call drops during ringing | 487 | Normal user behavior (caller hung up) |

## References

- [Voice Session Summary webhook](/connect/docs/voice/webhook-guides/voice-session-summary-webhook)
- [Voice Error Codes](/connect/docs/voice/error-codes/voice-error-codes)
- [Voice Status Codes and Status Messages](/connect/docs/voice/error-codes/voice-status-codes)
- [RFC 3261 - SIP: Session Initiation Protocol](https://tools.ietf.org/html/rfc3261)

## Support Channels

- **Technical support:** [support@cpaas.8x8.com](mailto:support@cpaas.8x8.com)
- **Sales inquiries:** Contact your account manager or visit [cpaas.8x8.com/en/contact-us](https://cpaas.8x8.com/en/contact-us/)
- **Support Portal:** [https://support.cpaas.8x8.com/hc/en-us](https://support.cpaas.8x8.com/hc/en-us)
