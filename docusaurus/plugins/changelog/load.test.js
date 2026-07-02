const assert = require('node:assert');
const { sortEntries } = require('./load');

let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`  ok - ${name}`); }
  catch (e) { failures++; console.error(`  FAIL - ${name}\n    ${e.message}`); }
}

check('sorts by date descending then title ascending', () => {
  const input = [
    { date: '2026-01-08', title: 'B' },
    { date: '2026-01-15', title: 'Z' },
    { date: '2026-01-15', title: 'A' },
  ];
  const out = sortEntries(input).map((e) => `${e.date}/${e.title}`);
  assert.deepStrictEqual(out, ['2026-01-15/A', '2026-01-15/Z', '2026-01-08/B']);
});

check('does not mutate the input array', () => {
  const input = [{ date: '2026-01-08', title: 'B' }, { date: '2026-01-15', title: 'A' }];
  const copy = input.slice();
  sortEntries(input);
  assert.deepStrictEqual(input, copy);
});

if (failures) { console.error(`\n${failures} test(s) failed`); process.exit(1); }
console.log('\nAll load tests passed');
