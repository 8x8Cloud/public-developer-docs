# WhatsApp Account Update Webhook

**WhatsApp Account Update Webhooks** are notifications sent to you to inform about updates and changes to your WhatsApp Business Account (WABA).

### Requirements

To receive WhatsApp Account Update webhooks, you need:

- An account configured to use Chat Apps product.
- A webhook to indicate to us which URL 8x8 platform should send Chat Apps Business Management Updates to.

> 📘
>
> You can configure your callback using [Webhooks Configuration API](/connect/reference/add-webhooks-1)
>

### Retry logic

In case of connection error/timeout or HTTP response code 4XX or 5XX, there will be multiple retry attempts with progressive intervals: 1, 10, 30, 90 sec.

### Webhook format

Request body description

| Parameter name    | Parameter type | Description                                                                                                              |
| :---------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------- |
| eventId           | string         | Unique event identifier.                                                                                                 |
| timestamp         | string         | Timestamp of event in ISO 8601 format.                                                                                   |
| provider          | string         | Provider of this event. Equal to `WhatsApp`.                                                                             |
| businessAccountId | string         | Business account identifier associated with provider. This value will represent the WhatsApp Business Account (WABA) Id. |
| accountId         | string         | AccountId which the event is associated with.                                                                            |
| eventType         | string         | Type of event. Equal to `account_update`.                                                                                |
| eventDetails      | object         | Event related information, see below.                                                                                    |

`eventDetails` object description

| Parameter name                  | Parameter type | Description                                                                                                     |
| :------------------------------ | :------------- |:----------------------------------------------------------------------------------------------------------------|
| event                           | string         | Specific account update event type.                                                                             |
| businessVerificationInfo  | object         | Only included for `BUSINESS_VERIFICATION_STATUS_UPDATE` event. Business verification status details, see below. |

`businessVerificationInfo` object description

| Parameter name   | Parameter type | Description                       |
| :--------------- | :------------- |:----------------------------------|
| businessId | string         | The client's business identifier. |
| verificationStatus           | string         | Verification status.              |
| rejectionReasons | array          | Array of rejection reasons.       |

### Sample Webhooks

#### Verification Failed

```json
{
    "eventId": "9ac6f2cb-abb7-43e6-b533-b3d7017846fd",
    "timestamp": "2026-01-19T13:50:20.00Z",
    "provider": "WhatsApp",
    "businessAccountId": "950523421983857",
    "accountId": "IntegrationTestCampaign",
    "eventType": "account_update",
    "eventDetails": {
        "event": "BUSINESS_VERIFICATION_STATUS_UPDATE",
        "businessVerificationInfo": {
            "businessId": "2729063412676005",
            "verificationStatus": "FAILED",
            "rejectionReasons": [
                "LEGAL_NAME_NOT_FOUND_IN_DOCUMENTS",
                "BUSINESS_NOT_ELIGIBLE"
            ]
        }
    }
}
```

#### Verification Approved

```json
{
    "eventId": "9ac6f2cb-abb7-43e6-b533-b3d7017846fd",
    "timestamp": "2026-01-19T13:50:20.00Z",
    "provider": "WhatsApp",
    "businessAccountId": "950523421983857",
    "accountId": "IntegrationTestCampaign",
    "eventType": "account_update",
    "eventDetails": {
        "event": "BUSINESS_VERIFICATION_STATUS_UPDATE",
        "businessVerificationInfo": {
            "businessId": "2729063412676005",
            "verificationStatus": "APPROVED",
            "rejectionReasons": [
              "NONE"
            ]
        }
    }
}
```

### Reference

For more information about WhatsApp Business Account webhooks and Partner-led Business Verification, see:
- [Meta's Account Update Webhook Reference](https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/account_update)
- [Partner-led Business Verification Documentation](https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/partner-led-business-verification#webhooks)
- [Managing Webhooks](https://developers.facebook.com/docs/graph-api/webhooks/getting-started)
