---
title: "Disposable email address"
description: "A sign-up used an email address from a disposable email service, so start the sign-up again with a permanent email address."
slug: /connect/errors/disposable-email
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when a sign-up uses an email address from a disposable (temporary) email service. 8x8 Connect does not create accounts for these addresses. The sign-up stops before anything is created, and no verification email is sent.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/disposable-email` |
| `title` | `Disposable email address` |
| `code` | `disposable_email` |
| `status` | `400` |

---

## What causes it

This problem is returned when a user signs up with an email address that belongs to a disposable email service.

---

## What to do

1. Do not resend the sign-up with the same email address. It gets the same answer.
2. Ask the user for a permanent email address that they can receive mail at, such as their work address.
3. Start the sign-up again with that address.

---

## Example response

Signing up with a disposable email address returns HTTP `400` with the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/disposable-email",
  "title": "Disposable email address",
  "status": 400,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "disposable_email"
}
```

The response can carry other members, such as the legacy `error` member and an `errorId`. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Sign-up not allowed](/connect/errors/signup-not-allowed)
- [Security check required](/connect/errors/captcha-required)
- [Verification link invalid](/connect/errors/verification-token-invalid)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
