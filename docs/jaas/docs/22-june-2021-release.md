---
id: 22-june-2021-release
title: "22 June 2021 Release"
---

# 22 June 2021 Release

## Release Highlights

**UX improvements**

* Responsive Virtual Backgrounds preview dialog
* Fixes around the new Participants panel
* Adds hover state for "Don't show screen" button
* Fixes notifications for phone invites
* Fixes displaying mute everyone buttons for non-moderators
* Fixes chat focus
* Avoid URL blipping on invite dialog
* Fixes playing muted youtube video

**JAAS**

* Disables help and download apps buttons for JaaS
* Adds config option to overwrite invite subject app name
* Allows SIP invites to contain phone numbers
* Allows always hiding remote videos for 1-1 calls
* Allows filmstrip autohide to be configurable
* Exposes event for mouse movements inside the iframe

**MISC**

* Signalling optimizations
* Fixes handling tenant in util and lobby
* Fixes tokens with uppercase letters
* Adds retries for when play track fails - attempt to fix issue where people loose audio during the call
* Fixes audio and screenshare issues occurring when using shared youtube video
* Fixes a screenshare quality issue when H.264 codec is used
* Fixes a known Firefox bug where BWE goes down on renegotiations

**Server side**

* Fixes a rare crash that could occur with our videobridge
* In very-low-bandwidth scenarios without a screenshare, we will now go down to sending zero videos (i.e. we won't oversend a video, only a screenshare)
* Some updates to dependencies that had security issues, but none of the issues were known to affect us, this was just acting on the dependencybot warnings

## Versions

**Release version**

* Jitsi Meet: 5054
* Jitsi Videobridge: 2.1-508-gb24f756c
* Jicofo: 756

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-4980-hf...release-5054-hf)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/5edaf7dd...b24f756c)
* [Jicofo](https://github.com/jitsi/jicofo/compare/747...756)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
