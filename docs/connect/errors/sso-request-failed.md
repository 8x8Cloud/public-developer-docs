---
title: "Single sign-on request failed"
description: "Single sign-on could not start because the API could not prepare the sign-in request, so retry a few times, then contact the administrator or support."
slug: /connect/errors/sso-request-failed
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect portal API returns this problem when it cannot start a single sign-on (SSO) sign-in. The request was well formed, but the API could not prepare the sign-in request for the identity provider.

For the response format and the other problem types that the portal API returns, see [Connect portal error types](/connect/errors).

| Member | Value |
| --- | --- |
| `type` | `https://developer.8x8.com/connect/errors/sso-request-failed` |
| `title` | `Single sign-on request failed` |
| `code` | `sso_request_failed` |
| `status` | `400` |

---

## What causes it

Signing in with single sign-on returns this problem with status `400` when the API cannot prepare the sign-in request for the identity provider. It happens at the start of the sign-in, before the user is sent to the identity provider. The response does not say why. The cause can be temporary, or it can persist until it is fixed.

Other refusals at the start of a single sign-on sign-in are reported differently:

- If the email address is not accepted for single sign-on, the API returns [Invalid credentials](/connect/errors/invalid-credentials) with the same status, and does not say why.
- If the email address is missing or malformed, the request fails field validation with status `422`.

---

## What to do

1. Wait a short time, then try again. Retry a few times at most.
2. If the problem continues, ask the workspace administrator to check that single sign-on is set up correctly for the organization.
3. If the problem persists, contact 8x8 support at [cpaas-support@8x8.com](mailto:cpaas-support@8x8.com) and quote the `errorId` from the response.

---

## Example response

A single sign-on sign-in that cannot start returns HTTP `400` with the content type `application/problem+json`:

```json
{
  "type": "https://developer.8x8.com/connect/errors/sso-request-failed",
  "title": "Single sign-on request failed",
  "status": 400,
  "instance": "/api/…",
  "timestamp": "2026-10-26T03:14:15.926Z",
  "code": "sso_request_failed"
}
```

The response can carry other members, such as the legacy `error` member and an `errorId`. Branch only on `code` or `type`.

---

## Related

- [Connect portal error types](/connect/errors)
- [Invalid credentials](/connect/errors/invalid-credentials)
- [Security (SSO)](/connect/docs/connect-security), which explains how an administrator sets up single sign-on for 8x8 Connect
- [API error codes](/connect/docs/api-error-codes) for the 8x8 messaging APIs, which use a different response format
