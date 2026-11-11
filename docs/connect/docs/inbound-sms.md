# Inbound SMS

8x8 SMS API exposes a webhook mechanism to let you receive Inbound SMS (SMS sent to your virtual numbers) on a callback URL of your choice.  
Whenever you receive inbound SMS, the 8x8 SMS platform sends a `POST` request to the endpoint of your choice with a `JSON` body containing the inbound SMS and the associated data.

### Requirements

To use inbound SMS capabilities, liaise with your account manager to activate the following:

- A **virtual mobile number** where your user will send their SMS
- An **inbound SMS callback URL**: set the URL, where 8x8 platform should forward the inbound messages addressed to your virtual number

> 📘
>
> You can configure your callback using [Webhooks Configuration API](/connect/reference/get-webhooks-2)
>
>

### Inbound SMS flow

1. A user sends an SMS to one of your virtual numbers
2. 8x8 receives the SMS on your behalf
3. 8x8 programmatically sends the SMS to the callback URL configured for your virtual number using  `POST` request.
4. The `POST` request body, in the `JSON` format contains the SMS body and all associated data (`UMID`, source, destination, encoding, timestamp)

### Retry logic

In case of connection error/timeout or HTTP response code 4XX or 5XX, there will be multiple retry attempts with progressive intervals: 1, 10, 30, 90 sec.

### Webhook format

Request body description

| Parameter name | Parameter type | Description                                                                  |
| --- | --- |------------------------------------------------------------------------------|
| namespace | string | A generic namespace for incoming webhook.<br>Equal to `SMS` for inbound SMS. |
| eventType | string | Webhook type. <br>Equals to `inbound_message_received` for inbound SMS.          |
| description | string | Human-readable description of the incoming event                             |
| payload | object | Inbound message information, see below.                                      |

Payload object description

| Parameter name | Parameter type | Description                                                                                                   |
| :------------- | :------------- | :------------------------------------------------------------------------------------------------------------ |
| umid           | uuid           | Unique message ID for the inbound message                                                                     |
| subAccountId   | string         | Id of the sub-account which owns the virtual number.                                                          |
| timestamp      | string         | UTC date and time when the message was received expressed in ISO 8601 format.                                 |
| source         | string         | Originating address of the SMS (sender number)                                                                |
| destination    | string         | The destination address of the SMS (virtual number)                                                           |
| body           | string         | Content of the SMS                                                                                            |
| encoding       | string         | The encoding used in the SMS body (GSM7 / UCS2)                                                               |
| smsCount       | integer        | Number of SMS segment in the message                                                                          |
| price          | object         | Price information of the message, please see [Price object reference](/connect/reference/price-object-reference) for details |
| mediaUrls      | array          | Links to the media (image, audio, video, etc.) sent with an inbound MMS. Only present for MMS; omitted for plain SMS. See [Inbound MMS](#inbound-mms). |

> ❗️
>
> If the request you receive has a different structure from described in this document, please contact our support to activate the latest format for your account.

### Sample inbound SMS callback body

```json Inbound SMS webhook body
{
  "namespace": "SMS",
  "eventType": "inbound_message_received",
  "description": "SMS inbound message",
  "payload": {
    "umid": "9e09ac86-bd74-5465-851d-1eb5a5fdbb9a",
    "subAccountId": "SubAccount-1",
    "timestamp": "2016-01-01T14:34:56.017Z",
    "source": "+6581968289",
    "destination": "+4534735477",
    "body": "Test MO message",
    "encoding": "GSM7",
    "smsCount": 2,
    "price": {
      "total": 0.0446592,
      "perSms": 0.0446592,
      "currency": "EUR"
    }
  }
}
```

### Inbound MMS

When a user sends an MMS (a message with media such as an image, audio or video) to one of your virtual numbers, you receive it on the same callback URL, with the same `namespace` (`SMS`) and `eventType` (`inbound_message_received`) as an inbound SMS. The payload carries the message text in `body`, and an additional `mediaUrls` array with one link per media file.

- If the user sent media without any text, `body` is empty.
- `mediaUrls` is not the carrier's link to the media. 8x8 copies each media file into its own storage and gives you a time-limited, pre-signed URL to it.
- The order of `mediaUrls` matches the order of the media in the original MMS.
- If 8x8 cannot copy a media file, you still receive the message, with its text and any media that was copied successfully.
- Media whose content type a browser could execute or render as a page (for example HTML, SVG or scripts) is served as `application/octet-stream`.

> 🚧 **Media URLs expire**
>
> Each URL in `mediaUrls` is valid for 1 day (24 hours) by default. Download and store the media when the webhook arrives if you need it after that, and do not keep the URL as though it were permanent.
>
>

> 📘 **Availability**
>
> Inbound MMS is currently available on MMS-enabled US/Canada virtual numbers, the same coverage as [sending MMS](/connect/docs/send-sms-api-reference#mediaurls). Contact your account manager to check whether your virtual number supports MMS.
>
> Media is only delivered with the latest inbound SMS format described on this page. If the request you receive has a different structure, contact our support to activate the latest format for your account. Sub-accounts that receive inbound SMS through the [Inbound ChatApps message](/connect/docs/inbound-chatapps-message) webhook receive the text of an inbound MMS only, without its media.
>
>

### Sample inbound MMS callback body

```json Inbound MMS webhook body
{
  "namespace": "SMS",
  "eventType": "inbound_message_received",
  "description": "SMS inbound message",
  "payload": {
    "umid": "4b2c1d7e-9f0a-4c3b-8e6d-2a1f0e9d8c7b",
    "subAccountId": "SubAccount-1",
    "timestamp": "2026-10-27T09:15:42.31Z",
    "source": "+12125559999",
    "destination": "+12025550308",
    "body": "Check out this photo!",
    "encoding": "GSM7",
    "smsCount": 1,
    "price": {
      "total": 0.0446592,
      "perSms": 0.0446592,
      "currency": "EUR"
    },
    "mediaUrls": [
      "<PRESIGNED_MEDIA_URL_1>",
      "<PRESIGNED_MEDIA_URL_2>"
    ]
  }
}
```
