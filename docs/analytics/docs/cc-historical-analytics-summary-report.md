# CC Historical Analytics Summary Report

Customers looking to access data in JSON or CSV/XLSX from [CC Historical Analytics](/analytics/reference/cc-historical-report-create) can follow the this multi step process.

> 📘 **You will need a working API key to begin**
>
> [How to get API Keys](/analytics/docs/how-to-get-api-keys)
>
>

The base URL is region specific, based on the location of your Contact Center tenant.

* United States: `api.8x8.com/analytics/cc/{version}/historical-metrics/`
* Europe: `api.8x8.com/eu/analytics/cc/{version}/historical-metrics/`
* Asia-Pacific: `api.8x8.com/au/analytics/cc/{version}/historical-metrics/`
* Canada: `api.8x8.com/ca/analytics/cc/{version}/historical-metrics/`
* {version} to be replaced by current Version. As of August 2025 this is 8 resulting in /v8/

## 1. Authenticate to retrieve access token

[OAuth Authentication for 8x8 XCaaS APIs](/analytics/docs/oauth-authentication-for-8x8-xcaas-apis) is used to get a temporary `access_token` for use in with this API

**Outputs For Next Step:**

* access_token
* expires_in

The following steps will use the access_token as a Bearer Token form of authentication. This takes the form of the  

`Authorization` header being set to `Bearer access_token` (Space between Bearer and the access_token)

> 📘 **JSON Examples shown, XML Also available**
>
> This guide shows all the examples in JSON. It is possible to retrieve responses in XML by specifying the following header
>
> `Accept: application/xml`
>
>

## 2 Multitenancy support

If the API is used for a multitenant customer the requests should contain "X-Tenant-Info" header variable where needs to specify the desired tenantId. The "X-Tenant-Info" header is not mandatory in case of a single tenant customer.

The following error messages could be returned when dealing with a multitenant customer:

* if for a multitenant customer request the *"X-Tenant-Info"* header is not provided the HTTP 400 code along with *"Bad request: X-Tenant-Info header is missing."* message will be returned
* if a wrong tenantId is provided the HTTP 400 code along with *"Bad request: Invalid value for X-Tenant-Info header."* message will be returned

## 3. Get Available Report Types

CC Historical Analytics allows the consumer to get a listing of the available reports including information about their options and available data.

Additional information about each of the reports and detailed definitions of metrics can be found in the [Metrics Glossary](#8-metrics-glossary)

### Parameters

**Method: GET**

#### Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| Authorization | ✓ | Pass the access_token returned from the authentication request as a Bearer token `Bearer {access_token}` | Bearer kfjdfi3jfopajdkf93fa9pjfdoiap |

#### Path

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| version | ✓ | The current version is `v8` | v8 |
| report-type | ☐ | Specific report type to get information on. Omit this parameter to get all report types. | agent-status-by-status-code |

[API reference](/analytics/reference/cc-historical-analytics-report-types)

### Report Types Request

The definition of a single report can also be retrieved by adding the `report-type` to the path

all report typessingle report type

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v8/historical-metrics/report-types' \
     --header 'Accept: application/json;charset=UTF-8' \
     --header 'Authorization: Bearer {access_token}'

```

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v8/historical-metrics/report-types/agent-status-by-status-code' \
     --header 'Accept: application/json;charset=UTF-8' \
     --header 'Authorization: Bearer {access_token}' 

```

### Report Types Response

The response shows each `report-type` that's available.

> 📘 **Detailed Reports**
>
> This returns some "detailed" report types as well as the summary reports. Detailed reports have a different format described in the [CC Historical Analytics Detailed Report Guide](/analytics/docs/cc-historical-analytics-detailed-report)
>
>

**Outputs For Next Step:**  

For the summary reports the response has a number of elements to guide the usage:

* `type` each report type has a unique definition
* `groupBy` each report has one or more groupBy options. This specifies the grouping for the output
  * `name` this is the name to specify when creating a report with a specific grouping
  * `filters` these are the available filters for this report type for this particular grouping. The filters available vary depending on the type AND the grouping.
* `metrics` these are the available metrics for the report type. When creating a report. See the [Metrics Glossary](#8-metrics-glossary) for additional detail on the definition of the available metrics
* When running reports:
  * if no metrics are specified: All metrics will be returned
  * if metrics are specified: ONLY the specified metrics will be returned

The body will be an array as shown below.

* The array will contain one or more objects as described here

  * **type**: this is the report type and name of the report
  * **groupBy**: array of options for grouping the report by various dimensions
    * *name*: name of the grouping
    * *filters*: array of the possible filtering options for this grouping for this report
  * **value**: array of the metrics available for this report

```json
[
    {
        "type": "report type name",
        "groupBy": [
            {
                "name": "name of grouping 1",
                "filters": [
                    "filterable dimension 1",
                    "filterable dimension 2"
                ]
            },
            {
                "name": "name of grouping 2",
                "filters": [
                    "filterable dimension 1",
                    "filterable dimension 2",
                    "filterable dimension 3",
                ]
            }
        ],
        "metrics": [
            "report metric 1",
            "report metric 2"
        ]
    }
]

```

**Sample Response for single report type**

The result **will be different** for each report type.

```json
{
    "type": "agent-interactions-summary",
    "groupBy": [
        {
            "name": "agent",
            "filters": [
                "agent"
            ]
        },
        {
            "name": "agent-and-media",
            "filters": [
                "agent",
                "media"
            ]
        },
        {
            "name": "agent-and-media-and-channel",
            "filters": [
                "agent",
                "media"
            ]
        },
        {
            "name": "agent-and-media-and-channel-and-queue",
            "filters": [
                "agent",
                "media",
                "queue"
            ]
        },
        {
            "name": "agent-and-media-and-queue",
            "filters": [
                "agent",
                "media",
                "queue"
            ]
        },
        {
            "name": "group",
            "filters": [
                "group"
            ]
        },
        {
            "name": "group-and-agent",
            "filters": [
                "agent",
                "group"
            ]
        },
        {
            "name": "group-and-agent-and-media",
            "filters": [
                "agent",
                "group",
                "media"
            ]
        },
        {
            "name": "group-and-agent-and-media-and-channel",
            "filters": [
                "agent",
                "group",
                "media"
            ]
        },
        {
            "name": "group-and-agent-and-media-and-channel-and-queue",
            "filters": [
                "agent",
                "group",
                "media",
                "queue"
            ]
        },
        {
            "name": "group-and-agent-and-media-and-queue",
            "filters": [
                "agent",
                "group",
                "media",
                "queue"
            ]
        },
        {
            "name": "group-and-media",
            "filters": [
                "group",
                "media"
            ]
        },
        {
            "name": "group-and-media-and-channel",
            "filters": [
                "group",
                "media"
            ]},
        {
            "name": "group-and-media-and-channel-and-queue",
            "filters": [
                "group",
                "media",
                "queue"
            ]
        },
        {
            "name": "group-and-media-and-queue",
            "filters": [
                "group",
                "media",
                "queue"
            ]
        }
    ],
    "metrics": [
        "abandoned",
        "abandonedPercentage",
        "accepted",
        "acceptedPercentage",
        "alerting",
        "avgBusyTime",
        "avgHandlingTime",
        "avgHoldTime",
        "avgSpeedToAnswer",
        "avgWrapUpTime",
        "blindTransferToAgent",
        "blindTransferToQueue",
        "blindTransfersInitiated",
        "blindTransfersReceived",
        "busyTime",
        "handlingTime",
        "hold",
        "holdTime",
        "longestHoldTime",
        "longestOfferingTime",
        "offeringTime",
        "presented",
        "rejectTimeout",
        "rejected",
        "rejectedPercentage",
        "transfersInitiated",
        "transfersInitiatedPercentage",
        "transfersReceived",
        "warmTransfersCompleted",
        "warmTransfersReceived",
        "wrapUpTime"
    ]
}

```

## 4. Creating A Summary Report

> 📘 **This sample is applicable to ALL summary report types**
>
> The values in passed in will be specific to the report-type but the concepts are applicable to all summary report types.
>
>

### Parameters

**Method:** POST

#### Headers

| Name          | Required | Description                                                                                              | Example                              |
| ------------- | -------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Authorization | ✓        | Pass the access_token returned from the authentication request as a Bearer token `Bearer {access_token}` | Bearer kfjdfi3jfopajdkf93fa9pjfdoiap |
| Content-Type  | ✓        | Set Content-Type to application/json                                                                     | application/json                     |

#### Path

| Name        | Required | Description                                                                              | Example                     |
| ----------- | -------- | ---------------------------------------------------------------------------------------- | --------------------------- |
| version     | ✓        | The current version is `v8`                                                              | v8                          |
| report-type | ☐        | Specific report type to get information on. Omit this parameter to get all report types. | agent-status-by-status-code |

#### Body

| Name                    | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Example                                                                                                                                                                        |
| ----------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| type                    | ✓        | The report type. Acceptable value is any one of the types returned from the `report-types` API                                                                                                                                                                                                                                                                                                                                                                                               | agent-status-by-status-code                                                                                                                                                    |
| title                   | ✓        | The report title, which allows only the characters listed below: letters from A to Z, a to z, 0 to 9, whitespaces or ! - \_ . \* ' ( ). If the report is later downloaded as a file, the title is used as the filename.                                                                                                                                                                                                                                                                      | Agent Status By Code Aug Sep                                                                                                                                                   |
| dateRange.start         | ✓        | This parameter specifies that only events and records on or after the specified date are in the report. The entered values should follow the ISO 8061 standard (YYYY-MM-DDTHH:MM:SS.SSSZ) (For example, 2019-09-01T23:00:00.000Z)                                                                                                                                                                                                                                                            |                                                                                                                                                                                |
| dateRange.end           | ✓        | This parameter specifies that only events and records on or before the specified date are included in the report. The entered values should follow the ISO 8061 standard. (YYYY-MM-DDTHH:MM:SS.SSSZ) (For example, 2019-09-01T23:00:00.000Z)                                                                                                                                                                                                                                                 |                                                                                                                                                                                |
| granularity             | ✓        | This parameter specifies how to aggregate the report data by time intervals. You must use one of the following values: 15m, 30m, hour, day, week, month, year, or none. See [granularity](/analytics/docs/cc-historical-analytics-summary-report#granularity) for more information.                                                                                                                                                                                                          | 15m                                                                                                                                                                            |
| groupBy.name            | ✓        | This parameter controls how your data should be grouped by dimensions. It must be one of the grouping options returned by report-type for the specified report type.                                                                                                                                                                                                                                                                                                                         | media-and-channel-and-queue                                                                                                                                                    |
| groupBy,filters[]       | ☐        | Filters are an array of names and values that describes the dimension to filter by and the values of those filter(s). See [filters](/analytics/docs/cc-historical-analytics-summary-report#filters) for more detail.                                                                                                                                                                                                                                                                         | [filters](/analytics/docs/cc-historical-analytics-summary-report#filters)                                                                                                      |
| timezone                | ☐        | The desired timezone ([IANA Time Zones](https://www.iana.org/time-zones). Examples America/New_York, Europe/Helsinki [Wikipedia Time Zone List](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)) that is applicable to current metrics only. Accepted timezone values are those that are configured for the tenant. The value can be the tenant’s default timezone or a value defined as an optional timezone. If no value is specified, the tenant’s default timezone is used | Europe/Helsinki                                                                                                                                                                |
| intraDayTimeRange.start | ☐        | See [IntraDayTimeRange](/analytics/docs/cc-historical-analytics-summary-report#intradaytimerange). The start time for the intraDayTimeRange. The format is hh:mm:ss                                                                                                                                                                                                                                                                                                                          | 08:30:00                                                                                                                                                                       |
| intraDayTimeRange.end   | ☐        | See [IntraDayTimeRange](/analytics/docs/cc-historical-analytics-summary-report#intradaytimerange). The end time for the intraDayTimeRange. The end must be at least 15 minutes after the start. The format is hh:mm:ss                                                                                                                                                                                                                                                                       | 17:00:00                                                                                                                                                                       |
| metrics                 | ☐        | Can be omitted and all available metrics will be returned, or an array of `metrics` can be specified and only these metrics will be returned.                                                                                                                                                                                                                                                                                                                                                | "metrics": [ <br />"accepted",<br />"acceptedInSla",<br />"acceptedInSlaPercentage",<br />"acceptedPercentage",<br />"totalAbandoned",<br />"totalAbandonedPercentage"<br /> ] |
| includeSubTotal         | ☐        | (Default `false`) This parameter adds subtotals rows in the report. It accepts only Boolean values written as `true` or `false` or as strings listed as `"true"` or `"false"`.                                                                                                                                                                                                                                                                                                               | true                                                                                                                                                                           |
| includeGrandTotal       | ☐        | (Default `false`)This parameter puts the grand total row in the report. It accepts only Boolean values written as `true` or `false` or as strings listed as `"true"` or `"false"`                                                                                                                                                                                                                                                                                                            | true                                                                                                                                                                           |

#### granularity

This parameter specifies how to aggregate the report data by time intervals. You must use one of the following values: 15m, 30m, hour, day, week, month, year, or none.

* If the assigned parameter value is none, then the report data is not aggregated by time.
* For date range intervals less than or equal to a week the accepted > - granularities are 15m, 30m, hour, day, or none.
* For date range intervals less than or equal to a month and but longer than a week the accepted granularities are none, hour, day, or week
* For date range intervals longer than a month the accepted granularities are none, month, or year

#### intraDayTimeRange

This parameter is used to specify a time range filter which applies within each day of the report. If this parameter is not specified, data will be returned for the complete time frame described in the mandatory dateRange object.

> 🚧 **intraDayTimeRange minimum size**
>
> The *end* must be 15 minutes after the start for summary reports and 5 minutes after the start for detailed reports.
>
>

* *start*: the start time for the intraDayTimeRange. The format is hh:mm:ss
* *end*: the end time for the intraDayTimeRange. The format is hh:mm:ss

If the requirement is to only see data between 8:30am and 5pm on each day the intraDayTimeRange would be passed as follows

```json
"intraDayTimeRange": 
{
        "start": "08:30:00",
        "end": "17:00:00"
}

```

In version 6 intraDayTimeRange was enhanced to to cover cross-day time range filtering in reports allowing to generate a single report for overnight shifts, and it is available for all aggregated and detailed report types. You can now generate reports for overnight shifts of specific time ranges that cross two days.

With the following example can be generated a report which cover activities for a week but for only time intervals from 20:00 to 06:00 time range.

```json
"dateRange":
{ 
    "start": "2022-08-05T00:00:00.00Z", 
    "end": "2022-08-11T00:00:00.00Z" 
},
"intraDayTimeRange": 
{
    "start": "20:00:00",
    "end": "06:00:00"
}

```

#### filters

Parameter can be completely omitted Or an empty array can be passed for no filtering.

For example report type `queue-interactions-summary` and groupBy `media-and-channel-and-queue` we can chose to not filter at all OR filter by `media` and or `queue`

Each report type has it's own filtering capabilies which can be found in the [Report Types Response](/analytics/docs/cc-historical-analytics-summary-report#report-types-response) each `groupBy` has it's own applicable filters.

no filtersingle queuefilter on multiple queuesfilter on multiple queues and multiple media

```json
  "filters": [
  ] 

```

```json
  "filters": [
       {
          "name": "queue",  
          "values": ["103"]
       }
  ]

```

```json
  "filters": [
       {
          "name": "queue",  
          "values": ["103", "330"]
       }
  ]

```

```json
  "filters": [
       {
          "name": "queue",  
          "values": ["103", "330"]
       },
       {
          "name": "media",  
          "values": ["Phone", "Chat"]
       }
  ]

```

*Notes:*

* When filtering by `media`, if the user also wants to filter by phone or email direction, instead of using `{"name": "media", "values": ["Phone"]}`, the phone direction can be specified as follows: `{"name": "media", "values": ["OutboundPhone"]}` or `{"name": "media", "values": ["InboundPhone"]}`, and instead of using `{"name": "media", "values": ["Email"]}`, the email direction can be specified as follows: `{"name": "media", "values": ["OutboundEmail"]}` or `{"name": "media", "values": ["InboundEmail"]}`
* When creating an `agent-interactions-by-wrap-up-code` report type, and the customer wants to filter by `wrap-up-code`, the filter values should be formatted as follows: `{"name": "wrap-up-code", "values": ["<wrap-up-code-list-id>-<wrap-up-code-item-id>"]}`. The `<wrap-up-code-list-id>` and `<wrap-up-code-item-id>` can be found in the CCA UI detailed reports by adding the 'Wrap Up Code List ID' and 'Wrap Up Code ID' fields to the report. For example: `{"name": "wrap-up-code", "values": ["170-1201"]}`

#### metrics

If the requirement is to only have a subset of the the available metrics for the report type, we specify the required metrics

* if no metrics are specified (omitted entirely or empty array) ==> All metrics will be returned
* if metrics are specified ==> ONLY the specified metrics will be returned

The [Metrics Glossary](#8-metrics-glossary) provides detail on the definition of the available metrics

```json
"metrics": [
    "accepted",
    "acceptedInSla",
    "acceptedInSlaPercentage",
    "acceptedPercentage",
    "totalAbandoned",
    "totalAbandonedPercentage"
]

```

[API reference](/analytics/reference/cc-historical-report-create)

### Create Report Request

In this example we are running the report from 3rd August to 2nd September, we are only interested in the periods between 8:30am and 5pm on each day and we are grouping the data by media, channel and queue at a weekly granularity.  

The data returned will only be for queue id is 103 and 330 and only if the media is Phone or Chat and the metrics returned will be only the ones specified, with sub and grand totals.

```bash
curl --location --request POST 'https://api.8x8.com/analytics/cc/v8/historical-metrics' \
--header 'Authorization: Bearer {access_token}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "type": "queue-interactions-summary",
    "title": "Weeky Queue Report for OPS",
    "dateRange": {
        "start": "2022-08-03T00:00:00.000Z",
        "end": "2022-09-02T00:00:00.000Z"
    },
    "granularity": "week", 
    "groupBy":{
      "name":"media-and-channel-and-queue",
         "filters": [
             {
                "name": "queue",  
                "values": ["103", "330"]
             },
             {
                "name": "media",  
                "values": ["Phone", "Chat"]
             }
        ]
    },
    "timezone": "America/New_York",
    "intraDayTimeRange":
    {
            "start": "08:30:00",
            "end": "17:00:00"
    },
    "metrics": [
        "accepted",
        "acceptedInSla",
        "acceptedInSlaPercentage",
        "acceptedPercentage",
        "totalAbandoned",
        "totalAbandonedPercentage"
    ],
    "includeGrandTotal": true,
    "includeSubTotal": true
}'

```

### Create Report Response

For an accepted request to create a report the response will be 200 OK

#### Headers

* Link => The Link header will provide details on how to check the status of the create request

```text
[https://api.8x8.com/analytics/cc/v<<versionCCAHistorical](https://api.8x8.com/analytics/cc/v<<versionCCAHistorical)>/historical-metrics/2710192/status; rel="status">

```

#### Body

* **id**: this is the identifier for the generated report
* **status**: this is the status of the request to create the report
  * IN_PROGRESS : the report is being generated, usually the initial status
  * DONE : the report has been generated
  * FAILED : the report has failed to generate

```json
{
    "id": 2710192,
    "status": "IN_PROGRESS"
}

```

## 5. Get Report Status

### Parameters

**Method:** GET

#### Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| Authorization | ✓ | Pass the access_token returned from the authentication request as a Bearer token `Bearer {access_token}` | Bearer kfjdfi3jfopajdkf93fa9pjfdoiap |

#### Path

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| version | ✓ | The current version is `v8` | v8 |
| report-id | ✓ | report id returned in the create report request. | 2710192 |

[API reference](/analytics/reference/cc-historical-report-status-by-id)

### Report Status Request

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v8/historical-metrics/2710192/status' \
     --header 'Authorization: Bearer access_token'

```

### Report Status response

This will be the same format as the response from creating the report. Recheck the status periodically until the status is `"DONE"`.

> 🚧 **Don't check status in a tight loop (please)**
>
> Leave some time between status checks, repeatedly requesting updates without taking a pause is more likely to slow the response than speed it up.
>
>

#### Headers

The Link header WILL ONLY be present if the report staus is `"DONE"`

* Link => The Link header will provide details on how access the data and download for the report

```text
[https://api.8x8.com/analytics/cc/v<<versionCCAHistorical](https://api.8x8.com/analytics/cc/v<<versionCCAHistorical)>/historical-metrics/2710663/data?page=0&size=100>; rel="data",
[https://api.8x8.com/analytics/cc/v<<versionCCAHistorical](https://api.8x8.com/analytics/cc/v<<versionCCAHistorical)>/historical-metrics/2710663/download>; rel="download"

```

#### Body

* **id**: this is the identifier for the generated report
* **status**: this is the status of the request to create the report
  * IN_PROGRESS : the report is being generated, usually the initial status
  * DONE : the report has been generated
  * FAILED : the report has failed to generate

```json
{
    "id": 2710192,
    "status": "IN_PROGRESS"
}

```

## 6a. Get Report Data (JSON)

> 📘 **Accessing the report Data**
>
> The data is available via JSON or via CSV/XLSX. To access the data as JSON the data endpoint is used, for CSV/XLSX the download endpoint is used.
>
>

> 🚧 **Data (JSON) results are capped at 10,000 records.**
>
> CSV/XLS will return all larger result sets.
>
> Detailed Reports have an alternative approach since larger result sets are expected.
>
>

### Parameters

**Method:** GET

#### Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| Authorization | ✓ | Pass the access_token returned from the authentication request as a Bearer token `Bearer {access_token}` | Bearer kfjdfi3jfopajdkf93fa9pjfdoiap |

#### Path

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| version | ✓ | The current version is `v8` | v8 |
| report-id | ✓ | report id returned in the create report request. | 2710192 |

#### Query

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| page | ☐ | (starts from 0) enables navigation to the expected page; if no value is specified then the first page is retrieved. Required on subsequent pages | 0 |
| size | ☐ | gives the amounts of elements on one page. If no value is specified then default values are used (0 for page, 100 for size). Maximum page size is 1000 elements | 200 |

[API reference](/analytics/reference/cc-historical-report-data-by-id)

### Report Data (JSON) Request

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v8/historical-metrics/2710192/data?page=0&size=100' \
--header 'Authorization: Bearer {access_token}'

```

### Report Data (JSON) Response

#### Headers

* Link => The Link header will provide a link to the next page in the data if there are additional pages. **Will not be present if there are no more pages.**

```text
[https://api.8x8.com/analytics/cc/v<<versionCCAHistorical](https://api.8x8.com/analytics/cc/v<<versionCCAHistorical)>/historical-metrics/2710663/data?page=1&size=100>; rel="next"

```

* **X-Page**: current page number, 0(zero) is the first page
* **X-Page-Size**: size of the requested pages
* **X-Total-Pages**: total number of pages for the report, 1 if only one page.
* **X-Total-Elements**: total number of elements for the report

#### Body

The body will be an array as shown below.

* The array could be empty if there are no records in the result
* If not empty the array will contain one or more objects as described here  

* **total**: if this represents a subtotal or grandtotal (only present if "includeGrandTotal": true, "includeSubTotal": true were requested)  

* **items**: array of the dimensions and metrics being returned. There will be one object for each.  

* *key*: the value will be the name of the dimension/metric  

* *label*: the value will be the human friendly name of the dimension/metric  

* *value*: the value will be the value of the dimension/metric. This is ALWAYS a string.

```json
[
    {
        "total": null,
        "items": [
            {
                "key": "name of key",
                "label": "Human friendly label of key",
                "value": "string representation of value",
            },
            {
                "key": "name of key",
                "label": "Human friendly label of key",
                "value": "string representation of value",
            }
        ]
    },
    {
        "total": {
            "type": "subtotal",
            "startIndex": 0,
            "endIndex": 1
        },
        "items": [
            {
                "key": "name of key",
                "label": "Human friendly label of key",
                "value": "string representation of value",
            },
            {
                "key": "name of key",
                "label": "Human friendly label of key",
                "value": "string representation of value",
            }
        ]
    }
    ,
    {
        "total": {
            "type": "grandtotal",
            "startIndex": null,
            "endIndex": null
        },
        "items": [
            {
                "key": "name of key",
                "label": "Human friendly label of key",
                "value": "string representation of value",
            },
            {
                "key": "name of key",
                "label": "Human friendly label of key",
                "value": "string representation of value",
            }
        ]
    }
]
[
    {
        "total": null,
        "items": {
            "name1": "value1",
            "name2": 3
            "name3": "2022-09-02T00:00:00.000Z",
        }
        
    },
    {
        "total": {
            "type": "subtotal",
            "startIndex": 0,
            "endIndex": 1
        },
        "items": [
            {
                "key": "name of key",
                "label": "Human friendly label of key",
                "value": "string representation of value",
            },
            {
                "key": "name of key",
                "label": "Human friendly label of key",
                "value": "string representation of value",
            }
        ]
    }
    ,
    {
        "total": {
            "type": "grandtotal",
            "startIndex": null,
            "endIndex": null
        },
        "items": [
            {
                "key": "name of key",
                "label": "Human friendly label of key",
                "value": "string representation of value",
            },
            {
                "key": "name of key",
                "label": "Human friendly label of key",
                "value": "string representation of value",
            }
        ]
    }
]
```

> 🚧 **Dimension values for `subtotal` and `grandtotal` items**
>
> Where a subtotal or grandtotal is summarizing multiple instances of a single dimension the value for that item will be `null` since there is no single correct value
>
>

```json
{
    "total": {
        "type": "subtotal",
        "startIndex": 23,
        "endIndex": 23
    },
    "items": [
        {
            "key": "startTime",
            "label": "Start Time",
            "value": "2022-08-29T00:00-04:00"
        },
        {
            "key": "endTime",
            "label": "End Time",
            "value": "2022-09-05T00:00-04:00"
        },
        {
            "key": "media",
            "label": "Media",
            "value": "Phone"
        },
        {
            "key": "channel",
            "label": "Channel",
            "value": null
        },
        {
            "key": "queue",
            "label": "Queue",
            "value": null
        },
        {
            "key": "queueId",
            "label": "Queue Id",
            "value": null
        },
        {
            "key": "accepted",
            "label": "Accepted",
            "value": "0"
        }
    ]
}

```

## 6b. Get Report Download (CSV/XLSX)

> 📘 **Accessing the report Data**
>
> The data is available via JSON or via CSV/XLSX. To access the data as JSON the data endpoint is used, for CSV/XLSX the download endpoint is used.
>
>

> 📘 **There is no pagination the whole file will be returned.**
>
>

### Parameters

**Method:** GET

#### Headers

| Name          | Required | Description                                                                                              | Example                              |
| ------------- | -------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| Authorization | ✓        | Pass the access_token returned from the authentication request as a Bearer token `Bearer {access_token}` | Bearer kfjdfi3jfopajdkf93fa9pjfdoiap |
| Accept        | ✓        | Specify the download type <br /><br />- CSV `text/csv`<br />- XLSX `text/xlsx`                           | text\xlsx                            |

#### Path

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| version | ✓ | The current version is `v8` | v8 |
| report-id | ✓ | report id returned in the create report request. | 2710192 |

[API reference](/analytics/reference/cc-historical-report-download-by-id)

### Report Download (CSV/XLSX) Request

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v8/historical-metrics/2710192/download' \
--header 'Accept: text/xlsx' \
--header 'Authorization: Bearer {access_token}'

```

### Report Download (CSV/XLSX) Response

#### Headers

* Content-Disposition => will contain information about the file generated, the filename will reflect the title input in the report creation with the xlsx or csv type extension added.  

Example: `attachment; filename="Weeky Queue Report for OPS.xlsx"`

#### Body

The file content is returned in the body.

## 7. Access Report Links

### Parameters

**Method:** GET

#### Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| Authorization | ✓ | Pass the access_token returned from the authentication request as a Bearer token `Bearer {access_token}` | Bearer kfjdfi3jfopajdkf93fa9pjfdoiap |

#### Path

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| version | ✓ | The current version is `v8` | v8 |
| report-id | ✓ | report id returned in the create report request. | 2710192 |

[API reference](/analytics/reference/cc-historical-report-links-by-id)

### Report Links Request

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v8/historical-metrics/2710192/links' \
--header 'Authorization: Bearer {access_token}'

```

### Report Links Response

#### Body

The body will be an array as shown below.

* `status` is always shown
* `data` and `download` are shown if the report status is DONE

```json
[
    {
        "relation": "status",
        "link": "https://api.8x8.com/analytics/cc/v8/historical-metrics/2684392/status"
    },
    {
        "relation": "data",
        "link": "https://api.8x8.com/analytics/cc/v8/historical-metrics/2684392/data?page=0&size=100"
    },
    {
        "relation": "download",
        "link": "https://api.8x8.com/analytics/cc/v8/historical-metrics/2684392/download"
    }
]

```

## 8. Metrics Glossary

This glossary provides comprehensive definitions for all metrics available across the aggregated report types. Use this reference when selecting metrics for your reports and understanding the data returned.

### 8.1. Agent Status Metrics

Agent status metrics track how agents spend their time across different operational states. These metrics help analyze agent productivity, availability patterns, and time allocation.

#### 8.1.1. Agent Status by Status Code

<details>
<summary>Click to expand Agent Status by Status Code Metrics (4 metrics)</summary>

Report type: `agent-status-by-status-code`

This report breaks down agent time by specific status codes, showing how long agents spend in each configured status reason.

**Version** indicates minimum CC Historical Analytics API version where metric became available.

| Metric | Version | Description |
|--------|---------|-------------|
| `loggedInTime` | v7+ | Total time the agent maintained active system connection and was available for work across all queues and activities within the current aggregation interval |
| `statusCodeCount` | v1+ | Number of times the agent entered or changed to a specific status code within the current aggregation interval. Tracks frequency of status changes for each configured status reason |
| `statusCodeTime` | v1+ | Total time the agent spent in a specific status code within the current aggregation interval. Represents the cumulative duration for each configured status reason |
| `timePercentage` | v7+ | Percentage of time the agent spent in a specific status code relative to total logged-in time within the current aggregation interval. Calculated as (statusCodeTime / loggedInTime) × 100 |

</details>

#### 8.1.2. Agent Status Logged In

<details>
<summary>Click to expand Agent Status Logged In Metrics (1 metric)</summary>

Report type: `agent-status-logged-in`

Tracks agent availability and productivity by showing the login sessions.

**Version** indicates minimum CC Historical Analytics API version where metric became available.

| Metric | Version | Description |
|--------|---------|-------------|
| `loggedInTime` | v1+ | Total duration of the agent's login session. Represents how long the agent maintained active system connection from login to logout |

</details>

#### 8.1.3. Agent Status Time on Status

<details>
<summary>Click to expand Agent Status Time on Status Metrics (15 metrics)</summary>

Report type: `agent-status-time-on-status`

This report breaks down agent time across major operational states, providing insight into how agents allocate their time between handling interactions, being available, taking breaks, and working offline.

**Version** indicates minimum CC Historical Analytics API version where metric became available.

| Metric | Version | Description |
|--------|---------|-------------|
| `availableTime` | v1+ | Total time the agent spent in Available state, ready to receive incoming interactions within the current aggregation interval |
| `availableTimePercentage` | v1+ | Percentage of available time relative to total logged-in time. Shows the proportion of total login time the agent spent in Available state ready to receive work within the current aggregation interval |
| `busyTime` | v1+ | Combined duration the agent spent in Offering, Handling, and Wrap Up states across all activities. Time agent is actively engaged in work activities within the current aggregation interval |
| `busyTimePercentage` | v1+ | Percentage of busy time relative to total logged-in time. Shows proportion of time agent was actively working within the current aggregation interval |
| `handlingTime` | v1+ | Total time the agent spent in Handling state, actively processing interactions within the current aggregation interval |
| `handlingTimePercentage` | v1+ | Percentage of handling time relative to total logged-in time. Shows what proportion of total login duration agent spent actively handling interactions within the current aggregation interval |
| `loggedInTime` | v1+ | Total time the agent maintained active system connection and was available for work across all queues and activities within the current aggregation interval |
| `offeringTime` | v7+ | Total duration the agent spent in Offering state waiting to accept or reject interactions across all activities within the current aggregation interval |
| `offeringTimePercent` | v7+ | Percentage of offering time relative to total logged-in time. Shows what proportion of login duration agent spent with interactions being offered within the current aggregation interval. Calculated as (offeringTime / loggedInTime) × 100 |
| `onBreakTime` | v1+ | Total duration the agent spent in On Break status, temporarily unavailable to receive new interactions within the current aggregation interval |
| `onBreakTimePercentage` | v1+ | Percentage of break time relative to total logged-in time. Shows what proportion of login duration agent spent on break within the current aggregation interval |
| `workingOfflineTime` | v1+ | Total duration the agent spent in Working Offline status performing non-interactive work. Agent not available to receive new interactions within the current aggregation interval |
| `workingOfflineTimePercentage` | v1+ | Percentage of offline work time relative to total logged-in time. Shows what proportion of login duration agent spent in Working Offline status within the current aggregation interval |
| `wrapUpTime` | v1+ | Total duration the agent spent in Wrap Up state completing post-interaction administrative tasks across all activities after disconnecting from customer within the current aggregation interval |
| `wrapUpTimePercentage` | v1+ | Percentage of wrap-up time relative to total logged-in time. Shows what proportion of login duration agent spent finalizing interactions in Wrap Up state within the current aggregation interval |

</details>

### 8.2. Queue Interactions Metrics

Queue interactions metrics track how interactions flow through queues, including acceptance, abandonment, wait times, and agent handling performance.

#### 8.2.1. Queue Interactions Summary

<details>
<summary>Click to expand Queue Interactions Summary Metrics (28 metrics)</summary>

Report type: `queue-interactions-summary`

This report provides comprehensive queue performance metrics, tracking interaction flow, agent handling, wait times, and abandonment patterns.

**Version** indicates minimum CC Historical Analytics API version where metric became available.

| Metric | Version | Description |
|--------|---------|-------------|
| `accepted` | v1+ | Total interactions answered by agents. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent in the current aggregation interval |
| `acceptedInSla` | v1+ | Total number of interactions answered by all agents within the SLA Threshold Time. Measures interactions where the agent answered before the configured SLA time limit was exceeded in the current aggregation interval |
| `acceptedInSlaPercentage` | v1+ | Percentage of total number of interactions answered by all agents within the SLA Threshold Time, relative to total accepted interactions in the current aggregation interval |
| `acceptedPercentage` | v2+ | Percentage of total interactions answered by agents relative to total entries. Shows what proportion of all interactions entering the queue were successfully connected to and handled by an agent in the current aggregation interval |
| `avgAbandonTime` | v2+ | Average time spent by all interactions in the queue waiting to be served that ended up as an abandonment (includes short abandoned) in the current aggregation interval |
| `avgBusyTime` | v1+ | Average time agents spent in the Offering, Handling, and Wrap Up states per interaction in the current aggregation interval |
| `avgHandlingTime` | v1+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold in the current aggregation interval |
| `avgProcessingTime` | v1+ | Average combined time in Handling and Wrap Up states per accepted interaction. This represents the total time from when an agent accepts an interaction through final completion, including wrap-up work in the current aggregation interval |
| `avgWaitBeforeAcceptedTime` | v1+ | Average time an interaction spent in the queue, from the time it entered the queue until it was accepted by an agent in the current aggregation interval |
| `avgWaitTime` | v1+ | Average waiting time for interactions. Time interactions spend in queue from entry until acceptance, abandonment, or diversion in the current aggregation interval |
| `avgWrapUpTime` | v1+ | Average post-processing time per interaction entered. Time spent by agents completing administrative tasks after finishing handling an interaction in the current aggregation interval |
| `busyTime` | v1+ | Total time agents spent in the Offering, Handling, and Wrap Up states. Measured from when an interaction is presented to an agent until it is wrapped up in the current aggregation interval |
| `diverted` | v1+ | Interactions leaving queue without termination via transfer, forwarding, or IVR routing. Represents interactions that were moved out of the queue through various routing mechanisms in the current aggregation interval |
| `entered` | v1+ | Inbound interactions entering queue; outbound interactions directed through queue. Counts all interactions that came into this queue waiting to be processed in the current aggregation interval |
| `handlingTime` | v1+ | Total time agents spent in the Handling state. Measured from when an interaction is accepted by an agent until it is terminated in the current aggregation interval |
| `longestAbandonTime` | v2+ | Longest time an interaction spent waiting in a queue to be served and ended up as an abandonment in the current aggregation interval |
| `longestWaitBeforeAcceptTime` | v7+ | Longest time an interaction spent in the queue from entry until it was accepted by an agent in the current aggregation interval |
| `longestWaitTime` | v1+ | Longest wait in queue for interactions. Duration of the longest waiting interaction in the queue in the current aggregation interval |
| `newInQueue` | v4+ | Interactions entering queue in the current aggregation interval only. Excludes interactions from previous intervals, showing only freshly entered interactions |
| `processingTime` | v1+ | Total time agents spent in the Handling and Wrap Up states. Measured from when an interaction is accepted by an agent until it is wrapped up in the current aggregation interval |
| `slaPercentage` | v1+ | Percentage of interactions answered before configured SLA time threshold relative to total entries, excluding short abandonments in the current aggregation interval |
| `totalAbandonTime` | v2+ | Total cumulative time all abandoned interactions spent waiting in queue before abandonment in the current aggregation interval |
| `totalAbandoned` | v1+ | All interactions finishing in abandonment including short abandonments. Provides complete picture of both quick and extended abandonments combined in the current aggregation interval |
| `totalAbandonedPercentage` | v2+ | Percentage of abandoned interactions relative to total entries. Shows the complete abandonment rate including all types of abandonments in the current aggregation interval |
| `voicemailsLeft` | v7+ | Number of interactions where customers left a voicemail in the current aggregation interval |
| `waitingInQueue` | v1+ | Number of interactions waiting in queue to be answered at the end of the current aggregation interval |
| `waitingInQueueTime` | v2+ | Total cumulative time all interactions spent waiting in queue in the current aggregation interval |
| `wrapUpTime` | v1+ | Total time agents spent in the Wrap Up state completing post-interaction administrative tasks after disconnecting from customer in the current aggregation interval |

</details>

#### 8.2.2. Queue Interactions Accepted Offline

<details>
<summary>Click to expand Queue Interactions Accepted Offline Metrics (13 metrics)</summary>

Report type: `queue-interactions-accepted-offline`

This report tracks offline interactions (email, voicemail) accepted by agents, broken down by time buckets based on how long the interaction waited in queue before being answered.

**Version** indicates minimum CC Historical Analytics API version where metric became available.

| Metric | Version | Description |
|--------|---------|-------------|
| `accepted` | v1+ | Total interactions answered by agents. Represents every offline interaction that was successfully connected to and handled by an agent in the current aggregation interval |
| `accepted.lowerThan30m` | v1+ | Number of interactions answered by agents in under 30 minutes from the moment the interaction entered the queue until it was answered in the current aggregation interval |
| `accepted.30m-1h` | v1+ | Number of interactions answered by agents between 30 minutes and 1 hour from the moment the interaction entered the queue in the current aggregation interval |
| `accepted.1h-1h30m` | v1+ | Number of interactions answered by agents between 1 and 1.5 hours from the moment the interaction entered the queue in the current aggregation interval |
| `accepted.1h30m-2h` | v1+ | Number of interactions answered by agents between 1.5 and 2 hours from the moment the interaction entered the queue in the current aggregation interval |
| `accepted.2h-3h` | v1+ | Number of interactions answered by agents between 2 and 3 hours from the moment the interaction entered the queue in the current aggregation interval |
| `accepted.greaterThan3h` | v1+ | Number of interactions answered by agents in over 3 hours from the moment the interaction entered the queue in the current aggregation interval |
| `acceptedPercentage.lowerThan30m` | v1+ | Percentage of accepted interactions in under 30 minutes over the total accepted interactions in the current aggregation interval. Calculated as (Accepted under 30 min / Accepted) × 100 |
| `acceptedPercentage.30m-1h` | v1+ | Percentage of accepted interactions between 30 minutes and 1 hour over the total accepted interactions in the current aggregation interval. Calculated as (Accepted 30min-1h / Accepted) × 100 |
| `acceptedPercentage.1h-1h30m` | v1+ | Percentage of accepted interactions between 1 and 1.5 hours over the total accepted interactions in the current aggregation interval. Calculated as (Accepted 1h-1h30m / Accepted) × 100 |
| `acceptedPercentage.1h30m-2h` | v1+ | Percentage of accepted interactions between 1.5 and 2 hours over the total accepted interactions in the current aggregation interval. Calculated as (Accepted 1h30m-2h / Accepted) × 100 |
| `acceptedPercentage.2h-3h` | v1+ | Percentage of accepted interactions between 2 and 3 hours over the total accepted interactions in the current aggregation interval. Calculated as (Accepted 2h-3h / Accepted) × 100 |
| `acceptedPercentage.greaterThan3h` | v1+ | Percentage of accepted interactions in over 3 hours over the total accepted interactions in the current aggregation interval. Calculated as (Accepted over 3h / Accepted) × 100 |

</details>

#### 8.2.3. Queue Interactions Accepted Online

<details>
<summary>Click to expand Queue Interactions Accepted Online Metrics (21 metrics)</summary>

Report type: `queue-interactions-accepted-online`

This report tracks online interactions (phone, chat) accepted by agents, broken down by time buckets based on how long the interaction waited in queue before being answered.

**Version** indicates minimum CC Historical Analytics API version where metric became available.

| Metric | Version | Description |
|--------|---------|-------------|
| `accepted` | v1+ | Total interactions answered by agents. Represents every online interaction that was successfully connected to and handled by an agent in the current aggregation interval |
| `accepted.lowerThan5s` | v1+ | Number of interactions answered by agents in under 5 seconds from the moment the interaction entered the queue until it was answered in the current aggregation interval |
| `accepted.5s-10s` | v1+ | Number of interactions answered by agents between 5 and 10 seconds from the moment the interaction entered the queue until it was answered in the current aggregation interval |
| `accepted.10s-20s` | v1+ | Number of interactions answered by agents between 10 and 20 seconds from the moment the interaction entered the queue until it was answered in the current aggregation interval |
| `accepted.20s-30s` | v1+ | Number of interactions answered by agents between 20 and 30 seconds from the moment the interaction entered the queue until it was answered in the current aggregation interval |
| `accepted.30s-45s` | v1+ | Number of interactions answered by agents between 30 and 45 seconds from the moment the interaction entered the queue until it was answered in the current aggregation interval |
| `accepted.45s-1m` | v1+ | Number of interactions answered by agents between 45 seconds and 1 minute from the moment the interaction entered the queue until it was answered in the current aggregation interval |
| `accepted.1m-2m` | v1+ | Number of interactions answered by agents between 1 and 2 minutes from the moment the interaction entered the queue until it was answered in the current aggregation interval |
| `accepted.2m-5m` | v1+ | Number of interactions answered by agents between 2 and 5 minutes from the moment the interaction entered the queue until it was answered in the current aggregation interval |
| `accepted.5m-10m` | v1+ | Number of interactions answered by agents between 5 and 10 minutes from the moment the interaction entered the queue until it was answered in the current aggregation interval |
| `accepted.greaterThan10m` | v1+ | Number of interactions answered by agents in more than 10 minutes from the moment the interaction entered the queue until it was answered in the current aggregation interval |
| `acceptedPercentage.lowerThan5s` | v1+ | Percentage of accepted interactions in under 5 seconds over the total accepted interactions in the current aggregation interval. Calculated as (Accepted under 5s / Accepted) × 100 |
| `acceptedPercentage.5s-10s` | v1+ | Percentage of accepted interactions between 5 and 10 seconds over the total accepted interactions in the current aggregation interval. Calculated as (Accepted 5s-10s / Accepted) × 100 |
| `acceptedPercentage.10s-20s` | v1+ | Percentage of accepted interactions between 10 and 20 seconds over the total accepted interactions in the current aggregation interval. Calculated as (Accepted 10s-20s / Accepted) × 100 |
| `acceptedPercentage.20s-30s` | v1+ | Percentage of accepted interactions between 20 and 30 seconds over the total accepted interactions in the current aggregation interval. Calculated as (Accepted 20s-30s / Accepted) × 100 |
| `acceptedPercentage.30s-45s` | v1+ | Percentage of accepted interactions between 30 and 45 seconds over the total accepted interactions in the current aggregation interval. Calculated as (Accepted 30s-45s / Accepted) × 100 |
| `acceptedPercentage.45s-1m` | v1+ | Percentage of accepted interactions between 45 seconds and 1 minute over the total accepted interactions in the current aggregation interval. Calculated as (Accepted 45s-1m / Accepted) × 100 |
| `acceptedPercentage.1m-2m` | v1+ | Percentage of accepted interactions between 1 and 2 minutes over the total accepted interactions in the current aggregation interval. Calculated as (Accepted 1m-2m / Accepted) × 100 |
| `acceptedPercentage.2m-5m` | v1+ | Percentage of accepted interactions between 2 and 5 minutes over the total accepted interactions in the current aggregation interval. Calculated as (Accepted 2m-5m / Accepted) × 100 |
| `acceptedPercentage.5m-10m` | v1+ | Percentage of accepted interactions between 5 and 10 minutes over the total accepted interactions in the current aggregation interval. Calculated as (Accepted 5m-10m / Accepted) × 100 |
| `acceptedPercentage.greaterThan10m` | v1+ | Percentage of accepted interactions in more than 10 minutes over the total accepted interactions in the current aggregation interval. Calculated as (Accepted over 10m / Accepted) × 100 |

</details>

#### 8.2.4. Queue Interactions Abandoned

<details>
<summary>Click to expand Queue Interactions Abandoned Metrics (40 metrics)</summary>

Report type: `queue-interactions-abandoned`

This report tracks interactions that were abandoned in queue, broken down by time buckets based on how long the interaction waited before the customer terminated the interaction. Includes summary statistics on abandonment patterns.

**Version** indicates minimum CC Historical Analytics API version where metric became available.

| Metric | Version | Description |
|--------|---------|-------------|
| `abandon.lowerThan5s` | v1+ | Number of abandoned interactions where customer terminated in under 5 seconds from entering queue in the current aggregation interval |
| `abandon.5s-10s` | v1+ | Number of abandoned interactions where customer terminated between 5 and 10 seconds from entering queue in the current aggregation interval |
| `abandon.10s-20s` | v1+ | Number of abandoned interactions where customer terminated between 10 and 20 seconds from entering queue in the current aggregation interval |
| `abandon.20s-30s` | v1+ | Number of abandoned interactions where customer terminated between 20 and 30 seconds from entering queue in the current aggregation interval |
| `abandon.30s-45s` | v1+ | Number of abandoned interactions where customer terminated between 30 and 45 seconds from entering queue in the current aggregation interval |
| `abandon.45s-1m` | v1+ | Number of abandoned interactions where customer terminated between 45 seconds and 1 minute from entering queue in the current aggregation interval |
| `abandon.1m-2m` | v1+ | Number of abandoned interactions where customer terminated between 1 and 2 minutes from entering queue in the current aggregation interval |
| `abandon.2m-5m` | v1+ | Number of abandoned interactions where customer terminated between 2 and 5 minutes from entering queue in the current aggregation interval |
| `abandon.5m-10m` | v1+ | Number of abandoned interactions where customer terminated between 5 and 10 minutes from entering queue in the current aggregation interval |
| `abandon.greaterThan10m` | v1+ | Number of abandoned interactions where customer terminated in more than 10 minutes from entering queue in the current aggregation interval |
| `abandonPercentage.lowerThan5s` | v1+ | Percentage of Total Abandoned interactions in under 5 seconds over the total Entered interactions in the current aggregation interval |
| `abandonPercentage.5s-10s` | v1+ | Percentage of Total Abandoned interactions between 5 and 10 seconds over the total Entered interactions in the current aggregation interval |
| `abandonPercentage.10s-20s` | v1+ | Percentage of Total Abandoned interactions between 10 and 20 seconds over the total Entered interactions in the current aggregation interval |
| `abandonPercentage.20s-30s` | v1+ | Percentage of Total Abandoned interactions between 20 and 30 seconds over the total Entered interactions in the current aggregation interval |
| `abandonPercentage.30s-45s` | v1+ | Percentage of Total Abandoned interactions between 30 and 45 seconds over the total Entered interactions in the current aggregation interval |
| `abandonPercentage.45s-1m` | v1+ | Percentage of Total Abandoned interactions between 45 seconds and 1 minute over the total Entered interactions in the current aggregation interval |
| `abandonPercentage.1m-2m` | v1+ | Percentage of Total Abandoned interactions between 1 and 2 minutes over the total Entered interactions in the current aggregation interval |
| `abandonPercentage.2m-5m` | v1+ | Percentage of Total Abandoned interactions between 2 and 5 minutes over the total Entered interactions in the current aggregation interval |
| `abandonPercentage.5m-10m` | v1+ | Percentage of Total Abandoned interactions between 5 and 10 minutes over the total Entered interactions in the current aggregation interval |
| `abandonPercentage.greaterThan10m` | v1+ | Percentage of Total Abandoned interactions in more than 10 minutes over the total Entered interactions in the current aggregation interval |
| `abandoned` | v1+ | Number of interactions that terminated in the queue and ended with customer disconnecting, excluding short abandonments in the current aggregation interval |
| `abandonedPercentage` | v1+ | Percentage of interactions that terminated in the queue without being served over total entries, excluding short abandonments in the current aggregation interval |
| `accepted` | v1+ | Total interactions answered by agents. Represents every interaction that was successfully connected to and handled by an agent in the current aggregation interval |
| `acceptedPercentage` | v2+ | Percentage of interactions answered by agents over total entries in the current aggregation interval |
| `avgAbandonTime` | v2+ | Average time abandoned interactions spent waiting in queue in the current aggregation interval |
| `diverted` | v1+ | Number of interactions entering and leaving the queue without ending. Includes interactions transferred to other queues or voicemail in the current aggregation interval |
| `divertedPercentage` | v1+ | Percentage of diverted interactions over total entries in the current aggregation interval |
| `entered` | v1+ | Inbound interactions entering queue; outbound interactions directed through queue. Counts all interactions that came into this queue waiting to be processed in the current aggregation interval |
| `longestAbandonTime` | v1+ | Longest wait time for abandoned interaction. Duration of the interaction that waited longest before customer disconnected in the current aggregation interval |
| `newInQueue` | v4+ | Interactions entering queue in the current aggregation interval only. Excludes interactions from previous intervals, showing only freshly entered interactions |
| `offering` | v1+ | Number of interactions being offered to available agents awaiting acceptance or rejection at the end of the current aggregation interval |
| `offeringPercentage` | v1+ | Percentage of interactions in offering state over total entries in the current aggregation interval |
| `shortAbandoned` | v1+ | Number of short abandonments. Interactions ending with customer exit in queue before 5 seconds in the current aggregation interval |
| `shortAbandonedPercentage` | v1+ | Percentage of short abandonments. Percentage of interactions ending with customer exit in queue before 5 seconds relative to total entries in the current aggregation interval |
| `totalAbandonTime` | v2+ | Total cumulative time all abandoned interactions spent waiting in queue before abandonment in the current aggregation interval |
| `totalAbandoned` | v1+ | All interactions finishing in abandonment including short abandonments. Provides complete picture of both quick and extended abandonments combined in the current aggregation interval |
| `totalAbandonedPercentage` | v1+ | Percentage of all abandoned interactions (including short abandonments) relative to total entries in the current aggregation interval |
| `voicemailsLeft` | v7+ | Number of interactions where customers left a voicemail in the current aggregation interval |
| `waitingInQueue` | v1+ | Number of interactions waiting in queue to be answered at the end of the current aggregation interval |
| `waitingInQueueTime` | v2+ | Total cumulative time all interactions spent waiting in queue in the current aggregation interval |

</details>

### 8.3. Agent Interactions Metrics

Agent interactions metrics track agent activity across different interaction types, including handling times, transfers, and wrap-up activities. These metrics help analyze agent performance and interaction outcomes.

#### 8.3.1. Agent Interactions by Wrap Up Code

<details>
<summary>Click to expand Agent Interactions by Wrap Up Code Metrics (2 metrics)</summary>

Report type: `agent-interactions-by-wrap-up-code`

This report tracks agent activity by wrap-up codes (transaction codes), showing how many times each code was used and the total processing time associated with interactions marked with that code.

**Version** indicates minimum CC Historical Analytics API version where metric became available.

| Metric | Version | Description |
|--------|---------|-------------|
| `transactionCodeCount` | v1+ | Total number of times the transaction code has been used in the current aggregation interval |
| `transactionCodeTime` | v1+ | Total time agents spent processing interactions (Handling and Wrap Up) that finished with this transaction code in the current aggregation interval |

</details>

#### 8.3.2. Agent Interactions Call Summary

<details>
<summary>Click to expand Agent Interactions Call Summary Metrics (29 metrics)</summary>

Report type: `agent-interactions-call-summary`

This report provides comprehensive statistics on agent call activity including direct inbound/outbound calls, holds, transfers (blind and warm), conferences, consultations, and internal agent-to-agent calls.

**Version** indicates minimum CC Historical Analytics API version where metric became available.

| Metric | Version | Description |
|--------|---------|-------------|
| `avgDirectInboundTime` | v1+ | Average time agents spent on direct inbound calls, excluding agent-to-agent calls in the current aggregation interval |
| `avgDirectOutboundTime` | v1+ | Average time agents spent on outbound calls, excluding outbound queue calls and agent-to-agent calls in the current aggregation interval |
| `avgHoldTime` | v2+ | Average duration per hold action. Calculated as total Hold Time divided by Number of Holds in the current aggregation interval |
| `blindTransferToAgent` | v1+ | Total blind transfers initiated and received by agents outside of a queue in the current aggregation interval |
| `blindTransferToQueue` | v1+ | Total blind transfers to queues initiated by agents in the current aggregation interval |
| `blindTransfersInitiated` | v1+ | Number of blind transfers performed by agents in the current aggregation interval. Transfer where agent does not speak to recipient first |
| `blindTransfersReceived` | v1+ | Number of blind transfers received by agents in the current aggregation interval |
| `conferenceTime` | v1+ | Total cumulative duration agents spent in multi-party conference calls in the current aggregation interval |
| `conferences` | v1+ | Total number of conferences in the current aggregation interval |
| `conferencesEstablished` | v1+ | Total number of conferences (join lines) agents have initiated in the current aggregation interval |
| `conferencesEstablishedTime` | v1+ | Total time agents spent in conference calls that they initiated in the current aggregation interval |
| `conferencesReceived` | v1+ | Total number of conferences (join lines) agents have received in the current aggregation interval |
| `conferencesReceivedTime` | v1+ | Total time agents spent in conference calls that they received in the current aggregation interval |
| `consultationsEstablished` | v1+ | Number of times agents successfully established an outbound call while another call is on hold in the current aggregation interval |
| `directInbound` | v1+ | Total number of direct inbound calls to agents excluding agent-to-agent calls in the current aggregation interval |
| `directInboundTime` | v1+ | Total cumulative duration agents spent on direct inbound calls, excluding agent-to-agent calls in the current aggregation interval |
| `directOutbound` | v1+ | Number of calls made by agents excluding outbound queue calls and agent-to-agent calls in the current aggregation interval |
| `directOutboundTime` | v1+ | Total cumulative duration agents spent on direct outbound calls, excluding outbound queue calls and agent-to-agent calls in the current aggregation interval |
| `hold` | v1+ | Total number of call holds agents have performed in the current aggregation interval |
| `holdTime` | v1+ | Total time agents spent placing customers or agents on hold on any line in the current aggregation interval |
| `internalCalls` | v1+ | Total number of agent-to-agent calls initiated or received in the current aggregation interval |
| `internalCallsInitiated` | v1+ | Number of agent-to-agent calls initiated in the current aggregation interval |
| `internalCallsReceived` | v1+ | Number of agent-to-agent calls received in the current aggregation interval |
| `internalCallsTime` | v1+ | Total cumulative duration agents spent on agent-to-agent calls, both initiated and received in the current aggregation interval |
| `longestHoldTime` | v1+ | Maximum single continuous hold duration when agent placed customer on hold in the current aggregation interval |
| `transfersInitiated` | v1+ | Warm and blind transfers initiated by agents. All outgoing transfers in the current aggregation interval |
| `transfersReceived` | v1+ | Warm and blind transfers routed to agents for handling. All incoming transfers in the current aggregation interval |
| `warmTransfersCompleted` | v1+ | Total number of warm transfers initiated by agents in the current aggregation interval. Transfer where agent spoke to recipient first |
| `warmTransfersReceived` | v1+ | Total number of warm transfers received by agents in the current aggregation interval |

</details>

#### 8.3.3. Agent Interactions Handling and Wrap Up

<details>
<summary>Click to expand Agent Interactions Handling and Wrap Up Metrics (10 metrics)</summary>

Report type: `agent-interactions-handling-and-wrap-up`

This report tracks agent time spent across different interaction processing states: Offering (waiting for acceptance), Handling (actively working), Wrap Up (post-call tasks), and combined Busy time.

**Version** indicates minimum CC Historical Analytics API version where metric became available.

| Metric | Version | Description |
|--------|---------|-------------|
| `avgBusyTime` | v1+ | Average combined time in Offering, Handling, and Wrap Up states per interaction. Includes the full duration from when an interaction is offered, through handling, until all work is complete in the current aggregation interval |
| `avgHandlingTime` | v1+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold in the current aggregation interval |
| `avgOfferingTime` | v1+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it in the current aggregation interval |
| `avgProcessingTime` | v1+ | Average combined time in Handling and Wrap Up states per accepted interaction. This represents the total time from when an agent accepts an interaction through final completion, including wrap-up work in the current aggregation interval |
| `avgWrapUpTime` | v1+ | Average post-processing time per interaction entered. Time spent by agents completing administrative tasks after finishing handling an interaction in the current aggregation interval |
| `busyTime` | v1+ | Total combined time in Offering, Handling, and Wrap Up states. Includes the full duration from when an interaction is offered, through handling, until all work is complete in the current aggregation interval |
| `handlingTime` | v1+ | Total time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold in the current aggregation interval |
| `offeringTime` | v1+ | Total duration from interaction presentation to acceptance or rejection in the current aggregation interval |
| `processingTime` | v1+ | Total combined time in Handling and Wrap Up states per accepted interaction. This represents the total time from when an agent accepts an interaction through final completion, including wrap-up work in the current aggregation interval |
| `wrapUpTime` | v1+ | Total time spent by agents completing administrative tasks after finishing handling an interaction in the current aggregation interval |

</details>

#### 8.3.4. Agent Interactions Summary

<details>
<summary>Click to expand Agent Interactions Summary Metrics (32 metrics)</summary>

Report type: `agent-interactions-summary`

This report provides a comprehensive overview of agent performance including interaction acceptance/rejection rates, handling times, transfers, and hold statistics. Combines metrics from call activity, handling times, and wrap-up activities.

**Version** indicates minimum CC Historical Analytics API version where metric became available.

| Metric | Version | Description |
|--------|---------|-------------|
| `abandoned` | v1+ | Total number of interactions abandoned by a customer while being presented to the agent in the current aggregation interval |
| `abandonedPercentage` | v1+ | Percentage of interactions abandoned while being presented to the agent over the total interactions presented in the current aggregation interval |
| `accepted` | v1+ | Total interactions answered by agents. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent in the current aggregation interval |
| `acceptedPercentage` | v1+ | Percentage of interactions answered by agents over the total interactions presented in the current aggregation interval |
| `alerting` | v1+ | Number of interactions currently being presented to agents via a queue or direct assignment in the current aggregation interval |
| `avgBusyTime` | v1+ | Average combined time in Offering, Handling, and Wrap Up states per interaction. Includes the full duration from when an interaction is offered, through handling, until all work is complete in the current aggregation interval |
| `avgHandlingTime` | v1+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold in the current aggregation interval |
| `avgHoldTime` | v2+ | Average duration per hold action. Calculated as total Hold Time divided by Number of Holds in the current aggregation interval |
| `avgSpeedToAnswer` | v1+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it in the current aggregation interval |
| `avgWrapUpTime` | v1+ | Average post-processing time per interaction entered. Time spent by agents completing administrative tasks after finishing handling an interaction in the current aggregation interval |
| `blindTransferToAgent` | v1+ | Total blind transfers initiated and received by agents outside of a queue in the current aggregation interval |
| `blindTransferToQueue` | v1+ | Total blind transfers to queues initiated by agents in the current aggregation interval |
| `blindTransfersInitiated` | v1+ | Number of blind transfers performed by agents in the current aggregation interval. Transfer where agent does not speak to recipient first |
| `blindTransfersReceived` | v1+ | Number of blind transfers received by agents in the current aggregation interval |
| `busyTime` | v1+ | Total combined time in Offering, Handling, and Wrap Up states. Includes the full duration from when an interaction is offered, through handling, until all work is complete in the current aggregation interval |
| `handlingTime` | v1+ | Total time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold in the current aggregation interval |
| `hold` | v1+ | Total number of call holds agents have performed in the current aggregation interval |
| `holdTime` | v1+ | Total time agents spent placing customers or agents on hold on any line in the current aggregation interval |
| `longestHoldTime` | v1+ | Maximum single continuous hold duration when agent placed customer on hold in the current aggregation interval |
| `longestOfferingTime` | v1+ | Longest time to accept an interaction from the time it is offered to the time it is accepted or rejected by an agent in the current aggregation interval |
| `offeringTime` | v1+ | Total duration from interaction presentation to acceptance or rejection in the current aggregation interval |
| `presented` | v1+ | Total interactions presented to agents for acceptance or rejection. Includes interactions continuing from prior intervals in the current aggregation interval |
| `processingTime` | v7+ | Total combined time in Handling and Wrap Up states per accepted interaction. This represents the total time from when an agent accepts an interaction through final completion, including wrap-up work in the current aggregation interval |
| `rejectTimeout` | v1+ | Count of interactions automatically rejected when agent did not respond within configured timeout period in the current aggregation interval |
| `rejected` | v1+ | Count of interactions manually declined by agent when interaction was offered. Agent explicitly rejected the offer in the current aggregation interval |
| `rejectedPercentage` | v1+ | Percentage of interactions rejected by agents over the total interactions presented in the current aggregation interval |
| `transfersInitiated` | v1+ | Warm and blind transfers initiated by agents. All outgoing transfers in the current aggregation interval |
| `transfersInitiatedPercentage` | v2+ | Percentage of interactions transferred by agents, calculated relative to total interactions accepted in the current aggregation interval |
| `transfersReceived` | v1+ | Warm and blind transfers routed to agents for handling. All incoming transfers in the current aggregation interval |
| `warmTransfersCompleted` | v1+ | Total number of warm transfers initiated by agents in the current aggregation interval. Transfer where agent spoke to recipient first |
| `warmTransfersReceived` | v1+ | Total number of warm transfers received by agents in the current aggregation interval |
| `wrapUpTime` | v1+ | Total time spent by agents completing administrative tasks after finishing handling an interaction in the current aggregation interval |

</details>

### 8.4. Digital Channels Metrics

Digital channels metrics track performance for non-voice interactions such as email and chat. These metrics measure interaction volumes and durations across different processing stages.

#### 8.4.1. Digital Channels Summary

<details>
<summary>Click to expand Digital Channels Summary Metrics (9 metrics)</summary>

Report type: `digital-channels-summary`

This report displays aggregate metrics for digital channels such as email and chat, tracking interaction volumes, and durations across different processing stages.

**Version** indicates minimum CC Historical Analytics API version where metric became available.

| Metric | Version | Description                                                                                                                                                                           |
|--------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `avgSpeedToAnswer` | v1+ | Average duration from interaction presentation to acceptance for digital channel interactions in the current aggregation interval                                                     |
| `countOfInteractions` | v1+ | Total count of digital channel interactions processed in the current aggregation interval                                                                                             |
| `handlingDuration` | v1+ | Total time agents spend handling digital channel interactions. Measured from when an agent accepts an interaction until they finish processing it in the current aggregation interval |
| `numberOfRepliedEmails` | v1+ | Total count of email interactions that received agent replies in the current aggregation interval                                                                                     |
| `offeringDuration` | v1+ | Total duration digital channel interactions spent in Offering state waiting for agent acceptance or rejection in the current aggregation interval                                     |
| `queueWaitDuration` | v1+ | Total cumulative time digital channel interactions spent waiting in queue in the current aggregation interval |
| `scriptTreatmentDuration` | v1+ | Total time digital channel interactions spent in script treatment, excluding queue time in the current aggregation interval |
| `totalInteractionsDuration` | v1+ | Total combined duration for digital channel interactions. Includes script treatment, queue wait, and handling time in the current aggregation interval |
| `wrapUpDuration` | v1+ | Total time agents spend completing post-interaction administrative tasks for digital channel interactions. Measured from when an agent disconnects from customer until wrap-up is finalized in the current aggregation interval |

</details>
