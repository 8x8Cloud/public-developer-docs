# Migrate from version 1 to version 2

## [Back to All](/contactcenter/changelog) Migrate from version 1 to version 2

If you used [Chat API V1](/contactcenter/docs/getting-started) you can still use it as [Chat API V2](/contactcenter/v2.0/docs) comes out, version 1 is still supported but deprecated, and we strongly recommend you to migrate and start using the new API as version 1 will be decommissioned in future.

## What Changed

### Multiregion support

While in version 1, Chat-API was offered only in US, in version 2 we extended the support for all customers from all regions, so knowing where your setup is, you will have to pass the region prefix in the API path. Checkout [API reference](/contactcenter/reference)!

### Channels & Webhooks

**Hooks** added in version 1 have been split into **Webhook** and **Channel** entities. Aimed to bring more clarity and to allow more flexibility.  

Now you can have one Webhook setup and assign it to multiple channels, and each channel can have a distinct routing option. This also aligns the Hooks from V1 with what a **channel** means in Contact Center.

Your existing **Hooks** created using the [V1 API](/contactcenter/reference/subscribeusingpost) can now be fetched using the [V2 Channels API](/contactcenter/reference/getchatapichannels). For each **Channel** a **Webhook** (as defined in V2 documentation) was created and assigned to the channel, having the same URL as the legacy **[Webhook subscription](/contactcenter/reference/getusingget)**.

### Conversation

While in version V1 your conversation was virtualized and you had to keep track of the **Sender & Recipient** tuple in order to start, end, or add a message to a conversation, in version V2 conversation is a resource in itself so after you create it, you receive its ID and using it you can add messages, or fetch details about it, so check out the new **[conversation API](/contactcenter/reference/getcctransactions)**.

#### What's new in Conversation API

As **[conversation API](/contactcenter/reference/getcctransactions)** became more robust, now besides creating a conversation and adding messages to it, you will also be able to:

* retrieve details about the conversation like
  * Channel ID
  * Start time
  * Customer information (name, email, phone etc)
  * List of interaction
    * You can use **[All interactions API](https://support.8x8.com/cloud-contact-center/virtual-contact-center/developers/8x8-contact-center-statistics-reporting-api#List_all_interactions)** to see statistics regarding each interaction
* Retrieve participants list
  * See what participants were involved in conversations (customer, bot agent) and details about them
* Retrieve the list of messages within a conversation

### Security

#### Accessing our APIs

In version 1, you had to obtain an API key from your sales representative and generate a token using the [authorized API](/contactcenter/reference/authorizeusingpost). You had to use both API key and the token when accessing the API. We simplified that in V2.  

You will have to [create an API Key](/contactcenter/v2.0/docs/api-key) yourself and use that to generate an OAuth [access token](/contactcenter/reference/createaccesstoken). This token will be used to access the rest of the APIs.

#### Validating our notifications in YOUR application

We know that your API can't be public and you will have to verify the Integrity, Confidentiality, Idempotency, Non-repudiation, and Authenticity of those events. That's why in V2 we sign our events and [allow you to validate the callback notifications](/contactcenter/v2.0/docs/verify-webhook-callbacks).

### Switch Event's version

After you have a look at the new [Webhook Events Reference](/contactcenter/v2.0/docs/webhook-events-reference) and you decide that you want to migrate your webhook version as so to receive the new events that include signature, you can do that in two ways.

1. Change the version using [Configuration Manager](/contactcenter/v2.0/docs/create-a-webhook) or [Webhook update API](/contactcenter/reference/updatewebhook) to update your webhook;
2. [Create a new webhook](/contactcenter/reference/createwebhook) configured to use the V2 notification version, and [update your channel](/contactcenter/reference/updatechatapichannel) to use the new webhook resource.

We strongly recommend you do the latter since once V2 comes out we won't allow you to create webhooks with older versions or to downgrade the version, as we want our customers to use the new security feature that we introduced.

### Notes

This post gives some brief guidance for our beta customers who have used the previous version to help them to migrate, but for both old and new users we recommend reading the [Chat API V2 guides](/contactcenter/v2.0/docs) and [API reference](/contactcenter/reference).
