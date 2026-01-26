---
slug: /connect/docs/voice/number-masking/call-status
title: Call Status (Number Masking)
---

This method provides insights about call details and will be sent to your "Voice Call Summary" (VCS) endpoint. Your "Voice Call Summary" (VCS) endpoint can be configured on the sub-account level with the Webhooks API.

If you need to restrict inbound traffic to your webhook endpoints, see [Voice IP Addresses](/connect/docs/voice/voice-ip-addresses) for the list of outbound IPs used by 8x8 Voice services.

When receiving status updates for ongoing calls, the 8x8 platform will POST a JSON object to your "Voice Call Summary" (VCS) endpoint.

The JSON object will contain the following values:

| Name | Type | Description |
| --- | --- | --- |
| namespace | String | 8x8's overall product namespace. For Voice products the value will be "VOICE" |
| eventType | String | Event type that generated this callback. For call status events the value will be "CALL\_STATUS" |
| description | String | Description of the event type that triggered the callback. |
| eventId | String | Unique id that triggered the callback |
| callId | String | Id unique to a one call leg of the number masking session [UUID] |
| sessionId | String | Unique id that represents Number masking session [UUID] |
| subAccountId | String | Id of the 8x8 SubAccount that the callback belongs to. |
| callStatus | String | Status of the call leg that triggered the callback. Possible values:<br>`CALL_INITIATED`<br>`CALL_RECEIVED`<br>`CALL_CONNECTED`<br>`CALL_DISCONNECTED`<br>`CALL_UPDATED`<br>`DTMF_RECEIVED` |
| callDirection | String | Direction of the call leg that triggered the callback. Values: `INBOUND` or `OUTBOUND` |
| callType | String | Type of the call leg. Values: `PSTN` or `VOIP` (depending on call origin: telco operators or VoiceSDK users). For Number Masking, the value is always `PSTN` |
| source | String | Source number associated with the call leg that triggered this callback |
| destination | String | Destination number associated with the call leg that triggered this callback |
| sourceFormat | String | Format of the source number. For NumberMasking the value will always be MSISDN. |
| destinationFormat | String | Format of the destination number. For NumberMasking the value will always be MSISDN. |
| sourceCountryCode | String | Country code of the source number (ISO 3166-1 alpha-2 format, e.g., "SG", "US") |
| destinationCountryCode | String | Country code of the destination number (ISO 3166-1 alpha-2 format, e.g., "LK", "US") |
| callDuration | Integer | Duration of the call leg (in seconds) that initiated the callback |
| sipCode | Integer | Final Sip status code for the call leg(s) defined by RFC 3261 |
| timestamp | String | Timestamp of a call event |

Additional parameters could be included depending on individual destination or account requirements.  

Example of a JSON object sent to your handleURL:

```json
{
  "payload": {
    "eventId": "e2078079-eae8-11f0-ae64-a500004e488e",
    "callId": "e1ff6a14-eae8-11f0-baa6-c93abb37794a",
    "sessionId": "e1ff6a15-eae8-11f0-baa6-c147150ab00e",
    "subAccountId": "8x8_test",
    "callStatus": "CALL_RECEIVED",
    "callDirection": "INBOUND",
    "callType": "PSTN",
    "source": "+656833033",
    "destination": "+94778066434",
    "sourceFormat": "MSISDN",
    "destinationFormat": "MSISDN",
    "sourceCountryCode": "SG",
    "destinationCountryCode": "LK",
    "callDuration": 0,
    "sipCode": 200,
    "timestamp": "2026-01-06T10:17:19.375Z"
  },
  "namespace": "VOICE",
  "eventType": "CALL_STATUS",
  "description": "Status update of a call"
}

```

## Response

Your endpoint should respond with 200 OK status.

---

## Error Handling

For a complete list of error codes and troubleshooting guidance, see the [Number Masking Error Codes](/connect/docs/voice/error-codes/number-masking-error-codes) reference.
