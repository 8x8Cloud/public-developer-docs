# 21 November 2024 Release

## Release Highlights

**UX/UI**

* Adds reactions and replies to chat messages
* Subtitles re-styling to improve readability
* Enables transcriptions for visitors/observers in a large meeting
* Adds "recorder follows me" option to moderator controls
* Accessibility:
	+ Adds aria-live to the notification component
	+ Adds keyboard navigation to the toolbar
	+ Adds focus and blur handle to the toolbar
* Scales display name size showing on top of videos based on the screen size
* Hides the display name label over screen sharing in stage view when the toolbar is hidden
* Fixes local video "flip mode" between stage and tile view
* Fixes multiple executions on shortcut press
* Adds a link to the participant panel on raise hand notification
* Updates German, Latvian, Portuguese and Russian translations

**Quality & Performance**

* Enables AV1 as the preferred video codec on Chromium endpoints
* Introduces a new feature for run time adjustments to the received and sent videos for a better user experience when the local endpoint reports high CPU consumption
* Fixes an issue when client's media stops when their NAT rebinds. They perform a seamless restart now
* Optimizes initial ICE connection time, gaining a nice performance boost
* Fixes a rare case of the main room getting destroyed when all participants move to a breakout room
* A number of improvements around polls including:
	+ Improves polls message validation
	+ Prevents creation of too many polls
	+ Discards extremely large payloads
* Improves handling of transcriptions/subtitles
* Adds notification when a transcriber fails and leaves the call
* Fixes freezes on Firefox: [https://bugzilla.mozilla.org/show_bug.cgi?id=1917800](https://bugzilla.mozilla.org/show_bug.cgi?id=1917800)

**JaaS APIs**

* Adds an option to automatically enable subtitles when transcriber is available
* Adds an option allowing to enable/disable audio only mode
* Fixes some inconsistencies between disableLocalVideoFlip flag and the UI
* Allows non-moderators with defined features in the token to record, transcribe and dial-out
* Adds API to activate recorder follow me
* Adds API to allow setting of blurred background
* Groups raiseHand configs: [https://github.com/jitsi/jitsi-meet/commit/8299aa498bc717e512253d0bee0b9febbcca746c](https://github.com/jitsi/jitsi-meet/commit/8299aa498bc717e512253d0bee0b9febbcca746c)

## Versions

**Release version**

* Release: 5518
* Jitsi Meet: 8206
* Jitsi Videobridge: 2.3-168-g28674f78
* Jicofo: 1101

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-8100...release-8206)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1090...1101)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/97a1f15b...28674f78)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
