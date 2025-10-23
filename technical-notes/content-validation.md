# Content Validation Script

An extensible validation tool that enforces content quality standards across all documentation files.

## Overview

The `yarn validate:content` script scans all files in the `docs/` directory and validates them against a configurable set of content rules. This ensures documentation consistency, prevents legacy patterns from being reintroduced, and maintains high content quality standards.

The script is designed to be extensible - new validation rules can be easily added without modifying the core logic.

## Usage

```bash
yarn validate:content
```

**What it does:**

1. Recursively scans all files in the `docs/` directory
2. Checks each file against all configured validation rules
3. Reports violations grouped by rule type with file paths and line numbers
4. Exits with code 1 if violations found, 0 if all checks pass

## Current Validation Rules

### No ref: links

**Rule name:** `No ref: links`

**Pattern:** `(ref:` or `href="ref:`

**Description:** Files should not contain `ref:` links, which are a legacy format from ReadMe documentation platform. Use standard Docusaurus markdown paths instead.

**Examples of violations:**

```markdown
<!-- Bad - legacy ref: link -->
See [API Reference](ref:send-sms-batch) for details

<!-- Bad - HTML ref: link -->
<a href="ref:authentication">Authentication</a>

<!-- Good - standard Docusaurus path -->
See [API Reference](/connect/reference/send-sms-batch) for details

<!-- Good - relative path -->
See [API Reference](../reference/send-sms-batch) for details
```

**Migration guide:**

1. Identify the target document's actual path in the `docs/` directory
2. Replace `(ref:slug-name)` with the full path: `(/category/docs/document-name)`
3. Or use relative paths: `(../docs/document-name)`

## Configuration

Validation rules are defined in `scripts/validate-content.js` in the `VALIDATION_RULES` array:

```javascript
const VALIDATION_RULES = [
  {
    name: 'No ref: links',
    pattern: /\(ref:|href=["']ref:/gi,
    message: 'Files should not contain ref: links (legacy ReadMe format). Use standard markdown paths instead.',
  },
  // Add more rules here
];
```

### Adding New Validation Rules

To add a new content validation rule:

1. Open `scripts/validate-content.js`
2. Add a new object to the `VALIDATION_RULES` array:

```javascript
{
  name: 'Display name for the rule',
  pattern: /regex-pattern-to-match/gi,
  message: 'Description of what this rule checks and how to fix violations.',
}
```

**Example - Prevent hardcoded production URLs:**

```javascript
{
  name: 'No hardcoded production URLs',
  pattern: /https:\/\/api\.8x8\.com(?!\/oauth)/gi,
  message: 'Files should not contain hardcoded production URLs. Use environment variables or configuration.',
}
```

**Example - Require frontmatter in docs:**

```javascript
{
  name: 'Must have title frontmatter',
  pattern: /^(?!---\ntitle:)/m,
  message: 'All documentation files must start with frontmatter containing a title.',
}
```

**Example - Prevent deprecated syntax:**

```javascript
{
  name: 'No deprecated code blocks',
  pattern: /```language\-/gi,
  message: 'Use standard code fence syntax (```javascript) instead of deprecated language- prefix.',
}
```

## Output Format

### Success Output

When all validations pass:

```
🔍 Validating content in docs/ directory...

✅ All content validation checks passed!
```

### Violation Report

When violations are found:

```
🔍 Validating content in docs/ directory...

════════════════════════════════════════════════════════════════════════════════
# Content Validation Report
════════════════════════════════════════════════════════════════════════════════

## No ref: links
   Files should not contain ref: links (legacy ReadMe format). Use standard markdown paths instead.

   Found 3 violations in 2 files:

   📄 docs/connect/docs/sms-overview.md
      Line 15: See the [Batch API](ref:send-sms-batch) for sending multiple messages
      Line 23: For authentication details, see [OAuth Guide](ref:oauth-guide)

   📄 docs/analytics/docs/api-authentication.md
      Line 8: Check out the <a href="ref:api-keys">API Keys documentation</a>

════════════════════════════════════════════════════════════════════════════════

📈 Summary:
   Total violations: 3
   Rules violated: 1

❌ Content validation failed - please fix the violations above
```

### Report Structure

**Per-Rule Section:**
```
## Rule Name
   Rule description and guidance

   Found X violations in Y files:

   📄 file-path
      Line N: content showing the violation
      Line M: another violation in same file

   📄 another-file-path
      Line P: violation content
```

**Key features:**
- Results grouped by validation rule
- Files sorted alphabetically for consistency
- Exact line numbers for each violation
- Full line content showing the violation context
- Summary statistics at the end

## When to Use

### During Development

Run before committing changes to ensure content quality:

```bash
yarn validate:content
```

### Before Committing

Use alongside `yarn build` to validate all aspects of documentation:

```bash
yarn validate:content && yarn build
```

### Before Creating Pull Requests

Ensure your changes meet all content standards:

```bash
yarn validate:content
yarn build
yarn validate:links
```

### CI/CD Integration

The script is automatically integrated into the GitHub Actions workflow and runs on every pull request. The pipeline will fail if any violations are detected, preventing non-compliant content from being merged.

**GitHub Actions workflow step:**

```yaml
- name: Validate docs content
  run: yarn validate:content
```

## Common Workflows

### Finding All Violations

Run the full validation and review the complete report:

```bash
yarn validate:content
```

### Fixing ref: Links Violations

For each file with `ref:` link violations:

1. **Open the source file** shown in the report
2. **Locate the line number** specified in the violation
3. **Identify the target document:**
   - The `ref:` slug usually corresponds to a document filename
   - Search for similar filenames in the `docs/` directory
4. **Replace with correct path:**
   - Use absolute path: `/section/docs/document-name`
   - Or relative path: `../docs/document-name`
5. **Verify the fix:**
   ```bash
   yarn validate:content  # Should pass
   yarn build             # Verify link works
   ```

### Bulk Migration from ref: Links

If you have many `ref:` links to migrate:

1. **Generate full report:**
   ```bash
   yarn validate:content > violations.txt
   ```
2. **Group by file** - Focus on one file at a time
3. **Create a mapping** of `ref:` slugs to actual paths
4. **Use find-replace** within each file
5. **Validate after each file:**
   ```bash
   yarn validate:content
   ```

### Testing New Validation Rules

After adding a new rule to `VALIDATION_RULES`:

1. **Run validation:**
   ```bash
   yarn validate:content
   ```
2. **Review violations** - Check if the rule catches what you expect
3. **Adjust pattern** if too many false positives or misses
4. **Test edge cases** by creating test files temporarily

## Technical Details

### How It Works

1. **Directory scanning:** Recursively traverses `docs/` directory
2. **File reading:** Reads each file's content as UTF-8 text
3. **Rule checking:** Tests each line against all rule patterns
4. **Violation collection:** Stores file path, line number, and content
5. **Grouping:** Organizes violations by rule name
6. **Reporting:** Formats and prints structured output with statistics
7. **Exit code:** Returns 0 for success, 1 for failures

### Validation Logic

```javascript
// For each file in docs/
for (const file of allFiles) {
  const lines = readFile(file).split('\n');

  // Check each rule
  for (const rule of VALIDATION_RULES) {
    // Check each line
    lines.forEach((line, index) => {
      if (rule.pattern.test(line)) {
        violations.push({
          rule: rule.name,
          file: file,
          line: index + 1,
          content: line.trim()
        });
      }
    });
  }
}
```

### Regex Pattern Guidelines

When creating validation rules, follow these guidelines for patterns:

**Use global and case-insensitive flags:**
```javascript
pattern: /keyword/gi  // Good - matches all occurrences, any case
pattern: /keyword/    // Bad - only matches first occurrence
```

**Escape special characters:**
```javascript
pattern: /\(ref:/gi          // Good - matches literal "(ref:"
pattern: /(ref:/gi           // Bad - unbalanced parenthesis in regex
```

**Match variations:**
```javascript
pattern: /href=["']ref:/gi   // Good - matches both " and '
pattern: /href="ref:/gi      // Bad - only matches double quotes
```

**Use negative lookaheads for exceptions:**
```javascript
// Match api.8x8.com but not api.8x8.com/oauth
pattern: /https:\/\/api\.8x8\.com(?!\/oauth)/gi
```

### File Processing

The script processes:
- ✅ All files recursively in `docs/`
- ✅ Markdown files (`.md`, `.mdx`)
- ✅ JSON files (for metadata validation)
- ✅ Any text-based file in the docs directory

The script does NOT process:
- ❌ Binary files (images, PDFs)
- ❌ Files outside `docs/` directory
- ❌ Node modules or build artifacts
- ❌ Git metadata files

### Exit Codes

- **Exit code 0:** All validations passed, no violations found
- **Exit code 1:** One or more violations detected

The exit code makes the script suitable for CI/CD pipelines where failures should block merging.

## CI/CD Integration Details

The content validation script is integrated into the GitHub Actions workflow at `.github/workflows/build.yml`:

```yaml
- name: Update reference pages
  run: yarn reference

- name: Check for uncommitted reference changes
  run: |
    # ... git status check ...

- name: Validate docs content  # <-- Content validation step
  run: yarn validate:content

- name: Check for broken links
  run: yarn validate:links

- name: Build Docusaurus
  run: yarn build
```

**Workflow behavior:**
- Runs on every pull request
- Validates content before building
- Fails the pipeline if violations found
- Prevents non-compliant content from being merged

## Best Practices

### When Adding New Rules

1. **Be specific** - Target exact patterns to avoid false positives
2. **Provide clear messages** - Help developers understand and fix violations
3. **Test thoroughly** - Run against the full docs before committing
4. **Document the rule** - Add examples to this documentation

### When Fixing Violations

1. **Fix one file at a time** - Easier to verify and commit incrementally
2. **Test after fixing** - Run `yarn validate:content` and `yarn build`
3. **Check the rendered output** - Ensure links work as expected
4. **Commit with clear messages** - Reference the rule being fixed

### Maintenance

1. **Keep rules updated** - Remove obsolete rules when no longer needed
2. **Monitor false positives** - Refine patterns if catching valid content
3. **Review CI failures** - Investigate any unexpected validation failures
4. **Update documentation** - Keep this file in sync with rule changes

## Related Documentation

- [Development Scripts](development-scripts.md) - Overview of all yarn commands
- [Analyze Broken Links](analyze-broken-links.md) - Link validation after content changes
- [Sidebar Validation](sidebar-validation.md) - Ensuring sidebar consistency

## Troubleshooting

### Script Doesn't Run

**Symptom:** `yarn validate:content` command not found

**Solution:**
```bash
yarn install                        # Reinstall dependencies
node scripts/validate-content.js    # Run directly
```

### No Violations Shown But Build Fails

**Symptom:** Validation passes but build still has content issues

**Solution:** Content validation only checks configured rules. Also run:
```bash
yarn validate:links  # Check for broken links
yarn build           # Full Docusaurus validation
```

### False Positives

**Symptom:** Valid content flagged as violations

**Solution:**
1. Review the validation rule pattern in `scripts/validate-content.js`
2. Refine the regex to be more specific
3. Consider if the content should actually be updated to meet standards

### Performance Issues

**Symptom:** Script takes too long to run

**Solution:**
1. Check size of `docs/` directory
2. Consider optimizing regex patterns (avoid backtracking)
3. For very large repositories, consider parallel processing

### New Rule Not Working

**Symptom:** Added new rule but violations not detected

**Solution:**
1. Verify rule is added to `VALIDATION_RULES` array
2. Check regex pattern with online regex tester
3. Ensure pattern has correct flags (`/gi` for global, case-insensitive)
4. Test pattern against sample violation text

## Future Enhancements

Potential additions to the content validation system:

- **Performance:** Parallel file processing for large documentation sets
- **Ignore patterns:** Add ability to ignore specific files or directories
- **Auto-fix:** Automatic correction for simple violations
- **Rule categories:** Group rules by severity (error vs warning)
- **Incremental validation:** Only check changed files in git diff
- **Custom reporters:** JSON output for integration with other tools
