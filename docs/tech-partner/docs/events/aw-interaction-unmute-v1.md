# `unmute-v1` Event

The `unmute-v1` event is triggered when a voice interaction is unmuted in the Agent Workspace.

## Properties

*Object containing the following properties:*

| Property                    | Description                          | Type      |
| :-------------------------- | :----------------------------------- | :-------- |
| **`interactionId`** (\*)    | Unique identifier of the interaction  | `string`  |
| **`schemaVersion`** (\*)    | Current schema version of the event   | `'1.0.0'` |

*(\*) Required.*

## Event Emission

The `unmute-v1` event is emitted by the Agent Workspace MFE when the agent unmutes the active voice interaction.

## Listeners

The event is consumed by third-party integrators that need to track the muted state of an interaction.

## Additional Information

Sample event payload:

```json
{
  "interactionId": "interaction-12345",
  "schemaVersion": "1.0.0"
}
```
