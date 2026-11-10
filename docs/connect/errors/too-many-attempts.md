---
title: "Too many attempts"
description: "Sign-in is blocked after too many failed attempts, so stop retrying, wait a few minutes or reset the password, then sign in again."
slug: /connect/errors/too-many-attempts
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when it refuses a sign-in with an email address and password because too many failed attempts were made. While the block lasts, every new sign-in attempt is refused, so sending more of them does not help.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/too-many-attempts` |
| `title` | `Too many attempts` |
| `code` | `too_many_attempts` |
| `status` | `401` |

---

## What causes it

Signing in with an email address and password returns this problem with status `401` when sign-in is blocked after too many failed attempts. The block takes one of two forms:

- It is temporary and ends on its own after a while.
- It stays in place until the password is reset.

Both forms return the same `code` and `type`, so the steps below cover both. The response has no `Retry-After` header.

> 📘
>
> A response with status `429` (Too Many Requests) is a rate limit, not this problem, even when its legacy `error` member reads `too_many_attempts`. Identify this problem by its `code` or `type`. After a `429`, wait before you send the request again, and honor the `Retry-After` header when the response has one.

---

## What to do

1. Stop sending sign-in requests. Never retry a refused sign-in automatically or in a loop.
2. Wait a few minutes, then let the user sign in again.
3. If the sign-in is still refused, have the user reset the password with **Forgot Password** on the 8x8 Connect sign-in page, then sign in with the new password.

---

## Example response

A sign-in with an email address and password that is refused while the block lasts returns HTTP `401` with the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/too-many-attempts",
  "title": "Too many attempts",
  "status": 401,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "too_many_attempts"
}
```

The response can carry other members, such as the legacy `error` member and an `errorId`. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Invalid credentials](/connect/errors/invalid-credentials)
- [Security check required](/connect/errors/captcha-required)
- [Password expired](/connect/errors/password-expired)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
