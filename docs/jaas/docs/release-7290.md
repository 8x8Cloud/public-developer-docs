# November 18, 2026 Release

## New Features

### Recording & Transcription

* Captions can now be translated: participants can pick the language their captions are shown in, or keep the original language
* A participant's video can now be hidden from the recording while their audio stays in it
* Recording now shows a specific error when the recording request is invalid
* End-to-end encryption and server-side transcription or translation can no longer be active at the same time

### External API

* `toggleLobby` can now be called without a target state, and the new `isLobbyEnabled` function and `lobbyModeChanged` event report the lobby state
* The embedder is now notified when the side panel opens or closes on any tab

### Faster Loading & Dynamic Branding

* `config.js` and dynamic branding are now fetched before the app bundle, so meetings load faster
* The first paint now waits until dynamic branding is applied, so participants no longer see the default look flash before the branded one

### Media & Connectivity

* Participants are notified when there are media connectivity problems
* Microphone problems are now detected more reliably, including a microphone that stops sending audio during a meeting and device access errors

### Accessibility

* Meeting controls, chat message actions, popover menus, the display name and the Settings dialog can now be fully operated from the keyboard
* Screen readers now announce participant names on avatars, and more buttons, menus and dialogs have accessible names and states

### Settings

* New Experimental tab in Settings with a switch for browser Picture-in-Picture

## Bug Fixes

* Web chat messages are no longer cut at 500 characters
* The local microphone is kept until its replacement is in use, so switching microphones no longer drops audio
* Recordings now include participants whose tracks arrive before their presence, and recordings no longer contain notification sounds (except reactions)
* Fixed several external API commands and functions: `toggleShareAudio`, `resizeLargeVideo`, `getParticipantsInfo`, `toggleNoiseSuppression`, `getCurrentDevices`, `muteRemoteParticipant` for the local participant, and `invite` / `captureLargeVideoScreenshot` now reject on failure
* Custom virtual background images keep their aspect ratio
* YouTube Shorts links can now be used in shared video
* The whiteboard now detects a new collaboration session when the room key changes
* File deletions are now preserved in the chat
* Synchronized breakout room messages are no longer marked as edited
* The reaction sounds and follow-me toggles in Settings now save as shown
* `config.defaultLanguage` is kept as the last language fallback, and regional language codes now use the right date formats
* Added Ctrl+Alt reaction shortcuts for Firefox and fixed a keyboard shortcuts crash when opening settings
* Improved video stability with better keyframe handling for VP8 and AV1 simulcast streams
* More reliable reconnection after ICE failures and re-invites

## Language Support

* Azerbaijani added; Catalan, Spanish, Dutch and Persian translations updated

## Versions

**Release version**

* Release: 7290
* Jitsi Meet: release-9644
* Jitsi Videobridge: 2.3-364-g4456dc788
* Jicofo: 1240

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-9442...release-9644)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1205...1240)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/bf271b11f...4456dc788)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
