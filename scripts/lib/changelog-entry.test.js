const assert = require('node:assert');
const { validateEntry, API_SLUGS, CHANGE_TYPES } = require('./changelog-entry');

let failures = 0;
function check(name, fn) {
  try { fn(); console.log(`  ok - ${name}`); }
  catch (e) { failures++; console.error(`  FAIL - ${name}\n    ${e.message}`); }
}

const valid = {
  date: '2026-01-15',
  api: 'user-management',
  changeType: 'non-breaking',
  version: 'v1',
  title: 'phoneNumberType added to user object',
};

check('enums are exported', () => {
  assert.deepStrictEqual(CHANGE_TYPES, ['non-breaking', 'breaking', 'deprecation', 'release', 'docs']);
  assert.ok(API_SLUGS.includes('operations'));
  assert.ok(API_SLUGS.includes('general'));
  assert.strictEqual(API_SLUGS.length, 7);
});

check('valid entry passes', () => {
  assert.deepStrictEqual(validateEntry(valid, '2026-01-15-user-phonenumbertype.md'), []);
});

check('missing required field flagged', () => {
  const { title, ...noTitle } = valid;
  assert.ok(validateEntry(noTitle, '2026-01-15-x.md').some(e => /title/.test(e)));
});

check('unknown changeType flagged', () => {
  assert.ok(validateEntry({ ...valid, changeType: 'feature' }, '2026-01-15-x.md').some(e => /changeType/.test(e)));
});

check('unknown api flagged', () => {
  assert.ok(validateEntry({ ...valid, api: 'billing' }, '2026-01-15-x.md').some(e => /api/.test(e)));
});

check('previousVersion on non-breaking flagged', () => {
  assert.ok(validateEntry({ ...valid, previousVersion: 'v0' }, '2026-01-15-x.md').some(e => /previousVersion/.test(e)));
});

check('breaking requires previousVersion', () => {
  assert.ok(validateEntry({ ...valid, changeType: 'breaking', version: 'v2' }, '2026-01-15-x.md').some(e => /previousVersion/.test(e)));
});

check('breaking with previousVersion passes', () => {
  assert.deepStrictEqual(
    validateEntry({ ...valid, changeType: 'breaking', version: 'v2', previousVersion: 'v1' }, '2026-01-15-x.md'),
    []
  );
});

check('filename date must match date frontmatter', () => {
  assert.ok(validateEntry(valid, '2026-02-02-mismatch.md').some(e => /filename/.test(e)));
});

check('version must look like v<major>', () => {
  assert.ok(validateEntry({ ...valid, version: '1.0' }, '2026-01-15-x.md').some(e => /version/.test(e)));
});

if (failures) { console.error(`\n${failures} test(s) failed`); process.exit(1); }
console.log('\nAll changelog-entry tests passed');
