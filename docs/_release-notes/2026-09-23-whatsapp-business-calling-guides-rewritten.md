---
date: 2026-09-23
products: ["Connect"]
channel: "WhatsApp"
changeType: Changed
title: "WhatsApp Business Calling guides rewritten"
---

The four WhatsApp Business Calling guides (overview, user-initiated, business-initiated, and scenarios) have been rewritten to match how calling is delivered on 8x8.

## What changed

- **Topology:** calls are SIP end to end. Meta connects to 8x8 over SIP, and 8x8 connects to your SBC, PBX, or contact center over SIP. There's no REST API for placing a call. REST APIs on `chatapps.8x8.com` are used only for permissions and templates, and only on the Direct SIP path for business-initiated calls.
- **Four integration paths**, all set up with your 8x8 account manager:

  | Path | Calling today |
  | --- | --- |
  | Direct SIP | User-initiated and business-initiated |
  | 8x8 Converse | User-initiated and business-initiated (Converse handles templates and permissions) |
  | Genesys | User-initiated only |
  | VCC via AI Studio | User-initiated only |

- **Business-initiated calling** is now a 5-step Direct SIP walkthrough: create the `CALL_PERMISSION_REQUEST` template, send it, receive `callPermissionReply` on the inbound-message webhook, check `callPermissions` before every call, then place the call from your SIP endpoint.
- **Permission model:** the user chooses a temporary permission (7 days) or a permanent one (no expiry). Rate limits, auto-revocation after 4 consecutive unanswered calls, and error `138017` are documented. No webhook is sent when a temporary permission expires.
- **User-initiated calling** adds the `VOICE_CALL` template button, `wa.me/call/` deep links, and `cta_payload` attribution.
- **Prerequisites:** WhatsApp Messaging must be active first, plus Meta business verification, a messaging tier of at least 2,000 unique recipients per day, and a credit line on the WABA for business-initiated calls.
- **New sections** on pricing (6-second pulses for business-initiated calls; user-initiated calls are free), operational limits (1,000 concurrent calls per number; OPUS, PCMA, and PCMU codecs), and reporting (Converse reporting, Voice Session Summary, call recording).

## Read more

- [WhatsApp Business Calling overview](/connect/docs/voice/whatsapp-business-calling/overview)
- [Business-initiated calling](/connect/docs/voice/whatsapp-business-calling/business-initiated)
- [User-initiated calling](/connect/docs/voice/whatsapp-business-calling/user-initiated)
- [Supported calling scenarios](/connect/docs/voice/whatsapp-business-calling/scenarios)
