# CC Realtime Statistics

> 📘 **You will need a working API key to begin**
>
> [How to get API Keys](/analytics/docs/how-to-get-api-keys)
>
>

The base URL is region specific, based on the location of your Contact Center tenant.

* United States: `https://api.8x8.com/analytics/cc/{version}/realtime-metrics/`
* Europe: `https://api.8x8.com/eu/analytics/cc/{version}/realtime-metrics/`
* Asia-Pacific: `https://api.8x8.com/au/analytics/cc/{version}/realtime-metrics/`
* Canada: `https://api.8x8.com/ca/analytics/cc/{version}/realtime-metrics/`
* {version} to be replaced by current Version. As of October 2022 this is 5 resulting in /v5/

## 1. Authenticate to retrieve access token

[OAuth Authentication for 8x8 XCaaS APIs](/analytics/docs/oauth-authentication-for-8x8-xcaas-apis) is used to get a temporary `access_token` for use in with this API

**Outputs For Next Step:**

* access_token
* expires_in

The following steps will use the access_token as a Bearer Token form of authentication. This takes the form of the  

`Authorization` header being set to `Bearer access_token` (Space between Bearer and the access_token)

## 2 Multitenancy support

If the API is used for a multitenant customer the requests should contain *"X-Tenant-Info"* header variable where needs to specify the desired tenantId. The "X-Tenant-Info" header is not mandatory in case of a single tenant customer.

The following error messages could be returned when dealing with a multitenant customer:

* if for a multitenant customer request the *"X-Tenant-Info"* header is not provided the HTTP 400 code along with *"Bad request: X-Tenant-Info header is missing."* message will be returned
* if a wrong tenantId is provided the HTTP 400 code along with *"Bad request: Invalid value for X-Tenant-Info header."* message will be returned

## 3. Available Data

Realtime data is available as follows. Definitions for metrics can be found in the [Metrics Glossary](#5-metrics-glossary) section below.

* Queue Statistics ([Glossary](#51-queue-metrics-glossary))
  * for multiple queues
  * for single queue
* Agents Statistics
  * by Queue ([Glossary](#53-agent-metrics-glossary---queue-context))
  * by multiple Queues ([Glossary](#56-agent-metrics-glossary---multiple-queues-context))
  * by Group ([Glossary](#54-agent-metrics-glossary---group-context))
  * all Agents ([Glossary](#55-agent-metrics-glossary---all-agents))
* Group Statistics ([Glossary](#52-group-metrics-glossary))
  * for multiple groups
  * for single group

## 4. Accessing Realtime Queue Metrics

> 📘 **Sample is for a multiple queues**
>
> For a single queue add /{queue-id} to the url.
>
> See [additional endpoints](/analytics/docs/cc-realtime-statistics#additional-endpoints) for examples for the other endpoints
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
| version | ✓ | The current version is `v<\<versionCCARealtime\>>` | v5 |
| queue-id | ☐ | If a queue id is specified as a path parameter this limits the response to a single queue and queue-ids query parameter is ignored. Sample /queues/{queue-id} | /103 |

#### Query

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| page | ☐ | Page of the result set to return. Begins at zero (0). Default is zero. See [pagination](/analytics/docs/cc-realtime-statistics#pagination) for more details | 0 |
| size | ☐ | The number of records per page to return. Default is 100. See [pagination](/analytics/docs/cc-realtime-statistics#pagination) for more details | 100 |
| queue-ids | ☐ | When not passed all queues are returned. Specifies the queue-ids of the queues to be returned. For multiple queues add multiple times. `&queue-ids=101&queue-ids=107`. Only valid queue-ids can be passed. Passing an invalid queue-id will result in a failure. Ignored if /queue-id is passed as a path parameter. See [passing multiple ids](/analytics/docs/cc-realtime-statistics#passing-multiple-ids) for more information | 103 |
| metrics | ✓ | When not passed all metrics are returned. Specifies the metrics to return. For multiple metrics add mutiple times. &metrics=handling.rt&metrics=entered.today. See [metrics](/analytics/docs/cc-realtime-statistics#metrics) for more details |  |
| timezone | ☐ | Only applies to .today metrics. The desired timezone ([IANA Time Zones](https://www.iana.org/time-zones). Examples America/New_York, Europe/Helsinki [Wikipedia Time Zone List](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)). Accepted timezone values are those that are configured for the tenant. The value can be the tenant’s default timezone or a value defined as an optional timezone. If no value is specified, the tenant’s default timezone is used | Europe/Helsinki |
| summary | ☐ | Default false. **If set to true queue-ids and metrics parameters are ignored** and a list of queue-id and queue-name is returned | false |
| includeTotals | ☐ | If this parameter is set to `true`, at the end of each sections with the totals for time, percentage, average and count metric type will be added at the end of sections in the response. Default false. See [includeTotals](/analytics/docs/cc-realtime-statistics#includetotals) for more information. | false |

#### Metrics

To get a full list of metrics for one of the endpoints call it without the metrics parameter. This will list all available metrics. Generally it's easier to specify the metrics you wish returned to have a more compact response.

Realtime metrics are a snapshot of the current condition of the contact center. The naming convention of the metrics is aaa.bbb where aaa is the meric and bbb is the period of the metric.

#### Periods explained

* ".rt" - means realtime meaning currently. Example: there are currently X calls waiting in queue

Summary metrics are over one of 3 provided ranges

* ".int-15m" means in the most recent 15 minute interval.
* ".int-30m" means in the most recent 30 minute interval
* ".today" - is for the calendar day. X calls have entered the queue today.

#### pagination

page starts with zero (0).

The maximum page size is 1000 if you specify a `size` above 1000 you will receive

**400 Bad Request**

```json
{
    "message": "Bad request: Field 'size' must be less than or equal to 1000"
}

```

Responses will include the following headers related to pagination

| Header | Description | Example |
| --- | --- | --- |
| X-Page-Size | Page size requested, default 100 | 100 |
| X-Page | Current Page | 0 |
| X-Total-Pages | Count of all pages, remember `page` parameter and X-Page are zero based so if X-Total-Pages is 13 the last page is = 12 | 12 |
| X-Total-Elements | Total number of records | 1223 |

If a page beyond the end of the result set is specified the response will be as follows

HTTP STATUS : 400

Beyond last page

```json
{
    "message": "Bad request: Field 'page' must be greater than or equal to 0 and less than the total number of pages, which is 2 for this request"
}

```

### Realtime Data Request

In this example the data returned will only be for queue id is 103 and 170 and the only metrics returned will be handling.rt and metrics=entered.today

queuesgroups

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v<\<versionCCARealtime\>>/realtime-metrics/queues?page=0&size=100&queue-ids=101&queue-ids=107&metrics=handling.rt&metrics=entered.today' \
--header 'Authorization: Bearer FnZGG0u5BpNwRkuwKuSmfG2JAG9w'

```

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/vv<\<versionCCARealtime\>>/realtime-metrics/groups?page=0&size=100&group-ids=102&group-ids=1023&metrics=availableIdle.rt&metrics=enabled.rt' \
--header 'Authorization: Bearer FnZGG0u5BpNwRkuwKuSmfG2JAG9w'

```

### Realtime Data Response

Note the response headers related to [pagination](/analytics/docs/cc-realtime-statistics#pagination) above.

#### Body

queuesgroups

```json
[
    {
        "id": "103",
        "name": "Appointments",
        "metrics": [
            {
                "key": "entered.today",
                "value": 7
            },
            {
                "key": "handling.rt",
                "value": 0
            }
        ]
    },
    {
        "id": "107",
        "name": "Tickets",
        "metrics": [
            {
                "key": "entered.today",
                "value": 6
            },
            {
                "key": "handling.rt",
                "value": 0
            }
        ]
    }
]

```

```json
[
    {
        "id": "102",
        "name": "Sales",
        "metrics": [
            {
                "key": "availableIdle.rt",
                "value": "0"
            },
            {
                "key": "enabled.rt",
                "value": "0"
            }
        ]
    },
    {
        "id": "1023",
        "name": "Deliveries",
        "metrics": [
            {
                "key": "availableIdle.rt",
                "value": "0"
            },
            {
                "key": "enabled.rt",
                "value": "0"
            }
        ]
    }
]

```

## Additional Endpoints

> 📘 **Core Parameters and structure are common**
>
> The following examples don't show every parameter refer to [parameters](/analytics/docs/cc-realtime-statistics#parameters) above.
>
> Metrics, timezone etc. are all available on each endpoint
>
>

The core parameters and structure are common to all of the following endpoints. Which allow for selecting specific queue, groups and agents. The available metrics for queues, groups, agents within queues and agents within groups vary.

### Single Queue

`/realtime-metrics/queues/{queue-id}`

#### Path Parameter

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| queue-id | ✓ | Single queue id to return data for | 103 |

#### Single Queue Request

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v<\<versionCCARealtime\>>/realtime-metrics/queues/101?&metrics=handling.rt&metrics=entered.today' \
--header 'Authorization: Bearer FnZGG0u5BpNwRkuwKuSmfG2JAG9w'

```

#### Single Queue Response

```json
[
    {
        "id": "103",
        "name": "Appointments",
        "metrics": [
            {
                "key": "entered.today",
                "value": 7
            },
            {
                "key": "handling.rt",
                "value": 0
            }
        ]
    }
]

```

### Agents within a Queue

`/realtime-metrics/queues/{queue-id}/agents`

#### Path Parameter

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| queue-id | ✓ | Single queue id to return agents for | 103 |

#### Query Parameter

`agent-ids` can be passed similarly to queue-ids in the prior example.

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| agent-ids | ☐ | When not passed all agents are returned. Specifies the agent-ids of the agents to be returned. For multiple agents add multiple times. `&agent-ids=agfAl1ZjIyQ8ecpoCB9KUbbb&agent-ids=agk4tyf8vnSMWki8r4e0dfff`. Only valid agent-ids can be passed. Passing an invalid agent-id will result in a failure. | 103 |

#### Agents within a Queue Request

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v<\<versionCCARealtime\>>/realtime-metrics/queues/{queue-id}/agents?page=0&size=100&agent-ids={agent-id1}&agent-ids={agent-id2}&metrics=status.rt,statusCode.rt,timeOnStatus.rt,lastLogin.rt' \
--header 'Authorization: Bearer FnZGG0u5BpNwRkuwKuSmfG2JAG9w'

```

#### Agents within a Queue Response

```json
[
    {
        "id": "agAD21EBR1RhuV2TNDivaaa",
        "name": "Jane Li",
        "metrics": [
            {
                "key": "lastLogin.rt",
                "value": "2022-12-16T16:28:08.013Z"
            },
            {
                "key": "status.rt",
                "value": "LoggedOut"
            },
            {
                "key": "statusCode.rt",
                "value": null
            },
            {
                "key": "timeOnStatus.rt",
                "value": 245611272
            }
        ]
    },
    {
        "id": "agAQDqmvKiRbG4ekigNSbbbbb",
        "name": "James Woods",
        "metrics": [
            {
                "key": "lastLogin.rt",
                "value": "2022-12-02T17:32:31.299Z"
            },
            {
                "key": "status.rt",
                "value": "Available"
            },
            {
                "key": "statusCode.rt",
                "value": null
            },
            {
                "key": "timeOnStatus.rt",
                "value": 1469499666
            }
        ]
    }
]

```

### Single Agent within a Queue

`/realtime-metrics/queues/{queue-id}/agents/{agent-id}`

#### Path Parameters

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| queue-id | ✓ | A queue the agent is a member of | 103 |
| agent-id | ✓ | The agent requested within the queue | agAD21EBR1RhuV2TNDivaaa |

#### Single Agent within a Queue Request

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v<\<versionCCARealtime\>>/realtime-metrics/queues/{queue-id}/agents/{agent-id}?metrics=status.rt,statusCode.rt,timeOnStatus.rt,lastLogin.rt' \
--header 'Authorization: Bearer FnZGG0u5BpNwRkuwKuSmfG2JAG9w'

```

#### Single Agent within a Queue Response

```json
[
    {
        "id": "agAD21EBR1RhuV2TNDivaaa",
        "name": "Jane Li",
        "metrics": [
            {
                "key": "lastLogin.rt",
                "value": "2022-12-16T16:28:08.013Z"
            },
            {
                "key": "status.rt",
                "value": "LoggedOut"
            },
            {
                "key": "statusCode.rt",
                "value": null
            },
            {
                "key": "timeOnStatus.rt",
                "value": 245611272
            }
        ]
    }
]

```

### Agents within a Group of Queues

> 🚧 **This endpoint ONLY returns information for agents/queues that have been had activity or a session in the current day.**
>
>

`/realtime-metrics/agents-in-queue-groups`

#### Query Parameter

`queue-ids` can be passed similarly to queue-ids in the prior example.

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| queue-ids | ☐ | When not passed all queues are returned. Specifies the queue-ids of the queues to be returned. For multiple queues add multiple times. `&queue-ids=101&queue-ids=102`. Only valid queue-ids can be passed. Passing an invalid queue-id will result in a failure. | 103 |

Sample request limited to two queues and just three of the available metrics (Two agent related and one queue related)

#### Agents within a Queue Request

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v<\<versionCCARealtime\>>/realtime-metrics/agents-in-queue-groups?metrics=status.rt,timeOnStatus.rt,accepted.today.inQueue&queue-ids={queue-id-1}&queue-ids={queue-id-2}&page=0&size=100' \
--header 'Authorization: Bearer FnZGG0u5BpNwRkuwKuSmfG2JAG9w'

```

The response contains two sections. First section is an array of agents, where for each agent the response contains a collection of the agent specific metrics. The second section is an array of queues where for each queue the response contains a collection of agents and a collection of queue specific metrics for each agent. Each agent will have in the response the agent ID and agent name.

#### Agents within a Queue Response

```json
{
    "agents": [
        {
            "id": "aget4bO5y1SqqQ5HDDfaaaaa",
            "name": "John Agent",
            "metrics": {
                "status.rt": "Available",
                "timeOnStatus.rt": 123
            }
        },
        {
            "id": "agwhzJ0NOwTdWid_JPaaaaa",
            "name": "Jane Agent",
            "metrics": {
                "status.rt": "LoggedOut",
                "timeOnStatus.rt": 2224
            }
        }
    ],
    "queues": [
        {
            "queueId": "2943",
            "assignedAgents": [],
            "agentMetrics": [
                {
                    "id": "agwhzJ0NOwTdWid_JPaaaaa",
                    "name": "Jane Agent",
                    "metrics": {
                        "accepted.today.inQueue": 1
                    }
                }
            ]
        },
        {
            "queueId": "2046",
            "assignedAgents": [
                "aget4bO5y1SqqQ5HDDfaaaaa",
                "agpQ5jHgnDTgq1lMu1qaOxzg"
            ],
            "agentMetrics": [
                {
                    "id": "aget4bO5y1SqqQ5HDDfaaaaa",
                    "name": "John Agent",
                    "metrics": {
                        "accepted.today.inQueue": 2
                    }
                }
            ]
        }
    ]
}

```

### All agents at once within a tenant

Retrieve all agents with all specified metrics values within a tenant. The *summary* parameter can be used to get only agent details without the metrics, in this case the *agent-ids*, *group-ids* and *metrics* parameters will be ignored.

`/realtime-metrics/agents`

#### Query Parameter

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| agent-ids | ☐ | Optional set of agent identifiers. Only metrics for these agents will be returned. | agLkndJlSOQReqFZI48LgyvQ |
| group-ids | ☐ | Optional set of group identifiers. Only metrics for these groups will be returned. | 103 |
| summary | ☐ | Returns a summary (id, name, group id, group name) of all agents. If this parameter is set as TRUE, agent-ids, group-ids and metrics parameters will be ignored. If this parameter is not set as TRUE, `metrics` parameter needs to be provided. | true |

#### Request with a specified list of metrics, agent-ids and group-ids

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v5/realtime-metrics/agents?metrics=status.rt,timeOnStatus.rt,accepted.today.inQueue&agent-ids={agent-id-1}&agent-ids={agent-id-2}&group-ids={group-id-1}&group-ids={group-id-2}&page=0&size=100' \
--header 'Authorization: Bearer FnZGG0u5BpNwRkuwKuSmfG2JAG9w'

```

#### Request with a summary parameter set to True

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v5/realtime-metrics/agents?summary=true&page=0&size=100' \
--header 'Authorization: Bearer FnZGG0u5BpNwRkuwKuSmfG2JAG9w'

```

#### All Agents within a tenant Response examples

With *summary=true* parameter response example:

```json
[
    {
        "id": "ag0IWAMsLuSsijCkitWX76Ng",
        "name": "Agent 1",
        "groupId": "735",
        "groupName": "Nicu Group"
    },
    {
        "id": "ag0OlQp4skQ5mOQsPvPRXDYw",
        "name": "Admin 1",
        "groupId": "100",
        "groupName": "ungroup"
    },
    {
        "id": "ag10000",
        "name": "Admin 2",
        "groupId": "131",
        "groupName": "adi_group"
    }
]

```

With *summary=false* (or missing parameter) response example:

```json
[
    {
        "id": "ag0IWAMsLuSsijCkitWX76Ng",
        "name": "Agent 1",
        "metrics": [
            {
                "key": "accepted.int-15m",
                "value": null
            },
            {
                "key": "accepted.int-30m",
                "value": null
            },
            {
                "key": "activeInteractionsCount.rt",
                "value": 3
            },
            {
                "key": "activeChannels.rt",
                "value": [
                    {
                        "id": "t5mp0xxKQkKTqhI",
                        "name": "Chat Channel 1",
                        "count": 2
                    },
                    {
                        "id": "k7V_0uMpSDCgnTlylSCScw",
                        "name": "Chat O",
                        "count": 1
                    }
                ]
            },
            {
                "key": "activeDirections.rt",
                "value": [
                    {
                        "id": "InboundDir",
                        "name": "InboundDir",
                        "count": 2
                    },
                    {
                        "id": "OutboundDir",
                        "name": "OutboundDir",
                        "count": 1
                    }
                ]
            },
            {
                "key": "activeQueues.rt",
                "value": [
                    {
                        "id": "101",
                        "name": "Inbound Queue 1",
                        "count": 2
                    },
                    {
                        "id": "102",
                        "name": "Outbound Queue 1",
                        "count": 1
                    }
                ]
            }
        ]
    },
    {
        "id": "ag0OlQp4skQ5mOQsPvPRXDYw",
        "name": "Agent 2",
        "metrics": [
            {
                "key": "accepted.int-15m",
                "value": null
            },
            {
                "key": "accepted.int-30m",
                "value": null
            },
            {
                "key": "activeInteractionsCount.rt",
                "value": 1
            },
            {
                "key": "activeChannels.rt",
                "value": [
                    {
                        "id": "VphYLcHogw",
                        "name": "Chat Channel 1",
                        "count": 1
                    }
                ]
            },
            {
                "key": "activeDirections.rt",
                "value": [
                    {
                        "id": "InboundDir",
                        "name": "InboundDir",
                        "count": 1
                    }
                ]
            },
            {
                "key": "activeQueues.rt",
                "value": [
                    {
                        "id": "103",
                        "name": "Inbound Chat 1",
                        "count": 1
                    }
                ]
            }
        ]
    },
    {
        "id": "ag10000",
        "name": "Agent 3",
        "metrics": [
            {
                "key": "accepted.int-15m",
                "value": null
            },
            {
                "key": "accepted.int-30m",
                "value": null
            },
            {
                "key": "activeInteractionsCount.rt",
                "value": 0
            },
            {
                "key": "activeChannels.rt",
                "value": []
            },
            {
                "key": "activeDirections.rt",
                "value": []
            },
            {
                "key": "activeQueues.rt",
                "value": []
            }
        ]
    }
]

```

### Groups

`/realtime-metrics/groups`

#### Query Parameter

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| group-ids | ✓ | When not passed all groups are returned. Specifies the group-ids of the groups to be returned. For multiple groups add multiple times. `&group-ids=102&group-ids=1023`. Only valid group-ids can be passed. Passing an invalid group-id will result in a failure. | 103 |

#### Groups Request

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v<\<versionCCARealtime\>>/realtime-metrics/groups?size=100&page=0&group-ids=102&group-ids=1023&metrics=availableIdle.rt&metrics=enabled.rt' \
--header 'Authorization: Bearer FnZGG0u5BpNwRkuwKuSmfG2JAG9w'

```

#### Groups Response

```json
[
    {
        "id": "102",
        "name": "Sales",
        "metrics": [
            {
                "key": "availableIdle.rt",
                "value": "0"
            },
            {
                "key": "enabled.rt",
                "value": "0"
            }
        ]
    },
    {
        "id": "1023",
        "name": "Deliveries",
        "metrics": [
            {
                "key": "availableIdle.rt",
                "value": "0"
            },
            {
                "key": "enabled.rt",
                "value": "0"
            }
        ]
    }
]

```

### Single Group

`/realtime-metrics/groups/{group-id}`

#### Path Parameter

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| group-id | ✓ | Group Id of the requested group | 103 |

#### Single Group Request

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v<\<versionCCARealtime\>>/realtime-metrics/groups/{group-id}?metrics=availableIdle.rt&metrics=enabled.rt' \
--header 'Authorization: Bearer FnZGG0u5BpNwRkuwKuSmfG2JAG9w'

```

#### Groups Response

```json
[
    {
        "id": "102",
        "name": "Sales",
        "metrics": [
            {
                "key": "availableIdle.rt",
                "value": "0"
            },
            {
                "key": "enabled.rt",
                "value": "0"
            }
        ]
    }
]

```

### Agents within a Group

`/realtime-metrics/groups/{group-id}/agents`

#### Path Parameter

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| group-id | ✓ | Group Id of the requested group | 103 |

#### Query Parameter

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| agent-ids | ☐ | When not passed all agents are returned. Specifies the agent-ids of the agents to be returned. For multiple agents add multiple times. `&agent-ids=agfAl1ZjIyQ8ecpoCB9KUbbb&agent-ids=agk4tyf8vnSMWki8r4e0dfff`. Only valid agent-ids can be passed. Passing an invalid agent-id will result in a failure. | agk4tyf8vnSMWki8r4e0dfff |

#### Agents within a Group Request

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v<\<versionCCARealtime\>>/realtime-metrics/groups/{group-id}/agents?page=0&size=100&agent-ids={agent-id1}&agent-ids={agent-id2}&metrics=offered.today&metrics=status.rt' \
--header 'Authorization: Bearer FnZGG0u5BpNwRkuwKuSmfG2JAG9w'

```

#### Agents within a Group Response

```json
[
    {
        "id": "agAD21EBR1RhuV2TNDivaaa",
        "name": "Jane Li",
        "metrics": [
            {
                "key": "offered.today",
                "value": 10
            },
            {
                "key": "status.rt",
                "value": "Available"
            }
        ]
    },
    {
        "id": "agAQDqmvKiRbG4ekigNSbbbbb",
        "name": "James Woods",
        "metrics": [
            {
                "key": "offered.today",
                "value": null
            },
            {
                "key": "status.rt",
                "value": "LoggedOut"
            }
        ]
    }
]

```

### Single Agent within a Group

`/realtime-metrics/groups/{group-id}/agents/{agent-id}`

#### Path Parameter

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| group-id | ✓ | Group Id of the requested group | 103 |
| agent-id | ✓ | AgentId of the requested agent | agAD21EBR1RhuV2TNDivaaa |

#### Single Agent within a Group Request

```bash
curl --location --request GET 'https://api.8x8.com/analytics/cc/v<\<versionCCARealtime\>>/realtime-metrics/groups/{group-id}/agents/{agent-id}?metrics=offered.today&metrics=status.rt' \
--header 'Authorization: Bearer FnZGG0u5BpNwRkuwKuSmfG2JAG9w'

```

#### Single Agent within a Group Response

```json
[
    {
        "id": "agAD21EBR1RhuV2TNDivaaa",
        "name": "Jane Li",
        "metrics": [
            {
                "key": "offered.today",
                "value": 10
            },
            {
                "key": "status.rt",
                "value": "Available"
            }
        ]
    }
]

```

## Additional Information

#### includeTotals

When includeTotals is set to `true` an additional set of "total" metrics will be included for time, percentage, average and count metric types as follows.

```json
{
        "id": null,
        "name": "totals",
        "metrics": [
            {
                "key": "total.abandoned.int-15m",
                "value": 0
            },
            {
                "key": "total.abandoned.int-30m",
                "value": 0
            },
            {
                "key": "total.abandoned.today",
                "value": 0
            },
            {
                "key": "total.abandonedPercentage.int-15m",
                "value": null
            },
            {
                "key": "total.abandonedPercentage.int-30m",
                "value": null
            },
            {
                "key": "total.abandonedPercentage.today",
                "value": 0.0
            },
            {
                "key": "total.accepted.int-15m",
                "value": 0
            },
            {
                "key": "total.accepted.int-30m",
                "value": 0
            },
            {
                "key": "total.accepted.today",
                "value": 0
            },
            {
                "key": "total.acceptedInSla.int-12h",
                "value": 0
            },
            {
                "key": "total.acceptedInSla.int-15m",
                "value": 0
            },
            {
                "key": "total.acceptedInSla.int-1h",
                "value": 0
            },
            {
                "key": "total.acceptedInSla.int-30m",
                "value": 0
            },
            {
                "key": "total.acceptedInSla.int-4h",
                "value": 0
            },
            {
                "key": "total.acceptedInSla.int-8h",
                "value": 0
            },
            {
                "key": "total.acceptedInSla.today",
                "value": 0
            },
            {
                "key": "total.acceptedInSlaPercentage.int-12h",
                "value": null
            },
            {
                "key": "total.acceptedInSlaPercentage.int-15m",
                "value": null
            },
            {
                "key": "total.acceptedInSlaPercentage.int-1h",
                "value": null
            },
            {
                "key": "total.acceptedInSlaPercentage.int-30m",
                "value": null
            },
            {
                "key": "total.acceptedInSlaPercentage.int-4h",
                "value": null
            },
            {
                "key": "total.acceptedInSlaPercentage.int-8h",
                "value": null
            },
            {
                "key": "total.acceptedInSlaPercentage.today",
                "value": null
            },
            {
                "key": "total.acceptedPercentage.int-15m",
                "value": null
            },
            {
                "key": "total.acceptedPercentage.int-30m",
                "value": null
            },
            {
                "key": "total.acceptedPercentage.today",
                "value": 0.0
            },
            {
                "key": "total.availableIdle.rt",
                "value": 0
            },
            {
                "key": "total.avgDivertedTime.int-15m",
                "value": null
            },
            {
                "key": "total.avgDivertedTime.int-30m",
                "value": null
            },
            {
                "key": "total.avgDivertedTime.today",
                "value": 29947.4
            },
            {
                "key": "total.avgHandlingTime.int-15m",
                "value": null
            },
            {
                "key": "total.avgHandlingTime.int-30m",
                "value": null
            },
            {
                "key": "total.avgHandlingTime.today",
                "value": null
            },
            {
                "key": "total.avgOfferingTime.int-15m",
                "value": null
            },
            {
                "key": "total.avgOfferingTime.int-30m",
                "value": null
            },
            {
                "key": "total.avgOfferingTime.today",
                "value": null
            },
            {
                "key": "total.avgProcessingTime.int-15m",
                "value": null
            },
            {
                "key": "total.avgProcessingTime.int-30m",
                "value": null
            },
            {
                "key": "total.avgProcessingTime.today",
                "value": null
            },
            {
                "key": "total.avgWorkTime.int-15m",
                "value": null
            },
            {
                "key": "total.avgWorkTime.int-30m",
                "value": null
            },
            {
                "key": "total.avgWorkTime.today",
                "value": null
            },
            {
                "key": "total.avgWrapUpTime.int-15m",
                "value": null
            },
            {
                "key": "total.avgWrapUpTime.int-30m",
                "value": null
            },
            {
                "key": "total.avgWrapUpTime.today",
                "value": null
            },
            {
                "key": "total.busy.rt",
                "value": 0
            },
            {
                "key": "total.busyExternal.rt",
                "value": 0
            },
            {
                "key": "total.busyOther.rt",
                "value": 0
            },
            {
                "key": "total.diverted.int-15m",
                "value": 0
            },
            {
                "key": "total.diverted.int-30m",
                "value": 0
            },
            {
                "key": "total.diverted.today",
                "value": 5
            },
            {
                "key": "total.divertedPercentage.int-15m",
                "value": null
            },
            {
                "key": "total.divertedPercentage.int-30m",
                "value": null
            },
            {
                "key": "total.divertedPercentage.today",
                "value": 1.0
            },
            {
                "key": "total.eligible.rt",
                "value": 0
            },
            {
                "key": "total.enabled.rt",
                "value": 0
            },
            {
                "key": "total.entered.int-15m",
                "value": 0
            },
            {
                "key": "total.entered.int-30m",
                "value": 0
            },
            {
                "key": "total.entered.today",
                "value": 5
            },
            {
                "key": "total.handling.rt",
                "value": 0
            },
            {
                "key": "total.interactionsAvgWaitTime.int-15m",
                "value": null
            },
            {
                "key": "total.interactionsAvgWaitTime.int-30m",
                "value": null
            },
            {
                "key": "total.interactionsAvgWaitTime.today",
                "value": 29947.4
            },
            {
                "key": "total.interactionsHandling.rt",
                "value": 0
            },
            {
                "key": "total.interactionsLongestWaitInQueue.int-15m",
                "value": 0
            },
            {
                "key": "total.interactionsLongestWaitInQueue.int-30m",
                "value": 0
            },
            {
                "key": "total.interactionsLongestWaitInQueue.rt",
                "value": 0
            },
            {
                "key": "total.interactionsLongestWaitInQueue.today",
                "value": 29951
            },
            {
                "key": "total.interactionsWaitInQueue.rt",
                "value": 0
            },
            {
                "key": "total.interactionsWrapUp.rt",
                "value": 0
            },
            {
                "key": "total.longestOfferingTimeInQueue.int-15m",
                "value": 0
            },
            {
                "key": "total.longestOfferingTimeInQueue.int-30m",
                "value": 0
            },
            {
                "key": "total.longestOfferingTimeInQueue.today",
                "value": 0
            },
            {
                "key": "total.newInQueue.int-15m",
                "value": 0
            },
            {
                "key": "total.newInQueue.int-30m",
                "value": 0
            },
            {
                "key": "total.newInQueue.today",
                "value": 5
            },
            {
                "key": "total.offering.rt",
                "value": 0
            },
            {
                "key": "total.onBreak.rt",
                "value": 0
            },
            {
                "key": "total.shortAbandoned.int-15m",
                "value": 0
            },
            {
                "key": "total.shortAbandoned.int-30m",
                "value": 0
            },
            {
                "key": "total.shortAbandoned.today",
                "value": 0
            },
            {
                "key": "total.shortAbandonedPercentage.int-15m",
                "value": null
            },
            {
                "key": "total.shortAbandonedPercentage.int-30m",
                "value": null
            },
            {
                "key": "total.shortAbandonedPercentage.today",
                "value": 0.0
            },
            {
                "key": "total.slaPercentage.int-12h",
                "value": null
            },
            {
                "key": "total.slaPercentage.int-15m",
                "value": null
            },
            {
                "key": "total.slaPercentage.int-1h",
                "value": null
            },
            {
                "key": "total.slaPercentage.int-30m",
                "value": null
            },
            {
                "key": "total.slaPercentage.int-4h",
                "value": null
            },
            {
                "key": "total.slaPercentage.int-8h",
                "value": null
            },
            {
                "key": "total.slaPercentage.today",
                "value": null
            },
            {
                "key": "total.totalAbandoned.int-15m",
                "value": 0
            },
            {
                "key": "total.totalAbandoned.int-30m",
                "value": 0
            },
            {
                "key": "total.totalAbandoned.today",
                "value": 0
            },
            {
                "key": "total.totalAbandonedPercentage.int-15m",
                "value": null
            },
            {
                "key": "total.totalAbandonedPercentage.int-30m",
                "value": null
            },
            {
                "key": "total.totalAbandonedPercentage.today",
                "value": 0.0
            },
            {
                "key": "total.workingOffline.rt",
                "value": 0
            },
            {
                "key": "total.wrapUp.rt",
                "value": 0
            }
        ]
    }

```

#### Passing Multiple ids

When passing multiple ids on endpoints with plural parameters such as agent-ids, queue-ids, group-ids.

The parameters can be passed by repeating the parameter name:

* `agent-ids=123&agent-ids-765&agent-ids=963`

OR they can be passed as a comma separated list:

* `agent-ids=123,765,963`

## 5. Metrics Glossary

### 5.1. Queue Metrics Glossary

This glossary provides comprehensive definitions for all metrics available when querying queue statistics via the Real-time API. These metrics apply to the following endpoints:

* `GET /queues` - All queues statistics
* `GET /queues/{id}` - Individual queue statistics

<details>
<summary>Click to expand Queue Metrics Glossary (101 metrics)</summary>

**Version** indicates minimum Real-time API version where metric became available on this API endpoint.

| Metric | Version | Description |
|--------|---------|-------------|
| `abandoned.int-15m` | v1+ | Number of interactions customers ended while waiting in queue before reaching an agent, excluding short abandonments (last 15-minutes) |
| `abandoned.int-30m` | v1+ | Number of interactions customers ended while waiting in queue before reaching an agent, excluding short abandonments (last 30-minutes) |
| `abandoned.today` | v1+ | Number of interactions customers ended while waiting in queue before reaching an agent, excluding short abandonments (current day) |
| `abandonedPercentage.int-15m` | v1+ | Percentage of interactions customers ended while waiting in queue before reaching an agent, excluding short abandonments, relative to total entries (last 15-minutes) |
| `abandonedPercentage.int-30m` | v1+ | Percentage of interactions customers ended while waiting in queue before reaching an agent, excluding short abandonments, relative to total entries (last 30-minutes) |
| `abandonedPercentage.today` | v1+ | Percentage of interactions customers ended while waiting in queue before reaching an agent, excluding short abandonments, relative to total entries (current day) |
| `accepted.int-15m` | v1+ | Total interactions answered by agents. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent (last 15-minutes) |
| `accepted.int-30m` | v1+ | Total interactions answered by agents. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent (last 30-minutes) |
| `accepted.today` | v1+ | Total interactions answered by agents. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent (current day) |
| `acceptedInSla.int-12h` | v3+ | Total number of interactions answered by all agents within the SLA Threshold Time. Measures interactions where the agent answered before the configured SLA time limit was exceeded (last 12-hours) |
| `acceptedInSla.int-15m` | v3+ | Total number of interactions answered by all agents within the SLA Threshold Time. Measures interactions where the agent answered before the configured SLA time limit was exceeded (last 15-minutes) |
| `acceptedInSla.int-1h` | v3+ | Total number of interactions answered by all agents within the SLA Threshold Time. Measures interactions where the agent answered before the configured SLA time limit was exceeded (last 1-hour) |
| `acceptedInSla.int-30m` | v3+ | Total number of interactions answered by all agents within the SLA Threshold Time. Measures interactions where the agent answered before the configured SLA time limit was exceeded (last 30-minutes) |
| `acceptedInSla.int-4h` | v3+ | Total number of interactions answered by all agents within the SLA Threshold Time. Measures interactions where the agent answered before the configured SLA time limit was exceeded (last 4-hours) |
| `acceptedInSla.int-8h` | v3+ | Total number of interactions answered by all agents within the SLA Threshold Time. Measures interactions where the agent answered before the configured SLA time limit was exceeded (last 8-hours) |
| `acceptedInSla.today` | v3+ | Total number of interactions answered by all agents within the SLA Threshold Time. Measures interactions where the agent answered before the configured SLA time limit was exceeded (current day) |
| `acceptedInSlaPercentage.int-12h` | v3+ | Percentage of total number of interactions answered by all agents within the SLA Threshold Time, relative to total accepted interactions (last 12-hours) |
| `acceptedInSlaPercentage.int-15m` | v3+ | Percentage of total number of interactions answered by all agents within the SLA Threshold Time, relative to total accepted interactions (last 15-minutes) |
| `acceptedInSlaPercentage.int-1h` | v3+ | Percentage of total number of interactions answered by all agents within the SLA Threshold Time, relative to total accepted interactions (last 1-hour) |
| `acceptedInSlaPercentage.int-30m` | v3+ | Percentage of total number of interactions answered by all agents within the SLA Threshold Time, relative to total accepted interactions (last 30-minutes) |
| `acceptedInSlaPercentage.int-4h` | v3+ | Percentage of total number of interactions answered by all agents within the SLA Threshold Time, relative to total accepted interactions (last 4-hours) |
| `acceptedInSlaPercentage.int-8h` | v3+ | Percentage of total number of interactions answered by all agents within the SLA Threshold Time, relative to total accepted interactions (last 8-hours) |
| `acceptedInSlaPercentage.today` | v3+ | Percentage of total number of interactions answered by all agents within the SLA Threshold Time, relative to total accepted interactions (current day) |
| `acceptedPercentage.int-15m` | v1+ | Percentage of total interactions answered by agents relative to total entries. Shows what proportion of all interactions entering the queue were successfully connected to and handled by an agent (last 15-minutes) |
| `acceptedPercentage.int-30m` | v1+ | Percentage of total interactions answered by agents relative to total entries. Shows what proportion of all interactions entering the queue were successfully connected to and handled by an agent (last 30-minutes) |
| `acceptedPercentage.today` | v1+ | Percentage of total interactions answered by agents relative to total entries. Shows what proportion of all interactions entering the queue were successfully connected to and handled by an agent (current day) |
| `availableIdle.rt` | v1+ | Agents currently enabled, assigned, and waiting in Available state for queue interactions. These are agents ready and waiting to receive the next incoming interaction (currently) |
| `avgDivertedTime.int-15m` | v1+ | Average duration diverted interactions remain in queue before departure. Measures the average time spent by interactions in queue before that were transferred, forwarded or routed away via IVR (last 15-minutes) |
| `avgDivertedTime.int-30m` | v1+ | Average duration diverted interactions remain in queue before departure. Measures the average time spent by interactions in queue before that were transferred, forwarded or routed away via IVR (last 30-minutes) |
| `avgDivertedTime.today` | v1+ | Average duration diverted interactions remain in queue before departure. Measures the average time spent by interactions in queue before that were transferred, forwarded or routed away via IVR (current day) |
| `avgHandlingTime.int-15m` | v1+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold (last 15-minutes) |
| `avgHandlingTime.int-30m` | v1+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold (last 30-minutes) |
| `avgHandlingTime.today` | v1+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold (current day) |
| `avgOfferingTime.int-15m` | v1+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it (last 15-minutes) |
| `avgOfferingTime.int-30m` | v1+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it (last 30-minutes) |
| `avgOfferingTime.today` | v1+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it (current day) |
| `avgProcessingTime.int-15m` | v1+ | Average combined time in Handling and Wrap Up states per accepted interaction. This represents the total time from when an agent accepts an interaction through final completion, including wrap-up work (last 15-minutes) |
| `avgProcessingTime.int-30m` | v1+ | Average combined time in Handling and Wrap Up states per accepted interaction. This represents the total time from when an agent accepts an interaction through final completion, including wrap-up work (last 30-minutes) |
| `avgProcessingTime.today` | v1+ | Average combined time in Handling and Wrap Up states per accepted interaction. This represents the total time from when an agent accepts an interaction through final completion, including wrap-up work (current day) |
| `avgWorkTime.int-15m` | v1+ | Average combined time in Offering, Handling, and Wrap Up states per interaction. Includes the full duration from when an interaction is offered, through handling, until all work is complete (last 15-minutes) |
| `avgWorkTime.int-30m` | v1+ | Average combined time in Offering, Handling, and Wrap Up states per interaction. Includes the full duration from when an interaction is offered, through handling, until all work is complete (last 30-minutes) |
| `avgWorkTime.today` | v1+ | Average combined time in Offering, Handling, and Wrap Up states per interaction. Includes the full duration from when an interaction is offered, through handling, until all work is complete (current day) |
| `avgWrapUpTime.int-15m` | v1+ | Average post-processing time per interaction entered. Time spent by agents completing administrative tasks after finishing handling an interaction (last 15-minutes) |
| `avgWrapUpTime.int-30m` | v1+ | Average post-processing time per interaction entered. Time spent by agents completing administrative tasks after finishing handling an interaction (last 30-minutes) |
| `avgWrapUpTime.today` | v1+ | Average post-processing time per interaction entered. Time spent by agents completing administrative tasks after finishing handling an interaction (current day) |
| `busy.rt` | v1+ | Agents in Offering, Handling, or Wrap Up states actively working. Represents all agents who are actively working on interactions (currently) |
| `busyExternal.rt` | v1+ | Interactions transferred from other queues handled by current queue agents. Shows interactions that originated in a different queue but are being serviced by agents in this queue (currently) |
| `busyOther.rt` | v1+ | Agents working on interactions in different queues. Represents agents assigned to this queue but currently handling interactions for other queues (currently) |
| `diverted.int-15m` | v1+ | Interactions leaving queue without termination via transfer, forwarding, or IVR routing. Represents interactions that were moved out of the queue through various routing mechanisms (last 15-minutes) |
| `diverted.int-30m` | v1+ | Interactions leaving queue without termination via transfer, forwarding, or IVR routing. Represents interactions that were moved out of the queue through various routing mechanisms (last 30-minutes) |
| `diverted.today` | v1+ | Interactions leaving queue without termination via transfer, forwarding, or IVR routing. Represents interactions that were moved out of the queue through various routing mechanisms (current day) |
| `divertedPercentage.int-15m` | v1+ | Percentage of interactions leaving queue without termination via transfer, forwarding, or IVR routing, relative to total entries (last 15-minutes) |
| `divertedPercentage.int-30m` | v1+ | Percentage of interactions leaving queue without termination via transfer, forwarding, or IVR routing, relative to total entries (last 30-minutes) |
| `divertedPercentage.today` | v1+ | Percentage of interactions leaving queue without termination via transfer, forwarding, or IVR routing, relative to total entries (current day) |
| `eligible.rt` | v1+ | Count of agents available to be offered interactions. Eligible agents are those not on break and capable of receiving interactions (currently) |
| `enabled.rt` | v1+ | Count of agents logged in, assigned, and enabled for the specific queue. Includes all agents regardless of their current status (Available, Busy, Break, etc.) (currently) |
| `entered.int-15m` | v1+ | Inbound interactions entering queue; outbound interactions directed through queue. Counts all interactions that came into this queue during the period (last 15-minutes) |
| `entered.int-30m` | v1+ | Inbound interactions entering queue; outbound interactions directed through queue. Counts all interactions that came into this queue during the period (last 30-minutes) |
| `entered.today` | v1+ | Inbound interactions entering queue; outbound interactions directed through queue. Counts all interactions that came into this queue during the period (current day) |
| `handling.rt` | v1+ | Agents actively processing interactions, excluding Wrap Up state. Shows only agents currently in the Handling state (currently) |
| `interactionsAvgWaitTime.int-15m` | v1+ | Average waiting time for interactions. Time interactions spend in queue from entry until acceptance, abandonment, or diversion (last 15-minutes) |
| `interactionsAvgWaitTime.int-30m` | v1+ | Average waiting time for interactions. Time interactions spend in queue from entry until acceptance, abandonment, or diversion (last 30-minutes) |
| `interactionsAvgWaitTime.today` | v1+ | Average waiting time for interactions. Time interactions spend in queue from entry until acceptance, abandonment, or diversion (current day) |
| `interactionsHandling.rt` | v1+ | Currently active interactions being handled by agents. Represents the number of interactions where an agent is currently connected and processing (currently) |
| `interactionsLongestWaitInQueue.int-15m` | v1+ | Longest wait in queue for interactions. Duration of the longest waiting interaction in the queue (last 15-minutes) |
| `interactionsLongestWaitInQueue.int-30m` | v1+ | Longest wait in queue for interactions. Duration of the longest waiting interaction in the queue (last 30-minutes) |
| `interactionsLongestWaitInQueue.rt` | v1+ | Longest wait in queue for interactions. Duration of the longest waiting interaction currently in the queue (currently) |
| `interactionsLongestWaitInQueue.today` | v1+ | Longest wait in queue for interactions. Duration of the longest waiting interaction in the queue (current day) |
| `interactionsWaitInQueue.rt` | v1+ | Number of interactions waiting in queue. Count of interactions currently queued and awaiting agent connection (currently) |
| `interactionsWrapUp.rt` | v1+ | Number of interactions in Wrap Up state. Interactions disconnected from customers with agents completing post-interaction administrative work (currently) |
| `longestOfferingTimeInQueue.int-15m` | v1+ | Maximum duration from offer to acceptance or rejection across interactions. Shows the longest time any interaction remained in Offering state during the period (last 15-minutes) |
| `longestOfferingTimeInQueue.int-30m` | v1+ | Maximum duration from offer to acceptance or rejection across interactions. Shows the longest time any interaction remained in Offering state during the period (last 30-minutes) |
| `longestOfferingTimeInQueue.today` | v1+ | Maximum duration from offer to acceptance or rejection across interactions. Shows the longest time any interaction remained in Offering state during the period (current day) |
| `newInQueue.int-15m` | v4+ | Interactions entering queue within specified time interval only. Excludes interactions from previous intervals, showing only freshly entered interactions (last 15-minutes) |
| `newInQueue.int-30m` | v4+ | Interactions entering queue within specified time interval only. Excludes interactions from previous intervals, showing only freshly entered interactions (last 30-minutes) |
| `newInQueue.today` | v4+ | Interactions entering queue within specified time interval only. Excludes interactions from previous intervals, showing only freshly entered interactions (current day) |
| `offering.rt` | v1+ | Number of agents in Offering state. Agents with interactions currently being offered awaiting acceptance or rejection (currently) |
| `onBreak.rt` | v1+ | Enabled agents currently in On Break state. Shows agents logged in and assigned to this queue but temporarily unavailable due to break (currently) |
| `shortAbandoned.int-15m` | v1+ | Number of short abandonments. Interactions ending with customer exit in queue before 5 seconds (last 15-minutes) |
| `shortAbandoned.int-30m` | v1+ | Number of short abandonments. Interactions ending with customer exit in queue before 5 seconds (last 30-minutes) |
| `shortAbandoned.today` | v1+ | Number of short abandonments. Interactions ending with customer exit in queue before 5 seconds (current day) |
| `shortAbandonedPercentage.int-15m` | v1+ | Percentage of short abandonments. Percentage of interactions ending with customer exit in queue before 5 seconds relative to total entries (last 15-minutes) |
| `shortAbandonedPercentage.int-30m` | v1+ | Percentage of short abandonments. Percentage of interactions ending with customer exit in queue before 5 seconds relative to total entries (last 30-minutes) |
| `shortAbandonedPercentage.today` | v1+ | Percentage of short abandonments. Percentage of interactions ending with customer exit in queue before 5 seconds relative to total entries (current day) |
| `slaPercentage.int-12h` | v1+ | Percentage of interactions answered before configured SLA time threshold relative to total entries, excluding short abandonments (last 12-hours) |
| `slaPercentage.int-15m` | v1+ | Percentage of interactions answered before configured SLA time threshold relative to total entries, excluding short abandonments (last 15-minutes) |
| `slaPercentage.int-1h` | v1+ | Percentage of interactions answered before configured SLA time threshold relative to total entries, excluding short abandonments (last 1-hour) |
| `slaPercentage.int-30m` | v1+ | Percentage of interactions answered before configured SLA time threshold relative to total entries, excluding short abandonments (last 30-minutes) |
| `slaPercentage.int-4h` | v1+ | Percentage of interactions answered before configured SLA time threshold relative to total entries, excluding short abandonments (last 4-hours) |
| `slaPercentage.int-8h` | v1+ | Percentage of interactions answered before configured SLA time threshold relative to total entries, excluding short abandonments (last 8-hours) |
| `slaPercentage.today` | v1+ | Percentage of interactions answered before configured SLA time threshold relative to total entries, excluding short abandonments (current day) |
| `slaPercentageTarget.today` | v1+ | The target percentage of interactions that meet the SLA. Shows the goal set for this queue's service level performance |
| `slaTimeThreshold.today` | v1+ | SLA time threshold. Time limit in milliseconds configured for acceptable interaction answering. Maximum duration from queue entry to agent answer for SLA compliance |
| `totalAbandoned.int-15m` | v1+ | All interactions finishing in abandonment including short abandonments. Provides complete picture of both quick and extended abandonments combined (last 15-minutes) |
| `totalAbandoned.int-30m` | v1+ | All interactions finishing in abandonment including short abandonments. Provides complete picture of both quick and extended abandonments combined (last 30-minutes) |
| `totalAbandoned.today` | v1+ | All interactions finishing in abandonment including short abandonments. Provides complete picture of both quick and extended abandonments combined (current day) |
| `totalAbandonedPercentage.int-15m` | v1+ | Percentage of abandoned interactions relative to total entries. Shows the complete abandonment rate including all types of abandonments (last 15-minutes) |
| `totalAbandonedPercentage.int-30m` | v1+ | Percentage of abandoned interactions relative to total entries. Shows the complete abandonment rate including all types of abandonments (last 30-minutes) |
| `totalAbandonedPercentage.today` | v1+ | Percentage of abandoned interactions relative to total entries. Shows the complete abandonment rate including all types of abandonments (current day) |
| `workingOffline.rt` | v1+ | Enabled agents currently in Working Offline state. Represents agents who are logged in and working but not available to receive incoming interactions (currently) |
| `wrapUp.rt` | v1+ | Number of agents in Wrap Up state. Agents completing post-interaction administrative work after finishing handling interactions (currently) |

</details>

### 5.2. Group Metrics Glossary

This glossary provides comprehensive definitions for all metrics available when querying group statistics via the Real-time API. These metrics apply to the following endpoints:

* `GET /realtime-metrics/groups` - All groups statistics
* `GET /realtime-metrics/groups/{id}` - Individual group statistics

<details>
<summary>Click to expand Group Metrics Glossary (7 metrics)</summary>

**Version** indicates minimum Real-time API version where metric became available on this API endpoint.

| Metric | Version | Description |
|--------|---------|-------------|
| `availableIdle.rt` | v1+ | Agents belonging to the agent group who are currently enabled, assigned, and waiting in Available state for interactions. These are agents ready and waiting to receive the next incoming interaction (currently) |
| `eligible.rt` | v1+ | Count of agents in the agent group available to be offered interactions. Eligible agents are those not on break and capable of receiving interactions (currently) |
| `enabled.rt` | v1+ | Count of agents logged in, enabled, and belonging to the specific agent group. Includes all agents belonging to this group regardless of their current status (Available, Busy, Break, etc.) (currently) |
| `handling.rt` | v1+ | Agents in the agent group actively processing interactions, excluding Wrap Up state. Shows only agents currently in the Handling state (currently) |
| `onBreak.rt` | v1+ | Enabled agents in the agent group currently in On Break state. Shows agents logged in and belonging to this group but temporarily unavailable due to break (currently) |
| `workingOffline.rt` | v1+ | Enabled agents in the agent group currently in Working Offline state. Represents agents who are logged in and working but not available to receive incoming interactions (currently) |
| `wrapUp.rt` | v1+ | Number of agents in the agent group in Wrap Up state. Agents completing post-interaction administrative work after finishing handling interactions (currently) |

</details>

### 5.3. Agent Metrics Glossary - Queue Context

This glossary provides comprehensive definitions for all metrics available when querying agent statistics within a queue context via the Real-time API. These metrics apply to the following endpoints:

* `GET /realtime-metrics/queues/{queue-id}/agents` - All agents in a queue
* `GET /realtime-metrics/queues/{queue-id}/agents/{agent-id}` - Individual agent in a queue

**Note on `.inQueue` metrics:** The `.inQueue` suffix indicates that the metric measures agent activity specific to interactions routed through the **current queue**. These metrics exclude agent activity from direct inbound/outbound calls, internal agent-to-agent calls, and other non-queue interactions. Use `.inQueue` metrics to analyze agent performance for the selected queue.

<details>
<summary>Click to expand Agent Metrics Glossary - Queue Context (137 metrics)</summary>

**Version** indicates minimum Real-time API version where metric became available on this API endpoint.

| Metric | Version | Description |
|--------|---------|-------------|
| `accepted.int-15m.inQueue` | v1+ | Total interactions answered by the agent. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent (last 15-minutes) |
| `accepted.int-30m.inQueue` | v1+ | Total interactions answered by the agent. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent (last 30-minutes) |
| `accepted.today.inQueue` | v1+ | Total interactions answered by the agent. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent (current day) |
| `alerting.rt` | v1+ | Number of interactions currently being presented to the agent via a queue or direct assignment (currently) |
| `availableTime.int-15m` | v1+ | Total time the agent spent in Available state, ready to receive incoming interactions (last 15-minutes) |
| `availableTime.int-30m` | v1+ | Total time the agent spent in Available state, ready to receive incoming interactions (last 30-minutes) |
| `availableTime.today` | v1+ | Total time the agent spent in Available state, ready to receive incoming interactions (current day) |
| `availableTimePercentage.int-15m` | v1+ | Percentage of available time relative to total logged-in time. Shows the proportion of total login time the agent spent in Available state ready to receive work (last 15-minutes) |
| `availableTimePercentage.int-30m` | v1+ | Percentage of available time relative to total logged-in time. Shows the proportion of total login time the agent spent in Available state ready to receive work (last 30-minutes) |
| `availableTimePercentage.today` | v1+ | Percentage of available time relative to total logged-in time. Shows the proportion of total login time the agent spent in Available state ready to receive work (current day) |
| `averageHandlingTime.int-15m.inQueue` | v1+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold (last 15-minutes) |
| `averageHandlingTime.int-30m.inQueue` | v1+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold (last 30-minutes) |
| `averageHandlingTime.today.inQueue` | v1+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold (current day) |
| `averageHoldTime.int-15m.inQueue` | v2+ | Average time the agent placed customers on hold (last 15-minutes) |
| `averageHoldTime.int-30m.inQueue` | v2+ | Average time the agent placed customers on hold (last 30-minutes) |
| `averageHoldTime.today.inQueue` | v2+ | Average time the agent placed customers on hold (current day) |
| `averageOfferingTime.int-15m.inQueue` | v1+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it (last 15-minutes) |
| `averageOfferingTime.int-30m.inQueue` | v1+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it (last 30-minutes) |
| `averageOfferingTime.today.inQueue` | v1+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it (current day) |
| `averageWrapUpTime.int-15m.inQueue` | v1+ | Average post-processing time. Time spent by agents completing administrative tasks after finishing handling an interaction (last 15-minutes) |
| `averageWrapUpTime.int-30m.inQueue` | v1+ | Average post-processing time. Time spent by agents completing administrative tasks after finishing handling an interaction (last 30-minutes) |
| `averageWrapUpTime.today.inQueue` | v1+ | Average post-processing time. Time spent by agents completing administrative tasks after finishing handling an interaction (current day) |
| `blindTransfers.int-15m.inQueue` | v1+ | Number of blind transfers performed by the agent. Transfer where agent does not speak to recipient first (last 15-minutes) |
| `blindTransfers.int-30m.inQueue` | v1+ | Number of blind transfers performed by the agent. Transfer where agent does not speak to recipient first (last 30-minutes) |
| `blindTransfers.today.inQueue` | v1+ | Number of blind transfers performed by the agent. Transfer where agent does not speak to recipient first (current day) |
| `busyTime.int-15m` | v1+ | Combined duration the agent spent in Offering, Handling, and Wrap Up states across all activities. Time agent is actively engaged in work activities (last 15-minutes) |
| `busyTime.int-30m` | v1+ | Combined duration the agent spent in Offering, Handling, and Wrap Up states across all activities. Time agent is actively engaged in work activities (last 30-minutes) |
| `busyTime.today` | v1+ | Combined duration the agent spent in Offering, Handling, and Wrap Up states across all activities. Time agent is actively engaged in work activities (current day) |
| `busyTimePercentage.int-15m` | v1+ | Percentage of busy time relative to total logged-in time. Shows proportion of time agent was actively working (last 15-minutes) |
| `busyTimePercentage.int-30m` | v1+ | Percentage of busy time relative to total logged-in time. Shows proportion of time agent was actively working (last 30-minutes) |
| `busyTimePercentage.today` | v1+ | Percentage of busy time relative to total logged-in time. Shows proportion of time agent was actively working (current day) |
| `conferenceTime.int-15m.inQueue` | v1+ | Total cumulative duration the agent spent in multi-party conference calls (last 15-minutes) |
| `conferenceTime.int-30m.inQueue` | v1+ | Total cumulative duration the agent spent in multi-party conference calls (last 30-minutes) |
| `conferenceTime.today.inQueue` | v1+ | Total cumulative duration the agent spent in multi-party conference calls (current day) |
| `conferences.int-15m.inQueue` | v1+ | Total number of conferences established by the agent (last 15-minutes) |
| `conferences.int-30m.inQueue` | v1+ | Total number of conferences established by the agent (last 30-minutes) |
| `conferences.today.inQueue` | v1+ | Total number of conferences established by the agent (current day) |
| `consultations.int-15m.inQueue` | v1+ | Times an agent successfully established an outbound call while another call is on hold (last 15-minutes) |
| `consultations.int-30m.inQueue` | v1+ | Times an agent successfully established an outbound call while another call is on hold (last 30-minutes) |
| `consultations.today.inQueue` | v1+ | Times an agent successfully established an outbound call while another call is on hold (current day) |
| `directInboundTime.int-15m` | v1+ | Total cumulative duration the agent spent on direct inbound calls, excluding agent-to-agent calls (last 15-minutes) |
| `directInboundTime.int-30m` | v1+ | Total cumulative duration the agent spent on direct inbound calls, excluding agent-to-agent calls (last 30-minutes) |
| `directInboundTime.today` | v1+ | Total cumulative duration the agent spent on direct inbound calls, excluding agent-to-agent calls (current day) |
| `directInbounds.int-15m` | v1+ | Total number of direct inbound calls to the agent excluding agent-to-agent calls (last 15-minutes) |
| `directInbounds.int-30m` | v1+ | Total number of direct inbound calls to the agent excluding agent-to-agent calls (last 30-minutes) |
| `directInbounds.today` | v1+ | Total number of direct inbound calls to the agent excluding agent-to-agent calls (current day) |
| `directOutboundTime.int-15m` | v1+ | Total cumulative duration the agent spent on direct outbound calls, excluding outbound queue calls and agent-to-agent calls (last 15-minutes) |
| `directOutboundTime.int-30m` | v1+ | Total cumulative duration the agent spent on direct outbound calls, excluding outbound queue calls and agent-to-agent calls (last 30-minutes) |
| `directOutboundTime.today` | v1+ | Total cumulative duration the agent spent on direct outbound calls, excluding outbound queue calls and agent-to-agent calls (current day) |
| `directOutbounds.int-15m` | v1+ | Number of calls made by the agent excluding outbound queue calls and agent-to-agent calls (last 15-minutes) |
| `directOutbounds.int-30m` | v1+ | Number of calls made by the agent excluding outbound queue calls and agent-to-agent calls (last 30-minutes) |
| `directOutbounds.today` | v1+ | Number of calls made by the agent excluding outbound queue calls and agent-to-agent calls (current day) |
| `handlingTime.int-15m` | v1+ | Total time the agent spent in Handling state, actively processing interactions (last 15-minutes) |
| `handlingTime.int-30m` | v1+ | Total time the agent spent in Handling state, actively processing interactions (last 30-minutes) |
| `handlingTime.today` | v1+ | Total time the agent spent in Handling state, actively processing interactions (current day) |
| `handlingTimePercentage.int-15m` | v1+ | Percentage of handling time relative to total logged-in time. Shows what proportion of total login duration agent spent actively handling interactions (last 15-minutes) |
| `handlingTimePercentage.int-30m` | v1+ | Percentage of handling time relative to total logged-in time. Shows what proportion of total login duration agent spent actively handling interactions (last 30-minutes) |
| `handlingTimePercentage.today` | v1+ | Percentage of handling time relative to total logged-in time. Shows what proportion of total login duration agent spent actively handling interactions (current day) |
| `hold.int-15m.inQueue` | v1+ | Number of occasions the agent placed customers on hold (last 15-minutes) |
| `hold.int-30m.inQueue` | v1+ | Number of occasions the agent placed customers on hold (last 30-minutes) |
| `hold.today.inQueue` | v1+ | Number of occasions the agent placed customers on hold (current day) |
| `internalCalls.int-15m` | v1+ | Total number of agent-to-agent calls initiated or received by the agent (last 15-minutes) |
| `internalCalls.int-30m` | v1+ | Total number of agent-to-agent calls initiated or received by the agent (last 30-minutes) |
| `internalCalls.today` | v1+ | Total number of agent-to-agent calls initiated or received by the agent (current day) |
| `internalCallsInitiated.int-15m` | v1+ | Number of agent-to-agent calls initiated by this agent (last 15-minutes) |
| `internalCallsInitiated.int-30m` | v1+ | Number of agent-to-agent calls initiated by this agent (last 30-minutes) |
| `internalCallsInitiated.today` | v1+ | Number of agent-to-agent calls initiated by this agent (current day) |
| `internalCallsReceived.int-15m` | v1+ | Number of agent-to-agent calls received by this agent (last 15-minutes) |
| `internalCallsReceived.int-30m` | v1+ | Number of agent-to-agent calls received by this agent (last 30-minutes) |
| `internalCallsReceived.today` | v1+ | Number of agent-to-agent calls received by this agent (current day) |
| `internalCallsTime.int-15m` | v1+ | Total cumulative duration the agent spent on agent-to-agent calls, both initiated and received (last 15-minutes) |
| `internalCallsTime.int-30m` | v1+ | Total cumulative duration the agent spent on agent-to-agent calls, both initiated and received (last 30-minutes) |
| `internalCallsTime.today` | v1+ | Total cumulative duration the agent spent on agent-to-agent calls, both initiated and received (current day) |
| `lastLogin.rt` | v1+ | Timestamp representing the agent's most recent login to the system (currently) |
| `lastLogout.rt` | v1+ | Timestamp representing the agent's most recent logout from the system (currently) |
| `line1Status.rt` | v1+ | Current operational status of the agent's first communication line (currently) |
| `line1TimeOnStatus.rt` | v1+ | Time in milliseconds since the agent's first line status last changed (currently) |
| `line2Status.rt` | v1+ | Current operational status of the agent's second communication line (currently) |
| `line2TimeOnStatus.rt` | v1+ | Time in milliseconds since the agent's second line status last changed (currently) |
| `loggedInTime.int-15m` | v1+ | Total time the agent maintained active system connection and was available for work across all queues and activities (last 15-minutes) |
| `loggedInTime.int-30m` | v1+ | Total time the agent maintained active system connection and was available for work across all queues and activities (last 30-minutes) |
| `loggedInTime.rt` | v1+ | Cumulative time the agent has maintained active system connection during their current login session (currently) |
| `loggedInTime.today` | v1+ | Total time the agent maintained active system connection and was available for work across all queues and activities (current day) |
| `longestHold.int-15m.inQueue` | v1+ | Maximum single continuous hold duration when agent placed customer on hold (last 15-minutes) |
| `longestHold.int-30m.inQueue` | v1+ | Maximum single continuous hold duration when agent placed customer on hold (last 30-minutes) |
| `longestHold.today.inQueue` | v1+ | Maximum single continuous hold duration when agent placed customer on hold (current day) |
| `longestOffering.int-15m.inQueue` | v1+ | Maximum duration from when interaction was offered until agent accepted or rejected it. Shows longest time interaction remained in Offering state (last 15-minutes) |
| `longestOffering.int-30m.inQueue` | v1+ | Maximum duration from when interaction was offered until agent accepted or rejected it. Shows longest time interaction remained in Offering state (last 30-minutes) |
| `longestOffering.today.inQueue` | v1+ | Maximum duration from when interaction was offered until agent accepted or rejected it. Shows longest time interaction remained in Offering state (current day) |
| `offered.int-15m.inQueue` | v1+ | Total interactions presented to the agent for acceptance or rejection. Includes interactions continuing from prior intervals (last 15-minutes) |
| `offered.int-30m.inQueue` | v1+ | Total interactions presented to the agent for acceptance or rejection. Includes interactions continuing from prior intervals (last 30-minutes) |
| `offered.today.inQueue` | v1+ | Total interactions presented to the agent for acceptance or rejection. Includes interactions continuing from prior intervals (current day) |
| `offeringTime.int-15m` | v1+ | Total duration the agent spent in Offering state waiting to accept or reject interactions across all activities (last 15-minutes) |
| `offeringTime.int-30m` | v1+ | Total duration the agent spent in Offering state waiting to accept or reject interactions across all activities (last 30-minutes) |
| `offeringTime.today` | v1+ | Total duration the agent spent in Offering state waiting to accept or reject interactions across all activities (current day) |
| `onBreakTime.int-15m` | v1+ | Total duration the agent spent in On Break status, temporarily unavailable to receive new interactions (last 15-minutes) |
| `onBreakTime.int-30m` | v1+ | Total duration the agent spent in On Break status, temporarily unavailable to receive new interactions (last 30-minutes) |
| `onBreakTime.today` | v1+ | Total duration the agent spent in On Break status, temporarily unavailable to receive new interactions (current day) |
| `onBreakTimePercentage.int-15m` | v1+ | Percentage of break time relative to total logged-in time. Shows what proportion of login duration agent spent on break (last 15-minutes) |
| `onBreakTimePercentage.int-30m` | v1+ | Percentage of break time relative to total logged-in time. Shows what proportion of login duration agent spent on break (last 30-minutes) |
| `onBreakTimePercentage.today` | v1+ | Percentage of break time relative to total logged-in time. Shows what proportion of login duration agent spent on break (current day) |
| `onHoldTime.int-15m.inQueue` | v1+ | Total duration the agent kept customers on hold. Sum of all hold periods (last 15-minutes) |
| `onHoldTime.int-30m.inQueue` | v1+ | Total duration the agent kept customers on hold. Sum of all hold periods (last 30-minutes) |
| `onHoldTime.today.inQueue` | v1+ | Total duration the agent kept customers on hold. Sum of all hold periods (current day) |
| `rejectTimeout.int-15m.inQueue` | v1+ | Count of interactions automatically rejected when agent did not respond within configured timeout period (last 15-minutes) |
| `rejectTimeout.int-30m.inQueue` | v1+ | Count of interactions automatically rejected when agent did not respond within configured timeout period (last 30-minutes) |
| `rejectTimeout.today.inQueue` | v1+ | Count of interactions automatically rejected when agent did not respond within configured timeout period (current day) |
| `rejected.int-15m.inQueue` | v1+ | Count of interactions manually declined by agent when interaction was offered. Agent explicitly rejected the offer (last 15-minutes) |
| `rejected.int-30m.inQueue` | v1+ | Count of interactions manually declined by agent when interaction was offered. Agent explicitly rejected the offer (last 30-minutes) |
| `rejected.today.inQueue` | v1+ | Count of interactions manually declined by agent when interaction was offered. Agent explicitly rejected the offer (current day) |
| `status.rt` | v1+ | Agent's current operational state showing system status. Examples: Available, Handling, OnBreak, LoggedOut, WorkingOffline (currently) |
| `statusCode.rt` | v1+ | Specific reason code that justifies or details the agent's current operational status (currently) |
| `timeOnStatus.rt` | v1+ | Elapsed duration in milliseconds showing how long the agent has maintained their current operational status (currently) |
| `transfersInitiated.int-15m.inQueue` | v2+ | Warm and blind transfers initiated by the agent. All outgoing transfers (last 15-minutes) |
| `transfersInitiated.int-30m.inQueue` | v2+ | Warm and blind transfers initiated by the agent. All outgoing transfers (last 30-minutes) |
| `transfersInitiated.today.inQueue` | v2+ | Warm and blind transfers initiated by the agent. All outgoing transfers (current day) |
| `transfersInitiatedPercentage.int-15m.inQueue` | v2+ | Percentage of interactions transferred by the agent, calculated relative to total interactions accepted (last 15-minutes) |
| `transfersInitiatedPercentage.int-30m.inQueue` | v2+ | Percentage of interactions transferred by the agent, calculated relative to total interactions accepted (last 30-minutes) |
| `transfersInitiatedPercentage.today.inQueue` | v2+ | Percentage of interactions transferred by the agent, calculated relative to total interactions accepted (current day) |
| `transfersReceived.int-15m.inQueue` | v1+ | Warm and blind transfers routed to agent for handling. All incoming transfers (last 15-minutes) |
| `transfersReceived.int-30m.inQueue` | v1+ | Warm and blind transfers routed to agent for handling. All incoming transfers (last 30-minutes) |
| `transfersReceived.today.inQueue` | v1+ | Warm and blind transfers routed to agent for handling. All incoming transfers (current day) |
| `warmTransfers.int-15m.inQueue` | v1+ | Number of warm transfers performed by the agent. Transfer where agent spoke to recipient first (last 15-minutes) |
| `warmTransfers.int-30m.inQueue` | v1+ | Number of warm transfers performed by the agent. Transfer where agent spoke to recipient first (last 30-minutes) |
| `warmTransfers.today.inQueue` | v1+ | Number of warm transfers performed by the agent. Transfer where agent spoke to recipient first (current day) |
| `workingOfflineTime.int-15m` | v1+ | Total duration the agent spent in Working Offline status performing non-interactive work. Agent not available to receive new interactions (last 15-minutes) |
| `workingOfflineTime.int-30m` | v1+ | Total duration the agent spent in Working Offline status performing non-interactive work. Agent not available to receive new interactions (last 30-minutes) |
| `workingOfflineTime.today` | v1+ | Total duration the agent spent in Working Offline status performing non-interactive work. Agent not available to receive new interactions (current day) |
| `workingOfflineTimePercentage.int-15m` | v1+ | Percentage of offline work time relative to total logged-in time. Shows what proportion of login duration agent spent in Working Offline status (last 15-minutes) |
| `workingOfflineTimePercentage.int-30m` | v1+ | Percentage of offline work time relative to total logged-in time. Shows what proportion of login duration agent spent in Working Offline status (last 30-minutes) |
| `workingOfflineTimePercentage.today` | v1+ | Percentage of offline work time relative to total logged-in time. Shows what proportion of login duration agent spent in Working Offline status (current day) |
| `wrapUpTime.int-15m` | v1+ | Total duration the agent spent in Wrap Up state completing post-interaction administrative tasks across all activities after disconnecting from customer (last 15-minutes) |
| `wrapUpTime.int-30m` | v1+ | Total duration the agent spent in Wrap Up state completing post-interaction administrative tasks across all activities after disconnecting from customer (last 30-minutes) |
| `wrapUpTime.today` | v1+ | Total duration the agent spent in Wrap Up state completing post-interaction administrative tasks across all activities after disconnecting from customer (current day) |
| `wrapUpTimePercentage.int-15m` | v1+ | Percentage of wrap-up time relative to total logged-in time. Shows what proportion of login duration agent spent finalizing interactions in Wrap Up state (last 15-minutes) |
| `wrapUpTimePercentage.int-30m` | v1+ | Percentage of wrap-up time relative to total logged-in time. Shows what proportion of login duration agent spent finalizing interactions in Wrap Up state (last 30-minutes) |
| `wrapUpTimePercentage.today` | v1+ | Percentage of wrap-up time relative to total logged-in time. Shows what proportion of login duration agent spent finalizing interactions in Wrap Up state (current day) |

</details>

### 5.4. Agent Metrics Glossary - Group Context

This glossary provides comprehensive definitions for all metrics available when querying agent statistics within a group context via the Real-time API. These metrics apply to the following endpoints:

* `GET /realtime-metrics/groups/{group-id}/agents` - All agents in a group
* `GET /realtime-metrics/groups/{group-id}/agents/{agent-id}` - Individual agent in a group

<details>
<summary>Click to expand Agent Metrics Glossary - Group Context (141 metrics)</summary>

**Version** indicates minimum Real-time API version where metric became available on this API endpoint.

| Metric | Version | Description |
|--------|---------|-------------|
| `accepted.int-15m` | v1+ | Total interactions answered by the agent. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent (last 15-minutes) |
| `accepted.int-30m` | v1+ | Total interactions answered by the agent. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent (last 30-minutes) |
| `accepted.today` | v1+ | Total interactions answered by the agent. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent (current day) |
| `activeChannels.rt` | v1+ | List of communication channels with interactions where the agent is actively engaged (Offering, Handling, or Wrap Up state), showing channel name and count of such interactions in each channel (currently) |
| `activeDirections.rt` | v1+ | List of interaction directions (Inbound, Outbound) with interactions where the agent is actively engaged (Offering, Handling, or Wrap Up state), showing direction and count of such interactions in each direction (currently) |
| `activeInteractionsCount.rt` | v1+ | Total number of interactions where the agent is actively engaged (Offering, Handling, or Wrap Up state) across all queues, channels, and directions (currently) |
| `activeQueues.rt` | v1+ | List of queues with interactions where the agent is actively engaged (Offering, Handling, or Wrap Up state), showing queue name and count of such interactions in each queue (currently) |
| `alerting.rt` | v1+ | Number of interactions currently being presented to the agent via a queue or direct assignment (currently) |
| `availableTime.int-15m` | v1+ | Total time the agent spent in Available state, ready to receive incoming interactions (last 15-minutes) |
| `availableTime.int-30m` | v1+ | Total time the agent spent in Available state, ready to receive incoming interactions (last 30-minutes) |
| `availableTime.today` | v1+ | Total time the agent spent in Available state, ready to receive incoming interactions (current day) |
| `availableTimePercentage.int-15m` | v1+ | Percentage of available time relative to total logged-in time. Shows the proportion of total login time the agent spent in Available state ready to receive work (last 15-minutes) |
| `availableTimePercentage.int-30m` | v1+ | Percentage of available time relative to total logged-in time. Shows the proportion of total login time the agent spent in Available state ready to receive work (last 30-minutes) |
| `availableTimePercentage.today` | v1+ | Percentage of available time relative to total logged-in time. Shows the proportion of total login time the agent spent in Available state ready to receive work (current day) |
| `averageHandlingTime.int-15m` | v1+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold (last 15-minutes) |
| `averageHandlingTime.int-30m` | v1+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold (last 30-minutes) |
| `averageHandlingTime.today` | v1+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold (current day) |
| `averageHoldTime.int-15m` | v2+ | Average time the agent placed customers on hold (last 15-minutes) |
| `averageHoldTime.int-30m` | v2+ | Average time the agent placed customers on hold (last 30-minutes) |
| `averageHoldTime.today` | v2+ | Average time the agent placed customers on hold (current day) |
| `averageOfferingTime.int-15m` | v1+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it (last 15-minutes) |
| `averageOfferingTime.int-30m` | v1+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it (last 30-minutes) |
| `averageOfferingTime.today` | v1+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it (current day) |
| `averageWrapUpTime.int-15m` | v1+ | Average post-processing time. Time spent by agents completing administrative tasks after finishing handling an interaction (last 15-minutes) |
| `averageWrapUpTime.int-30m` | v1+ | Average post-processing time. Time spent by agents completing administrative tasks after finishing handling an interaction (last 30-minutes) |
| `averageWrapUpTime.today` | v1+ | Average post-processing time. Time spent by agents completing administrative tasks after finishing handling an interaction (current day) |
| `blindTransfers.int-15m` | v1+ | Number of blind transfers performed by the agent. Transfer where agent does not speak to recipient first (last 15-minutes) |
| `blindTransfers.int-30m` | v1+ | Number of blind transfers performed by the agent. Transfer where agent does not speak to recipient first (last 30-minutes) |
| `blindTransfers.today` | v1+ | Number of blind transfers performed by the agent. Transfer where agent does not speak to recipient first (current day) |
| `busyTime.int-15m` | v1+ | Combined duration the agent spent in Offering, Handling, and Wrap Up states across all activities. Time agent is actively engaged in work activities (last 15-minutes) |
| `busyTime.int-30m` | v1+ | Combined duration the agent spent in Offering, Handling, and Wrap Up states across all activities. Time agent is actively engaged in work activities (last 30-minutes) |
| `busyTime.today` | v1+ | Combined duration the agent spent in Offering, Handling, and Wrap Up states across all activities. Time agent is actively engaged in work activities (current day) |
| `busyTimePercentage.int-15m` | v1+ | Percentage of busy time relative to total logged-in time. Shows proportion of time agent was actively working (last 15-minutes) |
| `busyTimePercentage.int-30m` | v1+ | Percentage of busy time relative to total logged-in time. Shows proportion of time agent was actively working (last 30-minutes) |
| `busyTimePercentage.today` | v1+ | Percentage of busy time relative to total logged-in time. Shows proportion of time agent was actively working (current day) |
| `conferenceTime.int-15m` | v1+ | Total cumulative duration the agent spent in multi-party conference calls (last 15-minutes) |
| `conferenceTime.int-30m` | v1+ | Total cumulative duration the agent spent in multi-party conference calls (last 30-minutes) |
| `conferenceTime.today` | v1+ | Total cumulative duration the agent spent in multi-party conference calls (current day) |
| `conferences.int-15m` | v1+ | Total number of conferences established by the agent (last 15-minutes) |
| `conferences.int-30m` | v1+ | Total number of conferences established by the agent (last 30-minutes) |
| `conferences.today` | v1+ | Total number of conferences established by the agent (current day) |
| `consultations.int-15m` | v1+ | Times an agent successfully established an outbound call while another call is on hold (last 15-minutes) |
| `consultations.int-30m` | v1+ | Times an agent successfully established an outbound call while another call is on hold (last 30-minutes) |
| `consultations.today` | v1+ | Times an agent successfully established an outbound call while another call is on hold (current day) |
| `directInboundTime.int-15m` | v1+ | Total cumulative duration the agent spent on direct inbound calls, excluding agent-to-agent calls (last 15-minutes) |
| `directInboundTime.int-30m` | v1+ | Total cumulative duration the agent spent on direct inbound calls, excluding agent-to-agent calls (last 30-minutes) |
| `directInboundTime.today` | v1+ | Total cumulative duration the agent spent on direct inbound calls, excluding agent-to-agent calls (current day) |
| `directInbounds.int-15m` | v1+ | Total number of direct inbound calls to the agent excluding agent-to-agent calls (last 15-minutes) |
| `directInbounds.int-30m` | v1+ | Total number of direct inbound calls to the agent excluding agent-to-agent calls (last 30-minutes) |
| `directInbounds.today` | v1+ | Total number of direct inbound calls to the agent excluding agent-to-agent calls (current day) |
| `directOutboundTime.int-15m` | v1+ | Total cumulative duration the agent spent on direct outbound calls, excluding outbound queue calls and agent-to-agent calls (last 15-minutes) |
| `directOutboundTime.int-30m` | v1+ | Total cumulative duration the agent spent on direct outbound calls, excluding outbound queue calls and agent-to-agent calls (last 30-minutes) |
| `directOutboundTime.today` | v1+ | Total cumulative duration the agent spent on direct outbound calls, excluding outbound queue calls and agent-to-agent calls (current day) |
| `directOutbounds.int-15m` | v1+ | Number of calls made by the agent excluding outbound queue calls and agent-to-agent calls (last 15-minutes) |
| `directOutbounds.int-30m` | v1+ | Number of calls made by the agent excluding outbound queue calls and agent-to-agent calls (last 30-minutes) |
| `directOutbounds.today` | v1+ | Number of calls made by the agent excluding outbound queue calls and agent-to-agent calls (current day) |
| `handlingTime.int-15m` | v1+ | Total time the agent spent in Handling state, actively processing interactions (last 15-minutes) |
| `handlingTime.int-30m` | v1+ | Total time the agent spent in Handling state, actively processing interactions (last 30-minutes) |
| `handlingTime.today` | v1+ | Total time the agent spent in Handling state, actively processing interactions (current day) |
| `handlingTimePercentage.int-15m` | v1+ | Percentage of handling time relative to total logged-in time. Shows what proportion of total login duration agent spent actively handling interactions (last 15-minutes) |
| `handlingTimePercentage.int-30m` | v1+ | Percentage of handling time relative to total logged-in time. Shows what proportion of total login duration agent spent actively handling interactions (last 30-minutes) |
| `handlingTimePercentage.today` | v1+ | Percentage of handling time relative to total logged-in time. Shows what proportion of total login duration agent spent actively handling interactions (current day) |
| `hold.int-15m` | v1+ | Number of occasions the agent placed customers on hold (last 15-minutes) |
| `hold.int-30m` | v1+ | Number of occasions the agent placed customers on hold (last 30-minutes) |
| `hold.today` | v1+ | Number of occasions the agent placed customers on hold (current day) |
| `internalCalls.int-15m` | v1+ | Total number of agent-to-agent calls initiated or received by the agent (last 15-minutes) |
| `internalCalls.int-30m` | v1+ | Total number of agent-to-agent calls initiated or received by the agent (last 30-minutes) |
| `internalCalls.today` | v1+ | Total number of agent-to-agent calls initiated or received by the agent (current day) |
| `internalCallsInitiated.int-15m` | v1+ | Number of agent-to-agent calls initiated by this agent (last 15-minutes) |
| `internalCallsInitiated.int-30m` | v1+ | Number of agent-to-agent calls initiated by this agent (last 30-minutes) |
| `internalCallsInitiated.today` | v1+ | Number of agent-to-agent calls initiated by this agent (current day) |
| `internalCallsReceived.int-15m` | v1+ | Number of agent-to-agent calls received by this agent (last 15-minutes) |
| `internalCallsReceived.int-30m` | v1+ | Number of agent-to-agent calls received by this agent (last 30-minutes) |
| `internalCallsReceived.today` | v1+ | Number of agent-to-agent calls received by this agent (current day) |
| `internalCallsTime.int-15m` | v1+ | Total cumulative duration the agent spent on agent-to-agent calls, both initiated and received (last 15-minutes) |
| `internalCallsTime.int-30m` | v1+ | Total cumulative duration the agent spent on agent-to-agent calls, both initiated and received (last 30-minutes) |
| `internalCallsTime.today` | v1+ | Total cumulative duration the agent spent on agent-to-agent calls, both initiated and received (current day) |
| `lastLogin.rt` | v1+ | Timestamp representing the agent's most recent login to the system (currently) |
| `lastLogout.rt` | v1+ | Timestamp representing the agent's most recent logout from the system (currently) |
| `line1Status.rt` | v1+ | Current operational status of the agent's first communication line (currently) |
| `line1TimeOnStatus.rt` | v1+ | Time in milliseconds since the agent's first line status last changed (currently) |
| `line2Status.rt` | v1+ | Current operational status of the agent's second communication line (currently) |
| `line2TimeOnStatus.rt` | v1+ | Time in milliseconds since the agent's second line status last changed (currently) |
| `loggedInTime.int-15m` | v1+ | Total time the agent maintained active system connection and was available for work across all queues and activities (last 15-minutes) |
| `loggedInTime.int-30m` | v1+ | Total time the agent maintained active system connection and was available for work across all queues and activities (last 30-minutes) |
| `loggedInTime.rt` | v1+ | Cumulative time the agent has maintained active system connection during their current login session (currently) |
| `loggedInTime.today` | v1+ | Total time the agent maintained active system connection and was available for work across all queues and activities (current day) |
| `longestHold.int-15m` | v1+ | Maximum single continuous hold duration when agent placed customer on hold (last 15-minutes) |
| `longestHold.int-30m` | v1+ | Maximum single continuous hold duration when agent placed customer on hold (last 30-minutes) |
| `longestHold.today` | v1+ | Maximum single continuous hold duration when agent placed customer on hold (current day) |
| `longestOffering.int-15m` | v1+ | Maximum duration from when interaction was offered until agent accepted or rejected it. Shows longest time interaction remained in Offering state (last 15-minutes) |
| `longestOffering.int-30m` | v1+ | Maximum duration from when interaction was offered until agent accepted or rejected it. Shows longest time interaction remained in Offering state (last 30-minutes) |
| `longestOffering.today` | v1+ | Maximum duration from when interaction was offered until agent accepted or rejected it. Shows longest time interaction remained in Offering state (current day) |
| `offered.int-15m` | v1+ | Total interactions presented to the agent for acceptance or rejection. Includes interactions continuing from prior intervals (last 15-minutes) |
| `offered.int-30m` | v1+ | Total interactions presented to the agent for acceptance or rejection. Includes interactions continuing from prior intervals (last 30-minutes) |
| `offered.today` | v1+ | Total interactions presented to the agent for acceptance or rejection. Includes interactions continuing from prior intervals (current day) |
| `offeringTime.int-15m` | v1+ | Total duration the agent spent in Offering state waiting to accept or reject interactions across all activities (last 15-minutes) |
| `offeringTime.int-30m` | v1+ | Total duration the agent spent in Offering state waiting to accept or reject interactions across all activities (last 30-minutes) |
| `offeringTime.today` | v1+ | Total duration the agent spent in Offering state waiting to accept or reject interactions across all activities (current day) |
| `onBreakTime.int-15m` | v1+ | Total duration the agent spent in On Break status, temporarily unavailable to receive new interactions (last 15-minutes) |
| `onBreakTime.int-30m` | v1+ | Total duration the agent spent in On Break status, temporarily unavailable to receive new interactions (last 30-minutes) |
| `onBreakTime.today` | v1+ | Total duration the agent spent in On Break status, temporarily unavailable to receive new interactions (current day) |
| `onBreakTimePercentage.int-15m` | v1+ | Percentage of break time relative to total logged-in time. Shows what proportion of login duration agent spent on break (last 15-minutes) |
| `onBreakTimePercentage.int-30m` | v1+ | Percentage of break time relative to total logged-in time. Shows what proportion of login duration agent spent on break (last 30-minutes) |
| `onBreakTimePercentage.today` | v1+ | Percentage of break time relative to total logged-in time. Shows what proportion of login duration agent spent on break (current day) |
| `onHoldTime.int-15m` | v1+ | Total duration the agent kept customers on hold. Sum of all hold periods (last 15-minutes) |
| `onHoldTime.int-30m` | v1+ | Total duration the agent kept customers on hold. Sum of all hold periods (last 30-minutes) |
| `onHoldTime.today` | v1+ | Total duration the agent kept customers on hold. Sum of all hold periods (current day) |
| `rejectTimeout.int-15m` | v1+ | Count of interactions automatically rejected when agent did not respond within configured timeout period (last 15-minutes) |
| `rejectTimeout.int-30m` | v1+ | Count of interactions automatically rejected when agent did not respond within configured timeout period (last 30-minutes) |
| `rejectTimeout.today` | v1+ | Count of interactions automatically rejected when agent did not respond within configured timeout period (current day) |
| `rejected.int-15m` | v1+ | Count of interactions manually declined by agent when interaction was offered. Agent explicitly rejected the offer (last 15-minutes) |
| `rejected.int-30m` | v1+ | Count of interactions manually declined by agent when interaction was offered. Agent explicitly rejected the offer (last 30-minutes) |
| `rejected.today` | v1+ | Count of interactions manually declined by agent when interaction was offered. Agent explicitly rejected the offer (current day) |
| `status.rt` | v1+ | Agent's current operational state showing system status. Examples: Available, Handling, OnBreak, LoggedOut, WorkingOffline (currently) |
| `statusCode.rt` | v1+ | Specific reason code that justifies or details the agent's current operational status (currently) |
| `timeOnStatus.rt` | v1+ | Elapsed duration in milliseconds showing how long the agent has maintained their current operational status (currently) |
| `transfersInitiated.int-15m` | v2+ | Warm and blind transfers initiated by the agent. All outgoing transfers (last 15-minutes) |
| `transfersInitiated.int-30m` | v2+ | Warm and blind transfers initiated by the agent. All outgoing transfers (last 30-minutes) |
| `transfersInitiated.today` | v2+ | Warm and blind transfers initiated by the agent. All outgoing transfers (current day) |
| `transfersInitiatedPercentage.int-15m` | v2+ | Percentage of interactions transferred by the agent, calculated relative to total interactions accepted (last 15-minutes) |
| `transfersInitiatedPercentage.int-30m` | v2+ | Percentage of interactions transferred by the agent, calculated relative to total interactions accepted (last 30-minutes) |
| `transfersInitiatedPercentage.today` | v2+ | Percentage of interactions transferred by the agent, calculated relative to total interactions accepted (current day) |
| `transfersReceived.int-15m` | v1+ | Warm and blind transfers routed to agent for handling. All incoming transfers (last 15-minutes) |
| `transfersReceived.int-30m` | v1+ | Warm and blind transfers routed to agent for handling. All incoming transfers (last 30-minutes) |
| `transfersReceived.today` | v1+ | Warm and blind transfers routed to agent for handling. All incoming transfers (current day) |
| `warmTransfers.int-15m` | v1+ | Number of warm transfers performed by the agent. Transfer where agent spoke to recipient first (last 15-minutes) |
| `warmTransfers.int-30m` | v1+ | Number of warm transfers performed by the agent. Transfer where agent spoke to recipient first (last 30-minutes) |
| `warmTransfers.today` | v1+ | Number of warm transfers performed by the agent. Transfer where agent spoke to recipient first (current day) |
| `workingOfflineTime.int-15m` | v1+ | Total duration the agent spent in Working Offline status performing non-interactive work. Agent not available to receive new interactions (last 15-minutes) |
| `workingOfflineTime.int-30m` | v1+ | Total duration the agent spent in Working Offline status performing non-interactive work. Agent not available to receive new interactions (last 30-minutes) |
| `workingOfflineTime.today` | v1+ | Total duration the agent spent in Working Offline status performing non-interactive work. Agent not available to receive new interactions (current day) |
| `workingOfflineTimePercentage.int-15m` | v1+ | Percentage of offline work time relative to total logged-in time. Shows what proportion of login duration agent spent in Working Offline status (last 15-minutes) |
| `workingOfflineTimePercentage.int-30m` | v1+ | Percentage of offline work time relative to total logged-in time. Shows what proportion of login duration agent spent in Working Offline status (last 30-minutes) |
| `workingOfflineTimePercentage.today` | v1+ | Percentage of offline work time relative to total logged-in time. Shows what proportion of login duration agent spent in Working Offline status (current day) |
| `wrapUpTime.int-15m` | v1+ | Total duration the agent spent in Wrap Up state completing post-interaction administrative tasks across all activities after disconnecting from customer (last 15-minutes) |
| `wrapUpTime.int-30m` | v1+ | Total duration the agent spent in Wrap Up state completing post-interaction administrative tasks across all activities after disconnecting from customer (last 30-minutes) |
| `wrapUpTime.today` | v1+ | Total duration the agent spent in Wrap Up state completing post-interaction administrative tasks across all activities after disconnecting from customer (current day) |
| `wrapUpTimePercentage.int-15m` | v1+ | Percentage of wrap-up time relative to total logged-in time. Shows what proportion of login duration agent spent finalizing interactions in Wrap Up state (last 15-minutes) |
| `wrapUpTimePercentage.int-30m` | v1+ | Percentage of wrap-up time relative to total logged-in time. Shows what proportion of login duration agent spent finalizing interactions in Wrap Up state (last 30-minutes) |
| `wrapUpTimePercentage.today` | v1+ | Percentage of wrap-up time relative to total logged-in time. Shows what proportion of login duration agent spent finalizing interactions in Wrap Up state (current day) |

</details>

### 5.5. Agent Metrics Glossary - All Agents

This glossary provides comprehensive definitions for all metrics available when querying agent statistics for all agents at once via the Real-time API. These metrics apply to the following endpoints:

* `GET /realtime-metrics/agents` - All agents in the tenant
* `GET /realtime-metrics/agents?agent-ids={agent-id}` - Specific agents in the tenant

<details>
<summary>Click to expand Agent Metrics Glossary - All Agents (141 metrics)</summary>

**Version** indicates minimum Real-time API version where metric became available on this API endpoint.

| Metric | Version | Description |
|--------|---------|-------------|
| `accepted.int-15m` | v5+ | Total interactions answered by the agent. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent (last 15-minutes) |
| `accepted.int-30m` | v5+ | Total interactions answered by the agent. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent (last 30-minutes) |
| `accepted.today` | v5+ | Total interactions answered by the agent. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent (current day) |
| `activeChannels.rt` | v5+ | List of communication channels with interactions where the agent is actively engaged (Offering, Handling, or Wrap Up state), showing channel name and count of such interactions in each channel (currently) |
| `activeDirections.rt` | v5+ | List of interaction directions (Inbound, Outbound) with interactions where the agent is actively engaged (Offering, Handling, or Wrap Up state), showing direction and count of such interactions in each direction (currently) |
| `activeInteractionsCount.rt` | v5+ | Total number of interactions where the agent is actively engaged (Offering, Handling, or Wrap Up state) across all queues, channels, and directions (currently) |
| `activeQueues.rt` | v5+ | List of queues with interactions where the agent is actively engaged (Offering, Handling, or Wrap Up state), showing queue name and count of such interactions in each queue (currently) |
| `alerting.rt` | v5+ | Number of interactions currently being presented to the agent via a queue or direct assignment (currently) |
| `availableTime.int-15m` | v5+ | Total time the agent spent in Available state, ready to receive incoming interactions (last 15-minutes) |
| `availableTime.int-30m` | v5+ | Total time the agent spent in Available state, ready to receive incoming interactions (last 30-minutes) |
| `availableTime.today` | v5+ | Total time the agent spent in Available state, ready to receive incoming interactions (current day) |
| `availableTimePercentage.int-15m` | v5+ | Percentage of available time relative to total logged-in time. Shows the proportion of total login time the agent spent in Available state ready to receive work (last 15-minutes) |
| `availableTimePercentage.int-30m` | v5+ | Percentage of available time relative to total logged-in time. Shows the proportion of total login time the agent spent in Available state ready to receive work (last 30-minutes) |
| `availableTimePercentage.today` | v5+ | Percentage of available time relative to total logged-in time. Shows the proportion of total login time the agent spent in Available state ready to receive work (current day) |
| `averageHandlingTime.int-15m` | v5+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold (last 15-minutes) |
| `averageHandlingTime.int-30m` | v5+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold (last 30-minutes) |
| `averageHandlingTime.today` | v5+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold (current day) |
| `averageHoldTime.int-15m` | v5+ | Average time the agent placed customers on hold (last 15-minutes) |
| `averageHoldTime.int-30m` | v5+ | Average time the agent placed customers on hold (last 30-minutes) |
| `averageHoldTime.today` | v5+ | Average time the agent placed customers on hold (current day) |
| `averageOfferingTime.int-15m` | v5+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it (last 15-minutes) |
| `averageOfferingTime.int-30m` | v5+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it (last 30-minutes) |
| `averageOfferingTime.today` | v5+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it (current day) |
| `averageWrapUpTime.int-15m` | v5+ | Average post-processing time. Time spent by agents completing administrative tasks after finishing handling an interaction (last 15-minutes) |
| `averageWrapUpTime.int-30m` | v5+ | Average post-processing time. Time spent by agents completing administrative tasks after finishing handling an interaction (last 30-minutes) |
| `averageWrapUpTime.today` | v5+ | Average post-processing time. Time spent by agents completing administrative tasks after finishing handling an interaction (current day) |
| `blindTransfers.int-15m` | v5+ | Number of blind transfers performed by the agent. Transfer where agent does not speak to recipient first (last 15-minutes) |
| `blindTransfers.int-30m` | v5+ | Number of blind transfers performed by the agent. Transfer where agent does not speak to recipient first (last 30-minutes) |
| `blindTransfers.today` | v5+ | Number of blind transfers performed by the agent. Transfer where agent does not speak to recipient first (current day) |
| `busyTime.int-15m` | v5+ | Combined duration the agent spent in Offering, Handling, and Wrap Up states across all activities. Time agent is actively engaged in work activities (last 15-minutes) |
| `busyTime.int-30m` | v5+ | Combined duration the agent spent in Offering, Handling, and Wrap Up states across all activities. Time agent is actively engaged in work activities (last 30-minutes) |
| `busyTime.today` | v5+ | Combined duration the agent spent in Offering, Handling, and Wrap Up states across all activities. Time agent is actively engaged in work activities (current day) |
| `busyTimePercentage.int-15m` | v5+ | Percentage of busy time relative to total logged-in time. Shows proportion of time agent was actively working (last 15-minutes) |
| `busyTimePercentage.int-30m` | v5+ | Percentage of busy time relative to total logged-in time. Shows proportion of time agent was actively working (last 30-minutes) |
| `busyTimePercentage.today` | v5+ | Percentage of busy time relative to total logged-in time. Shows proportion of time agent was actively working (current day) |
| `conferenceTime.int-15m` | v5+ | Total cumulative duration the agent spent in multi-party conference calls (last 15-minutes) |
| `conferenceTime.int-30m` | v5+ | Total cumulative duration the agent spent in multi-party conference calls (last 30-minutes) |
| `conferenceTime.today` | v5+ | Total cumulative duration the agent spent in multi-party conference calls (current day) |
| `conferences.int-15m` | v5+ | Total number of conferences established by the agent (last 15-minutes) |
| `conferences.int-30m` | v5+ | Total number of conferences established by the agent (last 30-minutes) |
| `conferences.today` | v5+ | Total number of conferences established by the agent (current day) |
| `consultations.int-15m` | v5+ | Times an agent successfully established an outbound call while another call is on hold (last 15-minutes) |
| `consultations.int-30m` | v5+ | Times an agent successfully established an outbound call while another call is on hold (last 30-minutes) |
| `consultations.today` | v5+ | Times an agent successfully established an outbound call while another call is on hold (current day) |
| `directInboundTime.int-15m` | v5+ | Total cumulative duration the agent spent on direct inbound calls, excluding agent-to-agent calls (last 15-minutes) |
| `directInboundTime.int-30m` | v5+ | Total cumulative duration the agent spent on direct inbound calls, excluding agent-to-agent calls (last 30-minutes) |
| `directInboundTime.today` | v5+ | Total cumulative duration the agent spent on direct inbound calls, excluding agent-to-agent calls (current day) |
| `directInbounds.int-15m` | v5+ | Total number of direct inbound calls to the agent excluding agent-to-agent calls (last 15-minutes) |
| `directInbounds.int-30m` | v5+ | Total number of direct inbound calls to the agent excluding agent-to-agent calls (last 30-minutes) |
| `directInbounds.today` | v5+ | Total number of direct inbound calls to the agent excluding agent-to-agent calls (current day) |
| `directOutboundTime.int-15m` | v5+ | Total cumulative duration the agent spent on direct outbound calls, excluding outbound queue calls and agent-to-agent calls (last 15-minutes) |
| `directOutboundTime.int-30m` | v5+ | Total cumulative duration the agent spent on direct outbound calls, excluding outbound queue calls and agent-to-agent calls (last 30-minutes) |
| `directOutboundTime.today` | v5+ | Total cumulative duration the agent spent on direct outbound calls, excluding outbound queue calls and agent-to-agent calls (current day) |
| `directOutbounds.int-15m` | v5+ | Number of calls made by the agent excluding outbound queue calls and agent-to-agent calls (last 15-minutes) |
| `directOutbounds.int-30m` | v5+ | Number of calls made by the agent excluding outbound queue calls and agent-to-agent calls (last 30-minutes) |
| `directOutbounds.today` | v5+ | Number of calls made by the agent excluding outbound queue calls and agent-to-agent calls (current day) |
| `handlingTime.int-15m` | v5+ | Total time the agent spent in Handling state, actively processing interactions (last 15-minutes) |
| `handlingTime.int-30m` | v5+ | Total time the agent spent in Handling state, actively processing interactions (last 30-minutes) |
| `handlingTime.today` | v5+ | Total time the agent spent in Handling state, actively processing interactions (current day) |
| `handlingTimePercentage.int-15m` | v5+ | Percentage of handling time relative to total logged-in time. Shows what proportion of total login duration agent spent actively handling interactions (last 15-minutes) |
| `handlingTimePercentage.int-30m` | v5+ | Percentage of handling time relative to total logged-in time. Shows what proportion of total login duration agent spent actively handling interactions (last 30-minutes) |
| `handlingTimePercentage.today` | v5+ | Percentage of handling time relative to total logged-in time. Shows what proportion of total login duration agent spent actively handling interactions (current day) |
| `hold.int-15m` | v5+ | Number of occasions the agent placed customers on hold (last 15-minutes) |
| `hold.int-30m` | v5+ | Number of occasions the agent placed customers on hold (last 30-minutes) |
| `hold.today` | v5+ | Number of occasions the agent placed customers on hold (current day) |
| `internalCalls.int-15m` | v5+ | Total number of agent-to-agent calls initiated or received by the agent (last 15-minutes) |
| `internalCalls.int-30m` | v5+ | Total number of agent-to-agent calls initiated or received by the agent (last 30-minutes) |
| `internalCalls.today` | v5+ | Total number of agent-to-agent calls initiated or received by the agent (current day) |
| `internalCallsInitiated.int-15m` | v5+ | Number of agent-to-agent calls initiated by this agent (last 15-minutes) |
| `internalCallsInitiated.int-30m` | v5+ | Number of agent-to-agent calls initiated by this agent (last 30-minutes) |
| `internalCallsInitiated.today` | v5+ | Number of agent-to-agent calls initiated by this agent (current day) |
| `internalCallsReceived.int-15m` | v5+ | Number of agent-to-agent calls received by this agent (last 15-minutes) |
| `internalCallsReceived.int-30m` | v5+ | Number of agent-to-agent calls received by this agent (last 30-minutes) |
| `internalCallsReceived.today` | v5+ | Number of agent-to-agent calls received by this agent (current day) |
| `internalCallsTime.int-15m` | v5+ | Total cumulative duration the agent spent on agent-to-agent calls, both initiated and received (last 15-minutes) |
| `internalCallsTime.int-30m` | v5+ | Total cumulative duration the agent spent on agent-to-agent calls, both initiated and received (last 30-minutes) |
| `internalCallsTime.today` | v5+ | Total cumulative duration the agent spent on agent-to-agent calls, both initiated and received (current day) |
| `lastLogin.rt` | v5+ | Timestamp representing the agent's most recent login to the system (currently) |
| `lastLogout.rt` | v5+ | Timestamp representing the agent's most recent logout from the system (currently) |
| `line1Status.rt` | v5+ | Current operational status of the agent's first communication line (currently) |
| `line1TimeOnStatus.rt` | v5+ | Time in milliseconds since the agent's first line status last changed (currently) |
| `line2Status.rt` | v5+ | Current operational status of the agent's second communication line (currently) |
| `line2TimeOnStatus.rt` | v5+ | Time in milliseconds since the agent's second line status last changed (currently) |
| `loggedInTime.int-15m` | v5+ | Total time the agent maintained active system connection and was available for work across all queues and activities (last 15-minutes) |
| `loggedInTime.int-30m` | v5+ | Total time the agent maintained active system connection and was available for work across all queues and activities (last 30-minutes) |
| `loggedInTime.rt` | v5+ | Cumulative time the agent has maintained active system connection during their current login session (currently) |
| `loggedInTime.today` | v5+ | Total time the agent maintained active system connection and was available for work across all queues and activities (current day) |
| `longestHold.int-15m` | v5+ | Maximum single continuous hold duration when agent placed customer on hold (last 15-minutes) |
| `longestHold.int-30m` | v5+ | Maximum single continuous hold duration when agent placed customer on hold (last 30-minutes) |
| `longestHold.today` | v5+ | Maximum single continuous hold duration when agent placed customer on hold (current day) |
| `longestOffering.int-15m` | v5+ | Maximum duration from when interaction was offered until agent accepted or rejected it. Shows longest time interaction remained in Offering state (last 15-minutes) |
| `longestOffering.int-30m` | v5+ | Maximum duration from when interaction was offered until agent accepted or rejected it. Shows longest time interaction remained in Offering state (last 30-minutes) |
| `longestOffering.today` | v5+ | Maximum duration from when interaction was offered until agent accepted or rejected it. Shows longest time interaction remained in Offering state (current day) |
| `offered.int-15m` | v5+ | Total interactions presented to the agent for acceptance or rejection. Includes interactions continuing from prior intervals (last 15-minutes) |
| `offered.int-30m` | v5+ | Total interactions presented to the agent for acceptance or rejection. Includes interactions continuing from prior intervals (last 30-minutes) |
| `offered.today` | v5+ | Total interactions presented to the agent for acceptance or rejection. Includes interactions continuing from prior intervals (current day) |
| `offeringTime.int-15m` | v5+ | Total duration the agent spent in Offering state waiting to accept or reject interactions across all activities (last 15-minutes) |
| `offeringTime.int-30m` | v5+ | Total duration the agent spent in Offering state waiting to accept or reject interactions across all activities (last 30-minutes) |
| `offeringTime.today` | v5+ | Total duration the agent spent in Offering state waiting to accept or reject interactions across all activities (current day) |
| `onBreakTime.int-15m` | v5+ | Total duration the agent spent in On Break status, temporarily unavailable to receive new interactions (last 15-minutes) |
| `onBreakTime.int-30m` | v5+ | Total duration the agent spent in On Break status, temporarily unavailable to receive new interactions (last 30-minutes) |
| `onBreakTime.today` | v5+ | Total duration the agent spent in On Break status, temporarily unavailable to receive new interactions (current day) |
| `onBreakTimePercentage.int-15m` | v5+ | Percentage of break time relative to total logged-in time. Shows what proportion of login duration agent spent on break (last 15-minutes) |
| `onBreakTimePercentage.int-30m` | v5+ | Percentage of break time relative to total logged-in time. Shows what proportion of login duration agent spent on break (last 30-minutes) |
| `onBreakTimePercentage.today` | v5+ | Percentage of break time relative to total logged-in time. Shows what proportion of login duration agent spent on break (current day) |
| `onHoldTime.int-15m` | v5+ | Total duration the agent kept customers on hold. Sum of all hold periods (last 15-minutes) |
| `onHoldTime.int-30m` | v5+ | Total duration the agent kept customers on hold. Sum of all hold periods (last 30-minutes) |
| `onHoldTime.today` | v5+ | Total duration the agent kept customers on hold. Sum of all hold periods (current day) |
| `rejectTimeout.int-15m` | v5+ | Count of interactions automatically rejected when agent did not respond within configured timeout period (last 15-minutes) |
| `rejectTimeout.int-30m` | v5+ | Count of interactions automatically rejected when agent did not respond within configured timeout period (last 30-minutes) |
| `rejectTimeout.today` | v5+ | Count of interactions automatically rejected when agent did not respond within configured timeout period (current day) |
| `rejected.int-15m` | v5+ | Count of interactions manually declined by agent when interaction was offered. Agent explicitly rejected the offer (last 15-minutes) |
| `rejected.int-30m` | v5+ | Count of interactions manually declined by agent when interaction was offered. Agent explicitly rejected the offer (last 30-minutes) |
| `rejected.today` | v5+ | Count of interactions manually declined by agent when interaction was offered. Agent explicitly rejected the offer (current day) |
| `status.rt` | v5+ | Agent's current operational state showing system status. Examples: Available, Handling, OnBreak, LoggedOut, WorkingOffline (currently) |
| `statusCode.rt` | v5+ | Specific reason code that justifies or details the agent's current operational status (currently) |
| `timeOnStatus.rt` | v5+ | Elapsed duration in milliseconds showing how long the agent has maintained their current operational status (currently) |
| `transfersInitiated.int-15m` | v5+ | Warm and blind transfers initiated by the agent. All outgoing transfers (last 15-minutes) |
| `transfersInitiated.int-30m` | v5+ | Warm and blind transfers initiated by the agent. All outgoing transfers (last 30-minutes) |
| `transfersInitiated.today` | v5+ | Warm and blind transfers initiated by the agent. All outgoing transfers (current day) |
| `transfersInitiatedPercentage.int-15m` | v5+ | Percentage of interactions transferred by the agent, calculated relative to total interactions accepted (last 15-minutes) |
| `transfersInitiatedPercentage.int-30m` | v5+ | Percentage of interactions transferred by the agent, calculated relative to total interactions accepted (last 30-minutes) |
| `transfersInitiatedPercentage.today` | v5+ | Percentage of interactions transferred by the agent, calculated relative to total interactions accepted (current day) |
| `transfersReceived.int-15m` | v5+ | Warm and blind transfers routed to agent for handling. All incoming transfers (last 15-minutes) |
| `transfersReceived.int-30m` | v5+ | Warm and blind transfers routed to agent for handling. All incoming transfers (last 30-minutes) |
| `transfersReceived.today` | v5+ | Warm and blind transfers routed to agent for handling. All incoming transfers (current day) |
| `warmTransfers.int-15m` | v5+ | Number of warm transfers performed by the agent. Transfer where agent spoke to recipient first (last 15-minutes) |
| `warmTransfers.int-30m` | v5+ | Number of warm transfers performed by the agent. Transfer where agent spoke to recipient first (last 30-minutes) |
| `warmTransfers.today` | v5+ | Number of warm transfers performed by the agent. Transfer where agent spoke to recipient first (current day) |
| `workingOfflineTime.int-15m` | v5+ | Total duration the agent spent in Working Offline status performing non-interactive work. Agent not available to receive new interactions (last 15-minutes) |
| `workingOfflineTime.int-30m` | v5+ | Total duration the agent spent in Working Offline status performing non-interactive work. Agent not available to receive new interactions (last 30-minutes) |
| `workingOfflineTime.today` | v5+ | Total duration the agent spent in Working Offline status performing non-interactive work. Agent not available to receive new interactions (current day) |
| `workingOfflineTimePercentage.int-15m` | v5+ | Percentage of offline work time relative to total logged-in time. Shows what proportion of login duration agent spent in Working Offline status (last 15-minutes) |
| `workingOfflineTimePercentage.int-30m` | v5+ | Percentage of offline work time relative to total logged-in time. Shows what proportion of login duration agent spent in Working Offline status (last 30-minutes) |
| `workingOfflineTimePercentage.today` | v5+ | Percentage of offline work time relative to total logged-in time. Shows what proportion of login duration agent spent in Working Offline status (current day) |
| `wrapUpTime.int-15m` | v5+ | Total duration the agent spent in Wrap Up state completing post-interaction administrative tasks across all activities after disconnecting from customer (last 15-minutes) |
| `wrapUpTime.int-30m` | v5+ | Total duration the agent spent in Wrap Up state completing post-interaction administrative tasks across all activities after disconnecting from customer (last 30-minutes) |
| `wrapUpTime.today` | v5+ | Total duration the agent spent in Wrap Up state completing post-interaction administrative tasks across all activities after disconnecting from customer (current day) |
| `wrapUpTimePercentage.int-15m` | v5+ | Percentage of wrap-up time relative to total logged-in time. Shows what proportion of login duration agent spent finalizing interactions in Wrap Up state (last 15-minutes) |
| `wrapUpTimePercentage.int-30m` | v5+ | Percentage of wrap-up time relative to total logged-in time. Shows what proportion of login duration agent spent finalizing interactions in Wrap Up state (last 30-minutes) |
| `wrapUpTimePercentage.today` | v5+ | Percentage of wrap-up time relative to total logged-in time. Shows what proportion of login duration agent spent finalizing interactions in Wrap Up state (current day) |

</details>

### 5.6. Agent Metrics Glossary - Multiple Queues Context

This glossary provides comprehensive definitions for all metrics available when querying agent statistics across multiple queues via the Real-time API. These metrics apply to the following endpoint:

* `GET /realtime-metrics/agents-in-queue-groups` - All agents across queues with optional filtering by specific queue IDs

**Note on `.inQueue` metrics:** The `.inQueue` suffix indicates that the metric measures agent activity specific to interactions routed through the **current queue**. These metrics exclude agent activity from direct inbound/outbound calls, internal agent-to-agent calls, and other non-queue interactions. Use `.inQueue` metrics to analyze agent performance for the selected queue.

<details>
<summary>Click to expand Agent Metrics Glossary - Multiple Queues Context (137 metrics)</summary>

**Version** indicates minimum Real-time API version where metric became available on this API endpoint.

| Metric | Version | Description |
|--------|---------|-------------|
| `accepted.int-15m.inQueue` | v5+ | Total interactions answered by the agent. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent (last 15-minutes) |
| `accepted.int-30m.inQueue` | v5+ | Total interactions answered by the agent. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent (last 30-minutes) |
| `accepted.today.inQueue` | v5+ | Total interactions answered by the agent. Represents every call, chat, email or other interaction that was successfully connected to and handled by an agent (current day) |
| `alerting.rt` | v5+ | Number of interactions currently being presented to the agent via a queue or direct assignment (currently) |
| `availableTime.int-15m` | v5+ | Total time the agent spent in Available state, ready to receive incoming interactions (last 15-minutes) |
| `availableTime.int-30m` | v5+ | Total time the agent spent in Available state, ready to receive incoming interactions (last 30-minutes) |
| `availableTime.today` | v5+ | Total time the agent spent in Available state, ready to receive incoming interactions (current day) |
| `availableTimePercentage.int-15m` | v5+ | Percentage of available time relative to total logged-in time. Shows the proportion of total login time the agent spent in Available state ready to receive work (last 15-minutes) |
| `availableTimePercentage.int-30m` | v5+ | Percentage of available time relative to total logged-in time. Shows the proportion of total login time the agent spent in Available state ready to receive work (last 30-minutes) |
| `availableTimePercentage.today` | v5+ | Percentage of available time relative to total logged-in time. Shows the proportion of total login time the agent spent in Available state ready to receive work (current day) |
| `averageHandlingTime.int-15m.inQueue` | v5+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold (last 15-minutes) |
| `averageHandlingTime.int-30m.inQueue` | v5+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold (last 30-minutes) |
| `averageHandlingTime.today.inQueue` | v5+ | Average time agents spend handling interactions including hold periods. Measured from when an agent accepts an interaction until they finish processing it, including any time the customer was placed on hold (current day) |
| `averageHoldTime.int-15m.inQueue` | v5+ | Average time the agent placed customers on hold (last 15-minutes) |
| `averageHoldTime.int-30m.inQueue` | v5+ | Average time the agent placed customers on hold (last 30-minutes) |
| `averageHoldTime.today.inQueue` | v5+ | Average time the agent placed customers on hold (current day) |
| `averageOfferingTime.int-15m.inQueue` | v5+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it (last 15-minutes) |
| `averageOfferingTime.int-30m.inQueue` | v5+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it (last 30-minutes) |
| `averageOfferingTime.today.inQueue` | v5+ | Average duration from interaction presentation to acceptance or rejection. Measures how long an interaction is offered to an agent before they either accept it or decline it (current day) |
| `averageWrapUpTime.int-15m.inQueue` | v5+ | Average post-processing time. Time spent by agents completing administrative tasks after finishing handling an interaction (last 15-minutes) |
| `averageWrapUpTime.int-30m.inQueue` | v5+ | Average post-processing time. Time spent by agents completing administrative tasks after finishing handling an interaction (last 30-minutes) |
| `averageWrapUpTime.today.inQueue` | v5+ | Average post-processing time. Time spent by agents completing administrative tasks after finishing handling an interaction (current day) |
| `blindTransfers.int-15m.inQueue` | v5+ | Number of blind transfers performed by the agent. Transfer where agent does not speak to recipient first (last 15-minutes) |
| `blindTransfers.int-30m.inQueue` | v5+ | Number of blind transfers performed by the agent. Transfer where agent does not speak to recipient first (last 30-minutes) |
| `blindTransfers.today.inQueue` | v5+ | Number of blind transfers performed by the agent. Transfer where agent does not speak to recipient first (current day) |
| `busyTime.int-15m` | v5+ | Combined duration the agent spent in Offering, Handling, and Wrap Up states across all activities. Time agent is actively engaged in work activities (last 15-minutes) |
| `busyTime.int-30m` | v5+ | Combined duration the agent spent in Offering, Handling, and Wrap Up states across all activities. Time agent is actively engaged in work activities (last 30-minutes) |
| `busyTime.today` | v5+ | Combined duration the agent spent in Offering, Handling, and Wrap Up states across all activities. Time agent is actively engaged in work activities (current day) |
| `busyTimePercentage.int-15m` | v5+ | Percentage of busy time relative to total logged-in time. Shows proportion of time agent was actively working (last 15-minutes) |
| `busyTimePercentage.int-30m` | v5+ | Percentage of busy time relative to total logged-in time. Shows proportion of time agent was actively working (last 30-minutes) |
| `busyTimePercentage.today` | v5+ | Percentage of busy time relative to total logged-in time. Shows proportion of time agent was actively working (current day) |
| `conferenceTime.int-15m.inQueue` | v5+ | Total cumulative duration the agent spent in multi-party conference calls (last 15-minutes) |
| `conferenceTime.int-30m.inQueue` | v5+ | Total cumulative duration the agent spent in multi-party conference calls (last 30-minutes) |
| `conferenceTime.today.inQueue` | v5+ | Total cumulative duration the agent spent in multi-party conference calls (current day) |
| `conferences.int-15m.inQueue` | v5+ | Total number of conferences established by the agent (last 15-minutes) |
| `conferences.int-30m.inQueue` | v5+ | Total number of conferences established by the agent (last 30-minutes) |
| `conferences.today.inQueue` | v5+ | Total number of conferences established by the agent (current day) |
| `consultations.int-15m.inQueue` | v5+ | Times an agent successfully established an outbound call while another call is on hold (last 15-minutes) |
| `consultations.int-30m.inQueue` | v5+ | Times an agent successfully established an outbound call while another call is on hold (last 30-minutes) |
| `consultations.today.inQueue` | v5+ | Times an agent successfully established an outbound call while another call is on hold (current day) |
| `directInboundTime.int-15m` | v5+ | Total cumulative duration the agent spent on direct inbound calls, excluding agent-to-agent calls (last 15-minutes) |
| `directInboundTime.int-30m` | v5+ | Total cumulative duration the agent spent on direct inbound calls, excluding agent-to-agent calls (last 30-minutes) |
| `directInboundTime.today` | v5+ | Total cumulative duration the agent spent on direct inbound calls, excluding agent-to-agent calls (current day) |
| `directInbounds.int-15m` | v5+ | Total number of direct inbound calls to the agent excluding agent-to-agent calls (last 15-minutes) |
| `directInbounds.int-30m` | v5+ | Total number of direct inbound calls to the agent excluding agent-to-agent calls (last 30-minutes) |
| `directInbounds.today` | v5+ | Total number of direct inbound calls to the agent excluding agent-to-agent calls (current day) |
| `directOutboundTime.int-15m` | v5+ | Total cumulative duration the agent spent on direct outbound calls, excluding outbound queue calls and agent-to-agent calls (last 15-minutes) |
| `directOutboundTime.int-30m` | v5+ | Total cumulative duration the agent spent on direct outbound calls, excluding outbound queue calls and agent-to-agent calls (last 30-minutes) |
| `directOutboundTime.today` | v5+ | Total cumulative duration the agent spent on direct outbound calls, excluding outbound queue calls and agent-to-agent calls (current day) |
| `directOutbounds.int-15m` | v5+ | Number of calls made by the agent excluding outbound queue calls and agent-to-agent calls (last 15-minutes) |
| `directOutbounds.int-30m` | v5+ | Number of calls made by the agent excluding outbound queue calls and agent-to-agent calls (last 30-minutes) |
| `directOutbounds.today` | v5+ | Number of calls made by the agent excluding outbound queue calls and agent-to-agent calls (current day) |
| `handlingTime.int-15m` | v5+ | Total time the agent spent in Handling state, actively processing interactions (last 15-minutes) |
| `handlingTime.int-30m` | v5+ | Total time the agent spent in Handling state, actively processing interactions (last 30-minutes) |
| `handlingTime.today` | v5+ | Total time the agent spent in Handling state, actively processing interactions (current day) |
| `handlingTimePercentage.int-15m` | v5+ | Percentage of handling time relative to total logged-in time. Shows what proportion of total login duration agent spent actively handling interactions (last 15-minutes) |
| `handlingTimePercentage.int-30m` | v5+ | Percentage of handling time relative to total logged-in time. Shows what proportion of total login duration agent spent actively handling interactions (last 30-minutes) |
| `handlingTimePercentage.today` | v5+ | Percentage of handling time relative to total logged-in time. Shows what proportion of total login duration agent spent actively handling interactions (current day) |
| `hold.int-15m.inQueue` | v5+ | Number of occasions the agent placed customers on hold (last 15-minutes) |
| `hold.int-30m.inQueue` | v5+ | Number of occasions the agent placed customers on hold (last 30-minutes) |
| `hold.today.inQueue` | v5+ | Number of occasions the agent placed customers on hold (current day) |
| `internalCalls.int-15m` | v5+ | Total number of agent-to-agent calls initiated or received by the agent (last 15-minutes) |
| `internalCalls.int-30m` | v5+ | Total number of agent-to-agent calls initiated or received by the agent (last 30-minutes) |
| `internalCalls.today` | v5+ | Total number of agent-to-agent calls initiated or received by the agent (current day) |
| `internalCallsInitiated.int-15m` | v5+ | Number of agent-to-agent calls initiated by this agent (last 15-minutes) |
| `internalCallsInitiated.int-30m` | v5+ | Number of agent-to-agent calls initiated by this agent (last 30-minutes) |
| `internalCallsInitiated.today` | v5+ | Number of agent-to-agent calls initiated by this agent (current day) |
| `internalCallsReceived.int-15m` | v5+ | Number of agent-to-agent calls received by this agent (last 15-minutes) |
| `internalCallsReceived.int-30m` | v5+ | Number of agent-to-agent calls received by this agent (last 30-minutes) |
| `internalCallsReceived.today` | v5+ | Number of agent-to-agent calls received by this agent (current day) |
| `internalCallsTime.int-15m` | v5+ | Total cumulative duration the agent spent on agent-to-agent calls, both initiated and received (last 15-minutes) |
| `internalCallsTime.int-30m` | v5+ | Total cumulative duration the agent spent on agent-to-agent calls, both initiated and received (last 30-minutes) |
| `internalCallsTime.today` | v5+ | Total cumulative duration the agent spent on agent-to-agent calls, both initiated and received (current day) |
| `lastLogin.rt` | v5+ | Timestamp representing the agent's most recent login to the system (currently) |
| `lastLogout.rt` | v5+ | Timestamp representing the agent's most recent logout from the system (currently) |
| `line1Status.rt` | v5+ | Current operational status of the agent's first communication line (currently) |
| `line1TimeOnStatus.rt` | v5+ | Time in milliseconds since the agent's first line status last changed (currently) |
| `line2Status.rt` | v5+ | Current operational status of the agent's second communication line (currently) |
| `line2TimeOnStatus.rt` | v5+ | Time in milliseconds since the agent's second line status last changed (currently) |
| `loggedInTime.int-15m` | v5+ | Total time the agent maintained active system connection and was available for work across all queues and activities (last 15-minutes) |
| `loggedInTime.int-30m` | v5+ | Total time the agent maintained active system connection and was available for work across all queues and activities (last 30-minutes) |
| `loggedInTime.rt` | v5+ | Cumulative time the agent has maintained active system connection during their current login session (currently) |
| `loggedInTime.today` | v5+ | Total time the agent maintained active system connection and was available for work across all queues and activities (current day) |
| `longestHold.int-15m.inQueue` | v5+ | Maximum single continuous hold duration when agent placed customer on hold (last 15-minutes) |
| `longestHold.int-30m.inQueue` | v5+ | Maximum single continuous hold duration when agent placed customer on hold (last 30-minutes) |
| `longestHold.today.inQueue` | v5+ | Maximum single continuous hold duration when agent placed customer on hold (current day) |
| `longestOffering.int-15m.inQueue` | v5+ | Maximum duration from when interaction was offered until agent accepted or rejected it. Shows longest time interaction remained in Offering state (last 15-minutes) |
| `longestOffering.int-30m.inQueue` | v5+ | Maximum duration from when interaction was offered until agent accepted or rejected it. Shows longest time interaction remained in Offering state (last 30-minutes) |
| `longestOffering.today.inQueue` | v5+ | Maximum duration from when interaction was offered until agent accepted or rejected it. Shows longest time interaction remained in Offering state (current day) |
| `offered.int-15m.inQueue` | v5+ | Total interactions presented to the agent for acceptance or rejection. Includes interactions continuing from prior intervals (last 15-minutes) |
| `offered.int-30m.inQueue` | v5+ | Total interactions presented to the agent for acceptance or rejection. Includes interactions continuing from prior intervals (last 30-minutes) |
| `offered.today.inQueue` | v5+ | Total interactions presented to the agent for acceptance or rejection. Includes interactions continuing from prior intervals (current day) |
| `offeringTime.int-15m` | v5+ | Total duration the agent spent in Offering state waiting to accept or reject interactions across all activities (last 15-minutes) |
| `offeringTime.int-30m` | v5+ | Total duration the agent spent in Offering state waiting to accept or reject interactions across all activities (last 30-minutes) |
| `offeringTime.today` | v5+ | Total duration the agent spent in Offering state waiting to accept or reject interactions across all activities (current day) |
| `onBreakTime.int-15m` | v5+ | Total duration the agent spent in On Break status, temporarily unavailable to receive new interactions (last 15-minutes) |
| `onBreakTime.int-30m` | v5+ | Total duration the agent spent in On Break status, temporarily unavailable to receive new interactions (last 30-minutes) |
| `onBreakTime.today` | v5+ | Total duration the agent spent in On Break status, temporarily unavailable to receive new interactions (current day) |
| `onBreakTimePercentage.int-15m` | v5+ | Percentage of break time relative to total logged-in time. Shows what proportion of login duration agent spent on break (last 15-minutes) |
| `onBreakTimePercentage.int-30m` | v5+ | Percentage of break time relative to total logged-in time. Shows what proportion of login duration agent spent on break (last 30-minutes) |
| `onBreakTimePercentage.today` | v5+ | Percentage of break time relative to total logged-in time. Shows what proportion of login duration agent spent on break (current day) |
| `onHoldTime.int-15m.inQueue` | v5+ | Total duration the agent kept customers on hold. Sum of all hold periods (last 15-minutes) |
| `onHoldTime.int-30m.inQueue` | v5+ | Total duration the agent kept customers on hold. Sum of all hold periods (last 30-minutes) |
| `onHoldTime.today.inQueue` | v5+ | Total duration the agent kept customers on hold. Sum of all hold periods (current day) |
| `rejectTimeout.int-15m.inQueue` | v5+ | Count of interactions automatically rejected when agent did not respond within configured timeout period (last 15-minutes) |
| `rejectTimeout.int-30m.inQueue` | v5+ | Count of interactions automatically rejected when agent did not respond within configured timeout period (last 30-minutes) |
| `rejectTimeout.today.inQueue` | v5+ | Count of interactions automatically rejected when agent did not respond within configured timeout period (current day) |
| `rejected.int-15m.inQueue` | v5+ | Count of interactions manually declined by agent when interaction was offered. Agent explicitly rejected the offer (last 15-minutes) |
| `rejected.int-30m.inQueue` | v5+ | Count of interactions manually declined by agent when interaction was offered. Agent explicitly rejected the offer (last 30-minutes) |
| `rejected.today.inQueue` | v5+ | Count of interactions manually declined by agent when interaction was offered. Agent explicitly rejected the offer (current day) |
| `status.rt` | v5+ | Agent's current operational state showing system status. Examples: Available, Handling, OnBreak, LoggedOut, WorkingOffline (currently) |
| `statusCode.rt` | v5+ | Specific reason code that justifies or details the agent's current operational status (currently) |
| `timeOnStatus.rt` | v5+ | Elapsed duration in milliseconds showing how long the agent has maintained their current operational status (currently) |
| `transfersInitiated.int-15m.inQueue` | v5+ | Warm and blind transfers initiated by the agent. All outgoing transfers (last 15-minutes) |
| `transfersInitiated.int-30m.inQueue` | v5+ | Warm and blind transfers initiated by the agent. All outgoing transfers (last 30-minutes) |
| `transfersInitiated.today.inQueue` | v5+ | Warm and blind transfers initiated by the agent. All outgoing transfers (current day) |
| `transfersInitiatedPercentage.int-15m.inQueue` | v5+ | Percentage of interactions transferred by the agent, calculated relative to total interactions accepted (last 15-minutes) |
| `transfersInitiatedPercentage.int-30m.inQueue` | v5+ | Percentage of interactions transferred by the agent, calculated relative to total interactions accepted (last 30-minutes) |
| `transfersInitiatedPercentage.today.inQueue` | v5+ | Percentage of interactions transferred by the agent, calculated relative to total interactions accepted (current day) |
| `transfersReceived.int-15m.inQueue` | v5+ | Warm and blind transfers routed to agent for handling. All incoming transfers (last 15-minutes) |
| `transfersReceived.int-30m.inQueue` | v5+ | Warm and blind transfers routed to agent for handling. All incoming transfers (last 30-minutes) |
| `transfersReceived.today.inQueue` | v5+ | Warm and blind transfers routed to agent for handling. All incoming transfers (current day) |
| `warmTransfers.int-15m.inQueue` | v5+ | Number of warm transfers performed by the agent. Transfer where agent spoke to recipient first (last 15-minutes) |
| `warmTransfers.int-30m.inQueue` | v5+ | Number of warm transfers performed by the agent. Transfer where agent spoke to recipient first (last 30-minutes) |
| `warmTransfers.today.inQueue` | v5+ | Number of warm transfers performed by the agent. Transfer where agent spoke to recipient first (current day) |
| `workingOfflineTime.int-15m` | v5+ | Total duration the agent spent in Working Offline status performing non-interactive work. Agent not available to receive new interactions (last 15-minutes) |
| `workingOfflineTime.int-30m` | v5+ | Total duration the agent spent in Working Offline status performing non-interactive work. Agent not available to receive new interactions (last 30-minutes) |
| `workingOfflineTime.today` | v5+ | Total duration the agent spent in Working Offline status performing non-interactive work. Agent not available to receive new interactions (current day) |
| `workingOfflineTimePercentage.int-15m` | v5+ | Percentage of offline work time relative to total logged-in time. Shows what proportion of login duration agent spent in Working Offline status (last 15-minutes) |
| `workingOfflineTimePercentage.int-30m` | v5+ | Percentage of offline work time relative to total logged-in time. Shows what proportion of login duration agent spent in Working Offline status (last 30-minutes) |
| `workingOfflineTimePercentage.today` | v5+ | Percentage of offline work time relative to total logged-in time. Shows what proportion of login duration agent spent in Working Offline status (current day) |
| `wrapUpTime.int-15m` | v5+ | Total duration the agent spent in Wrap Up state completing post-interaction administrative tasks across all activities after disconnecting from customer (last 15-minutes) |
| `wrapUpTime.int-30m` | v5+ | Total duration the agent spent in Wrap Up state completing post-interaction administrative tasks across all activities after disconnecting from customer (last 30-minutes) |
| `wrapUpTime.today` | v5+ | Total duration the agent spent in Wrap Up state completing post-interaction administrative tasks across all activities after disconnecting from customer (current day) |
| `wrapUpTimePercentage.int-15m` | v5+ | Percentage of wrap-up time relative to total logged-in time. Shows what proportion of login duration agent spent finalizing interactions in Wrap Up state (last 15-minutes) |
| `wrapUpTimePercentage.int-30m` | v5+ | Percentage of wrap-up time relative to total logged-in time. Shows what proportion of login duration agent spent finalizing interactions in Wrap Up state (last 30-minutes) |
| `wrapUpTimePercentage.today` | v5+ | Percentage of wrap-up time relative to total logged-in time. Shows what proportion of login duration agent spent finalizing interactions in Wrap Up state (current day) |

</details>
