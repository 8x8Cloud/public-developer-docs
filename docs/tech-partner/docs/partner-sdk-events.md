# Events

8x8 products provide a comprehensive set of events that partners can receive, enabling enhanced integration capabilities. Partners also have the ability to send events to the 8x8 platform.

>
> Note: Event availability varies by integration type. To determine which events are available for a specific integration, use the `partnerSDK.system.getEvents()` method from the [SDK](https://www.npmjs.com/package/@8x8/pui-partner-comm#getevents).
>
>
>

## Global

The Platform UI Shell is the host application that frames every 8x8 product and embeds partner integrations. It provides cross-product context such as the current user's identity and session state.

### Received

The following table lists the events that can be received:

| event name | schema versions | status | active date | deprecation date | sunset date |
|---|---|---|---|---|---|
| [global-user-details-v1](/tech-partner/docs/events/global-user-details-v1) | 1.0.0 | active | 26 March 2025 | - | - |

## Agent Workspace

The 8x8 Agent Workspace is the agent-facing application of 8x8 Contact Center, where agents handle customer interactions across voice, chat, and other channels. It acts as a parent application that can embed partner integrations alongside the agent's active interactions.

### Received

The following table lists the events that can be received:

| event name | schema versions | status | active date | deprecation date | sunset date |
|---|---|---|---|---|---|
| [aw-chat-init-v1](/tech-partner/docs/events/aw-chat-init-v1) | 1.0.0 | active | 20 March 2025 | - | - |
| [aw-chat-message-sent-v1](/tech-partner/docs/events/aw-chat-message-sent-v1) | 1.0.0 | active | 20 March 2025 | - | - |
| [aw-close-agent-assist-v1](/tech-partner/docs/events/aw-close-agent-assist-v1) | 1.0.0 | active | 26 March 2025 | - | - |
| [aw-interaction-ended-v1](/tech-partner/docs/events/aw-interaction-ended-v1) | 1.0.0 | active | 16 March 2026 | - | - |
| [aw-interaction-focus-v1](/tech-partner/docs/events/aw-interaction-focus-v1) | 1.0.0 | deprecated | 26 March 2025 | 8 September 2025 | 8 December 2026 |
| [aw-interaction-focus-v2](/tech-partner/docs/events/aw-interaction-focus-v2) | 2.0.0 | deprecated | 8 September 2025 | 19 January 2025 | 19 July 2025 |
| [aw-interaction-focus-v3](/tech-partner/docs/events/aw-interaction-focus-v3) | 3.0.0 | active | 19 January 2025 | - | - |
| [aw-interaction-hold-v1](/tech-partner/docs/events/aw-interaction-hold-v1) | 1.0.0 | active | 26 March 2025 | - | - |
| [aw-interaction-mute-v1](/tech-partner/docs/events/aw-interaction-mute-v1) | 1.0.0 | active | 26 March 2025 | - | - |
| [aw-interaction-resume-v1](/tech-partner/docs/events/aw-interaction-resume-v1) | 1.0.0 | active | 26 March 2025 | - | - |
| [aw-interaction-started-v1](/tech-partner/docs/events/aw-interaction-started-v1) | 1.0.0 | active | 16 March 2026 | - | - |
| [aw-interaction-unmute-v1](/tech-partner/docs/events/aw-interaction-unmute-v1) | 1.0.0 | active | 26 March 2025 | - | - |
| [aw-interaction-wrap-up-codes-v1](/tech-partner/docs/events/aw-interaction-wrap-up-codes-v1) | 1.0.0, 1.0.1 | active | 26 March 2025 | - | - |

### Send

The following table lists the events that can be sent using the `system.sendEvent` method:

| event name | schema versions | status | active date | deprecation date | sunset date |
|---|---|---|---|---|---|
| [aw-chat-message-received-v1](/tech-partner/docs/events/aw-chat-message-received-v1) | 1.0.0 | active | 8 September 2025 | - | - |
| [aw-interaction-wrap-up-codes-received-v1](/tech-partner/docs/events/aw-interaction-wrap-up-codes-received-v1) | 1.0.0 | active | 30 October 2025 | - | - |

## Call Manager

The 8x8 Call Manager is the embedded call-control application that manages the agent's voice calls within the 8x8 experience — placing, receiving, and controlling active calls and conferences.

### Received

The following table lists the events that can be received:

| event name | schema versions | status | active date | deprecation date | sunset date |
|---|---|---|---|---|---|
| [call-manager-call-autoanswer-first-connect-v1](/tech-partner/docs/events/call-manager-call-autoanswer-first-connect-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-caller-number-change-v1](/tech-partner/docs/events/call-manager-call-caller-number-change-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-conference-drop-v1](/tech-partner/docs/events/call-manager-call-conference-drop-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-conference-start-v1](/tech-partner/docs/events/call-manager-call-conference-start-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-connect-v1](/tech-partner/docs/events/call-manager-call-connect-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-disconnected-v1](/tech-partner/docs/events/call-manager-call-disconnected-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-failed-v1](/tech-partner/docs/events/call-manager-call-failed-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-hold-v1](/tech-partner/docs/events/call-manager-call-hold-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-inbound-first-connect-v1](/tech-partner/docs/events/call-manager-call-inbound-first-connect-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-incoming-first-v1](/tech-partner/docs/events/call-manager-call-incoming-first-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-incoming-v1](/tech-partner/docs/events/call-manager-call-incoming-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-outbound-first-connect-v1](/tech-partner/docs/events/call-manager-call-outbound-first-connect-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-outgoing-v1](/tech-partner/docs/events/call-manager-call-outgoing-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-record-end-v1](/tech-partner/docs/events/call-manager-call-record-end-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-record-failed-v1](/tech-partner/docs/events/call-manager-call-record-failed-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-record-start-v1](/tech-partner/docs/events/call-manager-call-record-start-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-transfer-blind-success-v1](/tech-partner/docs/events/call-manager-call-transfer-blind-success-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-transfer-failed-v1](/tech-partner/docs/events/call-manager-call-transfer-failed-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-transfer-success-v1](/tech-partner/docs/events/call-manager-call-transfer-success-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-call-transfer-voicemail-success-v1](/tech-partner/docs/events/call-manager-call-transfer-voicemail-success-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-mute-disabled-v1](/tech-partner/docs/events/call-manager-mute-disabled-v1) | 1.0.0 | active | 12 February 2026 | - | - |
| [call-manager-mute-enabled-v1](/tech-partner/docs/events/call-manager-mute-enabled-v1) | 1.0.0 | active | 12 February 2026 | - | - |

## Maestro SDK Events

Mashell events are emitted by the embedded 8x8 experience within third-party CRMs and external applications. See the [Maestro SDK Events](/tech-partner/docs/partner-sdk-maestro-sdk-events) page for the full list.
