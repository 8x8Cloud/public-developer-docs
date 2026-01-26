---
slug: /connect/docs/voice/voice-messaging/session-status
title: Session Summary (Voice Messaging)
---

This webhook provides a comprehensive summary of a Voice Messaging session after it ends. The Voice Session Summary (VSS) is sent to your configured webhook endpoint and includes details about all call legs in the session, call quality metrics, and session outcomes.

Your VSS endpoint can be configured at the sub-account level using the [Voice Webhooks API](/connect/reference/create-a-new-webhook).

If you need to restrict inbound traffic to your webhook endpoints, see [Voice IP Addresses](/connect/docs/voice/voice-ip-addresses) for the list of outbound IPs used by 8x8 Voice services.

When a voice session ends, the 8x8 platform will POST a JSON object to your VSS endpoint.

## Webhook Payload

### Root Level Fields

| Name | Type | Description |
| --- | --- | --- |
| namespace | String | 8x8's overall product namespace. For Voice products, the value is `VOICE` |
| eventType | String | Event type that generated this callback. For session summary events, the value is `SESSION_SUMMARY` |
| description | String | Description of the event type that triggered the callback |
| payload | Object | Contains the session summary details |

### Payload Fields

| Name | Type | Description |
| --- | --- | --- |
| sessionId | String | Unique identifier representing the Voice Messaging session [UUID] |
| subAccountId | String | Unique ID of the 8x8 SubAccount |
| sessionStatus | String | Final status of the session. Possible values:<br>`COMPLETED`<br>`NO_ANSWER`<br>`BUSY`<br>`CANCELED`<br>`FAILED`<br>`ERROR`<br><br>**For Opt Out Scenario:**<br>- `COMPLETED_UNSUBSCRIBED` (user opt out)<br>- `COMPLETED_UNSUB_ERROR` (error encountered during blacklist process)<br>- `UNSUBSCRIBED_CONTACT` (user is already in the blacklist group) |
| startTime | String | Start time of the Voice Messaging session (ISO 8601 format) |
| endTime | String | End time of the Voice Messaging session (ISO 8601 format) |
| lastAction | String | The last callflow action executed during the session (e.g., `MAKE_CALL`, `SAY`, `PLAY_FILE`) |
| callCount | Integer | Number of call legs bridged in the session |
| errorDetails | Object | (Optional) Contains error information when sessionStatus is `ERROR`. Includes `errorMsg` (String) and `errorCode` (Integer) |
| details | Object | Contains information about individual call legs in the session |

### Call Leg Fields (callA, callB, etc.)

Each call leg in the `details` object contains:

| Name | Type | Description |
| --- | --- | --- |
| callId | String | Unique identifier of the call leg [UUID] |
| callDirection | String | Direction of the call leg. Values: `INBOUND` or `OUTBOUND` |
| callType | String | Type of the call leg. For Voice Messaging, the value is always `PSTN` |
| initiatedTimestamp | String | When the call leg was initiated (ISO 8601 format) |
| connectedTimestamp | String | (Optional) When the call leg was connected/answered (ISO 8601 format) |
| disconnectedTimestamp | String | When the call leg was disconnected (ISO 8601 format) |
| source | String | Source number of the call leg |
| destination | String | Destination number of the call leg |
| sourceFormat | String | Format of the source number. For Voice Messaging, the value is always `MSISDN` |
| destinationFormat | String | Format of the destination number. For Voice Messaging, the value is always `MSISDN` |
| sourceCountryCode | String | Country code of the source number (ISO 3166-1 alpha-2 format, e.g., "US", "SG") |
| destinationCountryCode | String | Country code of the destination number (ISO 3166-1 alpha-2 format, e.g., "SG", "US") |
| sourceRefId | String | For OUTBOUND calls, the reference ID of the virtual number used as caller ID. For INBOUND calls, the value is null |
| callStatus | String | Final status of the call leg. Possible values:<br>`COMPLETED`<br>`NO_ANSWER`<br>`BUSY`<br>`CANCELED`<br>`FAILED`<br>`ERROR` |
| callDuration | Integer | Duration of the connected call in seconds |
| callQuality | Object | (Optional) Call quality metrics for this leg |

### Call Quality Metrics

When available, each call leg may include quality metrics:

| Name | Type | Description |
| --- | --- | --- |
| mos | Number | Mean Opinion Score (MOS) - a measure of call quality ranging from 1.0 (poor) to 5.0 (excellent) |
| packetLossRate | Number | Packet loss rate as a decimal (e.g., 0.01 = 1% packet loss) |
| jitter | Integer | Jitter in milliseconds - variation in packet arrival times |

---

## Example Payloads

### Session Summary (Success)

```json
{
  "payload": {
    "sessionId": "1f048a84-ea6d-11ee-911b-078f7290bf52",
    "subAccountId": "8x8_test",
    "sessionStatus": "COMPLETED",
    "startTime": "2024-03-25T06:01:30Z",
    "endTime": "2024-03-25T06:01:50Z",
    "lastAction": "MAKE_CALL",
    "callCount": 1,
    "details": {
      "CallA": {
        "callId": "1f048a83-ea6d-11ee-911b-e9023a97c284",
        "callDirection": "OUTBOUND",
        "callType": "PSTN",
        "initiatedTimestamp": "2024-03-25T06:01:28Z",
        "connectedTimestamp": "2024-03-25T06:01:37Z",
        "disconnectedTimestamp": "2024-03-25T06:01:50Z",
        "source": "+12314377870",
        "destination": "+6568332048",
        "sourceFormat": "MSISDN",
        "destinationFormat": "MSISDN",
        "sourceCountryCode": "US",
        "destinationCountryCode": "SG",
        "SourceRefId": "null",
        "callStatus": "COMPLETED",
        "callDuration": 13,
        "callQuality": {
          "mos": 4.5,
          "packetLossRate": 0,
          "jitter": 20
        }
      }
    }
  },
  "namespace": "VOICE",
  "eventType": "SESSION_SUMMARY",
  "description": "Summary of a completed call session"
}
```

### Session Summary (Failure)

```json
{
  "payload": {
    "sessionId": "47f19e66-2163-11ee-8ccd-27b543a164ea",
    "subAccountId": "8x8_test",
    "sessionStatus": "ERROR",
    "startTime": "2024-07-13T09:54:38Z",
    "endTime": "2024-07-13T09:54:38Z",
    "lastAction": "MAKE_CALL",
    "callCount": 1,
    "errorDetails": {
      "errorMsg": "No coverage available for requested area",
      "errorCode": -2004
    },
    "details": {
      "callA": {
        "callId": "4809bb03-2163-11ee-8f06-8da8b5ddeca4",
        "callDirection": "OUTBOUND",
        "callType": "PSTN",
        "initiatedTimestamp": "2023-07-13T09:54:38Z",
        "disconnectedTimestamp": "2023-07-13T09:54:38Z",
        "source": "+6568332048",
        "destination": "+6591178965",
        "sourceFormat": "MSISDN",
        "destinationFormat": "MSISDN",
        "sourceCountryCode": "SG",
        "destinationCountryCode": "SG",
        "sourceRefId": "PSTN1",
        "callStatus": "ERROR",
        "callDuration": 0
      }
    }
  },
  "namespace": "VOICE",
  "eventType": "SESSION_SUMMARY",
  "description": "Summary of a completed call session"
}
```

---

## Response

Your endpoint should respond with an HTTP 200 OK status to acknowledge receipt of the webhook.

---

## Understanding Call Quality Metrics

The `callQuality` object provides real-time network quality metrics for each call leg:

- **MOS (Mean Opinion Score)**:
  - 4.3-5.0: Excellent
  - 4.0-4.3: Good
  - 3.6-4.0: Fair
  - 3.1-3.6: Poor
  - 1.0-3.1: Bad

- **Packet Loss Rate**: Lower is better. Values above 1-2% may affect call quality.

- **Jitter**: Lower is better. Values above 30ms may cause noticeable audio issues.

---

## Error Details and Error Codes

These error codes may appear in the `errorDetails` object when `sessionStatus` is "ERROR". For complete error code documentation, see [Voice Error Codes](/connect/docs/voice/error-codes/voice-error-codes).

| Error Code | Message |
| :---------- | :---------------------------------------------------------- |
| -2001 | An internal error has occurred |
| -2002 | An internal connectivity error has occurred |
| -2003 | The call flow provided is invalid |
| -2004 | No coverage available for requested area |
| -2005 | Unable to synthesize text to speech |
| -2006 | Unable to download file for playback |
| -2007 | The validity period of the call flow request has expired |
| -2008 | The provided source MSISDN or caller ID is not whitelisted |
| -2009 | The scenario parameters provided is invalid |
| -2010 | The trunk capacity has been exceeded |
| -9999 | An unknown error has occurred |

---

## Related Documentation

- **Voice Messaging Guides:**
  - [Voice Messaging – Guide](/connect/docs/voice/voice-messaging/voice-messaging-guide)

- **Webhook Configuration:**
  - [Webhooks Overview](/connect/docs/voice/webhook-guides/webhooks-overview)
  - [Voice Session Summary Webhook](/connect/docs/voice/webhook-guides/voice-session-summary-webhook)
  - [Create a New Webhook (API)](/connect/reference/create-a-new-webhook)

- **API Reference:**
  - [Send Callflow](/connect/reference/send-callflow)
  - [Voice API Introduction](/connect/docs/voice/api-introduction)

- **Error Handling:**
  - [Voice Status Codes](/connect/docs/voice/error-codes/voice-status-codes)
  - [Voice Error Codes](/connect/docs/voice/error-codes/voice-error-codes)

---

## Support Channels

- **Technical support:** [support@cpaas.8x8.com](mailto:support@cpaas.8x8.com)
- **Sales inquiries:** Contact your account manager or visit [cpaas.8x8.com/en/contact-us](https://cpaas.8x8.com/en/contact-us/)
- **Support Portal:** [https://support.cpaas.8x8.com/hc/en-us](https://support.cpaas.8x8.com/hc/en-us)
