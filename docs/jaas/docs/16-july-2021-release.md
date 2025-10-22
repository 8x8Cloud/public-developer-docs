---
id: 16-july-2021-release
title: "16 July 2021 Release"
---

# 16 July 2021 Release

## Release Highlights

**UX improvements**

* Don't show "grant moderator" action if already a moderator
* Adds "Admit all" option for "knocking" participants in lobby
* Multiple small Lobby UX fixes
* Fixes push-to-talk space release (mutes on every space release)
* Fixes resize and mirror behavior of desktop sharing as a virtual background
* Adds the ability to change the capture frame rate for screenshare from the UI. The fps becomes effective only on screen shares that are started after the setting is changed
* Fixes filmstrip scrollbars
* Fixes tile-view for recorders
* Fixes various layout issues on small screen sizes

**JaaS**

* Allows filmstrip autohide to be configurable
* Exposes event for mouse movements inside the iframe
* Exposes command for toggling background dialog
* Shows recording link to recording initiator. Changed the recording sharing icon
* Adds send chat message command
* In-meeting messages about plan limitations for customers w/o a valid credit card
* Adds config option to remove "Show More" link from GSM popover
* Exposes "Follow me" method
* Enables JaaS custom scheme deep linking for mobile clients

**Quality**

* Fixes ghost participants appearing frequently after a call is promoted from 1-to-1 to multi participant (Fix in initial handling of bandwidth estimations in the videobridge).
* Fixes missing videos in the case of lastN=1.
* Fixes video freezes on Safari (when user goes out of last-n).
* Removes video preview on mobile Safari, thus fixing a bug where opening the "Device settings" window was breaking the video stream in the conference.
* Fixes audio issue on iOS Chrome.

**MISC**

* Fixes a memory leak in the bridge (server side, no user impact).
* Fixes backwards compatibility for YouTube sharing on old mobile clients
* Fixes a potential security issue by not allowing external CSS customization of the pre-join screen

## Versions

**Release version**

* Jitsi Meet: 5107
* Jitsi Videobridge: 518
* Jicofo: 765

**Changelogs:**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-5054-hf...release-5107-hf)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/b24f756c...2a0848b8)
* [Jicofo](https://github.com/jitsi/jicofo/compare/756...765)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
