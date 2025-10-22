# Sidebar Validation

The sidebar validation script ensures consistency between sidebar configurations and actual documentation files in the repository. It identifies missing files, orphaned content, and cross-references, helping maintain documentation integrity.

## Overview

The validation script performs comprehensive checking with **three severity levels**:

1. **❌ ERROR** - Missing files (exit code 1): Pages referenced in sidebar but don't exist in filesystem - will **fail CI/CD**
2. **⚠️ WARNING** - Orphaned files (exit code 0): Files that exist but aren't in any sidebar - **won't fail CI/CD**
3. **ℹ️ INFO** - Cross-references & redirects (exit code 0): Informational items like cross-subcategory references - **won't fail CI/CD**

This severity-based approach ensures CI/CD pipelines only fail for critical issues (broken references) while still tracking content that should be addressed (orphaned files) and providing visibility into special cases (cross-references).

## Quick Start

```bash
# Validate all categories and subcategories
yarn validate:sidebar

# Validate specific category
yarn validate:sidebar analytics

# Validate specific category and subcategory
yarn validate:sidebar analytics reference
```

## Usage

### Basic Syntax

```bash
yarn validate:sidebar [category] [subcategory]
```

**Parameters:**
- `[category]` - Optional: Documentation category folder name (e.g., `analytics`, `actions-events`, `connect`)
- `[subcategory]` - Optional: Either `docs` or `reference`

### Usage Examples

**Validate everything:**
```bash
yarn validate:sidebar
```
Checks all categories (`actions-events`, `analytics`, `connect`, `contactcenter`, `jaas`, `tech-partner`) and all their subcategories.

**Validate specific category:**
```bash
yarn validate:sidebar connect
```
Checks both `docs` and `reference` subcategories within the `connect` category (if they exist).

**Validate specific subcategory:**
```bash
yarn validate:sidebar analytics reference
```
Checks only the `reference` subcategory within the `analytics` category.

**Alternative syntax (with `docs/` prefix):**
```bash
yarn validate:sidebar docs/analytics reference
```
The script automatically handles the `docs/` prefix.

## Understanding the Output

The validation report is organized by severity level, making it easy to identify what needs immediate attention versus what can be addressed later.

### ❌ ERRORS (Missing from filesystem)

**Severity:** Critical - Will fail CI/CD (exit code 1)

Files referenced in sidebar configuration that don't exist in the filesystem. These are broken links that will cause build failures and must be fixed immediately.

```
❌ ERRORS (Missing from filesystem):

📁 connect/docs
   Sidebar: 45 docs | Filesystem: 44 files

   ❌ Missing from filesystem (1):
      - connect/docs/deleted-feature-guide
```

**Action Required:** Add the missing file or remove the reference from the sidebar.

### ⚠️ WARNINGS (Not in sidebar)

**Severity:** Warning - Won't fail CI/CD (exit code 0)

Documentation files that exist but aren't referenced in any sidebar. These files are inaccessible through navigation and should be added to a sidebar or removed.

```
⚠️  WARNINGS (Not in sidebar):

📁 analytics/docs
   Sidebar: 23 docs | Filesystem: 24 files

   ⚠️  Not in sidebar (1):
      - analytics/docs/wa-ring-group-summary
```

**Action Recommended:** Add these files to the appropriate sidebar or remove them if no longer needed.

### ℹ️ INFO (Redirects & Cross-references)

**Severity:** Informational - Won't fail CI/CD (exit code 0)

Special cases that are tracked for visibility but don't require action. Includes:

- **Cross-subcategory references:** Sidebar references files in a different subcategory
- **Redirect sources:** Files that redirect elsewhere (intentionally not in sidebar)
- **Redirect targets:** Future pages that redirects point to
- **Redirect-linked:** Sidebar entries that use redirects to reach actual files

```
ℹ️  INFO (Redirects & Cross-references):

📁 connect/reference
   ℹ️  Cross-subcategory references (58):
      - connect/docs/api-error-codes
      - connect/docs/call-action-handling
      - connect/docs/delivery-error-codes
      ...

   ℹ️  Redirect sources (3):
      - connect/reference/old-api-name [API]

   ℹ️  Redirect-linked (2):
      - connect/reference/legacy-endpoint → connect/reference/new-endpoint [API]
```

**No Action Required:** These are informational and indicate the script correctly detected special configurations.

### ✅ VALID

Categories/subcategories with perfect alignment between sidebar and filesystem:

```
✅ VALID:

   analytics/docs (23 docs)
   contactcenter/docs (10 docs)
   jaas/docs (15 docs)
```

### File Type Badges

Files may include badges indicating their type:
- `[API]` - OpenAPI-generated API reference page (`.api.mdx`)
- `[INFO]` - OpenAPI-generated info page (`.info.mdx`)
- No badge - Regular markdown documentation (`.md` or `.mdx`)

These badges appear in all validation sections to help identify what type of content has issues.

### Redirect Awareness

The validation script is redirect-aware and distinguishes between three types of redirect-related patterns:

**1. Redirect-Linked Files:**

```
ℹ️  Redirect-linked files (10):
   sidebar: connect/reference/api-error-codes → file: connect/docs/api-error-codes [REDIRECT-LINKED]
   sidebar: connect/reference/security → file: connect/docs/security [REDIRECT-LINKED]
```

Files marked with `[REDIRECT-LINKED]` represent a valid pattern where:
- The **sidebar** references an old path (e.g., `connect/reference/X`)
- A **redirect** maps from the old path to a new path (e.g., `connect/docs/X`)
- The **file** exists at the new path

This pattern maintains backward compatibility with old URLs while files have moved to new locations. The sidebar intentionally uses the old path, relying on client-side redirects to send users to the correct file location. This is **not an error** - it's a deliberate architectural choice.

**2. Redirect Source Files:**

```
ℹ️  Not in sidebar (redirect sources - 2):
   - actions-events/reference/getmessagesusingget_1 [API] [REDIRECT]
```

Files marked with `[REDIRECT]` badge are not in the sidebar because they serve as redirect sources for renamed files. These files redirect users to new locations and are intentionally excluded from navigation. This is expected behavior and not an issue.

**3. Redirect Target Files:**

```
ℹ️  Missing but redirect target (1):
   - analytics/reference/authentication-1 [REDIRECT TARGET]
```

Files marked with `[REDIRECT TARGET]` badge are referenced in sidebar but don't exist yet. However, they are valid redirect targets (users are being redirected TO these paths). This indicates planned documentation that hasn't been created yet.

**How it works:**

The script loads redirect configurations from `docusaurus/redirects.js` and cross-references them during validation:
- **Redirect-linked detection**: When a sidebar path has a redirect to an existing file, both are recognized as intentionally linked
- **Orphaned files filtering**: Files are checked against redirect sources - if a file is a redirect source or redirect target, it's not truly orphaned
- **Missing files filtering**: Files are checked against redirect targets - if a file is a redirect destination for a sidebar path, it's tracked as redirect-linked

This reduces false positives and helps distinguish intentional structure from actual issues.

### Slug Mismatches

The script also reports when a file's frontmatter `id` differs from its filename:

```
📝 SLUG MISMATCHES (Frontmatter ID ≠ Filename):

📁 actions-events/reference
   - getmessagesusingget-1.api.mdx [API] → id: getmessagesusingget_1
```

**What this means:**
- The file is named `getmessagesusingget-1.api.mdx` (with a dash)
- But its frontmatter contains `id: getmessagesusingget_1` (with an underscore)
- Docusaurus uses the frontmatter `id`, not the filename

**Why it matters:**
- Sidebar references must use the frontmatter `id`, not the filename
- This helps identify auto-generated files where naming conventions differ
- Useful for maintaining consistency across the codebase

**Note:** Slug mismatches are informational only and don't cause validation to fail. They help you understand the relationship between filenames and document IDs.

### Summary Section

```
========================================
SUMMARY
========================================
Total validated: 7
Valid: 2
With errors: 1
With warnings: 4
Skipped: 0

❌ Errors: 2 (missing files)
⚠️  Warnings: 15 (orphaned files)
ℹ️  Info: 71
   - Redirect sources: 2
   - Redirect targets: 1
   - Redirect-linked: 10
   - Cross-subcategory refs: 58
   - Slug mismatches: 0

========================================
CI/CD Status: ❌ FAIL (errors found)
========================================
```

The summary provides a clear breakdown by severity level:

**Errors (❌):**
- Missing files that will cause broken links
- **Impact:** Will fail CI/CD builds
- **Action:** Must be fixed before merge

**Warnings (⚠️):**
- Orphaned files not accessible through navigation
- **Impact:** Won't fail CI/CD builds
- **Action:** Should be addressed but not blocking

**Info (ℹ️):**
- Cross-subcategory references
- Redirect sources, targets, and links
- Slug mismatches
- **Impact:** Informational only
- **Action:** No action required

**CI/CD Status:**
- ✅ PASS (no errors) - Pipeline continues
- ❌ FAIL (errors found) - Pipeline fails

**Exit codes:**
- `0` - No errors (warnings and info are acceptable)
- `1` - Errors detected (missing files found)

## Category Structure

### Categories with Separate Sidebars

These categories have both `docs` and `reference` subcategories:
- `actions-events`
- `analytics`
- `connect`
- `contactcenter`

**Sidebar locations:**
- `docusaurus/sidebars/{category}/docs.js`
- `docusaurus/sidebars/{category}/reference.js`

### Categories with Single Sidebar

These categories use a single sidebar file:
- `jaas` → `docusaurus/sidebars/jaas.js`
- `tech-partner` → `docusaurus/sidebars/tech-partner.js`

Content is located in `docs/{category}/docs/`

## Common Issues and Solutions

### Issue: File Referenced in Sidebar Not Found

**Error:**
```
⚠️  Missing from filesystem (1):
   - analytics/docs/some-guide
```

**Possible causes:**
1. File was deleted but sidebar reference remains
2. File was renamed but sidebar wasn't updated
3. Typo in sidebar configuration

**Solutions:**
1. **If file should exist**: Restore the file at the correct location
   ```bash
   # Check git history
   git log --all --full-history -- "docs/analytics/docs/some-guide.md"
   ```

2. **If file shouldn't exist**: Remove from sidebar
   ```javascript
   // In docusaurus/sidebars/analytics/docs.js
   // Remove or comment out the reference
   // 'analytics/docs/some-guide',
   ```

### Issue: File Exists But Not in Sidebar

**Error:**
```
⚠️  Not in sidebar (1):
   - connect/docs/guide-whatsapp
```

**Possible causes:**
1. New file created but not added to sidebar
2. File copied from elsewhere but sidebar not updated
3. Orphaned content from refactoring

**Solutions:**
1. **If file should be accessible**: Add to appropriate sidebar
   ```javascript
   // In docusaurus/sidebars/connect/docs.js
   {
     type: 'category',
     label: 'Messaging Guides',
     items: [
       'connect/docs/guide-whatsapp',  // Add here
       // ... other guides
     ],
   }
   ```

2. **If file is obsolete**: Delete the file
   ```bash
   rm docs/connect/docs/guide-whatsapp.md
   ```

### Issue: File Extension Mismatch

The script handles multiple file extensions automatically:
- `.md`
- `.mdx`
- `.api.mdx` (API reference files)
- `.info.mdx` (Info files)

If you see mismatches, ensure your file has the correct extension and sidebar ID matches the filename without extensions.

## Integration with Development Workflow

### Before Committing Changes

Always validate before committing documentation changes:

```bash
# Make documentation changes
# ...

# Validate sidebar consistency
yarn validate:sidebar

# If issues found, fix them before committing
git add .
git commit -m "Update documentation"
```

### After Adding New Documentation

When creating new documentation files:

1. Create the markdown file:
   ```bash
   # Example
   touch docs/analytics/docs/new-feature-guide.md
   ```

2. Add content to the file

3. Add reference to sidebar:
   ```javascript
   // In docusaurus/sidebars/analytics/docs.js
   'analytics/docs/new-feature-guide',
   ```

4. Validate:
   ```bash
   yarn validate:sidebar analytics docs
   ```

### During Refactoring

When reorganizing documentation:

1. Move or rename files
2. Update all sidebar references
3. Run full validation:
   ```bash
   yarn validate:sidebar
   ```
4. Fix any reported issues before committing

### CI/CD Integration

The script is designed for CI/CD integration with severity-based exit codes:

```yaml
# Example GitHub Actions workflow
- name: Validate sidebar configuration
  run: yarn validate:sidebar
```

**Exit code behavior:**
- **Exit 0 (Pass):** No errors found
  - ✅ All sidebars valid
  - ✅ Only warnings (orphaned files)
  - ✅ Only info (cross-refs, redirects)
  - Pipeline continues normally

- **Exit 1 (Fail):** Errors detected
  - ❌ Missing files found (broken sidebar references)
  - Pipeline fails and blocks merge
  - Must be fixed before deployment

**What this means for your CI/CD:**
- Broken links (ERROR) **will fail** your build
- Orphaned files (WARNING) **won't fail** your build
- Cross-references (INFO) **won't fail** your build

This ensures production deployments don't have broken documentation links while allowing you to track and address orphaned content at your own pace.

## Technical Details

### How It Works

1. **Sidebar scanning**: Recursively parses sidebar JavaScript files to extract all document IDs
2. **Filesystem scanning**: Walks the documentation directories to find all `.md` and `.mdx` files
3. **Comparison**: Cross-references both sets to identify inconsistencies
4. **Reporting**: Generates detailed output organized by category

### File Location Mapping

The script maps sidebar IDs to filesystem paths:

| Sidebar ID | Filesystem Path |
|-----------|----------------|
| `analytics/docs/introduction` | `docs/analytics/docs/introduction.md` |
| `connect/reference/send-sms` | `docs/connect/reference/send-sms.api.mdx` |
| `jaas/docs/api-keys` | `docs/jaas/docs/api-keys.md` |

### Excluded Directories

The script automatically skips:
- `images/` directories
- Hidden directories (starting with `.`)
- Non-documentation files

## Related Documentation

- [Development Scripts](development-scripts.md) - Overview of all available scripts
- [Sidebar Deprecation Pattern](sidebar-deprecation-pattern.md) - How to mark deprecated content in sidebars

## Script Location

The validation script is located at:
```
scripts/validate-sidebar.js
```

For implementation details or to contribute improvements, refer to the script file directly.
