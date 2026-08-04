---
slug: /connect/docs/viber/webhooks-delivery-receipts
sidebar_label: 'Webhooks & Delivery Receipts'
---

# Webhooks and Delivery Receipts

Viber sends three kinds of event to your webhook: inbound messages from customers, delivery receipts for messages you sent, and template status changes. All three arrive on the callback URL configured for your account.

This page covers what is Viber-specific: the receipt statuses Viber reports, the fields unique to a Viber receipt, and how template moderation results reach you. The shared payload structure, retry behavior, and versioning that apply across every Messaging Apps channel are documented in [Delivery receipts for Outbound Messaging Apps](/connect/docs/delivery-receipts-for-outbound-chatapps) and [Inbound Messaging Apps message](/connect/docs/inbound-chatapps-message). For the request payloads that generate these receipts, see [Sending Viber Messages over API](/connect/docs/viber/sending-viber-messages-api).

---

## Configuring Your Webhook

Register your callback URL with the [Webhooks Configuration API](/connect/reference/add-webhooks-1). One URL serves every Messaging Apps channel on the account, and the `channel` field on each payload tells you which channel the event came from. For Viber, that value is `viber`.

---

## Delivery Receipt Statuses

Viber reports read receipts in addition to delivery, so you can track a message all the way from acceptance to open. The value arrives in `status.state`.

| `status.state` | Meaning |
| :--- | :--- |
| `queued` | 8x8 accepted the message and queued it for delivery |
| `sent` | Handed off to Viber |
| `delivered` | Delivered. `status.detail` distinguishes `delivered_to_operator` from `delivered_to_recipient` |
| `read` | Opened by the recipient |
| `undelivered` | Viber reported the message was not delivered. `status.errorCode` carries the 8x8 error code |

For the complete enum and every `status.detail` value, see [Message status reference](/connect/docs/message-status-references).

If the recipient does not read the message promptly, 8x8 keeps checking for a read receipt for up to 10 days.

### Sample Delivery Receipt

```json
{
  "version": 9,
  "namespace": "ChatApps",
  "eventType": "outbound_message_status_changed",
  "description": "ChatApps outbound message delivery receipt",
  "payload": {
    "umid": "9f1c2e7a-6b40-4de1-8a2c-1f0d9e7c5b31",
    "subAccountId": "{subAccountId}",
    "channel": "viber",
    "user": {
      "msisdn": "+6512345678"
    },
    "status": {
      "state": "delivered",
      "detail": "delivered_to_operator",
      "timestamp": "2026-07-03T03:21:26.06Z"
    }
  }
}
```

**Key Fields:**

- `umid`: The message identifier 8x8 returned when you sent the message
- `channel`: `viber`
- `user.msisdn`: The recipient's phone number
- `status.state` and `status.detail`: Together, these describe how far the message got

Viber identifies recipients purely by phone number, so delivery receipts carry no `channelUserId`.

---

## Viber-Specific Receipt Fields

> 🚧 **Coming soon**
>
> The `viber` object described here is in development and is not yet present in delivery receipts.

Delivery receipts for Viber will carry a `viber` object alongside the standard payload:

```json
{
  "viber": {
    "providerErrorCode": "",
    "pricingCategory": "session",
    "billable": true
  }
}
```

| Field | Type | Description |
| :--- | :--- | :--- |
| `providerErrorCode` | string | The raw error code returned by Viber. Empty when Viber provided none |
| `pricingCategory` | string | How the message was rated: `session`, `transactional`, or `promotional` |
| `billable` | boolean | Whether this message carried a charge. Within a session, only the first message is billable |

See [Conversational Messaging](/connect/docs/viber/sessions#how-session-messages-are-rated) for how these values are derived.

---

## Inbound Messages

An inbound Viber message arrives with `channel` set to `viber` and opens a [24 hour session window](/connect/docs/viber/sessions#how-a-session-works) for that customer. The payload structure matches other Messaging Apps channels, documented in [Inbound Messaging Apps message](/connect/docs/inbound-chatapps-message).

Inbound messages are not charged a Viber message fee.

---

## Template Status Events

When you register a Viber template, Viber moderates it within 24 hours and reports the outcome. 8x8 receives that callback, updates the stored template, and forwards the event to your webhook so you do not have to poll.

| Outcome | Resulting template status |
| :--- | :--- |
| Received and queued for moderation | `Pending` |
| Approved by Viber | `Approved` |
| Rejected by Viber | `Declined` |

These three statuses are the same lifecycle described in [Viber Templates](/connect/docs/viber/templates#lifecycle); this page covers how the transition reaches your webhook, not the rules Viber applies to reach it.

The forwarded event identifies the template by the **name** you chose at creation, not Viber's internal identifier.

> 📘
>
> A template must reach `Approved` before you can send with it. Sending against a `Pending` or `Declined` template is rejected before the request reaches Viber.

See [Transactional Message API Library](/connect/docs/viber/templates) for the creation flow.

---

## Errors

Viber send failures surface as delivery receipt errors. Codes specific to template traffic are listed in [Sending Viber Messages over API](/connect/docs/viber/sending-viber-messages-api#error-codes).

> 📘 **Error Code Reference**
>
> For the complete list of all Viber error codes and their meanings, see [Delivery Error Codes](/connect/docs/delivery-error-codes#viber-error-codes).

Any non-success response from Viber triggers SMS fallback when your channel is configured for it, regardless of which error code was returned.

---

## Next Steps

| If you want to | Read |
| :--- | :--- |
| Send messages and see the request payloads that generate these receipts | [Sending Viber Messages over API](/connect/docs/viber/sending-viber-messages-api) |
| Understand the session model behind the `pricingCategory` and `billable` fields | [Conversational Messaging](/connect/docs/viber/sessions#how-session-messages-are-rated) |
| Review the template lifecycle these status events report on | [Viber Templates](/connect/docs/viber/templates#lifecycle) |
| Look up a specific delivery or template error code | [Delivery Error Codes](/connect/docs/delivery-error-codes#viber-error-codes) |
| Revisit the business case and full page map | [Viber Hub](/connect/docs/viber/viber-hub) |
