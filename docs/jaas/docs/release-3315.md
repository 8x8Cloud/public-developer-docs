# 9 September 2022 Release

## Highlights

**UX improvements**

* Enables gif support through [Giphy integration](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-configuration/#giphy)
* Adds screenshot capture in multi stream mode
* Updates Arabic, Polish, Portuguese and Ukrainian translation
* Updates the local stats to match remote for 'connected to' connection info
* Breakout rooms UI improvements
* Virtual backgrounds performance optimizations
* Add conference name to the pre-meeting screen
* New chat scroll-to-bottom behavior
* Adds support for showing Always on Top on pre-join
* VP9 screen sharing quality improvements. Find out more [here](https://github.com/jitsi/jitsi-videobridge/commit/b34462475292c74c36abc6e8b5097c98c3c3f39f)

**Quality improvements**

* Fixes an issue where screen share appears on the thumbnail but not on the large-video
* Noise suppression muted state fix and updated icon
* Fixes an audio issue for participants who have joined after A/V moderation was enabled and then disabled
* Fixes participant count in multi stream mode
* Fixes not being able to type password in lobby
* Fixes potential race condition when enabling/disabling E2EE
* Fixes an issue where the bitrates for screen share were much higher than before for VP9 causing the JVB to suspend SS streams more often
* Fixes polls UI
* Fixes 'hideStorageWarning' config
* Noise suppression - removes no track warning on share audio flow
* Fixes remote-control when multi-stream is enabled
* Stop audio-only sharing when user stops share from the browser's share in progress window
* Fixes setting "More" tab not showing in certain cases
* Dropbox recording - fix signing out when switching recording providers
* Fixes face landmarks - do not perform stop recognition if it is not active
* Fixes rare cases of conference names unable to be reused

**JaaS APIs**

* Adds command to show custom in-meeting notifications
* Adds a notification to indicate that the audio or video is being shared by a participant
* Whitelists recordingService config
* Adds configs to customize streaming dialog
* Adds the ability to set the leave reason and distinguish between the main room and a breakout room
* Fixеs API toggleShareScreen in multi-stream mode
* Adds toggle noise-suppression API
* Adds leave reasons on switching room and when errors occur
* Fixes the number of participants in a meeting

## Client side additional fixes and improvements released on 21 September 2022

* Fix notify audio muted/audio available
* Add email to local participant info
* Apply fixes for screen sharing issues when call switches back and forth between p2p and jvb
* This fixes an issue where mute camera operation doesn't stop sending camera stream even though locally it appears to the user that they are muted
* Allows defaultLogoUrl to be overwritten
* Whitelists peopleSearchUrl

## Versions

**Release version**

* Jitsi Meet: 6516
* Jitsi Videobridge: 2.2-37-g24b168e5
* Jicofo: 915

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-6380...release-6516)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/ade06bf8...24b168e5)
* [Jicofo](https://github.com/jitsi/jicofo/compare/910...915)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
