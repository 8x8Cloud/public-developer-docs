---
slug: /connect/docs/voice/whatsapp-business-calling/scenarios
title: Supported calling scenarios
---

This guide describes the common **WhatsApp Business Calling** scenarios you can implement with **8x8 CPaaS**, using **SIP delivery** into your contact center / PBX / SBC.

> **Important (VoIP-only):** WhatsApp Business Calling is a VoIP service. Do **not** route calls to the public telephone network (PSTN). Keep the full path VoIP/SIP end-to-end.

---

## High-level architecture (8x8)

WhatsApp voice calls are carried over Meta's calling infrastructure and delivered to your environment through **8x8 over SIP**.

**High-level flow**

- Customer WhatsApp app ↔ Meta calling ↔ **8x8** ↔ **SIP** ↔ Your PBX / contact center / SBC

8x8 acts as the bridge between WhatsApp calling and your SIP endpoint, so you can use your existing:

- IVR / queues / routing
- agents and softphones
- reporting / QA processes (where supported)

---

## Availability and limitations

### User-initiated calling (Customer → Business)

User-initiated calling is broadly available where WhatsApp Business Messaging is available, with exceptions for certain sanctioned countries/regions.

### Business-initiated calling (Business → Customer)

Business-initiated calling availability can vary by provider and Meta enablement rules. Some providers document exclusions for specific business number country codes (for example: USA, Canada, Egypt, Nigeria, Türkiye, Vietnam).

> Always confirm availability for your **business number country code** and your deployment with your 8x8 account team.

---

## Entry points (how users start calls)

Depending on your WhatsApp setup, users can typically call your business via one or more entry points:

1. **Call icon in the WhatsApp chat UI**
   Users tap the call icon to start a call from an existing chat.

2. **Interactive message with a call button**
   You send a message that includes a "Call" button to invite the customer to call.

3. **Message template with a call button**
   Useful when you need to invite calling outside the standard messaging window (subject to Meta rules).

> 8x8 focuses on **voice delivery over SIP**. Your WhatsApp messaging provider / Meta setup determines which call entry points you can present to end users.

---

## Scenario 1 — Customer support inbound calling (User-initiated)

**What it is**
Customers place a call from WhatsApp to reach your support team.

**Best for**

- Customer support hotlines
- Pre-sales enquiries
- Post-purchase assistance

**Typical routing**

- WhatsApp call → 8x8 → SIP → IVR (optional) → queue → agent

**Notes**

- Use your existing opening greeting, language selection, and queues.
- Keep routing logic inside your contact center/PBX where possible.

---

## Scenario 2 — Callback to customer (Business-initiated)

**What it is**
Your business calls the customer via WhatsApp to continue an ongoing case (e.g., "we'll call you back").

**Best for**

- Support callbacks after troubleshooting in chat
- Appointment confirmations that require voice
- Delivery exception handling

**How it typically works**

1. Customer engages you on WhatsApp chat.
2. You request calling permission (per Meta policy).
3. You place the WhatsApp call and deliver it to your SIP endpoint (agent/queue).

**Notes**

- Permission/consent requirements are enforced by Meta.
- Don't state a fixed permission window duration in docs unless you are sure it matches your current Meta enablement.

---

## Scenario 3 — Chat-to-call escalation (agent-assisted)

**What it is**
When a chat becomes complex, the agent offers a call (customer taps "Call" or you initiate after permission).

**Best for**

- Identity verification and complex support flows
- High-value sales conversations
- Sensitive cases where voice is faster than chat

**Typical routing**

- Agent triggers call escalation → WhatsApp call → 8x8 → SIP → target queue/agent

**Operational tips**

- Keep the call reason clear ("We'd like to call to help resolve X").
- Ensure agent availability before prompting calling.

---

## Scenario 4 — IVR front door (SIP IVR / menu)

**What it is**
WhatsApp calls land into an IVR first (in your contact center/PBX), then route based on DTMF and business hours.

**Best for**

- Multi-department routing
- After-hours handling
- High inbound volumes

**Typical routing**

- WhatsApp → 8x8 → SIP → IVR → queue/agent

**Notes**

- This is *SIP-side IVR*. (It's not the same as 8x8 Callflow-based IVR.)

---

## Scenario 5 — Multi-site / geo-based routing

**What it is**
Route calls to different SIP destinations based on:

- business hours
- language
- region/team

**Best for**

- Regional support teams
- Follow-the-sun operations

**Typical routing**

- WhatsApp → 8x8 → SIP → (SBC/PBX rules) → site A / site B

---

## Scenario 6 — Recording and quality monitoring (where supported)

**What it is**
Record and monitor WhatsApp calls like other voice interactions.

**Best for**

- QA coaching
- compliance and dispute handling
- customer experience analytics

**Notes**

- Recording capabilities depend on your SIP/contact center configuration and feature enablement.
- Confirm recording requirements (consent notices, storage, retention) with your legal/compliance policy.

---

## Pricing

Pricing for WhatsApp Business Calling is not publicly published at this time.

For commercial terms and enablement, contact Sales — see [Support Channels](#support-channels).

---

## Next steps

- **[WhatsApp Business Calling Overview](/connect/docs/voice/whatsapp-business-calling-overview)**
- **[User-initiated calling](/connect/docs/voice/whatsapp-business-calling/user-initiated)**
- **[Business-initiated calling](/connect/docs/voice/whatsapp-business-calling/business-initiated)**

---

## Support Channels

- **Technical support:** [support@cpaas.8x8.com](mailto:support@cpaas.8x8.com)
- **Sales inquiries:** Contact your account manager or visit [cpaas.8x8.com/en/contact-us](https://cpaas.8x8.com/en/contact-us/)
- **Support Portal:** [https://support.cpaas.8x8.com/hc/en-us](https://support.cpaas.8x8.com/hc/en-us)
