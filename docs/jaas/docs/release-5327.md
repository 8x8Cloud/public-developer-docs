# 17 September 2024 Release

## Release Highlights

* Adds a new "Go Live" feature for Webinars

**UX/UI**

* Adds the ability for moderators to lower raised hands
* Adds a notification for next in line to speak
* Adds a dialog allowing the user to accept a shared video link
* Updates French, Latvian and Turkish translations
* Fixes the recording notification prompt (controlled by the suggestRecording property) to start transcriptions as well as recording in the case where transcription.autoTranscribeOnRecord is true
* Hides unmute buttons and links for participants without audio
* Fixes PTT on keyboards which send repeated keys
* Adds the ability for the recorder to follow the moderator pins on stage

**Quality**

* Fixes initial track handling in the case where pre-join screen is disabled
* Fixes an issue where a device gets selected when it's no longer available

**JaaS APIs**

* Adds a sharedVideoAllowedURLDomains which allows to whitelist shared video domains via dynamic branding
* Provides a way to specify preferred codec for screen share and mobile screen share
* Adds an option to disable self demote button in webinar mode
* Emit PARTICIPANT_KICKED also for the kicker
* Adds a "name" property to participant-kicked-out event

## Versions

**Release version**

* Release: 5327
* Jitsi Meet: 8100
* Jitsi Videobridge: 2.3-160-g97a1f15b
* Jicofo: 1090

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-8043...release-8100)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1084...1090)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/793df5a9...97a1f15b)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
