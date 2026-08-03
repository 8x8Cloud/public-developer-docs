---
sidebar_label: 'LINE Official Account (Two-way)'
---

# LINE Official Account: Behaviour, Messages, and Constraints

This is the working reference for two-way conversation messaging on the LINE Official Account channel, `line`. It covers how the channel addresses a recipient, the consent that has to exist before you can address one, how LINE counts what you send, and then one complete request body per supported content type, each followed by its field explanations and its real constraints.

The `line` channel supports no templates. If you need a pre-approved structured notification, that is a different product: see [LINE Official Notification (LON)](./official-notification-lon.md).

## LOA Behaviour

Three things decide the shape of an LOA integration: the identifier you address a recipient with, the consent that must exist before that identifier ever reaches you, and the sub-account the send is authenticated against. For the objects that sit underneath an Official Account and the channel type value that names each LINE product inside a payload, see [The Technical Building Blocks](./concepts-fundamentals.md#the-technical-building-blocks) and [Channel Type Values](./concepts-fundamentals.md#channel-type-values).

### Identifying a LINE Recipient

This is the single biggest difference between LINE and 8x8's phone-number channels. LINE users have no phone number that you can address, so LINE issues an opaque user ID instead.

- **`user.channelUserId`** is the field you populate when sending on the LINE Official Account channel. Use it instead of `msisdn` to address the recipient.
- **Format:** the LINE Platform issues user IDs as a string matching the regular expression `U[0-9a-f]{32}`. That is the letter `U` followed by exactly 32 lowercase hexadecimal characters.
- **Scope:** the user ID is issued per provider. The same person has a different user ID under a different provider, so a user ID you obtained elsewhere is not portable into your LINE integration.
- **The same field name carries it back to you.** `user.channelUserId` is also where the LINE user ID arrives on inbound message webhooks, so one field name covers both directions. `channelUserId` also appears in delivery receipts from this channel, which report `Accepted` and `Sent` statuses. See [Delivery Receipts](./loa-webhook.md#delivery-receipts).
- **`user.msisdn` is absent for LINE on everything you receive.** The inbound webhook contract states that `msisdn` is left out for channels where users have no phone number, and names LINE as the example. When a `user` field has no value, it is left out of the JSON entirely rather than sent as null. There is also no reason to send `msisdn` on an LOA request: see the [Message API Library](./message-api-library.mdx) for the send payloads.

#### How you obtain a channelUserId

LINE sends the user ID to the bot server in a webhook when a user adds your LINE Official Account as a friend (a `follow` event) or sends it a message. On 8x8, that arrives at your registered callback URL as an inbound message webhook with the LINE user ID in `user.channelUserId`.

LINE also publishes endpoints that return the user IDs of all of your friends, and of all members of a group or multi-person chat. Both are available **only to Verified or Premium accounts**, and neither is exposed through the 8x8 API.

> **Key Takeaway:** You cannot send a first message to a LINE user from a phone number. The user must add your LINE Official Account as a friend and produce an inbound event first. Capture and store the `channelUserId` from that event, because it is the only address you will have for that user.

### Consent and Profile Information

To access a LINE user's profile information, the user must have consented to allow access to it. Users of LINE for iOS and LINE for Android consent when they begin using LINE. Users who have only ever used LINE for PC cannot consent, and since April 2020 it is no longer possible to create an account on LINE for PC.

If a user has not consented, their profile information is omitted from the webhook event, which means **the webhook contains no user ID at all**. Practically, that user is unaddressable: they can add your Official Account as a friend and even send you messages, but you have no identifier to send back to.

Other causes of a missing profile, per LINE, are that the user never added your Official Account as a friend, blocked it after adding it, or left the group chat it belongs to.

### Sub-accounts and Authentication

The `line` channel is provisioned on its own 8x8 sub-account and authenticated with that sub-account's own bearer token.

- **Its own sub-account.** A LINE integration requires a new sub-account. It cannot be an existing SMS sub-account, and it is not the sub-account that serves LINE Official Notification. The `{subAccountId}` in the send URL is the LOA one.
- **Its own bearer token.** The API key that authenticates an LOA send does not authenticate a LON send. Generate it in the 8x8 Connect portal, scoped to the LOA sub-account.
- **Its own recipient key.** `/messages` on the `line` channel takes `user.channelUserId`. LON's `/lon` endpoint takes `user.msisdn` instead.

One LINE Official Account can serve both products at the same time, but each product needs its own 8x8 sub-account. See [The LINE Official Account](./concepts-fundamentals.md#the-line-official-account) for the account-level view, and [LINE Official Notification (LON)](./official-notification-lon.md) for LON's side of the split.

> **Important:** Confirm with your account manager which of these sub-accounts you have been provisioned, and which API key belongs to which. Sending a LINE Official Notification payload to `/messages`, or a LINE user ID to `/lon`, will not work.

## Message Counting and Plan Quotas

Your LINE Official Account sits on a LINE subscription plan with a monthly allowance of free messages. How LINE counts against that allowance is LINE's rule, not 8x8's, and it surprises people:

- **LINE counts by recipient, not by message object.** A single request containing four message objects sent to a chatroom of five people counts as five messages. The number of message objects in a request does not affect the count.
- **Messages that cannot be received are not counted.** If you send to a user who blocked your Official Account, or to a user ID that does not exist, that message is not counted.
- **Not all sending methods count.** LINE counts push, multicast, broadcast, and narrowcast messages toward the plan allowance. Reply messages are not counted. The 8x8 send request has no reply-token field, so an 8x8 LINE send cannot be a LINE reply message.
- **The hard stop is your total monthly ceiling, not the free allowance on its own.** LINE describes this under the heading "When you exceed the limit of free messages", but what it actually enforces is the limit of messages that can be sent in a month: once you exceed it, LINE returns an error response and the message is not sent. Plans that support additional messages let you send past the free allowance and pay per additional message, up to a **maximum number of additional messages** that you configure in LINE Official Account Manager. Your real ceiling on those plans is the free allowance plus that configured maximum. Plans that do not support additional messages have no such extension, so for them the free allowance is the ceiling.

> **Note**
>
> Plan tiers, allowances, and additional-message pricing are LINE's, they are purchased in LINE Official Account Manager, and they vary by country. LINE publishes them itself: see [LINE Official Account (Thailand)](https://lineforbusiness.com/th/service/line-oa-features/broadcast-message). Talk to your 8x8 account manager about sizing the plan for your expected volume.

<!-- NEEDS SOURCE: N2. Thailand-specific plan fees and free-message allowances are deliberately omitted. LINE's captured pricing page gives Japan examples only, and the Thailand figures available internally sit inside commercial rate cards that are not customer-facing. Link out to LINE rather than reproducing a number. -->

## Supported Types at a Glance

| Content type | Outbound | Inbound |
|---|---|---|
| **Text** | Yes | Yes |
| **Image** | Yes | Yes |
| **Video** | Yes | Yes |
| **Audio** | Yes | Yes |
| **Location** | Yes | Yes |
| **File** | **No** | **Yes** |

> **Important:** The asymmetry on **File** is real and it catches people out. A LINE user can send your Official Account a file, and you will receive it as an inbound `File` message. There is **no outbound File type** on this channel, so you cannot send one back.

For the full inbound contract, including the envelope, the field-by-field description, and the 24-hour expiry on inbound media URLs, see [Inbound Messages](./loa-webhook.md#inbound-messages).

For one complete request body per supported type, with screenshots and LINE's real limits, see [Message API Library](./message-api-library.mdx).

## Related Resources

**For Developers:**

- [Getting Started with LINE over the 8x8 API](./getting-started.md) - Authentication, base URLs, and the optional request properties
- [LINE Official Account Webhooks](./loa-webhook.md) - The full inbound contract for all six inbound types, delivery receipts, and retry behaviour
- [LINE Official Notification (LON)](./official-notification-lon.md) - Pre-approved structured notifications, the one place LINE templates exist on 8x8

**Important Concepts:**

- [The LINE Ecosystem and Account Model](./concepts-fundamentals.md) - Account types, Verified Account review, Premium ID, what a single Official Account can serve, and the Messaging API channel and channel type values underneath it

**Cross-channel References:**

- [Supported Messaging Apps Content Types](/connect/docs/supported-chat-apps-content-type) - The per-channel content type matrix, including the content types the `line` channel does not support, and character limits
- [Supported Messaging Apps](/connect/docs/list-of-supported-chatapps-channels) - Channel type values and supported directions
- [Send Message](/connect/reference/send-message) - The generated API reference for the send endpoint

**External:**

- [LINE Messaging API: Message objects](https://developers.line.biz/en/reference/messaging-api/#message-objects) - LINE's own field-level specification and limits
- [LINE Messaging API: Character counting in a text](https://developers.line.biz/en/docs/messaging-api/text-character-count/) - How LINE counts UTF-16 code units and emoji
