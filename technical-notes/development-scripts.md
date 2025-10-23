# Development Scripts

This project uses **Yarn** exclusively. The package manager version is specified in `package.json`. Do NOT use npm commands.

## `yarn start` - Development Server

Starts the Docusaurus development server with hot-reloading for local development.

```bash
yarn start
```

**What it does:**
- Starts local development server at `http://localhost:3000`
- Enables hot module reloading - changes reflect instantly without page refresh
- Shows build warnings and errors in real-time in the terminal
- Watches for changes in:
  - All markdown files in `docs/`
  - Sidebar configurations in `docusaurus/sidebars/`
  - Docusaurus configuration (`docusaurus.config.js`)
  - Custom React components and pages

**When to use:**
- During content authoring and editing
- Testing sidebar navigation changes
- Previewing documentation before committing
- Debugging markdown rendering issues

**Common options:**
```bash
yarn start --port 3001        # Use different port if 3000 is occupied
yarn start --host 0.0.0.0     # Make accessible on local network
```

**Troubleshooting:**
- **Server won't start:** Run `yarn clear` to clear cache, then try again
- **Changes aren't reflecting:** Hard refresh browser (`Cmd+Shift+R` on Mac, `Ctrl+Shift+R` on Windows/Linux)
- **Port already in use:** Kill the process using port 3000 or use `--port` flag with different port

---

## `yarn build` - Production Build

Creates an optimized production build and validates all documentation.

```bash
yarn build
```

**What it does:**

**Validation phase:**
- Checks all internal links between documentation pages
- Validates sidebar item references (ensures all doc IDs exist)
- Reports broken markdown links
- Checks for missing images or assets

**Build phase:**
- Generates static HTML files for all pages
- Minifies and optimizes JavaScript bundles
- Processes and optimizes CSS
- Generates search index
- Creates SEO-friendly meta tags
- Outputs production-ready files to `build/` directory

**When to use:**
- **Before committing changes** - To catch errors early
- **Before creating pull requests** - To ensure build succeeds
- **Pre-deployment validation** - CI/CD pipelines run this automatically

**Common build errors and solutions:**

1. **`Error: Doc with id "section/docs/file-name" not found`**
   - **Cause:** Sidebar configuration references a document that doesn't exist
   - **Solution:** Either create the missing markdown file or remove the reference from the sidebar

2. **`Broken link on source page "/page/path": /broken/link`**
   - **Cause:** Markdown file contains an invalid internal link
   - **Solution:** Fix or remove the broken link in the source markdown file

3. **`File not found: images/missing-image.png`**
   - **Cause:** Markdown references an image that doesn't exist in the repository
   - **Solution:** Add the missing image file or update the markdown reference

4. **Build cache issues / Strange errors**
   - **Cause:** Stale cache from previous builds causing conflicts
   - **Solution:** Run `yarn clear` to clear all caches, then run `yarn build` again

**Success criteria:**
Build completes with message: `[SUCCESS] Generated static files in "build"`

---

## Utility Commands

### `yarn serve` - Serve Production Build

Serves the production build locally for testing. Must run `yarn build` first.

```bash
yarn build && yarn serve
```

**When to use:**
- Testing production build before deployment
- Verifying optimizations are working correctly
- Checking production-only features (search, SEO, etc.)

---

### `yarn clear` - Clear Cache

Clears Docusaurus cache and generated files.

```bash
yarn clear
```

**When to use:**
- Experiencing strange build errors
- Changes aren't being picked up
- After pulling major updates from repository
- Before running clean build for deployment

**What it clears:**
- `.docusaurus/` directory (generated files)
- `build/` directory (production build output)
- Node module cache related to Docusaurus

---

### `yarn validate:sidebar` - Validate Sidebar Configuration

Validates consistency between sidebar configurations and actual documentation files with severity-based reporting.

```bash
yarn validate:sidebar                    # Validate all categories
yarn validate:sidebar analytics          # Validate specific category
yarn validate:sidebar analytics reference # Validate specific subcategory
```

**What it does:**
- **ERROR level:** Missing files (sidebar → filesystem) - Will fail CI/CD
- **WARNING level:** Orphaned files (filesystem → sidebar) - Won't fail CI/CD
- **INFO level:** Cross-references, redirects, slug mismatches - Informational only
- Returns exit code 1 only for errors (missing files)
- Returns exit code 0 for warnings and info

**Severity Levels:**
- ❌ **ERRORS** (exit 1): Broken sidebar references that must be fixed
- ⚠️ **WARNINGS** (exit 0): Orphaned content that should be addressed
- ℹ️ **INFO** (exit 0): Cross-subcategory refs, redirects (informational)

**CI/CD Ready:**
The script is designed for CI/CD integration. It will only fail builds when there are critical issues (missing files that would cause broken links), while still tracking less critical items like orphaned files.

**When to use:**
- Before committing documentation changes
- After adding or removing documentation files
- During documentation refactoring
- As part of CI/CD validation pipelines

**For detailed usage, severity levels, and examples, see:** [Sidebar Validation](sidebar-validation.md)

---

### `yarn validate:content` - Validate Documentation Content

Validates all documentation files against configurable content quality rules. Prevents legacy patterns like `ref:` links from being reintroduced. Extensible system for adding new validation rules.

```bash
yarn validate:content
```

**For detailed usage, validation rules, and examples, see:** [Content Validation](content-validation.md)

---

### `yarn validate:oas` - Validate OpenAPI Specifications (Direct)

Validates all OpenAPI specification files in `docs_oas/`. Ensures API specifications are valid and well-formed.

```bash
yarn validate:oas
```

**What it does:**
- Validates all `.json`, `.yaml`, and `.yml` files in `docs_oas/`
- Checks OpenAPI specification compliance
- Reports validation errors with line numbers
- Returns exit code 1 if validation fails

**When to use:**
- Quick validation of all OpenAPI files
- CI/CD pipeline integration
- Before committing API specification changes

---

### `yarn validate:openapi` - Validate OpenAPI Specifications (With Filtering)

Custom validation script with folder filtering and enhanced reporting.

```bash
yarn validate:openapi                     # Validate all folders
yarn validate:openapi connect             # Validate only connect/ folder
yarn validate:openapi analytics           # Validate only analytics/ folder
yarn validate:openapi actions-events      # Validate only actions-events/ folder
yarn validate:openapi contactcenter       # Validate only contactcenter/ folder
```

**What it does:**
- Accepts optional folder name for targeted validation
- Counts files before validation
- Provides enhanced summary output
- Warns if invalid folder name provided (validates all instead)

**When to use:**
- During development of specific API specifications
- Faster validation feedback for single API area
- When you need summary statistics

**For detailed usage, validation rules, troubleshooting, and examples, see:** [OpenAPI Validation](openapi-validation.md)

---

### `yarn validate:links` - Validate Internal Links and Anchors

Analyzes and reports broken internal links and anchors in the documentation.

```bash
yarn validate:links
```

**What it does:**
- Runs production build process to identify broken links
- Reports broken internal documentation links
- Reports broken heading anchors
- Groups issues by source page for easier fixing
- Returns exit code 1 if issues are found (suitable for CI/CD)

**When to use:**
- During development to understand scope of broken link issues
- Before committing changes to validate documentation integrity
- In code review to communicate which broken links were fixed
- As part of CI/CD pipeline to prevent broken links from being merged

**For detailed usage, configuration, troubleshooting, and examples, see:** [Analyze Broken Links](analyze-broken-links.md)

---

### `yarn docusaurus` - Direct CLI Access

Provides direct access to Docusaurus CLI for advanced operations.

```bash
yarn docusaurus --help              # List all available commands
yarn docusaurus docs:version 1.0    # Create versioned docs
yarn docusaurus swizzle              # Customize theme components
```

**Common uses:**
- Creating versioned documentation snapshots
- Customizing theme components (advanced)
- Running specific Docusaurus plugins
