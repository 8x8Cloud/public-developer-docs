---
title: "Registration failed"
description: "The new account could not be set up while completing an account activation, so try once more later or contact 8x8 support with the errorId."
slug: /connect/errors/registration-failed
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when it cannot set up the new account while completing an account activation. The response does not say which step failed or why.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/registration-failed` |
| `title` | `Registration failed` |
| `code` | `registration_failed` |
| `status` | `400` |

---

## What causes it

When a user completes an account activation, 8x8 Connect creates and sets up the new account and its first user from the activation details. This problem is returned when any part of that fails.

---

## What to do

1. Do not resend the request automatically or in a loop.
2. Wait a few minutes, then try once more. Each attempt needs a new security-check token; see [Security check required](/connect/errors/captcha-required).
3. If it fails again, contact 8x8 support at [cpaas-support@8x8.com](mailto:cpaas-support@8x8.com) and quote the `errorId` and `timestamp` of each failed response.

---

## Example response

An account activation that cannot set up the new account returns HTTP `400` with the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/registration-failed",
  "title": "Registration failed",
  "status": 400,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "registration_failed"
}
```

The response can carry other members, such as the legacy `error` member and an `errorId`. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Verification link invalid](/connect/errors/verification-token-invalid)
- [Security check required](/connect/errors/captcha-required)
- [Sign-up not allowed](/connect/errors/signup-not-allowed)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
