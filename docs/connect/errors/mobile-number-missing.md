---
title: "Mobile number missing"
description: "An SMS sign-in code was requested for a user with no mobile number on file, so verify with another method, such as an authenticator app."
slug: /connect/errors/mobile-number-missing
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when a two-factor sign-in code is requested by SMS for a user who has no mobile number on file. 8x8 cannot send the code, so the user must verify another way.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/mobile-number-missing` |
| `title` | `Mobile number missing` |
| `code` | `mobile_number_missing` |
| `status` | `422` |

---

## What causes it

When a verification code is requested by SMS during two-factor sign-in, the API returns this problem if the user needs two-factor verification and has no mobile number on file. It does so whether or not the user has set up another verification method.

The sign-in response lists the methods that the user can verify with in `TwoFA`, and it includes `SMS_OTP` only when a mobile number is on file. So this problem usually means that a client requested an SMS code that the sign-in response did not offer, or that the mobile number was removed after the sign-in started.

---

## What to do

1. Request an SMS code only when the `TwoFA` list in the sign-in response includes `SMS_OTP`.
2. If the list includes `AUTHENTICATOR_APP`, ask the user for the code from their authenticator app, and submit it to complete the two-factor sign-in with `otpType` set to `AUTHENTICATOR_APP`. No SMS needs to be sent.
3. If the user has no other method, they cannot finish signing in until a mobile number is added to their account. Ask them to contact 8x8 support at [cpaas-support@8x8.com](mailto:cpaas-support@8x8.com).

Do not retry the request. The API returns the same answer until a mobile number is on the account.

---

## Example response

A request for an SMS code for a user with no mobile number on file returns HTTP `422` with the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/mobile-number-missing",
  "title": "Mobile number missing",
  "status": 422,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "mobile_number_missing"
}
```

The response can carry other members, such as the legacy `error` member and an `errorId`. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Verification code not sent](/connect/errors/code-send-failed)
- [Invalid verification code](/connect/errors/invalid-verification-code)
- [Session expired](/connect/errors/session-expired)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
