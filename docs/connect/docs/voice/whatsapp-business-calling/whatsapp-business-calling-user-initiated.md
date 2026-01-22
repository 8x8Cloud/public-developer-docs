---
slug: /connect/docs/voice/whatsapp-business-calling/user-initiated
title: User-initiated calling
---

## What is User-initiated Calling?

**User-initiated calling** allows customers to call your business directly from WhatsApp by tapping a **call entry point** (for example, the call icon shown in chat or a "Call" button).

The customer always initiates the call, making this a low-friction way to escalate from messaging to voice when immediate assistance is needed.

With **8x8 CPaaS**, WhatsApp calls are delivered into your environment using **SIP**, so you can reuse your existing **contact center, PBX, SBC, IVR, queues, and agent workflows**.

---

## When to Use User-initiated Calling

User-initiated calling is best suited for:

- Customer support and issue escalation
- Sales enquiries and consultations
- Order, delivery, or account issues
- Situations where messaging is insufficient or too slow

Because the customer initiates the call, user-initiated calling is typically the simplest way to enable inbound WhatsApp voice.

---

## Geographic Availability

User-initiated calling (UIC) has broader availability than business-initiated calling:

**Available in:**
- Most regions where the WhatsApp Cloud API is supported
- Significantly more countries than business-initiated calling

**Blocked in sanctioned countries:**
- 🇨🇺 Cuba, 🇮🇷 Iran, 🇰🇵 North Korea, 🇸🇾 Syria
- 🇺🇦 Ukraine (Crimea, Donetsk, Luhansk regions)

**Business phone number requirements:**
- Your business phone number must be registered in a Cloud API-supported country
- Customers can call from any country where WhatsApp Cloud API is available
- Internet connectivity (WiFi or mobile data) required for calls

:::info Advantage over Business-Initiated Calling
User-initiated calling is available in **USA, Canada, Turkey, Egypt, Vietnam, and Nigeria** – countries where business-initiated calling is NOT supported. This makes UIC a valuable alternative for businesses serving customers in these regions.
:::

**To verify current availability:**
- Check Meta's [WhatsApp Cloud API documentation](https://developers.facebook.com/docs/whatsapp/cloud-api/calls) for latest updates
- Consult with your 8x8 account manager for specific regional considerations

---

## How It Works (8x8 SIP Model)

At a high level, the call is delivered to your environment like a standard inbound SIP call.

```text
Customer (WhatsApp)
        ⟷ WhatsApp Calling
        ⟷ 8x8 Voice Platform
        ⟷ SIP
        ⟷ Your Contact Center / PBX / Agents
```

### Step-by-step Call Flow

1. **Customer opens WhatsApp**
   - The customer opens your business chat or profile.
   - They see one or more call entry points (depending on what is enabled for your WhatsApp Business number).

2. **Customer initiates the call**
   - The customer taps the call entry point.
   - WhatsApp starts a VoIP call using the customer's data or Wi-Fi connection.

3. **8x8 receives the inbound WhatsApp call**
   - 8x8 anchors the calling integration as your **WhatsApp Calling BSP**.
   - 8x8 manages the WhatsApp calling connectivity and the handoff into your voice environment.

4. **8x8 delivers the call via SIP**
   - 8x8 delivers the call to your configured **SIP endpoint** (contact center / PBX / SBC).
   - From your perspective, this behaves like a standard inbound SIP call.

5. **Your system routes the call**
   - Apply your existing routing logic:
     - IVR menus
     - Queues
     - Skills-based routing
     - Direct agent or extension routing

6. **Agent answers**

   - Two-way audio is established:

     ```text
     Customer (WhatsApp) ⟷ 8x8 ⟷ Agent (SIP)
     ```

7. **Call ends**
   - Either party hangs up.
   - Call records and reporting are generated in your voice systems.

---

## Call Entry Points (What Customers See)

User-initiated calling can be made available through one or more WhatsApp surfaces, depending on configuration:

- **Call icon** in the WhatsApp chat header or business profile
- **Call button** presented in WhatsApp experiences (for example, interactive messages)

![WhatsApp chat showing call icon and call entry points](../../whatsapp-calling/images/whatsapp-calling-call-icon.png)

### How Call Entry Points Are Enabled (8x8 BSP Model)

As your BSP for WhatsApp Calling, **8x8 manages the Meta-side enablement**, including:

- Enabling calling for your WhatsApp Business number (where eligible)
- Configuring calling entry points (call icon / call buttons)
- Providing the required templates and configurations for call buttons (where applicable)

If you have a specific customer journey in mind (for example, "Call us now" buttons inside a support flow), contact your 8x8 account team to confirm the recommended configuration.

---

## Availability and After-hours Handling

You can manage availability in one (or a combination) of the following ways:

### Option 1: Entry-point control (via 8x8 / WhatsApp configuration)

If you want to limit inbound calling to specific hours or conditions, 8x8 can help configure the appropriate call entry point behaviour.

### Option 2: SIP-side handling (common)

Leave calling enabled and manage business hours in your voice environment:

- Play a closed announcement
- Route to voicemail
- Route to a queue with limited staffing
- Encourage customers to continue in chat

This approach keeps call treatment logic in your existing voice stack.

---

## SIP Behaviour

From your infrastructure's point of view:

- Calls arrive as **standard inbound SIP calls**
- Existing routing, recording, monitoring, and reporting apply
- 8x8 provides SIP interconnect details (IPs/FQDNs, ports, security, and codec guidance) during onboarding

---

## What You Need (and Don't Need)

To enable user-initiated WhatsApp calling with 8x8, you only need a **SIP endpoint** to receive calls.
You do **not** need to build a direct Meta Cloud API calling integration—8x8 provides the BSP integration and calling setup.

---

## Best Practices

- **Align entry points with staffing** — don't expose a call option you can't answer
- **Use clear after-hours messaging** — announcement + chat fallback
- **Treat WhatsApp voice as a distinct channel** — tag calls internally as "WhatsApp Voice"
- **Plan for spikes** — incidents or outages can cause sudden inbound calling volume

---

## Next Steps

- **[Business-initiated calling](/connect/docs/voice/whatsapp-business-calling/business-initiated)** – Learn how to call customers with permission
- **[Supported calling scenarios](/connect/docs/voice/whatsapp-business-calling/scenarios)** – Explore routing and integration options
- **[IVR Introduction](/connect/docs/voice/ivr/ivr-introduction)** – Build interactive menus for WhatsApp calls

---

## Support Channels

- **Technical support:** [support@cpaas.8x8.com](mailto:support@cpaas.8x8.com)
- **Sales inquiries:** Contact your account manager or visit [cpaas.8x8.com/en/contact-us](https://cpaas.8x8.com/en/contact-us/)
- **Support Portal:** [https://support.cpaas.8x8.com/hc/en-us](https://support.cpaas.8x8.com/hc/en-us)
