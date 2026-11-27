const assert = require('node:assert');
const { GAP, MARGIN, clamp, overlaps, placeCallout } = require('./placement');

let failures = 0;
function check(name, fn) {
  try {
    fn();
    console.log(`  ok - ${name}`);
  } catch (e) {
    failures++;
    console.error(`  FAIL - ${name}\n    ${e.message}`);
  }
}

const stage = { w: 1000, h: 600 };
const tip = { w: 300, h: 150 };
const box = ({ left, top }) => ({ x: left, y: top, ...tip });

console.log('ClickThroughTour placement');

check('clamp keeps values inside the range', () => {
  assert.strictEqual(clamp(5, 0, 10), 5);
  assert.strictEqual(clamp(-3, 0, 10), 0);
  assert.strictEqual(clamp(42, 0, 10), 10);
});

check('overlaps detects intersecting, touching and separate boxes', () => {
  const a = { x: 0, y: 0, w: 10, h: 10 };
  assert.strictEqual(overlaps(a, { x: 5, y: 5, w: 10, h: 10 }), true);
  assert.strictEqual(overlaps(a, { x: 10, y: 0, w: 10, h: 10 }), true);
  assert.strictEqual(overlaps(a, { x: 11, y: 0, w: 10, h: 10 }), false);
  assert.strictEqual(overlaps(a, { x: 0, y: 11, w: 10, h: 10 }), false);
});

check('places the callout to the right when it fits', () => {
  const spot = { x: 50, y: 100, w: 200, h: 80 };
  assert.deepStrictEqual(placeCallout(spot, tip, stage), {
    left: spot.x + spot.w + GAP,
    top: spot.y,
  });
});

check('falls back to the left when the right is too narrow', () => {
  const spot = { x: 600, y: 100, w: 250, h: 80 };
  assert.deepStrictEqual(placeCallout(spot, tip, stage), {
    left: spot.x - GAP - tip.w,
    top: spot.y,
  });
});

check('falls back to below when neither side fits', () => {
  const spot = { x: 200, y: 50, w: 600, h: 100 };
  assert.deepStrictEqual(placeCallout(spot, tip, stage), {
    left: spot.x,
    top: spot.y + spot.h + GAP,
  });
});

check('falls back to above when below does not fit either', () => {
  const spot = { x: 200, y: 380, w: 600, h: 100 };
  assert.deepStrictEqual(placeCallout(spot, tip, stage), {
    left: spot.x,
    top: spot.y - GAP - tip.h,
  });
});

check(
  'moves to the bottom edge when "above" gets clamped onto the spotlight',
  () => {
    // Wide spotlight near the top: no side fits, below is 4px short, and
    // "above" is pushed down onto the spotlight by the top margin.
    const spot = { x: 200, y: 100, w: 600, h: 330 };
    const pos = placeCallout(spot, tip, stage);
    assert.deepStrictEqual(pos, {
      left: spot.x,
      top: stage.h - tip.h - MARGIN,
    });
    assert.strictEqual(overlaps(box(pos), spot), false);
  },
);

check(
  'moves to the free corner when the top and bottom are both covered',
  () => {
    // Tall spotlight on the left with a wide callout: only the bottom-right
    // corner is clear.
    const wide = { w: 600, h: 150 };
    const spot = { x: 100, y: 100, w: 280, h: 400 };
    const pos = placeCallout(spot, wide, stage);
    assert.deepStrictEqual(pos, {
      left: stage.w - wide.w - MARGIN,
      top: stage.h - wide.h - MARGIN,
    });
    assert.strictEqual(
      overlaps({ x: pos.left, y: pos.top, ...wide }, spot),
      false,
    );
  },
);

check('always keeps the callout inside the screenshot', () => {
  const spots = [
    { x: 0, y: 0, w: 20, h: 20 },
    { x: 980, y: 580, w: 20, h: 20 },
    { x: 400, y: 0, w: 200, h: 600 },
  ];
  for (const spot of spots) {
    const { left, top } = placeCallout(spot, tip, stage);
    assert.ok(
      left >= MARGIN && left + tip.w <= stage.w - MARGIN,
      `left ${left}`,
    );
    assert.ok(top >= MARGIN && top + tip.h <= stage.h - MARGIN, `top ${top}`);
  }
});

if (failures) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log('\nAll checks passed');
