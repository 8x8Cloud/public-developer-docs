# `interaction-focus-v1` Event

> **Deprecated** as of 8 September 2025. Use [`aw-interaction-focus-v2`](./aw-interaction-focus-v2) instead.

The `interaction-focus-v1` event is triggered when an interaction is brought into focus in the Agent Workspace.

## Properties

*Object containing the following properties:*

| Property                    | Description                          | Type      |
| :-------------------------- | :----------------------------------- | :-------- |
| **`interactionId`** (\*)    | Unique identifier of the focused interaction | `string`  |
| **`schemaVersion`** (\*)    | Current schema version of the event   | `'1.0.0'` |

*(\*) Required.*

## Event Emission

The `interaction-focus-v1` event is emitted by the Agent Workspace MFE when the agent selects or brings a specific interaction into focus.

## Listeners

The event is consumed by third-party integrators that need to react when the agent switches focus between interactions.

## Additional Information

Sample event payload:

```json
{
  "interactionId": "interaction-12345",
  "schemaVersion": "1.0.0"
}
```
