# `hold-v1` Event

The `hold-v1` event is triggered when a voice interaction is placed on hold in the Agent Workspace.

## Properties

*Object containing the following properties:*

| Property                    | Description                          | Type      |
| :-------------------------- | :----------------------------------- | :-------- |
| **`interactionId`** (\*)    | Unique identifier of the interaction  | `string`  |
| **`schemaVersion`** (\*)    | Current schema version of the event   | `'1.0.0'` |

*(\*) Required.*

## Event Emission

The `hold-v1` event is emitted by the Agent Workspace MFE when the agent places an interaction on hold.

## Listeners

The event is consumed by third-party integrators that need to track when interactions are placed on hold.

## Additional Information

Sample event payload:

```json
{
  "interactionId": "interaction-12345",
  "schemaVersion": "1.0.0"
}
```
