#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { validateEntry, parseEntryFile } = require('./lib/release-notes-entry');

const DIR = path.join(__dirname, '..', 'docs', '_release-notes');

console.log('🔍 Validating Release Notes entries...\n');

if (!fs.existsSync(DIR)) {
  console.log(`(no release-notes directory at ${path.relative(process.cwd(), DIR)} — nothing to validate)`);
  process.exit(0);
}

const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.md'));
let total = 0;

for (const file of files) {
  const { data, content } = parseEntryFile(path.join(DIR, file));
  const errors = validateEntry(data, file, content);
  if (errors.length) {
    total += errors.length;
    console.error(`📄 ${file}`);
    for (const e of errors) console.error(`   - ${e}`);
    console.error('');
  }
}

if (total) {
  console.error(`❌ ${total} release-notes validation error(s) across ${files.length} file(s)\n`);
  process.exit(1);
}
console.log(`✅ ${files.length} release-notes entr${files.length === 1 ? 'y' : 'ies'} valid\n`);
process.exit(0);
