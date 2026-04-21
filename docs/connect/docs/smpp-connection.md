# SMPP - Connection

8x8 supports SMPP (Short Message Peer-to-Peer), a mature binary protocol widely used in carrier-grade SMS infrastructure. Unlike REST APIs, SMPP uses persistent TCP connections and is designed for sustained, high-volume message throughput with low latency.

This connection method is a good fit if you are running enterprise messaging software, an SMS gateway, or any platform that natively speaks SMPP. For new integrations without an existing SMPP requirement, the [8x8 SMS API](/connect/docs/getting-started-with-sms-api) offers a simpler REST-based alternative.

The 8x8 SMPP environment runs on a high-availability cluster designed for enterprise-scale traffic. Connecting to our regional hostnames provides automatic failover and intelligent load balancing to ensure optimal performance.

### Protocol Specification

> **Version:** SMPP v3.4  
> **Format:** All PDUs must conform to the standard v3.4 binary specification.

---

## Connection Details

The hostname depends on the [platform region](/connect/docs/data-center-region) your account is provisioned in.

| Setting | Value |
| --- | --- |
| Hostname (Asia Pacific) | smpp.8x8.com |
| Hostname (Europe) | smpp.8x8.uk |
| Port | 2775 (Legacy/Non-Secure) |
| Port (TLS) | 2776 (TLS v1.3) |
| system_id | your username |
| password | your password |

### Security & Compliance

* **IP Whitelisting:** For enhanced security, SMPP binds are strictly controlled via IP Whitelisting. Please provide your source IP addresses to your account manager during onboarding to enable access.
* **Encryption:** Port 2775 is maintained for legacy compatibility and transmits in plaintext. Use **Port 2776 (TLS v1.3)** for all production environments to ensure data integrity.
* **IPSec:** For enhanced network-level security, 8x8 also supports **IPSec Tunnel** binds. Contact [support](mailto:cpaas-support@8x8.com) for setup details.

---

## Binding & Architecture

A bind is a persistent TCP session between your application and the 8x8 SMPP server. The bind type determines the direction of message flow:

* **`bind_transmitter`**: Dedicated to sending messages (MT traffic).
* **`bind_receiver`**: Dedicated to receiving messages and delivery receipts (MO and DLRs).
* **`bind_transceiver`**: Supports bidirectional traffic on a single connection.

### Performance Optimization

For high-throughput integrations, we recommend splitting traffic into dedicated **transmitter** and **receiver** binds. This architecture prevents "head-of-line blocking," ensuring that a high volume of outbound submissions (`submit_sm`) does not delay the processing of inbound delivery receipts (`deliver_sm`).

### Session Management

* **Capacity:** Accounts are typically provisioned with a baseline of **4 concurrent binds** per `system_id`.
* **Elasticity:** For customers requiring higher parallelization, additional binds can be allocated to meet your architecture's needs.
* **DLR Routing:** 8x8 intelligently routes delivery receipts (`deliver_sm`) to any active bind sharing the same `system_id`, ensuring consistent updates regardless of which session originated the message.

---

## Throughput & Performance

The 8x8 platform is engineered to handle massive, carrier-grade message volumes. To ensure a smooth integration, we apply the following performance baselines:

* **Baseline Throughput:** By default, connections start at **50 messages per second (MPS) per bind**.
* **Enterprise Scaling:** We routinely scale MPS limits significantly higher for high-volume customers. Your account manager can adjust these limits to match your specific production requirements.
* **Asynchronous Windowing:** To achieve maximum performance, we recommend using an asynchronous windowing approach, allowing you to submit multiple PDUs without waiting for individual responses.

---

## Supported PDUs

| PDU | Description |
| --- | --- |
| `bind_*` | Authenticate and establish the session |
| `submit_sm` | Submit a short message for delivery |
| `enquire_link` | Keep-alive heartbeat to maintain the session |
| `deliver_sm_resp` | Acknowledge a received `deliver_sm` (DLR) |
| `unbind` | Gracefully terminate the session |

---

## Data Encoding

When sending messages, set the correct Data Coding Scheme (DCS) value in your `submit_sm` PDU:

| DCS Value | Encoding |
| --- | --- |
| 0 or 1 | GSM7 (default) |
| 3 | Latin-1 (ISO-8859-1) |
| 8 | Unicode (UCS-2) |
