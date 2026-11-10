---
title: "Account suspended"
description: "The credentials were verified but the account is suspended, so stop the sign-in and contact the workspace administrator."
slug: /connect/errors/account-suspended
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when a user signs in to an account that is suspended. The API returns it only after the user's credentials have been verified.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/account-suspended` |
| `title` | `Account suspended` |
| `code` | `account_suspended` |
| `status` | `422` or `401` |

---

## What causes it

The account is suspended, and the sign-in has already verified the user's credentials:

| When it happens | Status | Checked |
| --- | --- | --- |
| Signing in with an email address and password | `422` or `401` | After the password is accepted |
| Completing a social sign-in | `422` | After the social sign-in is verified |
| Two-factor sign-in (requesting or entering a verification code) | `401` | After the credentials were verified earlier in the sign-in |

> 📘
>
> The HTTP status can be `422` or `401`, even for the same sign-in step. Identify this problem by its `code` or `type`, not by the status.

---

## What to do

1. Stop the sign-in and do not retry. The API returns the same answer until the account is reinstated.
2. Tell the user that the account is suspended and that they should contact their workspace administrator.
3. If the user is the workspace administrator, they should contact 8x8 support at [cpaas-support@8x8.com](mailto:cpaas-support@8x8.com).

---

## Example response

For a sign-in with an email address and password, the API can return this problem with HTTP `422` and the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/account-suspended",
  "title": "Account suspended",
  "status": 422,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "account_suspended"
}
```

The response can carry other members, such as the legacy `error` member and an `errorId`. Branch only on `code` or `type`. The same problem can also arrive with `status` `401`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Invalid credentials](/connect/errors/invalid-credentials)
- [No access to this application](/connect/errors/no-application-access)
- [Session expired](/connect/errors/session-expired)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
