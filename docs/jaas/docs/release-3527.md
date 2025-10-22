# 19 October 2022 Release

## Highlights

**UX improvements**

* Shows conference subject in pre-join screen if available
* Don't show self view notifications if already one is active
* Fixes chat counter and updated new messages button web styles
* Makes lobby password hidden by default
* Dialog components re-styling
* Changes local recordings tab title to help identifying it
* Fixes autoscroll for polls causing layout issues
* Support icons alongside cors avatars
* Adds dial-in limit message to invite dialog
* Removes the overlay shown for a slow gUM flow
* Layout improvements for screen sharing in live streaming scenarios
* Giphy feature improvements
* Fixes focus stealing in pre-join screen settings dialog

**Fixes**

* Fixes remote control crash
* Fixes 8x8 Spaces wireless screen sharing
* Fixes 8x8 spaces devices setup
* Fixes an edge case where screen sharing track is sometimes not shared on a p2p connection after the call switches to p2p when the 3rd participant leaves the call
* Fixes corner case bridge selection issue when a bridge goes in graceful shutdown
* Redirects to "about blank" when close meeting is opened in iFrame
* Local recordings improvements
* Fixes selection if local screen sharing auto-select is true
* Fixes an issue where starting screen sharing fails if there are stopped tranceivers in the peerconnection (i.e., if some FF remote users with sources have left the call)
* E2EE UI and performance improvements
* Disables screen sharing placeholder for 8x8 Spaces
* Fixes broadcast timer in breakout rooms

**JaaS APIs**

* Adds ability to hide speaker stats.
* Adds ability to resize the filmstrip
* Hides buttons disabled through JWT.
* Fixes startWithAudioMuted overrriding startSilent.
* Makes pin function work with stage filmstrip.
* Adds events for start/stop local recording.
* Enabled multi-stream support by default.
* Adds stageFilmstripParticipants and maxStageParticipants config options.
* Add email to local participant info
* Fixes notify audio muted/audio available.
* Hides conference name based on config.

## Versions

**Release version**

* Jitsi Meet: 6644
* Jitsi Videobridge: 2.2-43-gce94dbb2
* Jicofo: 940

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-6516...release-6644)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/24b168e5...ce94dbb2)
* [Jicofo](https://github.com/jitsi/jicofo/compare/915...940)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
