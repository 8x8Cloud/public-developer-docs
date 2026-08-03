---
sidebar_label: 'LINE Ecosystem & Accounts'
---

# The LINE Ecosystem and Account Model

This page explains the LINE side of the account model: the console that sits above your account, what a LINE Official Account is and how one account can serve both LINE products on 8x8, the channel and credential objects that sit underneath it, the account tiers LINE offers and what each one unlocks, and the two decisions customers ask about most, applying for a Verified Account and buying a Premium ID. Read it before you decide what to order, because these are the rules that most often surprise a customer mid-onboarding.

## LINE Official Account Manager

**LINE Official Account Manager** is LINE's own console for an Official Account, available as a web application and as a mobile app. It sits at the top of the hierarchy: even when 8x8 drives all message traffic through the API, this console remains the place where account-level settings live.

What you continue to do in LINE Official Account Manager:

- **Manage the account profile,** including the profile visibility setting that controls whether a Verified Account appears in search results.
- **Purchase and change the subscription plan,** purchase an OA Chat package subscription, and purchase a Premium ID.
- **Register and change the payment method.**
- **Manage administrator permissions.**
- **View Insights,** LINE's own account statistics.

## The LINE Official Account

A **LINE Official Account (OA)** is the account entity that everything else hangs off. It is the identity users see, the thing they add as a friend, the thing an account type and a Premium ID attach to, and the thing 8x8 connects a channel to. One OA, one business identity on LINE.

A single LINE Official Account can be used for both LINE products on 8x8 at the same time: two-way LINE Official Account (LOA) messaging and one-way LINE Official Notification (LON). You do not need a second OA for LON.

What you do need is **two separate 8x8 sub-accounts**, one per product. The reason is how each product addresses a recipient:

- **LOA addresses recipients by `channelUserId`,** the opaque LINE user ID.
- **LON addresses recipients by `msisdn`,** a phone number.

Because the two products address a recipient differently, 8x8 provisions one sub-account per product, each with its own API key. See [Sub-accounts and Authentication](./loa-messaging.md#sub-accounts-and-authentication) for the LOA side and [LINE Official Notification (LON)](./official-notification-lon.md) for LON's.

> **Key Takeaway:** One LINE Official Account, two 8x8 sub-accounts. Ordering LON does not mean ordering a second Official Account, but it does mean a second sub-account and a second API key.

### Channel Type Values

Two channel type values in the 8x8 Messaging Apps platform are LINE products. The value identifies the channel in the webhooks that product produces, and it determines which endpoint you send on. The two products produce different webhooks, so each value surfaces in a different place.

| Channel type value | Product | Send endpoint | Appears in |
|---|---|---|---|
| `line` | LINE Official Account | `POST /api/v1/subaccounts/{subAccountId}/messages` | `recipient.channel` on inbound messages and `channel` on delivery receipts. Reports Accepted and Sent |
| `LineNotification` | LINE Official Notification | `POST /api/v1/subaccounts/{subAccountId}/lon` | `channel` on delivery receipts only. This channel has no inbound direction |

Note the casing. `line` is lowercase, `LineNotification` is camel case with a capital L. In the separate `channels` fallback override array on the send request, the same channel is spelled `Line` with a capital L. Use each value exactly as documented for the field you are populating.

### The Technical Building Blocks

Underneath the Official Account sit the LINE objects that a Messaging API integration is built on. 8x8 operates the API path for you, so you will meet most of them in LINE's own console and during provisioning rather than in your own code, but they are the vocabulary LINE's documentation uses.

1. **LINE Messaging API channel:** A channel is a communication path used to access features of the LINE Platform. LINE offers several channel types, including the Messaging API channel, the LINE Login channel, and the LINE MINI App channel. Enabling the Messaging API on your Official Account creates a Messaging API channel, and that channel is what 8x8 connects to.
2. **Channel secret:** A private key known only to the LINE Platform and the developer, found on the channel's **Basic settings** tab in the LINE Developers Console. It is the hash key LINE uses to sign webhooks. Retrieving or reissuing it requires Admin privileges on the channel.
3. **Channel access token:** An opaque string that proves an application is permitted to use the channel.
4. **Provider:** The LINE entity that owns your channels. This matters for identity: LINE issues a **different** user ID for the same person under a different provider. Under the same provider the user ID is identical across channel types.

LINE issues four kinds of channel access token, with different validity periods and per-channel issue limits:

| Type | Validity period | Number of issues per channel |
| :--- | :--- | :--- |
| **Channel access token with a user-specified expiration** | Up to 30 days | 30 |
| **Stateless channel access token** | 15 minutes | Limitless |
| **Short-lived channel access token** | 30 days | 30 |
| **Long-lived channel access token** | Indefinite | 1 |

> **Note**
>
> You do not manage channel access tokens yourself when sending through 8x8. 8x8 authenticates to LINE on your behalf, and your application authenticates to 8x8 with an 8x8 API key. Channel access tokens matter only if you also operate your own LINE bot server directly against LINE's API.

## Account Types

LINE's Official Account Guidelines describe two account types that a customer can apply for, plus a third tier that LINE assigns at its own discretion.

| Account type | Who can use it | Review required | In-app search | Badge |
|---|---|---|---|---|
| **Unverified Account** | Any company, organization, or individual | No | Does not appear in LINE in-app search results | No |
| **Verified Account** | Only customers who pass LINE's screening | Yes | Appears in LINE in-app search results | Verified account badge |
| **Premium Account** | Only customers who pass a screening process instituted by LINE | Yes | Not stated by LINE | Not stated by LINE |

- **Unverified Account:** Available for use by any company, organization, or individual. These accounts have not been reviewed. LINE states that they do not appear in search results either on the internet or in the LINE app.
- **Verified Account:** An account that has passed LINE's review process. Once reviewed, it is issued a Verified account badge and appears in LINE in-app search results.
- **Premium Account:** LINE may set criteria for making an account into a Premium Account. LINE explicitly states that it **has no responsibility to disclose the criteria**. You cannot apply for a Premium Account the way you apply for a Verified Account.

> **Note**
>
> Some LINE Messaging API features are gated on account type. The endpoints that return the user IDs of all your friends, and of all members of a group or multi-person chat, are available only to Verified or Premium accounts. Neither is exposed through the 8x8 API.

## Why Verified Account Matters

A Verified Account is the difference between an account customers can find and one they cannot. It carries the Verified account badge, and it appears in LINE in-app search results, which an Unverified Account never does regardless of any setting. If discovery inside the LINE app is part of your acquisition plan, verification is the mechanism.

You cannot create a Verified Account directly. LINE requires you to create an Unverified Account first and then apply for verification. Accounts created in the LINE Official Account app are Unverified, and LINE states that Verified accounts cannot be created from that app at all.

- **Where it is available:** Review applications are currently accepted **only for Japan, Taiwan, and Thailand**. LINE states that Verified accounts are not being issued for other countries or regions at this time.
- **How long it takes:** From application to completion, LINE states the review process normally takes **about 10 business days**.
- **Identity verification:** To verify your identity, LINE contacts you by phone or at the email address registered at the time of application. LINE states that the call will be recorded.
- **No status visibility:** LINE states that it cannot provide details about the status of a pending review, and cannot reply to related inquiries.
- **No explanation of the outcome:** LINE bears no obligation to explain the results of the screening process or the reasons behind any decision.
- **Industry-based refusal:** Beyond the published rules, LINE may refuse to open a Verified Account on the grounds of the customer's industry or lines of business, at its sole discretion.

### Verified Account name rules

LINE requires Verified Account names to follow four rules. Names that infringe them may be subject to a request for amendment from LINE.

1. Names **must** include the official name of the company, organization, or self-employed person, or the official name of the product or service they provide.
2. Names **must not** imply the existence of companies, organizations, self-employed persons, products, or services which do not exist.
3. Names **must not** include text strings which are non-factual or which may lead to erroneous inferences.
4. Names **must not** imply that they pertain to products or services offered by LINE or its affiliated companies.

> **Important:** LINE states that, in principle, it does **not** accept account name changes for Verified Accounts. If the company or service name has genuinely changed and you wish to change the account name, the account is subject to a **separate screening process**.

## Why Premium ID Is Meaningful

A **Premium ID** is a LINE Official Account ID of your own choosing, purchased from LINE to replace the basic ID that LINE assigns automatically. It is the customer-facing `@` handle for the account, so it is what a customer types, reads on a poster, or hears in a call centre script. A handle that matches your brand is easier to recognise, easier to remember, and easier to promote off-platform than a LINE-assigned string. On the 8x8 provisioning form, this is the **OA ID** field.

LINE sets the commercial and character-set terms for a Premium ID, including the annual fee, the length and character limits, the renewal and refund rules, and the countries where it is not available. Those terms change, so take them from LINE's own contract rather than from this page: see [LINE Official Account Premium ID Terms of Use](https://terms2.line.me/official_account_premiumid_terms_oth).

## Account Limits per Business ID

LINE allows up to **100 accounts** per Business ID, whether Verified or Unverified. Plan your Business ID structure with that ceiling in mind if you expect to run many Official Accounts.

## Account Deletion

Deleting a LINE Official Account is not reversible in any practical sense. LINE states the following consequences, and they are worth reading before anyone clicks the button:

- **You will not be able to use any features other than Insights and billing** once the account is deleted.
- **All account information, including statistics, is permanently erased 30 days after deletion.**
- **All of your friends are deleted.**
- **There is no refund** if you delete the account in the middle of a month.
- **Additional messages sent before deletion are still billed** on your next billing date.
- **An iOS-purchased Premium ID subscription is not cancelled automatically.** You must cancel the subscription separately on the App Store.

## Related Resources

**8x8 Documentation:**

- [Account Provisioning and Onboarding](./account-provisioning-onboarding.md) - The three provisioning paths, what you submit, and the lead times
- [Governance, Security and Compliance](./governance-security.md) - LINE's prohibited content, enforcement model, and regional availability
- [LINE Official Account: Behaviour, Messages, and Constraints](./loa-messaging.md) - How the two-way channel addresses a recipient, how LINE counts what you send, and a complete request body per supported type
- [LINE Official Notification (LON)](./official-notification-lon.md) - The second product the same Official Account can serve

**LINE's Own References:**

- [LINE Official Account Guidelines](https://terms2.line.me/official_account_guideline_th?lang=en) - Account types, screening criteria, prohibited activities, and enforcement
- [LINE Official Account Premium ID Terms of Use](https://terms2.line.me/official_account_premiumid_terms_oth) - Character limits, term, fees, and refund policy
- [LINE Official Account Help Center (Thailand)](https://help2.line.me/official_account_th/web/categoryId/200000074/pc?lang=en) - Account types, account creation, review process, plans, and settings
- [LINE Official Account Manager](https://manager.line.biz/) - The console itself
- [LINE Official Account (Thailand)](https://lineforbusiness.com/th/service/line-oa-features/broadcast-message) - Thailand plans and pricing, published by LINE
