# Redirects

This document explains how to configure redirects in the 8x8 Developer Portal documentation site.

## Overview

The site uses **two complementary redirect mechanisms** to handle URL redirects:

1. **`@docusaurus/plugin-client-redirects`** - Official plugin that generates static HTML redirect files for external links and bookmarks
2. **Custom client-side-redirects plugin** - Custom plugin that adds React Router redirects for internal navigation

Both plugins work together to provide complete redirect coverage.

## How It Works

### Static HTML Redirects (External Links)

The official `@docusaurus/plugin-client-redirects` generates static HTML files at build time for each redirect. When a user visits an old URL via:
- Direct URL entry in browser
- External links from other sites
- Bookmarks

The HTML file executes JavaScript to redirect them to the new URL using `window.location.replace()`.

### React Router Redirects (Internal Navigation)

The custom `client-side-redirects` plugin adds redirect routes directly to React Router. When a user navigates via:
- Navbar links
- Section navigation tabs
- Internal markdown links
- Any Link component in the site

React Router handles the redirect client-side without requiring a full page load.

**Important:** Both redirect mechanisms are active in production builds. In development mode, only React Router redirects work.

## Configuration

Redirects are configured using modular files organized by documentation section:

1. **`docusaurus/redirects/`** - Directory containing all redirect configurations:
   - **`index.js`** - Main file that aggregates all section redirects (single source of truth)
   - **`actions-events.js`** - Actions & Events section redirects
   - **`analytics.js`** - Analytics section redirects
   - **`connect.js`** - Connect CPaaS section redirects
   - **`contactcenter.js`** - Contact Center section redirects
   - **`jaas.js`** - JaaS section redirects
   - **`tech-partner.js`** - Tech Partner section redirects
2. **`docusaurus.config.js`** - Registers both plugins and imports the redirect configuration
3. **`docusaurus/plugins/client-side-redirects/index.js`** - Custom plugin implementation
4. **`docusaurus/plugins/client-side-redirects/RedirectComponent.js`** - React component for redirects

### File Structure

**Directory Layout:**
```
docusaurus/redirects/
├── index.js              # Aggregates all section redirects
├── actions-events.js     # Actions & Events redirects
├── analytics.js          # Analytics redirects
├── connect.js            # Connect CPaaS redirects
├── contactcenter.js      # Contact Center redirects
├── jaas.js               # JaaS redirects
└── tech-partner.js       # Tech Partner redirects
```

**Section File Example (`docusaurus/redirects/actions-events.js`):**
```javascript
// Actions & Events redirects
const redirects = [
  {
    from: ['/actions-events', '/actions-events/docs'],
    to: '/actions-events/docs/introduction',
  },
  {
    from: '/actions-events/reference',
    to: '/actions-events/reference/getwebhooks-1',
  },
  // ... more redirects ...
];

module.exports = redirects;
```

**Main Index File (`docusaurus/redirects/index.js`):**
```javascript
// Redirect configurations for the 8x8 Developer Portal
const actionsEventsRedirects = require('./actions-events.js');
const analyticsRedirects = require('./analytics.js');
const connectRedirects = require('./connect.js');
const contactCenterRedirects = require('./contactcenter.js');
const jaasRedirects = require('./jaas.js');
const techPartnerRedirects = require('./tech-partner.js');

const redirects = [
  ...actionsEventsRedirects,
  ...analyticsRedirects,
  ...connectRedirects,
  ...contactCenterRedirects,
  ...jaasRedirects,
  ...techPartnerRedirects,
];

module.exports = redirects;
```

**Usage in `docusaurus.config.js`:**
```javascript
const redirects = require('./docusaurus/redirects/index.js');

// ... later in config ...
plugins: [
  // Static HTML redirects for external links
  [
    '@docusaurus/plugin-client-redirects',
    {
      redirects,
    },
  ],
  // React Router redirects for internal navigation
  path.resolve(__dirname, 'docusaurus/plugins/client-side-redirects'),
],
```

## Adding New Redirects

To add a new redirect:

1. **Identify the documentation section** for the redirect (Actions & Events, Analytics, Connect, Contact Center, JaaS, or Tech Partner)
2. **Open the corresponding section file** in `docusaurus/redirects/`:
   - Actions & Events → `actions-events.js`
   - Analytics → `analytics.js`
   - Connect CPaaS → `connect.js`
   - Contact Center → `contactcenter.js`
   - JaaS → `jaas.js`
   - Tech Partner → `tech-partner.js`
3. **Add a new redirect object** to the array:

```javascript
{
  from: '/old-url-path',
  to: '/new-url-path',
},
```

4. **Save the file** - no changes needed to `index.js`, `docusaurus.config.js`, or plugin files
5. Both redirect mechanisms will automatically pick up the new redirect

**Important Notes:**
- Paths should start with `/` and be relative to the site root
- Both `from` and `to` paths should not include the domain name
- Multiple `from` paths can redirect to the same `to` path (use an array for `from`)
- One `from` path cannot redirect to multiple destinations
- The redirect works immediately for internal navigation (React Router)
- The redirect works for external links after building (static HTML)
- Keep redirects organized within the appropriate section file for maintainability

## Organization Benefits

The modular redirect structure provides several advantages:

### Better Organization
- Redirects are grouped by documentation section (Actions & Events, Analytics, Connect, etc.)
- Each section file contains only redirects relevant to that product area
- Easier to find and review redirects for a specific section

### Improved Maintainability
- Smaller, focused files are easier to understand and modify
- Changes to one section don't require scrolling through unrelated redirects
- Reduced risk of merge conflicts when multiple people work on different sections

### Matches Documentation Structure
- Redirect organization mirrors the documentation structure
- Intuitive mapping: Connect docs → `connect.js`, JaaS docs → `jaas.js`
- Consistent with how sidebars and other configuration files are organized

### Easy to Extend
- Adding a new documentation section just requires creating a new file and importing it in `index.js`
- No need to modify existing section files when adding new product areas

### Multiple Old URLs to One New URL

If you need multiple old URLs to redirect to the same new URL:

```javascript
{
  from: ['/old-path-1', '/old-path-2', '/old-path-3'],
  to: '/new-path',
},
```

## Testing Redirects

Redirect behavior differs between development and production modes:

### Testing in Development Mode (`yarn start`)

**React Router redirects work immediately:**
- Navbar link clicks
- Section navigation tabs
- Internal markdown links
- All Link component navigation

**Static HTML redirects do NOT work:**
- Direct URL entry in browser
- External link simulation

This is expected because the static HTML files are only generated during production builds.

### Testing in Production Mode

1. Build the production site:
   ```bash
   yarn build
   ```

2. Serve the production build locally:
   ```bash
   yarn serve
   ```

3. Test both redirect types:
   - **Internal navigation**: Click navbar links, section tabs, markdown links
   - **External links**: Enter URLs directly in browser address bar

Both redirect mechanisms should work in production builds.

## Why Two Redirect Mechanisms?

Docusaurus uses different navigation methods depending on how users access pages:

### The Problem

The official `@docusaurus/plugin-client-redirects` only creates static HTML redirect files. These work great for:
- External links from other sites
- Bookmarks
- Direct URL entry

But they **don't work** for internal client-side navigation because Docusaurus uses React Router, which bypasses the static HTML files when navigating between pages.

### The Solution

Our custom `client-side-redirects` plugin adds redirect routes directly to React Router's configuration. This makes redirects work for:
- Navbar clicks
- Section navigation tabs
- Markdown links
- Any `<Link>` component

### Complete Coverage

Together, both plugins provide complete redirect coverage:
- **Custom plugin** → Handles internal navigation (React Router level)
- **Official plugin** → Handles external links (static HTML files)
- **Single config** → Both plugins read from `docusaurus/redirects/index.js`

## Advanced Configuration

The official plugin supports advanced redirect patterns using the `createRedirects` function. See the [official documentation](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects) for more details.

**Note:** The custom `client-side-redirects` plugin currently only supports the `redirects` array from the configuration file, not the `createRedirects` function.

### Example: Pattern-Based Redirects

```javascript
[
  '@docusaurus/plugin-client-redirects',
  {
    createRedirects(existingPath) {
      if (existingPath.includes('/docs/')) {
        // Create a redirect from /old-docs/ to /docs/
        return existingPath.replace('/docs/', '/old-docs/');
      }
      return undefined; // No redirect for this path
    },
  },
],
```

## Best Practices

1. **Keep redirects organized**: Place redirects in the appropriate section file based on the product area
2. **Group related redirects**: Within each section file, group related redirects together with comments
3. **Document the reason**: Add comments explaining why specific redirects exist
4. **Test before deploying**: Always build and serve locally to verify redirects work
5. **Clean up old redirects**: Periodically review and remove redirects that are no longer needed (after sufficient time has passed)
6. **Avoid redirect chains**: Don't redirect to a URL that itself redirects elsewhere
7. **Don't modify index.js**: When adding redirects, only edit section files; `index.js` automatically aggregates them

## Troubleshooting

### Redirect Not Working for Internal Navigation

If navbar links, section tabs, or markdown links don't redirect:

1. **Check React Router routes**: Verify the route was added
   ```bash
   grep "path: '/your-path'" .docusaurus/routes.js
   ```

2. **Verify configuration**: Check that the redirect exists in the appropriate `docusaurus/redirects/*.js` file

3. **Rebuild**: After adding redirects, restart dev server or rebuild
   ```bash
   yarn start  # or yarn build
   ```

4. **Check for conflicts**: If a real page exists at the `from` path, React Router will use that instead

### Redirect Not Working for External Links

If direct URL entry doesn't redirect (in production):

1. **Check the build output**: Verify the redirect HTML file was generated
   ```bash
   yarn build
   # Check build/old-path/index.html exists
   ```

2. **Check warnings**: The official plugin warns if it skips redirects due to conflicts
   ```
   [WARNING] @docusaurus/plugin-client-redirects: some redirects would override existing paths
   ```

3. **Verify paths**: Ensure both `from` and `to` paths start with `/`

### Build Warnings About Duplicate Routes

You may see warnings like:
```
[WARNING] @docusaurus/plugin-client-redirects: some redirects would override existing paths
```

**This is expected and not an error.** The custom plugin creates React Router routes first, then the official plugin skips creating HTML files for those paths (since they already have routes). Both mechanisms work correctly despite this warning.

## Custom Plugin Implementation

The custom `client-side-redirects` plugin is located in `docusaurus/plugins/client-side-redirects/` and consists of two files:

### `docusaurus/plugins/client-side-redirects/index.js`

This is the plugin entry point that:
1. Loads redirect configuration from `docusaurus/redirects/index.js`
2. Uses the `contentLoaded` lifecycle hook and `addRoute` action
3. Creates a route for each redirect `from` path
4. Passes the `to` path as a prop to the redirect component

### `docusaurus/plugins/client-side-redirects/RedirectComponent.js`

This is a React component that:
1. Receives the `redirectTo` prop from the route configuration
2. Returns a `<Redirect>` component from `@docusaurus/router`
3. Performs the actual client-side redirect

These files don't need to be modified when adding new redirects. Simply update the appropriate section file in `docusaurus/redirects/` and both plugins will pick up the changes automatically.

**Plugin Directory Structure:**
```
docusaurus/plugins/client-side-redirects/
├── index.js              # Plugin entry point
└── RedirectComponent.js  # React redirect component
```

This structure makes it easy to add more custom plugins in the future - each plugin gets its own directory under `docusaurus/plugins/`.

## Resources

- [Official Plugin Documentation](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects)
- [Docusaurus Configuration](https://docusaurus.io/docs/configuration)
- [Docusaurus Routing](https://docusaurus.io/docs/advanced/routing)
- [Docusaurus Plugin Lifecycle](https://docusaurus.io/docs/api/plugin-methods/lifecycle-apis)
