# Viber Template Status Webhook

**Viber Template Status Webhook** notifications are sent to you when Viber moderates a message template you registered, so your systems stay in sync without polling.

> 📘
>
> This is the moderation outcome for a *template*. For delivery receipts on messages you send, see [Delivery receipts for outbound Chat Apps](/connect/docs/delivery-receipts-for-outbound-chatapps). For inbound customer messages, see [Inbound Messaging Apps message](/connect/docs/inbound-chatapps-message).

### Requirements

To receive Viber template status webhooks, you need:

- An account configured to use the Chat Apps product with Viber enabled.
- A webhook configured to indicate which URL 8x8 should send Chat Apps Business Management Updates to.

> 📘
>
> You can configure your callback using the [Webhooks Configuration API](/connect/reference/add-webhooks-1)
>

### Retry logic

In case of connection error/timeout or HTTP response code 4XX or 5XX, there will be multiple retry attempts with progressive intervals: 1, 10, 30, 90 sec.

### Webhook format

Request body description

| Parameter name | Parameter type | Description |
| :--- | :--- | :--- |
| eventId | string | Unique event identifier. |
| timestamp | string | Timestamp of event in ISO 8601 format. |
| provider | string | Provider of this event. Equal to `viber`. |
| businessAccountId | string | The Viber Service ID the template belongs to. |
| accountId | string | AccountId which the event is associated with. |
| eventType | string | Webhook type. Equal to `template_status_update`. |
| eventDetails | object | Event related information, see below. |

`eventDetails` object description

| Parameter name | Parameter type | Description |
| :--- | :--- | :--- |
| templateName | string | The customer-facing name you gave the template at creation. |
| templateLanguage | string | The template's language code (e.g. `en`). |
| viber | object | Viber-specific information related to the event, see below. |

`viber` object description

| Parameter name | Parameter type | Description |
| :--- | :--- | :--- |
| status | string | New template status. Possible values: `PENDING`, `APPROVED`, `REJECTED`. |

### Status values

Viber reports moderation outcomes as one of three callback types, which 8x8 maps to a template status:

| Viber callback type | Resulting `viber.status` |
| :--- | :--- |
| `1002` — template created, queued for moderation | `PENDING` |
| `1000` — template approved | `APPROVED` |
| `1001` — template rejected | `REJECTED` |

These are the same three statuses returned by [Retrieving Templates via API](/connect/docs/viber-templates-management#retrieving-templates-via-api). A template must reach `APPROVED` before you can send with it — sending against a `PENDING` or `REJECTED` template is rejected before the request reaches Viber.

> 📘
>
> The event identifies the template by **name**, not by Viber's internal template identifier — the raw Viber UUID from the callback is not included in the payload. If the UUID can't be matched to a template 8x8 has stored, no status update or webhook is sent for that event.

### Sample webhooks

#### Pending

Sent when Viber first receives the template and queues it for moderation.

```json title="Viber template status webhook body — pending"
{
    "eventId": <EVENT_ID>,
    "timestamp": "2026-08-20T09:12:49.00Z",
    "provider": "viber",
    "businessAccountId": <BUSINESS_ACCOUNT_ID>,
    "accountId": <ACCOUNT_ID>,
    "eventType": "template_status_update",
    "eventDetails": {
        "templateName": <TEMPLATE_NAME>,
        "templateLanguage": <TEMPLATE_LANGUAGE>,
        "viber": {
            "status": "PENDING"
        }
    }
}
```

#### Approved

Sent when Viber approves the template. The template can now be used to send messages.

```json title="Viber template status webhook body — approved"
{
    "eventId": <EVENT_ID>,
    "timestamp": "2026-08-20T09:14:29.81Z",
    "provider": "viber",
    "businessAccountId": <BUSINESS_ACCOUNT_ID>,
    "accountId": <ACCOUNT_ID>,
    "eventType": "template_status_update",
    "eventDetails": {
        "templateName": <TEMPLATE_NAME>,
        "templateLanguage": <TEMPLATE_LANGUAGE>,
        "viber": {
            "status": "APPROVED"
        }
    }
}
```

#### Rejected

Sent when Viber rejects the template during moderation.

```json title="Viber template status webhook body — rejected"
{
    "eventId": <EVENT_ID>,
    "timestamp": "2026-08-20T09:14:29.81Z",
    "provider": "viber",
    "businessAccountId": <BUSINESS_ACCOUNT_ID>,
    "accountId": <ACCOUNT_ID>,
    "eventType": "template_status_update",
    "eventDetails": {
        "templateName": <TEMPLATE_NAME>,
        "templateLanguage": <TEMPLATE_LANGUAGE>,
        "viber": {
            "status": "REJECTED"
        }
    }
}
```

### Next steps

| If you want to | Read |
| :--- | :--- |
| Create and manage Viber templates | [Viber Templates Management](/connect/docs/viber-templates-management) |
| See delivery receipts and inbound messages for Viber | [Webhooks and Delivery Receipts](/connect/docs/viber/webhooks-delivery-receipts) |
| Configure your callback URL | [Webhooks Configuration API](/connect/reference/add-webhooks-1) |
