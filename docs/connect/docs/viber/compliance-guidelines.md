---
slug: /connect/docs/viber/compliance-guidelines
sidebar_label: 'Compliance Guidelines'
---

# Compliance Guidelines

Viber requires businesses to follow content and sender guidelines on every message sent through a Viber Business Account, whatever the category. This page covers opt-in, the rules specific to promotional, transactional, and conversational content, what content Viber restricts, the local regulations that add further requirements in some countries, and how auto-reply behaves on a one-way sender.

[Concepts & Fundamentals](/connect/docs/viber/concepts-fundamentals) defines the message categories and terms this page assumes, and [Account Onboarding](/connect/docs/viber/account-onboarding) covers what Viber reviews about your business before it approves your sender in the first place.

---

## Overview

Non-compliance with Viber's guidelines can result in your sender being blocked from sending, or suspended outright. A suspended sender cannot send any Viber traffic until reinstated, so treat the rules on this page as a condition of keeping your channel active, not optional style guidance.

The sections below apply across all three message categories, plus the additional rules that come with conversational messaging inside a session. Where a rule is specific to one category, its section says so.

> 🚧
>
> Many of the specific figures, thresholds, and country lists on this page are documented by Infobip, one of 8x8's Viber messaging partners, and are not independently republished on Viber's own site. Confirm a specific detail with your account manager before you rely on it for a launch decision.

---

## Opt-In Requirements

You must have a recipient's consent before you send them a Viber message, whatever the category. Viber prohibits unsolicited messaging: a customer who has not consented to hear from your business is not a valid send target.

- **First contact:** The first time a customer receives a message from your business, Viber shows them an overlay where they can accept or decline further messages from your sender.
- **Ongoing consent:** Every message a customer receives from your business arrives in a branded chat that includes an Unsubscribe control, so they can block your sender at any time, for any reason.
- **What blocking means:** Once a customer blocks your sender, further sends to them fail with error `2007` (User blocked). See [Delivery Error Codes](/connect/docs/delivery-error-codes#viber-error-codes) if you see this code. Stop retrying a recipient who has blocked you rather than continuing to attempt sends.

---

## Promotional Message Rules

[Promotional content](/connect/docs/viber/concepts-fundamentals#message-categories) covers marketing offers, product promotions, and seasonal campaigns, sent as free-form text, media, and buttons composed at send time. It needs no template or approval, but the rules below still apply.

**Not allowed as the first message.** Your first message to a new customer must not be promotional. Lead with something like an order update or an account notice, and save offers and campaigns for messages after that first contact.

| First message | Category | Allowed as a first send |
| :--- | :--- | :--- |
| "Your order has shipped and will arrive within 3 business days." | Transactional | Yes |
| "Flash sale: 20% off everything today only." | Promotional | No |

**Frequency.** Viber does not publish a fixed cap on how often you can send promotional content. Sending too often is the fastest way to drive opt-outs and sender complaints, so keep your cadence proportionate to the value of the offer and stop sending to any customer who blocks you or stops engaging.

**Content.** Promotional sends follow the same rules as any other Viber message; see [Content Restrictions](#content-restrictions) below. For the formats available to free-form content, see [Promotional Message API Library](/connect/docs/viber/message-types).

---

## Transactional Message Rules

[Transactional content](/connect/docs/viber/concepts-fundamentals#message-categories) covers order confirmations, delivery updates, account notices, and payment reminders, sent using an approved [Transactional template](/connect/docs/viber/templates#utility-template).

**Text only.** A Transactional template carries static text with placeholder values; it does not support images, video, files, or buttons. See [Template Rules](/connect/docs/viber/templates#template-rules) for the exact constraints on that text.

**What does not qualify.** A template's category is fixed when you create it, and Viber's moderation reviews the body against that category. Keep a Transactional template limited to the update it exists to deliver: content that reads as promotional, for example an order update that also pitches an unrelated discount, risks the template being [declined](/connect/docs/viber/templates#lifecycle) at moderation even though you submitted it as Transactional.

**Country-specific structure.** Some countries add further structure to transactional content. See [Local Regulations](#local-regulations) below.

---

## Conversational Message Rules

Conversational rules govern two-way messaging inside an open [session](/connect/docs/viber/concepts-fundamentals#conversational), the 24 hour window that opens when a customer messages your business first.

- **You cannot initiate a conversation.** A session only opens from a customer's inbound message. You cannot start a conversational exchange yourself.
- **Consecutive message cap.** Inside an open session, Viber caps how many outbound messages you can send without a reply from the customer, currently 10; sending beyond it without a reply is blocked. See [Conversational Messaging: Limits](/connect/docs/viber/sessions#limits) for the exact figure and what happens if you exceed it.
- **A new inbound message starts a new session.** If a customer messages you again after their previous session closed, that message opens a new session; it does not extend the old one.
- **The same content rules apply.** Whatever you send inside a session, a session reply, a transactional template, or promotional content, still has to follow this page's [Content Restrictions](#content-restrictions).

> 🚧
>
> As a best practice, keep conversations responsive rather than sending long unanswered bursts, well inside the platform's hard limit. This specific guidance is documented by Infobip rather than by Viber or 8x8 directly; confirm current thresholds with your account manager if consecutive-message behavior affects a bot or agent flow you are designing.

---

## Content Restrictions

Viber reviews the content of every message and template against its own guidelines, independent of category. Content that breaks them can be declined at template moderation for a registered template, or contribute to the sender-level consequences described in [Overview](#overview) for any message.

- **Regulated industries.** Businesses in industries such as gambling, microcredit, and lending receive additional scrutiny under Viber's terms for regulated traffic. If you operate in one of these industries, discuss your specific requirements with your account manager before you onboard or expand into it.
- **Format restrictions.** Transactional and OTP templates carry text only, no images, video, files, or buttons; see [Transactional Message Rules](#transactional-message-rules) above. Free-form promotional content can use richer formats; see [Promotional Message API Library](/connect/docs/viber/message-types) for what each format supports.
- **No formatting in templates.** The bold, italic, strikethrough, and monospace styling available in free-form text is not available in template bodies. See [Promotional Message API Library](/connect/docs/viber/message-types).
- **Regional adaptations.** Some message elements can be adjusted to meet local content regulations. For example, carousel card buttons are optional and can be hidden where a market's data regulations require it.

> 🚧
>
> Viber's full content policy, including specific prohibited categories or themes, is not published in 8x8's own materials; the points above reflect what Infobip documents. Before you launch a campaign in a sensitive category, confirm current content requirements with your account manager, or consult Viber's own [Business Messages Partners Guidelines](https://www.viber.com/en/terms/business-messages-partners-guidelines/).

---

## Local Regulations

Some countries add requirements beyond Viber's global rules, affecting template content, sending windows, or which message categories you can use.

**Russia, Belarus, and Ukraine.** If your business is registered in Russia, Belarus, or Ukraine and you want to send transactional content both to customers inside these three countries and to customers elsewhere, you need two separate Viber Business Accounts: one for customers within these three countries, and one for everyone else. Contact your account manager to set up the additional account.

> 📘
>
> The template requirement itself, an approved template for all transactional content, no longer sets these three countries apart from anywhere else: see [What Changed on July 15, 2026](/connect/docs/viber/templates#what-changed-on-july-15-2026) for the mandate now in effect everywhere. The two-account requirement above is what remains specific to these three countries.

**Sending windows.** Some countries restrict what times of day certain message categories can be delivered. If you send to a market with delivery-window restrictions, contact your account manager to discuss how your sends should be configured.

**Other markets.** Viber applies additional criteria in some countries to using Viber as a channel at all, or to sending from that market to recipients elsewhere. 8x8's own materials do not enumerate every affected country.

> 🚧
>
> The country list above reflects what Infobip documents; Viber may apply criteria in additional countries not enumerated in 8x8's own materials. Confirm the current requirements for your destination countries with your account manager as part of planning any new market.

---

## Auto-Reply Behavior

Auto-reply applies to a Viber sender configured for one-way messaging, the [messaging direction](/connect/docs/viber/account-onboarding#channel-configuration) you choose at onboarding. Because a one-way sender does not process live replies, Viber automatically responds on your behalf whenever a customer messages it.

A two-way sender does not need auto-reply: an inbound message opens a [session](/connect/docs/viber/concepts-fundamentals#conversational) instead, and you or your systems can reply to it directly.

### Default Auto-Reply

If you have not configured a custom message, Viber sends its own default reply to any inbound message:

```text
{Your business name} does not currently receive messages. Go to chat info for more contact information.
```

This default is localized automatically based on the customer's device language.

### Custom Auto-Reply

To replace the default with your own message, contact your account manager. Your custom message must follow these rules:

| Rule | Requirement |
| :--- | :--- |
| Length | Up to 1,000 characters |
| Encoding | UTF-8 |
| Media URLs | HTTPS only |

---

## Next Steps

| If you want to | Read |
| :--- | :--- |
| Review the message categories this page assumes | [Concepts & Fundamentals](/connect/docs/viber/concepts-fundamentals#message-categories) |
| Set your channel's messaging direction and other sender details | [Account Onboarding](/connect/docs/viber/account-onboarding) |
| Learn the template model these rules reference | [Viber Templates](/connect/docs/viber/templates) |
| See the exact session limits referenced above | [Conversational Messaging](/connect/docs/viber/sessions#limits) |
| Understand how compliant traffic is rated | [Billing](/connect/docs/viber/billing) |
| Revisit the business case and full page map | [Viber Hub](/connect/docs/viber/viber-hub) |
