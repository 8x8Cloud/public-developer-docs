---
date: 2026-08-07
products: ["Connect", "APIs"]
channel: "Viber"
changeType: Added
title: "Viber message templates"
---

You can now create and manage **Viber message templates** — pre-approved message formats for transactional messages and OTPs, with dynamic `{{parameter}}` placeholders substituted at send time. Creating templates requires an admin role on the account.

## Two template categories

| Category | Use for |
| --- | --- |
| **Transactional** | Order confirmations, shipping updates, appointment reminders. |
| **OTP** | One-time passwords and verification codes. |

## Create a template via the API

```http
POST /api/v1/accounts/{accountId}/channels/{viberChannelId}/templates
```

The request body takes `name` (lowercase letters, numbers, and underscores), `category` (`Transactional` or `OTP`), `language` (e.g. `en`, `id`), and `text` with `{{parameter_name}}` placeholders for the dynamic parts.

## Full Viber channel docs

This release also published the complete Viber channel documentation set — account onboarding, concepts & fundamentals, sessions, billing, compliance, and the message API library.

- [Viber Templates Management guide](/connect/docs/viber-templates-management)
- [Add a Viber template — API reference](/connect/reference/add-viber-template)
- [Viber hub](/connect/docs/viber/viber-hub)
