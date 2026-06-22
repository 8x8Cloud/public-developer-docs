# Customer 360

## Overview

The Customer 360 API provides unified access to a customer's interaction history and insights across all 8x8 contact center channels.

Given a customer identity — email address, phone number, contact ID, or account ID — the API returns a list of interactions along with aggregated sentiment analysis and topic insights derived from those interactions.

## Base URLs

The API is available in four regions. Use the base URL corresponding to the region where your tenant is provisioned:

* Phoenix (US): `https://api.8x8.com/cidp-customer-360/us`
* London (UK): `https://api.8x8.com/cidp-customer-360/uk`
* Toronto (Canada): `https://api.8x8.com/cidp-customer-360/ca`
* Sydney (Australia): `https://api.8x8.com/cidp-customer-360/ap`

The Customer 360 API supports the following endpoints:

* **GET** `/v1/public/tenants/{tenantId}/interactions-insight` — Retrieve interaction insights
* **GET** `/v1/public/tenants/{tenantId}/transcript-summaries` — Retrieve transcript summaries

### 1. Get Interaction Insights

This GET method retrieves interaction history and aggregated insights for a specific customer identity within an optional time range.

#### Headers

| Name      | Required | Description                                                                                      | Example                       |
| --------- | -------- | ------------------------------------------------------------------------------------------------ | ----------------------------- |
| x-api-key | ✓        | API key from the [8x8 Admin Console](/analytics/docs/how-to-get-api-keys) | eght_Abcdhfakdlbdfsjkbskzkmxl |

#### Path Parameters

| Name     | Required | Description                                            | Example              |
| -------- | -------- | ------------------------------------------------------ | -------------------- |
| tenantId | ✓        | The tenant identifier. Must belong to your customer account. | acvcc1652172111112801 |

#### Search Strategies

You must provide exactly one identity field per request. The supported search strategies are:

| Strategy    | Required Fields       | Optional Fields | Forbidden Fields |
| ----------- | --------------------- | --------------- | ---------------- |
| Contact ID  | `contactId`, `crmId`  | —               | —                |
| Account ID  | `accountId`           | `crmId`         | —                |
| Email       | `email`               | —               | `crmId`          |
| Phone Number| `phoneNumber`         | —               | `crmId`          |

Only the native CRM is supported. Set `crmId` to `native`.

#### Query Parameters

| Name        | Required | Description                                                                                          | Example                      |
| ----------- | -------- | ---------------------------------------------------------------------------------------------------- | ---------------------------- |
| email       | ☐        | Customer email address. Cannot be used with `crmId`.                                                 | `customer@example.com`       |
| phoneNumber | ☐        | Customer phone number in E.164 format. Cannot be used with `crmId`.                                  | +12065551234                 |
| contactId   | ☐        | Contact identifier. Must be provided together with `crmId`.                                          | contact-123                  |
| accountId   | ☐        | Account identifier. `crmId` is optional when using this field.                                       | account-456                  |
| crmId       | ☐        | CRM identifier. Required with `contactId`, optional with `accountId`, forbidden with email/phone. Only the native CRM is supported. | native |
| startTime   | ☐        | Start of the time range in ISO-8601 format with timezone. Defaults to 1 year before `endTime`.       | 2025-01-01T00:00:00-05:00    |
| endTime     | ☐        | End of the time range in ISO-8601 format with timezone. Defaults to current time.                    | 2025-08-01T00:00:00-05:00    |

#### Full Request Example

```bash
curl --location 'https://api.8x8.com/cidp-customer-360/us/v1/public/tenants/acvcc1652172111112801/interactions-insight?email=customer%40example.com' \
--header 'x-api-key: eght_Abcdhfakdlbdfsjkbskzkmxl'
```

#### Response

```json
{
  "interactions": [
    {
      "interactionId": "int-abc123",
      "mediaIdentifier": "customer@example.com",
      "mediaType": "EMAIL",
      "direction": "INBOUND",
      "productType": "CC",
      "startedAt": 1724400000000,
      "endedAt": 1724403600000,
      "sentiment": "POSITIVE",
      "topics": [
        { "topic": "billing", "matches": 2 }
      ],
      "wrapUpCodes": ["resolved"],
      "queueName": "Support Queue",
      "outcomeLabel": "Resolved",
      "interactionLabels": ["vip"],
      "emailSubject": "Billing inquiry",
      "signals": []
    },
    {
      "interactionId": "int-def456",
      "mediaIdentifier": "customer@example.com",
      "mediaType": "CHAT",
      "chatType": "WebChat",
      "direction": "INBOUND",
      "productType": "CC",
      "startedAt": 1724500000000,
      "endedAt": 1724503600000,
      "sentiment": "NEUTRAL",
      "topics": [],
      "wrapUpCodes": ["happy"],
      "queueName": "inbound chat",
      "outcomeLabel": "Handled",
      "interactionLabels": ["Queued", "Handled"],
      "title": "Account upgrade request",
      "signals": []
    }
  ],
  "insights": {
    "aggregatedSentiments": {
      "totalInteractions": 2,
      "aggregatedSentiment": {
        "aggregatedCustomerSentiment": "POSITIVE",
        "aggregatedAgentSentiment": "NEUTRAL",
        "aggregatedOverallSentiment": "POSITIVE"
      }
    },
    "aggregatedTopics": {
      "totalInteractions": 1,
      "topicFrequency": [
        {
          "topicName": "billing",
          "categoryName": "Finance",
          "interactionsMatchedCount": 1,
          "percentageMatched": 50.0
        }
      ]
    }
  }
}
```

> 📘 **Maximum interactions**
>
> The API returns a maximum of 50 interactions per request within the specified time range.

#### Response Body Fields

**interactions**

| Field              | Description                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| `interactionId`    | Unique identifier for the interaction.                                                              |
| `contactId`        | CRM contact identifier associated with the interaction.                                             |
| `mediaIdentifier`  | The customer email or phone number used in this interaction.                                        |
| `mediaType`        | Channel type: `PHONE`, `EMAIL`, `CHAT`, or `VOICEMAIL`.                                             |
| `chatType`         | Sub-type for chat interactions, e.g. `WHATSAPP`.                                                    |
| `direction`        | Direction of the interaction: `INBOUND` or `OUTBOUND`.                                              |
| `productType`      | 8x8 product that handled the interaction: `CC` (Contact Center), `UC` (Unified Communications), or `ENGAGE`. |
| `startedAt`        | Interaction start time as Unix epoch milliseconds.                                                  |
| `endedAt`          | Interaction end time as Unix epoch milliseconds.                                                    |
| `sentiment`        | Overall sentiment for this interaction: `POSITIVE`, `NEUTRAL`, or `NEGATIVE`.                      |
| `topics`           | Topics detected in the interaction. See **topics** table below.                                     |
| `wrapUpCodes`      | Agent wrap-up codes applied at the end of the interaction.                                          |
| `queueName`        | Name of the queue that handled the interaction.                                                     |
| `outcomeLabel`     | Outcome label assigned to the interaction.                                                          |
| `interactionLabels`| Labels applied to the interaction.                                                                  |
| `title`            | AI-generated title summarizing the interaction (when available).                                     |
| `emailSubject`     | Subject line of the email (present for `EMAIL` interactions only).                                  |
| `departmentName`   | Name of the department that handled the interaction. Reserved for future use.                        |
| `signals`          | Detected signals from the interaction. Reserved for future use; currently returns an empty list.     |

**topics**

| Field     | Description                                              |
| --------- | -------------------------------------------------------- |
| `topic`   | Name of the detected topic.                              |
| `matches` | Number of times this topic was detected in the interaction. |

**insights.aggregatedSentiments**

| Field                        | Description                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| `totalInteractions`          | Number of interactions included in the sentiment aggregation.                                   |
| `aggregatedSentiment`        | Object containing the aggregated sentiment breakdown. See **aggregatedSentiment** table below.  |

**insights.aggregatedSentiments.aggregatedSentiment**

| Field                        | Description                                                    |
| ---------------------------- | -------------------------------------------------------------- |
| `aggregatedCustomerSentiment`| Overall customer sentiment: `POSITIVE`, `NEUTRAL`, or `NEGATIVE`. |
| `aggregatedAgentSentiment`   | Overall agent sentiment: `POSITIVE`, `NEUTRAL`, or `NEGATIVE`.    |
| `aggregatedOverallSentiment` | Combined overall sentiment: `POSITIVE`, `NEUTRAL`, or `NEGATIVE`. |

**insights.aggregatedTopics**

| Field                        | Description                                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| `totalInteractions`          | Number of interactions included in the topic aggregation.                                       |
| `topicFrequency`             | List of topics with frequency data. See **topicFrequency** table below.                         |

**insights.aggregatedTopics.topicFrequency**

| Field                      | Description                                                         |
| -------------------------- | ------------------------------------------------------------------- |
| `topicName`                | Name of the topic.                                                  |
| `categoryName`             | Category the topic belongs to.                                      |
| `interactionsMatchedCount` | Number of interactions where this topic was detected.               |
| `percentageMatched`        | Percentage of total interactions where this topic was detected.     |

> 📘 **Speech Analytics data**
>
> `sentiment`, `topics`, and aggregated insights are only populated when the Speech Analytics license is enabled for the tenant.

---

### 2. Get Transcript Summaries

This GET method retrieves AI-generated transcript summaries for one or more interactions by their interaction IDs.

#### Headers

| Name      | Required | Description                                                                                      | Example                       |
| --------- | -------- | ------------------------------------------------------------------------------------------------ | ----------------------------- |
| x-api-key | ✓        | API key from the [8x8 Admin Console](/analytics/docs/how-to-get-api-keys) | eght_Abcdhfakdlbdfsjkbskzkmxl |

#### Path Parameters

| Name     | Required | Description                                            | Example              |
| -------- | -------- | ------------------------------------------------------ | -------------------- |
| tenantId | ✓        | The tenant identifier. Must belong to your customer account. | acvcc1652172111112801 |

#### Query Parameters

| Name          | Required | Description                                                                                          | Example     |
| ------------- | -------- | ---------------------------------------------------------------------------------------------------- | ----------- |
| interactionId | ✓        | One or more interaction IDs. Repeat the parameter for batch retrieval.                               | int-abc123  |

#### Full Request Example

Single interaction:

```bash
curl --location 'https://api.8x8.com/cidp-customer-360/us/v1/public/tenants/acvcc1652172111112801/transcript-summaries?interactionId=int-abc123' \
--header 'x-api-key: eght_Abcdhfakdlbdfsjkbskzkmxl'
```

Batch retrieval (multiple interaction IDs):

```bash
curl --location 'https://api.8x8.com/cidp-customer-360/us/v1/public/tenants/acvcc1652172111112801/transcript-summaries?interactionId=int-abc123&interactionId=int-def456' \
--header 'x-api-key: eght_Abcdhfakdlbdfsjkbskzkmxl'
```

#### Response

```json
{
  "summaries": [
    {
      "interactionId": "int-abc123",
      "summaryObjectId": "obj-xyz789",
      "content": {
        "id": "summary-001",
        "result": "Customer called about a billing discrepancy. Agent verified the charge and issued a credit. Customer confirmed satisfaction.",
        "status": "success",
        "type": "summary",
        "duration": 185.5
      },
      "metadata": {
        "createdAt": "2025-08-15T14:30:00",
        "sizeBytes": 512
      }
    }
  ],
  "partialFailures": [
    {
      "interactionId": "int-def456",
      "reason": "Summary not found"
    }
  ]
}
```

> 📘 **Maximum interaction IDs**
>
> The API accepts a maximum of 50 interaction IDs per request.

> 📘 **Partial failures**
>
> When some interaction IDs cannot be resolved, the API returns a 200 response with successfully retrieved summaries in `summaries` and unresolved IDs in `partialFailures`. Possible reasons: `Summary not found` (no summary exists for this interaction) or `Summary not available` (temporary retrieval failure).

#### Response Body Fields

**summaries**

| Field             | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `interactionId`   | Interaction identifier.                                  |
| `summaryObjectId` | Unique identifier of the summary object in storage.      |
| `content`         | The summary content. See **content** table below.        |
| `metadata`        | Metadata about the summary. See **metadata** table below.|

**content**

| Field      | Description                                                    |
| ---------- | -------------------------------------------------------------- |
| `id`       | Summary content identifier.                                    |
| `result`   | The AI-generated transcript summary text.                      |
| `status`   | Processing status of the summary (e.g. `success`).             |
| `type`     | Content type (e.g. `summary`).                                 |
| `duration` | Duration of the interaction in seconds.                        |

**metadata**

| Field       | Description                                    |
| ----------- | ---------------------------------------------- |
| `createdAt` | Timestamp when the summary was created.        |
| `sizeBytes` | Size of the summary content in bytes.          |

**partialFailures**

| Field           | Description                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------- |
| `interactionId` | Interaction identifier for which the summary could not be retrieved.                            |
| `reason`        | Reason the summary could not be retrieved: `Summary not found` or `Summary not available`.      |
