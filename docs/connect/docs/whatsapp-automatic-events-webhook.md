# WhatsApp Automatic Events Webhook

**WhatsApp Automatic Events Webhooks** are notifications sent to you when Meta detects a qualifying conversion event (a **purchase** or a **lead**) inside a WhatsApp thread originating from a Click-to-WhatsApp ad. 8x8 forwards these detected events to your configured endpoint so you can ingest conversion data into your own analytics and attribution systems.

These events are delivered as a **raw passthrough**: 8x8 wraps each event in a standard, provider-agnostic envelope but carries Meta's original payload untouched inside `eventDetails.rawEvent`. This page documents the envelope and how the `automatic_events` payload is represented inside it.

### Requirements

To receive WhatsApp Automatic Events webhooks, you need:

- An account configured to use the Chat Apps product.
- A webhook configured to receive **Chat Apps Business Management Updates** (webhook type `CABM`).

> 📘
>
> You can configure your callback using the [Webhooks Configuration API](/connect/reference/add-webhooks-1). Business Management Updates (`CABM`) are only added when explicitly requested.
>

> 📘
>
> The `automatic_events` field must be **explicitly subscribed at the WhatsApp Business Account (WABA) level** in Meta, and the business must have opted in to automatic events in WhatsApp Business Manager (**Settings → Privacy and Data Sharing**). Meta's automatic event detection is proprietary and is not configurable by 8x8 or the business.
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
| eventType         | string         | Type of event. Equal to `whatsapp_automatic_events`.                                                          |
| eventDetails      | object         | Event related information. Contains a single `rawEvent` object, see below.                                    |

`eventDetails` object description

| Parameter name | Parameter type | Description                                                                                                        |
|:---------------|:---------------|:-------------------------------------------------------------------------------------------------------------------|
| rawEvent       | object         | Meta's original webhook `change` object, carried through verbatim. Contains Meta's `value` and `field` properties. |

> 🚧
>
> **`eventDetails.rawEvent` is a verbatim passthrough of Meta's payload.** The envelope fields above use 8x8's `camelCase` convention, but everything inside `rawEvent` keeps **Meta's original `snake_case`** exactly as received (`messaging_product`, `phone_number_id`, `event_name`, `ctwa_clid`, `custom_data`, …). 8x8 does not parse, rename, reshape, or validate the contents of `rawEvent`. Meta's detection logic is proprietary and the fields present depend on the event — refer to [Meta's Automatic Events API documentation](https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/automatic-events-api) for the authoritative field definitions.
>

`event_name` values

The detected conversion events arrive inside `rawEvent.value.automatic_events[]`. Each item carries an `event_name`:

| Value           | Meaning                                                                                                                                | Meta reference                                                                                                                                                      |
|:----------------|:---------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `LeadSubmitted` | A qualifying lead action, such as submitting a form or sharing contact details.                                                        | [Lead gen event structure](https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/automatic-events-api#lead-gen-event-structure) |
| `Purchase`      | A completed purchase, such as a payment or confirmed order. Carries a `custom_data` object with the conversion `currency` and `value`. | [Purchase event structure](https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/automatic-events-api#purchase-event-structure) |

### Sample Webhooks

#### Lead submitted

Emitted when Meta detects a qualifying lead action. The `rawEvent.value.automatic_events[]` item carries `event_name: "LeadSubmitted"` and no `custom_data`.

```json title="LeadSubmitted — CABM webhook"
{
    "eventId": "9cebdae7-2b56-4dad-a9ed-b47400a144c5",
    "timestamp": "2026-06-09T10:13:20.00Z",
    "provider": "WhatsApp",
    "businessAccountId": <WHATSAPP_BUSINESS_ACCOUNT_ID>,
    "accountId": <SUBACCOUNT_ID>,
    "eventType": "whatsapp_automatic_events",
    "eventDetails": {
        "rawEvent": {
            "value": {
                "messaging_product": "whatsapp",
                "metadata": {
                    "display_phone_number": <BUSINESS_DISPLAY_PHONE_NUMBER>,
                    "phone_number_id": <BUSINESS_PHONE_NUMBER_ID>
                },
                "automatic_events": [
                    {
                        "id": "wamid.HBgLMTIwNjY3NzQ3OTgVAgASGBQzQUY3MDVCQzFBODE5ODU4MUZEOQA=",
                        "event_name": "LeadSubmitted",
                        "timestamp": 1749069089,
                        "ctwa_clid": "Afc3nYt4TTydumlFFsatFz8bR2yHCtVA92Veu_zDE4DgAI-QqCwM6eC3-K3lTGHRiLxRTVXFEsdyKQQSa-2obZyuGBq_EYypt_OwbMihBV0pbUoRmrGnEjwFTHop-Px0TfA"
                    }
                ]
            },
            "field": "automatic_events"
        }
    }
}
```

#### Purchase

Emitted when Meta detects a completed purchase. The `rawEvent.value.automatic_events[]` item carries `event_name: "Purchase"` and a `custom_data` object with the conversion `currency` and `value`.

```json title="Purchase — CABM webhook"
{
    "eventId": "cf399bd9-23d6-4f24-af6d-b47a0096730a",
    "timestamp": "2026-06-09T10:13:20.00Z",
    "provider": "WhatsApp",
    "businessAccountId": <WHATSAPP_BUSINESS_ACCOUNT_ID>,
    "accountId": <SUBACCOUNT_ID>,
    "eventType": "whatsapp_automatic_events",
    "eventDetails": {
        "rawEvent": {
            "value": {
                "messaging_product": "whatsapp",
                "metadata": {
                    "display_phone_number": <BUSINESS_DISPLAY_PHONE_NUMBER>,
                    "phone_number_id": <BUSINESS_PHONE_NUMBER_ID>
                },
                "automatic_events": [
                    {
                        "id": "wamid.HBgLMTIwNjY3NzQ3OTgVAgARGBIwRkU4NDI5Nzk3RjZDMzE2RUMA",
                        "event_name": "Purchase",
                        "timestamp": 1749069131,
                        "ctwa_clid": "Afc3nYt4TTydumlFFsatFz8bR2yHCtVA92Veu_zDE4DgAI-QqCwM6eC3-K3lTGHRiLxRTVXFEsdyKQQSa-2obZyuGBq_EYypt_OwbMihBV0pbUoRmrGnEjwFTHop-Px0TfA",
                        "custom_data": {
                            "currency": "USD",
                            "value": 25000
                        }
                    }
                ]
            },
            "field": "automatic_events"
        }
    }
}
```

### Reference

Because `rawEvent` is a verbatim passthrough, the authoritative definition of the event lives in Meta's documentation:

- [Meta's Automatic Events API documentation](https://developers.facebook.com/documentation/business-messaging/whatsapp/embedded-signup/automatic-events-api)
- [Managing Webhooks](https://developers.facebook.com/docs/graph-api/webhooks/getting-started)
