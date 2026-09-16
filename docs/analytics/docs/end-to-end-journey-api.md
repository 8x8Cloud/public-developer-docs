# [Beta] End-to-End Journeys

## Introduction

The Journey API provides a consolidated view of customer interactions belonging to the same journey. These interactions may happen on one or multiple 8x8 products, including Contact Center, Unified Communications, AI Studio, and Engage. Using the API users can retrieve journey data and detailed transition information, enabling end-to-end tracking of customer journeys regardless of transfers between systems or agents.

This API is particularly valuable for organizations with complex flows that span multiple systems, where customers may be transferred between formal contact center agents and back-office operations.

The Journey API is currently in Beta. To join the Beta and start receiving data through the API, install the JourneyIQ application from the 8x8 App Store. Installing the application provisions your account for journey data collection, so journeys are available through the API only from the moment it is installed.

## Business Value

The Journey API solves critical business challenges:

- **Customer Journey Tracking:** Track complete customer journeys across Contact Center, Unified Communications, AI Studio, and Engage in a single view
- **Transfer Pattern Analysis:** Understand how calls are transferred between systems and agents
- **Comprehensive Metrics:** Access consolidated metrics like handling time, queue wait time, and outcomes across all platforms
- **Detailed Transition History:** Examine every state a customer interaction passed through

Organizations can build comprehensive reports and dashboards in third-party BI tools with a complete view of all customer interactions.

## Authentication

All API requests require an x-api-key header for authentication. Obtain your x-api-key from the Admin Console application.

Required Request Header:

```bash
x-api-key: your-api-key-value
```

## Base URLs

| Region        | Base URL                                  |
|---------------|-------------------------------------------|
| United States | `https://api.8x8.com/cidp/journey/api`    |
| Europe        | `https://api-eu.8x8.com/cidp/journey/api` |

## API Endpoints Overview

The API provides two main synchronous endpoints:

1. **Journeys** (`/v1/journeys/search`): Provides aggregated journey data across all platforms, including comprehensive metrics like handling time, queue wait time, and outcomes.

2. **Transitions** (`/v1/transitions/search`): Provides detailed information about each state transition within a journey, allowing you to track the exact journey path.

## API Endpoints

### Journeys Endpoint

```http
POST /v1/journeys/search
```

Retrieves journey data based on the specified criteria.

#### Request Headers

| Name         | Required | Description                            | Example              |
|--------------|----------|----------------------------------------|----------------------|
| Content-Type | ✓        | Set to application/json                | `application/json`   |
| x-api-key    | ✓        | API key from Admin Console application | `your-api-key-value` |

#### Request Body

| Name            | Required | Description                                                                         | Example                |
|-----------------|----------|-------------------------------------------------------------------------------------|------------------------|
| dateRange.start | ✓        | Start datetime in ISO 8601 format with timezone designator                          | `2025-03-01T00:00:00Z` |
| dateRange.end   | ✓        | End datetime in ISO 8601 format with timezone designator                            | `2025-03-10T00:00:00Z` |
| filters         | ☐        | Set of filter objects with name and values                                          | See filters section    |
| displayTimezone | ✓        | IANA timezone display name - the desired display timezone value for the time fields | `Europe/Bucharest`     |
| limit           | ☐        | Maximum number of records to return, between 1 and 1000 (default: 100)              | `50`                   |
| nextPageCursor  | ☐        | Cursor for pagination from previous response                                        | `encoded-cursor-value` |
| sortField       | ☐        | Field to sort by (default: `TIME`)                                                  | `TIME`                 |
| sortDirection   | ☐        | Sort direction, either `ASC` or `DESC` (default: `ASC`)                             | `DESC`                 |

> ⚠️ **Important: Date Range Filtering Behavior**
>
> The `dateRange` filter works as follows:
>
> - **For Journeys**: The API returns all journeys that have a `time` within the specified date range (between `start` and `end`)
> - **For Transitions**: The API returns ALL transitions belonging to journeys that started within the date range
>
> This means:
>
> - A journey is included if it started within the date range
> - All transitions for included journeys are returned, even if some transitions occurred after the `end` date
> - The `start` and `end` parameters define the search interval, NOT the duration of individual journeys or transitions
>
> **Example**: If you search for journeys between 9:00 AM and 10:00 AM, you'll get all journeys that started in that hour, along with ALL their transitions - even if some transitions happened at 11:00 AM or later.

> ⚠️ **Timerange Limit**
>
> **Note:** The maximum allowed timerange for journey-search and transition-search requests is **60 days**.
>
> For best performance, keep each request to a timerange of 1 day or less. To analyze a longer period, break the work into consecutive requests of that size.

#### Example Request

```json
{
  "dateRange": {
    "start": "2025-05-19T08:00:00+03:00",
    "end": "2025-05-19T16:00:00+03:00"
  },
  "filters": [
    {
      "name": "pbxNames",
      "values": [
        "yourPbxName"
      ]
    },
    {
      "name": "tenantIds",
      "values": [
        "yourTenantId"
      ]
    }
  ],
  "displayTimezone": "Europe/Bucharest",
  "limit": 50,
  "sortDirection": "DESC"
}
```

#### Example Response

```json
{
  "data": [
    {
      "time": "2025-03-10T13:33:42+02:00",
      "finishedTime": "2025-03-10T13:38:15+02:00",
      "journeyId": "7b2429440d15183af1044dd47f1d447d",
      "interactions": [
        {
          "id": "int-196e53e066e-QNePASHISrp0D65MVgaNJYS13-phone-01-cexpbx01",
          "direction": "Inbound",
          "type": "Contact Center"
        },
        {
          "id": "int-196e53e066e-QNePASHISrp0D65MVgaNJYS13-ai-studio-01",
          "direction": "Inbound",
          "type": "AI Studio"
        }
      ],
      "agents": [
        {
          "id": "ag-123",
          "name": "John Doe",
          "email": "john.doe@example.com",
          "loginId": "jdoe",
          "department": "Customer Support",
          "group": {
            "id": "101",
            "name": "ungroup"
          },
          "type": "HUMAN"
        }
      ],
      "contact": {
        "name": "+443335565567",
        "phoneNumber": "+449988776655",
        "email": "john.doe@example.com"
      },
      "entryPoint": {
        "type": "user",
        "id": "user-789",
        "name": "Jane Smith",
        "phoneNumber": "+1234567890",
        "extension": "1001",
        "email": "jane.smith@example.com",
        "loginId": "jsmith",
        "department": "Sales",
        "pbx": "mainPbx",
        "tenantId": "8x8",
        "site": null
      },
      "direction": "Inbound",
      "transfersCompleted": 0,
      "forwardedToQueue": 0,
      "forwardedToRingGroup": 0,
      "forwardedToScript": 2,
      "holdDuration": 0,
      "mediaTypes": [
        "Phone"
      ],
      "outcome": "Handled",
      "origin": null,
      "pbxNames": [],
      "queues": [],
      "ringGroups": [],
      "scheduleHours": ["Open", "Closed"],
      "schedules": [
        {
          "id": 107,
          "tag": "Ferie",
          "tenantId": "cexpbx01",
          "result": "open"
        }
      ],
      "tenantIds": [
        "8x8"
      ],
      "wrapUpCodes": [],
      "outboundPhoneCodes": [],
      "aiAgentInformation": {
        "creditConsumption": 1.93488,
        "toolsUsedSuccessfully": [
          {
            "name": "transferToExtension",
            "success": true
          }
        ]
      }
    }
  ],
  "nextPageCursor": "ZW5jbLW5leHQtRlZC1jdXJzb3ItZm9ycGFnZQ==",
  "totalElements": 150
}
```

### Transitions Endpoint

```http
POST /v1/transitions/search
```

Retrieves transition data based on the specified criteria.

Results are grouped by journey: each entry in `data` is one journey, holding every transition that
belongs to it. Pagination therefore counts **journeys**, not transitions. `limit` is the maximum
number of journeys in the page, `totalElements` is the number of matching journeys, and
`nextPageCursor` walks journeys. Because every transition of a returned journey is included, a
journey with a long timeline produces a correspondingly large entry, so size client timeouts against
the number of transitions rather than the number of journeys.

#### Request Headers

| Name         | Required | Description                            | Example              |
|--------------|----------|----------------------------------------|----------------------|
| Content-Type | ✓        | Set to application/json                | `application/json`   |
| x-api-key    | ✓        | API key from Admin Console application | `your-api-key-value` |

#### Request Body

Same structure as Journeys endpoint, but with transition-specific filters.

#### Example Request

```json
{
  "dateRange": {
    "start": "2025-05-21T00:00:00+03:00",
    "end": "2025-05-21T23:59:59+03:00"
  },
  "filters": [
    {
      "name": "transitions.name",
      "values": [
        "TRANSFER"
      ]
    }
  ],
  "displayTimezone": "Europe/Bucharest",
  "limit": 100
}
```

#### Example Response

```json
{
  "data": [
    {
      "journeyId": "3015ccfd5ebf8b2dcde38045ed30bc7",
      "transitions": [
        {
          "time": "2025-05-21T12:09:23.312+03:00",
          "name":"STARTED",
          "interactionId": "int-196f21ac6ef-d5eed30bc738045-phone-02-8x8",
          "agents": [],
          "previousAgents": [],
          "previousQueue": null,
          "previousRingGroup": null,
          "queue": null,
          "ringGroup": null,
          "duration": 0,
          "externalNumber": null,
          "channel": null,
          "mediaType": "Phone"
        },
        {
          "time": "2025-05-21T12:09:23.312+03:00",
          "name":"IN_SCRIPT",
          "interactionId": "int-196f21ac6ef-d5eed30bc738045-phone-02-8x8",
          "agents": [],
          "previousAgents": [],
          "previousQueue": null,
          "previousRingGroup": null,
          "queue": null,
          "ringGroup": null,
          "duration": 9206,
          "externalNumber": null,
          "channel": null,
          "scripts": [
            {
              "id": 541,
              "name": "example_script_name",
              "tenantId": "cexpbx01"
            }
          ],
          "mediaType": "Phone"
        },
        {
          "time": "2025-05-21T12:10:12.143+03:00",
          "name":"TRANSFER",
          "interactionId": "int-196f21ac6ef-d5eed30bc738045-phone-02-8x8",
          "agents": [
            {
              "id": "ag-456",
              "name": "Jack Pott",
              "email": "jack.pott@example.com",
              "loginId": "jpott",
              "department": "Technical Support",
              "group": null,
              "type": "HUMAN"
            }
          ],
          "previousAgents": [
            {
              "id": "ag-123",
              "name": "Marsha Mellow",
              "email": "marsha.mellow@example.com",
              "loginId": "mmellow",
              "department": "Customer Support",
              "group": null,
              "type": "HUMAN"
            }
          ],
          "previousQueue": {
            "id": "queue-101",
            "name": "Service Client",
            "extension": "2001"
          },
          "previousRingGroup": null,
          "queue": null,
          "ringGroup": null,
          "duration": 0,
          "externalNumber": "+441138413014",
          "channel": {
            "id": "ch-voice-1",
            "name": "Voice",
            "tenantId": "cexpbx01"
          },
          "mediaType": "Phone"
        }
      ]
    }
  ],
  "nextPageCursor": null,
  "totalElements": 1
}
```

## Filters

Filters allow you to narrow down the data returned by the API based on specific criteria. Different filter types are available for journeys and Transitions endpoints.

By default, the API returns all journeys/transitions belonging to your customer account across all PBXes and tenants. To return only journeys for a specific PBX, add a `pbxNames` filter. To return only journeys for a specific tenant, add a `tenantIds` filter. All filters use AND logic: when multiple filters are provided, only results matching **all** of them are returned.

Filter values are matched exactly and are case-sensitive. Use the value exactly as the API returns it, for example `Inbound` rather than `inbound`, and `Phone` rather than `phone`. The `sortField` and `sortDirection` request fields are case-sensitive too, and accept only their documented uppercase values.

### Journey Filters

| Filter Name                    | Description                              | Example Values                                                         |
|--------------------------------|------------------------------------------|------------------------------------------------------------------------|
| `agents.department`            | Filter by agent department               | `["Customer Support"]`                                                 |
| `agents.email`                 | Filter by agent email address            | `["john.doe@example.com"]`                                             |
| `agents.group.id`              | Filter by agent group IDs                | `["group1", "group2"]`                                                 |
| `agents.group.name`            | Filter by agent group names              | `["Team A", "Team B"]`                                                 |
| `agents.name`                  | Filter by agent names                    | `["John Doe", "Jane Smith"]`                                           |
| `agents.site.id`               | Filter by agent site ID                  | `["site-123"]`                                                         |
| `agents.site.name`             | Filter by agent site name                | `["London Office"]`                                                    |
| `agents.type`                  | Filter by agent type (`HUMAN` or `AI`)   | `["HUMAN"]`, `["AI"]`                                                  |
| `aiAgentInformation.toolsUsedSuccessfully.name` | Filter by the name of a tool an AI agent invoked | `["transferToExtension"]`                                              |
| `contact.email`                | Filter by contact email                  | `["jane.doe@example.com"]`                                             |
| `contact.name`                 | Filter by contact name                   | `["Jane Doe"]`                                                         |
| `contact.phoneNumber`          | Filter by contact phone number           | `["+1234567890"]`                                                      |
| `direction`                    | Filter by journey direction              | `["Inbound", "Outbound", "Internal"]`                                  |
| `entryPoint.department`        | Filter by entry point department         | `["Sales"]`                                                            |
| `entryPoint.email`             | Filter by entry point email address      | `["jane.smith@example.com"]`                                           |
| `entryPoint.extension`         | Filter by entry point extension          | `["1001"]`                                                             |
| `entryPoint.id`                | Filter by entry point ID                 | `["ep-789"]`                                                           |
| `entryPoint.name`              | Filter by entry point name               | `["Main Support Line"]`                                                |
| `entryPoint.phoneNumber`       | Filter by entry point phone number       | `["053244122"]`                                                        |
| `entryPoint.site.id`           | Filter by entry point site ID            | `["site-123"]`                                                         |
| `entryPoint.site.name`         | Filter by entry point site name          | `["London Office"]`                                                    |
| `entryPoint.type`              | Filter by entry point type               | `["cc-channel", "ring-group", "call-queue", "auto-attendant", "user", "ai-studio"]` |
| `interactions.id`              | Filter by interaction ID                 | `["interaction-123"]`                                                  |
| `journeyId`                    | Filter by journey ID                     | `["journey-123"]`                                                      |
| `mediaTypes`                   | Filter by media types                    | `["Phone", "Chat", "Email"]`                                           |
| `origin.department`            | Filter by origin department              | `["Sales"]`                                                            |
| `origin.email`                 | Filter by origin email address           | `["jane.smith@example.com"]`                                           |
| `origin.extension`             | Filter by origin extension               | `["1001"]`                                                             |
| `origin.id`                    | Filter by origin ID                      | `["user-789"]`                                                         |
| `origin.name`                  | Filter by origin name                    | `["Jane Smith"]`                                                       |
| `origin.phoneNumber`           | Filter by origin phone number            | `["+1234567890"]`                                                      |
| `origin.site.id`               | Filter by origin site ID                 | `["site-123"]`                                                         |
| `origin.site.name`             | Filter by origin site name               | `["Berlin Office"]`                                                    |
| `origin.type`                  | Filter by origin type                    | `["user"]`                                                             |
| `outboundPhoneCodes.listName`  | Filter by outbound phone code list name  | `["JohnDoeInbound"]`                                                   |
| `outboundPhoneCodes.name`      | Filter by outbound phone code name       | `["No queue"]`                                                         |
| `outboundPhoneCodes.shortCode` | Filter by outbound phone code short code | `["Unt1"]`                                                             |
| `outcome`                      | Filter by journey outcome                | `["Handled", "Abandoned", "EndedInScript", "ForwardedToExternalNumber", "Voicemail", "CallbackRequested", "CallbackNoAnswer", "CallbackExpired", "Other", "UnknownOutcome"]` |
| `pbxNames`                     | Filter by PBX names                      | `["pbx1", "pbx2"]`                                                     |
| `queues.extension`             | Filter by queue extension                | `["2001"]`                                                             |
| `queues.id`                    | Filter by queue ID                       | `["queue-123"]`                                                        |
| `queues.name`                  | Filter by queue names                    | `["Customer Support Queue"]`                                           |
| `queues.site.id`               | Filter by queue site ID                  | `["site-123"]`                                                         |
| `queues.site.name`             | Filter by queue site name                | `["Paris Office"]`                                                     |
| `ringGroups.extension`         | Filter by ring group extension           | `["3001"]`                                                             |
| `ringGroups.id`                | Filter by ring group ID                  | `["rg-456"]`                                                           |
| `ringGroups.name`              | Filter by ring group names               | `["Sales Ring Group"]`                                                 |
| `ringGroups.site.id`           | Filter by ring group site ID             | `["site-123"]`                                                         |
| `ringGroups.site.name`         | Filter by ring group site name           | `["Berlin Office"]`                                                    |
| `tenantIds`                    | Filter by tenant IDs                     | `["tenant1", "tenant2"]`                                               |
| `wrapUpCodes`                  | Filter by wrap-up codes                  | `["Service Call", "Support Call"]`                                     |

> **Enrichment-populated filters**: `agents.email`, `agents.department`, `origin.email`, `origin.department`,
> `entryPoint.email` and `entryPoint.department` match the user details added when the journey is indexed.
> They are exact-match (no normalization), and a journey whose user details could not be resolved carries no
> value and is therefore not matched by them. `entryPoint.email` / `entryPoint.department` apply to `user`-type
> entry points only, and `origin.email` / `origin.department` to the originating user of an outbound journey.

> **`aiAgentInformation.toolsUsedSuccessfully.name`** matches the name of any tool an AI agent invoked during the
> journey. Despite the name of the array that holds them, a matching entry is **not** necessarily a successful
> invocation. Each entry carries its own `success` flag. See **AiAgentInformation Object**.

### Transition Filters

| Filter Name                               | Description                                     | Example Values            |
|-------------------------------------------|-------------------------------------------------|---------------------------|
| `journeyId`                               | Filter by journey ID                            | `["journey-123"]`         |
| `pbxNames`                                | Filter by PBX names                             | `["pbx1"]`                |
| `tenantIds`                               | Filter by tenant IDs                            | `["tenant1"]`             |
| `transitions.agents.name`                 | Filter by agent names                           | `["John Doe"]`            |
| `transitions.agents.site.id`              | Filter by agent site ID                         | `["site-123"]`            |
| `transitions.agents.site.name`            | Filter by agent site name                       | `["Toronto Office"]`      |
| `transitions.agents.type`                 | Filter by agent type (`HUMAN` or `AI`)          | `["HUMAN"]`, `["AI"]`     |
| `transitions.autoAttendant.id`            | Filter by auto attendant ID                     | `["aa-123"]`              |
| `transitions.autoAttendant.name`          | Filter by auto attendant name                   | `["Main Auto Attendant"]` |
| `transitions.autoAttendant.extension`     | Filter by auto attendant extension              | `["1040"]`                |
| `transitions.autoAttendant.site.id`       | Filter by auto attendant site ID                | `["site-123"]`            |
| `transitions.autoAttendant.site.name`     | Filter by auto attendant site name              | `["London Office"]`       |
| `transitions.interactionId`               | Filter by interaction ID                        | `["interaction-123"]`     |
| `transitions.name`                        | Filter by transition (state) name. Matched exactly and case-sensitively, so an unrecognized value returns no results rather than an error                                                                                                                                                                                                                                                                                                                                                                                                              | `["TALKING", "TRANSFER"]` |
| `transitions.previousAgents.name`         | Filter by previous agents                       | `["Marsha Mellow"]`       |
| `transitions.previousAgents.site.id`      | Filter by previous agent site ID                | `["site-123"]`            |
| `transitions.previousAgents.site.name`    | Filter by previous agent site name              | `["Toronto Office"]`      |
| `transitions.previousAgents.type`         | Filter by previous agent type (`HUMAN` or `AI`) | `["HUMAN"]`, `["AI"]`     |
| `transitions.previousQueue.extension`     | Filter by previous queue extension              | `["2001"]`                |
| `transitions.previousQueue.id`            | Filter by previous queue ID                     | `["queue-123"]`           |
| `transitions.previousQueue.name`          | Filter by previous queue name                   | `["Support S2"]`          |
| `transitions.previousQueue.site.id`       | Filter by previous queue site ID                | `["site-123"]`            |
| `transitions.previousQueue.site.name`     | Filter by previous queue site name              | `["Vienna Office"]`       |
| `transitions.previousRingGroup.extension` | Filter by previous ring group extension         | `["3001"]`                |
| `transitions.previousRingGroup.id`        | Filter by previous ring group ID                | `["rg-456"]`              |
| `transitions.previousRingGroup.name`      | Filter by previous ring group name              | `["Sales Ring Group"]`    |
| `transitions.previousRingGroup.site.id`   | Filter by previous ring group site ID           | `["site-123"]`            |
| `transitions.previousRingGroup.site.name` | Filter by previous ring group site name         | `["Madrid Office"]`       |
| `transitions.queue.extension`             | Filter by queue extension                       | `["2001"]`                |
| `transitions.queue.id`                    | Filter by queue ID                              | `["queue-123"]`           |
| `transitions.queue.name`                  | Filter by queue name                            | `["Support S1"]`          |
| `transitions.queue.site.id`               | Filter by queue site ID                         | `["site-123"]`            |
| `transitions.queue.site.name`             | Filter by queue site name                       | `["Rome Office"]`         |
| `transitions.ringGroup.extension`         | Filter by ring group extension                  | `["3001"]`                |
| `transitions.ringGroup.id`                | Filter by ring group ID                         | `["rg-456"]`              |
| `transitions.ringGroup.name`              | Filter by ring group name                       | `["Sales Ring Group"]`    |
| `transitions.ringGroup.site.id`           | Filter by ring group site ID                    | `["site-123"]`            |
| `transitions.ringGroup.site.name`         | Filter by ring group site name                  | `["Amsterdam Office"]`    |

### Filter Format

Filters are provided as an array of objects in the request body:

```json
{
  "filters": [
    {
      "name": "agents.name",
      "values": [
        "John Doe",
        "Marsha Mellow"
      ]
    },
    {
      "name": "mediaTypes",
      "values": [
        "Phone"
      ]
    }
  ]
}
```

## Pagination

The API uses cursor-based pagination to efficiently navigate through large result sets. Here's how it works:

1. Make an initial request with a desired `limit` value in the request body (between 1 and 1000; default is 100)
2. The response includes a `nextPageCursor` if there are more records available
3. To retrieve the next page, include the `nextPageCursor` in your next request body
4. Continue this process until `nextPageCursor` is null, indicating no more pages

### Pagination Example

Initial request:

```json
{
  "dateRange": {
    "start": "2025-05-19T00:00:00Z",
    "end": "2025-05-19T23:59:59Z"
  },
  "displayTimezone": "UTC",
  "limit": 100
}
```

Response with next page cursor, where `data` holds the first 100 journeys:

```json
{
  "data": [],
  "nextPageCursor": "encoded-cursor-value",
  "totalElements": 250
}
```

Next page request:

```json
{
  "dateRange": {
    "start": "2025-05-19T00:00:00Z",
    "end": "2025-05-19T23:59:59Z"
  },
  "displayTimezone": "UTC",
  "limit": 100,
  "nextPageCursor": "encoded-cursor-value"
}
```

Last page response, where `data` holds the remaining 50 journeys:

```json
{
  "data": [],
  "nextPageCursor": null,
  "totalElements": 250
}
```

## Sorting

The API supports sorting of results through two parameters in the request body:

- `sortField`: Specifies which field to sort by (default: `TIME`)
  > ℹ️ **Note:** Currently, TIME is the only available sortField.
- `sortDirection`: Specifies the sort order, either `ASC` (ascending) or `DESC` (descending) (default: `ASC`)

Example:

```json
{
  "dateRange": {
    "start": "2025-05-19T00:00:00Z",
    "end": "2025-05-19T23:59:59Z"
  },
  "displayTimezone": "UTC",
  "sortField": "TIME",
  "sortDirection": "DESC"
}
```

## Data Models

### Journey Data Model

The Journeys Endpoint provides a consolidated view of all customer interactions belonging to the same journey across all 8x8 platforms. Each journey record includes the following structure:

| Field                  | Type                 | Description                                                                                                                                                                                                                                                                      |
|------------------------|----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `time`                 | ISO8601 date         | When the journey started.                                                                                                                                                                                                                                                        |
| `finishedTime`         | ISO8601 date         | When the journey ended. `null` if the journey is still in progress. Do not treat `null` as short-lived, and do not use it to infer recency: filtering and sorting are always on `time` (the journey start), never on `finishedTime`. Inbound journeys routed to a Contact Center voicemail queue or callback queue stay in progress for as long as the interaction sits in that queue, which can be hours or days. |
| `journeyId`            | string               | The journeyId field returned by the Journeys Endpoint uniquely identifies and aggregates all interactions associated with a particular customer journey across all platforms. Use this journeyId to correlate and analyze comprehensive interaction data for a specific journey. |
| `interactions`         | Interaction\[]       | Array of interaction objects representing the interactions belonging to the journey. These interactions can originate from Contact Center, Unified Communications, AI Studio or Engage.                                                                                          |
| `agents`               | Agent\[]             | Array of agent objects who handled the journey. An agent handled the journey if they appear on a `TALKING` transition, meaning they talked to the contact, or on a `PROCESSING` transition, meaning they processed the contact's voicemail offline. An agent who was only rung, or who dialed without reaching the contact, is not listed. |
| `contact`              | Contact              | Contact object containing name, phone number, and email who interacts with the organization. As an example for inbound phone interactions this is the caller, and for outbound ones this is the callee.                                                                          |
| `entryPoint`           | entryPoint           | entryPoint object is populated only for inbound journeys and identifies where the interaction first enters the organization (e.g. a contact center channel, or a unified communication ring group). For outbound and internal journeys this object is `null`.                                 |
| `transfersCompleted`   | int                  | Number of warm & cold transfers during the journey                                                                                                                                                                                                                               |
| `forwardedToQueue`     | int                  | Number of automated forwards to a Contact Center or Unified Communications queue during the journey                                                                                                                                                                              |
| `forwardedToRingGroup` | int                  | Number of automated forwards to a Ring Group during the journey                                                                                                                                                                                                                  |
| `forwardedToScript`    | int                  | Number of automated forwards to a Unified Communications auto attendant or Contact Center script/IVR                                                                                                                                                                             |
| `holdDuration`         | long                 | Total hold time in milliseconds                                                                                                                                                                                                                                                  |
| `mediaTypes`           | string\[]            | Types of media in the journey (`Phone`, `Chat`, `Email`, etc.)                                                                                                                                                                                                                                                                                           |
| `origin`               | origin               | Origin object identifying the 8x8 user who initiated an outbound journey. `null` for inbound and internal journeys.                                                                                                                                                              |
| `direction`            | string               | Direction of the journey. One of `Inbound`, the contact called into your organization; `Outbound`, an 8x8 user called the contact; or `Internal`, the interaction took place between 8x8 users of your organization.                                                              |
| `pbxNames`             | string\[]            | PBX names                                                                                                                                                                                                                                                                        |
| `queues`               | Queue\[]             | Array of queue objects used in the journey                                                                                                                                                                                                                                       |
| `ringGroups`           | RingGroup\[]         | Array of ring group objects used in the journey                                                                                                                                                                                                                                  |
| `scheduleHours`        | string\[]            | Distinct array of values for all the IVR `scheduleHours` nodes of the journey. May be `null` when the journey passed through no schedule-hours node, unlike the other array fields, which come back empty.                                                                                                                                                                                                   |
| `schedules`            | Schedule\[]          | Contact Center script schedule nodes the journey was evaluated against. Always an array, empty when the journey was evaluated against no schedule node. See [Schedule Object](#schedule-object).                                                                                           |
| `tenantIds`            | string\[]            | Tenant IDs                                                                                                                                                                                                                                                                       |
| `wrapUpCodes`          | string\[]            | Wrap-up codes applied to the journey                                                                                                                                                                                                                                             |
| `outboundPhoneCodes`   | OutboundPhoneCode\[] | Outbound phone codes, populated only for Contact Center agent-initiated outbound interactions.                                                                                                                                                                                   |
| `aiAgentInformation`   | AiAgentInformation   | AI Studio usage aggregated over the journey: credits consumed and the tools AI agents invoked. The property is omitted for journeys with no AI Studio interaction. See [AiAgentInformation Object](#aiagentinformation-object).                                                                      |

#### Journey Outcomes

The `outcome` field in the Journeys API response summarizes the result of a customer journey. Every
journey has an outcome, including journeys that are still in progress, and the value is updated as the
journey progresses. An outcome being present therefore does not mean the journey has finished; check
`finishedTime` for that.

| Value            | Description                                                                             |
|------------------|-----------------------------------------------------------------------------------------|
| `Handled`        | The journey was handled by an agent. The agents who handled it are listed in the journey's `agents` property. |
| `Abandoned`      | The journey was abandoned by the customer before being handled by an agent.              |
| `EndedInScript`  | The journey ended in an IVR script or auto-attendant without reaching an agent.          |
| `ForwardedToExternalNumber` | The journey was forwarded to an external number without being handled by an agent. |
| `Voicemail`      | The journey terminated with a voicemail from the contact and no agent involved. If the customer spoke to an agent first, the outcome stays `Handled` even when a later transfer ends in voicemail. |
| `CallbackRequested` | This outcome exists only on active journeys. It is set when no agent has been involved and the journey is currently waiting for a callback. When the journey finishes the outcome becomes `Handled` if an agent interacted with the customer, or `CallbackNoAnswer` or `CallbackExpired` otherwise. See [Contact Center Queue Callback Tracking](#5-contact-center-queue-callback-tracking). |
| `CallbackNoAnswer` | No agent handled the journey. The customer requested a callback, and the callback was attempted one or more times without the customer answering. |
| `CallbackExpired` | No agent handled the journey. The customer requested a callback, and the callback expired before any attempt was made to reach the customer. |
| `Other`          | The journey ended with an outcome not covered by the above categories.                  |
| `UnknownOutcome` | The outcome could not be determined from the available data.                            |

> **Once an agent has handled the journey, the outcome stays `Handled`.** If an agent talked to the
> customer and the interaction was later transferred to a destination that ended in voicemail, or the
> customer subsequently requested a callback, the journey remains `Handled`. The `Voicemail` and
> `Callback*` outcomes describe journeys where no agent ever talked to the customer.
>
> **A callback that reached the customer is `Handled`.** There is no `CallbackHandled` value, so a
> filter built only from the three `Callback*` values returns the callbacks that never reached the
> customer, plus the active journeys still waiting for one.
>
> **A voicemail that an agent processed is `Handled`, not `Voicemail`.** The `Voicemail` outcome
> means the contact left a message that no agent ever dealt with. Once an agent processes the
> voicemail, recorded as a `PROCESSING` transition, the journey is handled and the processing agent
> appears in the journey's `agents` property.

#### Interaction Object

```json
{
  "id": "string",
  "direction": "string",
  "type": "string"
}
```

| Field       | Type   | Description                                                                                    |
|-------------|--------|------------------------------------------------------------------------------------------------|
| `id`        | string | Unique identifier of the interaction                                                           |
| `direction` | string | Direction of the interaction (e.g. `Inbound`, `Outbound`)                                      |
| `type`      | string | Type of the interaction. Known values: `Contact Center`, `Unified Communication` (singular, as emitted), `AI Studio`. |

#### Agent Object

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "loginId": "string",
  "department": "string",
  "group": {
    "id": "string",
    "name": "string"
  },
  "site": {
    "id": "string",
    "name": "string"
  },
  "type": "HUMAN"
}
```

| Field        | Type       | Description                                                                                                                 |
|--------------|------------|-----------------------------------------------------------------------------------------------------------------------------|
| `id`         | string     | Unique identifier of the agent/user                                                                                         |
| `name`       | string     | Display name of the agent/user                                                                                              |
| `email`      | string     | Email address of the agent/user. May be `null` if user data enrichment is unavailable or disabled.                          |
| `loginId`    | string     | Login ID of the agent/user. May be `null` if user data enrichment is unavailable or disabled.                               |
| `department` | string     | Department of the agent/user. May be `null` or an empty string when no department is set or user data enrichment is unavailable.                             |
| `group`      | AgentGroup | Agent group the agent belongs to. This is currently the user group attached to the user in the 8x8 Admin Console. May be `null` when the user has no group. |
| `site`       | Site       | Site (branch/office) the agent/user belongs to. May be `null` if the agent has no site assigned. See [Site Object](#site-object). |
| `type`       | string     | Agent type. `HUMAN` for 8x8 users, `AI` for AI Studio agents.                                                              |

#### Journey Agents

An agent can appear in a transition's `agents` array without appearing in the journey `agents` array. This happens on an `OUTBOUND_STARTED` transition, where the agent dialed the contact, on a `FORWARD` transition, where the system routed the interaction to the agent, and on a `TRANSFER` transition, where another agent passed the interaction to them.

An agent is rolled up from a transition into the journey `agents` array only when they handled the journey: when they appear on a `TALKING` transition, meaning they talked to the contact, or on a `PROCESSING` transition, meaning they processed the contact's voicemail offline. An agent who was only rung, or who dialed without reaching the contact, is never rolled up.

The journey `agents` array is returned by the Journeys endpoint and a transition's `agents` array by the Transitions endpoint. Use the `agents.name` filter to find the journeys an agent handled, and the `transitions.agents.name` filter to find every journey an agent was involved in.

#### Contact Object

```json
{
  "name": "string",
  "phoneNumber": "string",
  "email": "string"
}
```

#### Queue Object

```json
{
  "id": "string",
  "name": "string",
  "extension": "string",
  "site": {
    "id": "string",
    "name": "string"
  }
}
```

| Field       | Type   | Description                                                                                                                                                                                     |
|-------------|--------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`        | string | Unique identifier of the queue                                                                                                                                                                  |
| `name`      | string | Display name of the queue. `null` for a Contact Center queue callback that is still pending, and populated once the callback interaction reports.                                             |
| `extension` | string | Queue extension number. **Note:** Contact Center queues do not have extensions, so this field is `null` for Contact Center queues. Only Unified Communications queues have extension values. |
| `site`      | Site   | Site (branch/office) the queue belongs to.                                                                                                                                                      |

#### RingGroup Object

```json
{
  "id": "string",
  "name": "string",
  "extension": "string",
  "site": {
    "id": "string",
    "name": "string"
  }
}
```

| Field       | Type   | Description                                     |
|-------------|--------|-------------------------------------------------|
| `id`        | string | Unique identifier of the ring group             |
| `name`      | string | Display name of the ring group                  |
| `extension` | string | Ring group extension number                     |
| `site`      | Site   | Site (branch/office) the ring group belongs to. |

#### Site Object

The Site object identifies the physical site (branch/office) associated with a user or a Unified Communications service. The Site is exposed wherever those entities appear in the API:

- on `agents[].site` (journey response), the site of the agent or user that handled the journey
- on `queues[].site` and `ringGroups[].site` (journey response), the site of the queue or ring group
- on `origin.site` (journey response), the site of the user that initiated the journey
- on `transitions[].agents[].site` and `transitions[].previousAgents[].site` (transition response), the site of the agent or user at each state change
- on `transitions[].queue.site`, `transitions[].previousQueue.site`, `transitions[].ringGroup.site`, `transitions[].previousRingGroup.site` (transition response)
- on `entryPoint.site` when the entry point's `type` is `call-queue`, `ring-group`, or `auto-attendant`

In all locations the field is `null` when the underlying entity has no site assigned. Filters are available on every `*.site.id` and `*.site.name` path. See [Journey Filters](#journey-filters) and [Transition Filters](#transition-filters).

```json
{
  "id": "string",
  "name": "string"
}
```

| Field  | Type   | Description                   |
|--------|--------|-------------------------------|
| `id`   | string | Unique identifier of the site |
| `name` | string | Display name of the site      |

#### OutboundPhoneCode Object

The outboundPhoneCodes field is populated only for Contact Center agent-initiated outbound interactions.

```json
{
  "listName": "string",
  "name": "string",
  "shortCode": "string"
}
```

| Field       | Description                                             |
|-------------|---------------------------------------------------------|
| `name`      | Menu text of the outbound phone code in Contact Manager |
| `shortCode` | Short code identifier of the outbound phone code        |
| `listName`  | Name of the outbound phone code list                    |

#### Schedule Object

A schedule node a journey was evaluated against in a Contact Center script. `schedules` is always an array on the journey, empty when the journey was evaluated against no schedule node.

```json
{
  "id": 107,
  "tag": "Ferie",
  "tenantId": "cexpbx01",
  "result": "open"
}
```

| Field      | Type   | Description                                                                                      |
|------------|--------|--------------------------------------------------------------------------------------------------|
| `id`       | int64  | Unique identifier of the schedule                                                                |
| `tag`      | string | Tag of the schedule node (IVR object tag). May be `null`.                                        |
| `tenantId` | string | Tenant identifier the schedule belongs to                                                        |
| `result`   | string | Customer-facing evaluation result: `"open"`, `"closed"`, or `"1"`–`"6"` (a selected choice path) |

#### entryPoint Object

The entryPoint object is populated only for inbound journeys and identifies where the interaction first enters the organization (e.g. a contact center channel, or a unified communication ring group).

```json
{
  "type": "string",
  "id": "string",
  "name": "string",
  "phoneNumber": "string",
  "extension": "string",
  "email": "string",
  "loginId": "string",
  "department": "string",
  "pbx": "string",
  "tenantId": "string",
  "site": {
    "id": "string",
    "name": "string"
  }
}
```

| Field         | Type   | Description                                                                                                                            |
|---------------|--------|----------------------------------------------------------------------------------------------------------------------------------------|
| `type`        | string | Entry point type. See **entryPoint Type Values** below.                                                                                |
| `id`          | string | Unique identifier of the entry point                                                                                                   |
| `name`        | string | Display name of the entry point                                                                                                        |
| `phoneNumber` | string | Phone number associated with the entry point                                                                                           |
| `extension`   | string | Extension associated with the entry point                                                                                              |
| `email`       | string | Email of the entry point. Only populated for USER-type. May be `null`.                                                     |
| `loginId`     | string | Login ID of the entry point. Only populated for USER-type. May be `null`.                                                              |
| `department`  | string | Department of the entry point. Only populated for USER-type. May be `null` or an empty string.                                                            |
| `pbx`         | string | PBX identifier                                                                                                                         |
| `tenantId`    | string | Tenant identifier                                                                                                                      |
| `site`        | Site   | Site associated with the entry point. Only populated when `type` is `call-queue`, `ring-group`, or `auto-attendant`; `null` otherwise. |

**entryPoint Type Values:**

The `type` field in the entryPoint object is an enum that identifies the type of entry point. It can have one of the following values:

- **cc-channel**: The inbound interaction enters through a contact center channel (e.g. Customer Support, Sales Queue, Email Support, etc.)
- **call-queue**: The inbound interaction enters through a unified communication call queue
- **ring-group**: The inbound interaction enters through a ring group
- **auto-attendant**: The inbound interaction enters through a unified communication auto-attendant
- **user**: The inbound interaction targets a unified communication user directly, bypassing contact center channels. Entry points of this type include additional user details (`email`, `loginId`, `department`) reflecting current Admin Console configuration
- **ai-studio**: The inbound interaction enters through an AI Studio deploy surface (the customer dialed a number answered by AI Studio). `id` and `phoneNumber` are both the dialed number, mirroring `cc-channel`; `name` is the AI Studio deployment label once AI Studio forwards it (null until then). The answering AI agent is reported in `agents` (type `AI`), not on the entry point

#### origin Object

The origin object identifies the 8x8 user who initiated the journey. It is populated for user-initiated journeys and is `null` for inbound and internal journeys.

```json
{
  "type": "user",
  "id": "string",
  "name": "string",
  "phoneNumber": "string",
  "extension": "string",
  "email": "string",
  "loginId": "string",
  "department": "string",
  "pbx": "string",
  "site": {
    "id": "string",
    "name": "string"
  }
}
```

| Field         | Type   | Description                                                                                                                 |
|---------------|--------|-----------------------------------------------------------------------------------------------------------------------------|
| `type`        | string | Origin type. Currently only `user`, the 8x8 user who initiated the journey.                                                 |
| `id`          | string | Unique identifier of the origin user                                                                                        |
| `name`        | string | Display name of the origin user                                                                                             |
| `phoneNumber` | string | Phone number associated with the origin user                                                                                |
| `extension`   | string | Extension associated with the origin user                                                                                   |
| `email`       | string | Email address of the origin user. May be `null` if user data enrichment is unavailable or disabled.                         |
| `loginId`     | string | Login ID of the origin user. May be `null` if user data enrichment is unavailable or disabled.                              |
| `department`  | string | Department of the origin user. May be `null` or an empty string when no department is set or user data enrichment is unavailable.                            |
| `pbx`         | string | PBX identifier                                                                                                              |
| `site`        | Site   | Site (branch/office) the origin user belongs to. May be `null` if the user has no site assigned. See [Site Object](#site-object). |

#### AiAgentInformation Object

AI Studio usage aggregated over the whole journey. The property is **omitted** from the response for journeys with no AI Studio interaction, so treat its absence as "no AI involvement" rather than an error.

```json
{
  "creditConsumption": 1.93488,
  "toolsUsedSuccessfully": [
    {
      "name": "transferToExtension",
      "success": true
    }
  ]
}
```

| Field                   | Type        | Description                                                                                                                                                      |
|-------------------------|-------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `creditConsumption`     | number      | Total AI credits consumed across all AI Studio interactions in the journey. May be `null`.                                                                       |
| `toolsUsedSuccessfully` | ToolUsage\[] | Tools AI agents invoked during the journey, each with the result of that invocation. The property is omitted when no tool use was recorded, so treat an absent property and an empty array alike. See [ToolUsage Object](#toolusage-object).        |

#### ToolUsage Object

> ⚠️ Despite the name of the array that holds them, entries are **not** guaranteed to be successful invocations. Each carries its own `success` flag, which may be `true` or `false`. Filter on the flag, not on the array name.

| Field     | Type    | Description                                                             |
|-----------|---------|-------------------------------------------------------------------------|
| `name`    | string  | Name of the tool the AI agent invoked                                   |
| `success` | boolean | `true` if the invocation succeeded, `false` if it failed                |

### Transition Data Model

The Transitions Endpoint provides detailed information about each state change within a journey, allowing users to track
the exact journey path. Journeys are identified with the *journeyId*. Each transition record includes:

| Field               | Type         | Description                                                                                                                               |
|---------------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `time`              | ISO8601 date | When the transition occurred                                                                                                              |
| `journeyId`         | string       | ID of the parent journey                                                                                                                  |
| `name`              | string       | Name of the transition (e.g., WAITING, TALKING, TRANSFER)                                                                                 |
| `interactionId`     | string       | ID of the interaction                                                                                                                     |
| `agents`            | Agent\[]     | Array of agent objects (if applicable)                                                                                                    |
| `previousAgents`    | Agent\[]     | Array of previous agent objects (if applicable)                                                                                           |
| `previousQueue`     | Queue        | Previous queue object (if applicable)                                                                                                     |
| `previousRingGroup` | RingGroup    | Previous ring group object (if applicable)                                                                                                |
| `queue`             | Queue        | Queue object (if applicable)                                                                                                              |
| `ringGroup`         | RingGroup    | Ring group object (if applicable)                                                                                                         |
| `autoAttendant`     | AutoAttendant| Auto attendant associated with the transition (if applicable). See [AutoAttendant Object](#autoattendant-object).                                        |
| `duration`          | long         | Duration of this specific transition state in milliseconds                                                                                |
| `externalNumber`    | string       | External number (if applicable)                                                                                                           |
| `channel`           | Channel      | Contact Center channel the interaction was routed to, on `FORWARD` and `TRANSFER` transitions. `null` on every other transition. See [Channel Object](#channel-object). |
| `scripts`           | Script\[]    | Ordered list of Contact Center IVR scripts visited by the interaction. Populated only on `IN_SCRIPT` transitions. See [Script Object](#script-object). |
| `mediaType`         | string       | Media type (phone, chat, email, etc.)                                                                                                     |

#### AutoAttendant Object

The AutoAttendant object identifies a Unified Communications auto attendant involved in a transition. On `FORWARD` and `TRANSFER` transitions it is the auto attendant the interaction is routed to. On `IN_SCRIPT` transitions it is the auto attendant whose script is running. There is no `previousAutoAttendant`.

```json
{
  "id": "string",
  "name": "string",
  "extension": "string",
  "site": {
    "id": "string",
    "name": "string"
  }
}
```

| Field       | Type   | Description                                         |
|-------------|--------|-----------------------------------------------------|
| `id`        | string | Unique identifier of the auto attendant             |
| `name`      | string | Display name of the auto attendant                  |
| `extension` | string | Auto attendant extension number                     |
| `site`      | Site   | Site (branch/office) the auto attendant belongs to. |

#### Channel Object

The Channel object identifies a Contact Center channel an interaction was routed to. It is populated on `FORWARD` and `TRANSFER` transitions whose destination is a Contact Center channel, and is `null` on every other transition. When present, all three fields are populated.

```json
{
  "id": "string",
  "name": "string",
  "tenantId": "string"
}
```

| Field      | Type   | Description                              |
|------------|--------|------------------------------------------|
| `id`       | string | Unique identifier of the channel         |
| `name`     | string | Display name of the channel              |
| `tenantId` | string | Tenant identifier the channel belongs to |

#### Script Object

The Script object identifies a Contact Center IVR script the interaction visited. It is populated on `IN_SCRIPT` transitions. On every other transition state the `scripts` array is empty (`[]`), never `null`.

```json
{
  "id": 541,
  "name": "example_script_name",
  "tenantId": "cexpbx01"
}
```

| Field      | Type    | Description                             |
|------------|---------|-----------------------------------------|
| `id`       | integer | Unique identifier of the script (int64) |
| `name`     | string  | Display name of the script              |
| `tenantId` | string  | Tenant identifier the script belongs to |

### Transition States

A journey can progress through multiple transition states:

- **STARTED**: An interaction with a customer has started. Information about the customer is included in the `contact` object of the journey.
- **OUTBOUND_STARTED**: An outbound interaction initiated by an 8x8 user has started. The `duration` captures the time from initiation until the customer answers (transition to `TALKING`) or the call is abandoned or disconnected (transition to `FINISHED`). It is also used for each dial attempt of a Contact Center queue callback, where it starts when the agent accepts the offered callback and carries the accepting agent in `agents` and the callback queue in `queue`. See [Contact Center Queue Callback Tracking](#5-contact-center-queue-callback-tracking).
- **IN_SCRIPT**: The customer is interacting with an automated script. For a Contact Center IVR script the scripts visited are listed in `scripts`. For a Unified Communications auto attendant the auto attendant is reported in `autoAttendant`.
- **WAITING**: The customer is waiting to be handled by an agent. When they are waiting in a queue the queue is reported in `queue`, when a ring group is ringing the ring group is reported in `ringGroup`, and when specific agents are being rung those agents are listed in `agents`.
- **TALKING**: An agent is talking to the customer. The agent is listed in `agents`.
- **HOLD**: An agent has put the interaction on hold, for example while preparing a transfer. The agent who placed the hold is listed in `agents`.
- **FORWARD**: The system routes the interaction to another destination. The destination can be an agent, listed in `agents`; a queue, in `queue`; a ring group, in `ringGroup`; a Contact Center channel, in `channel`; an auto attendant, in `autoAttendant`; or an external phone number, in `externalNumber`. The `previousAgents`, `previousQueue` and `previousRingGroup` properties describe where the interaction was forwarded from.
- **TRANSFER**: An agent handling the customer transfers the interaction to another destination. The destination can be another agent, listed in `agents`; a queue, in `queue`; a ring group, in `ringGroup`; a Contact Center channel, in `channel`; an auto attendant, in `autoAttendant`; or an external phone number, in `externalNumber`. The `previousAgents`, `previousQueue` and `previousRingGroup` properties describe where the interaction was transferred from.
- **VOICEMAIL**: The interaction was not answered and reached a mailbox. For a direct-to-user mailbox the dialed user is listed in `agents` when the mailbox owner can be identified, and `agents` is empty otherwise. For a ring group or call queue mailbox no individual agent is listed, and the group is identified by the transition's `ringGroup` or `queue`, so a member who did not answer is not recorded as having taken the voicemail.
- **FOLLOWUP_PENDING**: A follow-up item is waiting on a queue, either a recorded Contact Center voicemail waiting to be processed or a Contact Center queue callback waiting for an available agent. The queue is reported in `queue` and `duration` is how long it waited. A callback emits one of these per wait, the initial one plus one after every unanswered attempt, while a voicemail emits exactly one. See [Contact Center Voicemail Follow-Up Tracking](#4-contact-center-voicemail-follow-up-tracking) and [Contact Center Queue Callback Tracking](#5-contact-center-queue-callback-tracking).
- **PROCESSING**: An agent processed the customer's voicemail offline, wrap-up included. The agent is listed in `agents`. See [Contact Center Voicemail Follow-Up Tracking](#4-contact-center-voicemail-follow-up-tracking).
- **FINISHED**: The customer journey has ended.

## Error Handling

The API returns standard HTTP status codes and an error response body:

```json
{
  "errors": [
    {
      "errorCode": "malformedRequest",
      "message": "Error message description",
      "suggestion": "Suggested action to resolve the error",
      "url": "https://docs.8x8.com/error/malformedRequest"
    }
  ]
}
```

Branch on `errorCode`, never on `message`. It is the machine-readable identifier of the error, and
its values are the ones listed under [Error Codes](#error-codes) below. The `message` and
`suggestion` fields are human-facing text and may be reworded at any time. `errorCode` is omitted
from responses that have no specific code, such as a generic server error.

### Common Errors

| HTTP Status Code | Description                               |
|------------------|-------------------------------------------|
| 400              | Bad Request - Invalid input parameters    |
| 401              | Unauthorized - Invalid or missing API key |
| 403              | Forbidden - Insufficient permissions      |
| 404              | Not Found - Resource not found            |
| 429              | Too Many Requests - Rate limit exceeded   |
| 500              | Internal Server Error - Server-side error |

## Error Codes

This section provides detailed explanations for each error code that the API might return. Each error header is linkable
via its anchor for easy navigation within the documentation.

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

This error occurs when the sort direction is not exactly `ASC` or `DESC`. The values are case-sensitive, so `asc` and `desc` are
rejected.

### Invalid Sort Field {#invalidSortField}

This error is returned when the sort field specified is not supported. At the moment, only the `TIME` field is available
for sorting results.

### Invalid Limit {#invalidLimit}

This error indicates that the limit parameter is out of the acceptable range. The limit must be between 1 and 1000.
Users should adjust the limit to a valid number within the allowed range.

### Invalid Cursor {#invalidCursor}

This error is raised when the pagination cursor provided in the request is invalid. The cursor must be the one returned
from a previous valid request.

### Cursor And Sort Mismatch {#cursorAndSortMismatch}

This error indicates that the sort field or direction associated with the provided cursor does not match the current
request parameters. Ensure that the cursor is used with the same sort settings as those in the original response.

### Invalid Endpoint {#invalidApiPath}

This error occurs when the requested API endpoint does not exist or is not recognized by the API.

Please verify the endpoint against the valid paths listed in the `API Endpoints` section above.

### Invalid Request Method {#invalidRequestMethod}

This error is returned when the HTTP method used in the request does not match the expected method for the endpoint.

Please ensure you are using the correct HTTP method (e.g., POST) as specified in the `API Endpoints` section above.

## Rate Limiting

The API implements rate limiting to protect system resources.
By default up to 10 hits are allowed within a 60 seconds sliding window. When rate limits are exceeded, the API returns a 429 status code with a Retry-After header indicating when you can try again.

## Use Cases

### 1. End-to-End Customer Journey Analysis

For organizations with complex call flows that span multiple platforms (such as transferred calls between contact center
agents and back-office teams), this API provides a complete view of the customer journey.

#### Implementation Steps

1. Retrieve journey data:

```http
POST /v1/journeys/search
```

```json
{
  "dateRange": {
    "start": "2025-05-19T08:00:00+03:00",
    "end": "2025-05-19T23:00:00+03:00"
  },
  "filters": [
    {
      "name": "pbxNames",
      "values": [
        "mainPbx"
      ]
    }
  ],
  "displayTimezone": "Europe/Paris",
  "limit": 50
}
```

2. For detailed journey analysis, retrieve transition data using the journeyId from the journeys response:

```http
POST /v1/transitions/search
```

```json
{
  "dateRange": {
    "start": "2025-05-19T08:00:00+03:00",
    "end": "2025-05-19T23:00:00+03:00"
  },
  "filters": [
    {
      "name": "journeyId",
      "values": [
        "journey-123"
      ]
    }
  ],
  "displayTimezone": "Europe/Paris",
  "sortDirection": "ASC"
}
```

### 2. Transfer Pattern Analysis

For organizations that want to understand how calls are being transferred between systems and analyze transfer patterns.

#### Implementation Steps

1. Retrieve all transfer transitions:

```http
POST /v1/transitions/search
```

```json
{
  "dateRange": {
    "start": "2025-05-19T00:00:00+03:00",
    "end": "2025-05-19T23:59:59+03:00"
  },
  "filters": [
    {
      "name": "transitions.name",
      "values": [
        "TRANSFER"
      ]
    }
  ],
  "displayTimezone": "Europe/Paris",
  "limit": 100
}
```

### 3. Queue Performance Analysis

For analyzing queue performance across different platforms.

#### Implementation Steps

1. Retrieve journey data filtered by queues:

```http
POST /v1/journeys/search
```

```json
{
  "dateRange": {
    "start": "2025-05-19T00:00:00+03:00",
    "end": "2025-05-19T23:59:59+03:00"
  },
  "filters": [
    {
      "name": "queues.name",
      "values": [
        "support",
        "sales",
        "technical"
      ]
    }
  ],
  "displayTimezone": "Europe/Paris",
  "limit": 100
}
```

### 4. Contact Center Voicemail Follow-Up Tracking

Use this to understand what happened to Contact Center voicemails after the customer recorded them:
how long messages waited, who dealt with them, and which are still outstanding.

A Contact Center voicemail lives on as a voicemail interaction on a voicemail queue, sharing the
journey's id. Two transition states cover that period:

| State | Meaning | Always carries |
|---|---|---|
| `FOLLOWUP_PENDING` | The recorded message is waiting on a voicemail queue. Its `duration` is how long the message waited for someone to deal with it | `queue` (the voicemail queue) |
| `PROCESSING` | An agent processed the voicemail offline, wrap-up included | `agents` (the processing agent), `queue` |

Typical readings of the timeline:

- `… → VOICEMAIL → FOLLOWUP_PENDING → PROCESSING → FINISHED`, an agent processed the message
- `… → VOICEMAIL → FOLLOWUP_PENDING → FINISHED`, it expired before anyone processed it
- `… → VOICEMAIL → FINISHED`, it was delivered as email before reaching the queue, so neither state appears

This applies to Contact Center voicemails only. Unified Communications voicemails, whether to a user,
auto attendant, ring group or call queue, end at the voicemail attempt.

#### Implementation Steps

1. Retrieve the voicemail follow-up timeline, including wait and handling durations:

```http
POST /v1/transitions/search
```

```json
{
  "dateRange": {
    "start": "2025-05-19T00:00:00+03:00",
    "end": "2025-05-19T23:59:59+03:00"
  },
  "filters": [
    {
      "name": "transitions.name",
      "values": [
        "FOLLOWUP_PENDING",
        "PROCESSING"
      ]
    }
  ],
  "displayTimezone": "Europe/Paris",
  "limit": 100
}
```

2. Find which journeys a given agent processed a voicemail for, by combining the state with the
   agent. The state is what makes this different from ordinary talk time, since the agent filter
   alone would also match live conversations:

```json
{
  "dateRange": {
    "start": "2025-05-19T00:00:00+03:00",
    "end": "2025-05-19T23:59:59+03:00"
  },
  "filters": [
    { "name": "transitions.name", "values": ["PROCESSING"] },
    { "name": "transitions.agents.name", "values": ["Jane Smith"] }
  ],
  "displayTimezone": "Europe/Paris",
  "limit": 100
}
```

3. At journey level, the voicemail queue and the processing agent are rolled up into the journey's
   `queues[]` and `agents[]`, so the ordinary journey filters find them. Using `queues.name` with
   the voicemail queue returns both processed and still-pending voicemail journeys. This is specific to voicemail, whose queue is reported in full from the moment the message enters it; a callback that is still waiting rolls up nothing, as described in the callback section:

```http
POST /v1/journeys/search
```

```json
{
  "dateRange": {
    "start": "2025-05-19T00:00:00+03:00",
    "end": "2025-05-19T23:59:59+03:00"
  },
  "filters": [
    { "name": "queues.name", "values": ["voicemail-support"] }
  ],
  "displayTimezone": "Europe/Paris",
  "limit": 100
}
```

**What to expect when consuming these journeys:**

- **Journeys still awaiting processing are in progress**, so `finishedTime` is `null`, possibly for
  days. Filtering and sorting use `time` (the journey start), so such a journey is found by the day
  the customer called, not by when the voicemail was processed.
- **The outcome follows the same rules as any other journey.** An agent processing the voicemail
  resolves the journey to `Handled`, while expiry and email delivery keep `Voicemail`.
- **A journey can be `Handled` and still contain a `VOICEMAIL` transition.** This happens two ways:
  an agent processed the recorded message, which the timeline shows as
  `VOICEMAIL → FOLLOWUP_PENDING → PROCESSING`; or an agent talked to the customer and then
  transferred the interaction to a destination that ended in voicemail, where that first agent had
  already handled the journey. In both cases the outcome is `Handled` and the `VOICEMAIL` transition
  stays on the timeline.

### 5. Contact Center Queue Callback Tracking

Use this to understand what happened after a Contact Center customer chose a callback instead of
waiting in a queue: how long the callback waited, how many times it was dialed, whether the customer
was ever reached, and which callbacks are still outstanding.

The callback is a separate Contact Center interaction that shares the journey's id, so the journey
stays open for the whole life of the callback, across every retry, and ends when the callback ends.
The callback reuses the transition states introduced for voicemail follow-up, so no additional state is introduced:

| State | Meaning on a callback | Always carries |
|---|---|---|
| `FOLLOWUP_PENDING` | The callback is waiting on the callback (outbound) queue for an available agent. One per wait: the initial one plus one after every unanswered attempt | `queue` (the callback queue), `duration` (the wait before that attempt) |
| `OUTBOUND_STARTED` | One dial attempt, from the agent accepting the callback until the customer answers or the dial ends unanswered | `queue`, `agents` (the accepting agent, named here even on an unanswered dial, unlike the journey `agents` array) |
| `TALKING` | The customer answered and the agent is talking to them, until hang-up. Excludes wrap-up, like every other `TALKING` | `agents` (the answering agent) |

Readings:

```text
… WAITING → FOLLOWUP_PENDING → OUTBOUND_STARTED → TALKING → FINISHED       the customer was reached
… WAITING → FOLLOWUP_PENDING → OUTBOUND_STARTED → FOLLOWUP_PENDING
                             → OUTBOUND_STARTED → FINISHED                 retried, never answered
… WAITING → FOLLOWUP_PENDING → FINISHED                                    expired, never dialed
… WAITING → FOLLOWUP_PENDING                                               still pending, journey open
```

The journey `outcome` summarizes the result: `Handled` if an agent talked to the customer at any
point, `CallbackNoAnswer` if the callback was dialed but never answered before expiring,
`CallbackExpired` if it expired without a single dial attempt, and `CallbackRequested` while the
journey is still active and waiting for its callback.

This applies to Contact Center queue callbacks. Post-call-survey callbacks and standalone or inbound
web callbacks are unaffected and behave as before.

#### Implementation Steps

1. Retrieve the callback timeline, including every wait and every dial attempt. Combine the state with
   the callback queue by id, since `FOLLOWUP_PENDING` on its own also matches Contact Center voicemail
   follow-ups, which share the state. Filter on `transitions.queue.id` rather than the name, because a still-pending callback reports the queue id with a `null` name:

```http
POST /v1/transitions/search
```

```json
{
  "dateRange": {
    "start": "2025-05-19T00:00:00+03:00",
    "end": "2025-05-19T23:59:59+03:00"
  },
  "filters": [
    { "name": "transitions.name", "values": ["FOLLOWUP_PENDING", "OUTBOUND_STARTED", "TALKING"] },
    { "name": "transitions.queue.id", "values": ["queue-callback-123"] }
  ],
  "displayTimezone": "Europe/Paris",
  "limit": 100
}
```

2. Find the callbacks that were never answered, and those that expired without anyone attempting them:

```http
POST /v1/journeys/search
```

```json
{
  "dateRange": {
    "start": "2025-05-19T00:00:00+03:00",
    "end": "2025-05-19T23:59:59+03:00"
  },
  "filters": [
    { "name": "outcome", "values": ["CallbackNoAnswer", "CallbackExpired"] }
  ],
  "displayTimezone": "Europe/Paris",
  "limit": 100
}
```

3. List the callbacks still outstanding, which are the journeys that are still in progress and carry
   the `CallbackRequested` outcome:

```json
{
  "dateRange": {
    "start": "2025-05-19T00:00:00+03:00",
    "end": "2025-05-19T23:59:59+03:00"
  },
  "filters": [
    { "name": "outcome", "values": ["CallbackRequested"] }
  ],
  "displayTimezone": "Europe/Paris",
  "limit": 100
}
```

**What to expect when consuming these journeys:**

- **An outstanding callback journey is in progress and carries `CallbackRequested`.** That value is
  set only when no agent talked to the customer before the callback was requested; if one had, the
  journey is already `Handled` and stays that way. `finishedTime` is `null` while the callback is
  outstanding, and the outcome changes to `Handled`, `CallbackNoAnswer` or `CallbackExpired` once it
  resolves. Filtering and sorting use `time` (the journey start), so the journey is found by the day
  the customer called in, not by when the callback resolved.
- **A callback that reached the customer is `Handled`.** There is no `CallbackHandled` value, so a
  filter built only from the three `Callback*` values returns the callbacks that never reached the
  customer, not all of them.
- **At journey level the callback queue and the answering agent are rolled up** into the journey's
  `queues[]` and `agents[]` once the callback has been picked up, so `queues.name` with the callback
  queue, or `agents.name`, finds callback journeys. A callback that is still waiting is the
  exception: its queue is not rolled up yet, because the pending wait is synthesized from the originating leg before the callback interaction has reported anything. That is also why the queue carries no name. Listing journeys waiting on a callback queue therefore requires
  the transition-level `transitions.queue.id` filter, and the id rather than the name, because a
  still-pending callback's `queue` carries the id with a `null` name.
- **An unanswered callback has no journey `agents`, but it does have `queues`.** When every dial attempt goes unanswered (`CallbackNoAnswer`), the dialing agent never spoke to the customer and so is not listed at journey level, while the callback queue still is. Such a journey is not returned by an `agents.name` filter; find it with `queues.name` or `transitions.agents.name`.
- **`OUTBOUND_STARTED` is not exclusive to callbacks.** It has always been emitted for ordinary
  outbound calls, so filtering on it alone will also return those.

## Best Practices

1. **Use appropriate date ranges**: The maximum allowed timerange is 60 days. For best performance, keep each
   request to 1 day or less and break longer analysis into consecutive requests of that size.

2. **Apply relevant filters**: Use filters to narrow down results and improve response times.

3. **Handle pagination properly**: Always check for the `nextPageCursor` and fetch all pages when needed.

4. **Respect rate limits**: Implement appropriate retry mechanisms with backoff when encountering rate limiting.

5. **Cache results when appropriate**: For frequently accessed data that doesn't change often, consider caching on your
   side.

6. **Handle errors gracefully**: Check for error responses and retry with backoff for transient errors.

## API Glossary

### Time Representations

All times in the API are represented in ISO 8601 format with timezone designator (e.g., `2025-03-01T00:00:00Z`).
The displayTimezone specified in your request is only used for displaying purposes.

### Duration Metrics

All duration metrics (handling time, wait time, etc.) are provided in milliseconds.

### Media Types

- **Phone**: Phone interactions
- **Chat**: Chat interactions
- **Email**: Email interactions

### Interaction Direction

- **Inbound**: Customer-initiated interactions
- **Outbound**: Interactions initiated by an 8x8 user
- **Internal**: Interactions between 8x8 users of your organization

### PBX and Tenant IDs

PBX names and tenant IDs are used for filtering and represent the 8x8 platform instances your organization uses.

## Further Assistance

For additional support or questions about the Journey API, please contact your 8x8 representative or submit a
support ticket through the 8x8 support portal.
