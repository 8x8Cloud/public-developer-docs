# 20 January 2026 Release

## Features

### Chat & Messaging

* Display file uploads as inline chat messages
* Add `disableChat` configuration option
* Improve naming convention for unread items
* Don't show private chat picker if disabled

### Large Meetings

* Add `hideVisitorCountForVisitors` config option
* Add `showJoinMeetingDialog` config option

### Prejoin & Lobby

* Add `showHangUp` config option to `_prejoinConfig_`
* Fix room name backdrop and button sizes
* Handle disabling lobby
* Style adjustments

### Toolbox & UI

* Add polls and file sharing buttons to overflow menu
* Implement toolbar background color via `configOverwrite` for web
* Apply reduce UI for web
* Add `_toolbarVisibilityChanged_` event to the IFrame API

### Configuration & Metadata

* Add `_lobbyEnabled_` and `_visitorsEnabled_` to metadata

### Other Features

* Add support for any keyboard layout (Keyboard Shortcuts)
* Add WebRTC availability detection
* Add name to all dialogs
* Expose mute remote command and participant muted event (External API)

## Fixes

### Chat

* Clear private message notice if sender leaves
* Fix sending messages after private message sender leaves

### Lobby & Persistent Lobby

* Hide login button if authenticated (JWT is available)
* Update metadata on destroy lobby room and let in participants on empty main

### Large Video & Filmstrip

* Pin previous speaker on stage when local user is dominant speaker
* Fix auto-pinning of screenshare in large meetings
* Fix bug with ghosts sometimes appearing by removing a legacy feature for non-scalable desktop streams

### Polls & Breakout Rooms

* Fix support for breakout rooms in polls
* Fix polls in main when breakout is enabled
* Update polls validation
* Add UI setting to show groupchat polls permissions option

### Transcription

* Fix UI bug where you cannot start transcription 2nd time

### Performance & Memory

* Fix a memory leak in preloadImage (Avatar)

### Settings

* Prevent enabling audio processing settings and stereo at the same time

### i18n

* Fix Chinese language issues and hyphenated locale persistence

### Avatar

* Strip bracketed annotations from display names before generating initials

### Other Fixes

* Improved network switching by keeping multiple ICE pairs alive
* Avoid cleanup when breakout rooms are active (cleanup_backend)
* Check connection when processing rate limited events (MUC rate limit)

## Language Support

* Update **Swedish**, **Chinese**, **Italian**, **Latvian**, **German** translations

## Miscellaneous

### Infrastructure

* Remove colibri websocket support, in favor of SCTP

## Versions

**Release version**

* Release: 6524
* Jitsi Meet: release-8979
* Jitsi Videobridge: 2.3-270-g38ea5ea44
* Jicofo: 1169

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-8860...release-8979)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1165...1169)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/ea11cd36c...38ea5ea44)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
