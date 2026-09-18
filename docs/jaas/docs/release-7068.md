# September 15, 2026 Release

## New Features

### Recording & Transcription

* Redesigned the record & transcribe dialog

### Screenshare

* Improved screenshare bandwidth allocation, prioritizing full resolution over full frame rate for better quality

### Connectivity

* Meetings can now perform an in-place ICE restart when the network changes, improving call resilience without a full reconnect

### External API

* `getRoomsInfo` now includes `includeHidden`, `isJibri`, `isJigasi`, and a breakout-room `isHidden` field
* Connection stats, including ICE connection state, are now exposed via the external API

### Client Requirements

* Users are now notified when their client needs an update

## Bug Fixes

* Fixed a media session issue affecting single-participant ("lonely") meetings
* Fixed track resubscription when switching between peer-to-peer and JVB connections
* Fixed a crash when switching breakout rooms while sharing tab audio, and improved error handling for invalid breakout rooms
* Improved focus management and outside-click handling in the participants pane
* Prevented the whiteboard from reopening unexpectedly after being closed
* Fixed layout thrashing caused by aspect-ratio changes on window resize
* Fixed duration formatting to correctly show days after 24 hours
* Fixed links in translated content to open in a new tab
* Virtual background now defaults to the improved WebGPU/WebGL-based engine, with more reliable model loading
* Improved screenshare bandwidth handling under contention (starvation and burst-proofing fixes)

## Language Support

* German, Dutch, Latvian, Russian, Portuguese, Catalan, and Spanish translations updated

## Versions

**Release version**

* Release: 7068
* Jitsi Meet: release-9442
* Jitsi Videobridge: 2.3-318-gbf271b11f
* Jicofo: 1205

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-9277...release-9442)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1183...1205)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/8d5c0037b...bf271b11f)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
