---
sidebar_label: 'Reference & Resources'
---

# Reference & Resources

This section provides a consolidated list of key terms, API reference links, and other resources to help you successfully build and manage your 8x8 WhatsApp solution.

## Glossary – WhatsApp & 8x8 Terms

A quick reference for the common terminology used in this documentation.

### 8x8 Terms

|Term|Definition|
|---|---|
|**8x8 Account**|Your primary customer account with 8x8.|
|**Subaccount**|A logical grouping within your 8x8 Account, used to separate billing, permissions, and API credentials (e.g., for "Dev" vs. "Prod"). All API calls are made in the context of a `subAccountId`.|
|**Channel**|A specific communication service configured within a Subaccount. For this guide, it represents your **WhatsApp Business Phone Number** that is linked to 8x8.|
|**8x8 Connect**|The all-in-one web portal for managing your 8x8 services, including creating API keys, managing templates, and running campaigns.|
|**8x8 Converse**|8x8's omnichannel agent desktop for managing two-way customer conversations (including WhatsApp) in a ticket-based system.|
|**Automation Builder**|A visual, no-code workflow builder in 8x8 Connect used to create chatbots and automated processes.|
|**Campaigns**|A tool in 8x8 Connect (formerly Multi-Channel Sender or MCS) for sending bulk messages to a list of recipients.|
|**Webhook**|A URL on your server that 8x8 sends `POST` requests to, notifying your application of real-time events like an incoming message or a delivery status change.|
|**UMID**|(Unique Message ID) The unique identifier 8x8 assigns to every message, which is returned in API responses and webhooks.|

### Meta / WhatsApp Terms

|Term|Definition|
|---|---|
|**Meta Business Portfolio**|(Formerly Meta Business Manager). The top-level Meta-hosted account used to manage all your business assets, including ad accounts and WhatsApp Business Accounts (WABAs).|
|**WABA**|**WhatsApp Business Account.** The specific account within your Meta Business Portfolio that holds your phone numbers, templates, and quality ratings.|
|**WhatsApp Business Platform**|The overall Meta service and infrastructure that businesses use to connect to WhatsApp.|
|**Meta Cloud API**|The specific Meta-hosted API that 8x8 integrates with to provide the WhatsApp service. All functionality described in this documentation is based on the Cloud API.|
|**MM Lite API**|A specialized, high-throughput Meta API for marketing messages. This is a separate Meta product and is **not** part of the 8x8 integration described in this documentation.|
|**Template Message**|A pre-approved message (in a specific `category`) required to initiate a conversation with a user or reply outside the 24-hour window.|
|**Interactive Message**|A "freeform" (non-template) message that can only be sent *inside* the 24-hour window. Includes text, media, buttons, and lists.|
|**Customer Service Window**|The 24-hour period after a user sends a message, during which you can reply with freeform Interactive Messages.|
|**Authentication Template**|A template category for sending One-Time Passcodes (OTPs).|
|**Marketing Template**|A template category for any promotional content or offers.|
|**Utility Template**|A template category for non-promotional, transactional updates (e.g., order confirmation, shipping alert).|
|**Messaging Limit**|The maximum number of *unique users* a business can initiate conversations with in a 24-hour period. This limit is set at the Portfolio level and is tiered (e.g., 250, 2k, 10k, Unlimited).|
|**Quality Rating**|A (High, Medium, Low) rating for your phone number, based on customer feedback (e.g., blocks). Low quality can lead to a `PAUSED` template status.|

## API Reference Links

This documentation provides tutorials and cookbooks. For the complete, detailed API specifications, please refer to the primary API reference guides.

- **Send Message (Template & Interactive):** `POST /subaccounts/{subAccountId}/messages`

  - See: [Sending a Template Message via API](./whatsapp-over-8x8-api.md#sending-a-template-message-via-api)
  - See: [Template Message API Library](./template-message-api-library.mdx)

- **Send Interactive Message:** `POST /subaccounts/{subAccountId}/messages`

  - See: [User-initiated Conversations: Interactive Messages](./whatsapp-over-8x8-api.md#user-initiated-conversations-interactive-messages)
  - See: [Interactive Message API Library](./interactive-message-api-library.mdx)

- **Create Template:** `POST /accounts/{accountId}/channels/{channelId}/templates`

  - See: [Creating a Template via API](./whatsapp-over-8x8-api.md#creating-a-template-via-api)
  - See: [Template Message API Library](./template-message-api-library.mdx)

- **Upload Media:** `POST /subaccounts/{subAccountId}/files`

  - See: [Media Hosting & Management](./whatsapp-media-hosting.md)

- **Webhooks (Inbound & Status):**

  - See: [Webhooks Reference](./whatsapp-webhooks.md)
  - See: [Operations, Monitoring & Troubleshooting](./operations-monitoring.md)
