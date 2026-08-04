---
slug: /connect/docs/viber/account-onboarding
sidebar_label: 'Account Onboarding'
---

# Account Onboarding

Getting a Viber Business Account provisioned starts with your 8x8 account manager, not the API. This page lists everything 8x8 needs from you, what happens after you submit it, and how to move an existing Viber Business Account from another vendor to 8x8.

---

## Overview

Viber is not self-serve. 8x8 provisions a Viber Business Account on your behalf: you submit your business information to your 8x8 account manager, 8x8 submits it to Viber for approval, and 8x8 provisions your channel once Viber approves it and assigns a Service ID.

Start by gathering the information in **What You Need to Provide** below and sending it to your account manager. If you already operate a Viber Business Account through another vendor, see **Migrating from Another Vendor** below instead. Viber can move your existing account to 8x8 rather than provisioning you as a new sender.

> 📘
>
> This page assumes you're familiar with terms like Viber channel, Service ID, and messaging subaccount. If they're new to you, see [Concepts & Fundamentals](/connect/docs/viber/concepts-fundamentals#account-structure) first.

---

## What You Need to Provide

Gather the following before you contact your account manager. 8x8 uses it to submit your business for Viber approval and to provision your channel once approved.

- **[8x8 account details](#8x8-account-details)**: your account and subaccount identifiers
- **[Business identity](#business-identity)**: your brand name, address, and category
- **[Channel configuration](#channel-configuration)**: where and how you plan to send
- **[Contact person](#contact-person)**: who 8x8 and Viber can reach about this application
- **[Brand assets](#brand-assets)**: your logo in six sizes
- **[Documentation](#documentation)**: your signed Warranty Letter

### 8x8 Account Details

Identifies which 8x8 account and subaccount to provision the Viber channel under.

| Field | Notes |
| :--- | :--- |
| `accountId` | Your 8x8 account identifier |
| `subaccountId` | The subaccount where your Viber channel will be provisioned |

> 🚧
>
> The subaccount must be a dedicated messaging subaccount. It cannot be an existing SMS subaccount.

### Business Identity

These details build your Viber Business Account profile. Some become part of your public profile once your account is live; others are for Viber's review only and are never shown to customers.

| Field | Visibility | Notes |
| :--- | :--- | :--- |
| Display name | Public | Your brand name in its original language. This is the name customers see |
| Business address | Public | |
| Business phone number | Public | |
| Business website | Public | |
| Business category | Public | One of 14 categories, see below |
| Business registration number | Internal | |
| Headquarters address | Internal | Your headquarters' full address |

Choose the business category that best describes you:

- Media Agency
- Financial Institution
- Community Organization
- Governmental/non-Governmental Organization
- Publisher
- Commerce
- E-Commerce
- Real estate and construction companies
- IT and internet companies
- Education
- Healthcare
- Transportations
- Retail
- Other (please specify)

### Channel Configuration

Where and how you plan to send.

| Field | Notes |
| :--- | :--- |
| Registered country | The country your business is registered in |
| Target launch date | |
| Destination countries | The countries you plan to send Viber messages to |
| Messaging direction | One-way only, or two-way |

### Contact Person

The person 8x8 and Viber can reach about this application.

| Field | Notes |
| :--- | :--- |
| Name | |
| Position | |
| Email address | |
| Phone number | |

### Brand Assets

Your logo, provided in six exact sizes.

| Requirement | Detail |
| :--- | :--- |
| Format | PNG only |
| Required sizes | 50x50, 65x65, 100x100, 130x130, 256x256, 360x280 |

> 🚧
>
> All six sizes are required, in PNG format only. Other formats are not accepted.

### Documentation

The document 8x8 needs before it can submit your application to Viber.

| Document | Notes |
| :--- | :--- |
| Signed Warranty Letter | Provided by 8x8. Sign it and include it with your submission |

---

## What Happens After You Submit

Once your account manager has everything above:

1. **8x8 submits your information to Viber.** Viber reviews it for approval.
2. **Viber assigns a Service ID** to your business sender once approved.
3. **8x8 provisions your Viber channel** on the subaccount you provided.
4. **You receive your channel details** and can begin integration.

> 🚧
>
> Approval timelines vary by market and by Viber's current review load. Contact your account manager for a current estimate before committing to a launch date.

---

## Migrating from Another Vendor

If you already operate a Viber Business Account through a vendor other than 8x8, tell your account manager. Viber can facilitate migrating your existing Viber Business Account to 8x8 instead of provisioning you as a new sender.

Migration runs through a quarterly window. To move on a given date, submit a completed Migration Request Letter to your account manager approximately 45 days beforehand:

| Migration Date | Letter Deadline |
| :--- | :--- |
| 1st January | 17th November |
| 1st April | 15th February |
| 1st July | 17th May |
| 1st October | 15th August |

> 📘
>
> Contact your account manager as soon as you know you want to migrate. The dates above are deadlines for submitting the Migration Request Letter, not when to start the conversation.

---

## Next Steps

| If you want to | Read |
| :--- | :--- |
| Send your first Viber message once your channel is provisioned | [Getting Started](/connect/docs/viber/getting-started) |
| Understand Viber's content and sender rules before you launch | [Compliance Guidelines](/connect/docs/viber/compliance-guidelines) |
| Revisit account structure terms like Service ID and channel | [Concepts & Fundamentals](/connect/docs/viber/concepts-fundamentals) |
| Revisit the business case and full page map | [Viber Hub](/connect/docs/viber/viber-hub) |
