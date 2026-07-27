# Work Analytics — Overview

The Work Analytics v2 reporting API powers the Call Queue, Agent Activity, Ring Group and call-level reports shown in the 8x8 **Analytics for Work** application. Each report in this section maps to one API endpoint that you can call directly to reproduce the data behind it.

These endpoints serve **both** historical and live data: supply `startDate`/`endDate` to get aggregated metrics over a past window, or omit them to get the current live state (the `ongoing*` metrics).

All of these endpoints share the same base URL, authentication and a common set of filtering/time-window parameters, documented once on this page. Each report page then documents only what is specific to that endpoint (its metrics, response shape and any extra parameters).

> 📘 **You will need a working API key to begin**
>
> You can generate API credentials from [How to get API Keys](/analytics/docs/how-to-get-api-keys).
>
> The `8x8-apikey` will be the `Key` generated. For Work Analytics the Secret from Admin Console is not required.
>
>

## Base URL

Use the following base URL for every endpoint in this section:

* `https://api.8x8.com/analytics/work`

## 1. Authenticate to retrieve access token

You authenticate with your API key combined with the credentials of a user who has permission and access to Work Analytics. That user **does not need to be** the one who generated the API credentials.

> 🚧 **User must access Analytics at least once via browser**
>
> The user's credentials cannot be used with the API until they have opened Analytics for Work in a browser at least once.
>
>

### Parameters

**Method: POST**

#### Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| 8x8-apikey | ✓ | The 8x8-apikey provided | test_key_kjdfidj238jf9123df221 |
| Content-Type | ✓ | Set content type to form-urlencoded | application/x-www-form-urlencoded |

#### Body

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| username | ✓ | The 8x8 username of a user with Work Analytics access privileges | [someuser@acme.fakeco](mailto:someuser@acme.fakeco) |
| password | ✓ | The 8x8 password of the user with Work Analytics access privileges | Rrnp5QBW6dTbx^TP |

### Authentication Request

```bash
curl --location --request POST 'https://api.8x8.com/analytics/work/v1/oauth/token' \
--header '8x8-apikey: {8x8-apikey input here}' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username={8x8 username of user input here}' \
--data-urlencode 'password={8x8 password of user input here}'
```

### Authentication Response

```json
{
    "access_token": "eyJhbGciOiJSUzI1NiJ9.yyyyyyyy.zzzzzzzzzz",
    "token_type": "bearer",
    "expires_in": 1800
}
```

**Outputs for the next step:**

* `access_token`
* `expires_in`

The token expires after `expires_in` seconds. Every report request below is authenticated by sending the `8x8-apikey` header **and** an `Authorization` header set to `Bearer {access_token}` (note the space between `Bearer` and the token).

## 2. Common request parameters

Every report in this section is scoped to a PBX (`pbxId`, path parameter) and accepts the same filtering and time-window query parameters. Individual report pages list any additional parameters they support.

#### Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| 8x8-apikey | ✓ | The 8x8-apikey provided | test_key_kjdfidj238jf9123df221 |
| Authorization | ✓ | The `access_token` from step 1 as a Bearer token | Bearer eyJhbGciOiJSUzI1NiJ9.yyyyyyyy.zzzzzzzzzz |

#### Path

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| pbxId | ✓ | The opaque id of the PBX (not the PBX name). | P2DlDO1HSKe0uPdZlClziw |

#### Query

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| siteIds | | Filter by site — comma-separated **opaque site ids** (not site names). If omitted, all sites for the PBX are returned. | vcXZjfBOT2yWxhUQHzwqwe |
| queueIds | | Filter by call queue — comma-separated **opaque queue ids** (not queue names). If omitted, all queues for the PBX are returned. | JMwyX0BUTRC9uAnuAz8wfg |
| startDate | | Report start date (ISO 8601). If `startDate` is entered, `endDate` is required as well. | 2026-07-01T00:00:00Z |
| endDate | | Report end date (ISO 8601). If `endDate` is entered, `startDate` is required as well. | 2026-07-15T23:59:59Z |
| intraDayStart | | Intra-day start time (ISO 8601, up to seconds). Requires `intraDayEnd`, and only valid together with `startDate`/`endDate`. | 2026-07-01T09:00:00Z |
| intraDayEnd | | Intra-day end time (ISO 8601, up to seconds). Requires `intraDayStart`, and only valid together with `startDate`/`endDate`. | 2026-07-01T17:00:00Z |
| metrics | | Comma-separated list of metrics to return. The values allowed differ per endpoint — see each report page and its reference. | enteredCalls,acceptedCalls |
| includeSummary | | Defaults to `true`; pass `false` to omit the aggregated summary of the requested metrics. | false |

> 📘 **Time window vs. live state**
>
> When `startDate`/`endDate` are supplied the report covers that historical window. When both are omitted the endpoint returns current values — the `ongoing*` live metrics (calls and agents active right now) together with aggregates over the recent default window.
>
>

## Reports in this section

| Report | Endpoint | Reference |
| --- | --- | --- |
| [Call Queues](/analytics/docs/work-analytics-call-queues) | `GET /v2/pbxes/{pbxId}/call-queue-metrics` | [Get Call Queue Metrics](/analytics/reference/get-queue-metrics) |
| [Agent Activity](/analytics/docs/work-analytics-agent-activity) | `GET /v2/pbxes/{pbxId}/agent-activity` | [Agent Activity](/analytics/reference/get-agent-activity) |
| [Queue Agent Activity](/analytics/docs/work-analytics-queue-agent-activity) | `GET /v2/pbxes/{pbxId}/queue-agent-activity` | [Agent Activity per Queue](/analytics/reference/get-agent-queue-activity) |
| [Ring Group Agent Activity](/analytics/docs/work-analytics-ring-group-agent-activity) | `GET /v2/pbxes/{pbxId}/ring-group-agent-activity/{ringGroupId}` | [Ring Group Agent Activity](/analytics/reference/get-ring-group-agent-activity) |
| [Aggregated & Detailed Calls](/analytics/docs/work-analytics-aggregated-calls) | `GET /v2/pbxes/{pbxId}/calls` | [Call Queue Data Table](/analytics/reference/aggregated-3) |
| [Active Calls](/analytics/docs/work-analytics-active-calls) | `GET /v2/pbxes/{pbxId}/calls/active` | [Active Calls](/analytics/reference/get-active-calls) |
| [Unreturned Calls](/analytics/docs/work-analytics-unreturned-calls) | `GET /v2/pbxes/{pbxId}/calls/unreturned` | [Unreturned Calls](/analytics/reference/get-unreturned-calls) |

## Related reports

These v2 endpoints serve live and recent-window data. For the older batch **summary** reports — [Company Summary](/analytics/docs/work-analytics-company-summary), [Extension Summary](/analytics/docs/work-analytics-extension-summary), the ring group summaries, and [Call Detail Records](/analytics/docs/work-analytics-call-detail-records) / [Call Legs](/analytics/docs/work-analytics-call-legs) — see the other Work Analytics report pages in this section.
