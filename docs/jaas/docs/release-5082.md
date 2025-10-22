# 30 May 2024 Release

## Release Highlights

**UX/UI**

* Updates German, Latvian, Portugese, Russian and Viatnameese translations
* Accessibility improvements
* Improves UI for visitors who enter a conference before the host
* Small chat UI improvements
* Small fixes in polls UI

**Quality**

* Fixes an issue with video freezing after video mute and unmute when the user joins the call with startSilent=true
* Fixes a case where participant is not entering lobby when trying the second time after being rejected
* Fixes camera selection failures when resolution constraints are not met
* Improves handling of edge cases in authentication retry logic

**JaaS APIs**

* Adds AV1 to the list of available codecs. Use codecPreferenceOrder to set it as your preferred codec
* Fixes an issue with “Add Password” button not working when it wasn’t listed in buttonsWithNotifyClick

## Versions

**Release version**

* Release: 5082
* Jitsi Meet: 7952
* Jitsi Videobridge: 2.3-105-ge155b81e
* Jicofo: 1078

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-7874...release-7952)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1075...1078)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/64f9f34f...e155b81e)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
