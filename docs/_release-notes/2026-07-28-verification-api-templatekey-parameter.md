---
date: 2026-07-28
products: ["Connect", "APIs"]
channel: "Verification"
changeType: Changed
title: "Verification API templateKey parameter"
---

The Verification API request now accepts a `templateKey` parameter, letting you select a pre-saved message template by its key instead of supplying the message content inline. The example values used across the Verification API documentation have also been standardised.

## The templateKey parameter

`templateKey` is optional. It references a template configured for your account in 8x8 Connect (for example, under Verify templates), and the key must match that template's name.

It differs from the existing `template` parameter: `template` defines inline message text with `{code}` and `{brand}` placeholders, whereas `templateKey` points at an existing saved template. When `templateKey` is omitted, the account's default Verify template is used — but if your account has multiple saved templates you must provide `templateKey` to select a specific one. The referenced template is resolved for the requested `channel` and `language`; if no template matches the key for your account, the request fails with a `400` error.

```http
POST https://verify.8x8.com/api/v2/subaccounts/{subAccountId}/sessions
```

```json
{
  "destination": "+19876543210",
  "channel": "sms",
  "templateKey": "otp-template-simple"
}
```

## Standardised examples

The request and response samples throughout the Verification API docs now use consistent example values (such as the destination `+19876543210`), making it easier to follow an example from the request into its response.

- [Initiate verification — API reference](/connect/reference/verify-request-v-2)
- [Validate verification — API reference](/connect/reference/code-validation-v-2)
- [Getting started with Verification API](/connect/docs/verification-api-get-started)
