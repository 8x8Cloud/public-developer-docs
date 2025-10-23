# OpenAPI Validation Scripts

Tools for validating OpenAPI Specification (OAS) files in the `docs_oas/` directory.

## Overview

The OpenAPI validation scripts ensure that all API specification files are valid, well-formed, and adhere to OpenAPI standards. Two commands are available:

- **`yarn validate:oas`** - Direct validation of all OAS files
- **`yarn validate:openapi`** - Custom script with folder filtering and enhanced reporting

## Usage

### Basic Validation - All Files

Validate all OpenAPI files in the `docs_oas/` directory:

```bash
# Using direct command
yarn validate:oas

# Using custom script (with summary)
yarn validate:openapi
```

**What it validates:**
- All `.json`, `.yaml`, and `.yml` files in `docs_oas/`
- Includes subdirectories: Any direct child folder of `docs_oas/` (e.g., `actions-events/`, `analytics/`, `connect/`, `contactcenter/`)

### Folder-Specific Validation

Validate only files in a specific subdirectory:

```bash
yarn validate:openapi connect             # Only docs_oas/connect/
yarn validate:openapi analytics           # Only docs_oas/analytics/
yarn validate:openapi actions-events      # Only docs_oas/actions-events/
yarn validate:openapi contactcenter       # Only docs_oas/contactcenter/
```

**Benefits of folder-specific validation:**
- Faster feedback during development
- Focus on relevant API specifications
- Useful for incremental validation

### Invalid Folder Names

If an invalid folder name is provided, the script warns and validates all files:

```bash
yarn validate:openapi invalid-folder-name

# Output:
# ⚠️  Warning: Unknown folder "invalid-folder-name"
#    Valid folders: actions-events, analytics, connect, contactcenter
#    Ignoring parameter and validating all files...
```

## Validation Rules

The validation tool checks OpenAPI specifications against:

### OpenAPI Specification Compliance

- **Schema version:** Validates OpenAPI 2.0 (Swagger), 3.0.x, and 3.1.x specifications
- **Required fields:** Ensures all mandatory fields are present (info, paths, etc.)
- **Data types:** Validates parameter types, response schemas, and data formats
- **References:** Checks that all `$ref` references resolve correctly

### Best Practices

- **Operation IDs:** Ensures operation IDs are unique across the specification
- **Description quality:** Warns about missing descriptions for operations and parameters
- **Security definitions:** Validates security schemes and their usage
- **Response codes:** Checks for proper HTTP status code usage

### Common Validation Errors

**Missing required fields:**
```yaml
# ❌ Error: Missing 'info' field
paths:
  /users:
    get: ...

# ✅ Fixed
info:
  title: My API
  version: 1.0.0
paths:
  /users:
    get: ...
```

**Invalid reference:**
```yaml
# ❌ Error: $ref does not resolve
components:
  schemas:
    User:
      $ref: '#/components/schemas/NonExistent'

# ✅ Fixed
components:
  schemas:
    User:
      type: object
      properties:
        name:
          type: string
```

**Duplicate operation IDs:**
```yaml
# ❌ Error: Duplicate operationId 'getUser'
paths:
  /users/{id}:
    get:
      operationId: getUser
  /admin/users/{id}:
    get:
      operationId: getUser

# ✅ Fixed
paths:
  /users/{id}:
    get:
      operationId: getUser
  /admin/users/{id}:
    get:
      operationId: getAdminUser
```

## Output Format

### Success Output

When all OpenAPI files are valid:

```bash
$ yarn validate:openapi

🔍 Validating all OpenAPI files in: all folders in docs_oas/

📊 Found 19 OpenAPI files to validate

════════════════════════════════════════════════════════════════════════════════
Running validation...
════════════════════════════════════════════════════════════════════════════════

validating docs_oas/analytics/work_analytics_customer_data.json...
docs_oas/analytics/work_analytics_customer_data.json: validated in 45ms

validating docs_oas/connect/verification_api.json...
docs_oas/connect/verification_api.json: validated in 32ms

... (all files validated)

════════════════════════════════════════════════════════════════════════════════
✅ OpenAPI Validation Summary:
   Validated: 19 files
   Passed: 19 files
   Failed: 0 files

All OpenAPI files are valid! 🎉
```

### Validation Error Output

When validation errors are found:

```bash
$ yarn validate:openapi connect

🎯 Validating OpenAPI files in: docs_oas/connect/

📊 Found 10 OpenAPI files to validate

════════════════════════════════════════════════════════════════════════════════
Running validation...
════════════════════════════════════════════════════════════════════════════════

validating docs_oas/connect/verification_api.json...
[1] docs_oas/connect/verification_api.json:125:9 at #/paths/~1verify/post/responses/200

Missing required field: description

123 |       "200": {
124 |         "content": {
125 |           "application/json": {
126 |             "schema": {

Error was generated by the spec rule.

[2] docs_oas/connect/verification_api.json:234:15 at #/paths/~1verify~1{id}/get/parameters/0

Parameter "id" is not described.

232 |       "parameters": [
233 |         {
234 |           "name": "id",
235 |           "in": "path",
236 |           "required": true

docs_oas/connect/verification_api.json: validated in 78ms

❌ Validation failed with 2 errors

════════════════════════════════════════════════════════════════════════════════
❌ OpenAPI Validation Summary:
   Validated: 10 files
   Status: Some files have validation errors

Please fix the validation errors above and run again.
```

**Error details include:**
- File path and line number
- Specific validation rule that failed
- Context showing the problematic section
- Clear description of the issue

### Folder-Specific Validation Output

```bash
$ yarn validate:openapi analytics

🎯 Validating OpenAPI files in: docs_oas/analytics/

📊 Found 9 OpenAPI files to validate

════════════════════════════════════════════════════════════════════════════════
Running validation...
════════════════════════════════════════════════════════════════════════════════

validating docs_oas/analytics/work_analytics_customer_data.json...
docs_oas/analytics/work_analytics_customer_data.json: validated in 45ms

... (all analytics files validated)

════════════════════════════════════════════════════════════════════════════════
✅ OpenAPI Validation Summary:
   Validated: 9 files
   Passed: 9 files
   Failed: 0 files

All OpenAPI files are valid! 🎉
```

## When to Use

### During Development

**While editing OpenAPI specifications:**
```bash
# Fast validation of the API you're working on
yarn validate:openapi connect

# Full validation when you're done
yarn validate:oas
```

### Before Committing

Ensure all OpenAPI files are valid before committing:

```bash
yarn validate:oas
```

Add to your pre-commit checklist:
```bash
yarn validate:content    # Validate markdown content
yarn validate:oas        # Validate OpenAPI specs
yarn build               # Build documentation
```

### Before Creating Pull Requests

Run comprehensive validation:

```bash
# Validate all aspects
yarn validate:content
yarn validate:oas
yarn build
yarn validate:links
```

### CI/CD Integration

The validation can be integrated into GitHub Actions workflows:

```yaml
- name: Install dependencies
  run: yarn install

- name: Validate OpenAPI specifications
  run: yarn validate:oas

- name: Build documentation
  run: yarn build
```

**Benefits:**
- Catches invalid OpenAPI files before merge
- Maintains API specification quality
- Prevents breaking changes to API documentation

## Common Workflows

### Validating After OpenAPI File Updates

After modifying or adding OpenAPI specification files:

1. **Validate the specific API:**
   ```bash
   yarn validate:openapi connect
   ```

2. **Review errors** - Read the validation output carefully

3. **Fix issues** - Update the OpenAPI file based on error messages

4. **Re-validate:**
   ```bash
   yarn validate:openapi connect
   ```

5. **Full validation:**
   ```bash
   yarn validate:oas
   ```

### Adding New OpenAPI Files

When adding a new OpenAPI specification:

1. **Place file** in appropriate `docs_oas/` subdirectory
   - `docs_oas/actions-events/` - Actions & Events APIs
   - `docs_oas/analytics/` - Analytics APIs
   - `docs_oas/connect/` - Connect CPaaS APIs
   - `docs_oas/contactcenter/` - Contact Center APIs

2. **Validate the file:**
   ```bash
   yarn validate:openapi <folder-name>
   ```

3. **Fix any validation errors** identified

4. **Verify full build:**
   ```bash
   yarn build
   ```

### Bulk Validation After Multiple Changes

After updating multiple OpenAPI files across different folders:

```bash
# Validate all files
yarn validate:oas

# If errors found, validate each folder separately for clarity
yarn validate:openapi actions-events
yarn validate:openapi analytics
yarn validate:openapi connect
yarn validate:openapi contactcenter
```

### Troubleshooting Validation Errors

When validation fails:

1. **Read the error message carefully** - The validator provides detailed context

2. **Locate the issue:**
   - Note the file path
   - Note the line number
   - Review the context shown in the error

3. **Understand the rule:**
   - Review OpenAPI specification requirements
   - Check validation tool documentation for the specific rule

4. **Fix the issue** in the OpenAPI file

5. **Re-validate:**
   ```bash
   yarn validate:openapi <folder>
   ```

6. **Test the fix:**
   ```bash
   yarn build  # Ensure documentation builds correctly
   ```

## Technical Details

### How It Works

**`yarn validate:oas` (Direct Validation):**
1. Runs validation directly on all OpenAPI files
2. Scans all matching files recursively
3. Each file is validated against OpenAPI specification
4. Results are printed to console
5. Exits with code 0 (success) or 1 (errors)

**`yarn validate:openapi` (Custom Script):**
1. Accepts optional folder name as command-line argument
2. Validates folder name format (alphanumeric, dashes, underscores only)
3. Checks if folder exists in `docs_oas/`
4. If invalid or missing: warns user and validates all files
5. Counts files to validate by scanning the target directory
6. Calls `yarn validate:oas` internally via child process
7. Displays enhanced summary with file counts
8. Exits with code 0 (success) or 1 (errors)

### Script Implementation

The custom script (`scripts/validate-openapi.js`) uses:

- **Node.js child_process:** To spawn validation subprocess
- **File system scanning:** To count files before validation and discover available folders
- **Argument parsing:** To handle folder-specific validation
- **Folder validation:** Checks folder name format and existence
- **Enhanced output:** To provide summary statistics

**Key functions:**
```javascript
// Get list of available folders in docs_oas/
function getAvailableFolders() { ... }

// Get list of OAS files in target directory
function getOasFiles(pattern) { ... }

// Recursively scan directory for .json, .yaml, .yml files
function scanDirectory(dirPath) { ... }

// Run validation via child process
spawnSync('yarn', ['validate:oas'], { ... })
```

### Supported File Extensions

The scripts validate files with these extensions:
- `.json` - JSON format OpenAPI specifications
- `.yaml` - YAML format OpenAPI specifications
- `.yml` - YAML format OpenAPI specifications (alternate extension)

All three formats are supported by the validation tool.

### Exit Codes

- **Exit code 0:** All OpenAPI files are valid
- **Exit code 1:** One or more files have validation errors

The exit codes make the scripts suitable for CI/CD pipelines where failures should block merging.

### Folder Validation

The script validates folder names using these criteria:
- Must contain only letters (a-z, A-Z), numbers (0-9), dashes (-), and underscores (_)
- Must exist as a direct child directory of `docs_oas/`
- Dynamically discovers all available folders (no hardcoded list)

This allows new folders to be added to `docs_oas/` without modifying the script.

## Configuration

The validation tool uses default OpenAPI validation rules. Configuration can be customized if needed through the validation tool's configuration files. Consult the validation tool documentation for available configuration options.

## Best Practices

### When Working with OpenAPI Files

1. **Validate frequently** - Run validation after each significant change
2. **Use folder-specific validation** - Faster feedback during development
3. **Fix errors immediately** - Don't let validation errors accumulate
4. **Test the documentation** - Run `yarn build` to ensure docs generate correctly

### When Updating APIs

1. **Validate before committing** - Catch errors early
2. **Review all errors** - Don't ignore warnings
3. **Test in local docs** - Verify API reference pages render correctly
4. **Document breaking changes** - Note any API changes in commit messages

### Maintenance

1. **Keep dependencies updated** - Run `yarn upgrade` periodically
2. **Monitor CI failures** - Investigate any unexpected validation failures
3. **Review validation rules** - Adjust configuration if rules are too strict/loose
4. **Update documentation** - Keep this file in sync with any script changes

## Related Documentation

- [Development Scripts](development-scripts.md) - Overview of all yarn commands
- [Content Validation](content-validation.md) - Validating markdown documentation
- [Lowercase Operation IDs](lowercase-operation-ids.md) - Script for normalizing operation IDs
- [Analyze Broken Links](analyze-broken-links.md) - Link validation tools

## Troubleshooting

### Validation Tool Not Found

**Symptom:** Validation command not found

**Solution:**
```bash
yarn install              # Install all dependencies
yarn validate:oas         # Try again
```

### Script Won't Run

**Symptom:** `yarn validate:openapi` command not found

**Solution:**
```bash
yarn install                           # Reinstall dependencies
node scripts/validate-openapi.js       # Run directly
```

### False Positives

**Symptom:** Valid OpenAPI files flagged as invalid

**Solution:**
1. Review the specific validation rule that's failing
2. Check if the OpenAPI specification actually requires what the validator suggests
3. Verify your OpenAPI file against the official specification
4. If the rule is too strict, adjust validation configuration if available

### Performance Issues

**Symptom:** Validation takes too long

**Solution:**
1. Use folder-specific validation during development:
   ```bash
   yarn validate:openapi connect  # Faster than validating all
   ```
2. Only run full validation before commits/PRs
3. Consider adjusting validation configuration if available

### No Files Found

**Symptom:** `⚠️ No OpenAPI files found in docs_oas/...`

**Solution:**
1. Verify files exist in the target directory:
   ```bash
   ls docs_oas/connect/
   ```
2. Check file extensions (must be `.json`, `.yaml`, or `.yml`)
3. Verify folder name is correct (case-sensitive)

### Validation Passes But Build Fails

**Symptom:** `yarn validate:oas` succeeds but `yarn build` fails

**Solution:**
OpenAPI validation only checks specification validity. Build failures may be due to:
- Docusaurus configuration issues
- Missing markdown files
- Broken links in generated documentation

Run additional validation:
```bash
yarn validate:content  # Check markdown content
yarn validate:links    # Check for broken links
yarn build             # Full Docusaurus validation
```

## Future Enhancements

Potential additions to the OpenAPI validation system:

- **Custom validation configuration:** Project-specific validation rules
- **Automated fixing:** Scripts to auto-fix common issues
- **Incremental validation:** Only validate changed files in git diff
- **Parallel validation:** Speed up validation for large specification sets
- **Detailed reports:** Generate JSON reports for CI/CD integration
- **Pre-commit hooks:** Automatically validate OpenAPI files before commit
