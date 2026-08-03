---
sidebar_label: 'Delivery Receipts'
---

# LINE Official Notification Delivery Receipts

LINE Official Notification is outbound only, so the only webhook it produces is a delivery receipt. It is also the **only LINE product on 8x8 that produces a delivery receipt at all**: the two-way LINE Official Account channel has none. This page is therefore the single home for LINE delivery receipt content, covering the v9 envelope, the full status enumerations, asynchronous failures, and the one request property specific to the `/lon` endpoint.

The mechanics that genuinely are shared between the two LINE products are documented once, on the [LOA webhook page](./loa-webhook.md), and linked from here rather than repeated.

## Delivery Receipts for LON

LON delivery receipts reach `Delivered`. They do not report `Read`.

| Status | `LineNotification` (LON) |
|---|---|
| **Accepted** | Reported |
| **Sent** | Reported |
| **Delivered** | **Reported** |
| **Read** | **Not reported** |

The LINE Official Account channel (`line`) reports `Accepted` and `Sent` but not `Delivered` or `Read`. LON goes one step further, additionally reporting `Delivered`. See [Delivery Receipts](./loa-webhook.md#delivery-receipts) for the LOA delivery receipt contract.

> **Important:** Read receipts are not available on either LINE product. Do not build reporting that promises a read rate for LINE. For the `line` channel, do not build delivery reporting at all, because nothing is reported.

### The v9 payload

LON receipts arrive in the same **v9** delivery receipt envelope as every other Messaging Apps channel that produces one.

**Sample JSON Payload:**

```json
{
  "version": 9,
  "namespace": "ChatApps",
  "eventType": "outbound_message_status_changed",
  "description": "ChatApps outbound message delivery receipt",
  "payload": {
    "umid": "<UNIQUE_MESSAGE_ID>",
    "clientMessageId": "<YOUR_MESSAGE_ID>",
    "subAccountId": "<SUBACCOUNT_ID>",
    "channel": "LineNotification",
    "user": {
      "msisdn": "+15551234567"
    },
    "status": {
      "state": "delivered",
      "detail": "delivered_to_recipient",
      "timestamp": "2026-07-29T08:19:47.12Z"
    }
  }
}
```

**Key Fields:**

- `version`: Equals `9` for this format.
- `eventType`: `outbound_message_status_changed` for a delivery receipt.
- `payload.umid`: The unique message ID returned by the `/lon` send request. This is how you match a receipt to a notification.
- `payload.clientMessageId`: The custom identifier you supplied on the send request.
- `payload.channel`: `LineNotification` for LINE Official Notification.
- `payload.user.msisdn`: The recipient phone number in E.164 format. LON keys the recipient by phone number, so this field is present.
- `payload.user.channelUserId`: **Not sent for LON.** A LON receipt carries `msisdn`, not `channelUserId`. The LINE Official Account channel's own delivery receipts carry `channelUserId` instead.
- `payload.status`: The message status object.

### Status enumerations

Both enumerations below are platform-wide and apply to every Messaging Apps channel that produces a delivery receipt, LON included.

**Possible `status.state` Values:**

- `queued`: The request is accepted and queued for processing.
- `rejected`: The request has been rejected by 8x8.
- `sent`: The message has been sent to the operator and no acknowledgment has been received yet.
- `delivered`: The message has been delivered and confirmation was received from the operator.
- `undelivered`: A delivery receipt was received indicating the message was not delivered.
- `read`: The message was delivered and read.

**Possible `status.detail` Values:**

- `delivered_to_operator`: Delivered to the operator. Associated with the `delivered` state.
- `delivered_to_recipient`: Delivered to the recipient. Associated with the `delivered` state.
- `rejected_by_operator`: Rejected by the operator. Associated with the `undelivered` state.
- `undelivered_to_recipient`: Delivered but rejected by the target device. Associated with the `undelivered` state.

> **Note**
>
> The v9 payload carries channel-specific extensions for some channels: a `whatsapp` object, and a WhatsApp-only `outboundContent` object that reproduces the delivered message. **There is no LINE equivalent of either.** A LON delivery receipt carries no LINE-side error code, pricing category, or billable flag, and no copy of the notification content.

For the complete envelope description, the other channels' sub-objects, and the older v8 format, see [Delivery receipts for Outbound Messaging Apps](/connect/docs/delivery-receipts-for-outbound-chatapps) and [Message status reference](/connect/reference/message-status-references).

## Asynchronous Failures

A failure that happens after the platform has accepted your `/lon` request arrives later, as a delivery receipt with a failing `status.state`. The `status` object carries two extra properties when the state is a failure:

- `status.errorCode`: An integer error code, set only for errors.
- `status.errorMessage`: A description of the error, set only for errors.

**LON delivery receipts carry richer failure detail than LOA's.** The LINE Official Account channel reports `Accepted` and `Sent` but does not report `Delivered`, so its asynchronous failure surface is narrower. See [Asynchronous failures](./loa-webhook.md#asynchronous-failures).

> 📘 **Error Code Reference**
>
> For the delivery receipt error codes, see the [Messaging Apps Delivery Error Codes](/connect/docs/delivery-error-codes#general-error-codes) reference. The **General Error Codes** section applies to LINE. Note that the reference currently has no LINE-specific section: only General, WhatsApp, and Viber sections exist.

<!-- NEEDS SOURCE: N6. There is no LINE section in the live delivery error code reference, and no LINE-specific delivery error code table exists in any available source. Do not invent LINE error codes here. Revisit if engineering supplies a LINE code table, at which point this pointer should be updated to a #line-error-codes anchor. Relocated from loa-webhook.md on 2026-07-31, because LON is now the only LINE product that can produce a delivery receipt for an error code to arrive on. -->

Several General error codes are directly relevant, including `15` (InvalidDestination: the destination is not valid for that channel or is part of a blacklist on Connect), `2` (ContentRelatedError: the content type is not supported by this channel), `36` (Expired: the message was not delivered at the requested time), and `46` (SubscriberNotReachable: the message was sent to the channel, but the user is not reachable for delivery).

## Shared Webhook Mechanics

These are identical for both LINE products and are documented once, on the LOA webhook page:

- [Configuring Your Webhook](./loa-webhook.md#configuring-your-webhook) - One callback URL serves every Messaging Apps channel on your account, including LON. You do not register a separate URL for LON, and you identify a LON receipt from `payload.channel`.
- [Retry Behaviour](./loa-webhook.md#retry-behaviour) - Retries on a connection error, a timeout, or a `4XX` or `5XX` response, at 1, 10, 30, and 90 seconds. On LON these apply to delivery receipts, since LON produces no other webhook.
- [Synchronous failures](./loa-webhook.md#synchronous-failures) - The `400`, `401`, and `500` responses returned on the send request itself, which are the same for `/lon` as for `/messages`.

Error handling is partly shared. The synchronous half above is common to both endpoints. Both products produce asynchronous failures via delivery receipts, but LON's receipts reach `Delivered` and carry richer error detail. LOA's asynchronous failures are documented in [Asynchronous failures](./loa-webhook.md#asynchronous-failures), and LON's are documented on this page in [Asynchronous Failures](#asynchronous-failures).

## Per-Message Callback Override on /lon

The `/lon` request body accepts a `dlrCallbackUrl` property, the same way the LOA `/messages` body does. It overrides your account's default delivery receipt callback URL for that one notification.

- `dlrCallbackUrl` (optional): A URI. Applies to this message only, and does not change your account configuration.

Use it to route receipts for a particular notification campaign or test run to a separate handler. For the property in the context of the full LON request body, see [Request Body](./official-notification-lon.md#request-body).

> **Note**
>
> On the `line` channel the same property routes delivery receipts for that message to a separate handler, the same way it does on LON. See [Per-Message Callback Override](./loa-webhook.md#per-message-callback-override).

## Related Resources

**For Developers:**

- [LINE Official Notification (LON)](./official-notification-lon.md) - The endpoint, the full content schema, the icon set, and the character limits
- [LINE Official Account Webhooks](./loa-webhook.md) - The inbound message contract, delivery receipts, retry behaviour, and synchronous errors
- [Getting Started with LINE over the 8x8 API](./getting-started.md#sending-on-line-official-notification-lon) - Authentication, base URLs, and a first LON send

**Cross-channel References:**

- [Delivery receipts for Outbound Messaging Apps](/connect/docs/delivery-receipts-for-outbound-chatapps) - The canonical v9 delivery receipt envelope
- [Message status reference](/connect/reference/message-status-references) - The `status` object and its enumerations
- [Supported Messaging Apps](/connect/docs/list-of-supported-chatapps-channels) - Channel type values and directions
- [Messaging Apps Delivery Error Codes](/connect/docs/delivery-error-codes#general-error-codes) - Delivery receipt error codes
