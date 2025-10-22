# 14 December 2023 Release

## Release Highlights

* Fixes audio output device selection in Firefox for an iFrame client
* Fixes BWE issues on Firefox 115 ESR
* Fixes Salesforce integration notification duration
* Updates Brazilian, Latvian, Portugese and Spanish translation
* Fixes double click issue with context menu when it is closed with ESC key
* Fixes country name translation in "More numbers" page
* Makes favicon visible in dark-themed browsers
* Updates join room events that can affect analytics and reporting for lib-jitsi-meet users
* Extends IFrame API to allow adding a transcriber in the room without the subtitles needing to be visible
* Allows transcription chunk messages to be passed through the IFrame API if a transcriber is present
* Cleans-up transcription messages sent through the IFrame API to not include timeout field and possible conflicting states (stable / unstable /final)
* Extends captureLargeVideoScreenshot to allow screen share capture

## Versions

**Release version**

* Release: 4620
* Jitsi Meet: 7693
* Jitsi Videobridge: 2.3-59-g5c48e421
* Jicofo: 1055

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-7629...release-7693)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
