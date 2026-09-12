---
date: 2026-08-10
products: ["JaaS"]
changeType: Changed
title: "Prejoin page config option renamed"
---

The [Prejoin page guide](/jaas/docs/jaas-prefs-prejoin) now uses `prejoinConfig.enabled` in place of the retired `prejoinPageEnabled` option. The IFrame API checks each `configOverwrite` key against an allow-list and silently drops keys it doesn't recognize, so apps still setting `prejoinPageEnabled: false` were left with the prejoin page showing and no error to explain why.

## What changed

Set `prejoinConfig.enabled` to `false` to skip the prejoin page:

```javascript
configOverwrite: {
  prejoinConfig: {
    enabled: false
  },
  startWithAudioMuted: [true/false],
  startWithVideoMuted: [true/false]
}
```

## New guidance for prejoin-disabled meetings

With the prejoin page skipped, two things it used to handle now need to come from your app:

- **Display name** — set the `context.user.name` claim in the JWT, or pass `userInfo.displayName` to the IFrame API. If neither is set, the client joins and then prompts for a name in a dialog.
- **Camera/microphone permission** — the browser normally requests permission at page load once the prejoin page is skipped. Set `disableInitialGUM: true` to defer that request until the first unmute instead.

See the updated [Prejoin page guide](/jaas/docs/jaas-prefs-prejoin) for full examples.
