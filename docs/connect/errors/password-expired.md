---
title: "Password expired"
description: "The credentials were verified but the password has expired, so reset the password and sign in with the new one."
slug: /connect/errors/password-expired
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API can return this problem when a user signs in with the correct password, but the password has expired. The user needs to reset the password, then sign in with the new one.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/password-expired` |
| `title` | `Password expired` |
| `code` | `password_expired` |
| `status` | `400` |

---

## What causes it

When a user signs in with an email address and password, the API can return this problem with status `400`. The email address and password are correct, but the password is past its expiry date.

---

## What to do

1. Do not retry the sign-in with the same password. Reset the password first.
2. Have the user select **Forgot Password** on the 8x8 Connect sign-in page and follow the link in the email they receive.
3. Have the user choose a new password that meets the password requirements and was not used recently.
4. Sign in with the new password.

---

## Example response

When a user signs in with an email address and password, the API can return this problem with HTTP `400` and the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/password-expired",
  "title": "Password expired",
  "status": 400,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "password_expired"
}
```

The response can carry other members, such as the legacy `error` member and an `errorId`. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Invalid credentials](/connect/errors/invalid-credentials)
- [Reset link invalid](/connect/errors/reset-token-invalid)
- [Password does not meet policy](/connect/errors/password-policy-violation)
- [Password recently used](/connect/errors/password-recently-used)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
