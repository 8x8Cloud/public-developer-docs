---
sidebar_label: 'Reference & Resources'
---

# LINE Reference and Resources

A lookup companion for the LINE section. LINE and 8x8 use different words for overlapping objects, and the object LINE calls a user ID is the field 8x8 calls `channelUserId`. This page gives you the vocabulary on both sides and the mapping between them.

## Glossary: LINE Terms

|Term|Definition|
|---|---|
|**LINE Official Account (OA)**|The LINE account that represents your business. Users add it as a friend, and messages are exchanged with those friends. On the 8x8 platform this is the `line` channel type value.|
|**Unverified Account**|An Official Account that has not been reviewed by LINE. Available to any company, organization, or individual. Does not appear in LINE in-app search results.|
|**Verified Account**|An Official Account that has passed LINE's review. Receives a Verified account badge and appears in LINE in-app search results. Review applications are accepted only for Japan, Taiwan, and Thailand, and take about 10 business days.|
|**Premium Account**|A tier that LINE may assign against criteria it sets. LINE states it has no responsibility to disclose those criteria. You cannot apply for it the way you apply for a Verified Account.|
|**Basic ID**|The account ID that LINE assigns to an Official Account automatically.|
|**Premium ID**|A purchased account ID of your own choosing, replacing the basic ID. Up to 18 characters using half-width letters, numbers, dots, hyphens, and underscores. USD 12 per year, auto-renewing annually, non-refundable, and not changeable while in use. On the 8x8 provisioning form this is the **OA ID** field.|
|**Business ID**|LINE's common login for its business and developer services, including LINE Official Account Manager and the LINE Developers Console. Up to 100 Official Accounts can be created under one Business ID.|
|**Provider**|The LINE entity that owns your channels. Significant because LINE issues a **different** user ID for the same person under a different provider.|
|**Channel**|A communication path used to access features of the LINE Platform. Types include the Messaging API channel, the LINE Login channel, and the LINE MINI App channel.|
|**Messaging API channel**|The channel created when you enable the Messaging API on an Official Account. This is what 8x8 connects to.|
|**Channel ID**|The unique identifier of a Messaging API channel, found in LINE Official Account Manager under Settings > Messaging API (also visible in the LINE Developers Console). Required by 8x8 when you bring your own Official Account.|
|**Channel Secret**|A private key known only to LINE and the developer, found on the channel's Basic settings tab. LINE uses it as the hash key when signing webhooks. Admin privileges are required to retrieve or reissue it.|
|**Channel access token**|An opaque string proving an application may use a channel. LINE issues four kinds, with lifetimes from 15 minutes to indefinite. 8x8 manages these on your behalf.|
|**User ID**|LINE's opaque identifier for a user, format `U[0-9a-f]{32}`. Distinct from a display name and from the LINE ID a user registers to be searchable. On the 8x8 platform it is `channelUserId`, in both directions: you send to `user.channelUserId` and it arrives back in `payload.user.channelUserId`.|
|**Friend**|A LINE user who has added your Official Account. Messages are exchanged with friends, and deleting the account deletes all of them.|
|**Follow event**|LINE's webhook event fired when a user adds your Official Account as a friend. This is the moment a user ID first becomes available to you.|
|**OA Chat package**|A separately purchased subscription add-on for an Official Account, bought in LINE Official Account Manager. If cancelled, it remains usable to the end of the current month, and tags and notes already created are not deleted.|
|**LINE Official Account Manager**|LINE's own console for an Official Account. Where you enable the Messaging API and retrieve the Channel ID, Channel Secret, and Webhook URL for it, manage the profile and search visibility, purchase plans and Premium IDs, manage administrators, and view Insights.|
|**LINE Developers Console**|LINE's advanced console for channels, also covering other channel types such as LINE Login and LINE MINI App. The Channel ID, Channel Secret, and Webhook URL for a Messaging API channel are visible here too, but LINE Official Account Manager's Messaging API settings page is the primary place 8x8 documentation points you to.|
|**Insights**|LINE's own account statistics, inside LINE Official Account Manager. One of only two features that remain usable after an Official Account is deleted, the other being billing.|
|**Collaborative Account**|An advertising menu LINE provides separately, which enables the narrow published exceptions to LINE's prohibition on advertising for third parties.|

## Glossary: 8x8 Terms

|Term|Definition|
|---|---|
|**8x8 Account**|Your primary customer account with 8x8.|
|**Sub-account**|A logical grouping within your 8x8 Account that owns credentials and channels. All Messaging Apps calls are made in the context of a `subAccountId`. LINE requires a new sub-account, not an existing SMS sub-account, and LINE Official Notification requires its own sub-account separate from the LINE Official Account channel.|
|**Channel type value**|The string that identifies a channel in the platform. `line` for the LINE Official Account channel, `LineNotification` for LINE Official Notification, and `Line` in the `channels` fallback override array.|
|**API key**|The bearer token that authenticates a Messaging Apps request, generated per sub-account in the 8x8 Connect portal and sent as `Authorization: Bearer {apiKey}`.|
|**`umid`**|The unique message ID, a GUID generated by the 8x8 platform when a message is submitted. Returned in the send response, and repeated in every delivery receipt on channels that produce one.|
|**`clientMessageId`**|Your own reference for a message, maximum 50 characters. Echoed back in the send response, and in delivery receipts on channels that produce one.|
|**`batchId` and `clientBatchId`**|The equivalent identifiers for a batch of messages, 8x8-generated and customer-supplied respectively. Present in delivery receipts for messages sent as a batch.|
|**Delivery receipt (DR)**|A `POST` webhook the 8x8 platform sends to your callback URL when a message's status changes. Carries `eventType` of `outbound_message_status_changed`, currently in the v9 format. Both LINE products produce delivery receipts. The `line` channel reports Accepted and Sent. LINE Official Notification additionally reports Delivered.|
|**Inbound message webhook**|A `POST` webhook the 8x8 platform sends to your callback URL when a user sends a message. Carries `eventType` of `inbound_message_received`, currently in the v3 format.|
|**Callback URL**|The URL on your server where 8x8 delivers webhooks. One URL serves every Messaging Apps channel, and the channel field identifies the source. Registered with the Webhooks Configuration API, and overridable per message with `dlrCallbackUrl`.|
|**Channel fallback**|A configured sequence of channels used to reach a recipient, with a wait time between each. Set up by the 8x8 team, and overridable per message with the `channels` array. The `line` channel reports Accepted and Sent, which the fallback chain can use to evaluate whether to proceed.|
|**8x8 Connect**|The customer portal, where you generate API keys, manage sub-accounts, and view Messaging Apps analytics.|
|**Messaging Apps**|The 8x8 product that provides messaging over LINE, WhatsApp, Viber, RCS, Zalo, and other chat channels.|

## Term Mapping

The same object often has one name in LINE's console and another in an 8x8 payload. This table is the bridge.

| LINE term | Where it surfaces on 8x8 |
|---|---|
| **LINE user ID** | `user.channelUserId` on the send request, and `payload.user.channelUserId` on inbound messages. On delivery receipts from the `line` channel it appears as `payload.user.channelUserId`, and a LON receipt carries `msisdn` instead |
| **LINE Official Account** | The `line` channel type value, and the channel configured on your sub-account |
| **Messaging API channel** | `payload.recipient.channelId` on inbound messages |
| **Channel ID and Channel Secret** | Supplied to 8x8 during provisioning. Not exposed in any 8x8 payload |
| **Channel access token** | Not exposed. 8x8 authenticates to LINE for you; your application uses an 8x8 API key instead |
| **Premium ID** | The **OA ID** field on the 8x8 provisioning information sheet |
| **Basic ID** | No 8x8 equivalent. Assigned by LINE and visible in LINE Official Account Manager |
| **LINE subscription plan and message allowance** | No 8x8 equivalent field. Managed in LINE Official Account Manager |
| **LINE Insights** | No 8x8 equivalent. 8x8 volume reporting is separate, in [Messaging Apps Analytics](/connect/docs/messaging-apps) |
| **Follow event** | Surfaces as an inbound message webhook carrying `channelUserId`. LINE's raw event types are not passed through |
| **LINE audio `duration` (milliseconds)** | `content.audio.duration` in **seconds**. Do not copy a value across |
| **LINE location `title`** | `content.location.name` |

## API Reference Links

This section documents guides and payload catalogues. For the complete generated specification, use the API reference.

- **Send LINE Official Account message:** `POST /api/v1/subaccounts/{subAccountId}/messages`

  - See: [Send Your First Message](./getting-started.md#send-your-first-message)
  - See: [LINE Official Account: Behaviour, Messages, and Constraints](./loa-messaging.md)
  - See: [Send Message API reference](/connect/reference/send-message)

- **Send LINE Official Notification message:** `POST /api/v1/subaccounts/{subAccountId}/lon`

  - See: [Request Body](./official-notification-lon.md#request-body)
  - See: [Icon Values](./official-notification-lon.md#icon-values)
  - See: [Send LON Message API reference](/connect/reference/send-lon-message)

- **Register a webhook callback URL:** `POST /api/v1/accounts/{accountId}/webhooks`

  - See: [Configuring Your Webhook](./loa-webhook.md#configuring-your-webhook)
  - See: [Inbound Messages](./loa-webhook.md#inbound-messages)
  - See: [LON Delivery Receipts](./lon-webhook.md)
  - See: [Webhooks Configuration API reference](/connect/reference/add-webhooks-1)

## Additional Resources

**8x8 Cross-channel References:**

- [Supported Messaging Apps](/connect/docs/list-of-supported-chatapps-channels) - Channel type values and supported directions
- [Supported Messaging Apps Content Types](/connect/docs/supported-chat-apps-content-type) - Per-channel content types and character limits
- [Inbound Messaging Apps message](/connect/docs/inbound-chatapps-message) - The canonical v3 inbound envelope
- [Delivery receipts for Outbound Messaging Apps](/connect/docs/delivery-receipts-for-outbound-chatapps) - The canonical v9 delivery receipt envelope
- [Message status reference](/connect/reference/message-status-references) - The `status` object and its enumerations
- [Messaging Apps Delivery Error Codes](/connect/docs/delivery-error-codes#general-error-codes) - Delivery receipt error codes
- [Getting started with Messaging API](/connect/docs/messaging-apps-api-get-started) - Cross-channel authentication and server regions

**LINE's Own References:**

- [LINE Messaging API reference](https://developers.line.biz/en/reference/messaging-api/) - Field-level specification, limits, and rate limits
- [LINE Official Account Guidelines](https://terms2.line.me/official_account_guideline_th?lang=en) - Account types, screening, prohibited activities, and penalties
- [LINE Official Account Premium ID Terms of Use](https://terms2.line.me/official_account_premiumid_terms_oth) - Premium ID rules and fees
- [LINE Official Account Manager](https://manager.line.biz/) - The Official Account console
- [LINE Developers Console](https://developers.line.biz/console/) - The channel console
