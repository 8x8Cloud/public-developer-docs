const assert = require('node:assert');
const { sortEntries, withBaseUrl } = require('./load');

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

check('withBaseUrl leaves root-absolute links unchanged at baseUrl "/"', () => {
  const html = '<a href="/administration/docs/suite-common#api-versioning">x</a>';
  assert.strictEqual(withBaseUrl(html, '/'), html);
});

check('withBaseUrl prepends a non-root baseUrl to root-absolute links', () => {
  const html = '<a href="/administration/docs/suite-common#api-versioning">x</a>';
  assert.strictEqual(
    withBaseUrl(html, '/pr-273/'),
    '<a href="/pr-273/administration/docs/suite-common#api-versioning">x</a>',
  );
});

check('withBaseUrl does not touch external, protocol-relative, or anchor links', () => {
  const baseUrl = '/pr-273/';
  assert.strictEqual(
    withBaseUrl('<a href="https://8x8.com/x">x</a>', baseUrl),
    '<a href="https://8x8.com/x">x</a>',
  );
  assert.strictEqual(
    withBaseUrl('<a href="//cdn.8x8.com/x">x</a>', baseUrl),
    '<a href="//cdn.8x8.com/x">x</a>',
  );
  assert.strictEqual(
    withBaseUrl('<a href="#section">x</a>', baseUrl),
    '<a href="#section">x</a>',
  );
});

if (failures) { console.error(`\n${failures} test(s) failed`); process.exit(1); }
console.log('\nAll load tests passed');
