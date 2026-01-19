# TabbedExternalCodeSample Component

React component that fetches and displays code samples from external files at runtime. Maintains the same collapsible, tabbed UX as inline code blocks, fetching code from the Docusaurus server's static files.

## Features

- ✅ **Runtime fetching** - Always displays the latest code from external files
- ✅ **Explicit language configuration** - Specify exactly which languages to load
- ✅ **Browser caching** - 1-hour localStorage cache for performance
- ✅ **Tab synchronization** - All code samples switch languages together
- ✅ **Lazy loading** - Code samples only load when details element is expanded
- ✅ **Graceful degradation** - Only renders tabs for files that exist
- ✅ **Minimal UI** - Clean error states with debugging in console

## Usage

### Basic Example

```jsx
import TabbedExternalCodeSample from '@site/docusaurus/components/TabbedExternalCodeSample';

<TabbedExternalCodeSample
  path="example_code/administration/users-api/auth-example"
  title="Example: Authentication"
  languages={[
    { ext: 'py', label: 'Python', syntax: 'python' },
    { ext: 'js', label: 'Node.js', syntax: 'javascript' },
    { ext: 'sh', label: 'cURL', syntax: 'bash' }
  ]}
/>
```

### With Custom Default Language

```jsx
<TabbedExternalCodeSample
  path="example_code/meetings-api/create-meeting"
  title="Example: Create Meeting"
  languages={[
    { ext: 'py', label: 'Python', syntax: 'python' },
    { ext: 'go', label: 'Go', syntax: 'go' }
  ]}
  defaultLanguage="go"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `path` | `string` | **Required** | Path to code sample directory (e.g., "example_code/users-api/auth-example") |
| `title` | `string` | `"Code Example"` | Display title for collapsible section |
| `languages` | `Array<Language>` | **Required** | Language configuration array - must specify which languages to load |
| `defaultLanguage` | `string` | `'py'` | Default tab to show (file extension) |
| `groupId` | `string` | `'code-samples'` | Tab group ID for synchronization |

### Language Object

```typescript
{
  ext: string;      // File extension (e.g., 'py', 'js', 'sh')
  label: string;    // Display name in tab (e.g., 'Python', 'Node.js')
  syntax: string;   // Prism syntax highlighting (e.g., 'python', 'javascript')
}
```

## Directory Structure

Code samples must follow this structure in your project:

```
example_code/
└── <category>/           # e.g., administration
    └── <api-name>/       # e.g., users-api
        └── <sample-id>/  # e.g., auth-example
            ├── example.py
            ├── example.js
            ├── example.sh
            └── ...
```

The component attempts to fetch `example.{ext}` for each language in the configuration.

## Specifying Languages

Each component instance **must** specify which languages to load via the `languages` prop. This ensures predictable performance and explicitly documents which code examples are available.

### Common Language Configurations

```javascript
// Python, Node.js, and cURL (most common)
languages={[
  { ext: 'py', label: 'Python', syntax: 'python' },
  { ext: 'js', label: 'Node.js', syntax: 'javascript' },
  { ext: 'sh', label: 'cURL', syntax: 'bash' }
]}

// Additional compiled languages
languages={[
  { ext: 'py', label: 'Python', syntax: 'python' },
  { ext: 'js', label: 'Node.js', syntax: 'javascript' },
  { ext: 'go', label: 'Go', syntax: 'go' },
  { ext: 'java', label: 'Java', syntax: 'java' }
]}

// Custom subset
languages={[
  { ext: 'rs', label: 'Rust', syntax: 'rust' },
  { ext: 'go', label: 'Go', syntax: 'go' }
]}
```

### Available Language Options

Common language configurations (use as reference):

- Python: `{ ext: 'py', label: 'Python', syntax: 'python' }`
- Node.js: `{ ext: 'js', label: 'Node.js', syntax: 'javascript' }`
- cURL: `{ ext: 'sh', label: 'cURL', syntax: 'bash' }`
- Go: `{ ext: 'go', label: 'Go', syntax: 'go' }`
- Java: `{ ext: 'java', label: 'Java', syntax: 'java' }`
- Ruby: `{ ext: 'rb', label: 'Ruby', syntax: 'ruby' }`
- PHP: `{ ext: 'php', label: 'PHP', syntax: 'php' }`
- C#: `{ ext: 'cs', label: 'C#', syntax: 'csharp' }`
- TypeScript: `{ ext: 'ts', label: 'TypeScript', syntax: 'typescript' }`
- Swift: `{ ext: 'swift', label: 'Swift', syntax: 'swift' }`
- Kotlin: `{ ext: 'kt', label: 'Kotlin', syntax: 'kotlin' }`
- Rust: `{ ext: 'rs', label: 'Rust', syntax: 'rust' }`

## Caching Behavior

### Cache Key
```javascript
`code_${path}`
```

The cache key is based solely on the path to ensure consistent caching across all environments.

### Cache TTL
- **Duration**: 1 hour (3600000 milliseconds)
- **Storage**: Browser localStorage
- **Persistence**: Survives page reloads and browser restarts

### Clear Cache

**All samples:**
```javascript
localStorage.clear()
```

**Specific sample:**
```javascript
// Remove cache for specific path
localStorage.removeItem('code_example_code/users-api/auth-example')
```

**Programmatic cache bypass:**
```javascript
// Set TTL to 0 for testing
const TTL = 0; // or any low value
```

## How It Works

1. **Component mounts** → Collapsed state (no fetching yet)
2. **User expands details** → Check localStorage for cached code
3. **Cache hit** (< 1 hour old) → Display cached code immediately
4. **Cache miss or expired** → Fetch specified languages from server (preferred language first, then others in parallel)
5. **All fetches complete** → Render tabs for successful files only
6. **Cache successful results** → Store in localStorage with timestamp
7. **Render** → Collapsible details with synchronized tabs

## Error Handling

### UI Display (Minimal)
- ⚠️ **Error loading code samples** - Fetch/network error
- ⚠️ **No code samples found** - No files returned 200 OK

### Console Logging (Detailed)
All debugging information is logged to the browser console (non-production only):
- Failed fetch attempts per language
- Expected files list
- Cache read/write errors

### Common Issues

**404 Errors**
- Verify the code sample files exist in the `example_code/` directory
- Check that files are named `example.{ext}` (e.g., `example.py`, `example.js`)
- Ensure the `path` prop matches the directory structure

**Stale Cache**
- Clear localStorage to force fresh fetch
- Check cache TTL in code (currently 1 hour)

## Environment Configuration

The component fetches code samples from the Docusaurus server. For test environments with different base URLs, you can configure the fetch location using the `BASE_URL` environment variable.

### How It Works

**Default Behavior (Development & Production):**
- Fetches from server root: `/example_code/{path}/example.{ext}`
- Example: `/example_code/users-api/auth-example/example.py`

**Test Environment with BASE_URL:**
- Set `BASE_URL` environment variable to specify a different server
- Fetches from: `{BASE_URL}/{path}/example.{ext}`
- Example: `https://test.example.com/example_code/users-api/auth-example/example.py`

### Using BASE_URL

Set the environment variable before starting your build or dev server:

**Development with custom base URL:**
```bash
BASE_URL=https://staging.example.com npm start
```

**Build for test environment:**
```bash
BASE_URL=https://test.example.com npm run build
```

**Build for production (no BASE_URL needed):**
```bash
npm run build
```

### Static Files Configuration

Ensure your `docusaurus.config.js` includes the `example_code` directory in static directories:

```javascript
staticDirectories: [
  path.resolve(__dirname, 'docusaurus/static'),
  path.resolve(__dirname, 'example_code'),  // Serves code samples
],
```

This makes code samples available at `/example_code/...` URLs when the dev server or build is served.

## Files in This Directory

```
TabbedExternalCodeSample/
├── index.jsx          # Main component
├── languageConfig.js  # Default language configurations
├── logger.js          # Environment-aware logging utility
└── README.md          # This file
```

## Related Documentation

- [Docusaurus Components Guide](https://docusaurus.io/docs/markdown-features/react)
- [Docusaurus Static Assets](https://docusaurus.io/docs/static-assets)
- [Prism Syntax Highlighting](https://prismjs.com/#supported-languages)

## Future Enhancements

Potential improvements for future versions:

- [ ] Build-time fetching option (static generation)
- [ ] Prefetching/lazy loading strategies
- [ ] Analytics tracking (views, language preferences)
- [ ] In-browser code execution (Pyodide, etc.)
- [ ] Sample metadata from JSON manifest
- [ ] Custom file naming patterns beyond `example.{ext}`
