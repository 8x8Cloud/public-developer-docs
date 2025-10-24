# [Beta] End-to-End Journey API

## CIDP Journey API

## Introduction

The CIDP Journey API provides a consolidated view of customer interactions belonging to the same session. These  

interactions may happen on one or multiple 8x8 platform, including Contact Center (CC), Unified Communications (UC), and  

Engage. Using the API users can retrieve session data and detailed transition information, enabling end-to-end tracking  

of customer journeys regardless of transfers between systems or agents.

This API is particularly valuable for organizations with complex flows that span multiple systems, where customers may  

be transferred between formal contact center agents and back-office operations.

## Business Value

The CIDP Journey API solves critical business challenges:

* **Unified Customer Journey Tracking:** Track complete customer journeys across CC, UC, and Engage in a single view
* **Transfer Pattern Analysis:** Understand how calls are transferred between systems and agents
* **Comprehensive Metrics:** Access consolidated metrics like handling time, queue wait time, and outcomes across all  

platforms

* **Detailed Transition History:** Examine every state a customer interaction passed through

Instead of working with disconnected reporting systems, organizations can now build comprehensive reports and dashboards  

in third-party BI tools with a complete view of all customer interactions.

## Authentication

All API requests require an x-api-key header for authentication. Obtain your x-api-key from the Admin Console  

application.

Required Request Header:

## Base URLs

| Region | Base URL |
| --- | --- |
| United States | `https://api.8x8.com/cidp-journey-api` |
| Europe | `https://api-eu.8x8.com/cidp-journey-api` |
| Asia-Pacific | `https://api-au.8x8.com/cidp-journey-api` |
| Canada | `https://api-ca.8x8.com/cidp-journey-api` |

## API Endpoints Overview

The API provides two main endpoints:

1. **Sessions** (`/api/v1/sessions`): Provides aggregated session data across all platforms, including comprehensive  

metrics like handling time, queue wait time, and outcomes.
2. **Transitions** (`/api/v1/transitions`): Provides detailed information about each state transition within a session,  

allowing you to track the exact journey path.

## Asynchronous Data Retrieval Process

The CIDP Journey API uses a three-step asynchronous pattern designed to efficiently handle large datasets for both main  

endpoints:

1. **Create a data retrieval task** - Submit your request with date range, filters, and parameters
2. **Check task status** - Poll the status endpoint until the task is complete
3. **Retrieve the data** - Once complete, access the data with pagination support

> 🚧 **Data Processing Time Varies**
>
> Task completion time depends on the date range, filters, and current system load. Large date ranges may take longer to  
>
> process.
>
>

### Step 1: Create a Task

#### Sessions Endpoint

```text
POST /api/v1/sessions

```

#### Transitions Endpoint

```text
POST /api/v1/transitions

```

#### Request Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| Content-Type | ✓ | Set to application/json | `application/json` |
| x-api-key | ✓ | API key from Admin Console application | `your-api-key-value` |

#### Request Body

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| dateRange.start | ✓ | Start datetime in ISO 8601 format with timezone designator | `2025-03-01T00:00:00Z` |
| dateRange.end | ✓ | End datetime in ISO 8601 format with timezone designator | `2025-03-10T00:00:00Z` |
| filters | ☐ | Array of filter objects with name and values | See filters section |
| displayTimezone | ✓ | IANA timezone display name - the desired display timezone value for the time fields | `Europe/Bucharest` |

> ⚠️ **Timerange Limit**
>
> **Note:** The maximum allowed timerange for any data retrieval request is **7 days**.
>
>
> >
> > For optimal performance consider using a timerange of 1 day or less.
> >
> >
> >
> >
>
>

>
>
> >
> > If you need to analyze data over a longer period, break your requests into multiple segments, each covering no more than 7 days.
> >
> >
> > Currently, requests spanning more than 7 days will be rejected with a **maxInterval** error. We may extend this period in future releases.
> >
> >
> >
>
>
>

```json
{
  "dateRange": {
    "start": "2025-05-19T08:00:00+03:00",
    "end": "2025-05-19T16:00:00+03:00"
  },
  "filters": [
    {
      "name": "pbxName",
      "values": [
        "yourPbxName"
      ]
    },
    {
      "name": "tenantId",
      "values": [
        "yourTenantId"
      ]
    }
  ],
  "displayTimezone": "Europe/Bucharest"
}

```

This JSON request is used to create a data retrieval task for the CIDP Journey API. It specifies:

* **dateRange**: The start and end datetime (in ISO 8601 format with timezone) for the data you want to retrieve.
* **filters**: Criteria to narrow down the data, such as `pbxName` and `tenantId`, ensuring only records matching these values are included.
* **displayTimezone**: The IANA timezone name to use for displaying time fields in the response.

This request is typically sent as the body of a `POST` request to either `/api/v1/sessions` or `/api/v1/transitions` to initiate an asynchronous data retrieval task.

#### Response

```json
{
  "id": "56b2d0eb-be8b-4c69-acf2-bb84c95064cf",
  "status": "IN_PROGRESS"
}

```

### Step 2: Check Task Status

#### Sessions Endpoint

```text
GET /api/v1/sessions/{taskId}/status

```

#### Transitions Endpoint

```text
GET /api/v1/transitions/{taskId}/status

```

#### Request Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| x-api-key | ✓ | API key from Admin Console application | `your-api-key-value` |

#### Path Parameters

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| taskId | ✓ | ID of the task returned from Create Task request | `56b2d0eb-be8b-4c69-acf2-bb84c95064cf` |

#### Response

```json
{
  "id": "56b2d0eb-be8b-4c69-acf2-bb84c95064cf",
  "status": "COMPLETED"
}

```

Possible status values:

* `IN_PROGRESS` - Task is still processing
* `COMPLETED` - Task is completed, data is ready for retrieval
* `FAILED` - Task failed to complete

> 🚧 **Don't check status too frequently**
>
> Use a progressive polling strategy with increasing intervals (e.g., start at 5 seconds, then double each time up to a  
>
> reasonable maximum). This reduces load on the API while efficiently checking for completion.
>
>

### Step 3: Retrieve Data

#### Sessions Endpoint

```text
GET /api/v1/sessions/{taskId}/data

```

#### Transitions Endpoint

```text
GET /api/v1/transitions/{taskId}/data

```

#### Request Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| x-api-key | ✓ | API key from Admin Console application | `your-api-key-value` |

#### Path Parameters

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| taskId | ✓ | ID of the task returned from Create Task request | `56b2d0eb-be8b-4c69-acf2-bb84c95064cf` |

#### Query Parameters

| Parameter | Required | Description | Example |
| --- | --- | --- | --- |
| limit | ☐ | Maximum number of records to return (default: 10) | `20` |
| sortDirection | ☐ | Sort direction, either `ASC` or `DESC` (default: `ASC`) | `DESC` |
| sortField | ☐ | Field to sort by (default: `TIME`) | `TIME` |
| nextPageCursor | ☐ | Cursor for pagination from previous response | `encoded-cursor-value` |

#### Example Sessions Endpoint Response

```json
{
  "data": [
    {
      "time": "2025-03-10T13:33:42+02:00",
      "sessionId": "7b2429440d15183af1044dd47f1d447d",
      "interactions": [
        {
          "id": "int-196e53e066e-QNePASHISrp0D65MVgaNJYS13-phone-01-emeriaeurope01",
          "direction": "Inbound",
          "type": null
        }
      ],
      "agentGroupIds": [
        "101"
      ],
      "agentGroupNames": [
        "ungroup"
      ],
      "agentIds": [
        "ageHk90UPnlYa82OTFOpZ7yA"
      ],
      "agentNames": [
        "John Doe"
      ],
      "channelId": "441122334455",
      "channelName": "Support Line",
      "customerEmail": "test.user@company.com",
      "customerName": "+443335565567",
      "customerPhoneNumber": "+449988776655",
      "direction": "Inbound",
      "transfersCompleted": 0,
      "forwardedToQueue": 0,
      "forwardedToRingGroup": 0,
      "forwardedToScript": 2,
      "handlingDuration": 0,
      "holdDuration": 0,
      "mediaTypes": [
        "Phone"
      ],
      "offeringTime": 0,
      "outcome": "EndedInScript",
      "pbxNames": [],
      "queueAndRingGroupWaitTime": 0,
      "queues": [],
      "queueWaitTime": 0,
      "ringGroups": [],
      "ringGroupWaitTime": 0,
      "scriptTreatmentDuration": 22266,
      "tenantIds": [
        "8x8"
      ],
      "wrapUpCodes": [],
      "wrapUpDuration": 0,
      "nextPageCursor": "ZW5jbLW5leHQtRlZC1jdXJzb3ItZm9ycGFnZQ=="
    }
  ]
}

```

#### Example Transitions Endpoint Response

```json
{
  "data": [
    {
      "time": "2025-05-21T12:09:23.312+03:00",
      "sessionId": "3015ccfd5ebf8b2dcde38045ed30bc7",
      "transition": "STARTED",
      "interactionId": "int-196f21ac6ef-d5eed30bc738045-phone-02-8x8",
      "agents": [],
      "previousAgents": [],
      "previousQueue": null,
      "previousRingGroup": null,
      "queue": null,
      "ringGroup": null,
      "duration": 0,
      "externalNumber": null,
      "mediaType": "Phone"
    },
    {
      "time": "2025-05-21T12:09:23.312+03:00",
      "sessionId": "3015ccfd5ebf8b2dcde38045ed30bc7",
      "transition": "IN_SCRIPT",
      "interactionId": "int-196f21ac6ef-d5eed30bc738045-phone-02-8x8",
      "agents": [],
      "previousAgents": [],
      "previousQueue": null,
      "previousRingGroup": null,
      "queue": null,
      "ringGroup": null,
      "duration": 9206,
      "externalNumber": null,
      "mediaType": "Phone"
    },
    {
      "time": "2025-05-21T12:09:32.518+03:00",
      "sessionId": "3015ccfd5ebf8b2dcde38045ed30bc7",
      "transition": "WAITING",
      "interactionId": "int-196f21ac6ef-d5eed30bc738045-phone-02-8x8",
      "agents": [],
      "previousAgents": [],
      "previousQueue": null,
      "previousRingGroup": null,
      "queue": "Service Client",
      "ringGroup": null,
      "duration": 4016,
      "externalNumber": null,
      "mediaType": "Phone"
    },
    {
      "time": "2025-05-21T12:09:36.534+03:00",
      "sessionId": "3015ccfd5ebf8b2dcde38045ed30bc7",
      "transition": "TALKING",
      "interactionId": "int-196f21ac6ef-d5eed30bc738045-phone-02-8x8",
      "agents": [
        "Marsha Mellow"
      ],
      "previousAgents": [],
      "previousQueue": null,
      "previousRingGroup": null,
      "queue": null,
      "ringGroup": null,
      "duration": 27961,
      "externalNumber": null,
      "mediaType": "Phone"
    },
    {
      "time": "2025-05-21T12:10:04.495+03:00",
      "sessionId": "3015ccfd5ebf8b2dcde38045ed30bc7",
      "transition": "HOLD",
      "interactionId": "int-196f21ac6ef-d5eed30bc738045-phone-02-8x8",
      "agents": [
        "Marsha Mellow"
      ],
      "previousAgents": [],
      "previousQueue": null,
      "previousRingGroup": null,
      "queue": null,
      "ringGroup": null,
      "duration": 3,
      "externalNumber": null,
      "mediaType": "Phone"
    },
    {
      "time": "2025-05-21T12:10:04.498+03:00",
      "sessionId": "3015ccfd5ebf8b2dcde38045ed30bc7",
      "transition": "OUTBOUND_CALL_INITIATED",
      "interactionId": "int-196f21ac6ef-d5eed30bc738045-phone-02-8x8",
      "agents": [
        "Marsha Mellow"
      ],
      "previousAgents": [],
      "previousQueue": null,
      "previousRingGroup": null,
      "queue": null,
      "ringGroup": null,
      "duration": 65,
      "externalNumber": null,
      "mediaType": "Phone"
    },
    {
      "time": "2025-05-21T12:10:04.563+03:00",
      "sessionId": "3015ccfd5ebf8b2dcde38045ed30bc7",
      "transition": "WAITING",
      "interactionId": "1745531006590",
      "agents": [],
      "previousAgents": [],
      "previousQueue": null,
      "previousRingGroup": null,
      "queue": null,
      "ringGroup": null,
      "duration": 3540,
      "externalNumber": null,
      "mediaType": "Phone"
    },
    {
      "time": "2025-05-21T12:10:08.103+03:00",
      "sessionId": "3015ccfd5ebf8b2dcde38045ed30bc7",
      "transition": "TALKING",
      "interactionId": "1745531006590",
      "agents": [
        "Jack Pott"
      ],
      "previousAgents": [],
      "previousQueue": null,
      "previousRingGroup": null,
      "queue": null,
      "ringGroup": null,
      "duration": 4040,
      "externalNumber": null,
      "mediaType": "Phone"
    },
    {
      "time": "2025-05-21T12:10:12.143+03:00",
      "sessionId": "3015ccfd5ebf8b2dcde38045ed30bc7",
      "transition": "TRANSFER",
      "interactionId": "int-196f21ac6ef-d5eed30bc738045-phone-02-8x8",
      "agents": [
        "Jack Pott"
      ],
      "previousAgents": [
        "Marsha Mellow"
      ],
      "previousQueue": "Service Client",
      "previousRingGroup": null,
      "queue": null,
      "ringGroup": null,
      "duration": 0,
      "externalNumber": "+441138413014",
      "mediaType": "Phone"
    },
    {
      "time": "2025-05-21T12:10:12.143+03:00",
      "sessionId": "3015ccfd5ebf8b2dcde38045ed30bc7",
      "transition": "TALKING",
      "interactionId": "1745531006590",
      "agents": [
        "Jack Pott"
      ],
      "previousAgents": [],
      "previousQueue": null,
      "previousRingGroup": null,
      "queue": null,
      "ringGroup": null,
      "duration": 12805,
      "externalNumber": null,
      "mediaType": "Phone"
    },
    {
      "time": "2025-05-21T12:10:24.948+03:00",
      "sessionId": "3015ccfd5ebf8b2dcde38045ed30bc7",
      "transition": "FINISHED",
      "interactionId": "int-196f21ac6ef-d5eed30bc738045-phone-02-8x8",
      "agents": [],
      "previousAgents": [],
      "previousQueue": null,
      "previousRingGroup": null,
      "queue": null,
      "ringGroup": null,
      "duration": 0,
      "externalNumber": null,
      "mediaType": "Phone"
    }
  ],
  "nextPageCursor": null
}

```

If `nextPageCursor` is null, there are no more pages to retrieve.

##### Filters

Filters allow you to narrow down the data returned by the API based on specific criteria. Different filter types are  

available for Sessions and Transitions endpoints.

### Session Filters

| Filter Name | Description | Example Values |
| --- | --- | --- |
| `agentGroupIds` | Filter by agent group IDs | `["group1", "group2"]` |
| `agentGroupNames` | Filter by agent group names | `["Team A", "Team B"]` |
| `agentIds` | Filter by agent IDs | `["agent1", "agent2"]` |
| `agentNames` | Filter by agent names | `["John Doe", "Jane Smith"]` |
| `interactionId` | Filter by interaction ID | `["interaction-123"]` |
| `mediaTypes` | Filter by media types | `["phone", "chat", "email"]` |
| `pbxName` | Filter by PBX name | `["pbx1", "pbx2"]` |
| `queues` | Filter by queue names | `["support", "sales"]` |
| `ringGroups` | Filter by ring group names | `["group1", "group2"]` |
| `sessionId` | Filter by session ID | `["session-123"]` |
| `tenantId` | Filter by tenant ID | `["tenant1", "tenant2"]` |
| `wrapUpCode` | Filter by wrap-up codes | `["Service Call", "Support Call"]` |

### Transition Filters

| Filter Name | Description | Example Values |
| --- | --- | --- |
| `agents` | Filter by agent names | `["John Doe"]` |
| `interactionId` | Filter by interaction ID | `["interaction-123"]` |
| `pbxName` | Filter by PBX names | `["pbx1"]` |
| `previousAgents` | Filter by previous agents | `["Marsha Mellow"]` |
| `previousQueue` | Filter by previous queues | `["Support S2"]` |
| `previousRingGroup` | Filter by previous ring groups | `["1015"]` |
| `queue` | Filter by queue name | `["Support S1"]` |
| `ringGroup` | Filter by ring group name | `["1011"]` |
| `sessionId` | Filter by session ID | `["session-123"]` |
| `tenantId` | Filter by tenant ID | `["tenant1"]` |
| `transition` | Filter by transition state | `["TALKING", "TRANSFER"]` |

### Filter Format

```json
{
  "name": "agents",
  "values": [
    "John Doe",
    "Marsha Mellow"
  ]
}

```

> 📘**Automatic Default Filtering**
>
> If no `pbxName` or `tenantId` filters are provided, the system automatically applies filters based on the authorized  
>
> PBXs and tenants for your API key.
>
>

#### Pagination

The API uses cursor-based pagination to efficiently navigate through large result sets. Here's how it works:

1. Make an initial request with a desired `limit` value (default is 100)
2. The response includes a `nextPageCursor` if there are more records available
3. To retrieve the next page, include the `nextPageCursor` in your next request
4. Continue this process until `nextPageCursor` is null, indicating no more pages

### Pagination Example

Initial request:

```text
GET /api/v1/sessions/{taskId}/data?limit=100

```

Response with next page cursor:

```json
{
  "data": [
    /* 100 records */
  ],
  "nextPageCursor": "encoded-cursor-value"
}

```

Next page request:

```text
GET /api/v1/sessions/{taskId}/data?limit=100&nextPageCursor=encoded-cursor-value

```

Last page response:

```json
{
  "data": [
    /* remaining records */
  ],
  "nextPageCursor": null
}

```

#### Sorting

The API supports sorting of results through two parameters:

* `sortField`: Specifies which field to sort by (default: `TIME`)

> ℹ️ **Note:** Currently, TIME is the only available sortField.
>
>
* `sortDirection`: Specifies the sort order, either `asc` (ascending) or `desc` (descending) (default: `asc`)

Example:

```text
GET /api/v1/sessions/{taskId}/data?sortField=time&sortDirection=DESC

```

#### Data Models

### Session Data Model

The Sessions Endpoint provides a consolidated view of all customer interactions belonging to the same session across all  

8x8 platforms. Each session record includes the following metrics:

| Field | Type | Description |
| --- | --- | --- |
| `time` | ISO8601 date | When the session occurred |
| `sessionId` | string | The sessionId field returned by the Sessions Endpoint uniquely identifies and aggregates all interactions associated with a particular customer session across all platforms. Use this sessionId to correlate and analyze comprehensive interaction data for a specific session. |
| `interactions` | object[] | Array of *interaction* objects representing the interactions belonging to the session. These interactions can originate from CC, UC or Engage platforms). Each *interaction* object will have an *id*, a *type* and a *direction*. |
| `agentGroupIds` | string[] | IDs of agent groups involved |
| `agentGroupNames` | string[] | Names of agent groups involved |
| `agentIds` | string[] | IDs of agents involved |
| `agentNames` | string[] | Names of agents involved |
| `channelId` | string | ID of the initial CC channel |
| `channelName` | string | Name of the initial CC channel |
| `customerEmail` | string | Email of the customer |
| `customerName` | string | Name of the customer |
| `customerPhoneNumber` | string | Phone number of the customer |
| `direction` | string | Direction of the interaction (inbound, outbound) |
| `transfersCompleted` | int | Number of warm & blind transfers during the session |
| `forwardedToQueue` | int | Number of automated forwards to a CC or UC queue during the session |
| `forwardedToRingGroup` | int | Number of automated forwards to a Ring Group during the session |
| `forwardedToScript` | int | Number of automated forwards to a UC AA + CC script/IVR |
| `handlingDuration` | long | Total handling time in milliseconds (aggregates Chat Time+Mute Time+Hold Time across all platforms) |
| `holdDuration` | long | Total hold time in milliseconds |
| `mediaTypes` | string[] | Types of media in the session (phone, chat, email, etc.) |
| `offeringTime` | long | Ringing/offering duration to all agents/users involved in the session in milliseconds |
| `outcome` | string | Outcome of the session (e.g., abandoned, handled, forwarded to VM). |
| `pbxNames` | string[] | PBX names |
| `queueAndRingGroupWaitTime` | long | Sum of queueWaitTime and ringGroupWaitTime |
| `queues` | string[] | Queues used in the session |
| `queueWaitTime` | long | Aggregated queue wait time from all platforms in milliseconds |
| `ringGroups` | string[] | Ring groups used in the session |
| `ringGroupWaitTime` | long | UC Ring Group wait time in milliseconds |
| `scriptTreatmentDuration` | long | Total time spent by the caller in the IVR or Auto-Attendant until the interaction entered a queue |
| `tenantIds` | string[] | Tenant IDs |
| `wrapUpCodes` | string[] | Wrap-up codes applied to the session |
| `wrapUpDuration` | long | Time spent in wrap-up in milliseconds (aggregates wrap-up duration from all platforms) |

### Transition Data Model

The Transitions Endpoint provides detailed information about each state change within a session, allowing users to track  

the exact journey path. Sessions are identified with the *sessionId* . Each transition record includes:

| Field | Type | Description |
| --- | --- | --- |
| `time` | ISO8601 date | When the transition occurred |
| `sessionId` | string | ID of the parent session |
| `transition` | string | State of the transition (e.g., WAITING, TALKING, TRANSFER) |
| `interactionId` | string | ID of the interaction |
| `agents` | string[] | Name of the agent (if applicable) |
| `previousAgents` | string[] | Name of the previous agent (if applicable) |
| `previousQueue` | string | Previous queue name (if applicable) |
| `previousRingGroup` | string | Previous ring group name (if applicable) |
| `queue` | string | Queue name (if applicable) |
| `ringGroup` | string | Ring group name (if applicable) |
| `duration` | long | Duration of this specific transition state in milliseconds |
| `externalNumber` | string | External number (if applicable) |
| `mediaType` | string | Media type (phone, chat, email, etc.) |

### Transition States

A session can progress through multiple transition states:

* **STARTED**: A customer has initiated an interaction using a Contact Center channel.
* **IN_SCRIPT**: The customer is interacting with a script like an IVR script or an auto-attendant.
* **WAITING**: The customer is waiting to be handled by an agent (e.g. waiting in a queue or while the phones in a ring group are being ringed etc.).
* **TALKING**: An agent is interacting with the customer.
* **HOLD**: An agent has put the call on hold (e.g. while the agent is preparing a transfer).
* **OUTBOUND_CALL_INITIATED**: Outbound call has been initiated
* **TRANSFER**: The customer interaction is transferred to another destination. Destinations can be *another agent*, *queue/ring group* or *another phone number*. The properties *agents*, *queue*, *ringGroup* and *externalNumber* contain the destination of the transfer. The properties *previousAgents*, *previousQueue* and *previousRingGroup* contain the origin of the transfer.
* **FINISHED**: The customer interaction has ended.

### Session Outcomes

The `outcome` field in the Sessions API response summarizes the result of a customer session. The outcome is determined by analyzing all underlying interaction outcomes and the total handling duration, using the following logic:

* **Handled**: The session is considered handled if any interaction outcome is `Handled` or `Accepted`, or if the total handling duration is greater than zero.
* **Abandoned**: The session is considered abandoned if any interaction outcome is `Abandoned` and the total handling duration is zero.
* **EndedInScript**: The session ended in an IVR or script if any interaction outcome is `EndedInScript`.
* **Other**: If none of the above apply, but at least one interaction outcome matches a known outcome type, the session is marked as `Other`.
* **UnknownOutcome**: If no known outcome is found, the session is marked as `UnknownOutcome`.

#### Possible Outcome Values

| Value | Description |
| --- | --- |
| `Handled` | The session was successfully handled by an agent or user. |
| `Abandoned` | The session was abandoned by the customer before being handled. |
| `EndedInScript` | The session ended in an IVR script or auto-attendant without reaching an agent or user. |
| `Other` | The session ended with an outcome not covered by the above categories. |
| `UnknownOutcome` | The outcome could not be determined from the available data. |

##### Error Handling

The API returns standard HTTP status codes and an error response body:

```json
{
  "errors": [
    {
      "message": "Error message description",
      "suggestion": "Suggested action to resolve the error",
      "url": "https://developer.8x8.com/analytics/docs/end-to-end-journey-api#invalid-pbx-invalidpbx"
    }
  ]
}

```

### Common Errors

| HTTP Status Code | Description |
| --- | --- |
| 400 | Bad Request - Invalid input parameters |
| 401 | Unauthorized - Invalid or missing API key |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server-side error |

#### Error Codes

This section provides detailed explanations for each error code that the API might return. Each error header is linkable  

via its anchor for easy navigation within the documentation.

### Invalid PBX {#invalidPbx}

This error occurs when one or more PBX names provided in the filter do not belong to the authenticated customer's  

account. It ensures that users cannot request data for PBXes that are not associated with their account.

### Invalid Tenant {#invalidTenant}

This error is returned when the tenant IDs specified in the filter are not recognized as belonging to the current  

customer's account. It helps maintain data integrity by restricting access only to authorized tenant information.

### Malformed Request {#malformedRequest}

This error indicates that the request payload is not properly structured. It may be due to invalid JSON syntax or an  

incorrect structure that does not conform to the API specification.

### Bad Request {#badRequest}

A generic error indicating that the request is invalid. This can be caused by missing required fields, incorrect data  

types, or any other violation of the API’s requirements.

### Date Range Not Null {#dateRangeNotNull}

This error is raised when the date range parameter is missing from the request. A valid date range is required to  

determine the period for which the data should be retrieved.

### Start Date Not Null {#startRangeNotNull}

This error occurs when the start date of the date range is not provided. The API requires a valid start date to define  

the beginning of the data retrieval period.

### End Date Not Null {#endRangeNotNull}

This error is returned if the end date of the date range is missing. A valid end date is needed to mark the conclusion  

of the period for which data is requested.

### End Date Before Start Date {#endDateBeforeStartDate}

This error occurs when the provided start date is later than the end date. The API expects the start date to precede the  

end date to form a valid interval.

### Filters Not Empty {#filtersNotEmpty}

This error is triggered when the filters array is empty. At least one filter must be supplied to narrow down the data  

and make the query meaningful.

### ISO 8061 With Timezone Format {#iso8061WithTzFormat}

This error is raised when a date does not conform to the ISO 8601 format with a timezone designator (for example,  

`2025-03-01T00:00:00Z`). Correct date formatting is required for proper parsing.

### Max Interval {#maxInterval}

This error indicates that the interval between the start and end dates exceeds the maximum allowed period. The user  

should specify a smaller date range to process the request successfully.

### Filter Values Not Empty {#filterValuesNotEmpty}

This error is returned when a filter is provided without any associated values. Each filter must include at least one  

value to effectively narrow down the data.

### Invalid Filter Type {#invalidFilterType}

This error occurs when the filter type specified in the request is not among the supported types. Users must ensure that  

only valid filter types are used.

### Timezone Not Null {#timezoneNotNull}

This error is raised when the displayTimezone parameter is missing. A valid IANA timezone identifier must be provided to  

ensure accurate time-based data processing.

### Invalid Timezone {#invalidTimezone}

This error is thrown if the provided timezone does not match any recognized IANA timezone. Users should verify and  

provide a valid timezone identifier.

### Invalid Sort Direction {#invalidSortDirection}

This error occurs when the sort direction is neither `asc` nor `desc`. The API only accepts these two values for sorting  

order.

### Invalid Sort Field {#invalidSortField}

This error is returned when the sort field specified is not supported. At the moment, only the `TIME` field is available  

for sorting results.

### Invalid Limit {#invalidLimit}

This error indicates that the limit parameter is out of the acceptable range (typically between 1 and 1000). Users  

should adjust the limit to a valid number within the allowed range.

### Invalid Cursor {#invalidCursor}

This error is raised when the pagination cursor provided in the request is invalid. The cursor must be the one returned  

from a previous valid request.

### Invalid Task Id {#invalidTaskId}

This error occurs if the task ID provided does not correspond to any existing task. Users should verify that the task ID  

matches one that was returned by the task creation endpoint.

### Cursor And Sort Mismatch {#cursorAndSortMismatch}

This error indicates that the sort field or direction associated with the provided cursor does not match the current  

request parameters. Ensure that the cursor is used with the same sort settings as those in the original response.

### Missing PBX For Customer {#missingPbxForCustomer}

This error is thrown when the authenticated customer’s account does not have an associated PBX. The user should contact  

their account administrator to have a PBX linked to their account.

#### Rate Limiting

The API implements rate limiting to protect system resources. When rate limits are exceeded, the API returns a 429  

status code with a Retry-After header indicating when you can try again.

#### Use Cases

### 1. End-to-End Customer Journey Analysis

For organizations with complex call flows that span multiple platforms (such as transferred calls between contact center  

agents and back-office teams), this API provides a complete view of the customer journey.

#### Implementation Steps

1. Create a sessions data task:

```text
POST /api/v1/sessions

```

```json
{
  "dateRange": {
    "start": "2025-05-19T08:00:00+03:00",
    "end": "2025-05-19T23:00:00+03:00"
  },
  "filters": [
    {
      "name": "pbxName",
      "values": [
        "mainPbx"
      ]
    }
  ],
  "displayTimezone": "Europe/Paris"
}

```

2. Check task status until completed:

```text
GET /api/v1/sessions/{taskId}/status

```

3. Retrieve session data:

```text
GET /api/v1/sessions/{taskId}/data?limit=50

```

4. For detailed journey analysis, retrieve transition data:

```text
POST /api/v1/transitions

```

```json
{
  "dateRange": {
    "start": "2025-05-19T08:00:00+03:00",
    "end": "2025-05-19T23:00:00+03:00"
  },
  "filters": [
    {
      "name": "sessionId",
      "values": [
        "session-123"
      ]
    }
  ],
  "displayTimezone": "Europe/Paris"
}

```

5. Check task status and retrieve transition data:

```text
GET /api/v1/transitions/{taskId}/status

```

```text
GET /api/v1/transitions/{taskId}/data?sortField=TIMESTAMP&sortDirection=ASC

```

### 2. Transfer Pattern Analysis

For organizations that want to understand how calls are being transferred between systems and analyze transfer patterns.

#### Implementation Steps

1. Create a transitions data task:

```text
POST /api/v1/transitions

```

```json
{
  "dateRange": {
    "start": "2025-05-19T00:00:00+03:00",
    "end": "2025-05-19T00:00:00+03:00"
  },
  "filters": [
    {
      "name": "transition",
      "values": [
        "TRANSFER"
      ]
    }
  ],
  "displayTimezone": "Europe/Paris"
}

```

2. Check task status:

```text
GET /api/v1/transitions/{taskId}/status

```

3. Retrieve transition data to analyze all transfers:

```text
GET /api/v1/transitions/{taskId}/data?limit=100

```

### 3. Queue Performance Analysis

For analyzing queue performance across different platforms.

#### Implementation Steps

1. Create a sessions data task:

```text
POST /api/v1/sessions

```

```json
{
  "dateRange": {
    "start": "2025-05-19T00:00:00+03:00",
    "end": "2025-05-19T00:00:00+03:00"
  },
  "filters": [
    {
      "name": "queues",
      "values": [
        "support",
        "sales",
        "technical"
      ]
    }
  ],
  "displayTimezone": "Europe/Paris"
}

```

2. Check task status

```text
GET /api/v1/sessions/{taskId}/status

```

3. Retrieve session data:

```text
GET /api/v1/sessions/{taskId}/data?limit=100

```

##### Best Practices

1. **Use appropriate date ranges**: Keep date ranges reasonably small (ideally less than 1 day) to improve  

performance. For longer historical analysis, consider breaking your requests into multiple segments.
2. **Apply relevant filters**: Use filters to narrow down results and improve response times.
3. **Handle pagination properly**: Always check for the `nextPageCursor` and fetch all pages when needed.
4. **Poll task status efficiently**: Use exponential backoff when polling for task status (starting with a few seconds  

and gradually increasing).
5. **Respect rate limits**: Implement appropriate retry mechanisms with backoff when encountering rate limiting.
6. **Cache results when appropriate**: For frequently accessed data that doesn't change often, consider caching on your  

side.
7. **Handle errors gracefully**: Check for error responses and retry with backoff for transient errors.

##### API Glossary

### Time Representations

All times in the API are represented in ISO 8601 format with timezone designator (e.g., `2025-03-01T00:00:00Z`).  

The displayTimezone specified in your request is only used for displaying purposes.

### Duration Metrics

All duration metrics (handling time, wait time, etc.) are provided in milliseconds.

### Media Types

* **phone**: Phone interactions
* **chat**: Chat interactions
* **email**: Email interactions

### Interaction Direction

* **inbound**: Customer-initiated interactions
* **outbound**: Agent-initiated interactions
* **internal**: Internal interactions (e.g., between agents)

### PBX and Tenant IDs

PBX names and tenant IDs are used for filtering and represent the 8x8 platform instances your organization uses.

#### Further Assistance

For additional support or questions about the CIDP Journey API, please contact your 8x8 representative or submit a  

support ticket through the 8x8 support portal.
