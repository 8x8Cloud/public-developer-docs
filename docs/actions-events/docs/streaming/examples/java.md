---
sidebar_position: 2
---

# Java Client Example

This page provides a complete Java implementation for connecting to the 8x8 Event Streaming service.

## Overview

The Java client example demonstrates:
- WebSocket connection using Java-WebSocket library
- Authentication using X-API-Key
- Message reading and payload decoding
- Command-line argument parsing
- Error handling with proper logging

## Complete Example

```java
package com._8x8.pulsar;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CountDownLatch;

/**
 * Simplified WebSocket client for consuming 8x8 streaming events via Apache Pulsar.
 * <p>
 * This client connects to Pulsar's WebSocket Reader endpoint and outputs raw message payloads
 * suitable for piping to tools like jq.
 */
public class SimpleClient {
    private static final Logger log = LoggerFactory.getLogger(SimpleClient.class);
    private static final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Pulsar message structure from WebSocket.
     */
    @Data
    static class PulsarMessage {
        // Data message fields
        @JsonProperty("messageId")
        private String messageId;

        @JsonProperty("payload")
        private String payload; // Base64 encoded

        @JsonProperty("properties")
        private Map<String, String> properties = new HashMap<>();

        @JsonProperty("publishTime")
        private String publishTime;

        @JsonProperty("redeliveryCount")
        private int redeliveryCount;

        // Control message fields
        @JsonProperty("type")
        private String type; // e.g., "isEndOfTopic"

        @JsonProperty("endOfTopic")
        private String endOfTopic; // "true" or "false"

        /**
         * Check if this is a control message (should not be acknowledged).
         */
        public boolean isControlMessage() {
            return (type != null && !type.isEmpty()) || (endOfTopic != null && !endOfTopic.isEmpty());
        }

        /**
         * Decode the base64 payload.
         */
        public byte[] decodePayload() {
            return Base64.getDecoder().decode(payload);
        }

        /**
         * Decode payload as UTF-8 string.
         */
        public String decodePayloadAsString() {
            return new String(decodePayload(), StandardCharsets.UTF_8);
        }
    }

    /**
     * Build Pulsar WebSocket URL.
     */
    private static String buildUrl(String host, int port, String tenant, String namespace,
                                    String topic, String xApiKey) {
        try {
            String baseUrl = String.format("wss://%s:%d/ws/v2/reader/persistent/%s/%s/%s",
                    host, port, tenant, namespace, topic);

            if (xApiKey != null && !xApiKey.isEmpty()) {
                baseUrl += "?x-api-key=" + URLEncoder.encode(xApiKey, StandardCharsets.UTF_8);
            }

            return baseUrl;
        } catch (Exception e) {
            throw new RuntimeException("Failed to build URL", e);
        }
    }

    /**
     * WebSocket client implementation.
     */
    static class PulsarWebSocketClient extends WebSocketClient {
        private final CountDownLatch latch = new CountDownLatch(1);
        private final String xApiKey;

        public PulsarWebSocketClient(URI serverUri, String xApiKey) {
            super(serverUri);
            this.xApiKey = xApiKey;

            // Add X-API-Key header if provided
            if (xApiKey != null && !xApiKey.isEmpty()) {
                addHeader("X-API-Key", xApiKey);
            }

            // Set connection timeout
            setConnectionLostTimeout(45);
        }

        @Override
        public void onOpen(ServerHandshake handshake) {
            log.info("Successfully connected");
        }

        @Override
        public void onMessage(String message) {
            try {
                // Parse Pulsar message
                PulsarMessage pulsarMsg = objectMapper.readValue(message, PulsarMessage.class);

                // Check if this is a control message (don't print or ack these)
                if (pulsarMsg.isControlMessage()) {
                    return;
                }

                // Decode and print only the payload
                String payload = pulsarMsg.decodePayloadAsString();
                System.out.println(payload);

                // Send acknowledgment (required for WebSocket flow control)
                sendAck(pulsarMsg.getMessageId());

            } catch (Exception e) {
                log.error("Error processing message: {}", e.getMessage());
            }
        }

        /**
         * Send an acknowledgment message for a received message.
         * This is REQUIRED for WebSocket readers to prevent backlog buildup and message delivery stoppage.
         */
        private void sendAck(String messageId) {
            try {
                Map<String, String> ackMsg = new HashMap<>();
                ackMsg.put("messageId", messageId);
                String ackJson = objectMapper.writeValueAsString(ackMsg);
                send(ackJson);
            } catch (Exception e) {
                log.warn("Failed to send ack for messageId: {}", messageId, e);
            }
        }

        @Override
        public void onClose(int code, String reason, boolean remote) {
            log.info("Connection closed: {} - {}", code, reason);
            latch.countDown();
        }

        @Override
        public void onError(Exception ex) {
            log.error("WebSocket error: {}", ex.getMessage());
            latch.countDown();
        }

        public void awaitClose() throws InterruptedException {
            latch.await();
        }
    }

    /**
     * Parse command-line arguments.
     */
    private static Map<String, String> parseArgs(String[] args) {
        Map<String, String> params = new HashMap<>();

        // Defaults
        // Example uses euw2 region. For other regions, see developer.8x8.com
        params.put("host", "pulsar-ws-euw2.8x8.com");
        params.put("port", "443");
        params.put("namespace", "event-v1");
        params.put("topic", "all");

        // Get API key from environment variable
        String apiKey = System.getenv("PULSAR_API_KEY");
        if (apiKey != null && !apiKey.isEmpty()) {
            params.put("x-api-key", apiKey);
        }

        for (int i = 0; i < args.length; i++) {
            String arg = args[i];

            if (arg.startsWith("--") && i + 1 < args.length) {
                String key = arg.substring(2);
                String value = args[++i];
                params.put(key, value);
            }
        }

        return params;
    }

    /**
     * Main entry point.
     */
    public static void main(String[] args) {
        PulsarWebSocketClient client = null;
        try {
            // Parse arguments
            Map<String, String> params = parseArgs(args);

            // Validate required parameters
            if (!params.containsKey("tenant")) {
                System.err.println("Error: --tenant is required");
                System.exit(1);
            }

            // Build URL
            String url = buildUrl(
                    params.get("host"),
                    Integer.parseInt(params.get("port")),
                    params.get("tenant"),
                    params.get("namespace"),
                    params.get("topic"),
                    params.get("x-api-key")
            );

            log.info("Connecting to WebSocket...");

            // Create and connect WebSocket client
            client = new PulsarWebSocketClient(
                    new URI(url),
                    params.get("x-api-key")
            );

            // Connect (blocking)
            if (!client.connectBlocking()) {
                log.error("Failed to connect to WebSocket");
                System.exit(1);
            }

            // Wait for connection to close
            client.awaitClose();

        } catch (Exception e) {
            log.error("Error: {}", e.getMessage(), e);
            System.exit(1);
        } finally {
            if (client != null) {
                try {
                    client.close();
                } catch (Exception e) {
                    log.warn("Error closing WebSocket client: {}", e.getMessage());
                }
            }
        }
    }
}
```

## Key Components

### Message Structure

The `PulsarMessage` class uses Jackson annotations for JSON mapping:

```java
@Data
static class PulsarMessage {
    // Data message fields
    @JsonProperty("messageId")
    private String messageId;

    @JsonProperty("payload")
    private String payload; // Base64 encoded

    @JsonProperty("properties")
    private Map<String, String> properties;

    @JsonProperty("publishTime")
    private String publishTime;

    @JsonProperty("redeliveryCount")
    private int redeliveryCount;

    // Control message fields
    @JsonProperty("type")
    private String type;

    @JsonProperty("endOfTopic")
    private String endOfTopic;
}
```

### URL Construction

The URL is built with proper encoding:

```java
String baseUrl = String.format("wss://%s:%d/ws/v2/reader/persistent/%s/%s/%s",
        host, port, tenant, namespace, topic);

if (xApiKey != null && !xApiKey.isEmpty()) {
    baseUrl += "?x-api-key=" + URLEncoder.encode(xApiKey, StandardCharsets.UTF_8);
}
```

### Authentication

X-API-Key is added as a header during connection:

```java
if (xApiKey != null && !xApiKey.isEmpty()) {
    addHeader("X-API-Key", xApiKey);
}
```

### Payload Decoding

The payload is decoded from base64:

```java
public byte[] decodePayload() {
    return Base64.getDecoder().decode(payload);
}

public String decodePayloadAsString() {
    return new String(decodePayload(), StandardCharsets.UTF_8);
}
```

### Message Acknowledgement

Acknowledgements are required to prevent message delivery stoppage:

```java
Map<String, String> ackMsg = new HashMap<>();
ackMsg.put("messageId", messageId);
String ackJson = objectMapper.writeValueAsString(ackMsg);
send(ackJson);
```

### Control Message Filtering

Control messages (like end-of-topic markers) should not be processed:

```java
if (pulsarMsg.isControlMessage()) {
    return;
}
```

## Maven Dependencies

Add these dependencies to your `pom.xml`:

```xml
<dependencies>
    <!-- WebSocket client -->
    <dependency>
        <groupId>org.java-websocket</groupId>
        <artifactId>Java-WebSocket</artifactId>
        <version>1.5.7</version>
    </dependency>

    <!-- JSON processing -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>2.18.1</version>
    </dependency>

    <!-- Lombok for reducing boilerplate -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.36</version>
        <scope>provided</scope>
    </dependency>

    <!-- Logging -->
    <dependency>
        <groupId>ch.qos.logback</groupId>
        <artifactId>logback-classic</artifactId>
        <version>1.5.12</version>
    </dependency>
</dependencies>
```

## Building and Running

### Build with Maven

```bash
mvn clean package
```

### Run the JAR

```bash
java -jar target/pulsar-simple-client.jar \
  --tenant YOUR_TENANT \
  --x-api-key YOUR_API_KEY
```

### Using Environment Variables

```bash
export PULSAR_API_KEY=your-api-key

java -jar target/pulsar-simple-client.jar \
  --tenant YOUR_TENANT
```

## Configuration Options

| Option        | Description                     | Default                       |
|---------------|---------------------------------|-------------------------------|
| `--tenant`    | Your 8x8 tenant name (required) | -                             |
| `--host`      | Pulsar broker hostname          | pulsar-ws-euw2.8x8.com (EUW2) |
| `--port`      | Pulsar broker port              | 443                           |
| `--namespace` | Pulsar namespace                | event-v1                      |
| `--topic`     | Topic name                      | all                           |
| `--x-api-key` | API key for authentication      | (from PULSAR_API_KEY env var) |

## Error Handling

The example includes error handling for:

- Connection failures
- Message parsing errors
- Base64 decoding errors
- WebSocket errors and disconnections
- Acknowledgement send failures (logged as warnings)

Errors are logged using SLF4J with Logback.

## Next Steps

- [Go Client Example](./golang.md) - See the same functionality in Go
- [Message Format](../message-format.mdx) - Learn more about message structure
- [Troubleshooting](../troubleshooting.md) - Common issues and solutions
