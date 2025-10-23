# Project Structure

This document provides a comprehensive overview of the 8x8 Developer Documentation repository structure.

## Overview

The repository is organized to separate documentation content, configuration, OpenAPI specifications, and build artifacts into distinct directories. This separation ensures clarity and maintainability.

## Root Directory Structure

```
developer-docs/
├── docs/                    # Published documentation content
├── docs_oas/               # OpenAPI specification source files
├── docusaurus/             # Docusaurus configuration and assets
├── scripts/                # Build and validation scripts
├── src/                    # Swizzled Docusaurus theme components
├── technical-notes/        # Development documentation
├── .docusaurus/            # Generated Docusaurus files (git-ignored)
├── build/                  # Production build output (git-ignored)
├── node_modules/           # Dependencies (git-ignored)
├── docusaurus.config.js    # Main Docusaurus configuration
├── babel.config.js         # Babel transpiler configuration
├── package.json            # Node.js dependencies and scripts
├── yarn.lock              # Yarn dependency lock file
├── CLAUDE.md              # Repository overview for Claude Code
├── CONTRIBUTING.md        # Contribution guidelines
└── README.md              # Project introduction
```

## Documentation Content (`docs/`)

The `docs/` directory contains all published documentation organized by product area.

### Product Areas

```
docs/
├── actions-events/       # XCaaS Actions & Events API
├── analytics/            # XCaaS Analytics API
├── connect/              # 8x8 Connect CPaaS
├── contactcenter/        # Contact Center API (deprecated)
├── jaas/                 # Jitsi as a Service
├── tech-partner/         # Technical Partner integrations
├── index.mdx             # Developer portal homepage
├── license.md            # API license agreement
└── page/                 # Standalone pages (e.g., SDK licenses)
```

### Team Directory Structure

Each product area follows a consistent structure:

```
docs/[product-area]/
├── docs/                 # Guides, tutorials, and conceptual documentation
│   ├── getting-started.md
│   ├── authentication.md
│   ├── [feature-guides].md
│   └── troubleshooting.md
├── reference/            # Auto-generated API reference documentation
│   └── [generated from OpenAPI specs]
├── images/              # Product-specific images and diagrams
│   ├── [screenshots].png
│   └── [diagrams].svg
└── index.mdx            # Product area landing page (optional)
```

**Key Points:**
- `docs/` subdirectory contains hand-written guides and tutorials
- `reference/` subdirectory contains auto-generated API documentation from OpenAPI specs
- `images/` subdirectory stores product-specific visual assets
- Landing pages use `.mdx` format for React component support

## OpenAPI Specifications (`docs_oas/`)

OpenAPI specification source files are kept separate from published documentation.

```
docs_oas/
├── actions-events/       # Actions & Events API specs
│   ├── [api-spec].yaml
│   ├── [api-spec].json
│   └── [multiple spec files]
├── analytics/           # Analytics API specs
│   └── [spec files]
├── connect/             # Connect CPaaS API specs
│   └── [spec files]
└── contactcenter/       # Contact Center API specs
    └── [spec files]
```

**Workflow:**
1. Edit OpenAPI specs in `docs_oas/[product-area]/`
2. Run `yarn reference:generate` to generate documentation
3. Generated docs appear in `docs/[product-area]/reference/`

**Supported Formats:**
- YAML (`.yaml`, `.yml`) - Primary format
- JSON (`.json`) - Alternative format

**Organization:**
- Can use single large spec file
- Can split into multiple files for better organization
- Reference external schemas using relative paths

## Docusaurus Configuration (`docusaurus/`)

Docusaurus-specific configuration, custom components, and static assets.

```
docusaurus/
├── sidebars/            # Navigation sidebar configurations
│   ├── index.js         # Main sidebar index importing all section sidebars
│   ├── actions-events/  # Actions & Events sidebars
│   │   ├── docs.js      # Guides sidebar
│   │   └── reference.js # API reference sidebar
│   ├── analytics/       # Analytics sidebars
│   │   ├── docs.js
│   │   └── reference.js
│   ├── connect/         # Connect sidebars
│   │   ├── docs.js
│   │   └── reference.js
│   ├── contactcenter/   # Contact Center sidebars
│   │   ├── docs.js
│   │   └── reference.js
│   ├── jaas.js         # JaaS sidebar (single file)
│   ├── tech-partner.js # Tech Partner sidebar (single file)
│   └── utils.js        # Shared sidebar utilities
├── components/          # Custom React components
│   └── [custom components]
├── css/                # Custom CSS styles
│   └── custom.css      # Site-wide custom styles
├── static/             # Static assets
│   ├── img/           # Global images (logos, icons)
│   └── [other static files]
├── redirects/          # URL redirect configurations
│   ├── index.js       # Main redirects index
│   ├── actions-events.js
│   ├── analytics.js
│   ├── connect.js
│   ├── contactcenter.js
│   ├── jaas.js
│   └── tech-partner.js
├── plugins/            # Custom Docusaurus plugins
│   └── client-side-redirects/
└── pages/             # Custom standalone pages
    └── [custom pages]
```

**Sidebar Organization:**
- Major product areas use subdirectories with separate `docs.js` and `reference.js`
- Smaller areas (JaaS, Tech Partner) use single files
- `index.js` imports and exports all sidebars
- `utils.js` provides shared sidebar helper functions

**Redirect Organization:**
- Each product area has dedicated redirect configuration
- Supports both server-side and client-side redirects
- See [Redirects](redirects.md) for configuration details

## Scripts (`scripts/`)

Custom build, validation, and maintenance scripts.

```
scripts/
├── analyze-broken-links.js    # Find and analyze broken links
├── validate-content.js         # Validate content quality rules
├── validate-sidebar.js         # Validate sidebar consistency
├── validate-openapi.js         # Validate OpenAPI specs with filtering
└── lowercase-operation-ids.js  # Convert OpenAPI operation IDs
```

**Available via yarn commands:**
- `yarn validate:links` - Run link analysis
- `yarn validate:content` - Validate content quality
- `yarn validate:sidebar` - Validate sidebar structure
- `yarn validate:openapi [folder]` - Validate OpenAPI specs
- `yarn lowercase-operationids` - Process operation IDs

See [Development Scripts](development-scripts.md) for complete command reference.

## Swizzled Theme Components (`src/`)

The `src/` directory contains customized Docusaurus theme components that override the default theme behavior. This directory uses Docusaurus's "swizzling" feature to wrap or replace built-in components.

```
src/
└── theme/              # Swizzled theme components
    └── DocRoot/        # Document root wrapper
        └── index.js    # Wraps DocRoot to add SectionNavigation
```

### What is Swizzling?

Swizzling is Docusaurus's method for customizing theme components. When you "swizzle" a component, you create a local copy that takes precedence over the theme's default component.

### Current Swizzled Components

**`src/theme/DocRoot/index.js`**
- **Purpose:** Wraps the default DocRoot component to inject the SectionNavigation component above all documentation pages
- **Component:** `DocRoot` - The root component that wraps all documentation content
- **Customization:** Adds `<SectionNavigation />` component for product area navigation tabs
- **Original Import:** `@theme-original/DocRoot` - References the original theme component

**Example structure:**
```javascript
import React from 'react';
import DocRoot from '@theme-original/DocRoot';
import SectionNavigation from '@site/docusaurus/components/SectionNavigation';

export default function DocRootWrapper(props) {
  return (
    <>
      <SectionNavigation />
      <DocRoot {...props} />
    </>
  );
}
```

### Important Notes

**Path is Hardcoded by Docusaurus:**
- The `src/theme/` path is **hardcoded** in Docusaurus and **cannot be configured**
- Docusaurus automatically looks for theme component overrides in `src/theme/`
- There is no configuration option to change this path
- Attempting to move swizzled components elsewhere will break the site

**Adding New Swizzled Components:**
1. Use the Docusaurus CLI: `yarn docusaurus swizzle [theme-name] [component-name]`
2. Choose "Wrap" (recommended) or "Eject" (use with caution)
3. Component will be created in `src/theme/[ComponentName]/`
4. Customize the component as needed

**Best Practices:**
- Prefer "wrapping" over "ejecting" components when possible
- Keep customizations minimal to ease future Docusaurus upgrades
- Document why each component was swizzled
- Test thoroughly after swizzling, especially after Docusaurus version updates

### Related Documentation

- [Docusaurus Swizzling Guide](https://docusaurus.io/docs/swizzling)
- [Development Scripts](development-scripts.md) - Building and testing the site

## Technical Notes (`technical-notes/`)

Development documentation for contributors and maintainers.

```
technical-notes/
├── project-structure.md          # This file
├── development-scripts.md        # Yarn command reference
├── content-validation.md         # Content quality validation
├── sidebar-validation.md         # Sidebar consistency checking
├── sidebar-deprecation-pattern.md # Deprecation marking patterns
├── openapi-validation.md         # OpenAPI spec validation
├── lowercase-operation-ids.md    # OpenAPI operation ID processing
├── analyze-broken-links.md       # Link validation tool
├── redirects.md                  # URL redirect management
├── search.md                     # Search functionality configuration
└── known-issues.md              # Known limitations and workarounds
```

**Purpose:**
- Document development workflows
- Explain custom scripts and tools
- Provide troubleshooting guidance
- Record architectural decisions

## Configuration Files

### `docusaurus.config.js`

Main Docusaurus configuration file containing:
- Site metadata (title, tagline, URL)
- Navigation bar structure
- Footer configuration
- Plugin configurations (OpenAPI, redirects, search)
- Theme settings (dark mode, sidebar behavior)
- OpenAPI documentation generation settings

**Key Sections:**
```javascript
{
  // Site metadata
  title, tagline, url, baseUrl

  // Documentation settings
  docs: { routeBasePath, sidebarPath }

  // Plugins
  plugins: [
    'docusaurus-plugin-openapi-docs',
    '@docusaurus/plugin-client-redirects',
    // Custom plugins
  ]

  // Theme configuration
  themeConfig: { navbar, footer, prism }
}
```

### `package.json`

Node.js project configuration:
- Dependencies (Docusaurus, OpenAPI plugin, Redocly CLI)
- Scripts (build, start, validation commands)
- Package manager specification (Yarn 4.2.2)
- Browser compatibility targets

**Key Scripts:**
- Build: `yarn build`, `yarn start`, `yarn serve`
- Validation: `yarn validate:content`, `yarn validate:sidebar`, `yarn validate:oas`
- Reference: `yarn reference:generate`, `yarn reference:clean`
- Formatting: `yarn format:check`, `yarn format:write`

### `babel.config.js`

Babel transpiler configuration for JavaScript/React code transformation.

## Generated Directories (Git-Ignored)

### `.docusaurus/`

Docusaurus-generated files during development and build:
- Compiled configuration
- Client bundles
- Route metadata
- Plugin data

**Note:** Automatically regenerated, never commit to git.

### `build/`

Production build output:
- Optimized static HTML files
- Minified JavaScript bundles
- Processed CSS
- Optimized images
- Search index

**Note:** Generated by `yarn build`, never commit to git.

### `node_modules/`

Node.js dependencies installed by Yarn.

**Note:** Managed by `yarn install`, never commit to git.

## File Naming Conventions

### Markdown Files
- Use lowercase with hyphens: `getting-started.md`
- Be descriptive: `webhook-configuration.md`
- Avoid generic names: Use `api-authentication.md` not `auth.md`

### Images
- Use descriptive names: `dashboard-overview.png`
- Include context: `connect-api-flow-diagram.svg`
- Use hyphens, not underscores or spaces

### OpenAPI Specs
- Use descriptive names: `messaging-api.yaml`
- Can use versioning: `messaging-api-v2.yaml`
- Common schemas: `common-schemas.yaml`

## Special Files

### `CLAUDE.md`
High-level repository overview for Claude Code AI assistant. Contains:
- Brief repository description
- Quick reference for common tasks
- Links to detailed documentation

### `CONTRIBUTING.md`
Comprehensive contribution guidelines covering:
- Team ownership model
- Development workflow
- Documentation standards
- Review process
- Quality requirements

### `README.md`
Project introduction visible on GitHub. Includes:
- Project description
- Quick start instructions
- Links to documentation
- Contribution information

## Navigation Between Directories

### Documentation Workflow

1. **Create/edit guides** in `docs/[product]/docs/`
2. **Create/edit OpenAPI specs** in `docs_oas/[product]/`
3. **Generate API docs** with `yarn reference:generate`
4. **Configure navigation** in `docusaurus/sidebars/[product]/`
5. **Test locally** with `yarn start`
6. **Validate** with validation scripts
7. **Build** with `yarn build`

### Finding Content

| Content Type | Location | Example |
|--------------|----------|---------|
| User guides | `docs/[product]/docs/` | `docs/connect/docs/getting-started.md` |
| API reference | `docs/[product]/reference/` | `docs/connect/reference/send-message.api.mdx` |
| OpenAPI source | `docs_oas/[product]/` | `docs_oas/connect/messaging-api.yaml` |
| Images | `docs/[product]/images/` | `docs/connect/images/api-flow.png` |
| Sidebars | `docusaurus/sidebars/[product]/` | `docusaurus/sidebars/connect/docs.js` |
| Redirects | `docusaurus/redirects/` | `docusaurus/redirects/connect.js` |
| Scripts | `scripts/` | `scripts/validate-content.js` |
| Tech docs | `technical-notes/` | `technical-notes/development-scripts.md` |

## Best Practices

### Directory Organization
- Keep product areas self-contained within `docs/[product]/`
- Store all product images in `docs/[product]/images/`
- Use consistent subdirectory structure across products

### OpenAPI Management
- Keep OpenAPI source files in `docs_oas/[product]/`
- Never manually edit files in `docs/[product]/reference/`
- Regenerate API docs after OpenAPI changes
- Split large specs into multiple files for maintainability

### Sidebar Management
- Major products use subdirectories (`docs.js` + `reference.js`)
- Update sidebar when adding/removing documentation
- Run `yarn validate:sidebar` to check consistency
- See [Sidebar Validation](sidebar-validation.md) for details

### Content Quality
- Run `yarn validate:content` before committing
- Check for broken links with `yarn validate:links`
- Validate OpenAPI specs with `yarn validate:oas`
- Format code with `yarn format:write`

## Related Documentation

- [CLAUDE.md](../CLAUDE.md) - Repository overview
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [Development Scripts](development-scripts.md) - Complete command reference
- [Sidebar Validation](sidebar-validation.md) - Sidebar consistency checking
- [Content Validation](content-validation.md) - Content quality rules
- [OpenAPI Validation](openapi-validation.md) - OpenAPI spec validation
- [Redirects](redirects.md) - URL redirect management
