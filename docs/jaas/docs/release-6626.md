# 19 February 2026 Release

## New Features

### File Sharing Enhancements

* Added tooltip to file upload button for improved user experience
* New external API events for file upload and delete operations

### Recording & Transcriptions

* Enhanced support for asynchronous transcription workflows
* Hides translation UI for web when async transcription is enabled for cleaner interface
* Improved handling of backend recording settings with async transcriptions
* Restore original mute state after recording consent is provided

### UI / UX

* Implemented customizable panel system for flexible UI extensions
* Added touch-screen support for draggable panels
* Added semantic UI tokens for improved theming consistency
* New `reducedUIEnabled` config option with improved threshold logic (both width and height)
* Invite dialog now respects dial-in field from metadata

### Participants & Meetings

* Store user context data for external API events and functions
* Fire `participantMuted` event for all mute state changes via external API

### Breakout Rooms

* Improved breakout room button margin styles
* Added validation when joining breakout rooms

### Dynamic Branding

* Added more options for overriding translations dynamically

## Versions

**Release version**

* Release: 6626
* Jitsi Meet: release-9036
* Jitsi Videobridge: 2.3-275-g38293b315
* Jicofo: 1170

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-8979...release-9036)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1169...1170)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/38ea5ea44...38293b315)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
