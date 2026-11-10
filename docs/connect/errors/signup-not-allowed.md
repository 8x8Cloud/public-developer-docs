---
title: "Sign-up not allowed"
description: "The request to start a sign-up could not be accepted, so start the sign-up from the 8x8 Connect sign-up page in a web browser."
slug: /connect/errors/signup-not-allowed
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when it cannot accept a request to start a sign-up. The response does not say why the request was refused. No sign-up is started, and no verification email is sent.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/signup-not-allowed` |
| `title` | `Sign-up not allowed` |
| `code` | `signup_not_allowed` |
| `status` | `400` or `401` |

---

## What causes it

| When it happens | Status | Cause |
| --- | --- | --- |
| Signing up | `400` | 8x8 Connect does not accept sign-ups from where the request was sent. |
| Signing up | `401` | The sign-up request could not be recorded, for example because too many sign-up requests were made. |

> 📘
>
> The `401` here does not mean that a session has expired. Identify this problem by its `code` or `type`, not by the status.

---

## What to do

1. Do not resend the same request. It gets the same answer.
2. Start the sign-up from the 8x8 Connect sign-up page in a web browser.
3. If the problem continues on the sign-up page, try again later. If it still fails, contact 8x8 support at [cpaas-support@8x8.com](mailto:cpaas-support@8x8.com) and quote the `errorId` from the response.

---

## Example response

A sign-up that 8x8 Connect does not accept from where it was sent returns HTTP `400` with the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/signup-not-allowed",
  "title": "Sign-up not allowed",
  "status": 400,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "signup_not_allowed"
}
```

The response can carry other members, such as the legacy `error` member, whose value differs between the two cases above, and an `errorId`. Branch only on `code` or `type`. When the sign-up request could not be recorded, the same problem arrives with `status` `401`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Disposable email address](/connect/errors/disposable-email)
- [Security check required](/connect/errors/captcha-required)
- [Registration failed](/connect/errors/registration-failed)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
