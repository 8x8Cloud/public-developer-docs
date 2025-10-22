# 14 August 2023 Release

## Release Highlights

**Highlights**

* Adds the ability to rename breakout rooms
* Persists the noise suppression setting
* Fixes the subtitles' list scroll
* Fixes raise hand shortcut not lowering the raise hand in some cases
* Fixes some cases around submitting dialogs with "Enter" or key press
* Fixes notification updated info
* Fixes an error when trying to change the virtual background
* Fixes an issue where the screen share is flipped if virtual background is enabled during a screen share
* Fixes horizontal filmstrip mode
* Fixes audio output device used for notifications
* When video moderation is on and the participant tries to share their screen shows a notification saying the screen sharing is blocked
* Adds support for watchRTC
* Updates German, Persian, Polish, Portuguese and Spanish translations

**Quality**

* New codec selection mechanism - allows users to configure a separate preferred codecs list for desktop and mobile endpoints. Asymmetric codecs are now supported and encode/decode codec will be picked based on preference of each of the endpoints in the call
* Enables VP9 on Safari for peer-to-peer
* Fixes an issue with audio-only mode in p2p where media doesn't resume when audio-only mode is disabled if it was enabled while the video-bridge connection was active
* Switches codec to VP8 when E2EE is enabled
* Fixes an issue when a screen share doesn't show up for remote endpoints after one of the endpoints in the call does an ICE RESTART using session-terminate while it has 2 video sources
* Connection optimizations
* Workaround for Chromium bug [https://bugs.chromium.org/p/chromium/issues/detail?id=1099280](https://bugs.chromium.org/p/chromium/issues/detail?id=1099280) which results in client switching to showing avatar instead of static content after 10 secs

**JaaS API**

* Allows to disable window.localStorage
* Fixes screenshare event toggle tracking
* Extends Participant Context Menu event to listen to system buttons and adds config to prevent execution

[https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-configuration/#participantmenubuttonswithnotifyclick](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-configuration/#participantmenubuttonswithnotifyclick)  

[https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe-events#participantmenubuttonclick](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe-events#participantmenubuttonclick)

* Forwards non-participant-message-received to iFrame API
* Adds two new webhook events PARTICIPANT_JOINED_LOBBY and PARTICIPANT_LEFT_LOBBY

**Minor release update Sept 2, 2023**

* Adds a SIP audio only address to the dial-in info page
* Fixes an issue regarding the virtual background getting removed after interacting with the settings dialog
* Fixes an issue regarding breakout rooms to support the space chracter when renaming them
* Adds more logging that would allow to investigate an issue where in rare cases setSinkId fails, which results in lost audio for a certain participant
* Adds a config for disabling vertical filmstrip
* Adds a config for disabling tile view
* Adds optional background color to custom toolbar buttons
* Adds command for setting the camera facing mode remotely
* Improves toggleVideo command to optionally accept the camera facing mode
* Fixes startSilent to not create audio track when starting silent

## Versions

**Release version**

* Release: 4340
* Jitsi Meet: 7458
* Jitsi Videobridge: 2.3-34-g44a05334
* Jicofo: 1044

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-7322...release-7458)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/1da507fa...44a05334)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1038...1044)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
