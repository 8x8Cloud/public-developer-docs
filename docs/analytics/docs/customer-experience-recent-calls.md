# Recent Calls

> 🚧 **Analytics for Contact Center is the new home for detailed information.**
> 
> Analytics for Contact Center Detailed Interactions is the new location for detailed transaction information, all future updates and improvements will be delivered there.
> 
> If you are just beginning an integration we'd strongly advise to use ACC instead of Recent Calls, and if you've already integrated to Recent Calls we'd advise taking a look at some of the benefits to utilizing ACC.
> 
> * ACC has information on all interaction media (not just voice)
> * ACC has additional metrics not present in Recent Calls
> * ACC will have additional metrics and functionality added
> 
> There is no set timeline for Recent Calls to be deprecated, however we are planning to consolidate our Analytics portfolio and strongly recommend leveraging ACC APIs.
> 
> 

The [Customer Experience Recent Calls API reference](/analytics/reference/recentcalldata) is available to try.

> 📘 **You will need a working API key to begin**
> 
> [How to get API Keys](/analytics/docs/how-to-get-api-keys) 
> 
> The `8x8-api-key` will be the `Key` generated. For Customer Experience the Secret from Admin Console is not required.
> 
> Your `token` will be provided by [contacting 8x8](mailto:analytics.cex@8x8.com). Please include in the request your CC Tenant Name and Platform. [How to find my CC Tenant and Platform](https://support.8x8.com/cloud-contact-center/8x8-contact-center/administrators/How_to_identify_Contact_Centre_Tenant_Name_and_Cluster)
> 
> 

## Base URL

Use the following base URL during this process:

* [https://api.8x8.com/customerexperience/v1/recentCallData/{region}](https://api.8x8.com/customerexperience/v1/recentCallData/%7Bregion%7D)

## Region

* uk is the region for customers with UK/EU based CC tenants
* us is the region for all other customers.

### Recent Calls Request

## Parameters

**Method: POST**

### Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| 8x8-apikey | ✓ | API Credential Key from the [Admin Console Process](/analytics/docs/how-to-get-api-keys) | test_key_kjdfidj238jf9123df221 |
| token | ✓ | Provided by 8x8 representative (see above) | 11vf11vf-5e6f-1a2b-3c4d-123xxx123xxx |
| Content-Type | ✓ | application/json | application/json |

### Path

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| version | ✓ | Current version v1 | v1 |

### Body

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| tenantId | ✓ | TenantId/Tenant name from CC Configuration Manager | acmecorp01 |
| page | ✓ | First page is one (1). See [Pagination](/analytics/docs/customer-experience-recent-calls#pagination) for more information | 1 |
| rows | ✓ | Number of rows per page. See [Pagination](/analytics/docs/customer-experience-recent-calls#pagination) for more information | 100 |
| duration | ☐/✓ | See [Time Spans](/analytics/docs/customer-experience-recent-calls#time-span-for-report) for guidance. Options are today, yesterday, week, month, allhistory | today |
| timeRange | ☐/✓ | See [Time Spans](/analytics/docs/customer-experience-recent-calls#time-span-for-report) for guidance."startEpochMilliseconds - endEpochMilliseconds" in UTC epoch including milliseconds Ex. Date and time (GMT): Wednesday, October 12, 2022 1:21:45 PM is Timestamp in milliseconds: 1665580905000. There should be no spaces between the epochs only the dash. | 1665580905000-1665598905000 |
| timezone | ☐ | [IANA Time Zones](https://www.iana.org/time-zones). Examples America/New_York, Europe/London [Wikipedia Time Zone List](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). This changes the output format only for timeRange input. Default is GMT. | America/New_York |
| callerName | ☐ | searches the callerName and callerNumber of the caller. Example `[ "15555551212" ]` only a single name/number can be passed in the array. You can pass partial strings. "5551212" will match "7325551212". Omitting the parameter or an empty array will returne all callerNames | ["5551212"] |
| tenantAgents | ☐ | AgentId(s) of the agents involved . Multiple agentsIds can be passed and calls matching any of the agents will be returned. | ["agAQDqmvKiRbG4ekigNSaaa" ,"ag64oyEUb_Sk6bxVB9P5zzz"] |
| tenantQueues | ☐ | QueueId(s) of the queues involved . Multiple queueIds can be passed and calls matching any of the queues will be returned. | ["591","333"] |
| agentHoldCount | ☐ | [Numeric Range](/analytics/docs/customer-experience-recent-calls#numeric-ranges) The number of times a call was placed on hold by an agent. Example: Two or more holds. | range:2,-1 |
| agentMuteCount | ☐ | [Numeric Range](/analytics/docs/customer-experience-recent-calls#numeric-ranges) The number of times a call was placed on mute by an agent. Example exactly one mute | range:1,1 |
| transferCount | ☐ | [Numeric Range](/analytics/docs/customer-experience-recent-calls#numeric-ranges) The number of times a call was placed on mute by an agent. Example any number of transfers | range:0,-1 |
| callDuration | ☐ | [Duration Range](/analytics/docs/customer-experience-recent-calls#duration-ranges) The total duration of the call. Example duration of 60 seconds or longer | sec:60,-1 |
| timeInQueue | ☐ | The duration the call spent in queue, and includes the time spent in multiple queues (such as if the call was transferred to other queues). Example Between 60 and 120 seconds inclusive in queue. | sec:60,120 |
| timeInIVR | ☐ | The duration the call spent in IVR (Interactive Voice Response), and includes the time spent in multiple IVRs Between 15 and 360 seconds inclusive in IVR. | sec:15,360 |
| agentCallDuration | ☐ | The amount of time agents spent handling the call. Example agent was handling the call for 5 or more minutes | min:5,-1 |
| agentHoldDuration | ☐ | The amount of time agents placed the call on hold during the call, and includes multiple holds by any agent. Example agent placed the call on hold for 30 or more seconds combined. | sec:30,-1 |

#### Time Span For Report

For the time span of the report **either** `duration` OR `timeRange` must be used. If both are specified `duration` is used and `timeRange` is ignored.

> 📘 **duration options definitions**
> 
> * today : represents the time period 0000 to 2359 for the current date, dependent on the selected timezone
> 	+ yesterday : represents the time period 0000 to 2359 for the previous date, dependent on the selected timezone
> * week : the value represents the time period from the start of the current week (e.g., Monday 00:00) up until the 7th day in the date sequence. The week value is dependent on the selected timezone
> * month : represents the time period from the first day of the current month concluding on the last day of the month. The month value is applicable for the selected timezone
> * allhistory : the complete history available in the data repository
> 

> 📘 **timeRange examples**
> 
> Date and time (UTC): "Wednesday, October 12, 2022 1:21:45 PM" to Date and time (UTC): "Wednesday, October 12, 2022 6:21:45 PM"
> 
> timeRange: "1665580905000-1665598905000"
> 
> There should be no spaces only a dash between the two epochs
> 
> 

#### Numeric Ranges

> 📘 **numeric range filter format**
> 
> Numeric range filters will all be in the following formats `"filterName": "range:X,Y"`  
> 
> Where X is the lower limit and Y is the upper limit.  
> 
> -1 is means Any Value.  
> 
> Examples:  
> 
> "range:1,2" => Greater than or equal to 1 and Less than or equal to 2  
> 
> "range:2,-1" => Greater than or equal to 2  
> 
> "range:5,5" => Equal to 5
> 
> 

#### Duration Ranges

> 📘 **duration range format**
> 
> duration filters will all be in the following formats `"filterName": "period:X,Y"`
> 
> * period is the measurement of the duration range  
> 
> - sec => seconds  
> 
> - min => minutes  
> 
> Where X is the lower limit and Y is the upper limit.  
> 
> -1 is means Any Value.  
> 
> Examples:  
> 
> "sec:1,20" => Greater than or equal to 1 second and Less than or equal to 20 seconds  
> 
> "sec:2,-1" => Greater than or equal to 2 seconds  
> 
> "sec:5,5" => Equal to 5 seconds  
> 
> "sec:0,-1" => Any number of seconds  
> 
> "min:60,-1" => Greater than or equal to 60 minutes
> 

#### Pagination

Within Customer Experience Analytics Recent Calls pagination is controlled by `page` and `rows`

* `page` is the page in the results to retrieve, initial value for the first page is `1` or `"1"`
* `rows` is the number of records to return. Max is 5000

**Pagination Example**  

With an initial input including 

```json
  "page": 1,
  "rows": "500",

```

the returned meta data will be as follows. The information here is

* `hits` => this tells us there are 13466 matching rows/records
* `page` => this is the page number (1) this result set
* `rows` => this is the number of rows/records (500) **requested**

Note: data has been truncated to an empty array to limit the size of the example text

```json
{
    "hits": 13644,
    "alertBellCount": 0,
    "sortColumn": null,
    "data": [],
    "autoRefresh": null,
    "columns": [],
    "timezone": "America/Los_Angeles",
    "sortOrder": null,
    "page": 1,
    "rows": 500
}

```

The request for the next page would include 

```json

    "page": "2",
    "rows": "500",

```

Consumer would continue to walk through the pages until, either tracking the rows returned or continuing until an empty `data` array is returned.

### Full Request Example

duration exampletimeRange example
```bash
curl --location --request POST 'https://api.8x8.com/customerexperience/v{version}/recentCallData/{region}' \
--header '8x8-apikey:{api-key}' \
--header 'token:{token}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "tenantId": "acmecorp01",
  "page": 1,
  "rows": "500",
  "duration": "allhistory",
  "timezone": "America/Los_Angeles",
  "callerName": ["555"],
  "tenantAgents": ["ag7rcjEueDRuGblqngmiaaa","agAD21EBR1RhuV2TNDivjzzz"],
  "tenantQueues": ["2583","1196","713"],
  "tenantGroups": ["2577","712"],
  "agentHoldCount": "range:2,-1",
  "agentMuteCount": "range:1,1",
  "transferCount": "range:0,-1",
  "callDuration": "sec:60,-1",
  "timeInQueue": "sec:0,-1",
  "timeInIVR": "sec:15,-1",
  "agentCallDuration": "min:5,-1",
  "agentHoldDuration": "sec:30,-1"
}'

```

```
curl --location --request POST 'https://api.8x8.com/customerexperience/v{version}/recentCallData/{region}' \
--header '8x8-apikey:{api-key}' \
--header 'token:{token}' \
--header 'Content-Type: application/json' \
--data-raw '{
  "tenantId": "acmecorp01",
  "page": 1,
  "rows": "500",
  "timeRange": "1665580905000 - 1665598905000",
  "timezone": "America/Los_Angeles",
  "callerName": ["555"],
  "tenantAgents": ["ag7rcjEueDRuGblqngmiaaa","agAD21EBR1RhuV2TNDivjzzz"],
  "tenantQueues": ["2583","1196","713"],
  "tenantGroups": ["2577","712"],
  "agentHoldCount": "range:2,-1",
  "agentMuteCount": "range:1,1",
  "transferCount": "range:0,-1",
  "callDuration": "sec:60,-1",
  "timeInQueue": "sec:0,-1",
  "timeInIVR": "sec:15,-1",
  "agentCallDuration": "min:5,-1",
  "agentHoldDuration": "sec:30,-1"
}'

```

### Response

```json
{
    "hits": 2,
    "alertBellCount": 0,
    "sortColumn": null,
    "data": [
        {
            "callDuration": "335566",
            "queueId": "2583",
            "agentCallHandlingDuration": "310887.0",
            "callDate": "01/13/2022 07:42:31",
            "agentId": "ag7rcjEueDRuGblqngmiaaa",
            "muteDuration": 10462,
            "scheduleHours": "Open",
            "timeInIVR": "19657.0",
            "agentGroup": "2577",
            "transferCount": "0.0",
            "postCallSurvey": "[]",
            "callType": "Inbound",
            "callerName": "David Demoperson",
            "dialedNumber": "16695551913",
            "callDateOnly": "01/13/2022",
            "hungupBy": "Agent",
            "holdDuration": "155960.0",
            "voiceComment": "{}",
            "callId": "int-17e541ad2d9-QoQZxK2kYWTPxhySo83VSMam2-phone-00-acmecorp01",
            "abandonTime": "0.0",
            "callerNumber": "4085551414",
            "callSubType": "Queued",
            "totalScore": "",
            "transactionId": "8476",
            "destinationNumber": "",
            "voiceCommentFileNames": "",
            "tenantId": "tenantName",
            "maximumHoldDuration": "137641.0",
            "waitTime": "3901.0",
            "callTime": "07:42:31",
            "callerPhoneNumber": "4085551414"
        },
        {
            "callDuration": "787015",
            "queueId": "713",
            "agentCallHandlingDuration": "753105.0",
            "callDate": "02/10/2022 11:22:51",
            "agentId": "agAD21EBR1RhuV2TNDivjzzz,",
            "muteDuration": 701,
            "scheduleHours": "Open",
            "timeInIVR": "25460.0",
            "agentGroup": "712",
            "transferCount": "0.0",
            "postCallSurvey": "[]",
            "callType": "Inbound",
            "callerName": "ACME CO",
            "dialedNumber": "14405558069",
            "callDateOnly": "02/10/2022",
            "hungupBy": "Agent",
            "holdDuration": "112604.0",
            "voiceComment": "{}",
            "callId": "int-17ee5169b65-bVADPge3TwXIWmYPIGREMRgjd-phone-00-acmecorp01",
            "abandonTime": "0.0",
            "callerNumber": "8045550915",
            "callSubType": "Queued",
            "totalScore": "",
            "transactionId": "6264 6270 6273",
            "destinationNumber": "8045550915",
            "voiceCommentFileNames": "",
            "tenantId": "tenantName",
            "maximumHoldDuration": "30199.0",
            "waitTime": "7236.0",
            "callTime": "11:22:51",
            "callerPhoneNumber": "8045550915"
        }
    ],
    "autoRefresh": null,
    "columns": [],
    "timezone": "America/Los_Angeles",
    "sortOrder": null,
    "page": 1,
    "rows": 500
}

```
