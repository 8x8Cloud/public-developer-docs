# events

8x8 products provide a comprehensive set of events that partners can receive, enabling enhanced integration capabilities. Partners also have the ability to send events to the 8x8 platform.

>
> Note: Event availability varies by integration type. To determine which events are available for a specific integration, use the `partnerSDK.system.getEvents()` method from the [SDK](https://www.npmjs.com/package/@8x8/pui-partner-comm#getevents).
>
>
>

## Received

The following table lists the events that can be received:

| event name                                                                                                           | schema versions | status | active date      | deprecation date | sunset date     |
|----------------------------------------------------------------------------------------------------------------------|-----------------|--------|------------------|------------------|-----------------|
| global-user-details-v1                                                                                               | 1.0.0           | active | 26 March 2025    | -                | -               |
| aw-interaction-mute-v1                                                                                               | 1.0.0           | active | 26 March 2025    | -                | -               |
| aw-interaction-unmute-v1                                                                                             | 1.0.0           | active | 26 March 2025    | -                | -               |
| aw-interaction-hold-v1                                                                                               | 1.0.0           | active | 26 March 2025    | -                | -               |
| aw-close-agent-assist-v1                                                                                             | 1.0.0           | active | 26 March 2025    | -                | -               |
| aw-interaction-focus-v1                                                                                              | 1.0.0           | active | 26 March 2025    | 8 September 2025 | 8 December 2026 |
| aw-interaction-focus-v2                                                                                              | 2.0.0           | active | 8 September 2025 | -                | -               |
| aw-interaction-resume-v1                                                                                             | 1.0.0           | active | 26 March 2025    | -                | -               |
| aw-interaction-wrap-up-codes-v1                                                                                      | 1.0.0           | active | 26 March 2025    | -                | -               |
| aw-chat-init-v1                                                                                                      | 1.0.0           | active | 20 March 2025    | -                | -               |
| aw-chat-message-sent-v1                                                                                              | 1.0.0           | active | 20 March 2025    | -                | -               |
| [mashell-chat-nextgen-offered-cc-event-v1](/tech-partner/docs/events/mashell-chat-nextgen-offered-cc-event-v1)       | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-chat-nextgen-accepted-cc-event-v1](/tech-partner/docs/events/mashell-chat-nextgen-accepted-cc-event-v1)     | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-chat-nextgen-completed-cc-event-v1](/tech-partner/docs/events/mashell-chat-nextgen-completed-cc-event-v1)   | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-chat-nextgen-terminated-cc-event-v1](/tech-partner/docs/events/mashell-chat-nextgen-terminated-cc-event-v1) | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-chat-offered-cc-event-v1](/tech-partner/docs/events/mashell-chat-offered-cc-event-v1)                       | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-chat-accepted-cc-event-v1](/tech-partner/docs/events/mashell-chat-accepted-cc-event-v1)                     | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-chat-completed-cc-event-v1](/tech-partner/docs/events/mashell-chat-completed-cc-event-v1)                   | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-chat-terminated-cc-event-v1](/tech-partner/docs/events/mashell-chat-terminated-cc-event-v1)                 | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-email-accepted-cc-event-v1](/tech-partner/docs/events/mashell-email-accepted-cc-event-v1)                   | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-email-terminated-cc-event-v1](/tech-partner/docs/events/mashell-email-terminated-cc-event-v1)               | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-voice-phone-offered-cc-event-v1](/tech-partner/docs/events/mashell-voice-phone-offered-cc-event-v1)         | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-voice-phone-accepted-cc-event-v1](/tech-partner/docs/events/mashell-voice-phone-accepted-cc-event-v1)       | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-voice-phone-completed-cc-event-v1](/tech-partner/docs/events/mashell-voice-phone-completed-cc-event-v1)     | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-voice-phone-terminated-cc-event-v1](/tech-partner/docs/events/mashell-voice-phone-terminated-cc-event-v1)   | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-voice-phone-offered-uc-event-v1](/tech-partner/docs/events/mashell-voice-phone-offered-uc-event-v1)         | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-voice-phone-accepted-uc-event-v1](/tech-partner/docs/events/mashell-voice-phone-accepted-uc-event-v1)       | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-voice-phone-terminated-uc-event-v1](/tech-partner/docs/events/mashell-voice-phone-terminated-uc-event-v1)   | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-voicemail-offered-cc-event-v1](/tech-partner/docs/events/mashell-voicemail-offered-cc-event-v1)             | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-voicemail-accepted-cc-event-v1](/tech-partner/docs/events/mashell-voicemail-accepted-cc-event-v1)           | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-voicemail-completed-cc-event-v1](/tech-partner/docs/events/mashell-voicemail-completed-cc-event-v1)         | 1.0.0           | active | 6 May 2025       | -                | -               |
| [mashell-voicemail-terminated-cc-event-v1](/tech-partner/docs/events/mashell-voicemail-terminated-cc-event-v1)       | 1.0.0           | active | 6 May 2025       | -                | -               |

## Send

The following table lists the events that can be sent using the `system.sendEvent` method:

| event name                               | schema versions | status | active date      | deprecation date | sunset date |
|------------------------------------------|-----------------|--------|------------------|------------------|-------------|
| aw-chat-message-received-v1              | 1.0.0           | active | 8 September 2025 | -                | -           |
| aw-interaction-wrap-up-codes-received-v1 | 1.0.0           | active | 30 October 2025  | -                | -           |
