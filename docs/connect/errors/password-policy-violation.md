---
title: "Password does not meet policy"
description: "The new password does not meet the requirements, so use 8 or more characters with upper and lower case letters, a number and a special character."
slug: /connect/errors/password-policy-violation
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when a new password does not meet the password requirements. The response does not say which requirement the password missed.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/password-policy-violation` |
| `title` | `Password does not meet policy` |
| `code` | `password_policy_violation` |
| `status` | `422` |

---

## What causes it

The API returns this problem in these flows when the new password does not meet the password requirements:

| When it happens | Status |
| --- | --- |
| Resetting a password from an emailed link | `422` |
| Activating an invited account, when the user sets their first password from the invitation email | `422` |
| Changing the password while signed in | `422` |

A password meets the requirements when it:

- is at least 8 characters long
- contains an uppercase letter (`A` to `Z`)
- contains a lowercase letter (`a` to `z`)
- contains a number (`0` to `9`)
- contains a special character, which is any other character, such as `!`, `#` or `%`

When the password is set from a password reset link or an invitation link, a password shorter than 8 or longer than 50 characters fails request validation first. That response is a `422` problem with the `type` `about:blank`, not this problem.

---

## What to do

1. Check the new password against every requirement before you send it, because the response does not say which one failed.
2. Ask the user for a password that meets all of the requirements, then send it again. When the password is set from a password reset link or an invitation link, the user can submit the new password with the same link while that link is still valid.

---

## Example response

A new password that does not meet the requirements returns HTTP `422` with the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/password-policy-violation",
  "title": "Password does not meet policy",
  "status": 422,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "password_policy_violation"
}
```

The response can carry other members, such as the legacy `error` member and an `errorId`, but it does not list the requirements that failed. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Password recently used](/connect/errors/password-recently-used)
- [Reset link invalid](/connect/errors/reset-token-invalid)
- [Password expired](/connect/errors/password-expired)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
