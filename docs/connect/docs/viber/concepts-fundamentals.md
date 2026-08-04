---
slug: /connect/docs/viber/concepts-fundamentals
sidebar_label: 'Concepts & Fundamentals'
---

# Concepts & Fundamentals

Before you send a Viber message or register a template, it helps to understand how 8x8 structures a Viber account, how Viber classifies your traffic, and how sessions and SMS fallback change what happens after you send. This page defines those concepts once so the rest of this section can build on them without repeating itself. If you have not read the [Viber Hub](/connect/docs/viber/viber-hub), start there for the business case and a map of this section.

---

## Account Structure

An 8x8 account set up for Viber has four levels. The first two are shared infrastructure across every channel on the 8x8 Messaging Apps API; the last two are specific to Viber:

1. **8x8 Account:** Your top-level 8x8 Connect account.
2. **Subaccount:** The subaccount where your Viber channel is provisioned. It must be a messaging subaccount, not an existing SMS subaccount.
3. **Viber Channel:** The channel 8x8 provisions on that subaccount once Viber approves your business sender.
4. **Viber Service ID:** The identifier Viber assigns to your business sender during onboarding. It identifies you as a Viber Business Account, and Viber-side limits, such as how many templates you can hold, are scoped to it.

A subaccount is provisioned with one Viber channel, and that channel maps to one Viber Service ID.

> 📘
>
> 8x8 provisions your Viber channel, but Viber itself reviews your business and assigns the Service ID. See [Account Onboarding](/connect/docs/viber/account-onboarding) for what to submit and what happens after you do.

---

## Message Categories

Viber classifies every business message into one of three categories. The category determines how you compose the message, whether a template is required, and how the message is billed.

| Category | How you send | Template required | Use cases | API library |
| :--- | :--- | :--- | :--- | :--- |
| **Promotional** | Free-form: you compose text, media, and buttons at send time | No | Marketing offers, product promotions, seasonal campaigns | [Promotional Message API Library](/connect/docs/viber/message-types) |
| **Transactional** | Template: you reference a pre-approved template by name and supply placeholder values | Yes | **Utility:** order confirmations, delivery updates, account notices, payment reminders. **OTP:** verification codes and one-time passwords | [Transactional Message API Library](/connect/docs/viber/templates) |
| **Conversational** | Free-form or template, inside a 24 hour session window opened by the customer | No (but template rules still apply if you send a template inside a session) | Customer support, two-way exchanges, multi-turn bot flows | [Conversational Messaging](/connect/docs/viber/sessions) |

### Promotional

You compose the content yourself, choosing from text, images, video, files, buttons, and carousel formats. No approval step is needed. See the [Promotional Message API Library](/connect/docs/viber/message-types) for every format with screenshots and payloads.

### Transactional

Transactional content requires a pre-approved template. You register the template wording in advance, Viber moderates it within 24 hours, and you reference it by name at send time. Transactional covers two use cases:

- **Utility:** Order confirmations, delivery updates, account notices, and payment reminders. Templates can include up to 5 text placeholders.
- **OTP:** Verification codes and one-time passwords. The template body must contain a `{{pin}}` placeholder. Viber renders OTP messages as a card with a Copy button for the recipient.

Both use the same Create Template and Send Template API. See the [Transactional Message API Library](/connect/docs/viber/templates) for payloads, rules, and the full lifecycle.

> 📘
>
> There is no promotional template category. Promotional content never goes through template approval; transactional and OTP content always does.

### Conversational

A conversational session is a 24 hour window that opens when a customer messages your business first. Outbound messages inside the window are rated as a single flat session fee instead of individually, giving back-and-forth conversations flat-fee economics.

- **Opens when:** A customer sends an inbound message. You cannot open a session yourself.
- **Lasts:** 24 hours from that inbound message.
- **Consecutive outbound cap:** 10 messages without a customer reply. The count resets every time the customer replies.
- **Integration impact:** None. You keep sending the same requests, and the platform detects and rates session messages automatically.

> 🚧
>
> The 10-message cap is enforced by Viber, not by 8x8. Design bot and agent flows so a customer reply is expected before the tenth outbound message in a session.

A message sent inside an open session is rated as a session message regardless of its content type. See [Conversational Messaging](/connect/docs/viber/sessions) for the full rating model, limits, and how to enable sessions on your channel.

---

## SMS Fallback

If a Viber send fails, for example because the recipient is offline or does not have Viber installed, 8x8 can automatically send the same content as SMS instead so the message still reaches them.

- **Configuration:** Set up by 8x8 as part of your channel configuration. Contact your account manager to enable it.
- **What you provide:** A `fallbackText` value in your send request. This is the text 8x8 sends as SMS if the Viber attempt fails.
- **How it's billed:** The fallback SMS is rated as SMS traffic, separately from the Viber send attempt.

See [Getting Started](/connect/docs/viber/getting-started) for where `fallbackText` fits in a send request, and [Billing](/connect/docs/viber/billing) for how fallback traffic is rated.

---

## Delivery Tracking

Every Viber message you send generates delivery events on your configured webhook as it moves toward the recipient.

| Status | Meaning |
| :--- | :--- |
| `queued` | 8x8 accepted the message and queued it for delivery |
| `sent` | Handed off to Viber |
| `delivered` | Delivered to the recipient's device |
| `read` | Opened by the recipient |
| `undelivered` | Viber reported the message was not delivered |

Viber reports read receipts as well as delivery, so you can track a message all the way from acceptance to open.

Template approvals arrive the same way. When Viber moderates a template you registered, the resulting status, `Pending`, `Approved`, or `Declined`, is forwarded to your webhook too, so you do not need to poll for it.

> 📘
>
> This page covers delivery tracking at a glance. For the full status enum, sample payloads, and the Viber-specific receipt fields still in development, see [Webhooks and Delivery Receipts](/connect/docs/viber/webhooks-delivery-receipts).

---

## Next Steps

| If you want to | Read |
| :--- | :--- |
| Get a Viber Business Account provisioned | [Account Onboarding](/connect/docs/viber/account-onboarding) |
| Send your first Viber message | [Getting Started](/connect/docs/viber/getting-started) |
| Understand session limits and rating in full | [Conversational Messaging](/connect/docs/viber/sessions) |
| Learn the template model, rules, and lifecycle | [Viber Templates](/connect/docs/viber/templates) |
| See delivery statuses and template status events in detail | [Webhooks and Delivery Receipts](/connect/docs/viber/webhooks-delivery-receipts) |
| Revisit the business case and full page map | [Viber Hub](/connect/docs/viber/viber-hub) |
