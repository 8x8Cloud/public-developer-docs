---
title: "Security check required"
description: "The request did not pass the security check that protects it, so run a new check and send the request again once with the new token."
slug: /connect/errors/captcha-required
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when a request that is protected by a security check (reCAPTCHA) does not pass that check. The API refuses the request before it acts on it, so the request has no effect.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/captcha-required` |
| `title` | `Security check required` |
| `code` | `captcha_required` |
| `status` | `400` |

---

## What causes it

The 8x8 Connect portal runs a security check in the browser before some steps, such as signing in with an email address and password, signing up, setting up the account after sign-up, requesting a password reset email, requesting a verification code and setting up two-factor authentication. The request for that step carries the token from the check in its `gToken` field. The API returns this problem with status `400` when:

- The token is missing, invalid or expired. A token expires a short time after the check runs.
- The token was already used. Each token is valid for one request only.
- The security check did not pass.

The API checks the token before it acts on the request, so problems such as wrong credentials are reported only after the check passes. A request that leaves out the token entirely can instead fail field validation with status `422`.

---

## What to do

1. Run the security check again to get a new token, right before you send the request. Never reuse a token.
2. Send the request again, once, with the new token.
3. If the request is refused again, wait a few minutes before you try again. Do not retry in a loop.

The security check is designed for people who use the 8x8 Connect portal in a browser. Scripts and other automated clients should expect to fail it.

---

## Example response

A sign-in with an email address and password whose token does not pass the check returns HTTP `400` with the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/captcha-required",
  "title": "Security check required",
  "status": 400,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "captcha_required"
}
```

The response can carry other members, such as the legacy `error` member and an `errorId`. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Invalid credentials](/connect/errors/invalid-credentials)
- [Too many attempts](/connect/errors/too-many-attempts)
- [Sign-up not allowed](/connect/errors/signup-not-allowed)
- [Verification code not sent](/connect/errors/code-send-failed)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
