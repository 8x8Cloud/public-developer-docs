# Webhook Events Reference

Webhook events are how 8x8 notifies bots or integrations when an event occurs such as when an agent sends a message.

Events are sent as **`POST`** calls to your webhook.

## List of webhook events

The following table lists events that can be sent to your webhook:

| Webhook Event | Description                                                                               |
| --- |-------------------------------------------------------------------------------------------|
| **`QUEUED`** | *See [**`QUEUED`**](/contactcenter/docs/webhook-events-reference#queued)*                 |
| **`AGENT_JOINED`** | *See [**`AGENT_JOINED`**](/contactcenter/docs/webhook-events-reference#agent_joined)*     |
| **`AGENT_LEFT`** | See [**`AGENT_LEFT`**](/contactcenter/docs/webhook-events-reference#agent_left)           |
| **`TRANSFER`** | See [**`TRANSFER`**](/contactcenter/docs/webhook-events-reference#transfer)               |
| **`TEXT`** | See [**`TEXT`**](/contactcenter/docs/webhook-events-reference#text)                       |
| **`WEB_HOOK_VERIFY`** | See [**`WEB_HOOK_VERIFY`**](/contactcenter/docs/webhook-events-reference#web_hook_verify) |

## Event format

All 8x8 events have the common property **`eventType`** that provides the information for processing and handling the event. Each event contains a set of specific detailed properties.

Based on the **`eventType`** and the webhook version, you can determine the other properties expected in the event envelope.

```json
{
  "eventType": "AGENT_JOINED",
  ...
}

```

### QUEUED

The **`QUEUED`**  event is sent whenever the interaction is being queued for processing.

The **`queueId`**  and **`queueName`**  attributes provide information about the queue in which your conversation is waiting. You can use the queue ID to fetch additional information (e.g., statistical data) about the queue like the **average waiting time in queue** or **queue size**.

```json
{
  "eventType": "QUEUED",
  "messageType": "SYSTEM",
  "conversationId": "ID-0",
  "timestamp": 0,
  "queueId": "string",
  "queueName": "string"
}

```

### AGENT_JOINED

The **`AGENT_JOINED`** event is sent whenever the interaction is assigned and accepted by an agent.

This event notification indicates that the agent has seen the messages that were added to the conversation, prior to the integration, and has observed any follow-up messages.

The **`agentId`** and **`agentName`** attributes provide information about the agent handling the interaction. You can decide if you want to display the agent's name in your application or if you want to use the ID to fetch additional information (e.g., statistical data) about the agent.

```json
{
  "eventType": "AGENT_JOINED",
  "messageType": "SYSTEM",
  "conversationId": "ID-0",
  "timestamp": 0,
  "agentId": "string",
  "agentName": "string"
}

```

### AGENT_LEFT

The **`AGENT_LEFT`** event is sent whenever the agent handling the interaction has left the conversation. This indicates that the agent can no longer see the messages that you add to the conversation. If the customer's problem has not been solved, you can add an additional message to re-queue and re-route the conversation to another agent in the same queue. The other agent can then continue the interaction with [**`AGENT JOINED`**](/contactcenter/docs/webhook-events-reference#agent_joined) event.

```json
{
  "eventType": "AGENT_LEFT",
  "messageType": "SYSTEM",
  "conversationId": "ID-0",
  "timestamp": 0,
  "agentId": "string",
  "agentName": "string"
}

```

### TRANSFER

A **`TRANSFER`** event is sent whenever the handling agent transferred the conversation to another queue. This indicates that the [**`AGENT_LEFT`**](/contactcenter/docs/webhook-events-reference#agent_left) event does not mark the end of the conversation and that another [**`AGENT_JOINED`**](/contactcenter/docs/webhook-events-reference#agent_joined) event follows.

```json
{
  "eventType": "TRANSFER",
  "messageType": "SYSTEM",
  "conversationId": "ID-0",
  "timestamp": 0
}

```

### TEXT

A **`TEXT`** event is sent whenever the agent handling the interaction adds a new message to the conversation. The **`TEXT`** event contains attribute information and is conveyed by the agent in string format.

```json
{
  "eventType": "TEXT",
  "messageType": "AGENT",
  "conversationId": "ID-0",
  "timestamp": 0,
  "agentId": "string",
  "agentName": "string",
  "message": "string"
}

```

### WEB_HOOK_VERIFY

When you add a webhook you receive a **`WEB_HOOK_VERIFY`** verification event to confirm that a server is listening behind the server address. This functionality prevents typos, invalid URLs, and other issues that may require further troubleshooting. The server that receives this verification event must respond with a 2XX status code.

```json
{
  "notificationVersion": "v2.0",
  "eventType": "WEB_HOOK_VERIFY"
}

```
