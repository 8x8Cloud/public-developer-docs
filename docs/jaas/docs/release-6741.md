# April 4, 2026 Release

## New Features

### Recording & Transcription

* Added separate transcription indicator with contextual notifications for clearer status visibility
* Recording advanced options now correctly shown in more scenarios, including when only transcriptions are enabled

### UI / UX

* Chat and closed captions panels now scroll to the latest messages when opened
* Virtual background preview now mirrors the camera feed correctly
* Fixed custom branding palette colors not being applied to semantic tokens
* GIF popover no longer closes on internal clicks
* URL parameters are now sanitized for security (`lang` validated against allowed languages, deployment URLs checked for http/https)
* macOS screen sharing termination now shows a UI notification explaining why the share stopped

### Breakout Rooms

* Breakout rooms now correctly request media devices even when `disableInitialGUM` is configured
* Participant context menu properly closes on re-click in breakout rooms
* Unsupported services are now hidden in breakout rooms

### Lobby & Visitors

* Updated lobby toolbox — removed hang up button from prejoin/lobby and improved lobby visibility state management

### External API

* Full user context object from the JWT is now passed in `PARTICIPANT_JOINED` events and in the `getRoomInfo` function

### Whiteboard

* Migrated to a newer version of Excalidraw with new UI and improved experience, including more tools
* Whiteboard dependency is now lazy-loaded for improved initial page load performance

### Polls

* Fixed duplicate voter entries in polls

## Bug Fixes

* Fixed all microphones being activated when audio levels are disabled in settings
* Fixed missing previews in settings after device permissions are granted
* Fixed audio input levels not refreshing when microphone permission is re-granted
* Fixed stale toggle handler for E2EE switch component
* Fixed chat state not being cleared when switching to a breakout room
* Fixed dial-in info page URL using decoded room name
* Fixed VP9 and AV1 video sources potentially getting stuck after being off for extended periods (JVB)
* Fixed a case where receiver constraints could be ignored (JVB)
* Added missing aria-labels to toolbar buttons for accessibility

## Language Support

* Complete Swedish translation reaching 100% coverage
* Albanian translation added
* Dutch, Finnish, Persian, Hindi, German, Spanish, Swedish, and Polish translations updated

## Versions

**Release version**

* Release: 6741
* Jitsi Meet: release-9162
* Jitsi Videobridge: 2.3-288-g020f11f3d
* Jicofo: 1175

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-9036...release-9162)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1174...1175)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/38293b315...020f11f3d)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
