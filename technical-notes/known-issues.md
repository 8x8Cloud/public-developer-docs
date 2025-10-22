# Known Issues

This document tracks known limitations and issues with the developer documentation site, particularly those that affect the development experience.

## Anchor Links Don't Scroll on Initial Page Load (Development Only)

### Issue Description

When running the local development server (`yarn start`), anchor/hash links do not scroll to the correct position when:
- Opening a link with a hash anchor in a new tab (e.g., `http://localhost:3000/connect/docs/call-action-handling#say`)
- Navigating to a hash link from an external source
- Pasting a URL with a hash anchor directly into the browser

### Expected Behavior

The page should automatically scroll to the anchor target (e.g., the `#say` heading) after the page loads.

### Actual Behavior

The page loads at the top and does not scroll to the anchor target, even though the anchor exists on the page.

### Root Cause

This is a known limitation of Docusaurus in development mode. The development server does not use Server-Side Rendering (SSR), which causes issues with anchor scrolling on initial page load. The browser attempts to scroll to the anchor before React has finished hydrating the page and before all content (especially images) has loaded.

### Workaround

**In-page navigation works correctly**: Clicking on anchor links within the same page (e.g., from the table of contents) works as expected.

**Production builds work correctly**: This issue does NOT occur in production builds. To test anchor links properly:

```bash
yarn build
yarn serve
```

Then test the anchor links at `http://localhost:3000/connect/docs/call-action-handling#say` - they will scroll correctly.

### Status

This is expected behavior in Docusaurus development mode and is not considered a bug requiring a fix. See related Docusaurus GitHub issues:
- [Issue #2399](https://github.com/facebook/docusaurus/issues/2399) - Markdown Header Anchor Links do not work on page load
- [Issue #3109](https://github.com/facebook/docusaurus/issues/3109) - Hash link jumping not working when opening a new tab

### Recommendation

When testing documentation with anchor links:
1. Test in-page navigation during development (clicking links within the page)
2. Verify cross-page anchor navigation in production builds before deploying
3. Do not spend time trying to "fix" this in development mode - it's expected behavior
