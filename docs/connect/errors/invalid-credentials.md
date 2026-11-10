---
title: "Invalid credentials"
description: "A sign-in was refused because the email address or password was not accepted, so check both or reset the password."
slug: /connect/errors/invalid-credentials
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when it refuses a sign-in because the email address or password was not accepted. The response is the same whether the email address is not recognized or the password is wrong, and it does not say which.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/invalid-credentials` |
| `title` | `Invalid credentials` |
| `code` | `invalid_credentials` |
| `status` | `401`, or `400` when a single sign-on (SAML) sign-in cannot start |

---

## What causes it

| When it happens | Status | Cause |
| --- | --- | --- |
| Signing in with an email address and password | `401` | The email address and password were not accepted. |
| Completing a social sign-in | `401` | The social sign-in was verified, but the account cannot sign in. |
| Signing in with single sign-on | `400` | The email address was not accepted for single sign-on. |
| Two-factor sign-in (requesting or entering a verification code) | `401` | Rarely, the sign-in can no longer be completed. |

> 📘
>
> The HTTP status alone does not identify this problem. It is `400` when signing in with single sign-on and `401` in the other cases, and other problem types use the same statuses. Identify it by its `code` or `type`.

---

## What to do

1. Do not resend the same credentials.
2. Ask the user to check the email address and password, then try again. Each new sign-in attempt needs a new security-check token; see [Security check required](/connect/errors/captcha-required).
3. If the user does not remember the password, have them reset it with **Forgot Password** on the 8x8 Connect sign-in page.
4. For a single sign-on sign-in, ask the user to check the email address.
5. If the user is sure that the details are correct, they should contact their workspace administrator.
6. If the problem came from a two-factor step, start the sign-in again from the email and password step.

> 🚧
>
> Repeated failed sign-ins can block further sign-ins to the account, answered with [Too many attempts](/connect/errors/too-many-attempts). Never retry a refused sign-in automatically or in a loop.

---

## Example response

For a sign-in with an email address and password, the API returns this problem with HTTP `401` and the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/invalid-credentials",
  "title": "Invalid credentials",
  "status": 401,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "invalid_credentials"
}
```

The response can carry other members, such as the legacy `error` member and an `errorId`. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Account suspended](/connect/errors/account-suspended)
- [No access to this application](/connect/errors/no-application-access)
- [Password expired](/connect/errors/password-expired)
- [Too many attempts](/connect/errors/too-many-attempts)
- [Security check required](/connect/errors/captcha-required)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
