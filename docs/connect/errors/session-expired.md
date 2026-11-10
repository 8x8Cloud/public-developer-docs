---
title: "Session expired"
description: "The request needs a signed-in session and the one it carried is not valid, so sign in again and repeat the request."
slug: /connect/errors/session-expired
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when a request that needs a signed-in session does not carry a valid one. Every invalid session gets the same `code` and `type`, whatever the reason that the session is no longer valid.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/session-expired` |
| `title` | `Session expired` |
| `code` | `session_expired` |
| `status` | `401` |

---

## What causes it

- A request that needs a signed-in session carries no session token, or a token that the API no longer accepts, for example because it expired or the user signed out.
- During two-factor sign-in (requesting or entering a verification code), the pending sign-in for the sign-in reference (`refId`) no longer exists. It expired, it was already completed, or a newer sign-in for the same user replaced it. When the user enters a code sent by SMS, the answer is the same if there is no current code request for the sign-in reference.

> 📘
>
> Not every `401` means that the session has expired. Treat a response as an expired session only when its `code` is `session_expired` or its `type` is the type URI above. Other `401` responses to signed-in requests, such as an action that the user's role does not allow, have a different `type` and do not mean that the session has ended.

---

## What to do

1. Discard the stored session token. Requests that carry it keep failing.
2. Sign the user in again.
3. Repeat the original request once, with the new session token.

During two-factor sign-in, start again from the email and password step to get a new sign-in reference and a new code.

If the request that failed was a sign-out, discard the stored token. There is no need to sign in again.

---

## Example response

When a request carries a session token that the API no longer accepts, the API returns this problem with HTTP `401` and the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/session-expired",
  "title": "Session expired",
  "status": 401,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "session_expired"
}
```

The response can carry other members, such as the legacy `error` member and an `errorId`. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Invalid credentials](/connect/errors/invalid-credentials)
- [Invalid verification code](/connect/errors/invalid-verification-code)
- [Verification code not sent](/connect/errors/code-send-failed)
- [Account suspended](/connect/errors/account-suspended)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
