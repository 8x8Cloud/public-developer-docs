---
sidebar_label: 'Business-Scoped User IDs'
---

# WhatsApp Business-Scoped User IDs (BSUID)

WhatsApp is introducing optional end-user usernames that allow users to hide their phone numbers from the businesses they message. To ensure businesses can continuously recognize and message these users, Meta is introducing a persistent, unique per-user identifier called the Business-Scoped User ID (BSUID).

Supporting BSUID is mandatory for all WhatsApp Business Platform partners, directly-integrated businesses, and Click-to-WhatsApp (CTWA) advertisers. This page covers the conceptual architecture, then the exact API and webhook changes required to support BSUID on the 8x8 platform, an integration checklist, and the rollout timeline.

## Conceptual Foundation & Core Architecture

### The Username Shift: Why BSUID Support Is Mandatory

Under the legacy WhatsApp architecture, end-user identification was tied strictly to a mobile phone number (`msisdn`). The introduction of optional usernames changes this paradigm:

- **Optional for Users, Mandatory for You:** Any WhatsApp user can choose to adopt a username and completely mask their phone number. You cannot control or prevent this setting.
- **The Breakage Risk:** Any CRM, marketing campaign tool, or webhook handler designed under the assumption that every customer contact has a phone number will fail when interacting with username-only users.
- **Continuous Delivery:** Supporting BSUID guarantees that you can deliver messages to users who have hidden their phone numbers behind usernames.

**The Durable Key Concept**

A BSUID is assigned to every WhatsApp user, whether they have opted to create a username or not. Do not treat BSUID as a username-only fallback; instead, store and treat it as a durable, primary database key alongside the customer's phone number in your contact records.

### Anatomy of a BSUID

A BSUID is a unique, structured identifier assigned by Meta to a specific WhatsApp user for a specific business portfolio.

**Format and Structure**

A valid BSUID consists of three parts joined together: a two-letter [ISO 3166 alpha-2](https://www.iso.org/iso-3166-country-codes.html) country code (for example `US`, `SG`), a separator period (`.`), and an alphanumeric string of up to 128 characters.

Example: `US.13491208655302741918`

> **Important: Formatting Rule**
>
> Always store and transmit the BSUID in its exact, complete format, including the country code and period. Omitting, parsing, or modifying any portion of this string will cause API requests to fail.

**Scope and Stability Limits**

- **Business Portfolio Scoped:** a BSUID is unique to your specific Meta Business Portfolio and user pair. Any phone number belonging to the same Business Portfolio and [WhatsApp Business Account (WABA)](./concepts-fundamentals.md#meta--8x8-platform-hierarchy) can use this BSUID to message the user. A phone number from a different portfolio cannot.

### Phone Number Visibility & Retention Rules

To protect user privacy while maintaining business continuity, Meta applies strict rules regarding when an end user's phone number (`msisdn`) is visible to your platform.

**Automated Visibility Criteria**

A user's phone number remains visible in your incoming webhooks and API responses alongside their BSUID if any of the following conditions are met:

- **Inbound Interaction:** you received a WhatsApp message or call from that phone number within the last 30 days.
- **Outbound Interaction:** you messaged or called that phone number successfully within the last 30 days.
- **The Portfolio Contact Book:** the user exists in your WhatsApp Portfolio's automatic contact book.

**The Portfolio Contact Book**

The portfolio contact book is an automated, Meta-hosted directory. When any WhatsApp business phone number in your portfolio interacts with an end user, the system automatically captures and links their phone number and BSUID.

Once captured, the pair is preserved portfolio-wide, keeping the phone number visible even after the 30-day interaction window expires or the user adopts a username. This is a native Meta feature and requires no integration work on your part. To manage or disable this directory, navigate to **Meta Business Suite > Business settings > Business info**.

If none of the visibility criteria are met, incoming webhook payloads and delivery reports omit the `msisdn` property entirely, providing only the `channelUserId` (BSUID).

> **Note**
>
> Reserving or adopting your own *business* username (for example, `@yourbusiness`) is a separate Meta feature, handled directly through [Meta Business Suite](https://business.facebook.com/wa/manage/), WhatsApp Manager, the WhatsApp Business app, or Meta's Username API, not through 8x8.

### Platform Pair Routing

The 8x8 Send Message API accepts both `user.msisdn` (phone number) and `user.channelUserId` (BSUID) in the same payload.

| Recipient Identifier Scenario | 8x8 Routing Behavior |
| --- | --- |
| `msisdn` only | Delivered via standard phone routing. |
| `channelUserId` only | Delivered strictly to the matching BSUID on Meta's network. |
| Both identifiers provided | `msisdn` takes precedence. To send using only the BSUID, omit `msisdn` from the request. |

### Key Platform Limitations & Constraints

While BSUID provides a reliable way to message masked users, design your workflows around the following limitations:

**Authentication Template Limitations**

You cannot send zero-tap, one-tap, or copy-code authentication templates to a BSUID recipient. These OTP flows require a physical phone number. Attempting to send an authentication template to a payload containing only a BSUID (`channelUserId`) fails with 8x8 error code `1054` (mapped from Meta's `131062`): "Business-scoped User ID (BSUID) recipients are not supported for this message." Ensure you have collected and validated the customer's `msisdn` before triggering an authentication/OTP flow.

**Implementation Timeline**

- **Webhook Payload Availability:** Inbound Message (MO) v3 and Delivery Report (DR) v9, carrying the real BSUID, are available on 8x8 from **July 7, 2026**.
- **Send-to-BSUID Capability:** support for sending outbound messages addressed directly to a `channelUserId` through 8x8 targets **July 13, 2026**. Do not deprecate your phone-number-based routing logic before this milestone.

See [Rollout Timeline](#rollout-timeline) for the full schedule.

## 8x8 Developer & API Reference

8x8 exposes the BSUID as `user.channelUserId`, alongside the existing `user.msisdn`, across the WhatsApp over 8x8 API.

### Sending Messages to a BSUID

The Send Message endpoint accepts `channelUserId` as a recipient identifier, in addition to `msisdn`.

**Endpoint:**

```http
POST https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages
```

- `user.msisdn` and `user.channelUserId` may both be present in the same request. **If both are present, `msisdn` takes precedence.**
- To send using only the phone number, set `msisdn` and omit `channelUserId`.
- To send using only the BSUID, set `channelUserId` and omit `msisdn`.
- At least one of `msisdn` or `channelUserId` is required.

> **Important: Send-to-BSUID Target**
>
> The 8x8 Send Message API accepts `channelUserId` structurally today. Support for sending outbound messages addressed directly to a `channelUserId` through 8x8 targets **July 13, 2026**. Until then, continue sending `msisdn` whenever you have one on file.

**Example A: Legacy Payload (Phone Number Only)**

```json
{
  "user": {
    "msisdn": "+15551234567"
  },
  "type": "text",
  "content": {
    "text": "Welcome to 8x8 Inc.! We are the leading global provider of unified cloud communications, video collaboration, and contact center solutions.\n\nWe empower your business to thrive in the modern workplace by offering a single, secure, and integrated platform for all your voice, video, chat, and customer service needs.\n\nOur solutions are designed to deliver exceptional experiences for both your employees and your customers, ensuring seamless global connectivity and robust reliability.\n\nHow can we help you unify your communications today? Reply with INFO for a quick link to our solutions guide or TALK to connect with a specialist."
  }
}
```

**Example B: BSUID-Only Recipient Payload**

```json
{
  "user": {
    "channelUserId": "US.13491208655302741918"
  },
  "type": "text",
  "content": {
    "text": "Welcome to 8x8 Inc.! We are the leading global provider of unified cloud communications, video collaboration, and contact center solutions.\n\nWe empower your business to thrive in the modern workplace by offering a single, secure, and integrated platform for all your voice, video, chat, and customer service needs.\n\nOur solutions are designed to deliver exceptional experiences for both your employees and your customers, ensuring seamless global connectivity and robust reliability.\n\nHow can we help you unify your communications today? Reply with INFO for a quick link to our solutions guide or TALK to connect with a specialist."
  }
}
```

**Example C: Both Identifiers Provided (`msisdn` Takes Precedence)**

Per [Meta's documentation](https://developers.facebook.com/documentation/business-messaging/whatsapp/business-scoped-user-ids/#send-message-requests), when both are present, `msisdn` takes precedence.

```json
{
  "user": {
    "msisdn": "+15551234567",
    "channelUserId": "US.13491208655302741918"
  },
  "type": "template",
  "content": {
    "template": {
      "language": "<TEMPLATE_LANGUAGE>",
      "name": "<TEMPLATE_NAME>",
      "components": []
    }
  }
}
```

### Sending Batch Messages to Mixed Recipients

**Endpoint:**

```http
POST https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages/batch
```

Each entry in the `messages[]` array accepts its own `user.channelUserId` and/or `user.msisdn`. This lets you mix phone number and BSUID recipients within a single batch. The same precedence rule applies per message: `msisdn` wins when both are present.

**Example: Mixed Batch Payload**

```json
{
  "clientBatchId": "batch_flow_test_001",
  "includeMessagesInResponse": true,
  "template": {
    "type": "template",
    "content": {
      "template": {
        "language": "<TEMPLATE_LANGUAGE>",
        "name": "<TEMPLATE_NAME>",
        "components": []
      }
    }
  },
  "messages": [
    {
      "user": {
        "channelUserId": "US.13491208655302741918"
      },
      "clientMessageId": "msg_001"
    },
    {
      "user": {
        "msisdn": "+15551234567"
      },
      "clientMessageId": "msg_002"
    },
    {
      "user": {
        "msisdn": "+15551234567",
        "channelUserId": "SG.13491208655302741999"
      },
      "clientMessageId": "msg_003"
    }
  ]
}
```

### Authentication Template Limitation & Error Handling

You cannot target a `channelUserId` with authentication templates (one-tap, zero-tap, or copy-code). If a BSUID recipient is targeted without a fallback `msisdn`, the request fails:

| 8x8 Error Code | Meta Error Code | API / Webhook Message | Root Cause & Resolution |
| --- | --- | --- | --- |
| `1054` | `131062` | Business-scoped User ID (BSUID) recipients are not supported for this message. | OTP templates require phone-based routing. Send this template to the recipient's `msisdn` instead. If you only have a `channelUserId` on file, collect their phone number first (see [Phone Number Visibility & Retention Rules](#phone-number-visibility--retention-rules)) or use a non-authentication delivery path. |

> 📘 **Webhook Migration Guide**
>
> BSUIDs only surface on 8x8's newest webhook payload versions: Delivery Report (DR) v9 and Inbound Message (MO) v3. These versions are delivered only on 8x8's current webhook format. If your account is still on the deprecated Wavecell setup, you keep receiving the old, type-based payloads and will never see a BSUID. Check your format and migrate first: see the [Webhook Migration Guide](/connect/docs/webhook-migration-guide).

### Delivery Report Webhook (DR) v9

On DR v9, the BSUID appears in `user.channelUserId` when WhatsApp confirms the message, and `user.msisdn` becomes optional (omitted when unavailable).

| Field Path | v8 Behavior | v9 Behavior |
| --- | --- | --- |
| `version` | Not present | Explicitly set to `9` |
| `user.channelUserId` | String. Duplicates the digits of the `msisdn` | String. Real BSUID format (for example `US.13491208655302741918`) |
| `user.msisdn` | Always present | Optional. Omitted when the phone number is unavailable |

> **Note**
>
> `channelUserId` on a delivery report is populated only from WhatsApp's own receipts. For a phone-addressed send, it appears on `delivered_to_recipient` and `read` statuses, but is omitted on intermediate `queued` or `delivered_to_operator` states.

**Example Payload: DR v9 (delivered_to_recipient)**

```json
{
  "version": 9,
  "namespace": "ChatApps",
  "eventType": "outbound_message_status_changed",
  "description": "ChatApps outbound message delivery receipt",
  "payload": {
    "umid": "<UNIQUE_MESSAGE_ID>",
    "subAccountId": "<SUBACCOUNT_ID>",
    "channel": "whatsapp",
    "user": {
      "msisdn": "+15551234567",
      "channelUserId": "US.13491208655302741918"
    },
    "status": {
      "state": "delivered",
      "detail": "delivered_to_recipient",
      "timestamp": "2026-05-05T09:15:57.00Z"
    }
  }
}
```

**Failed and undelivered statuses:** the same structural changes apply to `failed` and `undelivered` receipts. `channelUserId` is included only when the message was sent to a BSUID, and omitted when it was sent to an `msisdn`.

### Inbound Message Webhook (MO) v3

When a WhatsApp user sends an inbound message to your business, the platform forwards the payload to your endpoint. Version 3 adds the persistent BSUID alongside an optional username.

| Field Path | v2 Behavior | v3 Behavior |
| --- | --- | --- |
| `version` | Not present | Explicitly set to `3` |
| `user.channelUserId` | String. Duplicates the digits of the `msisdn` | String. Real BSUID format (for example `US.13491208655302741918`) |
| `user.username` | Not present | Optional string. The sender's WhatsApp username, if adopted |
| `user.msisdn` | Always present | Optional. Omitted for username-only users with no recent contact history |

**Example Payload: MO v3 (Inbound Text Message)**

```json
{
  "version": 3,
  "namespace": "ChatApps",
  "eventType": "inbound_message_received",
  "description": "ChatApps inbound message",
  "payload": {
    "umid": "<UNIQUE_MESSAGE_ID>",
    "subAccountId": "<SUBACCOUNT_ID>",
    "timestamp": "2026-06-09T10:13:20.00Z",
    "user": {
      "msisdn": "+15551234567",
      "channelUserId": "US.13491208655302741918",
      "name": "<USER_NAME>",
      "username": "<USERNAME>"
    },
    "recipient": {
      "channel": "whatsapp",
      "channelId": "<CHANNEL_ID>"
    },
    "type": "Text",
    "content": {
      "text": "Hello"
    }
  }
}
```

## Integration Checklist

Complete these before 8x8 enables send-to-BSUID delivery (targeted for July 13, 2026). Treat the webhook format check as most urgent: do it now, independent of that date.

- [ ] **Confirm your webhook format.** Test with the current [Webhook Configuration API](/connect/reference/get-webhooks-2). An error mentioning `Version = V1` means you are on the deprecated Wavecell format and will never receive a BSUID until you migrate. Follow the [Webhook Migration Guide](/connect/docs/webhook-migration-guide).
- [ ] **Confirm you are receiving DR v9 and MO v3** (available on 8x8 from July 7, 2026). Check the `version` field on incoming events once migrated (`9` for DR, `3` for MO), using the [Webhook Configuration API](/connect/reference/get-webhooks-2) and [webhook object structure](/connect/docs/webhook-object-structure) reference.
- [ ] **Stop treating `channelUserId` as a phone-number duplicate.** On DR v8 / MO v2, it just repeats the digits from `msisdn`. On v9 / v3, it is a real BSUID (`<country>.<digits>` format) and needs to be handled as a distinct identifier, not parsed as a phone number.
- [ ] **Store `channelUserId` alongside `msisdn`** in your CRM or contact records as a stable per-user key. Do not assume every WhatsApp contact has a phone number on file.
- [ ] **Keep authentication flows on phone numbers.** One-tap, zero-tap, and copy code authentication templates cannot target a `channelUserId` (8x8 error `1054`). Make sure any contact you might send an OTP to has an `msisdn` on file, or collect one before sending.
- [ ] **Handle error `1054`** in your send pipeline by falling back to `msisdn` or requesting a phone number, rather than letting the send silently fail.
- [ ] **Plan and test your send path for `channelUserId` recipients** in a non-critical flow first, ready for 8x8's July 13, 2026 send-enablement target.

## Rollout Timeline

The July dates below are 8x8's own engineering targets. The username wave rollout is Meta's own schedule.

| Date | Event |
| --- | --- |
| June 29, 2026 | Businesses can begin reserving and claiming their own business username directly with Meta. |
| July 7, 2026 | DR v9 and MO v3 webhooks, carrying the real BSUID, become available on 8x8. |
| July 13, 2026 | 8x8 targets enabling delivery of messages addressed to a `channelUserId`. |
|  2026, no confirmed date | WhatsApp begins rolling out usernames to end users gradually. Meta has not published a specific date. |

## Related Resources

**Prerequisite:**

- [Webhook Migration Guide](/connect/docs/webhook-migration-guide) - Confirm you are on 8x8's current webhook format. Required before you can receive MO v3, DR v9, or any BSUID data.

**API and Webhook Reference:**

- [WhatsApp Webhooks Reference](./whatsapp-webhooks.md) - Full field reference for inbound messages and delivery receipts.
- [WhatsApp over 8x8 API](./whatsapp-over-8x8-api.md) - Authentication, endpoints, and the rest of the Send Message payload.
- [Zero-tap and One-tap WhatsApp Authentication Template](/connect/docs/guide-whatsapp-one-tap-or-zero-tap-authentication) - Authentication template delivery methods that require a phone number.

**Conceptual Foundation:**

- [Concepts & Fundamentals](./concepts-fundamentals.md) - How Business Portfolio, WABA, and Channel fit together.

**External:**

- [Meta: Business-scoped user IDs](https://developers.facebook.com/documentation/business-messaging/whatsapp/business-scoped-user-ids/) - Meta's own reference, including the full document changelog.
