---
sidebar_position: 7
---

# Migration Guide

This guide helps you transition from the legacy Streaming API (SAPI) to the new Apache Pulsar-based Event Streaming service.

## Migration Options

All existing customers will be automatically migrated to the 8x8 Event Streaming service. If you would like to take a more direct path or access additional features before your migration date, there are two options:

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

### Option 2: Adapter Migration

Switch to the backwards-compatible adapter endpoint with no code changes. The adapter is intended for existing integrations that cannot move to Pulsar directly — new integrations should use Option 1.

**Benefits:**
- **No code changes**: Existing clients work without modification
- **Cloud infrastructure**: Benefit from new Pulsar backend reliability and scalability
- **Easy transition**: Change URL only

**What's required:**
- Update endpoint URL only

**Endpoint:** `wss://vcc-sapi-bridge-{region}.8x8.com/...` — for example, UK3 uses `wss://vcc-sapi-bridge-euw2.8x8.com/...`

The adapter is deployed in the same regions as the Pulsar API and uses the same `{region}` suffixes — see [Regional Endpoints](./connection.md#regional-endpoints) for the region list. The URL path is unchanged from the legacy Streaming API, so existing clients only need the hostname replaced.

## What Happens If You Do Nothing

Your integration will be automatically migrated to the new platform via a backwards-compatible adapter. No action is required on your side — your existing code will continue to work. You will receive advance notice with your migration date before this happens.

## Migration Timeline

Existing customers will be migrated to the new platform on a rolling schedule, with advance notice sent before each cluster migration. Your integration will continue to work automatically via a backwards-compatible adapter — no code changes required. If you would like to take advantage of the full platform before your migration date, see Options 1 and 2 above.

Regardless of your migration date:

- **New features** will only be available on the Pulsar-based platform
- **Performance improvements** are focused on the new infrastructure
- **Long-term support** is committed to the Pulsar-based service

## Related Resources

- [Legacy Streaming API Documentation](../legacy-streaming-api-overview.md)
- [Apache Pulsar Documentation](https://pulsar.apache.org/docs/)

*Apache Pulsar is a trademark of the Apache Software Foundation.*
