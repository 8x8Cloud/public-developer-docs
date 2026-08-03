---
sidebar_label: 'LINE'
---

# The 8x8 LINE Channel

Welcome to the 8x8 integration for LINE. This documentation covers both LINE products available on the 8x8 Messaging Apps platform: the two-way **LINE Official Account** channel and the one-way **LINE Official Notification** channel.

## Why Use LINE for Business?

LINE is the most popular chat application in **Japan**, **Thailand**, and **Taiwan**. LINE Official Account is LINE's business messaging product. It lets a business hold the same kind of one-to-one conversation with a customer that the customer already has with their friends on LINE, and it is the only route to a LINE user for a business.

- **Friend-based reach:** You exchange messages with users who have added your LINE Official Account as a friend, which means your audience has opted in by adding you.
- **In-app discoverability:** Accounts that pass LINE's review receive a Verified account badge and appear in LINE in-app search results. Unverified accounts do not appear in search.
- **Two-way conversations:** The LINE Official Account channel supports both inbound and outbound messages, so you can run support and service journeys, not just notifications.
- **One API across channels:** LINE uses the same 8x8 Messaging Apps send endpoint and webhook envelope formats as SMS, WhatsApp, Viber, and RCS.

<!-- NEEDS SOURCE: N1. A headline LINE reach figure for Thailand is deliberately absent from this page. The four-country popularity statement above is confirmed by the product owner. The only numeric reach figures available in this workspace come from internal strategy documents and are not attributable to a citable public source. Do not add one without a public citation. -->

## What is the 8x8 Integration for LINE?

8x8 connects your LINE Official Account to the 8x8 Messaging Apps platform, so your application sends and receives LINE messages through the same API and the same webhook you already use for other channels.

8x8 is a LINE-registered Agency (AGP) partner and can provision and manage a LINE Official Account on your behalf. If you already own a LINE Official Account, 8x8 can connect that instead. Both routes are documented in [Account Provisioning and Onboarding](./account-provisioning-onboarding.md).

You work with LINE on 8x8 through the **8x8 Messaging Apps API**: send and receive LINE messages programmatically from your own application, CRM, or backend system.

## Two LINE Products on 8x8

LINE appears twice in the 8x8 channel list, as two genuinely different products with different endpoints, different recipient keys, and different capabilities. Choose deliberately.

| Feature | LINE Official Account | LINE Official Notification |
|---|---|---|
| **Channel type value** | `line` | `LineNotification` |
| **Direction** | Inbound and outbound | Outbound only |
| **Recipient keyed by** | `user.channelUserId` (LINE user ID) | `user.msisdn` (phone number) |
| **Send endpoint** | `POST /api/v1/subaccounts/{subAccountId}/messages` | `POST /api/v1/subaccounts/{subAccountId}/lon` |
| **Templates** | Not supported | Required, and must be pre-approved by LINE |
| **Text limit** | 5,000 characters (LINE limit) | 500 characters per template |
| **Content types** | Text, Image, Video, Audio, Location | Text and Button, inside an approved template |
| **Delivery statuses reported** | Accepted, Sent | Accepted, Sent, Delivered |

The last row is the one most likely to change your design. The `line` channel reports **Accepted** and **Sent** but not Delivered or Read, so you can confirm that a message was accepted by LINE but cannot confirm that the recipient's device received it. The `LineNotification` channel goes one step further and additionally reports **Delivered**. See [LOA Delivery Receipts](./loa-webhook.md#delivery-receipts) for details.

> **Key Takeaway:** These are not two modes of one channel. They are two channels, each on its own 8x8 sub-account with its own bearer token, and they identify the recipient in incompatible ways. A phone number cannot be used to send on the `line` channel, and a LINE user ID cannot be used to send on `LineNotification`.

## Where to Start

**For All Users (Start Here)** Read the fundamentals first. LINE identifies recipients differently from every phone-number-based channel, and that difference shapes your data model.

- **See:** [Identifying a LINE Recipient](./loa-messaging.md#identifying-a-line-recipient)
- **See:** [The LINE Ecosystem and Account Model](./concepts-fundamentals.md) - Account types, Verified Account review, Premium ID, and LINE Official Account Manager

**For Business and Operations Users** Learn what LINE requires before a single message can be sent, what information you have to supply, and how long it takes.

- **See:** [Account Provisioning and Onboarding](./account-provisioning-onboarding.md) - The three provisioning paths, what you submit, and the lead times
- **See:** [Governance, Security and Compliance](./governance-security.md) - LINE's account rules and enforcement model
- **See:** [Messaging Apps Analytics](/connect/docs/messaging-apps) - Dashboard and reports, filterable by channel

**For Developers and Integrators** Start with authentication and the send endpoint, then work through the payload catalogue and the webhook contract.

- **See:** [Getting Started with LINE over the 8x8 API](./getting-started.md#authentication)
- **See:** [LINE Official Account: Behaviour, Messages, and Constraints](./loa-messaging.md) - How the channel addresses a recipient, plus one complete request body per supported type
- **See:** [LINE Official Notification (LON)](./official-notification-lon.md) - The separate one-way product, its full content schema, and its icon set
- **See:** [LINE Official Account Webhooks](./loa-webhook.md) - Inbound messages, delivery receipts, and retry behaviour
- **See:** [LON Delivery Receipts](./lon-webhook.md) - LON delivery receipts, which additionally report Delivered
