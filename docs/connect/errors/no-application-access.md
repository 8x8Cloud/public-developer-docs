---
title: "No access to this application"
description: "The credentials were verified but the account cannot use this application, so contact the workspace administrator or 8x8 support."
slug: /connect/errors/no-application-access
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API can return this problem when a user signs in with an account that does not have access to this application. The API returns it only after the user's credentials have been verified.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/no-application-access` |
| `title` | `No access to this application` |
| `code` | `no_application_access` |
| `status` | `401` |

---

## What causes it

The account is not enabled for this application. The API checks this only after the sign-in has verified the user's credentials, and can return this problem at these steps:

| When it happens | Status | Checked |
| --- | --- | --- |
| Signing in with an email address and password | `401` | After the password is accepted |
| Two-factor sign-in (requesting or entering a verification code) | `401` | After the credentials were verified earlier in the sign-in |

---

## What to do

1. Stop the sign-in and do not retry. The API returns the same answer until access is enabled for the account.
2. Tell the user that the account does not have access to this application and that they should contact their workspace administrator.
3. Access is enabled by 8x8, so the workspace administrator should contact 8x8 support at [cpaas-support@8x8.com](mailto:cpaas-support@8x8.com) to request it.

---

## Example response

The API returns this problem with HTTP `401` and the content type `application/problem+json`, for example when a user enters a verification code during two-factor sign-in:

```json
{
  "type": "https://developer.8x8.com/connect/errors/no-application-access",
  "title": "No access to this application",
  "status": 401,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "no_application_access"
}
```

The response can carry other members, such as the legacy `error` member and an `errorId`. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Account suspended](/connect/errors/account-suspended)
- [Invalid credentials](/connect/errors/invalid-credentials)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
