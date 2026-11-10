---
title: "Invalid verification code"
description: "The two-factor sign-in code was not accepted, so ask the user to enter the code again or to request a new one."
slug: /connect/errors/invalid-verification-code
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when the code submitted to finish a two-factor sign-in is not accepted. The code may be wrong or no longer valid, and the response does not say which.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/invalid-verification-code` |
| `title` | `Invalid verification code` |
| `code` | `invalid_verification_code` |
| `status` | `422` |

---

## What causes it

During two-factor sign-in, the API returns this problem when the sign-in is waiting for a verification code and the code that the user enters is not accepted:

| Verification method | `otpType` | Cause |
| --- | --- | --- |
| Authenticator app | `AUTHENTICATOR_APP` | The code is not the current code from the authenticator app that is set up for the user. |
| SMS | `SMS_OTP` | The code does not match the most recent code sent by SMS, or that code is no longer valid. |

The API checks that the sign-in is still pending before it checks the code. If the sign-in is no longer pending, the response is [Session expired](/connect/errors/session-expired) instead.

---

## What to do

1. Ask the user to check the code and enter it again. Sending a code that was already refused gets the same answer.
2. For SMS, if the code may have expired, request a new verification code. Each request needs a new security-check token. Ask the user to enter the code from the newest message.
3. For an authenticator app, ask the user to enter the code that the app shows now, before it changes. If codes from the app keep failing, check that the date and time on the user's device are set automatically.
4. If the response is [Session expired](/connect/errors/session-expired), start the sign-in again from the first step.

---

## Example response

A code that is not accepted during two-factor sign-in returns HTTP `422` with the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/invalid-verification-code",
  "title": "Invalid verification code",
  "status": 422,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "invalid_verification_code"
}
```

The response can carry other members, such as the legacy `error` member, whose value differs between verification methods, and an `errorId`. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Verification code not sent](/connect/errors/code-send-failed)
- [Mobile number missing](/connect/errors/mobile-number-missing)
- [Session expired](/connect/errors/session-expired)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
