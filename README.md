# developer-docs

Documentation source for 8x8 Developer Portal [developer.8x8.com](https://developer.8x8.com/) - APIs, SDKs, guides, and integration resources for 8x8 platform developers.

Built with [Docusaurus](https://docusaurus.io/), a modern static site generator optimized for technical documentation.

## Development Scripts

For detailed documentation on all development scripts, see [Development Scripts](technical-notes/development-scripts.md).

**Quick reference:**
- `yarn start` - Start development server with hot-reloading
- `yarn build` - Production build and validation
- `yarn serve` - Serve production build locally
- `yarn clear` - Clear Docusaurus cache

---

## Development Workflow

**Starting work:**
```bash
yarn install    # Install/update dependencies (first time or after pulling changes)
yarn start      # Start development server
```

**During development:**
- Make incremental changes and review in browser at `http://localhost:3000`
- Monitor terminal output for warnings or errors
- Test navigation through sidebar menus

**Before committing:**
```bash
yarn build      # Validate everything builds successfully
```

**If build fails:**
```bash
yarn clear      # Clear cache
yarn build      # Try again
```

---

## Repository Structure

For detailed repository structure, see [Project Structure](technical-notes/project-structure.md).

---

## Technical Notes

All technical patterns and decisions are documented in the [`technical-notes/`](technical-notes/) directory:

- [Development Scripts](technical-notes/development-scripts.md) - Detailed yarn command documentation
- [Sidebar Deprecation Pattern](technical-notes/sidebar-deprecation-pattern.md) - How to mark deprecated documentation in navigation

---

## Additional Resources

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Live Site: developer.8x8.com](https://developer.8x8.com)
