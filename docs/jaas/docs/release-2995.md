# 8 June 2022 Release

## Highlights

**UX improvements**

* Enables face centering
* Fixes blurry screen sharing when sharing a high resolution screen
* Fixes pre-join screen mic state in the case of large conference max users reached
* Updates the Arabic, Catalan, Chinese, Italian, Portuguese, Russian, Spanish and Turkish translation
* Dynamically calculates maximum number of columns in tile view depending on screen size
* Expands video dimensions on last row to efficiently take advantage of the space
* Added toolbar button clicked event
* Always-on-top window fixes including a fix for audio mute button disabled status and disables Always-on-top window mic and unmute notifications when starting silent
* Adds new generic icon for cloud recordings
* Fixes around audio sharing
* Fixes tile view scrollbar sizing in certain cases
* Аvoids multiple “Аsk to unmute” notifications in A/V moderated mode
* Мarks A/V moderation feature as unsupported while in a breakout room
* Makes "Mute everyone" button and "Mute everyones video" button only accessible via the Participants panel.
* Fixes multiple raise hand notifications
* Detaches pre-meeting toolbar buttons visibility

**JaaS APIs**

* Adds toggle subtitles command
* Adds breakout room configs to hide auto assign and footer menu buttons
* Provides a default config example for Jigasi as a service
* Adds a gravatar config option
* Аdds ability to disable specific notifications
* Adds name overwrite API
* Exposes buttons for docking / undocking iframe
* Allows disabling pre-join display name editing

## Versions

**Release version**

* Jitsi Videobridge: 2.1-681-g3544ed05
* Jicofo: 1.0-877
* Jitsi Meet: 6214

**Changelog**

* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/341f15af...3544ed05)
* [Jicofo](https://github.com/jitsi/jicofo/compare/874...877)
* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-6085...6214)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
