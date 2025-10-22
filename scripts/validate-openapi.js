#!/usr/bin/env node

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// =====================================================================
// CONFIGURATION
// =====================================================================

const DOCS_OAS_DIR = path.join(__dirname, '..', 'docs_oas');

// =====================================================================
// MAIN SCRIPT
// =====================================================================

const targetFolder = process.argv[2];

let validationPath = 'docs_oas/**/*.{json,yaml,yml}';
let displayPath = 'all folders in docs_oas/';

// Check if a folder argument was provided
if (targetFolder) {
  // Validate folder name contains only safe characters
  if (!/^[a-zA-Z0-9_-]+$/.test(targetFolder)) {
    console.log(`⚠️  Warning: Invalid folder name "${targetFolder}"`);
    console.log(`   Folder names must contain only letters, numbers, dashes, and underscores.`);
    console.log(`   Ignoring parameter and validating all files...\n`);
  } else {
    // Check if folder exists
    const targetPath = path.join(DOCS_OAS_DIR, targetFolder);
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
      validationPath = `docs_oas/${targetFolder}/**/*.{json,yaml,yml}`;
      displayPath = `docs_oas/${targetFolder}/`;
      console.log(`🎯 Validating OpenAPI files in: ${displayPath}\n`);
    } else {
      const availableFolders = getAvailableFolders();
      console.log(`⚠️  Warning: Folder "${targetFolder}" does not exist in docs_oas/`);
      if (availableFolders.length > 0) {
        console.log(`   Available folders: ${availableFolders.join(', ')}`);
      }
      console.log(`   Ignoring parameter and validating all files...\n`);
    }
  }
} else {
  console.log(`🔍 Validating all OpenAPI files in: ${displayPath}\n`);
}

// Count files to validate
const filesToValidate = getOasFiles(validationPath);
const fileCount = filesToValidate.length;

if (fileCount === 0) {
  console.log(`⚠️  No OpenAPI files found in ${displayPath}`);
  console.log('   Supported extensions: .json, .yaml, .yml\n');
  process.exit(0);
}

console.log(`📊 Found ${fileCount} OpenAPI file${fileCount === 1 ? '' : 's'} to validate\n`);

// Run Redocly validation
console.log('═'.repeat(80));
console.log('Running validation...');
console.log('═'.repeat(80));
console.log();

const result = spawnSync('yarn', ['validate:oas'], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    REDOCLY_PATTERN: validationPath,
  },
});

console.log();
console.log('═'.repeat(80));

// Parse result and generate summary
if (result.status === 0) {
  console.log('✅ OpenAPI Validation Summary:');
  console.log(`   Validated: ${fileCount} file${fileCount === 1 ? '' : 's'}`);
  console.log(`   Passed: ${fileCount} file${fileCount === 1 ? '' : 's'}`);
  console.log('   Failed: 0 files');
  console.log();
  console.log('All OpenAPI files are valid! 🎉\n');
  process.exit(0);
} else {
  console.log('❌ OpenAPI Validation Summary:');
  console.log(`   Validated: ${fileCount} file${fileCount === 1 ? '' : 's'}`);
  console.log('   Status: Some files have validation errors');
  console.log();
  console.log('Please fix the validation errors above and run again.\n');
  process.exit(1);
}

// =====================================================================
// HELPER FUNCTIONS
// =====================================================================

/**
 * Get list of available folders in docs_oas/
 * @returns {Array<string>} Array of folder names
 */
function getAvailableFolders() {
  const folders = [];

  if (!fs.existsSync(DOCS_OAS_DIR)) {
    return folders;
  }

  const entries = fs.readdirSync(DOCS_OAS_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      folders.push(entry.name);
    }
  }

  return folders.sort();
}

/**
 * Get list of OAS files matching the pattern
 * @param {string} pattern - Glob pattern for files
 * @returns {Array<string>} Array of file paths
 */
function getOasFiles(pattern) {
  const files = [];

  // Determine which folders to scan
  let foldersToScan = getAvailableFolders();

  // If pattern targets specific folder, only scan that one
  const folderMatch = pattern.match(/docs_oas\/([^/]+)\//);
  if (folderMatch) {
    const targetFolder = folderMatch[1];
    const targetPath = path.join(DOCS_OAS_DIR, targetFolder);
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
      foldersToScan = [targetFolder];
    }
  }

  // Scan folders
  for (const folder of foldersToScan) {
    const folderPath = path.join(DOCS_OAS_DIR, folder);

    if (!fs.existsSync(folderPath)) {
      continue;
    }

    const folderFiles = scanDirectory(folderPath);
    files.push(...folderFiles);
  }

  return files;
}

/**
 * Recursively scan directory for OAS files
 * @param {string} dirPath - Directory path to scan
 * @returns {Array<string>} Array of file paths
 */
function scanDirectory(dirPath) {
  const files = [];

  if (!fs.existsSync(dirPath)) {
    return files;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...scanDirectory(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.json', '.yaml', '.yml'].includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}
