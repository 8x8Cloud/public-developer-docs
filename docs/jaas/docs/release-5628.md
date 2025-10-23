# 23 January 2025 Release

## Release Highlights

**UX/UI**

* Adds a reaction feature in the chat
* Adds support for features that depend on presence and moderator role (like follow-me) for visitors  

Updates Albanian, German, Greek, Korean, Latvian, Turkish translations

* Fixes Whiteboard disable button
* Fixes the pre-join screen device check UI to properly indicate when device testing and status
* Adapts toolbar and hangup visibility to mobile web
* Improves subtitles display in the case of a delayed final transcript, which results in only updating the transcript delta
* Updates transcription language when the meeting language is updated
* Shows notification when you try to start recording too quick
* Improving Lobby interface error handling in cases like enabling lobby and trying to join, then denying the first attempt and approving the second one
* Skip playing back sounds when leaving a conference
* Hides E2EE verified status if E2EE is not enabled

**Quality**

* Adds a seamless reconnect of the control connection of the bridge to remediate network blips
* Adds an extra check to avoid duplicating polls
* Adds support for Whiteboards with custom region urls
* Shows notification instead of reload on conference request failed

**JaaS APIs**

* Adds API endpoint for removing (kicking) a participant
* Adds enableAdaptiveMode config option
* AV1 added to the codec preference order
* Adds downloadAppsUrl, liveStreamingDialogUrls, salesforceUrl, supportUrl and userDocumentationUrl to the dynamic branding
* Adds support for setting the transcription language through defaultTranscriptionLanguage in dynamic branding.
* It will be used as the default if specified.
* Adds an option to show the recording link: showRecordingLink. If true, the notification for recording start will display a link to download the cloud recording
* Аdds а function to change virtual backgrounds
* Fixes role changed event to work not only for local user
* Adds setAudioOnly command & event
* Adds the ability to completely disable E2EE
* Adds a showRecordingLink config which allows to show the recording link when a recording starts (this is not by default anymore)
* Adds the ability to disable the calendar integration from the Welcome page

## Versions

**Release version**

* Release: 5628
* Jitsi Meet: 8302
* Jitsi Videobridge: 2.3-187-gc7ef8e66
* Jicofo: 1117

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-8206...release-8302)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1101...1117)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/28674f78...c7ef8e66)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
