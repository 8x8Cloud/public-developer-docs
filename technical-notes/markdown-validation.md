# Markdown Validation

## Overview

This project uses markdownlint-cli2 to validate markdown (.md) and MDX (.mdx) files for consistency, style, and formatting issues. The validation system uses separate configurations for regular markdown and MDX files to accommodate their different requirements.

## Why Separate Configurations?

1. **MDX Files** - Support React/JSX components, requiring inline HTML/JSX to be allowed
2. **Markdown Files** - Limited inline HTML support (e.g., `<br>` tags for table formatting)
3. **Shared Rules** - Both file types share common markdownlint rules from the base configuration
4. **Maintainability** - Centralized base rules with file-type-specific overrides

## Configuration Files

### `.markdown-rules.json` (Base Configuration)

Contains shared markdownlint rules that apply to both `.md` and `.mdx` files. This includes rules for:
- Tab width and spaces
- Line length limits
- List style consistency
- Other markdown formatting rules

**Location:** [`.markdown-rules.json`](../.markdown-rules.json)

**Note:** This file is named `.markdown-rules.json` (not `.markdownlint.json`) to prevent markdownlint-cli2 from automatically loading it. This allows the child configurations ([`md.markdownlint-cli2.jsonc`](../md.markdownlint-cli2.jsonc) and [`mdx.markdownlint-cli2.jsonc`](../mdx.markdownlint-cli2.jsonc)) to explicitly extend it with their own rule overrides.

### `md.markdownlint-cli2.jsonc` (Markdown Configuration)

Configuration specific to regular `.md` files:
- Extends the base `.markdown-rules.json` configuration
- Configures MD033 (no-inline-html) to allow specific HTML elements as needed
- Targets `docs/**/*.md` files

**Location:** [`md.markdownlint-cli2.jsonc`](../md.markdownlint-cli2.jsonc)

**Structure:**
```jsonc
{
  "config": {
    "extends": ".markdown-rules.json",
    "MD033": {
      "allowed_elements": ["br"]  // Allows <br> tags anywhere in markdown
    }
  },
  "globs": ["docs/**/*.md"]
}
```

**Important Note:** The configuration uses `allowed_elements` (not `table_allowed_elements`) because testing showed that `table_allowed_elements` does not function as documented in the current version of markdownlint.

### `mdx.markdownlint-cli2.jsonc` (MDX Configuration)

Configuration specific to `.mdx` files:
- Extends the base `.markdown-rules.json` configuration
- Disables MD033 completely to allow all JSX/React components
- Disables MD041 to allow MDX files without top-level heading
- Targets `docs/**/*.mdx` files
- Excludes auto-generated API reference documentation

**Location:** [`mdx.markdownlint-cli2.jsonc`](../mdx.markdownlint-cli2.jsonc)

**Structure:**
```jsonc
{
  "config": {
    "extends": ".markdown-rules.json",
    "MD033": false,  // Allows all inline HTML/JSX
    "MD041": false   // Allows files without top-level heading
  },
  "globs": ["docs/**/*.mdx"],
  "ignores": ["**/reference/**"]  // Excludes auto-generated API docs
}
```

**Why Ignore Reference Folders?**

The `reference/` folders contain auto-generated API documentation created by `yarn reference:generate` from OpenAPI specifications. These files:
- Are programmatically generated from `docs_oas/` specifications
- Have a different structure than hand-written documentation
- Should not be manually edited or linted
- Are regenerated whenever OpenAPI specs change

By excluding them from validation, we focus linting on hand-written documentation where style consistency matters most.

## How the Extends Mechanism Works

The `extends` property in child configurations allows for reusability:

1. **Base rules** are defined once in `.markdown-rules.json`
2. **Child configurations** (md/mdx) inherit all base rules
3. **Specific rules** can be overridden in child configurations as needed
4. **Changes to base rules** automatically apply to both file types

This approach ensures consistency while allowing file-type-specific customization.

## Rule Configuration Philosophy

### Base Configuration
- Contains rules applicable to both `.md` and `.mdx` files
- Examples: line length, list style, heading hierarchy
- Modified when rules should apply universally

### Child Configurations
- Extend the base and override specific rules
- Handle differences between markdown and MDX requirements
- MD033 (inline HTML) is the primary differentiator:
  - **Markdown files**: Restricted to specific elements (e.g., `<br>`)
  - **MDX files**: Unrestricted (allows JSX components)

**Note:** Rule configurations are subject to change based on project needs and evolving best practices.

## Ignoring Files and Folders

Both configuration files support an `ignores` property to exclude specific paths from validation.

### Why Use Ignores?

- **Auto-generated content** - Files created by build tools (e.g., API reference docs)
- **Third-party content** - Imported documentation that doesn't follow project standards
- **Build artifacts** - Temporary or output directories
- **Performance** - Ignored patterns are applied before file enumeration for faster validation

### Ignore Pattern Syntax

The `ignores` property accepts an array of glob patterns:

```jsonc
{
  "ignores": [
    "**/reference/**",      // All files under any reference/ folder
    "docs/legacy/**",        // Specific legacy documentation folder
    "**/node_modules/**",    // Node modules (usually already gitignored)
    "build/**"              // Build output directory
  ]
}
```

**Pattern Examples:**
- `**/folder/**` - Matches `folder/` at any depth
- `docs/specific/path/**` - Matches a specific path
- `*.tmp.md` - Matches files with specific extension pattern

### Current Ignore Configurations

**MDX Files:** `**/reference/**`
- Excludes auto-generated API reference documentation
- These files are created by `yarn reference:generate` from OpenAPI specs
- Should not be manually edited or linted

**Markdown Files:** None currently
- All `.md` files in `docs/` are hand-written and should follow style guidelines

### Performance Note

According to markdownlint-cli2 documentation, the `ignores` property has the best performance when applied at the repository root level because patterns are applied before file enumeration. This is more efficient than scanning all files first and then filtering them out.

## Running Validation

### Command

```bash
yarn lint:md
```

### What It Does

The `lint:md` script runs two separate markdownlint-cli2 commands sequentially:

```json
"lint:md": "markdownlint-cli2 --config md.markdownlint-cli2.jsonc && markdownlint-cli2 --config mdx.markdownlint-cli2.jsonc"
```

1. **First command** - Validates all `.md` files using `md.markdownlint-cli2.jsonc`
2. **Second command** - Validates all `.mdx` files using `mdx.markdownlint-cli2.jsonc`
3. **Exit code** - Returns non-zero if any validation errors are found

### Understanding Output

**Successful validation:**
```
markdownlint-cli2 v0.18.1 (markdownlint v0.38.0)
Finding: docs/**/*.md
Linting: 367 file(s)
Summary: 0 error(s)
```

**Validation errors:**
```
docs/path/to/file.md:10:1 MD045/no-alt-text Images should have alternate text (alt text)
docs/path/to/file.md:15:3 MD033/no-inline-html Inline HTML [Element: div]
```

Error format: `file:line:column RULE_CODE/rule-name Description [Context]`

## Troubleshooting

### Configuration File Naming Requirements

markdownlint-cli2 **requires** configuration files to include `.markdownlint-cli2` in their name:

✅ **Valid names:**
- `.markdownlint-cli2.jsonc`
- `md.markdownlint-cli2.jsonc`
- `custom-config.markdownlint-cli2.jsonc`

❌ **Invalid names:**
- `.markdownlint.json` (wrong tool)
- `md-config.json` (missing required substring)
- `.markdownlintrc` (wrong format)

**Error message if incorrect:**
```
Configuration file should be one of the supported names (e.g., '.markdownlint-cli2.jsonc')
```

### Modifying Rules

**To modify a rule for both file types:**
1. Edit [`.markdown-rules.json`](../.markdown-rules.json) (base configuration)
2. Change applies to both `.md` and `.mdx` files automatically

**To modify a rule for only .md files:**
1. Edit [`md.markdownlint-cli2.jsonc`](../md.markdownlint-cli2.jsonc)
2. Add or modify the rule in the `config` section
3. This overrides the base configuration for markdown files only

**To modify a rule for only .mdx files:**
1. Edit [`mdx.markdownlint-cli2.jsonc`](../mdx.markdownlint-cli2.jsonc)
2. Add or modify the rule in the `config` section
3. This overrides the base configuration for MDX files only

### Excluding Files from Validation

**To exclude specific files or folders:**
1. Edit the appropriate configuration file:
   - [`md.markdownlint-cli2.jsonc`](../md.markdownlint-cli2.jsonc) for `.md` files
   - [`mdx.markdownlint-cli2.jsonc`](../mdx.markdownlint-cli2.jsonc) for `.mdx` files
2. Add or modify the `ignores` property with glob patterns
3. Patterns are applied before file enumeration for best performance

**Example:**
```jsonc
{
  "config": { /* ... */ },
  "globs": ["docs/**/*.mdx"],
  "ignores": ["**/reference/**", "docs/legacy/**"]
}
```

### Common Errors and Solutions

**Error: `MD033/no-inline-html Inline HTML [Element: xyz]`**
- **In .md files:** Add the element to `allowed_elements` in [`md.markdownlint-cli2.jsonc`](../md.markdownlint-cli2.jsonc)
- **In .mdx files:** Should not occur (MD033 is disabled); verify you're using `.mdx` extension

**Error: Configuration file not found**
- Verify file names include `.markdownlint-cli2` substring
- Check file paths in `package.json` script
- Ensure files are in repository root directory

**Error: Rule not being applied**
- Check if rule is overridden in child configuration
- Verify `extends` property is correctly set
- Test with `--config` flag to isolate configuration issues

## Reference Links

- [markdownlint-cli2 GitHub Repository](https://github.com/DavidAnson/markdownlint-cli2)
- [markdownlint Rules Documentation](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md)
- [markdownlint Rule Configuration](https://github.com/DavidAnson/markdownlint#configuration)
