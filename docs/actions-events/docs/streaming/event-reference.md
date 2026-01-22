---
sidebar_position: 7
---

# Event Reference

This page provides a complete catalog of all event types available in the 8x8 Event Streaming service, organized by category, along with detailed JSON examples for common events.

## Event Types by Category

The 8x8 Event Streaming service provides the following event types:

### Agent Events

| Event Type          | Call State | Description                                              |
|---------------------|------------|----------------------------------------------------------|
| `AgentStatusChange` | N/A        | Indicates the current status of the monitored agent      |
| `AgentProvChange`   | N/A        | Indicates a change to the agent profile (skills, etc.)   |
| `AgentSkillCreated` | N/A        | Indicates a new agent skill has been created             |
| `AgentSkillChanged` | N/A        | Indicates an agent skill has been modified (enabled/disabled) |

### Interaction Events

| Event Type                           | Call State                  | Description                                                        |
|--------------------------------------|-----------------------------|--------------------------------------------------------------------|
| `InteractionCreated`                 | CS_IDLE<br />CS_QUEUED          | Indicates a new outbound or inbound interaction creation          |
| `InteractionQueued`                  | CS_QUEUED                   | Indicates an interaction waiting to be assigned to an agent       |
| `InteractionAssigned`                | CS_INPROGRESS               | Indicates an interaction assigned to an available agent           |
| `InteractionAccepted`                | CS_INPROGRESS<br />CS_CONNECTED | Indicates an interaction accepted by an agent                     |
| `InteractionCustomerAccepted`        | CS_CONNECTED                | Indicates a ringing outbound call answered by the customer        |
| `InteractionRejected`                | CS_QUEUED                   | Indicates an agent rejected an offered interaction                |
| `InteractionUnqueued`                | CS_IDLE<br />CS_QUEUED          | Indicates an interaction removed from queue before assignment     |
| `LineHoldStatus`                     | CS_HOLD<br />CS_CONNECTED       | Indicates hold status change for an ongoing call                  |
| `LineMuteStatus`                     | CS_CONNECTED                | Indicates mute status change for an ongoing call                  |
| `InteractionRecordingStarted`        | N/A                         | Indicates the system has started recording a call leg             |
| `RecordingStatus`                    | N/A                         | Indicates a recording status change (pause/resume)                |
| `InteractionPostProcess`             | CS_DISCONNECTED             | Indicates the start of interaction wrap-up                        |
| `InteractionRecordingReady`          | N/A                         | Indicates an interaction recording is ready for retrieval         |
| `InteractionEndPostProcess`          | CS_DISCONNECTED             | Indicates the conclusion of interaction wrap-up                   |
| `InteractionDeassigned`              | CS_DISCONNECTED             | Indicates an interaction deassigned from an agent                 |
| `InteractionTransferRequest`         | N/A                         | Indicates a transfer request for an interaction                   |
| `InteractionReconnect`               | N/A                         | Indicates an interaction reconnect event                          |
| `InteractionParticipantChange`       | CS_DISCONNECTED             | Indicates participant changes (conference, supervisor join, etc.) |
| `InteractionParticipantRemovedByHost`| N/A                         | Indicates a participant removed from interaction by host          |
| `InteractionJoinLinesRequest`        | N/A                         | Indicates a request to join multiple lines                        |
| `InteractionJoined`                  | N/A                         | Indicates multiple lines have been joined                         |
| `InteractionChanged`                 | N/A                         | Indicates interaction properties have changed                     |
| `InteractionQueueTimeout`            | N/A                         | Indicates an interaction timed out in queue                       |
| `InteractionDeleted`                 | CS_DISCONNECTED             | Indicates interaction ended or call leg left conference           |

### Digital Channel Events

| Event Type     | Description                                           |
|----------------|-------------------------------------------------------|
| `GuestChatEnd` | Indicates a guest chat session has ended              |

### Media/Proxy Events

| Event Type          | Description                                     |
|---------------------|-------------------------------------------------|
| `MediaProxyAdded`   | Indicates a media proxy has been added          |
| `MediaProxyRemoved` | Indicates a media proxy has been removed        |

## Event Payload Examples

This section provides complete JSON examples for common event types. For field definitions, see the [Field Reference](./field-reference.mdx).

### AgentStatusChange

```json
{
  "AgentStatusChange": {
    "agentId": "ag64oyEUb_Sk6bxVB9P5yaaa",
    "msgInfo": {
      "instanceId": "example.8x8.com",
      "sequenceId": 215,
      "timestamp": 1669235544917
    },
    "newReasonCodeUser": "801=1722",
    "newState": 5,
    "newSubState": "none",
    "newSubStateReason": "none",
    "statusEventTS": 1669235544
  }
}
```

**Field Descriptions:**
- `agentId`: Unique agent identifier
- `newState`: Numeric state code
- `newSubState`: Sub-state description
- `newReasonCodeUser`: User-defined reason code
- `statusEventTS`: Status event timestamp (seconds since epoch)

### AgentProvChange / AgentSkillChanged

This event indicates a change to agent provisioning, such as skills being added, removed, or modified.

```json
{
  "AgentProvChange": {
    "agentId": "agUeZBQ3RnQTaL0qZZukNOaw",
    "enabled": "yes",
    "event": "AgentSkillChanged",
    "msgInfo": {},
    "skillId": "tenant01-agUeZBQ3RnQTaL0qZZukNOaw-phone-529-f01e6bdb-75a2-4639-825c-91c0f5168258",
    "tenantSkillId": "tenant01-phone-529-b1e3e2f2-b01a-4a03-ba3d-f30859414d97"
  }
}
```

**Field Descriptions:**
- `event`: Type of provisioning change ("AgentSkillChanged", "AgentSkillCreated", etc.)
- `enabled`: Whether the skill/feature is enabled ("yes"/"no")
- `skillId`: Full skill identifier including agent ID and GUID
- `tenantSkillId`: Tenant-specific skill ID with GUID

**Note:** The `skillId` and `tenantSkillId` formats include GUIDs that uniquely identify the skill assignment.

### InteractionCreated

```json
{
  "Interaction": {
    "attachedData": {
      "attachedDatum": [
        {"attachedDataKey": "@pri", "attachedDataValue": 100},
        {"attachedDataKey": "callingName", "attachedDataValue": "Andrew Cunningh"},
        {"attachedDataKey": "phoneNum", "attachedDataValue": 5515557212}
      ]
    },
    "callState": "CS_QUEUED",
    "event": "InteractionCreated",
    "interactionGUID": "int-184a63564dc-ohWfVIbHJz2Hr2JFhAfdlb4Fa-phone-00-acmecorp01",
    "msgInfo": {
      "instanceId": "example.8x8.com",
      "sequenceId": 220,
      "timestamp": 1669235700000
    },
    "resourceType": 0
  }
}
```

### InteractionQueued

```json
{
  "Interaction": {
    "attachedData": {
      "attachedDatum": [
        {"attachedDataKey": "@pri", "attachedDataValue": 100},
        {"attachedDataKey": "callingName", "attachedDataValue": 447799147855},
        {"attachedDataKey": "cha", "attachedDataValue": 441733968848},
        {"attachedDataKey": "channelName", "attachedDataValue": "Support Queue"},
        {"attachedDataKey": "phoneNum", "attachedDataValue": 447799147855},
        {"attachedDataKey": "priority", "attachedDataValue": 50},
        {"attachedDataKey": "queueDirection", "attachedDataValue": "in"},
        {"attachedDataKey": "tenantName", "attachedDataValue": "tenant01"},
        {"attachedDataKey": "tenantSkillName", "attachedDataValue": "Customer Service"}
      ]
    },
    "callState": "CS_QUEUED",
    "callerPermission": "yes",
    "direction": "in",
    "event": "InteractionQueued",
    "eventTS": 1744819217,
    "inboundChannelid": 441733968848,
    "interactionEventTS": 1744819217,
    "interactionGUID": "int-1963f541b9f-wgyWcn0J0hwtyhN4XfMHIfCIO-phone-01-tenant01",
    "isAgentInitiated": false,
    "mediaType": "phone",
    "msgInfo": {},
    "overrideAutoInteractionRecording": "yes",
    "priority": 50,
    "queueId": 1162,
    "queueList": 1162,
    "queueTime": 1744819217,
    "resourceType": 0,
    "transactionNum": 848184
  }
}
```

**Field Descriptions:**
- `direction`: "in" for inbound, "out" for outbound
- `mediaType`: Communication channel ("phone", "chat", "email")
- `priority`: Queue priority (higher numbers = higher priority)
- `queueId`: Numeric queue identifier
- `queueList`: Queue list identifier
- `queueTime`: Time when interaction entered queue (seconds since epoch)
- `eventTS`: Event timestamp (seconds since epoch)
- `transactionNum`: Transaction number
- `callerPermission`: Whether caller granted recording permission
- `overrideAutoInteractionRecording`: Recording override setting

### InteractionDeleted

```json
{
  "Interaction": {
    "attachedData": {
      "attachedDatum": [
        {"attachedDataKey": "callingName", "attachedDataValue": "Andrew Cunningh"},
        {"attachedDataKey": "phoneNum", "attachedDataValue": 5515557212}
      ]
    },
    "callHangupReason": "CEC_DISCONNECT_NORMAL",
    "callState": "CS_DISCONNECTED",
    "dispositionCode": 1000,
    "event": "InteractionDeleted",
    "hangupInitiator": "CUSTOMER",
    "interactionGUID": "int-184a63564dc-ohWfVIbHJz2Hr2JFhAfdlb4Fa-phone-00-acmecorp01",
    "msgInfo": {
      "instanceId": "example.8x8.com",
      "sequenceId": 235,
      "timestamp": 1669236000000
    }
  }
}
```

**Field Descriptions:**
- `hangupInitiator`: Who ended the call ("AGENT", "CUSTOMER", "SYSTEM")
- `callHangupReason`: Reason code for hangup (see Hangup Reasons below)
- `dispositionCode`: Call disposition code

**Hangup Reasons:**
- `CEC_NONE`: No specific reason
- `CEC_DISCONNECT_NORMAL`: Normal call termination
- `CEC_DISCONNECT_BUSY`: Number was busy
- `CEC_DISCONNECT_BADADDRESS`: Invalid phone number
- `CEC_DISCONNECT_NOANSWER`: No answer
- `CEC_DISCONNECT_CANCELLED`: Call cancelled
- `CEC_DISCONNECT_REJECTED`: Call rejected
- `CEC_DISCONNECT_FAILED`: Call failed
- `CEC_DISCONNECT_BLOCKED`: Call blocked

### InteractionAssigned

Indicates an interaction has been assigned to an available agent. This event occurs before the agent accepts the interaction.

```json
{
  "Interaction": {
    "agentGUID": "tenant01-agAglVJkg0TU28dok9y9UQKg-e46672cd-660c-46f5-b8f0-856eaf18f65c",
    "agentId": "agAglVJkg0TU28dok9y9UQKg",
    "agentPhone": 40375,
    "agentRscWaitTime": 30,
    "agentTreatedPhone": "40375-tenant",
    "attachedData": {
      "attachedDatum": [
        {"attachedDataKey": "@pri", "attachedDataValue": 50},
        {"attachedDataKey": "phoneNum", "attachedDataValue": 6298994259},
        {"attachedDataKey": "tenantSkillName", "attachedDataValue": "Sales Queue"}
      ]
    },
    "callState": "CS_INPROGRESS",
    "direction": "out",
    "event": "InteractionAssigned",
    "eventTS": 1744819092,
    "interactionGUID": "int-1963f527a2a-9wjz0hrkcolMxIqiOhxEsKFe9-phone-01-tenant01",
    "isAgentInitiated": false,
    "isDirectAccess": false,
    "isExternal": true,
    "isOutboundCall": true,
    "mediaType": "phone",
    "msgInfo": {},
    "outboundCampaignid": 4926,
    "participatingAgents": "agAglVJkg0TU28dok9y9UQKg",
    "promptingTimeout": 30,
    "queueId": 1092,
    "queueList": 1092,
    "queueTime": 1744819092,
    "recordingMode": "no",
    "resourceType": 0,
    "transactionNum": 279563
  }
}
```

**Field Descriptions:**
- `agentPhone`: Agent's phone number
- `agentRscWaitTime`: Time agent will wait for assignment (seconds)
- `agentTreatedPhone`: Formatted agent phone number
- `promptingTimeout`: Timeout for agent to respond (seconds)
- `outboundCampaignid`: Campaign ID (0 if not a campaign call)
- `isOutboundCall`: Boolean indicating outbound call

### InteractionRejected

Indicates an agent rejected an offered interaction (did not accept it).

```json
{
  "Interaction": {
    "agentGUID": "tenant01-ag9I1yUNAvRqG7ovVMi3NTyw-c40cf425-5b69-4575-99a7-ccd6457b0180",
    "agentId": "ag9I1yUNAvRqG7ovVMi3NTyw",
    "callState": "CS_QUEUED",
    "event": "InteractionRejected",
    "interactionEventTS": 1744819218,
    "interactionGUID": "int-1963f53a7f9-fRUlBL19w0hsi4GN50Xbcgazp-phone-03-tenant01",
    "msgInfo": {},
    "participatingAgents": "ag9I1yUNAvRqG7ovVMi3NTyw",
    "queueList": 222,
    "rejectReason": 2,
    "resourceType": 0
  }
}
```

**Field Descriptions:**
- `rejectReason`: Numeric reason code for rejection (see [Field Reference](./field-reference.mdx#reject-reason-codes))

### LineHoldStatus

Indicates hold status change for an ongoing call. The `status` field indicates whether the call is being placed on hold (true) or taken off hold (false).

```json
{
  "Interaction": {
    "agentGUID": "tenant01-agGiRMDKqSRGuaNOelIJosUw-494708fb-81d3-415a-82da-c5d800d36f18",
    "agentId": "agGiRMDKqSRGuaNOelIJosUw",
    "callState": "CS_HOLD",
    "event": "LineHoldStatus",
    "interactionEventTS": 1744819224,
    "interactionGUID": "int-1963f52d470-OcB3AbajqjTb9ikyLLBxBr1l7-phone-02-tenant01",
    "mediaType": "phone",
    "msgInfo": {},
    "participatingAgents": "agGiRMDKqSRGuaNOelIJosUw",
    "status": true,
    "transactionNum": 429968
  }
}
```

**Field Descriptions:**
- `status`: `true` = call placed on hold (CS_HOLD), `false` = call taken off hold (CS_CONNECTED)

### RecordingStatus

Indicates a recording status change (pause or resume) for an ongoing interaction.

```json
{
  "Interaction": {
    "agentGUID": "tenant01-agFDUfx__VREaRSfGYYm5cNw-ad92a3d3-414a-4dfa-a971-dc0d28970d22",
    "agentId": "agFDUfx__VREaRSfGYYm5cNw",
    "event": "RecordingStatus",
    "interactionEventTS": 1744819223,
    "interactionGUID": "int-1963f4d8314-ShlIYL3nayugzbFYJvHhZgPL2-phone-03-tenant01",
    "isAPICall": false,
    "msgInfo": {},
    "recordingMode": "yes",
    "status": "resume",
    "transactionNum": 5511
  }
}
```

**Field Descriptions:**
- `status`: Recording status - "resume" or "pause"
- `isAPICall`: Whether the status change was triggered via API
- `recordingMode`: Overall recording mode for interaction

## Next Steps

- [Message Format](./message-format.mdx) - Learn how to decode and process messages
- [Field Reference](./field-reference.mdx) - Detailed field documentation
- [Code Examples](./examples/golang.md) - See event processing in context
