# Example Code Static Content Serving

## Overview

Code example files in `example_code/` are served as static content via Docusaurus's `staticDirectories` configuration and fetched at runtime by the `TabbedExternalCodeSample` component.

## Configuration

**docusaurus.config.js:**
```javascript
staticDirectories: [
  path.resolve(__dirname, 'docusaurus/static'),
  path.resolve(__dirname, 'example_code'),
],
```

**Key Behavior:** Docusaurus serves directory **contents** at root, not the directory itself.

**Path Mapping:**
- Physical: `example_code/administration/users-api/auth-test-credentials/example.py`
- Served at: `/administration/users-api/auth-test-credentials/example.py`
- ⚠️ The `example_code/` prefix is **not** in the URL

## Component Implementation

**Component:** `docusaurus/components/TabbedExternalCodeSample/index.jsx`

### Path Processing

Component receives path with `example_code/` prefix but strips it before fetching:

```javascript
// Usage
<TabbedExternalCodeSample
  path="example_code/administration/users-api/auth-test-credentials"
/>

// Internal processing
const cleanPath = path.replace(/^example_code\//, '');
const fetchBaseUrl = `${envBaseUrl}/${cleanPath}`;
// Fetches: /administration/users-api/auth-test-credentials/example.py
```

### Environment Support

```javascript
const envBaseUrl = process.env.BASE_URL || '';
```

- **Development/Production:** Fetches from `/administration/...`
- **Test Environment:** `BASE_URL=https://test.example.com` → Fetches from `https://test.example.com/administration/...`

## Request Flow

1. Component receives path → checks cache (1-hour TTL)
2. Strips `example_code/` prefix
3. Fetches all language variants in parallel: `/path/to/example.{ext}`
4. Caches successful responses

## Troubleshooting

**Files not loading:**
- Verify files exist: `ls -la example_code/administration/users-api/...`
- Check fetch URL in DevTools (should **not** include `example_code/`)
- Clear cache: `localStorage.clear()`
- Restart dev server after config changes

**200 OK with empty content:**
- Path prefix stripping may not be working
- Verify `example_code` is in `staticDirectories`

## Related Files

- `docusaurus/components/TabbedExternalCodeSample/index.jsx` - Component implementation
- `docusaurus.config.js` - staticDirectories configuration
- `example_code/` - Code sample files

## References

- [Docusaurus Static Assets](https://docusaurus.io/docs/static-assets)
- [Component README](../docusaurus/components/TabbedExternalCodeSample/README.md)
