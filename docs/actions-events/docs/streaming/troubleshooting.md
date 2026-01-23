---
sidebar_position: 6
---

# Troubleshooting

Common issues when connecting to the 8x8 Event Streaming service.

## Connection Issues

### Cannot Connect to WebSocket

**Symptoms:**
- Connection timeout
- Connection refused error
- Network unreachable

**Solutions:**

1. **Verify the hostname and port:**

   ```bash
   # Test basic connectivity
   ping pulsar-ws-euw2.8x8.com

   # Test port accessibility
   nc -zv pulsar-ws-euw2.8x8.com 443
   ```

2. **Check firewall rules:**
   - Ensure outbound HTTPS (port 443) is allowed
   - Check corporate proxy settings
   - Verify VPN is not blocking the connection

3. **Verify DNS resolution:**

   ```bash
   nslookup pulsar-ws-euw2.8x8.com
   ```

### TLS/SSL Certificate Errors

**Symptoms:**
- Certificate verification failed
- x509: certificate signed by unknown authority
- SSL handshake failed

**Solutions:**

1. **Update root certificates:**

   ```bash
   # macOS
   brew upgrade ca-certificates

   # Ubuntu/Debian
   sudo apt-get update && sudo apt-get install ca-certificates
   ```

2. **For development only - skip verification:**

   ```bash
   # Go
   ./pulsar-client -insecure -tenant YOUR_TENANT -x-api-key YOUR_KEY
   ```

   :::danger
   Never use `-insecure` or `InsecureSkipVerify` in production!
   :::

### Connection Timeout

**Symptoms:**
- Connection hangs
- Timeout after 45 seconds

**Solutions:**

1. **Check network latency:**

   ```bash
   # Test network latency
   curl -w "@-" -o /dev/null -s https://pulsar-ws-euw2.8x8.com <<'EOF'
       time_connect: %{time_connect}s\n
       time_total: %{time_total}s\n
   EOF
   ```

2. **Increase timeout values:**
   - Set connection timeout to 60+ seconds for slow networks
   - Check if there are network issues between your location and the service

### Wrong Regional Endpoint

**Symptoms:**
- Connection succeeds but no events received
- Authorization succeeds but no data
- Empty message stream

**Solutions:**

1. **Verify you're using the correct regional endpoint:**
   - Check your Contact Center deployment region
   - See [Regional Endpoints](./connection.md#regional-endpoints) for hostname mapping
   - Example: If your Contact Center is in UK3, use `pulsar-ws-euw2.8x8.com`

2. **Confirm your region with 8x8 Support** if unsure

## Authentication Issues

### 401 Unauthorized

**Symptoms:**
- HTTP 401 status code
- "Unauthorized" error message

**Solutions:**

1. **Verify your API key:**
   - Check for typos or extra whitespace
   - Ensure you're using the correct API key for your tenant

2. **Check header format:**

   ```go
   // Recommended (conventional casing)
   headers.Set("X-API-Key", "your-api-key")

   // Also works (HTTP headers are case-insensitive)
   headers.Set("x-api-key", "your-api-key")

   // Wrong
   headers.Set("API-Key", "your-api-key")    // Missing X-
   ```

3. **Verify tenant name:**
   - Ensure tenant name matches your 8x8 organization
   - Check for typos in the tenant parameter

### 403 Forbidden

**Symptoms:**
- HTTP 403 status code
- "Forbidden" error message

**Solutions:**

1. **Verify API key permissions:**
   - Your API key may be valid but lack necessary permissions
   - Contact 8x8 support to verify your access level

2. **Check topic access:**
   - Ensure you have permission to read from the specified topic
   - Try the default topic `all` first

## Message Processing Issues

### Cannot Decode Payload

**Symptoms:**
- Base64 decode errors
- "illegal base64 data" error

**Solutions:**

1. **Verify payload extraction:**

   ```go
   // Correct - extract payload field from Pulsar message
   var pulsarMsg PulsarMessage
   json.Unmarshal(message, &pulsarMsg)
   payload, err := base64.StdEncoding.DecodeString(pulsarMsg.Payload)

   // Incorrect - trying to decode entire message
   payload, err := base64.StdEncoding.DecodeString(string(message))
   ```

2. **Check for truncated messages:**
   - Ensure you're reading the complete WebSocket message
   - Check buffer sizes and read loops

### Invalid JSON in Payload

**Symptoms:**
- JSON parse errors after decoding payload
- Unexpected data structure

**Solutions:**

1. **Pretty-print to inspect:**

   ```bash
   ./pulsar-client -tenant YOUR_TENANT -x-api-key YOUR_KEY | jq . | head -20
   ```

2. **Log the decoded payload:**

   ```go
   payload, _ := pulsarMsg.DecodePayload()
   log.Printf("Decoded payload: %s", string(payload))
   ```

### No Messages Received

**Symptoms:**
- Successfully connected but no messages appear
- Empty output

**Solutions:**

1. **Check starting position:**
   - By default, starts from `latest` (only new messages)
   - Try starting from `earliest` to see historical messages:

     ```bash
     # Using the client from the examples
     ./pulsar-simple-client -tenant YOUR_TENANT -x-api-key YOUR_KEY -message-id earliest
     ```

2. **Verify topic has messages:**
   - Check with 8x8 support that events are being published
   - Ensure your tenant is configured for event streaming

3. **Generate test events:**
   - Perform actions that trigger events (e.g., agent login)
   - Check if these events appear in the stream

## Performance Issues

### High Memory Usage

**Solutions:**

1. **Reduce receiver queue size:**
   - Lower the `receiverQueueSize` parameter
   - Process messages faster to avoid buffering

2. **Limit message history:**
   - Start from `latest` instead of `earliest`
   - Process messages in batches

### Slow Message Processing

**Solutions:**

1. **Optimize JSON parsing:**
   - Use efficient JSON parsers
   - Consider streaming JSON parsers for large messages

2. **Parallelize processing:**
   - Process messages in goroutines (Go) or threads (Java)
   - Use worker pools for CPU-intensive operations

## Debugging Tips

### Enable Verbose Logging

**Go:**

```go
log.SetFlags(log.LstdFlags | log.Lshortfile)
log.SetOutput(os.Stderr)
```

**Java:**

```xml
<!-- logback.xml -->
<configuration>
    <logger name="com._8x8" level="DEBUG"/>
    <logger name="org.java_websocket" level="DEBUG"/>
</configuration>
```

### Inspect WebSocket Traffic

Use tools like `wscat` or browser developer tools:

```bash
# Install wscat
npm install -g wscat

# Connect manually
wscat -c "wss://pulsar-ws-euw2.8x8.com/ws/v2/reader/persistent/YOUR_TENANT/event-v1/all?x-api-key=YOUR_KEY"
```

### Check Process Output

Redirect stderr and stdout separately:

```bash
./pulsar-client -tenant YOUR_TENANT -x-api-key YOUR_KEY 1>output.log 2>errors.log
```

## Getting Help

If you're still experiencing issues:

1. **Collect diagnostic information:**
   - Error messages and stack traces
   - Connection parameters (without API key!)
   - Network environment details
   - Client version information

2. **Review example code:**
   - [Go Client Example](./examples/golang.md)
   - [Java Client Example](./examples/java.md)
   - [Node.js Client Example](./examples/nodejs.mdx)
   - [Python Client Example](./examples/python.mdx)
   - [Browser UI](./examples/browser.md)

3. **Contact support:**
   - Reach out to 8x8 support with diagnostic information
   - Provide specific error messages and reproduction steps

## Common Error Messages

| Error Message                     | Likely Cause                | Solution                           |
|-----------------------------------|-----------------------------|------------------------------------|
| `connection refused`              | Wrong host/port or firewall | Verify hostname and check firewall |
| `401 Unauthorized`                | Invalid credentials         | Check API key and tenant name      |
| `403 Forbidden`                   | Insufficient permissions    | Contact support for access         |
| `certificate verify failed`       | TLS certificate issue       | Update root certificates           |
| `illegal base64 data`             | Incorrect payload parsing   | Extract payload field first        |
| `EOF` or `unexpected EOF`         | Connection closed           | Implement reconnection logic       |
| `context deadline exceeded`       | Timeout                     | Increase timeout or check network  |

## Best Practices

1. **Implement exponential backoff for reconnection**
2. **Log connection states and errors**
3. **Monitor connection health with ping/pong**
4. **Validate messages before processing**
5. **Handle disconnections gracefully**
6. **Keep client libraries up to date**

## Related Resources

- [Apache Pulsar Troubleshooting](https://pulsar.apache.org/docs/administration-troubleshooting/)
- [WebSocket Protocol Specification](https://datatracker.ietf.org/doc/html/rfc6455)
