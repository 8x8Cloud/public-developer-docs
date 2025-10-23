# 6 March 2024 Release

## Release Highlights

**UX/UI**

* Transcriptions and Recording UI/UX improvements
* Pre-join dropdown re-styling
* Prevents toolbox shift up on stage view
* Uses audio files based on locale
* Fixes share icon/lobby mode switch
* Fixes drawer menu not scrollable on FF
* Improves search input fields accessibility
* Updates the French, German, Icelandic, Latvian and Portugese and Russian translations

**Quality**

* Removes support for plan-b SDP format for Chromium endpoints which makes multi-stream the only mode supported
* Fixes a compatibility issue with Firefox Nightly
* Fixes media issues with Firefox 122 in peer-to-peer calls with Chrome
* Fixes low resolution received from Safari endpoints
* Improves video quality for 1080p and 4K camera streams
* Track creation improvements
* Adds support for creating non-standard tracks
* Adds additional checks for creating tracks via media stream
* Simplifies options to create tracks
* Fixes no video issue on older mobile endpoints when there is a transcriber in the call
* Fixes a quality issue on older versions of Chromium that do not support the scalabilityMode API

**JaaS APIs**

* Extends captureLargeVideoScreenshot for screenshare
* Transcriptions API improvements
  * Extends the IFrame API to allow adding a transcriber in the room without the subtitles needing to be visible
  * Allows transcription chunk messages to be passed through the IFrame API if a transcriber is present
  * Adds an option to skip interim transcriptions
  * Adds transcribingStatusChanged event
* Removes enableLipSync config, which is not supported anymore
* Adds "disableVirtualBackground" config

## Client version update 4771 (Mar 25, 2024)

* Fixes an issue with camera and microphone not turning on when a visitor is promoted to a participant

## Versions

**Release version**

* Release: 4871
* Jitsi Meet: 7790
* Jitsi Videobridge: 2.3-74-ga015be96
* Jicofo: 1067

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-7693...release-7790)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1055...1067)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/5c48e421...a015be96)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
