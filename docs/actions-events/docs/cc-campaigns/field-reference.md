---
sidebar_position: 6
---

# Field Reference

:::warning BETA

**The Contact Center Campaigns API is currently in Beta.** See the [Overview](./overview.md) for details.

:::

This page documents the full schema for every object and enum used in the Contact Center Campaigns API.

## Objects

### `Campaign`

Returned in the response body of every `PATCH /campaigns/{campaignId}` call.

| Field              | Type                     | Description                                                        | Example                                  |
|--------------------|--------------------------|--------------------------------------------------------------------|------------------------------------------|
| `id`               | UUID                     | Campaign unique identifier                                          | `123e4567-e89b-12d3-a456-426614174000`   |
| `tenantId`         | string                   | Tenant identifier                                                   | `tenant-123`                             |
| `integrationType`  | string                   | Integration type                                                    | `contactual`                             |
| `startTime`        | timestamp                | Scheduled start time (ISO 8601)                                     | `2026-04-22T10:00:00Z`                   |
| `endTime`          | timestamp                | Scheduled end time (ISO 8601)                                       | `2026-04-22T18:00:00Z`                   |
| `state`            | [`CampaignState`](#campaignstate)              | Current campaign state                                                              | `RUNNING`              |
| `displayStatus`    | [`CampaignDisplayStatus`](#campaigndisplaystatus)      | UI-oriented derived status                                                          | `RUNNING`              |
| `recordCount`      | number                   | Total number of records                                             | `1500`                                   |
| `recordCounts`     | array of [`RecordCount`](#recordcount) | Breakdown of record counts by type, state, and result                                     | see example                              |
| `lastBuildTime`    | timestamp                | Last time campaign records were built (ISO 8601)                    | `2026-04-22T09:55:00Z`                   |
| `lastPurgedTime`   | timestamp                | Last time campaign was purged (ISO 8601)                            | `2026-04-21T23:00:00Z`                   |
| `startedTime`      | timestamp                | Time campaign actually started (ISO 8601)                           | `2026-04-22T10:00:05Z`                   |
| `completedTime`    | timestamp                | Time campaign completed (ISO 8601)                                  | `2026-04-22T17:45:00Z`                   |

Fields whose value is unknown or not applicable are omitted from the response rather than included with a `null` value.

#### `RecordCount`

A single entry in `Campaign.recordCounts`, aggregating record counts by the combination of type, state, and result.

| Field    | Type                                    | Description                 | Example   |
|----------|-----------------------------------------|-----------------------------|-----------|
| `type`   | [`RecordType`](#recordtype)             | Record type                 | `DYNAMIC` |
| `state`  | [`RecordState`](#recordstate)           | Record state                | `READY`   |
| `result` | [`RecordResult`](#recordresult)         | Record result               | `SUCCESS` |
| `count`  | number                                  | Count of matching records   | `45`      |

### `Record`

Returned as part of the response to `POST /campaigns/{campaignId}/records`.

| Field              | Type                              | Description                                            | Example                                  |
|--------------------|-----------------------------------|--------------------------------------------------------|------------------------------------------|
| `id`               | UUID                              | Record unique identifier                               | `789e4567-e89b-12d3-a456-426614174000`   |
| `type`             | [`RecordType`](#recordtype)       | Record type                                            | `DYNAMIC`                                |
| `crmRecordId`      | string                            | CRM record identifier (1-32 characters)                | `CRM-12345`                              |
| `priority`         | [`RecordPriority`](#recordpriority) | Priority for dialing order                           | `HIGH`                                   |
| `rank`             | number                            | Ranking within priority group                          | `1.5`                                    |
| `nextAttemptAfter` | timestamp                         | Earliest time the record may be attempted next         | `2026-04-23T11:30:00Z`                   |
| `retryCount`       | number                            | Number of retry attempts so far                        | `2`                                      |
| `state`            | [`RecordState`](#recordstate)     | Current record state                                   | `PENDING`                                |
| `stateReason`      | string                            | Reason for the current state (if any)                  | `Scheduled for retry`                    |
| `result`           | [`RecordResult`](#recordresult)   | Final result of record processing, once complete       | `SUCCESS`                                |

### `AddRecordRequest`

Sent as each item inside the `records` array on `POST /campaigns/{campaignId}/records`.

| Field         | Type                              | Required | Constraints                          | Description                                                                                    |
|---------------|-----------------------------------|----------|--------------------------------------|------------------------------------------------------------------------------------------------|
| `crmRecordId` | string                            | ✓        | 1-32 characters; unique in campaign  | CRM record identifier                                                                          |
| `scheduleAt`  | timestamp                         | no       | ISO 8601                             | Earliest time the record may be attempted. Records are ordered by earliest `scheduleAt` first. |
| `priority`    | [`RecordPriority`](#recordpriority) | no     | default `HIGH`                       | Dialing priority                                                                               |
| `rank`        | number                            | no       | auto-assigned if omitted              | Ordering within the priority group. If omitted, the server assigns a rank equal to the current number of records in that priority group plus one. |

## Enums

### `CampaignState`

The 11 possible states of a campaign. Used in `Campaign.state` and as the precondition for every action.

| Value          | Description                                                                                                                       |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------|
| `CREATED`      | The campaign has just been created and is not yet active. You can edit or delete the campaign in this state.                       |
| `BUILDING`     | The system is querying CRM data and preparing the campaign for use. The CRM query and filter can be edited and the campaign rebuilt as many times as needed before it is started. |
| `READY`        | The campaign is fully built and ready to be started. You can still edit or delete the campaign at this stage.                     |
| `PENDING`      | The campaign has been started and is waiting for its scheduled start time. No further edits are allowed.                         |
| `STARTING`     | The campaign is in the process of starting, which may include final preparations before it becomes active.                        |
| `RUNNING`      | The campaign is currently active and dialing records as agents become available. No edits or deletions are allowed.               |
| `PAUSED`       | New records are no longer being added to the dialing queue, but records already queued will still be dialed. The campaign can be resumed. |
| `COMPLETE`     | The campaign has finished running, either because it reached its end time or was cancelled. A completed campaign cannot be restarted, but it can be deleted. |
| `BUILD_ERROR`  | An error occurred while building the campaign. You can edit or delete the campaign to resolve the issue.                          |
| `RUN_ERROR`    | An error occurred while running the campaign. The campaign cannot be edited or deleted until the error is resolved.               |
| `DELETED`      | The campaign has been removed from active use. It is retained for record-keeping but cannot be modified or restored.              |

See the [State Machine](./state-machine.md) for transitions.

### `CampaignAction`

The 8 actions that can be sent as the `action` field of a `PATCH /campaigns/{campaignId}` request.

| Value    | Description                                                                                               |
|----------|-----------------------------------------------------------------------------------------------------------|
| `BUILD`  | Prepares a newly created campaign for use.                                                                |
| `RESET`  | Resets a campaign that is `READY` or has a `BUILD_ERROR`, allowing you to rebuild it.                      |
| `START`  | Starts a campaign that is `READY`, moving it to the next phase.                                            |
| `PAUSE`  | Temporarily stops a `RUNNING` campaign. Can be resumed later.                                              |
| `RESUME` | Resumes a `PAUSED` campaign, returning it to `RUNNING`.                                                    |
| `RETRY`  | Retries a campaign that encountered a `RUN_ERROR`.                                                         |
| `CANCEL` | Cancels a campaign that is `PENDING`, `RUNNING`, `PAUSED`, or in `RUN_ERROR`.                              |
| `PURGE`  | Clears all queued interactions for a campaign that is `PAUSED`, `RUN_ERROR`, or `COMPLETE`.                 |

For the full valid-from-states matrix, see the [State Machine](./state-machine.md#actions-and-their-preconditions).

### `CampaignDisplayStatus`

A UI-oriented derived status attached to every `Campaign`. Each value is derived from the campaign's `state` and `enabled` flag. Use `state` for automation logic; `displayStatus` is only intended for human-readable display.

| Value           | Derived from                                                                             |
|-----------------|------------------------------------------------------------------------------------------|
| `NEW`           | `state = CREATED`                                                                         |
| `BUILDING`      | `state = BUILDING` or `state = STARTING`                                                  |
| `BUILD_FAILED`  | `state = BUILD_ERROR`                                                                     |
| `READY_TO_RUN`  | `state = READY`                                                                           |
| `SCHEDULED`     | `state = PENDING`                                                                         |
| `RUNNING`       | `state = RUNNING`                                                                         |
| `PAUSED`        | `state = PAUSED` with no pending purge                                                    |
| `PURGED`        | `state = PAUSED` and the campaign has been purged                                         |
| `ERROR`         | `state = RUN_ERROR` with no pending purge                                                 |
| `ERROR_PURGED`  | `state = RUN_ERROR` and the campaign has been purged                                      |
| `COMPLETED`     | `state = COMPLETE` or `state = DELETED`                                                   |
| `STOPPED`       | `state = COMPLETE` or `state = DELETED` when the campaign was cancelled via `CANCEL`       |
| `DISABLED`      | `enabled = false` (regardless of state)                                                   |

### `RecordType`

| Value       | Description                                               |
|-------------|-----------------------------------------------------------|
| `CRM_QUERY` | Record derived from a CRM query configured on the campaign. |
| `DYNAMIC`   | Record added dynamically (e.g. through this API).         |

### `RecordState`

The 9 possible states of a record.

| Value              | Description                                                                                   |
|--------------------|-----------------------------------------------------------------------------------------------|
| `PENDING`          | Waiting to be processed.                                                                       |
| `REQUESTED`        | An interaction has been requested.                                                             |
| `QUEUED`           | An interaction is queued for routing.                                                          |
| `CANCEL_REQUESTED` | Cancellation is in progress.                                                                   |
| `AGENT_ACCEPTED`   | An agent has accepted the interaction.                                                         |
| `COMPLETE`         | Processing completed successfully.                                                             |
| `REJECTED`         | Record was rejected as not valid (for example, no valid phone numbers).                        |
| `DELETED`          | Record has been soft-deleted.                                                                   |
| `ERROR`            | An error occurred during processing.                                                           |

### `RecordResult`

The final outcome of a record's processing, set once the record reaches a terminal state.

| Value                  | Description                                                                         |
|------------------------|-------------------------------------------------------------------------------------|
| `SUCCESS`              | Completed with a successful interaction.                                             |
| `NO_VALID_NUMBER`      | Rejected — no valid phone numbers were found in CRM.                                 |
| `SCHEDULE_COMPLETE`    | Schedule has no future active date.                                                  |
| `INTERACTION_FAILED`   | The interaction was not successful and no retries are configured.                    |
| `MAX_ATTEMPTS_REACHED` | The interaction was not successful after the configured number of retries.           |
| `INTERACTION_SKIPPED`  | The interaction was skipped by the agent.                                            |
| `CALLBACK_SCHEDULED`   | A callback was scheduled by the agent.                                               |

### `RecordPriority`

Dialing priority. Records are dialed `HIGH` first, then `MEDIUM`, then `LOW`. Within a priority group, records are ordered by `rank`.

| Value    | Description    |
|----------|----------------|
| `HIGH`   | Highest priority (default) |
| `MEDIUM` | Medium priority |
| `LOW`    | Lowest priority |

## Next steps

- [Endpoints](./endpoints.md) - Request and response reference
- [Campaign State Machine](./state-machine.md) - Valid action / state matrix
- [Troubleshooting](./troubleshooting.md) - Error format and common issues
