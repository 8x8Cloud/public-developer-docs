---
sidebar_label: 'Governance & Security'
---

# Governance, Security & Compliance

This section covers the mandatory policies, security features, and compliance rules for using the 8x8 WhatsApp Business Platform. Adhering to these guidelines is essential for maintaining a healthy account, protecting your customers, and ensuring your service is not interrupted.

## Opt-in & Opt-out Policies

### Opt-In

Before you can send any business-initiated (template) message to a user, you **must** obtain their explicit, affirmative consent (opt-in).

- **Clarity:** The opt-in must be clear and explicit. The user must understand they are opting in to receive messages *from your business* *on WhatsApp*.

- **Context:** The opt-in must clearly state the types of messages they will receive (e.g., "order updates," "appointment reminders," or "marketing promotions").

- **User Action:** The opt-in must be triggered by a user action, such as checking a box, entering a phone number, or sending a specific keyword.

- **Proof:** You must maintain a record of this consent (timestamp, source of opt-in) and provide it if requested.

**For detailed opt-in guidelines**, see: [Meta's WhatsApp Opt-In Best Practices](https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in)

### Opt-Out

You must provide a clear, easy, and free way for users to opt out of receiving messages from you.

- **[8x8 Automation Builder](/connect/docs/automation-builder):** The easiest way to manage this is by creating an **Automation Builder** workflow that listens for keywords like "STOP" or "UNSUBSCRIBE." Configure [webhooks](./whatsapp-webhooks.md#inbound-messages) to receive inbound messages from customers.

- **Blacklist API:** When a user opts out, your automation should use the **8x8 Contacts API** to add their number to a "Blacklisted" contact group. This prevents 8x8 from sending further messages to that user from your account.

- **In-Message Instructions:** Your templates, especially marketing-focused ones, should include instructions on how to opt out (e.g., "Reply STOP to unsubscribe").

## Content & Template Compliance (Meta Guidelines)

Meta classifies and reviews all templates to ensure a high-quality user experience. Non-compliance can lead to template rejection, pausing, or disablement.

- **Source:** *User-provided "Meta template guideline" text.*

### Template Categories & Content Rules

Meta defines three strict categories. Submitting a template in the wrong category is a common reason for rejection.

1. **Marketing:**

    - **Use:** Broad, flexible messaging to drive awareness, sales, retargeting, app promotion, or relationship-building.

    - **Rule:** Any template with "mixed content" (e.g., an order update that also includes a coupon), unclear content (e.g., only `{{1}}`), or any persuasive/promotional intent is classified as Marketing.

    - **Typical Objectives:** Awareness, Sales, Retargeting, App Promotion, Build relationships.

2. **Utility:**

    - **Use:** Non-promotional messages that are specific to a user’s order, account, or transaction; are requested by the user; or are essential/critical.

    - **Typical Objectives:** Opt-in/opt-out confirmation, Order management (confirm/update/cancel), Account alerts/updates, Feedback surveys tied to a specific interaction, or continuing a conversation started elsewhere by user request.

    - **"Essential or critical"** utility also includes public safety alerts, product recalls, and legal/regulatory compliance notices, all of which must have zero promotional intent.

3. **Authentication:**

    - **Use:** Only for identity verification with one-time passcodes (OTPs).

    - **Rule:** Must use Meta's Cloud API Template Library designs, include an OTP button (`COPY_CODE` or one-tap), and follow strict content rules: no URLs, media, or emojis are allowed. Parameters must be 15 characters or less.

### Creation, Review, and Statuses

- **Creation:** You select a category; Meta validates it against guidelines.

- **Approval Timeline:** Up to 24 hours. You will be alerted via email, in the WhatsApp Manager, and via the [`message_template_status_update`](./whatsapp-webhooks.md#template-status-updates) webhook.

- **Template Statuses:**

  - **In-Review:** Under review.

  - **Rejected:** Failed review due to policy/category violations (appealable).

  - **Active (Quality: Pending/High/Medium/Low):** Sendable. Quality rating (see below) impacts pausing.

  - **Paused:** Cannot send; requires manual or automatic unpause.

  - **Disabled:** Cannot send; permanently disabled after multiple `Paused` states.

  - **Appeal Requested:** An appeal for a `Rejected` template has been submitted.

### Parameter, Content, and Format Rules (Common Rejection Reasons)

Your template will be **REJECTED** if it:

- **Has incorrect parameter formatting:** Fails to use sequential `{{1}}`, `{{2}}` placeholders, or has special characters (`#`, `$`, `%`). Parameters cannot be at the very start or end of a template.

- **Has no sample:** You must provide a valid sample value (e.g., in the `examples` property via API or "Add Sample" in the portal) for every variable you use.

- **Is a duplicate:** The body/footer is identical to another template (this rule does not apply to `AUTHENTICATION` templates).

- **Violates policy:** Asks for sensitive data (full credit card numbers, national IDs) or contains abusive/threatening content.

### Quality, Pacing, and Pausing

Meta monitors template quality based on user feedback (e.g., blocks, reports).

- **Quality Rating:** An `Active` template can have a rating of **High (Green)**, **Medium (Yellow)**, or **Low (Red)**.

- **Template Pacing:** New `MARKETING` templates are "paced" (throttled) to test user feedback. If feedback is good, held messages are released. If feedback is poor, the template is **PAUSED**, and held messages are dropped.

- **Auto-Pausing:** If a template's quality rating drops to **Low (Red)**, Meta will automatically pause it.

  - 1st instance: Paused for 3 hours.

  - 2nd instance: Paused for 6 hours.

  - 3rd instance: **Disabled** permanently.

- **Monitoring:** You **must** subscribe to the [`message_template_status_update`](./whatsapp-webhooks.md#template-status-updates) and [`message_template_quality_update`](./whatsapp-webhooks.md#template-quality-updates) webhooks (see [Operations, Monitoring & Troubleshooting](./operations-monitoring.md)) to be alerted when a template is paused or disabled.

- **Unpausing:** Templates paused due to poor quality will auto-unpause after the duration. Templates paused due to pacing must be manually unpaused via the WhatsApp Manager or API.

### Automatic Category Updates

Meta automatically reviews approved templates and may re-categorize them.

- **Utility > Marketing:** If Meta finds you are using a `UTILITY` template for promotion, it will be re-categorized to `MARKETING`. You will be notified via email and the [`template_category_update`](./whatsapp-webhooks.md#template-status-updates) webhook.

- **Marketing/Utility > Authentication:** If Meta determines your template should be an `AUTHENTICATION` template, it will be marked as **REJECTED** (Incorrect Category) on the first of the following month. You must create a new, compliant `AUTHENTICATION` template to continue.

### Practical Compliance Checklist

- **Choose the right category:** Marketing for any promo; Utility for non-promo, specific requests; Authentication for OTPs only.

- **Format variables cleanly:** Use `{{1}}`, `{{2}}` and provide a sample for each.

- **Respect content policies:** No sensitive data requests.

- **Watch quality and pacing:** Monitor your webhooks ([`message_template_status_update`](./whatsapp-webhooks.md#template-status-updates), [`message_template_quality_update`](./whatsapp-webhooks.md#template-quality-updates)) and be prepared to act if a template is `PAUSED`.

## Security & Data Protection (8x8 Platform)

8x8 provides multiple layers of security to protect your account, your data, and your customers from fraud.

### Account & API Security

- **API Key Management:** Your API Key (Bearer Token) is your master key.

  - **Secure Storage:** Never hard-code API keys in your application. Use environment variables.

  - **Rotation:** Regularly rotate your API keys, especially if you suspect a leak. You can delete old keys and generate new ones in the 8x8 Connect portal.

- **IP Whitelisting:**

  - **What it is:** You can provide 8x8 with a specific list of your server IP addresses. We will reject any API request that claims to be from your account but does not originate from an IP on this list.

  - **How to enable:** Manage your IP whitelist in the 8x8 Connect portal under **Developer Tools > IP Whitelisting**.

- **Portal Security (2FA & SSO):**

  - **Two-Factor Authentication (2FA):** Enforce 2FA (via Authenticator app or SMS) for all users logging into the 8x8 Connect portal to prevent unauthorized access.

  - **Single Sign-On (SSO):** 8x8 Connect supports SAML-based SSO, allowing you to enforce your organization's own authentication policies for portal access.

### Fraud Prevention

- **CAPTCHA:** We strongly recommend implementing a CAPTCHA (like Google's reCAPTCHA) on any public-facing web form (e.g., "Sign up for updates") that triggers an 8x8 API call. This is the most effective way to prevent bots from causing fraudulent, high-volume message sends.

- **API Rate Limiting (8x8):** By default, 8x8 limits your account to **1800 requests/second per subaccount** and **3000 requests/second per IP**. If you exceed this, you will receive an **HTTP `429 Too Many Requests`** error.

- **Rate Limiting (Your Application):** You should enforce your own rate limits.

  - **By MSISDN (Phone Number):** Do not allow the same phone number to request more than one message (e.g., one OTP) in a 60-second period.

  - **By IP Address:** Do not allow the same IP address to make more than 5-10 requests per minute.

- **PII Removal:** 8x8 provides a [PII Removal API](/connect/reference/delete-pii) that allows you to programmatically delete Personally Identifiable Information (message content, phone numbers) from 8x8's logs after a specified period to comply with your data retention policies.

## Legal & Regulatory Considerations

- **Data Residency:** 8x8 operates data centers in multiple regions (e.g., Asia Pacific, Europe, North America, Indonesia). You must select the appropriate data center region for your account to ensure you comply with your local data residency laws (e.g., GDPR in Europe, GR 71 in Indonesia).

- **Local Laws:** You are responsible for ensuring your message content and opt-in/opt-out practices comply with all telecommunications laws in the countries where you operate.

## References and Resources

**Official WhatsApp Policies:**

- [WhatsApp Business Policy](https://business.whatsapp.com/policy) - Meta's official WhatsApp Business Platform policies, including messaging guidelines, opt-in requirements, and content compliance rules
