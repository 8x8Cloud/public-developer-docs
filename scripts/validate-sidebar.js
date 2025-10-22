#!/usr/bin/env node

/**
 * Sidebar-Documentation Validation Script
 *
 * This script validates consistency between sidebar configuration and actual documentation files.
 * It identifies:
 * 1. Pages referenced in sidebar but missing from filesystem
 * 2. Pages existing in filesystem but not referenced in sidebar
 *
 * Usage:
 *   node scripts/validate-sidebar.js [category] [subcategory]
 *
 * Examples:
 *   node scripts/validate-sidebar.js analytics reference  # Check analytics/reference only
 *   node scripts/validate-sidebar.js connect              # Check both docs and reference in connect
 *   node scripts/validate-sidebar.js                      # Check all categories and subcategories
 */

const fs = require('fs');
const path = require('path');

// Configuration
const ROOT_DIR = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');
const SIDEBARS_DIR = path.join(ROOT_DIR, 'docusaurus', 'sidebars');
const REDIRECTS_FILE = path.join(ROOT_DIR, 'docusaurus', 'redirects.js');

// Valid subcategories
const VALID_SUBCATEGORIES = ['docs', 'reference'];

// Categories with separate docs/reference sidebars
const CATEGORIES_WITH_SUBCATEGORIES = [
  'actions-events',
  'analytics',
  'connect',
  'contactcenter',
];

// Categories with single sidebar files (no docs/reference split)
const SINGLE_SIDEBAR_CATEGORIES = ['jaas', 'tech-partner'];

/**
 * Load and parse redirect configurations
 * Returns a Map of { fromPath -> toPath }
 */
function loadRedirects() {
  try {
    // Clear require cache to ensure fresh load
    delete require.cache[require.resolve(REDIRECTS_FILE)];

    const redirects = require(REDIRECTS_FILE);
    const redirectMap = new Map();

    for (const redirect of redirects) {
      const fromPaths = Array.isArray(redirect.from)
        ? redirect.from
        : [redirect.from];
      for (const fromPath of fromPaths) {
        // Remove leading slash to match docId format
        const normalizedFrom = fromPath.startsWith('/')
          ? fromPath.substring(1)
          : fromPath;
        const normalizedTo = redirect.to.startsWith('/')
          ? redirect.to.substring(1)
          : redirect.to;
        redirectMap.set(normalizedFrom, normalizedTo);
      }
    }

    return redirectMap;
  } catch (error) {
    console.warn('Warning: Could not load redirects:', error.message);
    return new Map();
  }
}

/**
 * Parse command line arguments
 */
function parseArguments() {
  const args = process.argv.slice(2);

  let category = null;
  let subcategory = null;

  if (args.length > 0) {
    // First argument might be full path like "docs/analytics" or just "analytics"
    let firstArg = args[0];
    if (firstArg.startsWith('docs/')) {
      firstArg = firstArg.substring(5);
    }
    category = firstArg;
  }

  if (args.length > 1) {
    subcategory = args[1];

    // Validate subcategory
    if (!VALID_SUBCATEGORIES.includes(subcategory)) {
      console.error(`Invalid subcategory: ${subcategory}`);
      console.error(`Valid subcategories: ${VALID_SUBCATEGORIES.join(', ')}`);
      process.exit(1);
    }
  }

  // Validate category exists
  if (category && !fs.existsSync(path.join(DOCS_DIR, category))) {
    console.error(`Category not found: ${category}`);
    process.exit(1);
  }

  return { category, subcategory };
}

/**
 * Get all categories to validate based on arguments
 */
function getCategoriesToValidate(category) {
  if (category) {
    return [category];
  }

  // Get all categories from docs directory
  return fs
    .readdirSync(DOCS_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .filter(name => !name.startsWith('.'));
}

/**
 * Get subcategories to validate for a given category
 */
function getSubcategoriesToValidate(category, requestedSubcategory) {
  // If category has single sidebar (like jaas, tech-partner), return only 'docs'
  if (SINGLE_SIDEBAR_CATEGORIES.includes(category)) {
    return ['docs'];
  }

  if (requestedSubcategory) {
    return [requestedSubcategory];
  }

  // Check which subcategories exist in the docs folder
  const categoryPath = path.join(DOCS_DIR, category);
  const subcategories = [];

  for (const subcat of VALID_SUBCATEGORIES) {
    const subcatPath = path.join(categoryPath, subcat);
    if (fs.existsSync(subcatPath) && fs.statSync(subcatPath).isDirectory()) {
      subcategories.push(subcat);
    }
  }

  return subcategories;
}

/**
 * Extract document IDs from sidebar configuration recursively
 */
function extractDocIdsFromSidebar(items, docIds = new Set()) {
  if (!Array.isArray(items)) {
    return docIds;
  }

  for (const item of items) {
    if (typeof item === 'string') {
      // Simple string reference
      docIds.add(item);
    } else if (item && typeof item === 'object') {
      // Object with id property
      if (item.id) {
        docIds.add(item.id);
      }

      // Check for link.id (category with link)
      if (item.link && item.link.id) {
        docIds.add(item.link.id);
      }

      // Recurse into items array
      if (item.items) {
        extractDocIdsFromSidebar(item.items, docIds);
      }
    }
  }

  return docIds;
}

/**
 * Get document IDs from sidebar file
 */
function getDocIdsFromSidebar(category, subcategory) {
  let sidebarPath;

  if (SINGLE_SIDEBAR_CATEGORIES.includes(category)) {
    // Single sidebar file (e.g., jaas.js, tech-partner.js)
    sidebarPath = path.join(SIDEBARS_DIR, `${category}.js`);
  } else {
    // Separate docs/reference sidebar
    sidebarPath = path.join(SIDEBARS_DIR, category, `${subcategory}.js`);
  }

  if (!fs.existsSync(sidebarPath)) {
    return null;
  }

  try {
    // Clear require cache to ensure fresh load
    delete require.cache[require.resolve(sidebarPath)];

    const sidebarConfig = require(sidebarPath);
    const docIds = extractDocIdsFromSidebar(sidebarConfig);

    return docIds;
  } catch (error) {
    console.error(`Error loading sidebar: ${sidebarPath}`);
    console.error(error.message);
    return null;
  }
}

/**
 * Extract frontmatter id from file content
 */
function extractFrontmatterId(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Check if file starts with frontmatter delimiter
    if (!content.startsWith('---')) {
      return null;
    }

    // Find the closing delimiter
    const endDelimiterIndex = content.indexOf('\n---', 3);
    if (endDelimiterIndex === -1) {
      return null;
    }

    // Extract frontmatter content
    const frontmatter = content.substring(3, endDelimiterIndex);

    // Parse the id field (simple parsing for "id: value" format)
    const idMatch = frontmatter.match(/^id:\s*(.+)$/m);
    if (idMatch) {
      return idMatch[1].trim();
    }

    return null;
  } catch (error) {
    // If file can't be read, return null
    return null;
  }
}

/**
 * Get all documentation files from filesystem
 * Returns an object with document IDs, slug mismatch information, and file type mapping
 */
function getDocsFromFilesystem(category, subcategory) {
  let docsPath;

  if (SINGLE_SIDEBAR_CATEGORIES.includes(category)) {
    // For single sidebar categories, look in docs subdirectory
    docsPath = path.join(DOCS_DIR, category, 'docs');
  } else {
    docsPath = path.join(DOCS_DIR, category, subcategory);
  }

  if (!fs.existsSync(docsPath)) {
    return { files: new Set(), slugMismatches: [], fileTypeMap: new Map() };
  }

  const files = new Set();
  const slugMismatches = [];
  const fileTypeMap = new Map(); // Maps docId to file type ('API', 'INFO', or null)

  function scanDirectory(dirPath, relativePath = '') {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relPath = relativePath
        ? path.join(relativePath, entry.name)
        : entry.name;

      if (entry.isDirectory()) {
        // Skip images and other non-doc directories
        if (entry.name !== 'images' && !entry.name.startsWith('.')) {
          scanDirectory(fullPath, relPath);
        }
      } else if (entry.isFile()) {
        // Include .md and .mdx files (including .api.mdx, .info.mdx)
        if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
          // Generate filename-based ID (for comparison)
          let docPath = relPath
            .replace(/\.(api|info)\.mdx$/, '')
            .replace(/\.(md|mdx)$/, '');
          const filenameBasedId = docPath;

          // Detect file type based on extension
          let fileType = null;
          if (
            entry.name.endsWith('.api.mdx') ||
            entry.name.endsWith('.api.md')
          ) {
            fileType = 'API';
          } else if (
            entry.name.endsWith('.info.mdx') ||
            entry.name.endsWith('.info.md')
          ) {
            fileType = 'INFO';
          }

          // Try to extract frontmatter id
          const frontmatterId = extractFrontmatterId(fullPath);

          // Use frontmatter id if available, otherwise use filename
          const actualDocPath = frontmatterId || filenameBasedId;

          const docId = path.join(
            category,
            SINGLE_SIDEBAR_CATEGORIES.includes(category) ? 'docs' : subcategory,
            actualDocPath,
          );

          files.add(docId);

          // Store file type for this docId
          fileTypeMap.set(docId, fileType);

          // Track mismatch if frontmatter id differs from filename
          if (frontmatterId && frontmatterId !== filenameBasedId) {
            slugMismatches.push({
              filename: entry.name,
              filenamePath: relPath,
              frontmatterId: frontmatterId,
              fullPath: fullPath,
              fileType: fileType,
            });
          }
        }
      }
    }
  }

  scanDirectory(docsPath);
  return { files, slugMismatches, fileTypeMap };
}

/**
 * Get all documentation files from filesystem across all subcategories in a category
 * This is needed for redirect-link detection across subcategories
 */
function getAllDocsInCategory(category) {
  const allDocs = new Set();
  const allFileTypeMap = new Map();

  // Get all subcategories for this category
  const subcategories = getSubcategoriesToValidate(category, null);

  for (const subcat of subcategories) {
    const { files, fileTypeMap } = getDocsFromFilesystem(category, subcat);
    for (const docId of files) {
      allDocs.add(docId);
      const fileType = fileTypeMap.get(docId);
      if (fileType) {
        allFileTypeMap.set(docId, fileType);
      }
    }
  }

  return { files: allDocs, fileTypeMap: allFileTypeMap };
}

/**
 * Validate a single category/subcategory combination
 */
function validateCategorySubcategory(
  category,
  subcategory,
  redirects = new Map(),
  allCategoryDocs = null,
) {
  const sidebarDocIds = getDocIdsFromSidebar(category, subcategory);

  if (sidebarDocIds === null) {
    return {
      category,
      subcategory,
      skipped: true,
      reason: 'Sidebar file not found or error loading',
    };
  }

  const {
    files: filesystemDocs,
    slugMismatches,
    fileTypeMap,
  } = getDocsFromFilesystem(category, subcategory);

  // Use category-wide docs for redirect-link detection (if provided)
  const categoryDocs = allCategoryDocs || {
    files: filesystemDocs,
    fileTypeMap: fileTypeMap,
  };

  // Track redirect-linked files (sidebar -> redirect -> file)
  const redirectLinkedFiles = [];

  // Track cross-subcategory references (sidebar references file in different subcategory)
  const crossSubcategoryRefs = [];

  // Find docs in sidebar but missing from filesystem
  const missingFiles = new Set();
  const missingButRedirected = new Set();

  for (const docId of sidebarDocIds) {
    if (!filesystemDocs.has(docId)) {
      // Check if this file exists in another subcategory of the same category
      if (categoryDocs.files.has(docId)) {
        // This is a cross-subcategory reference (e.g., reference sidebar links to docs file)
        crossSubcategoryRefs.push(docId);
        continue;
      }

      // Check if this sidebar reference has a redirect to an existing file (anywhere in category)
      const redirectTarget = redirects.get(docId);
      if (redirectTarget && categoryDocs.files.has(redirectTarget)) {
        // This is a redirect-linked file: sidebar -> redirect -> existing file
        redirectLinkedFiles.push({
          sidebarPath: docId,
          filePath: redirectTarget,
        });
      } else {
        // Check if any redirect points TO this missing file (for future pages)
        let isRedirectTarget = false;
        for (const [from, to] of redirects.entries()) {
          if (to === docId) {
            isRedirectTarget = true;
            break;
          }
        }

        if (isRedirectTarget) {
          missingButRedirected.add(docId);
        } else {
          missingFiles.add(docId);
        }
      }
    }
  }

  // Build a set of all redirect-linked file paths for quick lookup
  const redirectLinkedFilePaths = new Set();
  for (const link of redirectLinkedFiles) {
    redirectLinkedFilePaths.add(link.filePath);
  }

  // Find docs in filesystem but not in sidebar
  const orphanedFiles = new Set();
  const redirectSourceFiles = new Set();

  for (const docId of filesystemDocs) {
    if (!sidebarDocIds.has(docId)) {
      // Check if this file is a redirect-linked target from ANY sidebar in this category
      // Look for any redirect FROM any path TO this docId
      let isRedirectTargetInCategory = false;
      for (const [from, to] of redirects.entries()) {
        if (to === docId && from.startsWith(`${category}/`)) {
          // This file is a redirect target from somewhere in this category
          isRedirectTargetInCategory = true;
          break;
        }
      }

      if (isRedirectTargetInCategory) {
        // Skip - this file is intentionally not in this sidebar because it's
        // referenced from another sidebar in the same category via redirect
        continue;
      }

      // Check if this file is a redirect source (intentionally not in sidebar)
      if (redirects.has(docId)) {
        redirectSourceFiles.add(docId);
      } else {
        orphanedFiles.add(docId);
      }
    }
  }

  return {
    category,
    subcategory,
    sidebarCount: sidebarDocIds.size,
    filesystemCount: filesystemDocs.size,
    missingFiles: Array.from(missingFiles).sort(),
    orphanedFiles: Array.from(orphanedFiles).sort(),
    redirectSourceFiles: Array.from(redirectSourceFiles).sort(),
    missingButRedirected: Array.from(missingButRedirected).sort(),
    redirectLinkedFiles: redirectLinkedFiles,
    crossSubcategoryRefs: crossSubcategoryRefs.sort(),
    slugMismatches: slugMismatches,
    fileTypeMap: fileTypeMap,
    // Only missing files are errors (will cause CI/CD to fail)
    // Orphaned files are warnings (won't fail CI/CD)
    hasErrors: missingFiles.size > 0,
    hasWarnings: orphanedFiles.size > 0,
  };
}

/**
 * Format a docId with file type badge if applicable
 */
function formatDocIdWithBadge(docId, fileTypeMap) {
  const fileType = fileTypeMap ? fileTypeMap.get(docId) : null;
  const badge = fileType ? ` [${fileType}]` : '';
  return `${docId}${badge}`;
}

/**
 * Print validation results
 */
function printResults(results) {
  console.log('\n========================================');
  console.log('Sidebar-Documentation Validation Report');
  console.log('========================================\n');

  const allWithErrors = [];
  const allWithWarnings = [];
  const allValid = [];
  const allSkipped = [];

  let totalErrors = 0;
  let totalWarnings = 0;

  for (const result of results) {
    if (result.skipped) {
      allSkipped.push(result);
    } else if (result.hasErrors) {
      allWithErrors.push(result);
      totalErrors += result.missingFiles.length;
    } else if (result.hasWarnings) {
      allWithWarnings.push(result);
      totalWarnings += result.orphanedFiles.length;
    } else {
      allValid.push(result);
    }
  }

  // Print ERRORS (missing files) - will fail CI/CD
  if (allWithErrors.length > 0) {
    console.log('❌ ERRORS (Missing from filesystem):\n');

    for (const result of allWithErrors) {
      console.log(`📁 ${result.category}/${result.subcategory}`);
      console.log(
        `   Sidebar: ${result.sidebarCount} docs | Filesystem: ${result.filesystemCount} files`,
      );

      if (result.missingFiles.length > 0) {
        console.log(
          `\n   ❌ Missing from filesystem (${result.missingFiles.length}):`,
        );
        for (const file of result.missingFiles) {
          console.log(
            `      - ${formatDocIdWithBadge(file, result.fileTypeMap)}`,
          );
        }
      }

      console.log('');
    }
  }

  // Print WARNINGS (orphaned files) - won't fail CI/CD
  if (allWithWarnings.length > 0) {
    console.log('⚠️  WARNINGS (Not in sidebar):\n');

    for (const result of allWithWarnings) {
      console.log(`📁 ${result.category}/${result.subcategory}`);
      console.log(
        `   Sidebar: ${result.sidebarCount} docs | Filesystem: ${result.filesystemCount} files`,
      );

      if (result.orphanedFiles.length > 0) {
        console.log(
          `\n   ⚠️  Not in sidebar (${result.orphanedFiles.length}):`,
        );
        for (const file of result.orphanedFiles) {
          console.log(
            `      - ${formatDocIdWithBadge(file, result.fileTypeMap)}`,
          );
        }
      }

      console.log('');
    }
  }

  // Print INFO (cross-refs, redirects, etc.) - informational only
  const allWithInfo = results.filter(
    r =>
      !r.skipped &&
      (r.missingButRedirected?.length > 0 ||
        r.redirectSourceFiles?.length > 0 ||
        r.redirectLinkedFiles?.length > 0 ||
        r.crossSubcategoryRefs?.length > 0),
  );

  if (allWithInfo.length > 0) {
    console.log('ℹ️  INFO (Redirects & Cross-references):\n');

    for (const result of allWithInfo) {
      const hasInfo =
        (result.missingButRedirected?.length || 0) > 0 ||
        (result.redirectSourceFiles?.length || 0) > 0 ||
        (result.redirectLinkedFiles?.length || 0) > 0 ||
        (result.crossSubcategoryRefs?.length || 0) > 0;

      if (!hasInfo) continue;

      console.log(`📁 ${result.category}/${result.subcategory}`);

      if (result.crossSubcategoryRefs && result.crossSubcategoryRefs.length > 0) {
        console.log(
          `   ℹ️  Cross-subcategory references (${result.crossSubcategoryRefs.length}):`,
        );
        for (const docId of result.crossSubcategoryRefs) {
          console.log(
            `      - ${formatDocIdWithBadge(docId, result.fileTypeMap)}`,
          );
        }
      }

      if (result.missingButRedirected.length > 0) {
        console.log(
          `   ℹ️  Redirect targets (${result.missingButRedirected.length}):`,
        );
        for (const file of result.missingButRedirected) {
          console.log(
            `      - ${formatDocIdWithBadge(file, result.fileTypeMap)}`,
          );
        }
      }

      if (result.redirectSourceFiles.length > 0) {
        console.log(
          `   ℹ️  Redirect sources (${result.redirectSourceFiles.length}):`,
        );
        for (const file of result.redirectSourceFiles) {
          console.log(
            `      - ${formatDocIdWithBadge(file, result.fileTypeMap)}`,
          );
        }
      }

      if (result.redirectLinkedFiles && result.redirectLinkedFiles.length > 0) {
        console.log(
          `   ℹ️  Redirect-linked (${result.redirectLinkedFiles.length}):`,
        );
        for (const link of result.redirectLinkedFiles) {
          console.log(
            `      ${link.sidebarPath} → ${formatDocIdWithBadge(link.filePath, result.fileTypeMap)}`,
          );
        }
      }

      console.log('');
    }
  }

  // Print valid ones
  if (allValid.length > 0) {
    console.log('✅ VALID:\n');
    for (const result of allValid) {
      console.log(
        `   ${result.category}/${result.subcategory} (${result.sidebarCount} docs)`,
      );
    }
    console.log('');
  }

  // Print skipped ones
  if (allSkipped.length > 0) {
    console.log('⏭️  SKIPPED:\n');
    for (const result of allSkipped) {
      console.log(
        `   ${result.category}/${result.subcategory} - ${result.reason}`,
      );
    }
    console.log('');
  }

  // Print slug mismatches (frontmatter id ≠ filename)
  const allWithSlugMismatches = results.filter(
    r => !r.skipped && r.slugMismatches && r.slugMismatches.length > 0,
  );
  let totalSlugMismatches = 0;

  if (allWithSlugMismatches.length > 0) {
    console.log('📝 SLUG MISMATCHES (Frontmatter ID ≠ Filename):\n');

    for (const result of allWithSlugMismatches) {
      console.log(`📁 ${result.category}/${result.subcategory}`);

      for (const mismatch of result.slugMismatches) {
        const badge = mismatch.fileType ? ` [${mismatch.fileType}]` : '';
        console.log(
          `   - ${mismatch.filename}${badge} → id: ${mismatch.frontmatterId}`,
        );
        totalSlugMismatches++;
      }

      console.log('');
    }
  }

  // Count redirect-related items and cross-subcategory refs
  let totalRedirectSources = 0;
  let totalRedirectTargets = 0;
  let totalRedirectLinked = 0;
  let totalCrossSubcategoryRefs = 0;
  for (const result of results) {
    if (!result.skipped) {
      totalRedirectSources += (result.redirectSourceFiles || []).length;
      totalRedirectTargets += (result.missingButRedirected || []).length;
      totalRedirectLinked += (result.redirectLinkedFiles || []).length;
      totalCrossSubcategoryRefs += (result.crossSubcategoryRefs || []).length;
    }
  }

  // Summary
  console.log('========================================');
  console.log('SUMMARY');
  console.log('========================================');
  const totalValidated = allValid.length + allWithErrors.length + allWithWarnings.length;
  console.log(`Total validated: ${totalValidated}`);
  console.log(`Valid: ${allValid.length}`);
  console.log(`With errors: ${allWithErrors.length}`);
  console.log(`With warnings: ${allWithWarnings.length}`);
  console.log(`Skipped: ${allSkipped.length}`);
  console.log('');
  console.log(`❌ Errors: ${totalErrors} (missing files)`);
  console.log(`⚠️  Warnings: ${totalWarnings} (orphaned files)`);
  console.log(`ℹ️  Info: ${totalRedirectSources + totalRedirectTargets + totalRedirectLinked + totalCrossSubcategoryRefs}`);
  console.log(`   - Redirect sources: ${totalRedirectSources}`);
  console.log(`   - Redirect targets: ${totalRedirectTargets}`);
  console.log(`   - Redirect-linked: ${totalRedirectLinked}`);
  console.log(`   - Cross-subcategory refs: ${totalCrossSubcategoryRefs}`);
  console.log(`   - Slug mismatches: ${totalSlugMismatches}`);
  console.log('');

  // CI/CD Status
  console.log('========================================');
  if (totalErrors > 0) {
    console.log('CI/CD Status: ❌ FAIL (errors found)');
  } else {
    console.log('CI/CD Status: ✅ PASS (no errors)');
  }
  console.log('========================================');
  console.log('');

  // Return true only if no errors (warnings are acceptable)
  return totalErrors === 0;
}

/**
 * Main function
 */
function main() {
  const { category, subcategory } = parseArguments();

  console.log('Validating sidebar configuration...');
  if (category) {
    console.log(`Category: ${category}`);
  } else {
    console.log('Category: All');
  }

  if (subcategory) {
    console.log(`Subcategory: ${subcategory}`);
  } else {
    console.log('Subcategory: All available');
  }

  // Load redirect configurations
  const redirects = loadRedirects();
  console.log(`Loaded ${redirects.size} redirect configurations\n`);

  const categoriesToValidate = getCategoriesToValidate(category);
  const results = [];

  for (const cat of categoriesToValidate) {
    // Get all docs in category for redirect-link detection across subcategories
    const allCategoryDocs = getAllDocsInCategory(cat);

    const subcategoriesToValidate = getSubcategoriesToValidate(
      cat,
      subcategory,
    );

    for (const subcat of subcategoriesToValidate) {
      const result = validateCategorySubcategory(
        cat,
        subcat,
        redirects,
        allCategoryDocs,
      );
      results.push(result);
    }
  }

  const noErrors = printResults(results);

  // Exit with code 1 only if there are errors (missing files)
  // Warnings (orphaned files) don't fail the build
  process.exit(noErrors ? 0 : 1);
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  validateCategorySubcategory,
  extractDocIdsFromSidebar,
};
