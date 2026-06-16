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
| phoneNumber                     | string         | Phone number associated with the account. Included for `ACCOUNT_VIOLATION` and `ACCOUNT_RESTRICTION` events.   |
| businessVerificationInfo  | object         | Only included for `BUSINESS_VERIFICATION_STATUS_UPDATE` event. Business verification status details, see below. |
| violationInfo                   | object         | Included for `ACCOUNT_VIOLATION` events and for `ACCOUNT_RESTRICTION` events related to Direct Send API category misuse. Account violation details, see below. |
| restrictionInfo                 | array          | Included for `ACCOUNT_RESTRICTION` events. Array of account restriction details, see below. Omitted for Direct Send warning and unban events.                 |

`businessVerificationInfo` object description

| Parameter name   | Parameter type | Description                       |
| :--------------- | :------------- |:----------------------------------|
| businessId | string         | The client's business identifier. |
| verificationStatus           | string         | Verification status.              |
| rejectionReasons | array          | Array of rejection reasons.       |

`violationInfo` object description

| Parameter name   | Parameter type | Description                                                                                                                                                                                    |
| :--------------- | :------------- |:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| violationType    | string         | Type of violation. Possible values: `LOW_BUSINESS_INITIATED_CALLING_QUALITY`, `LOW_USER_INITIATED_CALLING_QUALITY`, `USER_INITIATED_CALLS_LOW_PICKUP_RATE`, `DIRECT_SEND_UTILITY_CATEGORY_ABUSE_WARN`, `DIRECT_SEND_UTILITY_CATEGORY_ABUSE_STRIKE_1`, `DIRECT_SEND_UTILITY_CATEGORY_ABUSE_STRIKE_2`, `DIRECT_SEND_UTILITY_CATEGORY_ABUSE_OFFBOARD`, `DIRECT_SEND_UTILITY_CATEGORY_ABUSE_UNBAN`. |
| remediation      | string         | Remediation text describing how to address the violation. Not included for `DIRECT_SEND_*` violation types.                                                                                    |

`restrictionInfo` array item description

| Parameter name   | Parameter type | Description                                                                                                                                                                      |
| :--------------- | :------------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| restrictionType  | string         | Type of restriction. Possible values: `RESTRICTED_BUSINESS_INITIATED_CALLING`, `RESTRICTED_USER_INITIATED_CALLING`, `RESTRICTED_USER_INITIATED_CALLING_CALL_BUTTON_HIDDEN`, `RESTRICTED_DIRECT_SEND_UTILITY_TEMPLATES`. |
| expiration       | string         | Timestamp when the restriction expires in ISO 8601 format.                                                                                                                       |
| remediation      | string         | Remediation text describing how to address the restriction. Not included for `RESTRICTED_DIRECT_SEND_UTILITY_TEMPLATES`.                                                          |

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

#### Account Violation

```json
{
    "eventId": "9ac6f2cb-abb7-43e6-b533-b3d7017846fd",
    "timestamp": "2026-01-19T13:50:20.00Z",
    "provider": "WhatsApp",
    "businessAccountId": "950523421983857",
    "accountId": "IntegrationTestCampaign",
    "eventType": "account_update",
    "eventDetails": {
        "event": "ACCOUNT_VIOLATION",
        "phoneNumber": "16505552771",
        "violationInfo": {
            "violationType": "USER_INITIATED_CALLS_LOW_PICKUP_RATE",
            "remediation": "Please identify and address the cause of user-initiated calls not being picked up and make sure the business is properly resourced to handle expected call volumes."
        }
    }
}
```

#### Account Restriction

```json
{
    "eventId": "9ac6f2cb-abb7-43e6-b533-b3d7017846fd",
    "timestamp": "2026-01-19T13:50:20.00Z",
    "provider": "WhatsApp",
    "businessAccountId": "950523421983857",
    "accountId": "IntegrationTestCampaign",
    "eventType": "account_update",
    "eventDetails": {
        "event": "ACCOUNT_RESTRICTION",
        "phoneNumber": "16505552771",
        "restrictionInfo": [
            {
                "restrictionType": "RESTRICTED_USER_INITIATED_CALLING",
                "expiration": "2022-01-10T20:54:17.00Z"
            }
        ]
    }
}
```

#### Direct Send API - Category Abuse Warning

Sent when category misuse is detected on the Direct Send API. No restriction is applied yet.

```json
{
    "eventId": "9ac6f2cb-abb7-43e6-b533-b3d7017846fd",
    "timestamp": "2026-01-19T13:50:20.00Z",
    "provider": "WhatsApp",
    "businessAccountId": "950523421983857",
    "accountId": "IntegrationTestCampaign",
    "eventType": "account_update",
    "eventDetails": {
        "event": "ACCOUNT_RESTRICTION",
        "violationInfo": {
            "violationType": "DIRECT_SEND_UTILITY_CATEGORY_ABUSE_WARN"
        }
    }
}
```

#### Direct Send API - Category Abuse Strike

Sent when a 7-day (`STRIKE_1`), 30-day (`STRIKE_2`), or permanent (`OFFBOARD`) Direct Send restriction is applied. The example below shows a 7-day restriction; substitute the `violationType` value for the other strike levels.

```json
{
    "eventId": "9ac6f2cb-abb7-43e6-b533-b3d7017846fd",
    "timestamp": "2026-01-19T13:50:20.00Z",
    "provider": "WhatsApp",
    "businessAccountId": "950523421983857",
    "accountId": "IntegrationTestCampaign",
    "eventType": "account_update",
    "eventDetails": {
        "event": "ACCOUNT_RESTRICTION",
        "violationInfo": {
            "violationType": "DIRECT_SEND_UTILITY_CATEGORY_ABUSE_STRIKE_1"
        },
        "restrictionInfo": [
            {
                "restrictionType": "RESTRICTED_DIRECT_SEND_UTILITY_TEMPLATES",
                "expiration": "2026-01-26T13:50:20.00Z"
            }
        ]
    }
}
```

#### Direct Send API - Unban

Sent when a Direct Send restriction is lifted.

```json
{
    "eventId": "9ac6f2cb-abb7-43e6-b533-b3d7017846fd",
    "timestamp": "2026-01-19T13:50:20.00Z",
    "provider": "WhatsApp",
    "businessAccountId": "950523421983857",
    "accountId": "IntegrationTestCampaign",
    "eventType": "account_update",
    "eventDetails": {
        "event": "ACCOUNT_RESTRICTION",
        "violationInfo": {
            "violationType": "DIRECT_SEND_UTILITY_CATEGORY_ABUSE_UNBAN"
        }
    }
}
```

### Reference

For more information about WhatsApp Business Account webhooks and Partner-led Business Verification, see:
- [Meta's Account Update Webhook Reference](https://developers.facebook.com/documentation/business-messaging/whatsapp/webhooks/reference/account_update)
- [Partner-led Business Verification Documentation](https://developers.facebook.com/documentation/business-messaging/whatsapp/solution-providers/partner-led-business-verification#webhooks)
- [Managing Webhooks](https://developers.facebook.com/docs/graph-api/webhooks/getting-started)
