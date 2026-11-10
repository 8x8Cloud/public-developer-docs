---
title: "Password recently used"
description: "The new password matches a password the user has used recently, so choose a password that has not been used before and submit it again."
slug: /connect/errors/password-recently-used
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when a user tries to set a new password that matches a password they have used recently. The password is not changed, and the response does not say which password it matched.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/password-recently-used` |
| `title` | `Password recently used` |
| `code` | `password_recently_used` |
| `status` | `422` |

---

## What causes it

| When it happens | Status | Cause |
| --- | --- | --- |
| Setting a new password from an emailed link, such as a password reset link | `422` | The new password matches a password that the account has used recently. |
| Changing the password while signed in | `422` | The new password matches one of the account's previous passwords. |

---

## What to do

1. Do not resend the same password. It gets the same answer.
2. Ask the user to choose a password that they have not used on 8x8 Connect before. Make sure that it also meets the password requirements; see [Password does not meet policy](/connect/errors/password-policy-violation).
3. Submit the new password. During a password reset, the user can try again from the same link while it is still valid. If the link is no longer valid, the request is refused with [Reset link invalid](/connect/errors/reset-token-invalid), and the user needs a new link from **Forgot Password** on the 8x8 Connect sign-in page.

---

## Example response

A new password that matches a recently used password returns HTTP `422` with the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/password-recently-used",
  "title": "Password recently used",
  "status": 422,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "password_recently_used"
}
```

The response can carry other members, such as the legacy `error` member, whose value differs between the two cases above, and an `errorId`. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Password does not meet policy](/connect/errors/password-policy-violation)
- [Reset link invalid](/connect/errors/reset-token-invalid)
- [Password expired](/connect/errors/password-expired)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
