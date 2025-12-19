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

- **Impact:** Sending a template message opens a new, 24-hour template-based conversation, which is billed according to its category. If the customer replies, they open a 24-hour Customer Service Window.

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

**Regarding July 1, 2025 Pricing Changes:** Under the per-message pricing model, understanding these windows is essential to utilizing free messaging tiers.

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
| **Non-Template** (Text, Image, Audio) | Allowed | **Free** |
| **Utility Templates** | Allowed | **Free** |
| **Marketing / Auth Templates** | Allowed | **Paid** (Standard Rates) |

> **Key Takeaway:** To minimize costs, maximize the use of freeform text and Utility templates while the customer is actively conversing with you.

### 2. The 72-Hour Free Entry Point (FEP) Window

The Free Entry Point window is a special promotional period triggered by specific Meta advertising interactions. It offers the widest range of free messaging.

- **How it starts:** This window opens **only** when a user messages your business through:
  - A Meta **Click-to-WhatsApp Ad**.
  - A Facebook Page **Call-to-Action (CTA)** button.
- **Activation Requirement (Critical):** The FEP window does **not** open immediately upon the user's message. To activate the 72-hour free window, **you must reply to the user's message within 24 hours.**
  - *If you reply within 24 hours:* The 72-hour FEP window activates immediately upon your reply delivery.
  - *If you do NOT reply within 24 hours:* The opportunity is lost. Any subsequent message you send must be a paid Template Message, and it will not trigger the 72-hour free window.

- **Duration:** Once activated, it lasts for a fixed **72 hours**.
- **Reset Rules:** Unlike the CSW, this timer **does not reset** if the customer replies. It is a single, continuous 72-hour window.

#### Pricing & Capabilities within the FEP

During this 72-hour period, standard pricing is overridden:

- **All Messages are Free:** This includes non-template messages and **all categories** of Template Messages (including Marketing, Authentication and Utility).
- **Interaction with the CSW:**
  - The FEP and the 24-hour CSW run in parallel.
  - If the standard 24-hour CSW closes (e.g., the customer hasn't replied in 24 hours) but the 72-hour FEP is still active, you can **still send Template Messages for free**.

### Summary of Windows

| Feature | Customer Service Window (24h) | Free Entry Point Window (72h) |
| :--- | :--- | :--- |
| **Trigger** | Any incoming user message/reply | Click-to-WhatsApp Ad or Page CTA |
| **Duration** | 24 hours (Resets on new message) | 72 hours (Fixed, does not reset) |
| **Freeform Messages** | **Allowed & Free** | **Free** (Must be within active CSW) |
| **Utility Templates** | **Free** | **Free** |
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
