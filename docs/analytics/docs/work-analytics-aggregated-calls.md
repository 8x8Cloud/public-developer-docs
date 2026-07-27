# Aggregated & Detailed Calls

The **Calls** views return call-level analytics for a PBX — an aggregated, paged table of calls with their participants, outcome and handling durations, and a detailed drill-down for a single call.

Two endpoints back this report:

* `GET /v2/pbxes/{pbxId}/calls` — aggregated, paged call table. [Call Queue Data Table reference](/analytics/reference/aggregated-3)
* `GET /v2/pbxes/{pbxId}/calls/{callId}` — detail for one call. [Call Details reference](/analytics/reference/detailed)

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
| paging | | Optional. Page size via `limit`; page forward with the `startingAfter` cursor. | 50 |
| sorting | | Optional. Use `sortingField` + `sortingDirection` (`ASC`/`DESC`). | sortingField=startTime&sortingDirection=DESC |
| queueIds | | Restrict to specific queues — comma-separated **opaque queue ids**. | JMwyX0BUTRC9uAnuAz8wfg |
| siteIds | | Restrict to specific sites — comma-separated **opaque site ids**. | vcXZjfBOT2yWxhUQHzwqwe |
| startDate / endDate | | Historical window in ISO 8601. Omit both for the current live state. | 2026-07-01T00:00:00Z |
| intraDayStart / intraDayEnd | | Optional intra-day window; only valid together with `startDate`/`endDate`. | 2026-07-01T09:00:00Z |

> 📘 **Pagination is cursor-based**
>
> This endpoint paginates by cursor, not page number: set `limit` for the page size and pass the previous page's last `callId` as `startingAfter` (with `latestSortingValue`) to fetch the next page. Sort with `sortingField` + `sortingDirection`. Both are optional.
>
>

### Example request

> 📘 **Try it out**
>
> You can try this endpoint from the [reference](/analytics/reference/aggregated-3).
>
>

```bash
curl --location --request GET 'https://api.8x8.com/analytics/work/v2/pbxes/{pbxId}/calls?startDate=2026-07-01T00:00:00Z&endDate=2026-07-15T23:59:59Z&limit=50&sortingField=startTime&sortingDirection=DESC' \
--header 'Authorization: Bearer {access_token here}' \
--header '8x8-apikey: {8x8-apikey input here}'
```

## Response

Each entry in `calls` describes one call: its `callId`, the `workGroup` (queue or ring group) it belonged to, the `caller` and `latestCallee` participants, the lifecycle `latestLabel` / `outcome` / `resolution`, the `labels` it passed through, and its durations.

> 📘 **Durations are in seconds; timestamps are epoch milliseconds.**
>
>

```json
{
  "calls": [
    {
      "callId": "1715191662606",
      "workGroup": {
        "id": "tqteLkZOScyi0Mai9ewUlA",
        "extension": "1000",
        "groupType": "CALL_QUEUE"
      },
      "caller": {
        "id": "Caller,1006",
        "address": "1006",
        "name": "Chay Hoss",
        "deviceModel": "voo8x8"
      },
      "latestCallee": {
        "address": "1014",
        "name": "Chandler Hollow",
        "deviceModel": "voo8x8"
      },
      "latestLabel": "FINISHED",
      "outcome": "FINISHED",
      "labels": ["WAITING", "ALERTING", "MISSED", "DISCONNECTED", "FINISHED"],
      "startTime": 1717751880000,
      "stopTime": 1717751880000,
      "connectedTime": 0,
      "handlingDuration": 0,
      "waitingDuration": 42.38,
      "talkingDuration": 0,
      "onHoldDuration": 0,
      "totalDuration": 42.38,
      "did": "1000",
      "direction": "INTERNAL",
      "resolution": "OFFER_TIMEOUT"
    }
  ]
}
```

### Response fields

| Field | Description |
| --- | --- |
| calls[] | One entry per call in the current page |
| calls[].callId | Unique call identifier — pass it to `GET .../calls/{callId}` for full detail |
| calls[].workGroup | The queue or ring group involved (`id`, `extension`, `groupType`) |
| calls[].caller / latestCallee | The originating party and the most recent party handled the call |
| calls[].latestLabel / outcome / resolution | Most recent state label (last element of `labels`), final outcome, and resolution classification |
| calls[].labels | Ordered list of states the call passed through |
| calls[].handlingDuration / waitingDuration / talkingDuration / onHoldDuration / totalDuration | Per-phase and total call durations (seconds) |
| calls[].startTime / stopTime / connectedTime | Call timestamps (epoch ms) |
| calls[].did | The dialled number (DID) the call came in on |
| calls[].direction | INTERNAL / INBOUND / OUTBOUND |

### Call detail

To retrieve the full detail (legs, participants and timeline) of a single call, call `GET /v2/pbxes/{pbxId}/calls/{callId}` with the `callId` from the aggregated response. This endpoint also **requires `startDate`/`endDate`** (the same window the call falls in). Each leg carries a `callee` object and a `statusDuration` (in seconds). See the [Call Details reference](/analytics/reference/detailed).
