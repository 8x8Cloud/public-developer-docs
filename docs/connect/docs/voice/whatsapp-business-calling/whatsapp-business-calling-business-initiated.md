---
slug: /connect/docs/voice/whatsapp-business-calling/business-initiated
title: Business-initiated calling
---

## What is Business-initiated Calling?

Business-initiated calling (BIC) lets your business call a customer via WhatsApp. The customer must have granted calling permission first.

**BIC availability by integration path:**

| Path | BIC supported today | Who handles templates and permissions |
|------|---------------------|---------------------------------------|
| **Direct SIP** | Yes | Customer builds against the 8x8 ChatApps API — see [Direct SIP integration](#direct-sip-integration) |
| **8x8 Converse** | Yes | Template send and permission-webhook handling are baked into the Converse integration — the customer does not build against the ChatApps API |
| **Genesys** | Not today (planned) | — |
| **VCC via AI Studio** | Not today | — |

If you are on Converse, most of this page is background reading — Converse manages the permission lifecycle for you. If you are on Direct SIP, follow the five-step integration below.

---

## Topology

```text
WhatsApp user  ←  Meta  —SIP←  8x8 CPaaS  —SIP←  Your SBC / PBX / Contact Center
```

The Meta ↔ 8x8 leg and the 8x8 ↔ customer leg are both SIP. There is no 8x8 API for placing a call — your system triggers the outbound leg through the delivery path (Direct SIP endpoint, Converse, etc.).

---

## Permission model

### Two states

| State | Duration | How acquired |
|-------|----------|--------------|
| **Temporary** | 7 calendar days (168 hours) from approval | User grants in response to a permission request, or via the auto-shown permission prompt, or by calling the business when callback is enabled (`responseSource: automatic`) |
| **Permanent** | Does not expire until revoked (released 3 November 2025) | User grants from the business profile, or in response to a permission request |

The **user** chooses permanent or temporary — the business cannot request one or the other. The permission-request payload is identical either way.

`expirationTimestamp` is omitted for permanent permissions — its absence is meaningful.

### Rate limits and revocation

| Rule | Value |
|------|-------|
| Permission requests per user | 1 per 24 hours, 2 per 7 days (reset by any connected call) |
| Connected calls per business phone number | 100 per 24 hours (rate limit; does not revoke permission) |
| Consecutive unanswered calls → system message | 2 |
| Consecutive unanswered calls → permission auto-revoked | 4 |
| Error `138017` | Returned if you send a permission request when a permanent permission already exists |

**There is no webhook when a temporary permission expires.** Check `callPermissions` before every call.

Business-initiated calls bypass the user's Silence Unknown Callers setting.

---

## Geographic availability

:::warning BIC is NOT available in
🇺🇸 United States, 🇨🇦 Canada, 🇹🇷 Turkey, 🇪🇬 Egypt, 🇻🇳 Vietnam, 🇳🇬 Nigeria

If you serve customers in these regions, use [user-initiated calling](/connect/docs/voice/whatsapp-business-calling/user-initiated) instead.
:::

Sanctioned countries (all features blocked): 🇨🇺 Cuba, 🇮🇷 Iran, 🇰🇵 North Korea, 🇸🇾 Syria, 🇺🇦 Ukraine (Crimea, Donetsk, Luhansk).

Voice quality depends on the customer's network. Local telecom regulations may impose further restrictions.

---

## Direct SIP integration

Five steps. Skip this section if you are on Converse — Converse handles all of it.

### Step 1: Create the call permission template

```text
POST https://chatapps.8x8.com/api/v1/accounts/{accountId}/channels/{channelId}/templates
```

```json
{
  "name": "cpr_template_sample",
  "category": "MARKETING|UTILITY",
  "language": "en",
  "components": [
    { "type": "HEADER", "text": "Customer Service Request" },
    { "type": "BODY", "text": "We would like to call you to help resolve your recent inquiry faster and provide personalized assistance." },
    { "type": "FOOTER", "text": "Talk to you soon!" },
    { "type": "CALL_PERMISSION_REQUEST" }
  ]
}
```

- Category must be `MARKETING` or `UTILITY`. Use `UTILITY` for transactional calls.
- The `BODY` text is required and must not be empty.
- `CALL_PERMISSION_REQUEST` cannot be combined with other interactive components.
- Approval takes up to 24 hours. Track approval status with `template_status_update` on the **CABM** webhook rather than polling.

See [Add WhatsApp template](/connect/reference/add-whatsapp-template) for the full API reference.

### Step 2: Send the approved template

```text
POST https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages
```

See [WhatsApp over 8x8 API](/connect/docs/whatsapp/whatsapp-over-8x8-api) for the send-message payload shape.

### Step 3: Receive the reply on the inbound-message webhook

The reply comes from 8x8, not from Meta. Nothing is configured on the Meta side.

```json
{
  "version": 3,
  "namespace": "ChatApps",
  "eventType": "inbound_message_received",
  "description": "ChatApps inbound message",
  "payload": {
    "umid": "<UNIQUE_MESSAGE_ID>",
    "subAccountId": "<SUBACCOUNT_ID>",
    "timestamp": "2026-01-22T22:51:55.00Z",
    "user": {
      "msisdn": "<USER_PHONE_NUMBER>",
      "channelUserId": "<WHATSAPP_BSUID>"
    },
    "recipient": {
      "channel": "whatsapp",
      "channelId": "<CHANNEL_ID>"
    },
    "type": "Interactive",
    "content": {
      "interactive": {
        "type": "callPermissionReply",
        "callPermissionReply": {
          "response": "accept",
          "isPermanent": false,
          "expirationTimestamp": "2026-01-23T06:51:55.00Z",
          "responseSource": "user_action"
        }
      }
    }
  }
}
```

| Field | Values | Notes |
|-------|--------|-------|
| `response` | `accept`, `reject` | The user's decision |
| `isPermanent` | `true`, `false` | `true` when the user allowed calls permanently |
| `expirationTimestamp` | ISO 8601 | Temporary only; omitted for permanent |
| `responseSource` | `user_action`, `automatic` | `automatic` covers callback-permission and auto-revocation |

**Watch for `responseSource: automatic`.** A handler that only expects `user_action` will miss auto-revocation and keep calling a user whose permission is gone.

Endpoint requirements: HTTPS, HTTP 200 within 5 seconds, exponential-backoff retries, deduplicate on `umid`.

Store the reply against the user. Do not build a hourly expiry job — poll `callPermissions` before every call instead (Step 4).

### Step 4: Check permission before every call — and before every request

```text
GET /api/v1/whatsapp/subaccounts/{subAccountId}/channels/{channelId}/callPermissions?destination=+6500000000
```

| Field | Description |
|-------|-------------|
| `status` | `temporary`, `permanent`, or `not_granted` |
| `actions[]` | For `send_call_permission_request` and `start_call`: `canPerformAction` plus `limits` (`timePeriod`, `maxAllowed`, `currentUsage`) |
| `expirationTime` | When the permission expires |

Two uses:

- **Before placing a call.** `not_granted` covers declined, expired, and revoked alike — it is the single gate. If not granted, do not call. Because no webhook fires when a temporary permission lapses, this check is not optional.
- **Before sending a permission request.** Error `138017` is returned when a permanent permission already exists, so checking first avoids generating errors against your best-converted users.

See [Get call permission status](/connect/reference/get-call-permission-status) for the full API reference.

### Step 5: Place the call

Your system triggers the outbound call through your SIP endpoint. 8x8 delivers the call over SIP, exactly as for UIC.

---

## Webhooks

Two separate configurations. Do not conflate them.

| Webhook | Type | Carries |
|---------|------|---------|
| Inbound message | MO | `inbound_message_received`, including `callPermissionReply` |
| Business Management Updates | CABM | `template_status_update`, quality and account events |

See [WhatsApp webhooks](/connect/docs/whatsapp/whatsapp-webhooks) for setup.

---

## Best practices

### Only call when the customer expects it

- Request permission immediately before calling (within minutes).
- State the specific purpose in the request.
- Call within the promised time frame.
- Don't request permission for undefined "future calls".
- Don't reuse a permission for a different purpose than stated.

### Respect opt-out immediately

When the customer revokes or declines, stop calling and cancel any pending calls.

### Provide value in every call

Voice should add something a message cannot — actionable resolution, immediate assistance, or a real conversation.

### Track and optimize

Metrics worth monitoring — surface them from your delivery path's native reporting (Converse reporting module, Genesys reporting, or VCC reporting). VSS (configured on demand via your account manager) gives you the per-session end-of-call record on the 8x8 side.

| Metric | Target | Insight |
|--------|--------|---------|
| Permission grant rate | > 60% | How well your request template resonates |
| Call answer rate | > 75% | Customer intent after granting permission |
| Call completion rate | > 90% | Technical quality and engagement |
| Customer satisfaction | > 4.0/5 | Overall experience |
| Opt-out rate | < 5% | Whether you're respecting preferences |

### Maintain compliance

Follow **TCPA** (US), **GDPR** (EU), and local telemarketing law. Keep an audit trail of permissions, calls, and opt-outs.

---

## Troubleshooting

**Error `138017` when sending a permission request**
The user already has a permanent permission. Skip the request and call directly.

**Call fails with `not_granted`**
Permission has been declined, revoked, or expired (temporary). Do not retry until the user grants again.

**Customer doesn't receive the permission-request template**
- Verify the template is approved (check `template_status_update` on CABM).
- Verify the customer's WhatsApp number is correct and active.
- Verify you have an active 24-hour messaging window (for `MARKETING` category).

**High opt-out rate**
- Confirm calls match the stated purpose.
- Reduce frequency.
- Ensure agents provide value in the conversation.

---

## Next steps

- [User-initiated calling](/connect/docs/voice/whatsapp-business-calling/user-initiated)
- [Supported calling scenarios](/connect/docs/voice/whatsapp-business-calling/scenarios)
- [Overview](/connect/docs/voice/whatsapp-business-calling/overview)

## Related 8x8 API references and guides

- [Add WhatsApp template](/connect/reference/add-whatsapp-template)
- [Get call permission status](/connect/reference/get-call-permission-status)
- [WhatsApp webhooks](/connect/docs/whatsapp/whatsapp-webhooks)
- [WhatsApp over 8x8 API](/connect/docs/whatsapp/whatsapp-over-8x8-api)

## Meta reference

- [User call permissions](https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/user-call-permissions)
- [Call settings](https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/call-settings)
- [Troubleshooting and error codes](https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/troubleshooting)

---

## Support Channels

- **Technical support:** [support@cpaas.8x8.com](mailto:support@cpaas.8x8.com)
- **Sales inquiries:** Contact your account manager or visit [cpaas.8x8.com/en/contact-us](https://cpaas.8x8.com/en/contact-us/)
- **Support Portal:** [https://support.cpaas.8x8.com/hc/en-us](https://support.cpaas.8x8.com/hc/en-us)
