---
sidebar_position: 1
---

# Go Client Example

This page provides a complete Go implementation for connecting to the 8x8 Event Streaming service.

## Overview

The Go client example demonstrates:
- WebSocket connection setup
- Authentication using X-API-Key
- Message reading and payload decoding
- Error handling and graceful shutdown

## Complete Example

```go
package main

import (
    "encoding/base64"
    "encoding/json"
    "flag"
    "fmt"
    "log"
    "net/http"
    "net/url"
    "time"

    "github.com/gorilla/websocket"
)

// PulsarMessage represents a message received from Pulsar WebSocket
type PulsarMessage struct {
    // Data message fields
    MessageID       string            `json:"messageId"`
    Payload         string            `json:"payload"` // Base64 encoded
    Properties      map[string]string `json:"properties,omitempty"`
    PublishTime     string            `json:"publishTime,omitempty"`
    RedeliveryCount int               `json:"redeliveryCount,omitempty"`
    // Control message fields
    Type       string `json:"type,omitempty"`       // e.g., "isEndOfTopic"
    EndOfTopic string `json:"endOfTopic,omitempty"` // "true" or "false"
}

// IsControlMessage returns true if this is a control message (should not be acknowledged)
func (m *PulsarMessage) IsControlMessage() bool {
    return m.Type != "" || m.EndOfTopic != ""
}

// DecodePayload decodes the base64 payload
func (m *PulsarMessage) DecodePayload() ([]byte, error) {
    return base64.StdEncoding.DecodeString(m.Payload)
}

// extractPulsarPayload parses a Pulsar message and extracts the decoded payload
func extractPulsarPayload(data []byte) (*PulsarMessage, []byte, error) {
    var msg PulsarMessage
    if err := json.Unmarshal(data, &msg); err != nil {
        return nil, nil, fmt.Errorf("failed to parse Pulsar message: %w", err)
    }

    payload, err := msg.DecodePayload()
    if err != nil {
        return &msg, nil, fmt.Errorf("failed to decode payload: %w", err)
    }

    return &msg, payload, nil
}

// sendAck sends an acknowledgment message for a received message
// This is REQUIRED for WebSocket readers to prevent backlog buildup and message delivery stoppage
func sendAck(conn *websocket.Conn, messageID string) error {
    ackMsg := map[string]string{"messageId": messageID}
    ackJSON, err := json.Marshal(ackMsg)
    if err != nil {
        return fmt.Errorf("failed to marshal ack message: %w", err)
    }

    err = conn.WriteMessage(websocket.TextMessage, ackJSON)
    if err != nil {
        return fmt.Errorf("failed to send ack: %w", err)
    }

    return nil
}

// buildURL constructs the Pulsar WebSocket URL
func buildURL(host string, port int, tenant, namespace, topic, xAPIKey string) (string, error) {
    baseURL := fmt.Sprintf("wss://%s:%d/ws/v2/reader/persistent/%s/%s/%s", host, port, tenant, namespace, topic)

    u, err := url.Parse(baseURL)
    if err != nil {
        return "", fmt.Errorf("invalid URL: %w", err)
    }

    // Add X-API-Key as query parameter if provided
    if xAPIKey != "" {
        q := u.Query()
        q.Set("x-api-key", xAPIKey)
        u.RawQuery = q.Encode()
    }

    return u.String(), nil
}

// ConnectAndReceive connects to a WebSocket URL and receives messages
func ConnectAndReceive(wsURL string, xAPIKey string) error {
    // Set up HTTP headers for authentication
    headers := http.Header{}

    // Add X-API-Key header if provided
    if xAPIKey != "" {
        headers.Set("X-API-Key", xAPIKey)
    }

    // Configure WebSocket dialer
    dialer := websocket.Dialer{
        HandshakeTimeout: 45 * time.Second,
    }

    // Connect to WebSocket
    log.Printf("Connecting to WebSocket...")
    conn, resp, err := dialer.Dial(wsURL, headers)
    if err != nil {
        if resp != nil {
            return fmt.Errorf("failed to connect to WebSocket (status: %d): %w", resp.StatusCode, err)
        }
        return fmt.Errorf("failed to connect to WebSocket: %w", err)
    }
    defer conn.Close()

    log.Printf("Successfully connected")

    // Read messages continuously
    for {
        messageType, message, err := conn.ReadMessage()
        if err != nil {
            log.Printf("Error reading message: %v", err)
            return err
        }

        switch messageType {
        case websocket.TextMessage, websocket.BinaryMessage:
            // Extract and decode Pulsar message payload
            pulsarMsg, payload, err := extractPulsarPayload(message)
            if err != nil {
                log.Printf("Error extracting payload: %v", err)
                continue
            }

            // Check if this is a control message (don't print or ack these)
            if pulsarMsg.IsControlMessage() {
                continue
            }

            // Print only the payload
            fmt.Println(string(payload))

            // Send acknowledgment (required for WebSocket flow control)
            if err := sendAck(conn, pulsarMsg.MessageID); err != nil {
                log.Printf("Warning: Failed to send ack: %v", err)
            }

        case websocket.CloseMessage:
            log.Println("Received close message from server")
            return nil
        }
    }
}

func main() {
    // Connection parameters
    // Default host: pulsar-ws-euw2.8x8.com (example uses euw2 region; for other regions see developer.8x8.com)
    host := flag.String("host", "pulsar-ws-euw2.8x8.com", "Pulsar broker hostname")
    port := flag.Int("port", 443, "Pulsar broker port")
    tenant := flag.String("tenant", "", "Pulsar tenant name (required)")
    namespace := flag.String("namespace", "event-v1", "Pulsar namespace")
    topic := flag.String("topic", "all", "Pulsar topic name")
    xAPIKey := flag.String("x-api-key", "", "X-API-Key header value")

    flag.Parse()

    // Validate required parameters
    if *tenant == "" {
        log.Fatal("Error: -tenant is required")
    }

    // Build full URL
    fullURL, err := buildURL(*host, *port, *tenant, *namespace, *topic, *xAPIKey)
    if err != nil {
        log.Fatalf("Error building URL: %v", err)
    }

    // Connect and receive messages
    if err := ConnectAndReceive(fullURL, *xAPIKey); err != nil {
        log.Fatalf("Error: %v", err)
    }
}
```

## Key Components

### Message Structure

The `PulsarMessage` struct maps to the JSON structure received from Pulsar:

```go
type PulsarMessage struct {
  MessageID       string            `json:"messageId"`
  Payload         string            `json:"payload"` // Base64 encoded
  Properties      map[string]string `json:"properties,omitempty"`
  PublishTime     string            `json:"publishTime,omitempty"`
  RedeliveryCount int               `json:"redeliveryCount,omitempty"`
}
```

### URL Construction

The client builds the WebSocket URL from components:

```go
baseURL := fmt.Sprintf("wss://%s:%d/ws/v2/reader/persistent/%s/%s/%s",
  host, port, tenant, namespace, topic)
```

### Authentication

X-API-Key is set both as a header and query parameter:

```go
headers := http.Header{}
headers.Set("X-API-Key", xAPIKey)

// Also add to URL query params
q := u.Query()
q.Set("x-api-key", xAPIKey)
```

### Payload Decoding

The payload is base64 encoded and must be decoded before use:

```go
payload, err := base64.StdEncoding.DecodeString(pulsarMsg.Payload)
```

### Message Acknowledgement

Acknowledgements are required to prevent message delivery stoppage:

```go
ackMsg := map[string]string{"messageId": messageID}
ackJSON, _ := json.Marshal(ackMsg)
conn.WriteMessage(websocket.TextMessage, ackJSON)
```

### Control Message Filtering

Control messages (like end-of-topic markers) should not be processed:

```go
if pulsarMsg.IsControlMessage() {
    continue
}
```

## Running the Example

### Prerequisites

```bash
go install github.com/gorilla/websocket@latest
```

### Build and Run

```bash
# Build
go build -o pulsar-client main.go

# Run
./pulsar-client \
  -tenant YOUR_TENANT \
  -x-api-key YOUR_API_KEY
```

### Using Environment Variables

```bash
export PULSAR_TENANT=your-tenant
export PULSAR_API_KEY=your-api-key

./pulsar-client \
  -tenant $PULSAR_TENANT \
  -x-api-key $PULSAR_API_KEY
```

## Processing with jq

Pipe the output to `jq` for JSON processing:

```bash
# Pretty-print all events
./pulsar-client -tenant YOUR_TENANT -x-api-key YOUR_KEY | jq .

# Filter by event type
./pulsar-client -tenant YOUR_TENANT -x-api-key YOUR_KEY | \
  jq 'select(.eventType == "agent.login")'

# Extract specific fields
./pulsar-client -tenant YOUR_TENANT -x-api-key YOUR_KEY | \
  jq '{type: .eventType, time: .timestamp}'
```

## Error Handling

The example includes error handling for:

- Invalid URL construction
- Connection failures with HTTP status codes
- WebSocket read errors
- JSON parsing errors
- Base64 decoding errors
- Acknowledgement send failures

## Next Steps

- [Java Client Example](./java.md) - See the same functionality in Java
- [Message Format](../message-format.mdx) - Learn more about message structure
- [Troubleshooting](../troubleshooting.md) - Common issues and solutions
