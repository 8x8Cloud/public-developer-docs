# WhatsApp Business-scoped user IDs

A **business-scoped user ID (BSUID)** is Meta's per-business identifier for a WhatsApp user. It can accompany — or, for username-only users, replace — the phone number (`wa_id`). WhatsApp emits several webhook events that carry or update a user's BSUID, and the 8x8 platform forwards these to you on the **Messaging Apps Business Management Updates** callback (webhook type `CABM`).

These events are delivered as a **raw passthrough**: 8x8 wraps each event in a standard, provider-agnostic envelope but carries Meta's original payload untouched inside `eventDetails.rawEvent`. This page documents the envelope and the three BSUID-related events currently forwarded: `user_id_update`, `contacts`, and `user_preferences`.

### Requirements

To receive these webhooks, you need:

- An account configured to use the Messaging Apps product.
- A webhook configured to receive **Messaging Apps Business Management Updates** (webhook type `CABM`).

> 📘
>
> You can configure your callback using the [Webhooks Configuration API](/connect/reference/add-webhooks-1). Business Management Updates (`CABM`) are only added when explicitly requested.
>

### Retry logic

In case of connection error/timeout or HTTP response code 4XX or 5XX, there will be multiple retry attempts with progressive intervals: 1, 10, 30, 90 sec.

### Webhook format

Request body description

| Parameter name    | Parameter type | Description                                                                                                   |
|:------------------|:---------------|:--------------------------------------------------------------------------------------------------------------|
| eventId           | string         | Unique event identifier.                                                                                      |
| timestamp         | string         | Timestamp of event in ISO 8601 format.                                                                        |
| provider          | string         | Provider of this event. Equal to `WhatsApp`.                                                                  |
| businessAccountId | string         | Business account identifier associated with the provider. Represents the WhatsApp Business Account (WABA) Id. |
| accountId         | string         | AccountId which the event is associated with.                                                                 |
| eventType         | string         | Type of event. One of `user_id_update`, `contacts`, or `user_preferences`. See below.                         |
| eventDetails      | object         | Event related information. Contains a single `rawEvent` object, see below.                                    |

`eventDetails` object description

| Parameter name | Parameter type | Description                                                                                                        |
|:---------------|:---------------|:-------------------------------------------------------------------------------------------------------------------|
| rawEvent       | object         | Meta's original webhook `change` object, carried through verbatim. Contains Meta's `value` and `field` properties. |

> 🚧
>
> **`eventDetails.rawEvent` is a verbatim passthrough of Meta's payload.** The envelope fields above use 8x8's `camelCase` convention, but everything inside `rawEvent` keeps **Meta's original `snake_case`** exactly as received (`messaging_product`, `phone_number_id`, `wa_id`, `from_user_id`, `user_id`, …). 8x8 does not parse, rename, reshape, or validate the contents of `rawEvent`. Refer to Meta's documentation (see [Reference](#reference)) for the complete field definitions of each event's `field` and message `type`.
>

`eventType` values

| Value                     | Meaning                                                                                                                    | Meta reference                                                                                                                                          |
|:--------------------------|:---------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `whatsapp_user_id_update` | A user's BSUID has rotated (for example, after the user changes their phone number). Carries previous/current IDs.         | [UserId update webhook](https://developers.facebook.com/documentation/business-messaging/whatsapp/business-scoped-user-ids/#user_id_update-webhooks)    |
| `whatsapp_contact`        | An inbound message of `type: contacts` (a shared contact card / `REQUEST_CONTACT_INFO` response), carrying `from_user_id`. | [Contacts webhook](https://developers.facebook.com/documentation/business-messaging/whatsapp/business-scoped-user-ids/#contacts-webhook)                |
| `whatsapp_preference`     | The user changed a marketing preference (opt-in / opt-out), linked to the BSUID.                                           | [User preference webhook](https://developers.facebook.com/documentation/business-messaging/whatsapp/business-scoped-user-ids#user_preferences-webhooks) |

### Sample Webhooks

#### user_id_update

Emitted when a user's BSUID rotates. The `rawEvent.value.user_id_update[]` array carries the `previous`/`current` `user_id` (and `parent_user_id` when parent BSUIDs are enabled).

```json title="user_id_update — CABM webhook"
{
    "eventId": "9917fd42-0cec-46e4-ae12-b48000ec5d95",
    "timestamp": "2026-01-22T22:51:55.00Z",
    "provider": "WhatsApp",
    "businessAccountId": <WHATSAPP_BUSINESS_ACCOUNT_ID>,
    "accountId": <SUBACCOUNT_ID>,
    "eventType": "whatsapp_user_id_update",
    "eventDetails": {
        "rawEvent": {
            "value": {
                "messaging_product": "whatsapp",
                "metadata": {
                    "display_phone_number": <BUSINESS_DISPLAY_PHONE_NUMBER>,
                    "phone_number_id": <BUSINESS_PHONE_NUMBER_ID>
                },
                "contacts": [
                    {
                        "profile": {
                            "name": <WHATSAPP_USER_NAME>,
                            "username": <WHATSAPP_USERNAME>
                        },
                        "wa_id": <WHATSAPP_USER_PHONE_NUMBER>
                    }
                ],
                "user_id_update": [
                    {
                        "wa_id": <WHATSAPP_USER_PHONE_NUMBER>,
                        "detail": "User id for <WHATSAPP_USER_NAME> has been updated.",
                        "user_id": {
                            "previous": <OLD_BSUID>,
                            "current": <NEW_BSUID>
                        },
                        "parent_user_id": {
                            "previous": <OLD_PARENT_BSUID>,
                            "current": <NEW_PARENT_BSUID>
                        },
                        "timestamp": <WEBHOOK_SENT_TIMESTAMP>
                    }
                ]
            },
            "field": "user_id_update"
        }
    }
}
```

#### contacts

An inbound `messages` event whose message `type` is `contacts`. Note the `field` is `messages` (this is an inbound message), while `eventType` is set to the message type `contacts`. The user's BSUID appears as `from_user_id` (and `user_id` on the top-level `contacts[]`).

```json title="contacts — CABM webhook"
{
    "eventId": "9917fd42-0cec-46e4-ae12-b48000ec5d95",
    "timestamp": "2026-01-22T22:51:55.00Z",
    "provider": "WhatsApp",
    "businessAccountId": <WHATSAPP_BUSINESS_ACCOUNT_ID>,
    "accountId": <SUBACCOUNT_ID>,
    "eventType": "whatsapp_contact",
    "eventDetails": {
        "rawEvent": {
            "value": {
                "messaging_product": "whatsapp",
                "metadata": {
                    "display_phone_number": <BUSINESS_DISPLAY_PHONE_NUMBER>,
                    "phone_number_id": <BUSINESS_PHONE_NUMBER_ID>
                },
                "contacts": [
                    {
                        "profile": {
                            "name": <WHATSAPP_USER_NAME>,
                            "username": <WHATSAPP_USERNAME>
                        },
                        "wa_id": <WHATSAPP_USER_PHONE_NUMBER>,
                        "user_id": <WHATSAPP_BSUID>
                    }
                ],
                "messages": [
                    {
                        "context": {
                            "forwarded": true
                        },
                        "id": <MESSAGE_ID>,
                        "timestamp": <WEBHOOK_SENT_TIMESTAMP>,
                        "type": "contacts",
                        "from": <WHATSAPP_USER_PHONE_NUMBER>,
                        "from_user_id": <WHATSAPP_BSUID>,
                        "contacts": [
                            {
                                "name": {
                                    "first_name": <CONTACT_FIRST_NAME>,
                                    "formatted_name": <CONTACT_FORMATTED_NAME>
                                },
                                "vcard": <CONTACT_VCARD>,
                                "origin": "other",
                                "phones": [
                                    {
                                        "phone": <CONTACT_PHONE_NUMBER>,
                                        "wa_id": <CONTACT_WA_ID>,
                                        "type": "CELL"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "field": "messages"
        }
    }
}
```

#### user_preferences

Emitted when the user changes a marketing preference. The `rawEvent.value.user_preferences[]` array carries the `category`, the `value` (for example `stop`), and the `user_id` (BSUID) the change applies to.

```json title="user_preferences — CABM webhook"
{
    "eventId": "9917fd42-0cec-46e4-ae12-b48000ec5d95",
    "timestamp": "2026-01-22T22:51:55.00Z",
    "provider": "WhatsApp",
    "businessAccountId": <WHATSAPP_BUSINESS_ACCOUNT_ID>,
    "accountId": <SUBACCOUNT_ID>,
    "eventType": "whatsapp_preference",
    "eventDetails": {
        "rawEvent": {
            "value": {
                "messaging_product": "whatsapp",
                "metadata": {
                    "display_phone_number": <BUSINESS_DISPLAY_PHONE_NUMBER>,
                    "phone_number_id": <BUSINESS_PHONE_NUMBER_ID>
                },
                "contacts": [
                    {
                        "profile": {
                            "name": <WHATSAPP_USER_NAME>,
                            "username": <WHATSAPP_USERNAME>
                        },
                        "wa_id": <WHATSAPP_USER_PHONE_NUMBER>,
                        "user_id": <WHATSAPP_BSUID>,
                        "parent_user_id": <WHATSAPP_PARENT_BSUID>
                    }
                ],
                "user_preferences": [
                    {
                        "wa_id": <WHATSAPP_USER_PHONE_NUMBER>,
                        "user_id": <WHATSAPP_BSUID>,
                        "parent_user_id": <WHATSAPP_PARENT_BSUID>,
                        "detail": "User requested to stop receiving marketing messages",
                        "category": "marketing_messages",
                        "value": "stop",
                        "timestamp": <WEBHOOK_SENT_TIMESTAMP>
                    }
                ]
            },
            "field": "user_preferences"
        }
    }
}
```

### Reference

Because `rawEvent` is a verbatim passthrough, the authoritative definition of each event lives in Meta's documentation:

- [WhatsApp Business-scoped user IDs](https://developers.facebook.com/documentation/business-messaging/whatsapp/business-scoped-user-ids/)
- [`user_id_update` webhooks](https://developers.facebook.com/documentation/business-messaging/whatsapp/business-scoped-user-ids/#user_id_update-webhooks)
- [Contacts webhook](https://developers.facebook.com/documentation/business-messaging/whatsapp/business-scoped-user-ids/#contacts-webhook)
- [Messages webhook reference](https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/messages)
