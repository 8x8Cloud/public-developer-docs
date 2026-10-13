---
sidebar_label: 'Concepts & Fundamentals'
---

# Concepts & Fundamentals

Before you send your first message, it's essential to understand the core concepts and rules of the WhatsApp Business Platform. These rules govern how you can interact with customers, what you can send, how you are billed, and how your account's reputation is managed.

## Meta & 8x8 Platform Hierarchy

These are the fundamental components provided by Meta that represent your business on WhatsApp, organized hierarchically and typically managed through the 8x8 Connect portal:

1. **Meta Business Portfolio:** (Formerly Meta Business Manager) Meta's top-level container for managing business assets, crucial for initial onboarding and Business Verification.

2. **WhatsApp Business Account (WABA):** Your specific business profile container within the Meta Portfolio, holding your phone numbers, templates, and quality rating.

3. **Business Phone Number:** A verified phone number linked to your WABA, used via 8x8 to send/receive messages. This acts as your "Sender ID" on WhatsApp.

4. **Message Templates:** Pre-approved message formats required for initiating conversations or replying outside the 24-hour window, managed via the 8x8 Connect portal.

## Business-Initiated Conversations (Outbound)

A business-initiated conversation occurs when you send the first message to a customer, or if you message a customer *after* the 24-hour Customer Service Window (see [User-Initiated Conversations](#user-initiated-conversations-inbound)) has closed.

### 1. Template Messages

To initiate a conversation, you **must** use a **Template Message**.

- **What they are:** Pre-approved, structured message formats.

- **When to use them:**

    1. To **initiate** a new conversation with a customer.

    2. To reply to a customer **outside** the 24-hour customer service window.

- **Content:** Can include text, media (image, video, document, location), and interactive buttons (Quick Reply, Call to Action, Copy Code).

- **Impact:** Each template message is charged per delivered message, at the rate for its category and the recipient's market. If the customer replies, they open a 24-hour Customer Service Window.

### 2. Template Categories

Every Template Message you create must be assigned one of three categories. This category defines the template's purpose and is used by Meta to determine billing.

|Category|Description|Common Use Cases|
|---|---|---|
|**Authentication**|Enables you to send one-time passcodes (OTPs) to authenticate users.|User login, account verification, password reset, integrity checks.|
|**Marketing**|Used for promotions, offers, or announcements to drive customer engagement and sales.|New product alerts, sale notifications, re-engagement campaigns.|
|**Utility**|Facilitates a specific, agreed-upon request, transaction, or update for an existing customer.|Order confirmations, delivery status, appointment reminders, account statements.|

## User-Initiated Conversations (Inbound)

A user-initiated conversation occurs when a customer sends your business a message first, or when they reply to one of your Template Messages. This action triggers specific time windows that determine your messaging capabilities and costs.

To receive inbound messages from customers, you need to configure webhooks. See [Webhooks Reference](./whatsapp-webhooks.md) for setup and payload details.

**How Meta charges for messages in these windows:** Under the per-message pricing model, Meta charges for each message delivered. As of October 1, 2026, this includes non-template (freeform) replies and Utility templates sent inside an open Customer Service Window, which were previously free. Understanding which window is open tells you which messages are charged and which are free.

### 1. The 24-Hour Customer Service Window (CSW)

The Customer Service Window is the standard period for two-way support interactions.

- **What it is:** A 24-hour window during which you can reply to customers using non-template (freeform) messages or specific template types.
- **How it starts:** The window opens automatically when a customer sends you a message.
- **How it resets:** The 24-hour timer resets **every time** the customer sends a new message.
- **What happens when it closes:** After 24 hours from the customer's last message, the window closes. You can no longer send freeform messages and must use a paid Template Message to re-initiate contact.

#### Pricing & Capabilities within the CSW

While this window is open, the following rules apply:

| Message Type | Delivery Status | Cost |
| :--- | :--- | :--- |
| **Non-Template** (Text, Image, Audio) | Allowed | **Paid** (Service message rate, after the monthly free tier) |
| **Utility Templates** | Allowed | **Paid** (Standard Utility rate) |
| **Marketing / Auth Templates** | Allowed | **Paid** (Standard Rates) |

#### Service Message Charging (Effective October 1, 2026)

A **service message** is any non-template message you send in an open Customer Service Window, whether a person or a third-party AI agent writes it. Meta did not charge for these messages from November 1, 2024. From October 1, 2026, Meta charges for them as follows:

- **Charged per delivered message:** Each service message is one chargeable message, the same way a template message is.
- **Rate:** For each market, the service message rate is the same as that market's Utility and Authentication rate.
- **No volume tiers:** Service messages do not qualify for volume tiers, so every chargeable service message is charged at the flat market rate. Utility and Authentication messages keep their volume tiers.
- **Monthly free tier:** Each business phone number gets 1,000 free service messages per month, and 8x8 passes this free tier on to you. Unused messages do not roll over, and the count resets monthly. Charging starts from the 1,001st service message in the month.
- **One charge per message:** A message has only one category. A non-template message that contains promotional content is still a service message, and Meta does not add a Marketing charge.

#### Utility Templates inside the CSW (Effective October 1, 2026)

Utility templates sent inside an open Customer Service Window were free from July 1, 2025. From October 1, 2026, Meta charges for each one at the Utility rate for the recipient's market. Utility templates sent to open a conversation, outside the window, were already charged.

#### How Charging Is Reported

Service messages are reported under the `service` pricing category. In 8x8 delivery receipts, the `pricingCategory` field returns the same value as Meta's pricing category, so service messages report `service` and Utility templates report `utility`. The category is the same whether or not a message was charged, so delivery receipts do not tell you if an individual message was free. To see how many messages in each category were free or charged in a closed billing period, use the [Message Usage API](/connect/reference/get-message-usage), which returns `free` and `charged` counts by pricing category. See [Delivery Receipts for Outbound ChatApps](/connect/docs/delivery-receipts-for-outbound-chatapps).

**Rates:** Meta publishes its rate cards by market and currency on the [WhatsApp Business Platform pricing page](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing#rate-cards-and-volume-tiers). The rates you pay are set by your 8x8 pricing plan, so contact your 8x8 account manager for your rates.

> **Key Takeaway:** Inside an open Customer Service Window, freeform replies and Utility templates are no longer free, so replies from agents and automated flows add to your messaging cost. The exception is the Free Entry Point window described below.

### 2. The Free Entry Point (FEP) Window

The Free Entry Point window is a special promotional period triggered by a specific Meta advertising interaction. It offers the widest range of free messaging, and it is not affected by the October 1, 2026 change to service messages and Utility templates.

- **How it starts:** This window opens **only** when a user messages your business through a Meta **Click-to-WhatsApp Ad**, using the WhatsApp Android or iOS app. Meta does not support the desktop and web apps for this window.
- **Activation Requirement (Critical):** The FEP window does **not** open immediately upon the user's message. To activate the free window, **you must reply to the user's message within the Customer Service Window (24 hours).**
  - *If you reply within 24 hours:* The reply is free, and the FEP window opens from the time you replied.
  - *If you do NOT reply within 24 hours:* The opportunity is lost. Any subsequent message you send must be a paid Template Message, and it will not trigger the free window.

- **Duration:** Once activated, it can remain open for up to **7 days**.
- **Reset Rules:** Unlike the CSW, this timer **does not reset** if the customer replies.

#### Pricing & Capabilities within the FEP

While the FEP window is open, standard pricing is overridden:

- **All Messages are Free:** This includes service messages (non-template) and **all categories** of Template Messages (including Marketing, Authentication and Utility). Utility and Authentication messages sent in an open FEP window do not count toward volume tiers, because only charged messages count.
- **Interaction with the CSW:**
  - The FEP and the 24-hour CSW run in parallel.
  - If the standard 24-hour CSW closes (e.g., the customer hasn't replied in 24 hours) but the FEP window is still open, you can **still send Template Messages for free**.

### Summary of Windows

| Feature | Customer Service Window (24h) | Free Entry Point Window (up to 7 days) |
| :--- | :--- | :--- |
| **Trigger** | Any incoming user message/reply | Click-to-WhatsApp Ad |
| **Duration** | 24 hours (Resets on new message) | Up to 7 days (Does not reset) |
| **Freeform Messages** | **Allowed & Paid** (Service message rate, no volume tiers, after the monthly free tier) | **Free** (Must be within active CSW) |
| **Utility Templates** | **Paid** (Utility rate) | **Free** |
| **Marketing/Auth Templates** | Paid | **Free** |

### 3. Interactive (Freeform) Messages

These are the messages you can send *inside* an open 24-hour Customer Service Window. They do **not** require pre-approval.

|Message Type|Description|
|---|---|
|**Text**|A simple text message.|
|**Media**|An Image, Video, Audio, or Document, which can include an optional text caption.|
|**Location**|A map pin of a specific geographic location.|
|**Interactive Buttons**|A message with a body, optional header/footer, and up to **3 Quick Reply** buttons.|
|**Interactive List**|A message that opens a pop-up menu of up to **10 items**, ideal for selection menus.|
|**Interactive CTA URL Button**|A message with text that features a single, prominent button that opens a website URL.|

## Quality Rating & Messaging Limits

Meta monitors your account's sending activity to protect users from spam. This is managed through quality ratings and messaging limits.

### 1. Quality Rating

- **What it is:** A rating (`High`, `Medium`, `Low`) for your business phone number based on customer feedback, such as how many times your messages are blocked or reported as spam.

- **Where to find it:** You can find your rating in the Meta WhatsApp Manager.

- **Impact:** If your quality rating drops to **Low**, your templates may be automatically **Paused** (temporarily disabled) to protect your rating from dropping further.

### 2. Messaging Limits (Portfolio-Based)

- **What it is:** The maximum number of **unique users** you can initiate conversations with in a rolling 24-hour period. This is now set at the **Business Portfolio level** and shared across all phone numbers in that portfolio.

- **Note:** This limit **does not** apply to replies within an active 24-hour customer service window. You can have unlimited customer service conversations.

**Messaging Tiers:**

- **Tier 1 (250):** All new portfolios start here, able to message 250 unique users per 24 hours.

- **Tier 2 (2,000):** You can upgrade to this tier by:

    1. Verifying your business (see [Business Verification & Raising Limits](./getting-started.md#business-verification--raising-limits)).

    2. OR Sending 2,000 high-quality template messages to unique users within a 30-day window.

- **Automatic Scaling (Tier 3+):** After reaching 2,000, your portfolio can be automatically upgraded to 10k, 100k, and finally Unlimited users. Upgrades happen if:

    1. You are sending high-quality messages.

    2. You have used at least 50% of your current limit in the last 7 days.

- **Webhook Notification:** You will receive a `phone_number_quality_update` [webhook](./whatsapp-webhooks.md#phone-number-quality--messaging-limit-updates) when your portfolio's limit is upgraded (e.g., `event: "UPGRADE", currentLimit: "TIER_10K"`).
