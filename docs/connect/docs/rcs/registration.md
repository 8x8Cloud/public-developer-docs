---
slug: /connect/docs/rcs/registration
---

# Agent Registration and Launch

Launching an RCS agent requires coordination between your brand, 8x8, Google, and mobile carriers. This guide outlines the end-to-end process, from preparing your brand assets to securing carrier approval for your live agent.

## 1. Preparation & Brand Profiling

Before submitting your RCS Agent Request Form, gather the following assets. Missing or incorrect formats are the most common cause of verification delays.

### A. Brand Identity Assets

These define how your agent appears in the customer's native messaging app on Android and iOS.

**Agent Name (Display Name):** The verified name customers will see (e.g., "Your Brand Support").

* **Constraint:** Maximum 40 characters.

**Brand Color:** A HEX color code (e.g., #E91B0C) used for buttons and interactive elements.

* **Requirement:** Must have a 4.5:1 contrast ratio against white text. Use a contrast checker to verify this.

**Logo:** The avatar displayed next to your messages.

* **Dimensions:** 224x224 px (Recommended).
* **File Size:** Maximum 50 KB.
* **Format:** JPG or PNG.
* **Note:** This renders as a circle. Ensure your icon is centered with padding so edges aren't cut off.

**Hero Image:** The banner displayed at the top of your agent's "Info & Options" page.

* **Dimensions:** 1440x448 px (Aspect ratio 3.2:1).
* **File Size:** Maximum 220 KB.
* **Format:** JPG or PNG.
* **Note:** Avoid transparent backgrounds; they may display poorly in Dark Mode.

### B. Legal & Compliance

Public links are required to verify business legitimacy.

* **Privacy Policy URL:** A valid, publicly accessible link.
* **Terms of Service URL:** A valid, publicly accessible link.
* **Contact Information:** A public email and phone number for end-user support.

### C. Use Case Definition

Define your agent's primary function to ensure correct billing and approval.

**Use Case Types:**

* **Transactional:** Order receipts, boarding passes, payment alerts.
* **Promotional:** Marketing offers, coupons, sales alerts.
* **OTP:** One-time passwords.

## 2. Integration & Internal Testing

Once 8x8 creates your agent profile, you must test it on real devices before requesting a public launch.

**Supported Devices:**

* **Android:** Most devices running Android 5.0 or later.
* **iOS:** Most iPhones running iOS 18 or higher.

### The "Handshake" Process (Whitelisting)

RCS agents do not "just work" on any phone during the testing phase. You must strictly follow this sequence:

1. **Request Whitelisting:** Provide the phone numbers of your test devices (in E.164 format, e.g., +14155552671) to your 8x8 account manager or support team to have them added to the authorized test list.

2. **Check for Invite:** Once added, your device will receive a native system notification (not an SMS) asking: "Make [Agent Name] a tester?".
   * **Action Required:** You must tap "Accept" on this notification.
   * **Troubleshooting:** If you skip this step, API calls will fail with a 403 PERMISSION_DENIED or "User not reachable" error because the user has not consented to receive messages from an unverified agent.

## 3. Carrier Approval & Launch Requirements

To launch a live agent, specifically for the US market, strictly enforced documentation and functionality proofs are required.

### A. Required Documentation

You will need to submit the following to initiate the launch process:

* **Agent Request Form:** To initiate setup.
* **RCS Program Brief:** Detailed overview of campaign logic/goals.
* **Brand Vetting Form:** For brand verification.
* **T-Mobile Pre-approval File:** (USA Only) Specific requirement for the T-Mobile network.

### B. Functional Requirements

Your agent must automatically respond to standard keywords with exact specific phrasing. Ensure your logic handles these commands before submission:

**START (Welcome Message)**

* **Requirement:** Must confirm opt-in, state message frequency, mention data rates, and provide instructions for Help/Stop.
* **Required Output:** "Welcome! You are opted in. Msg freq varies. Msg&data rates may apply. Text HELP for help, STOP to cancel."

**HELP**

* **Requirement:** Must provide specific customer support contact information (phone or email).
* **Required Output:** "For support, please call 1-866-879-8647."

**STOP**

* **Requirement:** Must confirm the opt-out and state that no further messages will be sent.
* **Required Output:** "You have successfully unsubscribed. You will no longer receive messages from this agent. Reply START to resubscribe."

### C. Video Verification

For approval on some carriers, you must provide a screen recording of your agent.

**Video Requirement:** The video must demonstrate the full user journey:

* **Opt-In:** How the user agrees to receive messages (e.g., web form, SMS keyword).
* **Content:** The actual rich messages the user receives.
* **STOP Flow:** The user sending "STOP" and receiving the compliant opt-out message defined above.

## 4. Go-Live & Monitoring

Once approved by carriers:

* **Activation:** 8x8 will activate your agent for live traffic.
* **Monitoring:** Regularly review delivery rates and ensure ongoing compliance with content standards.
* **Maintenance:** If you change your use case (e.g., adding promotional messages to a transactional agent), you may need to re-submit for approval.
