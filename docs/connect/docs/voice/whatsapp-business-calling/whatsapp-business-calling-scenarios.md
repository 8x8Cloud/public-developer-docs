---
slug: /connect/docs/voice/whatsapp-business-calling/scenarios
title: Supported calling scenarios
---

This guide describes the WhatsApp Business Calling **integration paths** and common **usage patterns** on 8x8.

> **VoIP-only:** WhatsApp Business Calling is a VoIP service. Do not route calls to the PSTN. Keep the full path VoIP end-to-end.

---

## Topology

```text
WhatsApp user  →  Meta  —SIP→  8x8 CPaaS  —SIP→  Your delivery path
```

Meta ↔ 8x8 and 8x8 ↔ customer are both SIP. 8x8 acts as the WhatsApp Calling BSP.

---

## Integration paths

Four paths. All are configured with your 8x8 account manager during onboarding.

| Path | Calling today | Permissions & templates |
|------|---------------|-------------------------|
| **Direct SIP** | UIC and BIC | Customer builds against 8x8 ChatApps API |
| **8x8 Converse** | UIC and BIC | Template send and permission-webhook handling baked into Converse — no customer build |
| **Genesys** | UIC only (BIC planned) | — |
| **VCC via AI Studio** | UIC only | — |

SIP interconnect details are provided during onboarding rather than published. Speak to your account manager to identify the right path.

---

## Entry points (how users start calls)

Depending on your configuration:

1. **Call icon** in the WhatsApp chat header or business profile — enabled once calling is on the number.
2. **`VOICE_CALL` button** on a message template — see [user-initiated calling](/connect/docs/voice/whatsapp-business-calling/user-initiated#voice_call-button-on-a-template).
3. **`wa.me/call/` deep link** — see [user-initiated calling](/connect/docs/voice/whatsapp-business-calling/user-initiated#wame-call-deep-links).

---

## Usage patterns

### Pattern 1 — Customer support inbound (UIC)

Customers call from WhatsApp to reach support.

- **Best for:** support hotlines, pre-sales, post-purchase assistance
- **Flow:** WhatsApp call → 8x8 → integration path → routing → agent

### Pattern 2 — Callback to customer (BIC)

Business calls the customer via WhatsApp after they grant permission.

- **Best for:** support callbacks, appointment confirmations, delivery exceptions
- **Available on:** Direct SIP, 8x8 Converse. Not on Genesys (planned) or VCC today.
- See [business-initiated calling](/connect/docs/voice/whatsapp-business-calling/business-initiated).

### Pattern 3 — Chat-to-call escalation

When a chat becomes complex, offer a call — customer taps a `VOICE_CALL` button, uses a deep link, or you request calling permission and initiate.

- **Best for:** identity verification, high-value sales, sensitive cases

### Pattern 4 — Recording and quality monitoring

Record and monitor WhatsApp calls like other voice interactions.

- Call recording is available for configuration through your account manager.
- The **VRU webhook** notifies when recordings are uploaded — enable via your AM.
- **VSS** (Voice Session Summary) can be configured on demand via your AM.
- Confirm consent-notice, storage, and retention requirements with your legal/compliance policy.

---

## Availability and limitations

- **UIC:** available where WhatsApp Business Messaging is available (with sanctioned-country exceptions).
- **BIC:** availability varies by business-number country code. Excluded: USA, Canada, Egypt, Nigeria, Türkiye, Vietnam.

Confirm availability for your business number country code with your 8x8 account team.

---

## Pricing

UIC calls are free. BIC calls are billed in 6-second pulses, by destination country and monthly volume tier. See [Overview → Pricing](/connect/docs/voice/whatsapp-business-calling/overview#pricing).

---

## Next steps

- [WhatsApp Business Calling Overview](/connect/docs/voice/whatsapp-business-calling/overview)
- [User-initiated calling](/connect/docs/voice/whatsapp-business-calling/user-initiated)
- [Business-initiated calling](/connect/docs/voice/whatsapp-business-calling/business-initiated)

---

## Support Channels

- **Technical support:** [support@cpaas.8x8.com](mailto:support@cpaas.8x8.com)
- **Sales inquiries:** Contact your account manager or visit [cpaas.8x8.com/en/contact-us](https://cpaas.8x8.com/en/contact-us/)
- **Support Portal:** [https://support.cpaas.8x8.com/hc/en-us](https://support.cpaas.8x8.com/hc/en-us)
