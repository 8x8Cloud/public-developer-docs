const assert = require('node:assert');
const { sortEntries, withBaseUrl, normalizeProducts, excerptOf, isArticle } = require('./load');

let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`  ok - ${name}`); }
  catch (e) { failures++; console.error(`  FAIL - ${name}\n    ${e.message}`); }
}

check('sortEntries orders by date desc, then title asc', () => {
  const input = [
    { date: '2026-01-01', title: 'B' },
    { date: '2026-03-01', title: 'A' },
    { date: '2026-01-01', title: 'A' },
  ];
  assert.deepStrictEqual(
    sortEntries(input).map((e) => `${e.date}/${e.title}`),
    ['2026-03-01/A', '2026-01-01/A', '2026-01-01/B'],
  );
});

check('sortEntries does not mutate its input', () => {
  const input = [{ date: '2026-01-01', title: 'B' }, { date: '2026-03-01', title: 'A' }];
  const copy = input.slice();
  sortEntries(input);
  assert.deepStrictEqual(input, copy);
});

check('withBaseUrl leaves root-absolute links unchanged at baseUrl /', () => {
  const html = '<a href="/connect/docs">x</a>';
  assert.strictEqual(withBaseUrl(html, '/'), html);
});

check('withBaseUrl prefixes both href and src on a non-root baseUrl', () => {
  const html = '<a href="/connect/docs">x</a><img src="/img/a.png">';
  assert.strictEqual(
    withBaseUrl(html, '/pr-273/'),
    '<a href="/pr-273/connect/docs">x</a><img src="/pr-273/img/a.png">',
  );
});

check('withBaseUrl leaves external, protocol-relative and anchor URLs alone', () => {
  const html = '<a href="https://x.com">a</a><a href="//cdn/x">b</a><a href="#top">c</a>';
  assert.strictEqual(withBaseUrl(html, '/pr-1/'), html);
});

check('normalizeProducts accepts array, string, legacy product, and empty', () => {
  assert.deepStrictEqual(normalizeProducts({ products: ['Connect', 'APIs'] }), ['Connect', 'APIs']);
  assert.deepStrictEqual(normalizeProducts({ products: 'Connect' }), ['Connect']);
  assert.deepStrictEqual(normalizeProducts({ product: 'JaaS' }), ['JaaS']);
  assert.deepStrictEqual(normalizeProducts({}), []);
});

check('excerptOf takes the first paragraph and strips Markdown', () => {
  assert.strictEqual(
    excerptOf('**Bold** `code` intro line.\n\nSecond paragraph is dropped.'),
    'Bold code intro line.',
  );
});

check('excerptOf caps long text at 320 chars with an ellipsis', () => {
  const long = 'x '.repeat(300).trim(); // ~599 chars
  const out = excerptOf(long);
  assert.ok(out.endsWith('…'));
  assert.ok(out.length <= 321, `expected <=321, got ${out.length}`);
});

check('isArticle: true only when the body has more than one block', () => {
  assert.strictEqual(isArticle('Request call info for WhatsApp Business calling.'), false);
  assert.strictEqual(isArticle('Intro paragraph.\n\n## Heading\n\nMore detail here.'), true);
  assert.strictEqual(isArticle('One line.\n\n\n'), false); // trailing blanks don't count
  assert.strictEqual(isArticle(''), false);
});

if (failures) { console.error(`\n${failures} test(s) failed`); process.exit(1); }
console.log('\nAll release-notes load tests passed');
