---
title: "Connect portal error types"
description: "The problem types that the 8x8 Connect portal API returns as RFC 9457 problem details, and how to identify and handle each one."
slug: /connect/errors
displayed_sidebar: sidebarConnectReference
---

The 8x8 Connect web portal works through its own API, the portal API. When the portal API cannot complete a request, it returns the error as problem details: a JSON object in the format that [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) defines, with the media type `application/problem+json`. Each problem type listed on this page has its own page that explains what causes it and what to do.

These pages are for developers and support engineers who handle or troubleshoot these responses, for example when a sign-in, a sign-up or a password reset fails. The public 8x8 messaging and voice APIs report errors in other formats: see [API error codes](/connect/docs/api-error-codes) for the messaging APIs and [Voice status codes and status messages](/connect/docs/voice/error-codes/voice-status-codes) for voice.

---

## Response format

Responses for the types listed on this page carry the following members. The first six are always present.

| Member | Description |
| --- | --- |
| `type` | The identifier of the problem type, a URI such as `https://developer.8x8.com/connect/errors/session-expired`. It never changes, and it is also the address of the type's page. |
| `title` | A short summary of the problem type in English, such as `Session expired`. It is stable, but do not parse it or branch on it. |
| `status` | The HTTP status code, as a number. It always equals the HTTP status of the response. |
| `code` | The problem type's code, such as `session_expired`. It is present for every type on this page, and it matches the last segment of `type`, with underscores in place of hyphens. |
| `instance` | The path of the request that failed, without the query string. |
| `timestamp` | When the problem occurred, in ISO 8601 format in UTC, with milliseconds. |
| `errorId` | An identifier for this occurrence of the problem, present on most responses. Quote it when you contact 8x8 support. If a response has no `errorId`, quote the value of its `X-Request-ID` response header instead. Treat it as an opaque string, because its format varies. |
| `error` | A legacy member that older clients read. Its value can differ between responses of the same type, so never use it for branching. |

For example, a request whose signed-in session is no longer valid gets HTTP status `401` and this body:

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

When `type` is `about:blank`, the problem has no listed type and no page here: the HTTP status carries the information, and `title` is the standard reason phrase for that status, such as `Bad Request`.

---

## Handling these errors

- Check that the response's media type is `application/problem+json` before you read these members.
- Identify the problem by its `type` or its `code`. Compare `type` as an exact string (type URIs have no trailing slash), or compare `code` with the values listed on this page.
- Never branch on `title` or on the legacy `error` member.
- Do not identify the problem by its HTTP status alone. Several types share a status, and some types are returned with more than one status. For example, not every `401` means that the session has expired.
- Handle an `about:blank` problem, or a `type` that you do not recognize, by its HTTP status. Such a response can carry a `code` member with a value that is not listed on this page. Treat it like any other problem without a listed type.
- Do not fetch type URIs at runtime. A type URI identifies the problem, and the page at that address is written for people. RFC 9457 advises clients not to dereference type URIs automatically.
- Ignore members that you do not recognize.
- Retry only when the type's page says so, and follow its guidance on when and how often. Most of these problems are not temporary, so resending the same request usually gets the same answer. Never retry in a tight loop, and send a new security-check token with each attempt at a request that needs one.

---

## Problem types

These tables list every problem type that has a page, grouped by the flow in which it usually occurs. Some types also occur in other flows, and each type's page describes when it happens.

### Sign-in

Returned when a sign-in is refused, for example after the user enters an email address and password.

| Problem type | `code` | HTTP status |
| --- | --- | --- |
| [Invalid credentials](/connect/errors/invalid-credentials) | `invalid_credentials` | `400`, `401` |
| [Account suspended](/connect/errors/account-suspended) | `account_suspended` | `401`, `422` |
| [No access to this application](/connect/errors/no-application-access) | `no_application_access` | `401` |
| [Password expired](/connect/errors/password-expired) | `password_expired` | `400` |

### Session

Returned when a request needs a signed-in session, or a sign-in in progress, that is no longer valid.

| Problem type | `code` | HTTP status |
| --- | --- | --- |
| [Session expired](/connect/errors/session-expired) | `session_expired` | `401` |

### Two-factor verification

Returned during two-factor sign-in, when the user requests a verification code or enters one.

| Problem type | `code` | HTTP status |
| --- | --- | --- |
| [Mobile number missing](/connect/errors/mobile-number-missing) | `mobile_number_missing` | `422` |
| [Verification code not sent](/connect/errors/code-send-failed) | `code_send_failed` | `422` |
| [Invalid verification code](/connect/errors/invalid-verification-code) | `invalid_verification_code` | `422` |

### Password reset and change

Returned when a user sets a new password from an emailed link, such as a password reset link, or changes the password while signed in.

| Problem type | `code` | HTTP status |
| --- | --- | --- |
| [Reset link invalid](/connect/errors/reset-token-invalid) | `reset_token_invalid` | `400`, `422` |
| [Password does not meet policy](/connect/errors/password-policy-violation) | `password_policy_violation` | `422` |
| [Password recently used](/connect/errors/password-recently-used) | `password_recently_used` | `422` |

### Sign-up

Returned while someone signs up for 8x8 Connect, from starting the sign-up to verifying the email address and activating the account.

| Problem type | `code` | HTTP status |
| --- | --- | --- |
| [Disposable email address](/connect/errors/disposable-email) | `disposable_email` | `400` |
| [Sign-up not allowed](/connect/errors/signup-not-allowed) | `signup_not_allowed` | `400`, `401` |
| [Verification link invalid](/connect/errors/verification-token-invalid) | `verification_token_invalid` | `400` |
| [Registration failed](/connect/errors/registration-failed) | `registration_failed` | `400` |

### Single sign-on

Returned when a user signs in with single sign-on.

| Problem type | `code` | HTTP status |
| --- | --- | --- |
| [Single sign-on request failed](/connect/errors/sso-request-failed) | `sso_request_failed` | `400` |

If the email address is not accepted for single sign-on, the answer is [Invalid credentials](/connect/errors/invalid-credentials) with status `400` instead.

### Security checks and limits

Returned when a request does not pass the security check that protects it, or when sign-in is blocked after too many failed attempts.

| Problem type | `code` | HTTP status |
| --- | --- | --- |
| [Security check required](/connect/errors/captcha-required) | `captcha_required` | `400` |
| [Too many attempts](/connect/errors/too-many-attempts) | `too_many_attempts` | `401` |
