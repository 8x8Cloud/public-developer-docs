# 27 January 2023 Release

## Release Highlights

**Highlights**

* Adds path based encoding for the video bridge names (replacing the DNS based video bridge naming)
* Fixes an issue where first unmute with disable initial getUserMedia=true was resulting in user staying muted
* Codec selection fixes
* Audio-only mode improvements when using screen sharing
* Fixes an issue where unmute fails on p2p with channelLastN=0
* Fixes an issue where 'startAudioOnly' in config is not applied to web clients
* Prevent multiple websockets on retries - Multiple WebSockets could lead to client being unable to send any bridge messages due to lost this._channel reference
* Removes Giphy from dynamic branding
* Salesforce require selected records
* Set faceLandmarks on update only if it is has data
* Pass the jitsi installation type at provisioning
* Adds proxyUrl config for Giphy requests

**UX improvements**

* Fixes pre-join app dialogs not being visible
* Recording dialog UI fixes
* Local recording UI fixes
* Welcome page redesign and fixes
* Invite dialog improvements - adjusts dial in limit display condition and styling
* Deep-linking improvements
* Add screen sharing tiles to the number of participants in scroll calculations. This fixes an issue where the scroll is not displayed if there is a SS tile and only part of 1 tile is overflowing.
* Pre-join screen improvements

## Versions

**Release version**

* Release: 3792
* Jitsi Meet: 6909
* Jitsi Videobridge: 2.2-67-gc7f2b2d5
* Jicofo: 979

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-6854...release-6909)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/252d14bc...c7f2b2d5)
* [Jicofo](https://github.com/jitsi/jicofo/compare/954...979)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
