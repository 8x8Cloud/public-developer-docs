---
title: "Reset link invalid"
description: "A password reset or invitation link cannot be used because it is invalid, expired or already used, so get a new link and use the newest one."
slug: /connect/errors/reset-token-invalid
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when a password reset link, or the invitation link that an invited user opens to set their first password, cannot be used. The link may have expired, may already have been used, or may never have been valid. All of these cases return this same problem type.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/reset-token-invalid` |
| `title` | `Reset link invalid` |
| `code` | `reset_token_invalid` |
| `status` | `400` when the link is checked, `422` when the new password is submitted |

---

## What causes it

The token from the link is not valid. This happens when resetting a password from an emailed link, and when activating an invited account, because the invitation email carries the same kind of link. The token is checked at two steps:

| When it happens | Status |
| --- | --- |
| Opening the link, when it is checked before the user chooses a password | `400` |
| Submitting the new password with the token from the link | `422` |

Both steps return this problem for an expired link, a used link and an unknown link. When the new password is submitted, a token in an unexpected format fails request validation first. That response is a `422` problem with the `type` `about:blank`, not this problem.

> 📘
>
> The HTTP status differs between the two steps. Identify this problem by its `code` or `type`, not by the status.

---

## What to do

1. Do not retry with the same link. It gets the same answer every time.
2. For a password reset, ask the user to request a new link with **Forgot Password** on the 8x8 Connect sign-in page. Requesting a reset link needs a security-check token.
3. For an invitation, ask an administrator of the 8x8 Connect account to resend the invitation.
4. Ask the user to open the link in the newest email. Links in older emails may no longer work.

---

## Example response

A link that cannot be used returns HTTP `400` when it is checked and HTTP `422` when the new password is submitted, both with the content type `application/problem+json`. This is the response to the check:

```json
{
  "type": "https://developer.8x8.com/connect/errors/reset-token-invalid",
  "title": "Reset link invalid",
  "status": 400,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "reset_token_invalid"
}
```

The response can carry other members, such as the legacy `error` member, whose value varies, and an `errorId`. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Password does not meet policy](/connect/errors/password-policy-violation)
- [Password recently used](/connect/errors/password-recently-used)
- [Password expired](/connect/errors/password-expired)
- [Security check required](/connect/errors/captcha-required)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
