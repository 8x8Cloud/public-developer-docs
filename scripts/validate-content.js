#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// =====================================================================
// CONFIGURATION - Content validation rules
// =====================================================================

/**
 * Validation rules to check across all docs content.
 * Each rule has:
 * - name: Display name for the rule
 * - pattern: RegExp to match violations
 * - message: Description of what the rule checks
 */
const VALIDATION_RULES = [
  {
    name: 'No ref: links',
    pattern: /\(ref:|href=["']ref:/gi,
    message:
      'Files should not contain ref: links (legacy ReadMe format). Use standard markdown paths instead.',
  },
  {
    name: 'No developer.8x8.com URLs',
    pattern: /\(https?:\/\/developer\.8x8\.com|href=["']https?:\/\/developer\.8x8\.com/gi,
    message:
      'Files should not contain absolute URLs to developer.8x8.com. Use relative paths instead.',
  },
  // Add more rules here as needed:
  // {
  //   name: 'No hardcoded production URLs',
  //   pattern: /https:\/\/api\.8x8\.com/gi,
  //   message: 'Files should not contain hardcoded production URLs.',
  // },
];

// =====================================================================
// MAIN SCRIPT
// =====================================================================

const DOCS_DIR = path.join(__dirname, '..', 'docs');

console.log('🔍 Validating content in docs/ directory...\n');

const violations = validateDirectory(DOCS_DIR);

if (violations.length === 0) {
  console.log('✅ All content validation checks passed!\n');
  process.exit(0);
}

// Group violations by rule
const violationsByRule = groupViolationsByRule(violations);

// Generate and display report
generateReport(violationsByRule);

console.log('❌ Content validation failed - please fix the violations above\n');
process.exit(1);

// =====================================================================
// VALIDATION FUNCTIONS
// =====================================================================

/**
 * Recursively validates all files in a directory
 * @param {string} dirPath - Directory path to validate
 * @returns {Array} Array of violation objects
 */
function validateDirectory(dirPath) {
  const violations = [];

  function scanDirectory(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        scanDirectory(fullPath);
      } else if (entry.isFile()) {
        const fileViolations = validateFile(fullPath);
        violations.push(...fileViolations);
      }
    }
  }

  scanDirectory(dirPath);
  return violations;
}

/**
 * Validates a single file against all rules
 * @param {string} filePath - Path to file to validate
 * @returns {Array} Array of violation objects for this file
 */
function validateFile(filePath) {
  const violations = [];
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const relativePath = path.relative(path.join(__dirname, '..'), filePath);

  // Check each rule against the file
  for (const rule of VALIDATION_RULES) {
    // Check each line for violations
    lines.forEach((line, index) => {
      const matches = line.match(rule.pattern);
      if (matches) {
        violations.push({
          rule: rule.name,
          message: rule.message,
          file: relativePath,
          line: index + 1,
          content: line.trim(),
          matchCount: matches.length,
        });
      }
    });
  }

  return violations;
}

/**
 * Groups violations by rule name
 * @param {Array} violations - Array of violation objects
 * @returns {Object} Violations grouped by rule name
 */
function groupViolationsByRule(violations) {
  const grouped = {};

  for (const violation of violations) {
    if (!grouped[violation.rule]) {
      grouped[violation.rule] = {
        message: violation.message,
        violations: [],
      };
    }
    grouped[violation.rule].violations.push(violation);
  }

  return grouped;
}

/**
 * Generates and prints formatted report
 * @param {Object} violationsByRule - Violations grouped by rule
 */
function generateReport(violationsByRule) {
  console.log('═'.repeat(80));
  console.log('# Content Validation Report');
  console.log('═'.repeat(80));
  console.log();

  let totalViolations = 0;

  for (const [ruleName, { message, violations }] of Object.entries(
    violationsByRule,
  )) {
    console.log(`## ${ruleName}`);
    console.log(`   ${message}`);
    console.log();

    // Group by file for cleaner output
    const byFile = {};
    for (const v of violations) {
      if (!byFile[v.file]) {
        byFile[v.file] = [];
      }
      byFile[v.file].push(v);
    }

    const fileCount = Object.keys(byFile).length;
    const violationCount = violations.length;
    totalViolations += violationCount;

    console.log(
      `   Found ${violationCount} violation${violationCount === 1 ? '' : 's'} in ${fileCount} file${fileCount === 1 ? '' : 's'}:`,
    );
    console.log();

    // Sort files alphabetically
    const sortedFiles = Object.keys(byFile).sort();

    for (const file of sortedFiles) {
      const fileViolations = byFile[file];
      console.log(`   📄 ${file}`);

      for (const violation of fileViolations) {
        console.log(`      Line ${violation.line}: ${violation.content}`);
      }
      console.log();
    }
  }

  console.log('═'.repeat(80));
  console.log();
  console.log('📈 Summary:');
  console.log(`   Total violations: ${totalViolations}`);
  console.log(`   Rules violated: ${Object.keys(violationsByRule).length}`);
  console.log();
}
