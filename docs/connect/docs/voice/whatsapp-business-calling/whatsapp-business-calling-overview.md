---
slug: /connect/docs/voice/whatsapp-business-calling/overview
title: WhatsApp Business Calling Overview
---

## Introduction

WhatsApp Business Calling allows businesses and customers to connect via voice calls directly within the WhatsApp app. This feature provides a seamless, familiar communication channel that customers already use daily, eliminating the need for them to switch apps or use traditional phone networks.

### WhatsApp Business Calling API Overview

Watch this overview by Guilherme Gribeler, Partner Engineer at Meta, who introduces the WhatsApp Business Calling API. He covers requirements, initial setup, and dives deep into the two main use cases: User-Initiated Calling and Business-Initiated Calling.

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

## Key Benefits

WhatsApp Business Calling offers significant advantages for both businesses and customers:

### For Customers

- **Seamless in-app experience** – No need to switch to a phone dialer; calls happen directly in WhatsApp
- **No additional cost** – Calls use data/WiFi, so customers don't incur phone charges
- **Familiar interface** – Uses the WhatsApp app they already know and trust
- **End-to-end encrypted** – Secure communication protected by WhatsApp's encryption
- **Wide availability** – Available in most regions where WhatsApp Cloud API is supported (see geographic limitations below)

### For Businesses

- **Branded caller ID** – Display your verified WhatsApp Business profile when calling
- **Higher answer rates** – Customers more likely to answer calls from verified businesses
- **Reduced telephony costs** – Lower cost compared to traditional PSTN calls
- **Integrated communication** – Combine messaging and voice in a single customer journey
- **Rich context** – Access to conversation history when calls are placed

## 8x8 Implementation

8x8 delivers WhatsApp Business Calling through **SIP integration only**, providing a bridge between WhatsApp's VoIP infrastructure and your existing voice systems.

### How it works

```text
Customer (WhatsApp) ⟷ Meta Cloud API ⟷ 8x8 Platform ⟷ SIP ⟷ Your Contact Center/PBX
```

- **WhatsApp voice leg terminates on 8x8** – The VoIP call from WhatsApp ends at the 8x8 platform
- **8x8 bridges to your SIP infrastructure** – 8x8 initiates a SIP call to your configured endpoint
- **Treat it like any inbound/outbound SIP call** – Use your existing IVR, routing, queuing, and agent systems

This architecture means you can leverage your existing contact center infrastructure, routing rules, and agent workflows without major changes.

## Call Types Supported

WhatsApp Business Calling supports two types of calls:

### ✅ User-initiated (Customer-to-Business)

Customers can call your business directly from your WhatsApp Business profile or an active conversation. This requires no special permission – customers can call during your advertised business hours.

**Use cases:**
- Customer support inquiries
- Sales questions
- Order status checks
- General information requests

[Learn more about user-initiated calling →](/connect/docs/voice/whatsapp-business-calling/user-initiated)

### ✅ Business-initiated (Business-to-Customer)

Your business can initiate calls to customers via WhatsApp, but only after the customer grants explicit permission through a WhatsApp template message.

**Use cases:**
- Appointment reminders with callback option
- Delivery notifications with live agent connection
- Sales follow-ups
- Support callbacks for open tickets

[Learn more about business-initiated calling →](/connect/docs/voice/whatsapp-business-calling/business-initiated)

## High-Level Architecture

The following diagram illustrates the call flow:

```mermaid
graph LR
    A[Customer WhatsApp App] <-->|VoIP Call| B[Meta Cloud API]
    B <-->|Webhook + Media| C[8x8 Platform]
    C <-->|SIP INVITE| D[Your SIP Endpoint]
    D -->|Route| E[IVR / Queue / Agent]
```

**Flow:**
1. Customer initiates or receives a call in WhatsApp
2. Meta's Cloud API handles the WhatsApp VoIP leg
3. 8x8 receives webhooks and media from Meta
4. 8x8 initiates SIP call to your configured endpoint
5. Your system routes the call (IVR, queue, agent)
6. When answered, media is bridged end-to-end
7. Call ends when either party hangs up

## Prerequisites

Before implementing WhatsApp Business Calling with 8x8, ensure you have:

### WhatsApp Requirements

- **WhatsApp Business Platform account** (Cloud API or via BSP)
- **Verified WhatsApp Business phone number** enabled for calling
- **WhatsApp Business profile** with complete information and verification

### 8x8 Requirements

- **8x8 Connect / CPaaS account** with WhatsApp calling feature enabled
- **API credentials** for authentication
- **Webhook endpoint** to receive call events (optional, for advanced scenarios)

### Infrastructure Requirements

- **SIP endpoint** – One of the following:
  - Contact center platform (e.g., Five9, Genesys, NICE inContact)
  - PBX / SBC (e.g., Cisco, Avaya, AudioCodes)
  - Cloud communications platform with SIP support
- **SIP trunk configuration** – Ability to receive SIP calls from 8x8
- **Network access** – Firewall rules to allow 8x8 SIP IPs

### Technical Knowledge

- Familiarity with **WhatsApp Business Cloud API** concepts
- Understanding of **SIP protocol** and call routing
- Basic webhook handling (for receiving call events)

## Geographic Availability

WhatsApp Business Calling availability varies by call type and region. Please review these restrictions before implementation:

### Business-Initiated Calls (BIC)

**NOT available** in the following countries:
- 🇺🇸 United States
- 🇨🇦 Canada
- 🇹🇷 Turkey
- 🇪🇬 Egypt
- 🇻🇳 Vietnam
- 🇳🇬 Nigeria

### User-Initiated Calls (UIC)

Available in most regions where the WhatsApp Cloud API is supported.

### Sanctioned Countries

All WhatsApp Business Calling features are unavailable in:
- 🇨🇺 Cuba
- 🇮🇷 Iran
- 🇰🇵 North Korea
- 🇸🇾 Syria
- 🇺🇦 Ukraine (Crimea, Donetsk, Luhansk regions)

### Business Phone Number Requirements

- Your business phone number must have a country code from a supported country
- Customer phone numbers can be from any country where Cloud API is available
- Internet connectivity (WiFi or mobile data) required for all calls

:::info Note
Geographic restrictions are determined by Meta's WhatsApp Business Platform policies and may change over time. Always verify current availability in [Meta's official documentation](https://developers.facebook.com/docs/whatsapp/cloud-api/calls).
:::

## Getting Started

To implement WhatsApp Business Calling:

1. **Review call types** – Understand [user-initiated](/connect/docs/voice/whatsapp-business-calling/user-initiated) and [business-initiated](/connect/docs/voice/whatsapp-business-calling/business-initiated) calling
2. **Choose your scenario** – Determine how you'll route calls ([supported scenarios](/connect/docs/voice/whatsapp-business-calling/scenarios))
3. **Configure WhatsApp** – Set up calling on Meta's WhatsApp Business Platform
4. **Configure 8x8** – Link your WhatsApp number and configure SIP delivery
5. **Configure your SIP endpoint** – Set up inbound routing for WhatsApp calls
6. **Test end-to-end** – Verify calls flow from WhatsApp to your agents

## Important Considerations

### Compliance and Privacy

- Follow **WhatsApp Business Terms** and **Platform Policies**
- Obtain proper consent for business-initiated calls
- Respect customer opt-out requests immediately
- Handle customer data according to GDPR, CCPA, and local regulations

### Quality and Performance

- Ensure adequate **network bandwidth** for VoIP quality
- Monitor **call success rates** and **audio quality**
- Test from various network conditions (WiFi, 4G, 5G)
- Have fallback options for failed calls

### Operational Best Practices

- Staff agents during advertised calling hours
- Set clear expectations in your WhatsApp Business profile
- Provide voicemail or IVR options when agents unavailable
- Track metrics: answer rate, AHT, customer satisfaction

## Next Steps

Explore the detailed guides for each call type:

- **[User-initiated calling](/connect/docs/voice/whatsapp-business-calling/user-initiated)** – Learn how customers can call your business
- **[Business-initiated calling](/connect/docs/voice/whatsapp-business-calling/business-initiated)** – Learn how to call customers with permission
- **[Supported calling scenarios](/connect/docs/voice/whatsapp-business-calling/scenarios)** – Explore different routing and integration options

## Additional Resources

- **Meta Documentation:**
  - [WhatsApp Cloud API – User-initiated calls](https://developers.facebook.com/docs/whatsapp/cloud-api/calls/user-initiated-calls)
  - [WhatsApp Cloud API – Call settings](https://developers.facebook.com/docs/whatsapp/cloud-api/calls/call-settings)
  - [WhatsApp Cloud API – Business-initiated calls](https://developers.facebook.com/docs/whatsapp/cloud-api/calls/business-initiated-calls)
- **8x8 Documentation:**
  - [Voice API Introduction](/connect/docs/voice/api-introduction)
  - [IVR Introduction](/connect/docs/voice/ivr/ivr-introduction)
  - [WhatsApp Business Hub](/connect/docs/whatsapp/whatsapp-hub)

## Support Channels

- **Technical support:** [support@cpaas.8x8.com](mailto:support@cpaas.8x8.com)
- **Sales inquiries:** Contact your account manager or visit [cpaas.8x8.com/en/contact-us](https://cpaas.8x8.com/en/contact-us/)
- **Support Portal:** [https://support.cpaas.8x8.com/hc/en-us](https://support.cpaas.8x8.com/hc/en-us)
