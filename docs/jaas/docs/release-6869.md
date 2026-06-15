# June 12, 2026 Release

## New Features

### Transcription

* Async transcription now works with a single participant — sessions start immediately when transcribing is enabled, without requiring the minimum participant threshold (Jicofo)

### Whiteboard

* Whiteboard now auto-opens for remote participants when metadata propagates after a delay
* Collaboration data is validated before opening the whiteboard, with a notification shown on failure
* Non-moderators can now close the whiteboard
* Prevented duplicate navigation when collaborating

### Virtual Background

* Introduced a new TensorFlow.js body segmentation pipeline using WebGPU/WebGL context for improved performance

### UI / UX

* New meeting pace timer in the conference info bar to track meeting duration — can be enabled per meeting via the external API
* Participant names in the speaker stats list can now be selected and copied
* Custom side panel now refreshes the video space width when toggled open/closed
* Body element is no longer scrolled when iframe content programmatically scrolls into view
* Shortcuts are shown in settings when present in the configured list
* Invite dialog now reacts to `dialinEnabled` metadata changes while open
* Salesforce integration was overhauled

### Accessibility

* Improved keyboard navigation in settings
* Video quality slider now exposes expressive ARIA attributes and uses the active option text
* Input components now have accessibility labels and keypress handlers on clear actions, and improved error message association
* Hover popovers now close on Escape
* Mute modal restructured for better screen reader behavior

### Breakout Rooms

* General fixes around breakout room handling and component unification

## Bug Fixes

* Improved media element reliability: track attach is now retried on failure, and tracks are re-attached after `play()` retries are exhausted
* Fixed an unnecessary `GET /undefined` network request when the XMPP connection fails before branding loads
* Internationalization formatting now correctly handles languages that rely on regional variants
* Shared video no longer prompts Jibri to confirm playback

## Language Support

* German, Italian, Latvian, Mongolian, Arabic, Dutch, and Traditional Chinese (zh-TW) translations updated

## Versions

**Release version**

* Release: 6869
* Jitsi Meet: release-9277
* Jitsi Videobridge: 2.3-295-g8d5c0037b
* Jicofo: 1183

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-9168...release-9277)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1176...1183)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/020f11f3d...8d5c0037b)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
