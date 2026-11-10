---
title: "Verification link invalid"
description: "The verification link from a sign-up email cannot be used, so request a new verification email and use the link in the newest one."
slug: /connect/errors/verification-token-invalid
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when the verification link from a sign-up email cannot be used to verify the email address. The answer is the same for every reason the link cannot be used, so the response does not say which reason applies.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/verification-token-invalid` |
| `title` | `Verification link invalid` |
| `code` | `verification_token_invalid` |
| `status` | `400` |

---

## What causes it

This problem is returned when a user verifies their email address after signing up, and the token from the verification link:

- has expired, because verification links are valid for a limited time
- was already used to finish a sign-up
- was not issued by 8x8 Connect, for example because the link was cut short when it was copied
- is sent with a different email address from the one the link was sent to

---

## What to do

1. Do not retry with the same link. It gets the same answer.
2. Ask the user to request a new verification email: select **Request a new link** on the 8x8 Connect verification page, or start the sign-up again from the 8x8 Connect sign-up page with the same email address.
3. Ask the user to open the link in the newest email and to finish the sign-up soon after, because links are valid for a limited time.
4. If the user has already finished the sign-up, they should sign in to 8x8 Connect instead.

---

## Example response

Verifying the email address with a link that cannot be used returns HTTP `400` with the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/verification-token-invalid",
  "title": "Verification link invalid",
  "status": 400,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "verification_token_invalid"
}
```

The response can carry other members, such as the legacy `error` member and an `errorId`. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Registration failed](/connect/errors/registration-failed)
- [Disposable email address](/connect/errors/disposable-email)
- [Reset link invalid](/connect/errors/reset-token-invalid), for a password reset link that cannot be used
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
