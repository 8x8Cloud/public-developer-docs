# MMS

MMS lets you attach media — images, audio, or video — to messages sent and received over the 8x8 SMS API. There is no separate MMS API or webhook: you send media by adding `mediaUrls` to a normal [Send SMS](/connect/docs/send-sms-api-reference) request, and you receive media the same way you receive any inbound SMS, as an extra field on the existing webhook payload.

This guide is for anyone already integrated with the SMS API who wants to send or receive media as part of that same integration. If you only need plain text messaging, see [Getting Started with SMS API](/connect/docs/getting-started-with-sms-api) instead — nothing here changes how plain SMS works.

---

## Availability

| Direction | Coverage |
| --- | --- |
| Outbound MMS | US/Canada destinations only. For other destinations, `mediaUrls` is ignored and the message is sent as a plain SMS. |
| Inbound MMS | MMS-enabled US/Canada virtual numbers only. |

> 📘
>
> Contact your account manager to check whether your virtual number supports MMS, or to have MMS enabled on it.

---

## Sending MMS

Add `mediaUrls` to a [Send SMS](/connect/reference/send-sms-single) or [Send Many SMS](/connect/reference/send-many-sms) request:

```json
{
  "source": "AwesomeName",
  "destination": "12025550308",
  "text": "Check out this photo!",
  "mediaUrls": ["https://example.com/pic.jpg"]
}
```

| Constraint | Value |
| --- | --- |
| URLs per message | Up to 10 |
| URL length | Up to 4096 characters each |
| URL scheme | HTTPS only |
| `text` | Optional — you can send media with no message body |

See [mediaUrls](/connect/docs/send-sms-api-reference#mediaurls) in the Send SMS API reference for the full field description.

---

## Receiving MMS

An inbound MMS arrives on the same webhook as inbound SMS (`inbound_message_received`), with an added `mediaUrls` array alongside the message text in `body`:

```json
{
  "source": "+12125559999",
  "destination": "+12025550308",
  "body": "Check out this photo!",
  "mediaUrls": [
    "<PRESIGNED_MEDIA_URL_1>",
    "<PRESIGNED_MEDIA_URL_2>"
  ]
}
```

- `mediaUrls` links point to 8x8's own copy of each media file, not the carrier's — they are pre-signed URLs valid for **1 day (24 hours)** by default. Download the media when the webhook arrives if you need to keep it.
- If the user sent media with no text, `body` is empty.
- Sub-accounts that receive inbound messages through the [Inbound ChatApps message](/connect/docs/inbound-chatapps-message) webhook instead get the text of an inbound MMS only, without its media.

See [Inbound MMS](/connect/docs/inbound-sms#inbound-mms) in the Inbound SMS reference for the full payload and field descriptions.

---

## Delivery receipts for MMS

MMS uses the same delivery receipt as SMS — `outbound_message_status_changed` with `namespace` `SMS` — there is no separate event type for MMS.

- The `queued` receipt includes `outboundContent` with the `mediaUrls` you sent.
- Later receipts (`delivered`, `undelivered`, etc.) report delivery status only and do not repeat the media URLs.

See [Delivery receipts for MMS](/connect/docs/delivery-receipts-for-outbound-sms#delivery-receipts-for-mms) for the full payload and field descriptions.

---

## Related topics

- [Send SMS API reference](/connect/docs/send-sms-api-reference)
- [Inbound SMS](/connect/docs/inbound-sms)
- [Delivery receipts for outbound SMS](/connect/docs/delivery-receipts-for-outbound-sms)
