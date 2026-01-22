---
sidebar_position: 3
---

# Connection Guide

Connect to the 8x8 Event Streaming service using WebSocket.

## WebSocket URL Format

The WebSocket connection URL follows this structure:

```text
wss://{host}/ws/v2/reader/persistent/{tenant}/{namespace}/{topic}
```

### URL Components

| Component   | Description                                                                     | Example                  |
|-------------|---------------------------------------------------------------------------------|--------------------------|
| `host`      | WebSocket proxy server hostname (see [Regional Endpoints](#regional-endpoints)) | `pulsar-ws-euw2.8x8.com` |
| `tenant`    | Your 8x8 tenant name                                                            | `my-tenant`              |
| `namespace` | Pulsar namespace (typically `event-v1`)                                         | `event-v1`               |
| `topic`     | Topic name (typically `all` for all events)                                     | `all`                    |

### Example URL

```text
wss://pulsar-ws-euw2.8x8.com/ws/v2/reader/persistent/my-tenant/event-v1/all
```

## Regional Endpoints

The 8x8 Event Streaming service is available in multiple AWS regions. Connect to the endpoint that corresponds to your 8x8 Contact Center deployment region.

### Available Regions

| 8x8 Region | Hostname                 | Availability |
|------------|--------------------------|--------------|
| EUW2       | `pulsar-ws-euw2.8x8.com` | Available    |
| US1        | `pulsar-ws-use1.8x8.com` | Available    |

> 📘 **Finding Your Region**
>
> Your region is determined by your Contact Center deployment location. If you're unsure which region to use, contact 8x8 Support or check your Admin Console settings.
>
> **Note:** Additional regions are being deployed progressively. This table will be updated as new regions become available.

### Using Regional Endpoints

Use the hostname from the table above for your region:

```text
wss://pulsar-ws-euw2.8x8.com/ws/v2/reader/persistent/{tenant}/{namespace}/{topic}
```

## Available Topics

The 8x8 Event Streaming service publishes events to multiple topics based on event type and agent. Subscribe to topics based on your requirements:

### All Events Topic

Receive all events for your tenant:

```text
persistent/{tenant}/event-v1/all
```

**Use case:** Monitoring all activity, building comprehensive dashboards, or logging all events.

**Example:**

```text
wss://pulsar-ws-euw2.8x8.com/ws/v2/reader/persistent/my-tenant/event-v1/all
```

### Event Type Topics

Receive only events of a specific type:

```text
persistent/{tenant}/event-v1/{eventType}
```

**Available event types include:**
- `InteractionCreated` - New interactions
- `InteractionQueued` - Interactions waiting in queue
- `InteractionAccepted` - Agent accepted an interaction
- `InteractionDeleted` - Interaction completed or deleted
- `AgentStatusChange` - Agent status changes
- `AgentProvChange` - Agent provisioning changes
- See [Event Reference](./event-reference.md) for complete list

**Use case:** Applications that only need specific event types, reducing bandwidth and processing overhead.

**Example:**

```text
wss://pulsar-ws-euw2.8x8.com/ws/v2/reader/persistent/my-tenant/event-v1/InteractionCreated
```

### Agent-Specific Topics

Receive events for a specific agent:

```text
persistent/{tenant}/agent-v1/{agentId}
```

**Use case:** Agent-specific dashboards, personal productivity tracking, or agent desktop integrations.

**Example:**

```text
wss://pulsar-ws-euw2.8x8.com/ws/v2/reader/persistent/my-tenant/agent-v1/agAglVJkg0TU28dok9y9UQKg
```

**Note:** Agent IDs are in the format shown in events (e.g., `agAglVJkg0TU28dok9y9UQKg`), not the full GUID.

### Topic Naming Convention

Topics follow a versioned namespace pattern (`event-v1`, `agent-v1`) to allow for future compatibility and changes without breaking existing integrations.

## Reader vs Consumer API

The 8x8 Event Streaming service supports both Pulsar's [**Reader API**](https://pulsar.apache.org/docs/next/client-libraries-readers/) and [**Consumer API**](https://pulsar.apache.org/docs/next/concepts-messaging/#consumers) via WebSocket. The examples in this documentation use the Reader API.

### Reader API

The Reader API provides a lightweight interface for reading events:

- **Simpler interface**: No subscription management required
- **No acknowledgements**: Messages don't need to be acknowledged
- **Position control**: You specify where to start reading (earliest, latest, or specific message)
- **No cursor tracking**: Pulsar doesn't track your reading position
- **Stateless**: Each connection is independent

**Ideal for:**
- Event streaming and monitoring
- Building real-time dashboards
- Simple message consumption without delivery guarantees
- Development and debugging

**WebSocket endpoint:** `/ws/v2/reader/persistent/{tenant}/{namespace}/{topic}`

### Consumer API

The Consumer API provides more advanced features for production applications:

- **Subscription management**: Durable subscriptions with cursor tracking
- **Message acknowledgements**: Confirm message processing
- **Multiple subscription types**: Exclusive, Shared, Failover, Key_Shared
- **Load balancing**: Distribute messages across multiple consumers
- **Dead letter queues**: Handle failed messages

**Ideal for:**
- Production applications requiring guaranteed delivery
- Load-balanced message processing
- Applications requiring message replay and acknowledgement

**WebSocket endpoint:** `/ws/v2/consumer/persistent/{tenant}/{namespace}/{topic}/{subscription}`

For more information, see:
- [Apache Pulsar Reader documentation](https://pulsar.apache.org/docs/next/client-libraries-readers/)
- [Apache Pulsar Consumer documentation](https://pulsar.apache.org/docs/next/concepts-messaging/#consumers)

## Query Parameters

You can append query parameters to the WebSocket URL to configure the reader:

| Parameter           | Description                            | Values                              | Default  |
|---------------------|----------------------------------------|-------------------------------------|----------|
| `x-api-key`         | API key for authentication             | Your API key                        | -        |
| `messageId`         | Starting position for reading messages | `earliest`, `latest`, or message ID | `latest` |
| `readerName`        | Optional identifier for this reader    | Any string                          | -        |
| `receiverQueueSize` | Size of the internal receiver queue    | Integer > 0                         | 1000     |

### Example with Query Parameters

```text
wss://pulsar-ws-euw2.8x8.com/ws/v2/reader/persistent/my-company/event-v1/all?x-api-key=YOUR_KEY&messageId=earliest
```

## Authentication

Authentication is provided via the `X-API-Key` HTTP header or `x-api-key` query parameter. See the [Authentication Guide](./authentication.mdx) for complete details on credential types, obtaining keys, and implementation.

## Message Reading Position

When you connect, you can specify where to start reading messages:

### Latest (Default)

Start reading from the most recent message. You'll only receive new events that occur after your connection is established.

```text
?messageId=latest
```

### Earliest

Start reading from the beginning of the available message history.

```text
?messageId=earliest
```

### Specific Message ID

Start reading from a specific message (useful for resuming from a known position).

```text
?messageId=CAEQAQ==
```

## Connection Timeout

Configure an appropriate connection timeout (recommended: 45 seconds) to handle network latency and server processing time.

## Keepalive and Heartbeat

WebSocket connections support ping/pong frames for keepalive:

- The server may send **ping** frames to check connection health
- Your client should respond with **pong** frames
- Most WebSocket libraries handle this automatically

## Graceful Disconnection

To close the connection cleanly:

1. Stop reading messages
2. Send a WebSocket **close** frame
3. Wait for the server's close acknowledgement
4. Close the underlying TCP connection
5. Most WebSocket libraries handle this automatically

## Next Steps

- [Authentication Guide](./authentication.mdx) - Learn about authentication methods
- [Message Format](./message-format.mdx) - Understand the message structure
- [Code Examples](./examples/golang.md) - See complete working implementations
