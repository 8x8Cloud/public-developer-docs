#!/usr/bin/env node
/**
 * Script to convert all operationId values in OpenAPI YAML/JSON files to lowercase
 *
 * Usage with yarn (recommended):
 *   yarn lowercase-operationids                             (processes all YAML/JSON files in docs_oas/)
 *   yarn lowercase-operationids <path-to-file>              (processes single YAML/JSON file)
 *   yarn lowercase-operationids <path-to-dir>               (processes all YAML/JSON files in directory)
 *
 * Direct usage with node:
 *   node scripts/lowercase-operation-ids.js                 (processes all YAML/JSON files in docs_oas/)
 *   node scripts/lowercase-operation-ids.js <path-to-file>  (processes single YAML/JSON file)
 *   node scripts/lowercase-operation-ids.js <path-to-dir>   (processes all YAML/JSON files in directory)
 *
 * Examples:
 *   yarn lowercase-operationids
 *   yarn lowercase-operationids docs_oas/actions-events/Dynamic_campaigns.yaml
 *   yarn lowercase-operationids docs_oas/actions-events/fax_as_a_service_(faas)_api.json
 *   yarn lowercase-operationids docs_oas/actions-events
 */

const fs = require('fs');
const path = require('path');

// Default directory to process when no argument is provided
const DEFAULT_DIR = path.join(__dirname, '..', 'docs_oas');

/**
 * Recursively find all OpenAPI files (YAML/JSON) in a directory
 */
function findOpenApiFiles(dir) {
  const openApiFiles = [];

  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (ext === '.yaml' || ext === '.yml' || ext === '.json') {
          openApiFiles.push(fullPath);
        }
      }
    }
  }

  traverse(dir);
  return openApiFiles;
}

/**
 * Process a single YAML file and return statistics
 */
function processYamlFile(yamlFilePath) {
  // Read the YAML file as text
  const yamlContent = fs.readFileSync(yamlFilePath, 'utf8');

  // Track changes
  let changeCount = 0;
  const changes = [];

  // Replace all operationId values with lowercase versions
  // Pattern matches: operationId: SomeValue or operationId: "SomeValue"
  const updatedContent = yamlContent.replace(
    /^(\s*operationId:\s*)(['"]?)([^\s'"]+)(['"]?)$/gm,
    (match, prefix, openQuote, operationId, closeQuote) => {
      const lowercaseId = operationId.toLowerCase();

      if (operationId !== lowercaseId) {
        changeCount++;
        changes.push({
          line: match.trim(),
          from: operationId,
          to: lowercaseId,
        });
        return `${prefix}${openQuote}${lowercaseId}${closeQuote}`;
      }

      return match;
    },
  );

  // Write changes if any
  if (changeCount > 0) {
    fs.writeFileSync(yamlFilePath, updatedContent, 'utf8');
  }

  return { changeCount, changes };
}

/**
 * Process a single JSON file and return statistics
 */
function processJsonFile(jsonFilePath) {
  // Read the JSON file as text
  const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');

  // Track changes
  let changeCount = 0;
  const changes = [];

  // Replace all operationId values with lowercase versions
  // Pattern matches: "operationId": "SomeValue" (with or without spaces)
  const updatedContent = jsonContent.replace(
    /"operationId"\s*:\s*"([^"]+)"/g,
    (match, operationId) => {
      const lowercaseId = operationId.toLowerCase();

      if (operationId !== lowercaseId) {
        changeCount++;
        changes.push({
          line: match.trim(),
          from: operationId,
          to: lowercaseId,
        });
        return match.replace(operationId, lowercaseId);
      }

      return match;
    },
  );

  // Write changes if any
  if (changeCount > 0) {
    fs.writeFileSync(jsonFilePath, updatedContent, 'utf8');
  }

  return { changeCount, changes };
}

/**
 * Process a single file (YAML or JSON) and return statistics
 */
function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.yaml' || ext === '.yml') {
    return processYamlFile(filePath);
  } else if (ext === '.json') {
    return processJsonFile(filePath);
  } else {
    throw new Error(`Unsupported file extension: ${ext}`);
  }
}

// Determine the target path (use default if no argument provided)
const targetPath = process.argv.length >= 3 ? process.argv[2] : DEFAULT_DIR;

// Check if target path exists
if (!fs.existsSync(targetPath)) {
  console.error(`Error: Path not found: ${targetPath}`);
  process.exit(1);
}

// Check if target is a directory or file
const stats = fs.statSync(targetPath);

if (stats.isDirectory()) {
  // Directory processing mode
  console.log(`Processing directory: ${targetPath}\n`);

  const openApiFiles = findOpenApiFiles(targetPath);

  if (openApiFiles.length === 0) {
    console.log('No YAML/JSON files found in directory');
    process.exit(0);
  }

  console.log(`Found ${openApiFiles.length} YAML/JSON file(s)\n`);

  let totalChanges = 0;
  let filesWithChanges = 0;
  const fileResults = [];

  // Process each file
  for (const filePath of openApiFiles) {
    const relativePath = path.relative(targetPath, filePath);
    const result = processFile(filePath);

    if (result.changeCount > 0) {
      filesWithChanges++;
      totalChanges += result.changeCount;
      fileResults.push({
        path: relativePath,
        changeCount: result.changeCount,
        changes: result.changes,
      });
    }
  }

  // Display results
  if (filesWithChanges > 0) {
    console.log('Files with changes:\n');
    fileResults.forEach(fileResult => {
      console.log(`📄 ${fileResult.path}`);
      console.log(
        `   Found ${fileResult.changeCount} operationId(s) to convert:`,
      );
      fileResult.changes.forEach(change => {
        console.log(`   • ${change.from} → ${change.to}`);
      });
      console.log('');
    });

    console.log('═'.repeat(60));
    console.log(`✓ Successfully processed ${openApiFiles.length} file(s)`);
    console.log(`✓ Updated ${filesWithChanges} file(s)`);
    console.log(`✓ Converted ${totalChanges} operationId(s) to lowercase`);
  } else {
    console.log(
      '✓ No changes needed - all operationId values are already lowercase',
    );
    console.log(`✓ Processed ${openApiFiles.length} file(s)`);
  }
} else if (stats.isFile()) {
  // Single file processing mode (backward compatibility)
  const ext = path.extname(targetPath).toLowerCase();
  if (ext !== '.yaml' && ext !== '.yml' && ext !== '.json') {
    console.error(
      `Error: File must have .yaml, .yml, or .json extension, got: ${ext}`,
    );
    process.exit(1);
  }

  console.log(`Processing file: ${targetPath}\n`);

  const result = processFile(targetPath);

  // Display changes
  if (result.changeCount > 0) {
    console.log(`Found ${result.changeCount} operationId(s) to convert:\n`);
    result.changes.forEach((change, index) => {
      console.log(`${index + 1}. ${change.from} → ${change.to}`);
    });

    console.log(`\n✓ Successfully updated ${targetPath}`);
    console.log(
      `✓ Converted ${result.changeCount} operationId(s) to lowercase`,
    );
  } else {
    console.log(
      '✓ No changes needed - all operationId values are already lowercase',
    );
  }
} else {
  console.error(`Error: Path is neither a file nor a directory: ${targetPath}`);
  process.exit(1);
}
