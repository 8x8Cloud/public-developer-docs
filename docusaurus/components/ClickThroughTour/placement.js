// Callout placement for ClickThroughTour. Pure functions, kept apart from the
// component so `yarn test` can run them in plain Node. CommonJS for the same
// reason; webpack imports it from the component as usual.

// Space between the spotlight and the callout, in CSS pixels.
const GAP = 16;
// Minimum space between the callout and the screenshot's edge.
const MARGIN = 8;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(v, hi));

// Boxes are { x, y, w, h }. Touching edges count as overlapping.
const overlaps = (a, b) =>
  !(a.x + a.w < b.x || a.x > b.x + b.w || a.y + a.h < b.y || a.y > b.y + b.h);

/**
 * Put the callout beside the spotlight (right, then left, then below, then
 * above), keep it inside the screenshot, and if it would still cover the
 * spotlight, move it to the free corner.
 *
 * @param {{x: number, y: number, w: number, h: number}} spot Spotlight box.
 * @param {{w: number, h: number}} tip Callout size.
 * @param {{w: number, h: number}} stage Screenshot size.
 * @returns {{left: number, top: number}} Callout position in the screenshot.
 */
function placeCallout(spot, tip, stage) {
  let x;
  let y;
  if (spot.x + spot.w + GAP + tip.w <= stage.w - MARGIN) {
    x = spot.x + spot.w + GAP;
    y = spot.y;
  } else if (spot.x - GAP - tip.w >= MARGIN) {
    x = spot.x - GAP - tip.w;
    y = spot.y;
  } else if (spot.y + spot.h + GAP + tip.h <= stage.h - MARGIN) {
    x = spot.x;
    y = spot.y + spot.h + GAP;
  } else {
    x = spot.x;
    y = spot.y - GAP - tip.h;
  }
  x = clamp(x, MARGIN, stage.w - tip.w - MARGIN);
  y = clamp(y, MARGIN, stage.h - tip.h - MARGIN);
  if (overlaps({ x, y, ...tip }, spot)) {
    y = spot.y > stage.h / 2 ? MARGIN : stage.h - tip.h - MARGIN;
    if (overlaps({ x, y, ...tip }, spot)) {
      x = spot.x > stage.w / 2 ? MARGIN : stage.w - tip.w - MARGIN;
    }
  }
  return { left: x, top: y };
}

module.exports = { GAP, MARGIN, clamp, overlaps, placeCallout };
