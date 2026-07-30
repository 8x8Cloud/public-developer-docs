# Content Security Policy

CSP directives a customer's website needs to embed the 8x8 WebChat v2 widget.
The widget runs in an `iframe srcdoc`, so **the embedding page's CSP applies**.

## How the widget loads

Why the policy looks the way it does:

- **8x8 does not send a CSP of its own.** The widget is injected as a
  **sandboxed `iframe srcdoc`**, with these sandbox permissions:
  `allow-scripts allow-downloads allow-modals allow-popups allow-popups-to-escape-sandbox`.
- Because the iframe is `srcdoc`, **your page's CSP is the only policy the
  browser enforces on the widget** — you cannot relax it from inside the iframe.
- All widget scripts load from **external files** (no inline `<script>` blocks),
  so `script-src` needs neither `'unsafe-inline'` nor `'unsafe-eval'`.
- The widget's styles are injected at runtime, which is why
  `style-src 'unsafe-inline'` **is** required (see below).

## Recommended policy (wildcards — stable across infrastructure changes)

These directives are **additive** — merge them into your site's existing policy
rather than using them as a complete policy on their own. Each directive keeps
`'self'` for your own origin alongside the 8x8 hosts. Both policy blocks on this
page are wrapped across lines for readability; a real `Content-Security-Policy`
header value must be a **single line** (or use a
`<meta http-equiv="Content-Security-Policy">` tag).

```text
script-src  'self' https://*.8x8.com;
connect-src 'self' https://*.8x8.com wss://*.chalet.8x8.com;
frame-src   'self' https://*.8x8.com;
img-src     'self' data: blob: https://*.8x8.com;
media-src   'self' blob: https://*.8x8.com;
style-src   'self' 'unsafe-inline';
font-src    'self' https://*.8x8.com;
```

If your site sets a restrictive `default-src` (for example `default-src 'none'`),
remember that every directive you don't list falls back to it — so you must list
each directive above explicitly, not rely on the fallback.

**Why this is recommended:**

- **`script-src`** — the widget runs **without** `'unsafe-inline'` and **without**
  `'unsafe-eval'`. You do not need to add either; keep them out of your policy.
- **`style-src`** — **`'unsafe-inline'` is required.** The widget is built with
  [styled-components](https://styled-components.com/), which injects a `<style>`
  tag into the document at runtime. Browsers treat this as inline CSS, so a strict
  `style-src` without `'unsafe-inline'` blocks it and the widget renders unstyled.
  Nonce-based CSS (`style-src 'nonce-…'`) is **not supported** — the widget does
  not emit a nonce on its injected styles.
- **Wildcard `*.8x8.com` and `*.chalet.8x8.com` cover all regions (UK, US-East, AP, CA) and
  all 8x8 subdomains.** No updates needed if 8x8 changes cluster names, adds
  regions, or reorganizes infrastructure — including cases where the exact host
  *form* changes under a stable tenant.
  The trade-off: `script-src https://*.8x8.com` grants script execution on your
  page to **every** 8x8 subdomain, not just the chat hosts. If that is too broad
  for your security review, use the strict alternative below.

## Strict alternative (exact origins — for audits that disallow wildcards)

:::warning
Only use this if your audit explicitly forbids wildcards. Exact hosts are
harder to maintain — if 8x8 changes cluster names or adds regions, you'll need
to update the policy.
:::

**The exact hosts vary per tenant, so read them from your browser rather than
copying the example verbatim.** Load your site with the widget, open DevTools →
Network (or watch the CSP violation reports — see below), and note the actual
`vcc-…`, `cloud8-…`, `api.…chalet` and `files.…chalet` origins the widget contacts.
The example below shows the *shape* of the policy; substitute your own hosts.

The hosts depend on tenant-specific values that are **not** interchangeable:

- **`<cluster>`** — the chat/loader host, `vcc-<cluster>.8x8.com` (e.g. `eu11`).
- **`<site>`** — the chat-processor host, `cloud8-<site>.8x8.com` (e.g. `uk`).
  Often **different** from the cluster.
- **`<region>`** — the chalet region, `api.<region>.chalet` / `files.<region>.chalet`.
  Available regions are `uk` / `us-east` / `ap` / `ca` (there is no ES or DE region —
  ES/DE tenants are normally served from `uk`, though this isn't guaranteed).

The `vcc-<cluster>` and `cloud8-<site>` hosts **may or may not carry a `-cf`
suffix** depending on how your tenant is fronted, and the bare host is also used
as a live fallback when discovery is unavailable — so **list both forms**.
`cloud8-cc-geo.8x8.com` (discovery) and `cloud8.8x8.com` (asset registry) are
fixed global hosts, the same for every tenant.

Roll this out under `Content-Security-Policy-Report-Only` first: a wrong host
guess then shows up as a violation report instead of a dead widget.

```text
script-src  'self' https://vcc-<cluster>.8x8.com https://vcc-<cluster>-cf.8x8.com
            https://cloud8.8x8.com https://vcc-assets.8x8.com;
connect-src 'self' https://vcc-<cluster>.8x8.com https://vcc-<cluster>-cf.8x8.com
            https://cloud8-<site>.8x8.com https://cloud8-<site>-cf.8x8.com
            https://cloud8-cc-geo.8x8.com https://cloud8.8x8.com https://vcc-assets.8x8.com
            https://api.global.chalet.8x8.com
            https://api.<region>.chalet.8x8.com wss://api.<region>.chalet.8x8.com;
frame-src   'self' https://vcc-<cluster>.8x8.com https://vcc-<cluster>-cf.8x8.com;
img-src     'self' data: blob: https://vcc-<cluster>.8x8.com https://vcc-<cluster>-cf.8x8.com https://files.<region>.chalet.8x8.com;
media-src   'self' blob: https://vcc-<cluster>.8x8.com https://vcc-<cluster>-cf.8x8.com;
style-src   'self' 'unsafe-inline';
font-src    'self' https://vcc-assets.8x8.com;
```
