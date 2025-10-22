# 4 July 2024 Release

## Release Highlights

**UX/UI**

* Improved polls UX that now allows editing and saving before sending to other participants
* Main toolbar improvements related to screen size handling
* Updates Canadian, French, German, Indonesian, Latvian, Russian and Turkish translations
* Fixes overflow menu closing in participants panel
* Improves notification UI around media data channel disconnects
* Improves visitors authentication error handling to provide better feedback specific to the visitors case
* Improved and more intuitive visitors UI
* Extends recording notification timeout
* Properly closes breakout rooms menu after clicking on it
* Adds a full screen button for iPad browsers

**Quality**

* Large conferences performance improvements
* Fixes a rare failure in which after a web socket reconnect we may fail to playback/render some sources
* Updates the bitrate settings for 1080p and 4K
* Fixes an issues where microphone change for Safari fails
* Saves the local recording if the conference fails
* Use an exponential backoff time for initiating ICE restart to prevent loading the signaling servers
* Fixes poor low resolution video from for older electron versions when the codec changes from VP9->VP8->VP9

**JaaS APIs**

* A number of improvements to our Toolbar API. It now allows to specify a custom order for different screen sizes.
* Allows overriding desktop deep linking toggle (deeplinking.desktop.enabled)
* Adds CONFERENCE_CREATED_TIMESTAMP event
* Fixes hideConferenceSubject config
* Adds config to hide login button on the "Wait For Owner" dialog
* Includes transcription state in recordingStatusChanged
* Add ability to start transcriptions together with recordings
* Adds isLiveStreamingRunning helper

## Client version update Aug 13, 2024

* Fixes IP address exposure in Giphy and shared video features.

## Versions

**Release version**

* Release: 5218
* Jitsi Meet: 8043
* Jitsi Videobridge: 2.3-149-g793df5a9
* Jicofo: 1084

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-7952...release-8043)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1078...1084)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/e155b81e...793df5a9)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
