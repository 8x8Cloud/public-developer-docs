---
slug: /connect/docs/voice/ivr/session-summary
title: Session Summary (IVR)
---

This webhook provides a comprehensive summary of an IVR session after it ends. The Voice Session Summary (VSS) is sent to your configured webhook endpoint and includes details about all call legs in the session, call quality metrics, and session outcomes.

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
| version | Integer | Indicates the schema version of this webhook payload |
| payload | Object | Contains the session summary details |

### Payload Fields

| Name | Type | Description |
| --- | --- | --- |
| sessionId | String | Unique identifier representing the IVR session [UUID] |
| subAccountId | String | Unique ID of the 8x8 SubAccount |
| sessionStatus | String | Final status of the session. Possible values:<br>`COMPLETED`<br>`BUSY`<br>`NO_ANSWER`<br>`FAILED`<br>`CANCELED`<br>`ERROR` |
| startTime | String | Start time of the IVR session (ISO 8601 format) |
| endTime | String | End time of the IVR session (ISO 8601 format) |
| lastAction | String | The last callflow action executed during the session (e.g., `MAKE_CALL`, `HANGUP`, `SAY_AND_CAPTURE`) |
| callCount | Integer | Number of call legs bridged in the session |
| clientRequestId | String | (Optional) A user-supplied identifier for this request. Echoed back in the webhook to allow correlation with the original request |
| errorDetails | Object | (Optional) Contains error information when sessionStatus is `ERROR`. Includes `errorMsg` (String) and `errorCode` (Integer) |
| details | Object | Contains information about individual call legs in the session |

### Call Leg Fields (callA, callB, etc.)

Each call leg in the `details` object contains:

| Name | Type | Description |
| --- | --- | --- |
| callId | String | Unique identifier of the call leg [UUID] |
| callDirection | String | Direction of the call leg. Values: `INBOUND` or `OUTBOUND` |
| callType | String | Type of the call leg. Values: `PSTN` or `VOIP` |
| initiatedTimestamp | String | When the call leg was initiated (ISO 8601 format) |
| connectedTimestamp | String | (Optional) When the call leg was connected/answered (ISO 8601 format) |
| disconnectedTimestamp | String | When the call leg was disconnected (ISO 8601 format) |
| source | String | Source number of the call leg |
| destination | String | Destination number of the call leg |
| sourceFormat | String | Format of the source number. Value: `MSISDN` |
| destinationFormat | String | Format of the destination number. Value: `MSISDN` |
| sourceCountryCode | String | Country code of the source number (ISO 3166-1 alpha-2 format, e.g., "SG", "US") |
| destinationCountryCode | String | Country code of the destination number (ISO 3166-1 alpha-2 format, e.g., "SG", "US") |
| sourceRefId | String | (Optional) For OUTBOUND calls, the reference ID of the virtual number used as caller ID |
| destinationRefId | String | (Optional) For INBOUND calls, the reference ID of the virtual number that was called |
| callStatus | String | Final status of the call leg. Possible values:<br>`COMPLETED`<br>`BUSY`<br>`NO_ANSWER`<br>`FAILED`<br>`CANCELED` |
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

## Example Scenarios

### Scenario 1: Inbound Call → DTMF → Bridge Call → Answered

An inbound call is received, the caller navigates an IVR menu (DTMF), and is successfully bridged to a destination that answers.

**Session Status:** `COMPLETED`
**Call Count:** 2 (inbound leg + outbound bridged leg)

```json
{
  "payload": {
    "sessionId": "a089b40d-f059-11f0-8937-99c7872ee3c4",
    "subAccountId": "8x8_test",
    "sessionStatus": "COMPLETED",
    "startTime": "2026-01-13T08:26:58Z",
    "endTime": "2026-01-13T08:27:33Z",
    "lastAction": "MAKE_CALL",
    "callCount": 2,
    "clientRequestId": "Request-Id-Client-Confirmation-1200",
    "details": {
      "callA": {
        "callId": "a08f331e-f059-11f0-816b-2daade7d6599",
        "callDirection": "OUTBOUND",
        "callType": "PSTN",
        "initiatedTimestamp": "2026-01-13T08:26:58Z",
        "connectedTimestamp": "2026-01-13T08:27:09Z",
        "disconnectedTimestamp": "2026-01-13T08:27:33Z",
        "source": "+6568332048",
        "destination": "+6591178965",
        "sourceFormat": "MSISDN",
        "destinationFormat": "MSISDN",
        "sourceCountryCode": "SG",
        "destinationCountryCode": "SG",
        "sourceRefId": "virtual-number-trunk-01",
        "callStatus": "COMPLETED",
        "callDuration": 23,
        "callQuality": {
          "mos": 4.5,
          "packetLossRate": 0,
          "jitter": 20
        }
      },
      "callB": {
        "callId": "aba1845a-f059-11f0-816b-2daade7d6599",
        "callDirection": "OUTBOUND",
        "callType": "PSTN",
        "initiatedTimestamp": "2026-01-13T08:27:17Z",
        "connectedTimestamp": "2026-01-13T08:27:26Z",
        "disconnectedTimestamp": "2026-01-13T08:27:33Z",
        "source": "+6568332048",
        "destination": "+6531589338",
        "sourceFormat": "MSISDN",
        "destinationFormat": "MSISDN",
        "sourceCountryCode": "SG",
        "destinationCountryCode": "SG",
        "sourceRefId": "virtual-number-trunk-01",
        "callStatus": "COMPLETED",
        "callDuration": 6,
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
  "description": "Summary of a completed call session",
  "version": 5
}
```

---

### Scenario 2: Inbound Call → DTMF → Bridge Call → Busy

An inbound call is received, the caller navigates an IVR menu, but the bridged destination is busy.

**Session Status:** `BUSY`
**Call Count:** 2 (inbound leg + attempted outbound leg)

```json
{
  "payload": {
    "sessionId": "ece96728-f059-11f0-baa6-c147150ab00e",
    "subAccountId": "8x8_test",
    "sessionStatus": "BUSY",
    "startTime": "2026-01-13T08:29:06Z",
    "endTime": "2026-01-13T08:29:43Z",
    "lastAction": "MAKE_CALL",
    "callCount": 2,
    "details": {
      "callA": {
        "callId": "ece96727-f059-11f0-baa6-c93abb37794a",
        "callDirection": "INBOUND",
        "callType": "PSTN",
        "initiatedTimestamp": "2026-01-13T08:29:06Z",
        "connectedTimestamp": "2026-01-13T08:29:07Z",
        "disconnectedTimestamp": "2026-01-13T08:29:43Z",
        "source": "+6591178965",
        "destination": "+6568332048",
        "sourceFormat": "MSISDN",
        "destinationFormat": "MSISDN",
        "sourceCountryCode": "SG",
        "destinationCountryCode": "SG",
        "destinationRefId": "virtual-number-trunk-01",
        "callStatus": "COMPLETED",
        "callDuration": 37,
        "callQuality": {
          "mos": 4.5,
          "packetLossRate": 0,
          "jitter": 20
        }
      },
      "callB": {
        "callId": "faa4dfc1-f059-11f0-816b-2daade7d6599",
        "callDirection": "OUTBOUND",
        "callType": "PSTN",
        "initiatedTimestamp": "2026-01-13T08:29:29Z",
        "disconnectedTimestamp": "2026-01-13T08:29:43Z",
        "source": "+6568332048",
        "destination": "+6531589338",
        "sourceFormat": "MSISDN",
        "destinationFormat": "MSISDN",
        "sourceCountryCode": "SG",
        "destinationCountryCode": "SG",
        "sourceRefId": "virtual-number-trunk-01",
        "callStatus": "BUSY",
        "callDuration": 0
      }
    }
  },
  "namespace": "VOICE",
  "eventType": "SESSION_SUMMARY",
  "description": "Summary of a completed call session",
  "version": 5
}
```

---

### Scenario 3: Inbound Call → DTMF → Hangup

An inbound call is received, the caller navigates an IVR menu, but hangs up before being bridged.

**Session Status:** `COMPLETED`
**Call Count:** 1 (only the inbound leg)

```json
{
  "payload": {
    "sessionId": "4eec57d5-f05a-11f0-baa6-c147150ab00e",
    "subAccountId": "8x8_test",
    "sessionStatus": "COMPLETED",
    "startTime": "2026-01-13T08:31:51Z",
    "endTime": "2026-01-13T08:32:08Z",
    "lastAction": "HANGUP",
    "callCount": 1,
    "details": {
      "callA": {
        "callId": "4eec57d4-f05a-11f0-baa6-c93abb37794a",
        "callDirection": "INBOUND",
        "callType": "PSTN",
        "initiatedTimestamp": "2026-01-13T08:31:51Z",
        "connectedTimestamp": "2026-01-13T08:31:52Z",
        "disconnectedTimestamp": "2026-01-13T08:32:08Z",
        "source": "+6591178965",
        "destination": "+6568332048",
        "sourceFormat": "MSISDN",
        "destinationFormat": "MSISDN",
        "sourceCountryCode": "SG",
        "destinationCountryCode": "SG",
        "destinationRefId": "virtual-number-trunk-01",
        "callStatus": "COMPLETED",
        "callDuration": 16,
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
  "description": "Summary of a completed call session",
  "version": 5
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

- **IVR Guides:**
  - [IVR Introduction](/connect/docs/voice/ivr/ivr-introduction)
  - [Simple IVR](/connect/docs/voice/ivr/simple-ivr-guide)
  - [Advanced IVR](/connect/docs/voice/ivr/advanced-ivr-guide)
  - [IVR Call Action Handling](/connect/docs/voice/ivr/call-action-handling)

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
