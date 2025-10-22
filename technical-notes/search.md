# Search Functionality

This document describes the search implementation for the 8x8 Developer Portal.

## Overview

The 8x8 Developer Portal uses **@easyops-cn/docusaurus-search-local** for client-side search functionality. This plugin provides instant, offline search capabilities without requiring external services or infrastructure.

**Plugin Repository:** https://github.com/easyops-cn/docusaurus-search-local

## Benefits

### For Users
- **Instant Search**: No network latency - search runs entirely in the browser
- **Offline Capability**: Search works without internet connection after initial page load
- **Privacy-Friendly**: No search queries sent to external servers
- **Professional UX**: Polished UI similar to commercial search solutions like Algolia
- **Search Term Highlighting**: Found terms are highlighted on target pages

### For Development Team
- **Zero Cost**: No subscription fees or infrastructure costs
- **Zero Maintenance**: No servers to manage, monitor, or update
- **Simple Setup**: Works out of the box with minimal configuration
- **No External Dependencies**: No reliance on third-party services or availability
- **Build-Time Indexing**: Search index generated automatically during production builds

### Technical Benefits
- **Scales with Content**: Efficiently handles large documentation sites
- **Automatic Updates**: Index regenerates on every build with latest content
- **Cache-Friendly**: Hashed filenames enable aggressive browser caching
- **Compact Index**: Search index is optimized and compressed for fast downloads

## Configuration

The search plugin is configured in `docusaurus.config.js`:

```javascript
themes: [
  "docusaurus-theme-openapi-docs",
  [
    require.resolve("@easyops-cn/docusaurus-search-local"),
    {
      hashed: true,
      language: ["en"],
      highlightSearchTermsOnTargetPage: true,
      explicitSearchResultPath: true,
      docsRouteBasePath: "/",
    },
  ],
],
```

### Key Configuration Options

- **`hashed: true`** - Enables cache-busting with hashed filenames
- **`language: ["en"]`** - Configured for English language support
- **`highlightSearchTermsOnTargetPage: true`** - Highlights search terms when users click results
- **`explicitSearchResultPath: true`** - Shows full paths in search results
- **`docsRouteBasePath: "/"`** - Required for docs-only mode (when docs use `routeBasePath: "/"`)

## Development Experience

### Important: Search Requires Production Build

⚠️ **The search functionality does NOT work in development mode (`yarn start`).**

This is a limitation of the plugin - the search index is only generated during production builds.

### Development Workflow

To test search functionality during development:

1. **Build the production site:**
   ```bash
   yarn build
   ```
   This generates the search index at `build/search-index.json`

2. **Serve the production build locally:**
   ```bash
   yarn serve
   ```
   The site will be available at http://localhost:3000

3. **Test search:**
   - Use the search bar in the navbar
   - Search queries will return instant results
   - Click results to navigate to pages with highlighted search terms

### Why Search Doesn't Work in Development Mode

The plugin generates the search index by analyzing the complete static HTML output from the production build. This allows it to:
- Extract all text content from rendered pages
- Build accurate search index with proper URLs
- Include metadata and headings for better search results

In development mode (`yarn start`), pages are generated dynamically on-demand, so there's no complete static site to index.

## Search Index Details

### Index Generation
- **Location**: `build/search-index.json`
- **Format**: JSON containing documents, search terms, and metadata
- **Generation Time**: Adds time to production build for indexing all content

### Index Content
The search index includes:
- Page titles
- Page content (body text)
- Headings (h1-h6)
- URLs and breadcrumbs
- Metadata

### Cache Strategy
The plugin uses hashed filenames (e.g., `search-index.json?_=2d9c2cb4`) to enable browser caching while ensuring users always get the latest index after deployments.

## Troubleshooting

### Search Returns 404 for search-index.json

**Cause**: Missing `docsRouteBasePath` configuration when using docs-only mode.

**Solution**: Ensure `docsRouteBasePath: "/"` is set in the plugin configuration to match the `routeBasePath` in your docs preset.

### Search Bar Appears but No Results

**Cause**: Search index not generated during build.

**Solution**:
1. Run `yarn build` to generate search index
2. Verify `build/search-index.json` exists and has content
3. Run `yarn serve` to test with the production build

### Search Not Working in Development

**Expected Behavior**: Search only works in production builds (`yarn build` + `yarn serve`), not in development mode (`yarn start`).

## References

- Plugin Documentation: https://github.com/easyops-cn/docusaurus-search-local
- Plugin npm Package: https://www.npmjs.com/package/@easyops-cn/docusaurus-search-local
- Docusaurus Search Guide: https://docusaurus.io/docs/search
