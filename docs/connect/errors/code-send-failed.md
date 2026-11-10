---
title: "Verification code not sent"
description: "8x8 could not send a two-factor sign-in code by SMS, so wait briefly and request a new code, or verify with another method."
slug: /connect/errors/code-send-failed
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when it cannot send a two-factor sign-in code by SMS. The response does not describe the cause, which is often temporary.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/code-send-failed` |
| `title` | `Verification code not sent` |
| `code` | `code_send_failed` |
| `status` | `422` |

---

## What causes it

When a verification code is requested by SMS during two-factor sign-in, the API returns this problem after the request passes the security check, when:

- the sign-in reference (`refId`) in the request cannot be read, for example because it was changed or cut short
- 8x8 cannot load the user's verification settings
- the SMS cannot be sent, or sending it does not finish in time
- another temporary service problem stops the request

A request that fails the security check gets [Security check required](/connect/errors/captcha-required) instead.

> 📘
>
> The status is `422`, but this problem is often temporary, so a later request can succeed. Decide whether to retry from the `code` or `type`, not from the status.

---

## What to do

1. Wait a few seconds, then request the code again. Send a new security-check token with each request.
2. Do not retry in a tight loop. If a few requests in a row fail, start the sign-in again to get a new sign-in reference.
3. If the `TwoFA` list in the sign-in response includes `AUTHENTICATOR_APP`, the user can verify with their authenticator app instead. No SMS needs to be sent.
4. If the problem continues, contact 8x8 support at [cpaas-support@8x8.com](mailto:cpaas-support@8x8.com) and quote the `errorId` from the response. Support can use it to find the cause.

---

## Example response

A request for a verification code that cannot be sent returns HTTP `422` with the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/code-send-failed",
  "title": "Verification code not sent",
  "status": 422,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "code_send_failed"
}
```

The response can carry other members, such as the legacy `error` member and an `errorId`. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Mobile number missing](/connect/errors/mobile-number-missing)
- [Invalid verification code](/connect/errors/invalid-verification-code)
- [Security check required](/connect/errors/captcha-required)
- [Session expired](/connect/errors/session-expired)
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
