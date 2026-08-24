// Shared constants + helpers for the Release Notes index and detail pages.
//
// The product registry and slug helpers live in ./products.js (CommonJS) so the
// build-time validator can share them; this module re-exports them for the React
// components and adds the browser-side link/date helpers.

import { PRODUCTS, TYPES, PRODUCT_GROUPS, slugify, productSlug } from './products';

export { PRODUCTS, TYPES, PRODUCT_GROUPS, slugify, productSlug };

export const P = Object.fromEntries(PRODUCTS.map((p) => [p.name, p]));
export const PRODUCT_ORDER = PRODUCTS.map((p) => p.name);

// Product colour comes from the Oxygen categorical palette (--data01…--data11),
// mapped by display position. This returns the 1-based index a product's dot uses
// to pick its `colorClass` in the CSS module; 0 = unregistered (neutral fallback).
export function colorIndex(name) {
  return (P[name] && P[name].colorIndex) || 0;
}

// Inline style that sets a dot's --rn-pc colour from the Oxygen categorical
// palette (--data01…--data11) by 1-based registry position. Returns undefined
// for position 0 (unregistered) so the dot falls back to --ui03 via the CSS
// default. Set inline rather than via a `.pcN` class so the palette mapping
// isn't duplicated in every CSS module that renders a dot.
export function colorVar(index) {
  return index ? { '--rn-pc': `var(--data${index})` } : undefined;
}

// Channels (sub-modules under Connect) with their own docs landing. Each
// canonical /connect/docs/<channel>/overview resolves via redirects
// (docusaurus/redirects/connect.js) to the module's first working page.
export const CHANNEL_DOC = {
  WhatsApp: '/connect/docs/whatsapp/overview',
  RCS: '/connect/docs/rcs/overview',
  Viber: '/connect/docs/viber/overview',
  LINE: '/connect/docs/line/overview',
  Voice: '/connect/docs/voice/overview',
};

// Preferred order for the channel filter; any present channel not listed here
// (e.g. Messaging Apps, Streaming, WebChat, Platform) is appended after, by count.
export const CHANNEL_ORDER = ['SMS', 'Voice', 'WhatsApp', 'Viber', 'RCS', 'LINE', 'Verification'];

// Where the card's "View … docs" link points: the channel landing if the
// channel has one, otherwise the product overview. This is the fallback link
// shown on every card and detail page.
export function docHref(entry) {
  return CHANNEL_DOC[entry.channel] || (P[entry.product] && P[entry.product].doc) || null;
}

// Each release note is its own page, rendered from its Markdown source.
export function releasePath(id) {
  return `/release-notes/${id}`;
}

// Stable, shareable permalink for a single product's releases (parallel to the
// per-month /release-notes/m/<YYYY-MM> pages). e.g. "Actions & Events" -> apis.
export function productPath(name) {
  return `/release-notes/p/${productSlug(name)}`;
}

// ---- Dates -------------------------------------------------------------------
// Format via the browser's Intl API rather than a hand-rolled month table. Locale
// and timeZone are pinned so server-render and client-hydration produce identical
// strings (no hydration mismatch) regardless of the viewer's locale/zone.
const LONG_DATE = new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
});
const LONG_MONTH = new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'long', timeZone: 'UTC',
});

// 'YYYY-MM-DD' (or 'YYYY-MM') -> 'YYYY-MM' month key.
export function monthKey(date) {
  return String(date).slice(0, 7);
}
// 'YYYY-MM-DD' -> 'Aug 7, 2026'.
export function longDate(date) {
  return LONG_DATE.format(new Date(`${String(date).slice(0, 10)}T00:00:00Z`));
}
// 'YYYY-MM' month key -> 'August 2026'.
export function monthLabel(key) {
  return LONG_MONTH.format(new Date(`${monthKey(key)}-01T00:00:00Z`));
}
