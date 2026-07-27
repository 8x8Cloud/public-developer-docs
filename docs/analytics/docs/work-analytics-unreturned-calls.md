# Unreturned Calls

The **Unreturned Calls** report surfaces calls into the PBX that were **not answered and have not been called back** — abandoned or missed callers who are still waiting for a call back. It aggregates those calls per caller, lets you list the distinct callers and callees involved (to drive report filters), and drills down to the individual unreturned call records.

Five operations back this report:

* `GET /v2/pbxes/{pbxId}/calls/unreturned` — unreturned calls aggregated per caller. [Unreturned Calls reference](/analytics/reference/get-unreturned-calls)
* `GET /v2/pbxes/{pbxId}/calls/unreturned/callees` — distinct callees that appear in the unreturned calls. [Callees reference](/analytics/reference/get-unreturned-callees)
* `GET /v2/pbxes/{pbxId}/calls/unreturned/callers` — distinct callers whose calls were not returned. [Callers reference](/analytics/reference/get-unreturned-callers)
* `GET /v2/pbxes/{pbxId}/calls/unreturned/detailed` — the per-call drill-down. [Detailed reference](/analytics/reference/get-unreturned-detailed)
* `POST /v2/pbxes/{pbxId}/calls/unreturned/detailed` — the same drill-down with the filters in a JSON body. [Detailed (POST) reference](/analytics/reference/post-unreturned-detailed)

## Request

**Method:** GET (all reads) and POST (the detailed drill-down variant)

#### Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| 8x8-apikey | ✓ | The 8x8-apikey provided | test_key_kjdfidj238jf9123df221 |
| Authorization | ✓ | The `access_token` as a Bearer token | Bearer eyJhbGciOiJSUzI1NiJ9.yyyyyyyy.zzzzzzzzzz |

#### Path

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| pbxId | ✓ | The opaque id of the PBX (not the PBX name). | P2DlDO1HSKe0uPdZlClziw |

### Aggregated unreturned calls — `GET .../calls/unreturned`

Returns one row per caller, grouping the callee they last tried to reach, the number of unreturned `attempts`, and the `latestStartTime` of the most recent attempt.

| Query param | Required | Description | Example |
| --- | --- | --- | --- |
| callerAddresses | | Restrict to specific caller addresses (comma-separated). | 1006,1008 |
| calleeAddresses | | Restrict to specific callee addresses (comma-separated). | 1014 |
| search | | Free-text search across caller/callee identity fields. | Hoss |
| startDate / endDate | | Historical window in ISO 8601. Omit both for the last 24 hours. | 2026-07-01T00:00:00Z |
| intraDayStart / intraDayEnd | | Optional intra-day window; only valid together with `startDate`/`endDate`. | 09:00:00-07:00 |
| sorting | | Optional. Sort field and direction. | attempts,desc |
| fields | | Comma-separated response fields to return (see below). If omitted, all available fields are returned. | callerName,attempts,latestStartTime |

> 📘 **Selecting fields, not metrics**
>
> Like the other calls endpoints, Unreturned Calls selects which **response fields** to return via the `fields` parameter (not a `metrics` parameter). The full list of selectable fields and their descriptions is on the [reference page](/analytics/reference/get-unreturned-calls).
>
>

The aggregated selectable fields fall into these groups (full descriptions on the [reference page](/analytics/reference/get-unreturned-calls)):

* **Caller** — `callerId`, `callerAddress`, `callerName`, `callerDeviceId`, `callerDeviceModel`, `callerServiceName`, `callerServiceType`
* **Callee** — `calleeAddress`, `calleeName`, `calleeDeviceId`, `calleeDeviceModel`, `calleeServiceName`, `calleeServiceType`
* **Site** — `siteId`, `siteName`
* **Aggregation** — `attempts`, `latestStartTime`

### Callees and callers — `GET .../callees` and `GET .../callers`

These return the distinct participants in the unreturned calls, for driving the report's callee / caller filters. Both are paged and sorted (sortable fields: `name`, `address`).

| Query param | Required | Applies to | Description | Example |
| --- | --- | --- | --- | --- |
| siteIds | | callees, callers | Restrict to specific sites (comma-separated). | site1 |
| calleeAddresses | | callers | Restrict to callers that tried to reach specific callee addresses. | 1014 |
| search | | callees, callers | Free-text search across name/address. | Hollow |
| startDate / endDate / intraDayStart / intraDayEnd | | callees, callers | Time filter (as above). | 2026-07-01T00:00:00Z |
| paging | | callees, callers | Optional. Page controls — limit and cursor. | 50 |
| sorting | | callees, callers | Optional. Sort field and direction. | name,asc |

### Detailed unreturned calls — `GET` and `POST .../detailed`

Returns the individual unreturned call records for the requested caller addresses. `callerAddresses` is **required** (at least one). The GET variant takes the filters as query parameters; the POST variant takes the same filters in a JSON body.

| Query param (GET) | Required | Description | Example |
| --- | --- | --- | --- |
| callerAddresses | ✓ | Caller addresses to drill into (comma-separated). | 1006,1008 |
| calleeAddresses | | Restrict to specific callee addresses. | 1014 |
| search | | Free-text search across caller/callee identity fields. | Hoss |
| startDate / endDate / intraDayStart / intraDayEnd | | Time filter (as above). | 2026-07-01T00:00:00Z |
| paging | | Optional. Page controls — limit and cursor. | 50 |
| sorting | | Optional. Sort field and direction. | startTime,desc |
| fields | | Comma-separated response fields to return. If omitted, all available fields are returned. | callId,callerName,startTime,outcome |

The detailed selectable fields add the call-level attributes on top of the caller/callee groups: `callId`, `transferToCallId`, `workGroupId`, `workGroupExtension`, `workGroupType`, `startTime`, `totalDuration`, `did`, `outcome`, `labels`. See the [Detailed reference](/analytics/reference/get-unreturned-detailed) for the complete list and descriptions.

> 📘 **POST body overrides query params**
>
> `POST .../detailed` accepts the same filters, time range, sorting and paging in a JSON body — convenient when the caller-address list is long. Any value present in the body **overrides** the equivalent query parameter, and both variants return the same `DetailedUnreturnedCallsResponse`. See the [Detailed (POST) reference](/analytics/reference/post-unreturned-detailed).
>
>

### Example requests

> 📘 **Try it out**
>
> You can try each of these endpoints from the reference pages linked above.
>
>

```bash
# Aggregated per-caller unreturned calls
curl --location --request GET 'https://api.8x8.com/analytics/work/v2/pbxes/{pbxId}/calls/unreturned?sorting=attempts,desc&fields=callerName,attempts,latestStartTime' \
--header 'Authorization: Bearer {access_token here}' \
--header '8x8-apikey: {8x8-apikey input here}'

# Detailed drill-down for specific callers (POST)
curl --location --request POST 'https://api.8x8.com/analytics/work/v2/pbxes/{pbxId}/calls/unreturned/detailed' \
--header 'Authorization: Bearer {access_token here}' \
--header '8x8-apikey: {8x8-apikey input here}' \
--header 'Content-Type: application/json' \
--data '{"callerAddresses":["1006","1008"],"startDate":"2026-07-01T00:00:00Z","endDate":"2026-07-15T23:59:59Z","sortingField":"startTime","sortingDirection":"DESC","limit":50}'
```

## Response

The aggregated endpoint returns a `calls` array; each entry groups a `caller`, the `calleeData` they last tried to reach, the `siteData` of that callee, the number of unreturned `attempts` and the `latestStartTime`.

> 📘 **Durations (e.g. `totalDuration`) are in seconds; timestamps are epoch milliseconds.**
>
>

```json
{
  "calls": [
    {
      "caller": {
        "id": "Chay Hoss,1006",
        "address": "1006",
        "name": "Chay Hoss",
        "deviceModel": "voo8x8"
      },
      "calleeData": {
        "address": "1014",
        "name": "Chandler Hollow",
        "deviceModel": "voo8x8"
      },
      "siteData": { "id": "site-1", "name": "Headquarters" },
      "attempts": 3,
      "latestStartTime": 1717751880000
    }
  ]
}
```

The `/callees` and `/callers` endpoints return a `participants` array of `{ name, address }`:

```json
{
  "participants": [
    { "name": "Chandler Hollow", "address": "1014" },
    { "name": "Support Queue", "address": "1000" }
  ]
}
```

The detailed endpoints (GET and POST) return a `records` array; each entry is one unreturned call with its `callId`, `caller`/`callee`, the `workGroup` (queue or ring group) it went through, timings and `outcome`:

```json
{
  "records": [
    {
      "callId": "1717751880000",
      "transferToCallId": "1717751890000",
      "caller": { "id": "Chay Hoss,1006", "address": "1006", "name": "Chay Hoss" },
      "callee": { "address": "1014", "name": "Chandler Hollow" },
      "workGroup": { "id": "tqteLkZOScyi0Mai9ewUlA", "extension": "1000", "groupType": "CALL_QUEUE" },
      "startTime": 1717751880000,
      "totalDuration": 54.88,
      "did": "1000",
      "outcome": "ABANDONED",
      "labels": ["WAITING", "ALERTING", "ABANDONED"]
    }
  ]
}
```

For the complete list of selectable fields and their descriptions, see the [Unreturned Calls reference](/analytics/reference/get-unreturned-calls) and the [Detailed reference](/analytics/reference/get-unreturned-detailed).
