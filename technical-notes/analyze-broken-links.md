# Broken Links Analysis Script

A build-time validation tool that analyzes and reports broken internal links and anchors in the documentation.

## Overview

The `yarn analyze-links` script runs the production build process and parses its output to identify:

1. **Broken links** - Internal documentation links that point to non-existent pages
2. **Broken anchors** - Links to heading anchors that don't exist on their target pages

The script provides a structured report showing which links are broken, how many times each broken link appears, and which source pages contain them.

## Usage

```bash
yarn analyze-links
```

**What it does:**

1. Runs `yarn build` to trigger Docusaurus validation
2. Captures build output containing broken link/anchor information
3. Parses the "Exhaustive list of all broken links found:" section
4. Parses the "Exhaustive list of all broken anchors found:" section
5. Filters results based on configured ignore lists
6. Aggregates findings by target URL with occurrence counts
7. Generates a formatted report

## Configuration

The script includes three configurable arrays at the top of `scripts/analyze-broken-links.js`:

### `IGNORE_BROKEN_LINKS`

Links to ignore from the broken links report.

**Default value:**
```javascript
const IGNORE_BROKEN_LINKS = [
  '/contactcenter/reference'
];
```

**Use case:** When certain links are broken due to known issues (e.g., reference documentation not yet generated, deprecated sections), add them here to reduce noise in reports.

**Example:**
```javascript
const IGNORE_BROKEN_LINKS = [
  '/contactcenter/reference',
  '/deprecated/old-api',
  '/external/third-party'
];
```

### `IGNORE_BROKEN_LINK_ANCHORS`

Anchor links (with `#`) to ignore from the broken anchors report.

**Default value:**
```javascript
const IGNORE_BROKEN_LINK_ANCHORS = [];
```

**Use case:** When specific anchors are dynamically generated or known to be false positives.

**Example:**
```javascript
const IGNORE_BROKEN_LINK_ANCHORS = [
  '#legacy-section',
  '/docs/api-reference#deprecated-endpoint',
  '#dynamically-generated'
];
```

### `IGNORE_BROKEN_PAGES`

Source pages whose broken links should be completely ignored.

**Default value:**
```javascript
const IGNORE_BROKEN_PAGES = [];
```

**Use case:** When entire pages are drafts, deprecated, or pending removal, ignore all broken links originating from them.

**Example:**
```javascript
const IGNORE_BROKEN_PAGES = [
  '/draft/work-in-progress',
  '/deprecated/old-guide',
  '/pr-25/test/experimental'
];
```

## Output Format

The script generates a structured report grouped by source page, showing all broken links and anchors for each page:

### Example Output

```
═══════════════════════════════════════════════════════════════════════════════
# Report on links
═══════════════════════════════════════════════════════════════════════════════

## Pages with broken links

  /pr-25/connect/docs/api-rate-limiting (5 issues)
    - /pr-25/connect/reference/send-sms-batch (broken link)
    - /pr-25/connect/reference/verify-number (broken link)
    - /pr-25/analytics/docs/work-analytics-historical-cdr-process#pagination (broken anchor)
    - #example-heading (broken anchor)
    - #rate-limits (broken anchor)

  /pr-25/connect/docs/tutorial-batch-sms (3 issues)
    - /pr-25/connect/reference/send-sms-batch (broken link)
    - /pr-25/connect/reference/sms-status (broken link)
    - /pr-25/connect/docs/delivery-receipts#webhook (broken anchor)

  /pr-25/connect/docs/advanced-ivr (2 issues)
    - /pr-25/connect/reference/makecall-1 (broken link)
    - /pr-25/actions-events/docs/cc-managing-agent-status#status-values (broken anchor)

═══════════════════════════════════════════════════════════════════════════════

📈 Summary:
   Pages with broken links: 3
   Total broken links: 5
   Total broken anchors: 5
   Total issues: 10

💡 To ignore specific links, edit the configuration arrays at the top of scripts/analyze-broken-links.js
```

### Report Structure

**Pages with Broken Links Section:**
```
  <source-page> (<count> issues)
    - <broken-target-1> (broken link)
    - <broken-target-2#anchor> (broken anchor)
    - <broken-target-3> (broken link)
```

**Key features:**
- Results grouped by source page (where issues occur)
- Pages sorted by issue count (most problematic pages first)
- Both broken links and broken anchors unified in a single list per page
- Each broken target labeled with its type: "(broken link)" or "(broken anchor)"
- Broken targets sorted alphabetically within each page for consistency
- Summary statistics at the end

## When to Use

### During Development

Run this script to understand the scope of broken link issues in your branch:

```bash
yarn analyze-links
```

### Before Committing

Use alongside `yarn build` to validate documentation integrity:

```bash
yarn build
yarn analyze-links
```

### In Code Review

Generate reports to communicate which broken links were fixed or introduced:

```bash
# After fixes
yarn analyze-links > broken-links-report.txt
```

### CI/CD Integration

Add to automated workflows to prevent broken links from being merged:

```bash
# In your CI pipeline - will fail the build if broken links are found
yarn analyze-links
```

**GitHub Actions example:**

```yaml
- name: Check for broken links
  run: yarn analyze-links
```

**Managing known issues in CI:**

If you have known broken links that you're actively working to fix but don't want to block all PRs, use the ignore lists in `scripts/analyze-broken-links.js`:

```javascript
const IGNORE_BROKEN_LINKS = [
  '/legacy/deprecated-api',
  '/work-in-progress/new-feature'
];
```

This allows you to:
- Prevent NEW broken links from being introduced
- Track existing issues without blocking development
- Gradually reduce the ignore list as issues are fixed

## Common Workflows

### Identifying High-Impact Pages

The report sorts pages by issue count, so the first items are the most important to fix:

```bash
yarn analyze-links | head -n 30
```

### Filtering Results

Use the ignore lists to focus on specific categories:

1. Edit `scripts/analyze-broken-links.js`
2. Add patterns to relevant ignore arrays
3. Run `yarn analyze-links` again

### Fixing Broken Links and Anchors

For each page with issues in the report:

1. **Open the source page** (shown as the main entry)
2. **Review each broken link/anchor** listed under that page
3. **For broken links:**
   - Find the target page it's trying to link to
   - Update the link to the correct path
4. **For broken anchors:**
   - Check if the heading exists on the target page
   - Verify the anchor syntax (Docusaurus auto-generates anchors from headings)
   - Update the link if the heading was renamed or moved
   - Create the heading if it's missing
5. **Verify the fix** with `yarn build`

## Technical Details

### How It Works

1. **Build execution:** Spawns `yarn build` as a child process
2. **Output capture:** Collects all stdout and stderr output
3. **Section extraction:** Uses regex to find "Exhaustive list" sections
4. **Line parsing:** Processes each line to extract source/target pairs
5. **Type tagging:** Adds type indicators (broken link vs broken anchor)
6. **Filtering:** Applies ignore list rules
7. **Aggregation:** Groups by source page and collects all broken targets
8. **Reporting:** Formats and prints structured output

### Parsing Logic

**Broken Links Pattern:**
```
- Broken link on source page path = /source/page:
   -> linking to /target/page
   -> linking to /another/target
```

**Broken Anchors Pattern:**
```
- Broken anchor on source page path = /source/page:
   -> linking to /target/page#heading
   -> linking to #local-heading (resolved as: /source/page#local-heading)
```

The script handles:
- Multiple targets per source page (unified in a single list)
- Both broken links and broken anchors (tagged with type indicators)
- Resolved relative links (shown in parentheses in build output)
- Email addresses and external URLs reported as broken internal links

### Exit Codes

- **Exit code 0:** No broken links or anchors found (after applying ignore filters)
- **Exit code 1:** Broken links or anchors detected, or build process failed to start

The script will exit with a failure code when any issues remain after filtering, making it suitable for CI/CD pipelines to prevent broken links from being merged.

## Limitations

### Known Edge Cases

1. **Email links:** Email addresses like `support@8x8.com` may appear as broken links (they're incorrectly resolved as internal paths)
2. **External URLs:** Some external URLs may be reported if Docusaurus can't resolve them
3. **Dynamic anchors:** Anchors generated by custom components may not be detected
4. **Relative links:** Some relative link edge cases may not resolve correctly

### Script Boundaries

This script:
- ✅ Reports broken internal documentation links
- ✅ Reports broken heading anchors
- ✅ Groups issues by source page for easier fixing
- ✅ Unifies broken links and anchors in a single report per page
- ✅ Aggregates and filters results
- ✅ Fails with exit code 1 when issues are found (suitable for CI/CD)
- ❌ Does not fix broken links automatically
- ❌ Does not validate external links

## Related Documentation

- [Development Scripts](development-scripts.md) - Overview of all development scripts
- [Sidebar Validation](sidebar-validation.md) - Validating sidebar configuration
- [Docusaurus Link Documentation](https://docusaurus.io/docs/markdown-features/links) - Official Docusaurus link syntax

## Troubleshooting

### Script doesn't run

**Symptom:** `yarn analyze-links` command not found

**Solution:**
```bash
yarn install  # Ensure dependencies installed
node scripts/analyze-broken-links.js  # Run directly
```

### No output generated

**Symptom:** Script runs but produces no report

**Solution:** Check if the build output contains the expected sections:
```bash
yarn build 2>&1 | grep -A 5 "Exhaustive list"
```

### Too many false positives

**Symptom:** Report shows many broken links that are actually valid

**Solution:**
1. Verify the links are truly broken with `yarn build`
2. Add patterns to ignore lists if they're known issues
3. Check if external URLs are being reported incorrectly

### Memory issues on large builds

**Symptom:** Script crashes with out-of-memory errors

**Solution:**
```bash
NODE_OPTIONS="--max-old-space-size=4096" yarn analyze-links
```
