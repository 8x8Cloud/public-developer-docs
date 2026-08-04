---
slug: /connect/docs/viber/viber-hub
sidebar_label: 'Viber Business Messages'
---

# The 8x8 Viber Business Messages Platform

![Viber Business Message Categories: Transactional, Conversational, and Promotional](./images/Viber%20Business%20Message%20Categories.png)

*Source: [Viber for Business: The Types and Advantages of Viber Business Messages](https://www.forbusiness.viber.com/en/blog/post/the-types-and-advantages-of-viber-business-messages/)*

Welcome to the 8x8 Viber documentation. This section shows you how to reach customers on Viber Business Messages through the 8x8 Messaging Apps API, whether you send campaigns and manage templates from the 8x8 Connect portal or build directly against the API.

> 🚧 This section covers Viber Business Messages, sent through the 8x8 Messaging Apps API. Viber Bots and Viber Business Calls are separate Viber products and are not covered here.

## Why Viber

Viber gives your business direct access to a messaging app your customers are already likely to have installed, with the reach, richness, and reliability to carry marketing, transactional, and verification traffic in one channel.

- **Massive, active reach:** Rakuten Viber has surpassed 1 billion downloads and operates in over 190 countries, with 3 million users active on the app every minute. Your messages land on a channel customers already check.
- **Rich messaging formats:** Viber messages go well beyond plain text. Send up to 1,000 characters of formatted text, plus images, video, and files, add call-to-action buttons, and use carousel messages to showcase multiple products or offers in a single send.
- **Trusted brand presence:** Every Viber sender operates from a verified Business Account. Approved accounts receive a blue tick, are discoverable in Viber search, and message customers from a dedicated business inbox, separate from personal chats, so your business reads as an official, trusted sender rather than an unknown number.
- **SMS fallback for reliability:** When a Viber send cannot reach a customer, for example because they are offline or do not have Viber installed, 8x8 can automatically fall back to SMS so your message still gets through. See [Billing](/connect/docs/viber/billing) for how fallback traffic is rated.

## What 8x8 Provides

8x8 is an official Viber messaging partner, bringing Viber Business Messages to 8x8 Connect through the same Messaging Apps API you already use for WhatsApp, RCS, and LINE. Integrate once, then add Viber as another channel without learning a new API shape.

You can reach your Viber channel two ways: through the 8x8 Connect portal for sending campaigns and managing templates, or by building directly against the Messaging Apps API for full programmatic control.

Both paths give you the same platform features: [template management](/connect/docs/viber/templates) for transactional and OTP content, delivery receipts that include read status, [session messaging](/connect/docs/viber/sessions) for flat-fee two-way conversations, automatic SMS fallback, and inbound messages delivered to your webhook.

> 📘 **Already sending WhatsApp, RCS, or LINE with 8x8?**
>
> Viber runs on the same 8x8 Messaging Apps API. If you already have one of these channels integrated, adding Viber means configuring a new channel, not learning a new integration. Start at [Getting Started](/connect/docs/viber/getting-started).

## Key Capabilities

| Capability | Support | Notes |
| :--- | :--- | :--- |
| Outbound messages | Yes | Text, image, video, file, and call-to-action buttons |
| Inbound messages | Yes | Delivered to your configured webhook |
| Delivery receipts | `queued`, `sent`, `delivered`, `read`, `undelivered` | Read receipts are supported |
| Templates | Yes | Required for transactional and OTP traffic |
| Session messaging | Yes | 24 hour window opened by an inbound message; outbound messages inside the window are rated as one flat session fee |
| SMS fallback | Yes | Configured by 8x8 as part of channel setup |

## Where to Start

**New to Viber?** Learn the account structure, message categories, and how sessions and SMS fallback fit together before you integrate.

- **See:** [Concepts & Fundamentals](/connect/docs/viber/concepts-fundamentals)

**Ready to set up your Viber Business Account?** Find out what information 8x8 needs from you to provision a channel, and what happens after you submit it.

- **See:** [Account Onboarding](/connect/docs/viber/account-onboarding)

**Already have an account and want to send your first message?** Get your API key, find your base URL, and send your first Viber message.

- **See:** [Getting Started](/connect/docs/viber/getting-started)

**Migrating from another vendor?** Viber facilitates vendor migration through a quarterly window. Find out what to submit and when.

- **See:** [Account Onboarding: Migrating from another vendor](/connect/docs/viber/account-onboarding#migrating-from-another-vendor)

**Already integrated and need the API reference?** Go straight to endpoints, request and response payloads, template management, and error codes.

- **See:** [Sending Viber Messages over API](/connect/docs/viber/sending-viber-messages-api)

## In This Section

| Page | What it covers |
| :--- | :--- |
| [Concepts & Fundamentals](/connect/docs/viber/concepts-fundamentals) | Account structure, message categories, and the mental model behind sessions and templates |
| [Account Onboarding](/connect/docs/viber/account-onboarding) | What to submit to provision a Viber Business Account through 8x8, including vendor migration |
| [Getting Started](/connect/docs/viber/getting-started) | Prerequisites, authentication, base URLs, and your first API send |
| [Viber over 8x8 API](/connect/docs/viber/sending-viber-messages-api) | API reference: endpoints, request structure, error codes, and rate limits |
| [Promotional Message API Library](/connect/docs/viber/message-types) | Every free-form message format with screenshots and API payloads |
| [Transactional Message API Library](/connect/docs/viber/templates) | Template create and send payloads for utility and OTP use cases, rules, lifecycle, and migration guide |
| [Conversational Messaging](/connect/docs/viber/sessions) | The 24 hour session window, limits, and how sessions are rated |
| [Webhooks and Delivery Receipts](/connect/docs/viber/webhooks-delivery-receipts) | Inbound messages, delivery statuses, and template status events |
| [Compliance Guidelines](/connect/docs/viber/compliance-guidelines) | Viber's content policies, sender rules, and local regulations |
| [Billing](/connect/docs/viber/billing) | How Viber traffic is rated |
