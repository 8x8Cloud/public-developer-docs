# 16 June 2025 Release

## Release Highlights

**General**

* **Participant multi-pinning**: Experimental label removed — now considered stable.
* **Group chat & polls**: Added support for permission management and creation.
* **Recording consent dialog**: Introduced a new two-option dialog with a configurable “Learn more” link. Not enabled by default but available upon request.
* **Default permissions**: Backend reports permission sets when a participant becomes a moderator.
* **Analytics**: Improved internal diagnostics and logging.
* **Large video display name**: Added a config option to hide label.
* **Etherpad shared document URL**: Exposed via external API.
* **Conference destruction notification**: New config option to inform users when a meeting ends forcibly.
* **Lobby chat notification**: New frontend feature for better lobby communication.
* **Accessibility**: Added appropriate ARIA roles for improved screen reader support.
* **Video codecs**: Sets AV1 as the preferred video codec for web

**Bug Fixes**

* **Desktop picker**: Prevented an error when the modal is closed before sources load.
* **UI layout**:
  * Resolved overflow and padding issues on small screens.
  * Fixed tab content layout on the welcome page.
* **Bottom Toolbar**: Supporting 2 more custom buttons.
* **Chat UI**: Reworked message structure and fixed emoji box behavior.
* **Font/token system**: Fallback to original values when allTokens don’t provide data.
* **Connection quality**:
  * Do not show red GSM bars on video codec changes or when call switches between P2P and video bridge mode.
  * Adds new BWE stat to local participant stats.
* **Polls**: Halted processing on malformed poll events, preventing crashes.
* **Participant unmute**: Fixes a "participant unable to unmute" error on Firefox
* **JWT**:
  * Allows feature evaluation even without a JWT.
  * Option added to require tenant matching in token contexts.

**Language Support**

* **Updated**: German, Latvian, Arabic translation
* **Added**: Norwegian translation

## Versions

**Release version**

* Release: 5963
* Jitsi Meet: release-8542
* Jitsi Videobridge: 2.3-220-g7cda0a66
* Jicofo: 1128

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-8443...release-8542)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1124...1128)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/b5fbe618...7cda0a66)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
