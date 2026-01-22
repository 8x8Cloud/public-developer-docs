---
sidebar_position: 1
---

# Overview

:::warning BETA - LIMITED ACCESS

**The Event Streaming service is currently in Beta Testing.**
For production deployments, the [Legacy Streaming API (SAPI)](/actions-events/docs/legacy-streaming-api-overview) remains fully available and supported.

:::

8x8 Event Streaming provides a real-time stream of events from your 8x8 platform.

## What is Event Streaming?

The service delivers events as they occur, including:

- Agent login/logout events
- Call state changes
- Queue updates
- Interaction events
- Agent status changes

Event Streaming supports custom integrations, dashboards, and automation tools that respond to events in real-time.

## When to Use This API

Event Streaming is designed for real-time event processing and advanced integration scenarios. Consider this API when:

- **Real-time event streams are required** - You need immediate notification of contact center events as they occur
- **Advanced use cases** - Standard APIs like CCA Realtime, CCA Historical, or CEX Recent Calls cannot meet your requirements
- **Server-to-server integration** - You're building cloud-to-cloud or server-to-server integrations

## Architecture

The 8x8 Event Streaming service is built on [Apache Pulsar](https://pulsar.apache.org/), an open-source distributed messaging and streaming platform. We expose Pulsar's WebSocket interface, which provides:

- **Real-time streaming**: Events are delivered as they occur
- **Reliable delivery**: Built on Pulsar's proven messaging infrastructure
- **Simple integration**: Standard WebSocket protocol supported by all major languages
- **Scalability**: Handles high-volume event streams efficiently

## Key Features

- **WebSocket-based**: Uses standard WebSocket protocol for broad compatibility
- **Multi-language support**: Client examples available in Go, Java, Python, Node.js, and Browser (HTML/JavaScript)
- **Reader and Consumer APIs**: Both Pulsar Reader API (simple streaming) and Consumer API (with subscriptions and acknowledgements) are supported
- **Flexible positioning**: Start reading from earliest, latest, or a specific message

## Migrating from Legacy Streaming API

If you're currently using the legacy Streaming API (SAPI), this Apache Pulsar-based service is the recommended platform for all new integrations and future development.

- **Migration is optional**: The legacy API continues to work through a backwards-compatible adapter
- **Recommended for all new integrations**: New customers should use this Pulsar-based API
- **Better performance and reliability**: Improved scalability, message durability, and connection stability
- **Future features**: New capabilities and enhancements will only be available on this platform

See the [Migration Guide](./migration.md) for detailed information on transitioning from the legacy API.

## Getting Started

To consume events from 8x8 Event Streaming:

1. **[Set up authentication](./authentication.mdx)** - Configure API credentials
2. **[Establish a connection](./connection.md)** - Connect to the WebSocket endpoint
3. **[Process messages](./message-format.mdx)** - Parse and handle incoming events
4. **[Review examples](./examples/golang.md)** - Working code samples

## Service Availability

The 8x8 Event Streaming service is available in multiple AWS regions worldwide:

- **Protocol**: WebSocket Secure (WSS)
- **Regional Endpoints**: See [Regional Endpoints](./connection.md#regional-endpoints) for hostname mapping

Connect to the endpoint that corresponds to your 8x8 Contact Center deployment region.

## Next Steps

- [Getting Started Guide](./getting-started.mdx) - Quick start
- [Connection Guide](./connection.md) - Connection details
- [Code Examples](./examples/golang.md) - Code samples

## Related Resources

- [Apache Pulsar Documentation](https://pulsar.apache.org/docs/)
- [Apache Pulsar WebSocket API](https://pulsar.apache.org/docs/client-libraries-websocket/)
