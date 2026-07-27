# Ring Group Summary

> 📘 Looking for live/real-time queue, agent or call-level data? See [Work Analytics — Overview](/analytics/docs/work-analytics-queue-agent-reports).

> 📘 **Updated Endpoint**
>
> The [Ring Group Member Summary](/analytics/docs/ring-group-member-summary) and [Ring Group Summary](/analytics/docs/wa-ring-group-summary) are dedicated endpoints to replace the previous [Ring Group & Ring Group Member Summary](/analytics/docs/work-analytics-ring-group-summary) endpoint which served both purposes
>
>

> 📘
>
> Note: This API provides access to data from the past 2 years only in accordance with Analytics for Work data compliance policies; queries spanning more than 2 years will return only the most recent 2 years of data, and queries outside this range will return no results
>
>

> 📘 **You will need a working API key to begin**
>
> You can generate API credentials from [How to get API Keys](/analytics/docs/how-to-get-api-keys)
>
> The `8x8-api-key` will be the `Key` generated. For Work Analytics the Secret from Admin Console is not required.
>
>

Use the following base URL during this process:

* `https://api.8x8.com/analytics/work`

## Run Ring Group Summary

This will return a summary for all of the Ring Groups in the specified PBXs for the duration specified.

### Parameters

**Method:** GET

#### Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| Authorization | ✓ | Pass the access_token returned from the authentication request as a Bearer token `Bearer {access_token}` | Bearer eyJhbGciOiJSUzI1NiJ9.yyyyyyyyy.zzzzzzzzzzzzzzzzzz |

#### Path

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| version | ✓ | The current version for ring group summary is v2 | v2 |

#### Query

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| pbxId | ✓ | Pass the pbxId (PBX Name) of the requested pbx or comma separated list of pbxIds or `allpbxes` for all of the pbxs in the customer account. PBX names can be found [here in Admin Console](https://admin.8x8.com/company/pbx) | acmecorp,acmecorp2 |
| startTime | ✓ | The interval start time for CDR searches - the format is YYYY-MM-DD HH:MM:SS. | 2022-10-20 08:30:00 |
| endTime | ✓ | The interval end time for CDR searches - the format is YYYY-MM-DD HH:MM:SS. | 2022-10-20 19:00:00 |
| timeZone | ✓ | [IANA Time Zones](https://www.iana.org/time-zones). Examples America/New_York, Europe/London [Wikipedia Time Zone List](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) | America/New_York |

### Ring Group Summary Request

As per the Open API specification guidelines, we have migrated the URLs for Ring Group Summary Report as give in the below table :

| Deprecated URL Version | Migrated URL (Current version) |
| --- | --- |
| v2/rgsum | v2/rgsum-groups |

> 📘 **Try out the Ring Group Summary**
>
> Which group has the least missed calls, lets find out @ [Ring Group Summary Reference](/analytics/reference/ring-group-summary)
>
>

```bash
curl --location --request GET 'https://api.8x8.com/analytics/work/v{version}/rgsum-groups?pbxId={pbxId here}&startTime=2022-02-03 00:00:00&endTime=2022-02-03 10:00:00&timeZone=America/New_York' \
--header 'Authorization: Bearer {access_token here}' \
--header '8x8-apikey: {8x8-apikey input here}'

```

### Ring Group Summary Response

For details on the company summary metrics please refer to [Ring Group Summary Glossary](https://docs.8x8.com/8x8WebHelp/8x8analytics-virtual-office/Content/VOA/ring-group-summary.htm#Glossary)

> 📘 **Durations are in milliseconds**
>
>

```json
[
    {
        "pbxId": "acmecorp",
        "site": "East",
        "name": "Marketing",
        "extension": "100027",
        "totalMembers": 0,
        "totalInbound": 1,
        "totalAbandoned": 1,
        "totalAnswered": 0,
        "totalMissed": 1,
        "totalCallsToVM": 0,
        "totalAdvanced": 0,
        "totalRgTime": 5475,
        "totalTalkTime": 0,
        "totalCalls": 1,
        "avgAbandonedTime": 5475,
        "avgRgTime": 5475,
        "avgRingTime": 283,
        "avgTalkTime": 0,
        "totalAbandonedTime": 5475,
        "totalRingTime": 283
    },
    {
        "pbxId": "acmecorp2",
        "site": "West",
        "name": "Sales",
        "extension": "100055",
        "totalMembers": 0,
        "totalInbound": 12,
        "totalAbandoned": 0,
        "totalAnswered": 0,
        "totalMissed": 12,
        "totalCallsToVM": 12,
        "totalAdvanced": 0,
        "totalRgTime": 0,
        "totalTalkTime": 0,
        "totalCalls": 12,
        "avgAbandonedTime": 0,
        "avgRgTime": 0,
        "avgRingTime": 0,
        "avgTalkTime": 0,
        "totalAbandonedTime": 0,
        "totalRingTime": 0
    }
  ]

```
