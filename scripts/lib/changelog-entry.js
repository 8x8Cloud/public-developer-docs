const matter = require('gray-matter');
const fs = require('fs');

const API_SLUGS = [
  'general',
  'user-management',
  'ring-group-management',
  'phone-number-management',
  'site-management',
  'address-management',
  'operations',
];

const CHANGE_TYPES = ['non-breaking', 'breaking', 'deprecation', 'release', 'docs'];

const REQUIRED = ['date', 'api', 'changeType', 'version', 'title'];

/**
 * Validate a parsed changelog entry's frontmatter.
 * @param {object} data parsed frontmatter
 * @param {string} filename basename of the entry file
 * @returns {string[]} error messages (empty = valid)
 */
function validateEntry(data, filename) {
  const errors = [];

  for (const key of REQUIRED) {
    if (data[key] === undefined || data[key] === null || data[key] === '') {
      errors.push(`missing required field "${key}"`);
    }
  }

  if (data.api !== undefined && !API_SLUGS.includes(data.api)) {
    errors.push(`api "${data.api}" is not one of: ${API_SLUGS.join(', ')}`);
  }

  if (data.changeType !== undefined && !CHANGE_TYPES.includes(data.changeType)) {
    errors.push(`changeType "${data.changeType}" is not one of: ${CHANGE_TYPES.join(', ')}`);
  }

  if (data.version !== undefined && !/^v\d+$/.test(String(data.version))) {
    errors.push(`version "${data.version}" must look like "v<major>" (e.g. v1)`);
  }

  const isBreaking = data.changeType === 'breaking';
  if (isBreaking && !data.previousVersion) {
    errors.push('breaking entries must set previousVersion (e.g. v1)');
  }
  if (!isBreaking && data.previousVersion) {
    errors.push('previousVersion is only allowed on breaking entries');
  }
  if (data.previousVersion && !/^v\d+$/.test(String(data.previousVersion))) {
    errors.push(`previousVersion "${data.previousVersion}" must look like "v<major>"`);
  }

  // Filename date prefix must match the date frontmatter.
  const m = filename.match(/^(\d{4}-\d{2}-\d{2})-/);
  if (!m) {
    errors.push(`filename "${filename}" must start with YYYY-MM-DD-`);
  } else if (data.date) {
    // gray-matter parses bare YYYY-MM-DD values as JS Date objects (UTC midnight).
    // Normalise to a YYYY-MM-DD string for comparison regardless of whether the
    // value arrived as a Date or a plain string.
    const dateStr =
      data.date instanceof Date
        ? data.date.toISOString().slice(0, 10)
        : String(data.date);
    if (m[1] !== dateStr) {
      errors.push(`filename date ${m[1]} does not match date frontmatter ${dateStr}`);
    }
  }

  return errors;
}

function parseEntryFile(absPath) {
  const raw = fs.readFileSync(absPath, 'utf8');
  const { data, content } = matter(raw);
  return { data, content };
}

module.exports = { validateEntry, parseEntryFile, API_SLUGS, CHANGE_TYPES };
