# 6 May 2022 Release

## Release Highlights

**Highlights**

* Enables the new WebRTC syntax for Chrome browsers 96 and above (Unified plan)
* Enables VP9 codec
* Enables device selection in mobile Safari (with [https://bugs.webkit.org/show_bug.cgi?id=179363](https://bugs.webkit.org/show_bug.cgi?id=179363) being fixed, users should now be able to switch between devices in call)

**UX improvements**

* Fixes window resize issue in tile view
* Fixes virtual background timeout
* Reset a breakout room when the conference is left or failed
* Open the reactions menu on hover instead of click
* Updates the Arabic, Dutch, French, German, Portuguese and Russian translation
* Fixes 2 byte char duplication occurring for some languages
* Fixes an issue in polls with duplicating value to the next input on keypress
* Fixes "Shared video" control issue
* Fixes a "Settings" dialog crash
* Fixes iOS Web chat (on iOS web the chat input would move from the bottom when the keyboard was open)
* In Lobby - display the entire message in the reject notification
* Fixes not showing the correct getUserMedia helper text in the pre-meeting screen
* Custom notifications for recording highlights

**JaaS APIs**

* Adds breakout room configs to hide auto assign and footer menu buttons
* Adds "*reservations_enable_max_occupants*" to allow optional "*max_occupants*" payload from API to influence max occupants allowed for a given room

## Versions

**Release version**

* Jitsi Meet: 6085
* Jitsi Videobridge: 2.1-664-g341f15af
* Jicofo: 874

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-5960...release-6085)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/cb298254...341f15af)
* [Jicofo](https://github.com/jitsi/jicofo/compare/867...874)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
