---
date: 2026-07-30
products: ["Actions & Events"]
channel: "WebChat"
changeType: Added
title: "WebChat Content-Security-Policy guide"
---

Embedding the 8x8 WebChat v2 widget behind a strict Content-Security-Policy meant guessing which directives to allow. A new Content Security Policy guide documents exactly what your embedding page's CSP needs.

Because the widget is injected as a sandboxed `iframe srcdoc`, 8x8 does not send a CSP of its own — your page's CSP is the only policy the browser enforces on the widget. The guide covers:

- A recommended policy using `https://*.8x8.com` wildcards that stays stable across 8x8 infrastructure changes.
- A strict alternative with exact per-tenant origins for audits that disallow wildcards.
- Why `style-src 'unsafe-inline'` is required (the widget injects styles at runtime via styled-components) while `script-src` needs neither `'unsafe-inline'` nor `'unsafe-eval'`.
- Rolling out under `Content-Security-Policy-Report-Only` first, so a wrong host shows up as a violation report instead of a dead widget.

This release also refreshes the button-theming screenshots, showing the primary and secondary buttons across the prechat form, chat window, and end-conversation dialog.

- [Content Security Policy](/actions-events/docs/content-security-policy)
- [Button theming](/actions-events/docs/button-theming)
- [Theming](/actions-events/docs/theming)
