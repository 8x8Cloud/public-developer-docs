# Active Calls

The **Active Calls** view returns the calls that are **currently active (in progress)** for a PBX at the moment of the query — a real-time snapshot of who is on a call right now, with each call's participants, current state and running durations.

Because it reports live state, this endpoint takes **no date range** — there is no `startDate`/`endDate`. It always returns the calls active at the instant the request is served.

One endpoint backs this report:

* `GET /v2/pbxes/{pbxId}/calls/active` — the active (in-progress) calls for a PBX. [Active Calls reference](/analytics/reference/get-active-calls)

## Request

**Method:** GET

#### Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| 8x8-apikey | ✓ | The 8x8-apikey provided | test_key_kjdfidj238jf9123df221 |
| Authorization | ✓ | The `access_token` as a Bearer token | Bearer eyJhbGciOiJSUzI1NiJ9.yyyyyyyy.zzzzzzzzzz |

#### Path

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| pbxId | ✓ | The opaque id of the PBX (not the PBX name). | P2DlDO1HSKe0uPdZlClziw |

#### Query

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| paging | | Optional. Page controls — page number and size. | 0,50 |
| sorting | | Optional. Sort field and direction. Sortable fields: `callId`, `startTime`, `caller.name`, `callee.name`. | startTime,desc |
| fields | | Comma-separated response fields to return (see below). If omitted, all available fields are returned. | callId,startTime,direction,outcome |

> 📘 **Selecting fields, not metrics**
>
> Unlike the aggregated calls endpoint (which takes a `metrics` parameter), Active Calls selects which **response fields** to return via the `fields` parameter. The full list of selectable fields and their descriptions is on the [reference page](/analytics/reference/get-active-calls).
>
>

### Fields

Full descriptions are on the [reference page](/analytics/reference/get-active-calls). They fall into these groups:

* **Identity & timing** — `callId`, `startTime`, `connectedTime`, `totalDuration`
* **Participants** — `callerId`, `callerAddress`, `callerName`, `callerDeviceId`, `callerDeviceModel`, `latestCalleeAddress`, `latestCalleeName`, `latestCalleeDeviceId`, `latestCalleeDeviceModel`
* **State & classification** — `direction`, `outcome`, `latestLabel`, `labels`, `reference`, `sip`
* **Live durations** — `talkingDuration`, `onHoldDuration`, `waitingDuration`

### Example request

> 📘 **Try it out**
>
> You can try this endpoint from the [reference](/analytics/reference/get-active-calls).
>
>

```bash
curl --location --request GET 'https://api.8x8.com/analytics/work/v2/pbxes/{pbxId}/calls/active?paging=0,50&sorting=startTime,desc&fields=callId,startTime,direction,outcome' \
--header 'Authorization: Bearer {access_token here}' \
--header '8x8-apikey: {8x8-apikey input here}'
```

## Response

Each entry in `calls` describes one currently-active call: its `callId`, the `caller` and `latestCallee` participants, the `direction` and `outcome`, the state `labels` it has passed through so far, and its running durations.

> 📘 **Durations are in seconds; timestamps are epoch milliseconds.**
>
>

```json
{
  "calls": [
    {
      "callId": "1717751880000",
      "startTime": 1717751880000,
      "connectedTime": 1717751885000,
      "caller": {
        "id": "Chay Hoss,1006",
        "address": "1006",
        "name": "Chay Hoss",
        "deviceModel": "voo8x8"
      },
      "latestCallee": {
        "address": "1014",
        "name": "Chandler Hollow",
        "deviceModel": "voo8x8"
      },
      "direction": "INBOUND",
      "reference": "1000",
      "sip": "sip-1717751880000",
      "latestLabel": "TALKING",
      "labels": ["WAITING", "ALERTING", "TALKING"],
      "outcome": "ONGOING",
      "talkingDuration": 42.38,
      "onHoldDuration": 0,
      "waitingDuration": 12.5,
      "totalDuration": 54.88
    }
  ]
}
```

For the complete list of selectable fields and their descriptions, see the [Active Calls reference](/analytics/reference/get-active-calls).
