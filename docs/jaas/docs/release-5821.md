# 24 March 2025 Release

## Release Highlights

**New Features**

* **Dynamic Branding**: Introduced several custom branding features:
  * Custom Participant Menu Buttons
  * Etherpad Base URL
  * People Search URL
* **Custom Notifications**: Allowed specifying actions in custom notifications to enhance interactivity and user engagement
* **Visitor Renaming**: Renamed visitors/observers to viewers in the UI for better clarity
* **Firefox**: AV1 and VP9 codec support on Firefox 136 and newer versions
* **Permissions options**: Added advanced branding properties to allow specifying permissions for group chats and polls via groupChatRequiresPermission and pollCreationRequiresPermission

**Bug Fixes**

* **Camera Toggle**: Fixed an issue where toggling the camera caused an issue on certain devices, like Samsung s24, introducing a slight fade-to-black effect as a workaround
* **Breakout Rooms**: Fixed processing commands in breakout rooms, addressing issues with variable names and room transitions
* **Config Whitelist**: Removed customToolbarButtons from the config whitelist to streamline configuration management
* **Participant Management**: Various fixes related to AV moderation, participant permissions, and notifications:
  * Made notifications sticky when allowed to unmute
  * Offered choices to allow audio, video, or both for participants
  * Made audio the default option when both audio and video are allowed
  * Skipped local participant when muting all
* **Logging**: Improved log collection and debugging
* **Prejoin and Lobby**: Fixed issues related to pre-join and lobby states, enhancing user experience during initial conference stages
* **Virtual Backgrounds**: Fixed handling of empty file lists for virtual backgrounds, ensuring better user experience
* **Polls**: Fixed issues related to sending/receiving polls and processing answers, improving polling functionality
* **Shared Video**: Improved handling and user experience for shared videos, addressing issues with element visibility and interaction
* **Overlay Permissions**: Dropped the permissions overlay for a less intrusive UX

**Miscellaneous**

* **Performance improvemtns**: Enabled ssrc-rewriting. Check more about ssrc-rewriting here: [https://jitsi.org/blog/improving-performance-on-very-large-calls-introducing-ssrc-rewriting/](https://jitsi.org/blog/improving-performance-on-very-large-calls-introducing-ssrc-rewriting/)
* **Language Updates**: Updated translations for multiple languages, including Italian, Hindi, German, Norwegian Bokmal, Swedish, and Latvian.
* **Dependency Updates**: Regular updates to lib-jitsi-meet and other dependencies to ensure compatibility and performance improvements
* **Documentation**: Updated documentation for extra-large conference settings and other config options, providing clearer guidance for users and developers

## Versions

**Release version**

* Release: 5821
* Jitsi Meet: release-8443
* Jitsi Videobridge: 2.3-209-gb5fbe618
* Jicofo: 1124

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-8302...release-8443)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1119...1124)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/db7d0b82...b5fbe618)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
