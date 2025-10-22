---
id: 14-october-2021-release
title: "14 October 2021 Release"
---

# 14 October 2021 Release

## Release Highlights

**UX improvements**

* Makes share video placeholder translatable
* Advanced moderation UI improvements
* Scrolls to the top when opening feedback dialog
* Disables volume slider on iOS web since feature is not available
* Disables scroll bar on chat input
* Keeps subject centered when chat panel is open
* Fixes edge case in which the toolbar was always visible
* Stops screensharing and video on moderation starts - When video moderation starts, stop screensharing and ignore if video was on when sharing started
* Hides moderator label on *disasbleModeratorIndicator*
* On *disasbleModeratorIndicator* config hide moderator label from participants pane
* Adds "Ask to Unmute button" to mobile web
* Fixes video rooms not being displayed in invite search
* Fixes Lobby join after entering a wrong password
* Fixes 'undefined' text shown on More numbers page (dial-in numbers page)
* Various Advanced moderation improvements
* Meeting moderators can ask anyone to unmute, when muted
* Dominant speakers appear first in the participants list
* Fix participant context menu not being visible under certain conditions

**Quality improvements**

* Fixes screen sharing not shown for some participants ([https://github.com/jitsi/lib-jitsi-meet/commit/cee62a61b45e56c4d0adc61beb2b78091ec30684](https://github.com/jitsi/lib-jitsi-meet/commit/cee62a61b45e56c4d0adc61beb2b78091ec30684))
* Fixes delay in pre-join screen when joining a conference (especially visible in large conferences)
* Performance optimizations for large calls
* Fixes a bug in Safari where remote audio is not being played out if the user joins audio and video muted from pre-join screen
* Fixes an issue on Safari where black video is rendered sometimes
* Fixes an issue with recorders showing "All recorders are busy" even after recording has started\*\*
* Fixes issues around source changes (changing devices, muting/unmuting or switching to screenshare) not working when a user hits join fast on the pre-join screen
* Fixes a case where a participant could click Join too quickly, enter the meeting and not be able to unmute their audio and video
* Fixes an issue on mobile Safari when audio is lost after the user opens the device selection menu
* Disables e2ee when we have a large number of participants
* Fixes an issue where Safari users cannot hear remote audio if they join audio/video muted
* Firefox bandwidth estimation improvements
* Fixes "flickering" issues between video and avatar in low bandwidth networks

**JaaS APIs**

* Adds branding option for virtual backgrounds
* Fixes pre-join throwing a TypeError due to late config initialization
* Adds data-channel-open event - Signals that the bridge channel is open. It may take a few ms to get established after the conference join, so applications might be interested in using it once ready.
* Adds config option to make display name readonly
* Provides an Audio Video moderation iFrame API
* Improves the reading of the config option of branding URL

## Versions

**Release version**

* Jitsi Meet: 5415
* Jitsi Videobridge: 570
* Jicofo: 813

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-5322-hf...release-5415-br)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/692f270f...b802be83)
* [Jicofo](https://github.com/jitsi/jicofo/compare/798...813)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
