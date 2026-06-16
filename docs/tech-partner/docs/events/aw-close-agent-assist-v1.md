# `close-agent-assist-v1` Event

The `close-agent-assist-v1` event is triggered when the Agent Workspace signals that the agent assist panel should be closed.

## Properties

*Object containing the following properties:*

| Property                    | Description                          | Type      |
| :-------------------------- | :----------------------------------- | :-------- |
| **`interactionId`** (\*)    | Unique identifier of the interaction  | `string`  |
| **`schemaVersion`** (\*)    | Current schema version of the event   | `'1.0.0'` |

*(\*) Required.*

## Event Emission

The `close-agent-assist-v1` event is emitted by the Agent Workspace MFE to instruct third-party agent assist integrations to close or hide their UI panel.

## Listeners

The event is consumed by third-party agent assist integrations embedded within the Agent Workspace.

## Additional Information

Sample event payload:

```json
{
  "interactionId": "interaction-12345",
  "schemaVersion": "1.0.0"
}
```
