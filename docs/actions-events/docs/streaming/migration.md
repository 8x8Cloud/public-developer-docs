---
sidebar_position: 7
---

# Migration Guide

This guide helps you transition from the legacy Streaming API (SAPI) to the new Apache Pulsar-based Event Streaming service.

## Migration Options

You have three options for using the 8x8 Event Streaming service:

### Option 1: Full Migration (Recommended)

Migrate to the new Pulsar API with native WebSocket protocol.

**Benefits:**
- **Best performance**: Lower latency, higher throughput
- **New features**: Access to Consumer API, Reader API, and future enhancements
- **Full flexibility**: Choose between Reader (simple streaming) or Consumer (subscriptions with acknowledgements)
- **No connection limits**: Scale to as many connections as needed
- **Agent-specific subscriptions**: Subscribe to individual agents via `agent-v1` topics for targeted monitoring
- **Cloud-native**: Built on Apache Pulsar infrastructure

**What's required:**
- Update endpoint URL
- Add Pulsar message wrapper handling (base64 decode)

**Endpoint:** `wss://pulsar-ws-{region}.8x8.com/ws/v2/reader/...` (see [Regional Endpoints](./connection.md#regional-endpoints))

**Documentation:**
- [Getting Started](./getting-started.mdx) - Quick start guide with complete examples
- [Connection Guide](./connection.md) - WebSocket connection details and available topics
- [Message Format](./message-format.mdx#payload-decoding) - How to decode Pulsar message wrappers
- [Code Examples](./examples/golang.md) - Working implementations in Go, Java, Python, Node.js, and Browser

### Option 2: Adapter Migration (Coming Soon)

Switch to the backwards-compatible adapter endpoint with no code changes.

**Benefits:**
- **No code changes**: Existing clients work without modification
- **Cloud infrastructure**: Benefit from new Pulsar backend reliability and scalability
- **Easy transition**: Change URL only

**What's required:**
- Update endpoint URL only

**Endpoint:** `wss://[adapter-endpoint-tbd]/...` *(URL to be announced)*

### Option 3: Stay on Legacy

Continue using the current legacy SAPI endpoint.

**Status:**
- Still operational
- Security updates and critical bug fixes only
- No new features or performance improvements

**Endpoint:** `event-streaming.sapi.8x8.com`

## Migration Timeline

There is **no forced deadline** for migration. The legacy API will continue to operate through a backwards-compatible adapter.

However:

- **New features** will only be available on the Pulsar-based platform
- **Performance improvements** are focused on the new infrastructure
- **Long-term support** is committed to the Pulsar-based service

## Related Resources

- [Legacy Streaming API Documentation](../legacy-streaming-api-overview.md)
- [Apache Pulsar Documentation](https://pulsar.apache.org/docs/)
