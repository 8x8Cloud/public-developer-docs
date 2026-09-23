---
slug: /connect/docs/voice/whatsapp-business-calling/overview
title: WhatsApp Business Calling Overview
---

## Introduction

WhatsApp Business Calling lets businesses and customers connect via voice calls directly inside the WhatsApp app, using the messaging channel your customers already know.

**Additional Resource:** [WhatsApp Business Calling API Developer Documentation](https://bit.ly/4lAV02c)

<div style={{margin: '30px 0'}}>
  <iframe
    width="100%"
    height="480"
    src="https://www.youtube.com/embed/SRDjj3KAMIE?si=qHC941wTo0EBCwTB&amp;start=26"
    title="WhatsApp Business Calling API Overview by Meta"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerPolicy="strict-origin-when-cross-origin"
    allowFullScreen
    style={{minHeight: '480px'}}>
  </iframe>
</div>

## Topology

8x8 interconnects with Meta over SIP and bridges the call to the customer's SIP endpoint over SIP. There is no Meta Cloud API in the calling path, and there is no 8x8 API for placing a call.

```text
WhatsApp user  →  Meta  —SIP→  8x8 CPaaS  —SIP→  Customer SBC / PBX / Contact Center
```

### When is SIP used, and when are REST APIs used?

Two different planes — do not conflate them.

| Plane | Protocol | When it applies |
|-------|----------|-----------------|
| **Voice / media** | **SIP end-to-end** | Every call, every path (Direct SIP, Converse, Genesys, VCC). Meta ↔ 8x8 and 8x8 ↔ customer are both SIP. |
| **Permission & template lifecycle** | **REST APIs** on `chatapps.8x8.com` (+ MO and CABM webhooks) | **Only Direct SIP + BIC.** Converse handles this natively; Genesys/VCC don't offer BIC today. UIC needs neither. |

There is **no** REST API to place a call. Calls are always triggered from the customer's SIP endpoint (or handled by Converse). See [business-initiated calling](/connect/docs/voice/whatsapp-business-calling/business-initiated) for the Direct SIP + BIC API walkthrough.

## Choose your integration path

WhatsApp Calling on 8x8 is delivered through one of four paths. All paths are configured with your 8x8 account manager during onboarding — none are fully self-service.

| Path | Calling today | Permissions & templates |
|------|---------------|-------------------------|
| **Direct SIP** | UIC and BIC | Customer builds against the 8x8 ChatApps API (see [business-initiated calling](/connect/docs/voice/whatsapp-business-calling/business-initiated)) |
| **8x8 Converse** | UIC and BIC | Template send and permission-webhook handling are baked into the Converse integration — the customer does not build against the ChatApps API |
| **Genesys** | UIC only (BIC to be worked in) | Not applicable while UIC only |
| **VCC via AI Studio** | UIC only | Not applicable |

Identify your path before reading the business-initiated page — a Converse customer does not need the permission-database and API build described there; Converse already handles it.

## Prerequisites

**8x8 packaging:**

- **WhatsApp Messaging must be active first.** 8x8 bundles WA Calling with WA Messaging — Calling cannot be enabled standalone.
- 8x8 Connect account with the WA Calling entitlement.

**Meta requirements:**

- WhatsApp Business phone number in use with **Cloud API** (not the WhatsApp Business app).
- **Meta Business Portfolio** set up with the WABA and phone number, and **business verification completed**.
- **Minimum daily messaging tier of 2,000 unique recipients** on the WhatsApp number. This is Meta's calling gate — reaching this tier requires business verification and healthy messaging quality signals, so verification is a *de facto* prerequisite even though Meta's calling FAQ notes it isn't a formal calling-only requirement.
- **Credit line attached to the WABA** — required for BIC billing (see [Pricing](#pricing)).

8x8 is listed on Meta's [WhatsApp Business partner showcase](https://business.facebook.com/messaging/partner-showcase/?search=8x8) as a WhatsApp Calling-capable partner. See also [Meta's calling FAQ](https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/faq) for platform-level rules.

## Enabling WhatsApp Calling

WA Calling is enabled through **8x8 Connect**. Once requested, 8x8 kicks off an internal onboarding process. When onboarding completes, Connect shows WA Calling as enabled on the channel.

## Call types

### User-initiated (UIC) — Customer-to-Business

Customers call your business from a chat, from the business profile, from a `VOICE_CALL` button in a template, or from a `wa.me/call/` deep link. UIC calls are **free**. See [user-initiated calling](/connect/docs/voice/whatsapp-business-calling/user-initiated).

### Business-initiated (BIC) — Business-to-Customer

Your business calls the customer via WhatsApp after they grant calling permission. BIC availability, template flow, and permission handling depend on your integration path. See [business-initiated calling](/connect/docs/voice/whatsapp-business-calling/business-initiated).

## Reporting and post-call

- **8x8 Converse:** reporting is available in the Converse reporting module.
- **Voice Session Summary (VSS)** can be configured on demand — discuss with your account manager before enabling.
- **Call recording** and the **Voice Recording Uploaded (VRU) webhook** are available for configuration through your account manager.

## Geographic availability

### Business-Initiated Calls (BIC)

**NOT available** in:
- 🇺🇸 United States, 🇨🇦 Canada, 🇹🇷 Turkey, 🇪🇬 Egypt, 🇻🇳 Vietnam, 🇳🇬 Nigeria

### User-Initiated Calls (UIC)

Available in most regions where the WhatsApp Cloud API is supported.

### Sanctioned countries (all features blocked)

🇨🇺 Cuba, 🇮🇷 Iran, 🇰🇵 North Korea, 🇸🇾 Syria, 🇺🇦 Ukraine (Crimea, Donetsk, Luhansk regions)

:::info Note
Geographic restrictions follow Meta's WhatsApp Business Platform policies and may change. Verify with your account manager and Meta's documentation.
:::

## Pricing

| Item | Detail |
|------|--------|
| User-initiated calls | **Free** |
| Business-initiated calls | Charged on duration in **6-second pulses**, by destination country code, tiered by monthly volume |
| Fractional pulses | Rounded up (a 56-second call = 10 pulses) |
| Calls crossing a volume tier | Priced entirely at the higher-volume rate |
| Call permission request messages | Billed as messages under standard per-message pricing |
| Prerequisite | Valid payment method and a credit line attached to the WABA |

Calling also affects the 24-hour customer service window: it starts or refreshes when a user calls the business (whether or not the business accepts) and when a user accepts a business-initiated call.

Call analytics (including cost and average duration) come from the WABA API with `?fields=call_analytics`. See [Meta pricing docs](https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/pricing).

## Operational limits

| Item | Value |
|------|-------|
| Concurrent calls per business number | 1000 |
| Call duration limit | None |
| Codecs | OPUS, PCMA, PCMU |
| Bandwidth per call | ~60 kbps (OPUS), ~84 kbps (G.711) |
| Client support (BIC & permission requests) | WhatsApp 2.24.14.x and later (Android, iOS) |
| Client support (voice call button) | Android 2.24.1 and later |
| Call configuration propagation | Up to 7 days to reflect on clients |
| WhatsApp Web / Desktop | Business calls not supported for end users |

Hitting the 100 connected calls / 24 hours limit does **not** revoke permission — it is a rate limit; the permission endpoint indicates when the next call is allowed. A connected call resets the permission-request rate limits. BIC calls bypass the user's Silence Unknown Callers setting.

## Getting started

1. Confirm prerequisites (WA Messaging active, Meta business portfolio, payment method for BIC).
2. Contact your 8x8 account manager to request WA Calling enablement and choose an integration path.
3. Complete onboarding.
4. For Direct SIP + BIC, build against the ChatApps API — see [business-initiated calling](/connect/docs/voice/whatsapp-business-calling/business-initiated).

## Next steps

- [User-initiated calling](/connect/docs/voice/whatsapp-business-calling/user-initiated)
- [Business-initiated calling](/connect/docs/voice/whatsapp-business-calling/business-initiated)
- [Supported calling scenarios](/connect/docs/voice/whatsapp-business-calling/scenarios)

## Related 8x8 API references and guides

- [Add WhatsApp template](/connect/reference/add-whatsapp-template)
- [Get call permission status](/connect/reference/get-call-permission-status)
- [WhatsApp webhooks](/connect/docs/whatsapp/whatsapp-webhooks)
- [WhatsApp over 8x8 API](/connect/docs/whatsapp/whatsapp-over-8x8-api)

## Meta reference

- [Pricing](https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/pricing)
- [FAQ](https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/faq)
- [User call permissions](https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/user-call-permissions)
- [Call button messages and deep links](https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/call-button-messages-deep-links)
- [Call settings](https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/call-settings)
- [Troubleshooting and error codes](https://developers.facebook.com/documentation/business-messaging/whatsapp/calling/troubleshooting)

## Support Channels

- **Technical support:** [support@cpaas.8x8.com](mailto:support@cpaas.8x8.com)
- **Sales inquiries:** Contact your account manager or visit [cpaas.8x8.com/en/contact-us](https://cpaas.8x8.com/en/contact-us/)
- **Support Portal:** [https://support.cpaas.8x8.com/hc/en-us](https://support.cpaas.8x8.com/hc/en-us)
