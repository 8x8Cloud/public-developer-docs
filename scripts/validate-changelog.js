#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { validateEntry, parseEntryFile } = require('./lib/changelog-entry');

const DIR = path.join(__dirname, '..', 'docs', 'administration', '_changelog');

console.log('🔍 Validating Administration changelog entries...\n');

if (!fs.existsSync(DIR)) {
  console.log(`(no changelog directory at ${path.relative(process.cwd(), DIR)} — nothing to validate)`);
  process.exit(0);
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md'));
let total = 0;

for (const file of files) {
  const { data } = parseEntryFile(path.join(DIR, file));
  const errors = validateEntry(data, file);
  if (errors.length) {
    total += errors.length;
    console.error(`📄 ${file}`);
    for (const e of errors) console.error(`   - ${e}`);
    console.error('');
  }
}

if (total) {
  console.error(`❌ ${total} changelog validation error(s) across ${files.length} file(s)\n`);
  process.exit(1);
}
console.log(`✅ ${files.length} changelog entr${files.length === 1 ? 'y' : 'ies'} valid\n`);
process.exit(0);
