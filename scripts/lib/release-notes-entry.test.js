const assert = require('node:assert');
const { validateEntry, productList, PRODUCT_NAMES, TYPES } = require('./release-notes-entry');

let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`  ok - ${name}`); }
  catch (e) { failures++; console.error(`  FAIL - ${name}\n    ${e.message}`); }
}

const valid = {
  date: '2026-07-21',
  products: ['Connect', 'APIs'],
  channel: 'WhatsApp',
  changeType: 'Added',
  title: 'Business-Scoped User IDs (BSUID)',
};

check('registry is exported and non-empty', () => {
  assert.deepStrictEqual(TYPES, ['Added', 'Changed', 'Fixed', 'Deprecated']);
  assert.ok(PRODUCT_NAMES.includes('Connect'));
  assert.ok(PRODUCT_NAMES.includes('Resolve'));
  assert.strictEqual(PRODUCT_NAMES.length, 11);
});

check('valid multi-product entry passes', () => {
  assert.deepStrictEqual(validateEntry(valid, '2026-07-21-business-scoped-user-ids-bsuid.md'), []);
});

check('productList accepts array, singular string, and legacy product', () => {
  assert.deepStrictEqual(productList({ products: ['Connect', 'APIs'] }), ['Connect', 'APIs']);
  assert.deepStrictEqual(productList({ products: 'Connect' }), ['Connect']);
  assert.deepStrictEqual(productList({ product: 'JaaS' }), ['JaaS']);
  assert.deepStrictEqual(productList({}), []);
});

check('unregistered product flagged', () => {
  assert.ok(
    validateEntry({ ...valid, products: ['Connect', 'Telephony'] }, '2026-07-21-x.md')
      .some((e) => /product "Telephony" is not registered/.test(e)),
  );
});

check('unknown changeType flagged', () => {
  assert.ok(
    validateEntry({ ...valid, changeType: 'Removed' }, '2026-07-21-x.md')
      .some((e) => /changeType/.test(e)),
  );
});

check('missing title flagged', () => {
  const { title, ...noTitle } = valid;
  assert.ok(validateEntry(noTitle, '2026-07-21-x.md').some((e) => /title/.test(e)));
});

check('missing date flagged', () => {
  const { date, ...noDate } = valid;
  assert.ok(validateEntry(noDate, '2026-07-21-x.md').some((e) => /date/.test(e)));
});

check('empty products array flagged as missing', () => {
  assert.ok(
    validateEntry({ ...valid, products: [] }, '2026-07-21-x.md')
      .some((e) => /missing required field "products"/.test(e)),
  );
});

check('filename date must match date frontmatter', () => {
  assert.ok(
    validateEntry(valid, '2026-02-02-mismatch.md').some((e) => /filename date/.test(e)),
  );
});

check('filename must start with an ISO date', () => {
  assert.ok(
    validateEntry(valid, 'business-scoped-user-ids.md').some((e) => /YYYY-MM-DD/.test(e)),
  );
});

check('date supplied as a Date object still matches the filename', () => {
  // gray-matter parses bare YYYY-MM-DD as a Date; the validator must normalise it.
  assert.deepStrictEqual(
    validateEntry({ ...valid, date: new Date('2026-07-21T00:00:00Z') }, '2026-07-21-x.md'),
    [],
  );
});

check('unknown frontmatter key (prs/tickets) flagged as internal reference', () => {
  assert.ok(
    validateEntry({ ...valid, prs: [279, 280] }, '2026-07-21-x.md')
      .some((e) => /unknown frontmatter key "prs"/.test(e)),
  );
  assert.ok(
    validateEntry({ ...valid, tickets: 'MSG-4732' }, '2026-07-21-x.md')
      .some((e) => /unknown frontmatter key "tickets"/.test(e)),
  );
});

check('legacy singular `product` key is not treated as an unknown key', () => {
  const { products, ...rest } = valid;
  // `product` is allowlisted, so it must not raise an unknown-key error (the
  // required-field check still expects `products`, which is separate).
  assert.ok(
    !validateEntry({ ...rest, product: 'Connect' }, '2026-07-21-x.md')
      .some((e) => /unknown frontmatter key/.test(e)),
  );
});

check('issue key in the body flagged', () => {
  assert.ok(
    validateEntry(valid, '2026-07-21-x.md', 'Fixes delivery receipts. MSG-4732')
      .some((e) => /internal issue key "MSG-4732"/.test(e)),
  );
});

check('standards tokens in the body are not flagged as issue keys', () => {
  assert.deepStrictEqual(
    validateEntry(valid, '2026-07-21-x.md', 'Now hashed with SHA-256 over UTF-8 per RFC-7231.'),
    [],
  );
});

check('clean body passes', () => {
  assert.deepStrictEqual(
    validateEntry(valid, '2026-07-21-x.md', 'New channelUserId field documented across WhatsApp.'),
    [],
  );
});

if (failures) { console.error(`\n${failures} test(s) failed`); process.exit(1); }
console.log('\nAll release-notes-entry tests passed');
