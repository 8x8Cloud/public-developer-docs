# Git-Based Guide Versioning

## Overview

This document describes a proposed approach for automatically versioning API guide documents using git commit history as the source of truth. The versioning scheme combines API version (from OpenAPI specs) with a guide revision number (from git commits) to create a fully automated, self-maintaining version system.

**Status**: Proof-of-concept design
**Target**: Administration API Suite guides (with potential future rollout to other API suites)
**Last Updated**: 2025-12-22

## Problem Statement

Currently, API guide documents have manual versioning with inconsistent patterns:
- Version numbers must be manually updated by authors
- "Last Updated" dates require manual maintenance
- Version format varies between guides (some use "Version: 1.0", others use "Document Version: 1.0" + "API Version: 1.0")
- No automatic relationship between guide changes and version bumps
- Risk of forgetting to update version numbers when making changes

**Key requirement**: Every change to a guide document should result in an automatic version bump without requiring manual intervention.

## Proposed Versioning Scheme

### Format

**API-Specific Guides**: `{major}.{minor}.{commits}`
- **Example**: `1.0.12`
  - `1.0` = API version from OpenAPI spec
  - `12` = Number of git commits that have touched this guide file

**Common/Multi-API Guides**: `0.0.{commits}` or `{commits}`
- **Example**: `0.0.8` or just `8`
  - No API major/minor version (not tied to a single API)
  - `8` = Number of git commits to the common guide file

### Examples

| Guide Document | OpenAPI Spec | Git Commits | Version |
|----------------|--------------|-------------|---------|
| user-management-api-guide.mdx | user-api-v1.yaml (v1.0) | 15 | 1.0.15 |
| site-management-api-guide.mdx | site-api-v1.yaml (v1.0) | 8 | 1.0.8 |
| administration-api-essentials.mdx | (none - common) | 12 | 0.0.12 |

## Current State Analysis

### Existing Structure

**Guide Documents**: Located in `/docs/administration/docs/`
- user-management-api-guide.mdx
- site-management-api-guide.mdx
- ring-group-management-api-guide.mdx
- administration-api-essentials.mdx
- suite-common.mdx

**OpenAPI Specifications**: Located in `/docs_oas/administration/`
- user-api-v1.yaml
- site-api-v1.yaml
- ringgroup-api-v1.yaml
- address-api-v1.yaml

**Current Version Display**: Metadata footer in each guide
```markdown
**Document Version**: 1.0
**API Version**: 1.0
**Last Updated**: December 22, 2025
```

### Docusaurus Built-in Git Features

Docusaurus has existing git integration features:
- `showLastUpdateTime`: Displays last git commit date
- `showLastUpdateAuthor`: Displays last git commit author
- These use `git log` at build time
- Only work in production builds (expensive operation)
- Require full git history (not shallow clones)

**However**: No built-in commit counting or version composition features exist.

## Implementation Approach

### High-Level Design

**Method**: Custom Docusaurus plugin + Frontmatter metadata

**Components**:
1. Frontmatter declaration linking guides to OpenAPI specs
2. Build-time plugin that computes versions from git history
3. Display mechanism (React component or metadata injection)

### Detailed Design

#### 1. Frontmatter Declaration

Add explicit linking metadata to each API-specific guide:

```markdown
---
api_spec: user-api-v1.yaml
---
# User Management API Guide
```

**For common guides** (no API relationship):
```markdown
---
# No api_spec field
---
# Administration API Essentials
```

**Benefits**:
- Explicit, not based on brittle naming conventions
- Easy to understand and maintain
- Flexible for edge cases (multi-API guides can specify primary API)

#### 2. Build-Time Version Computation

**Custom Docusaurus Plugin**: `docusaurus-plugin-git-version`

**Plugin responsibilities**:
1. Run during Docusaurus build process
2. Scan all documentation files for `api_spec` frontmatter
3. For each file:
   - Extract API version from linked OpenAPI spec
   - Count git commits for the file
   - Compose version string
   - Make version available to page metadata

**Git commit counting logic**:
```bash
# Count commits for specific file, following renames/moves
git log --follow --oneline -- path/to/guide.mdx | wc -l
```

**OpenAPI version extraction**:
```javascript
// Read OpenAPI spec YAML
const spec = yaml.load(fs.readFileSync('docs_oas/administration/user-api-v1.yaml'));
const apiVersion = spec.info.version; // "1.0"
```

**Version composition**:
```javascript
if (apiSpec) {
  // API-specific guide: {major}.{minor}.{commits}
  const [major, minor] = apiVersion.split('.');
  version = `${major}.${minor}.${commitCount}`;
} else {
  // Common guide: 0.0.{commits} or just {commits}
  version = `0.0.${commitCount}`;
}
```

#### 3. Display Mechanism

**Option A: Inject into Docusaurus page metadata**
- Plugin adds version to page's metadata object
- Template automatically renders it in footer

**Option B: Custom React component**
```jsx
// Usage in guide markdown:
<DocVersion />

// Renders: "Document Version: 1.0.12"
```

**Option C: Replace placeholder text**
- Guide contains placeholder: `{DOC_VERSION}`
- Plugin performs text replacement at build time

**Recommendation**: Options A or B (more robust than text replacement)

### Git as Source of Truth

**Key principle**: Git history is the single source of truth for versioning.

**Benefits**:
- ✅ Same commit → same git history → same version number
- ✅ Consistent across all build environments
- ✅ No manual intervention required
- ✅ Deterministic and reproducible

**Requirements**:
- Build environment must have git installed
- Must use **full git clone**, not shallow clone
  - Vercel: Set `VERCEL_DEEP_CLONE=true`
  - GitHub Actions: Use `fetch-depth: 0` in checkout action
  - GitLab CI: Set `GIT_DEPTH: 0`
- CI/CD must have access to full repository history

## Edge Cases and Solutions

### 1. File Renamed or Moved

**Solution**: Use `git log --follow`
- Tracks file through renames and moves
- Maintains full commit history across name changes
- Commit count continues from original file

**Example**:
```bash
# Original: docs/admin/user-guide.mdx (10 commits)
# Renamed to: docs/administration/docs/user-management-api-guide.mdx
# git log --follow still counts all 10 commits
```

### 2. File Copied from Another

**Behavior**: Starts fresh, only counts post-copy commits
- Git doesn't track copies as renames
- Commit count begins from 0 after copy operation

**Rationale**: Appropriate behavior - copied file is a new document

### 3. Multi-API Guide with Primary API

**Solution**: Specify primary API in frontmatter

```markdown
---
api_spec: user-api-v1.yaml  # Primary API for versioning
related_apis:
  - site-api-v1.yaml
  - ringgroup-api-v1.yaml
---
```

Version is anchored to primary API version.

### 4. Common Guide (No API Relationship)

**Solution**: Omit `api_spec` field

```markdown
---
# No api_spec
---
# Administration API Essentials
```

Version displays as `0.0.{commits}` or just `{commits}`.

### 5. Commit Counting Start Point

**Decision**: Count ALL commits in file history
- Start from first commit that created/touched the file
- No arbitrary date cutoffs
- Simple, deterministic, no configuration needed

**Alternative approaches** (not recommended):
- Count from specific date: Requires configuration, arbitrary
- Count from tag: Requires manual tag management
- Reset on API version bump: Complex logic, breaks monotonic increase

## Proof of Concept Plan

### Phase 1: Git Commit Counting Script

**Goal**: Validate git commit counting logic

**Deliverable**: Standalone script that:
- Takes file path as input
- Outputs commit count
- Handles renames with `--follow`
- Tests on existing Administration guides

**Script**: `scripts/count-commits.sh`
```bash
#!/bin/bash
file_path="$1"
git log --follow --oneline -- "$file_path" | wc -l
```

**Testing**:
```bash
./scripts/count-commits.sh docs/administration/docs/user-management-api-guide.mdx
# Output: 15
```

### Phase 2: OpenAPI Version Extraction

**Goal**: Extract version from OpenAPI specs

**Deliverable**: Node.js script that:
- Takes OpenAPI spec path as input
- Parses YAML
- Extracts `info.version`
- Outputs version string

**Script**: `scripts/extract-api-version.js`
```javascript
const fs = require('fs');
const yaml = require('js-yaml');

const specPath = process.argv[2];
const spec = yaml.load(fs.readFileSync(specPath, 'utf8'));
console.log(spec.info.version);
```

**Testing**:
```bash
node scripts/extract-api-version.js docs_oas/administration/user-api-v1.yaml
# Output: 1.0
```

### Phase 3: Manual Version Composition

**Goal**: Manually compose versions for all Administration guides

**Deliverable**: Document showing current versions if the system were implemented

**Process**:
1. For each guide in `/docs/administration/docs/`:
   - Count commits
   - Extract API version (if applicable)
   - Compose version string
2. Create comparison table: Current version vs Computed version

**Expected output**:
| Guide | Current | Computed | Notes |
|-------|---------|----------|-------|
| user-management-api-guide.mdx | 1.0 | 1.0.15 | 15 commits |
| site-management-api-guide.mdx | 1.0 | 1.0.8 | 8 commits |
| administration-api-essentials.mdx | N/A | 0.0.12 | Common guide |

### Phase 4: Simple Docusaurus Plugin

**Goal**: Create minimal plugin that injects versions

**Deliverable**: Basic Docusaurus plugin that:
- Reads frontmatter
- Computes versions
- Adds to page metadata
- No display mechanism yet (just metadata)

**Plugin structure**:
```
docusaurus/plugins/git-version/
├── index.js           # Plugin entry point
├── package.json       # Plugin dependencies
└── README.md          # Plugin documentation
```

**Testing**:
- Run `yarn build`
- Inspect page metadata in browser DevTools
- Verify versions are correct

### Phase 5: Display Component

**Goal**: Create React component to display version

**Deliverable**: `<DocVersion />` component that:
- Reads version from page metadata
- Renders formatted version string
- Handles API-specific vs common guide display

**Usage in guide**:
```markdown
**Document Version**: <DocVersion />
```

**Rendered output**:
```
Document Version: 1.0.15
```

### Phase 6: Full Integration

**Goal**: Deploy to Administration guides

**Process**:
1. Add `api_spec` frontmatter to all API-specific guides
2. Update guide templates to use `<DocVersion />`
3. Test locally with `yarn build`
4. Deploy to staging/preview
5. Validate versions in deployed site

### Phase 7: Documentation and Rollout

**Goal**: Document the system for future use

**Deliverables**:
- Update CLAUDE.md with versioning guidelines
- Create technical note for plugin usage
- Document frontmatter conventions
- Consider rollout to other API suites (Connect, Analytics, etc.)

## Build Environment Requirements

### Git Configuration

**Full clone required** (not shallow):
```yaml
# GitHub Actions
- uses: actions/checkout@v4
  with:
    fetch-depth: 0  # Full history

# GitLab CI
variables:
  GIT_DEPTH: 0

# Vercel
env:
  VERCEL_DEEP_CLONE: true
```

**Verification**:
```bash
# Check if full history is available
git log --oneline | wc -l
# Should show full commit count, not just recent commits
```

### Git Installation

Docker/CI environments must have git installed:
```dockerfile
# For Alpine-based images
RUN apk add --no-cache git

# For Debian-based images
RUN apt-get update && apt-get install -y git
```

### Shallow Clone Warning

If build uses shallow clone, plugin should:
- Detect shallow clone: `git rev-parse --is-shallow-repository`
- Warn user: "Git-based versioning requires full clone"
- Fallback: Display version as "unknown" or fallback to manual version

## Alternatives Considered

### 1. Naming Convention (File name → OpenAPI spec)

**Approach**: Auto-detect relationship by file name
- `user-management-api-guide.mdx` → `user-api-v1.yaml`

**Rejected because**:
- Brittle: Breaks if file names change
- Requires strict naming discipline
- Unclear for edge cases

### 2. Configuration File

**Approach**: Central config mapping guides to specs
```json
{
  "user-management-api-guide.mdx": "user-api-v1.yaml",
  "site-management-api-guide.mdx": "site-api-v1.yaml"
}
```

**Rejected because**:
- Extra file to maintain
- Duplicates information
- Frontmatter is more discoverable

### 3. Git Branch-Based Versioning (Antora approach)

**Approach**: Use git branches for versions (v1, v2, etc.)

**Rejected because**:
- Different paradigm than current workflow
- Requires branching strategy change
- Doesn't solve commit-level granularity

### 4. Manual Placeholder Replacement

**Approach**: Plugin replaces text placeholders
```markdown
Document Version: {DOC_VERSION}
```

**Rejected because**:
- Text replacement is fragile
- Hard to debug
- React components or metadata are more robust

### 5. Pre-commit Hook

**Approach**: Update version in file before commit

**Rejected because**:
- Creates modified files in working directory
- Complicates git workflow
- Build-time computation is cleaner

## Success Criteria

### Functional Requirements

✅ **Automatic version bumps**: Every commit to a guide increments the version
✅ **No manual intervention**: Authors never need to update version numbers
✅ **Consistent across environments**: Same commit = same version everywhere
✅ **Accurate API version**: Matches OpenAPI spec automatically
✅ **Handles renames**: Version history follows file through moves/renames
✅ **Clear display**: Version visible in guide footer

### Non-Functional Requirements

✅ **Performance**: Build time increase < 10 seconds for full site
✅ **Reliability**: No build failures due to missing git history
✅ **Maintainability**: Clear documentation for future developers
✅ **Extensibility**: Easy to apply to other API suites

### Validation Tests

1. **Basic versioning**: Create new guide, verify version is `{api}.0.1`
2. **Version increment**: Modify guide, verify version increments
3. **Rename handling**: Rename guide, verify version count continues
4. **Common guide**: Create guide without `api_spec`, verify `0.0.{commits}` format
5. **Multi-environment**: Build in CI/CD, verify same version as local
6. **API version sync**: Update OpenAPI spec version, verify guide version updates

## Open Questions

1. **Display format for common guides**: `0.0.{commits}` or just `{commits}`?
   - **Decision needed**: Choose one format for consistency

2. **Shallow clone fallback**: What version to display if full history unavailable?
   - Option A: Display "unknown"
   - Option B: Fall back to manual frontmatter version
   - Option C: Fail build with clear error message

3. **Cache invalidation**: Should plugin cache git log results during build?
   - Pro: Faster builds
   - Con: Complexity
   - Recommendation: Start without caching, optimize if needed

4. **Version display in API Reference**: Should auto-generated API reference pages also show version?
   - Currently applies only to guide documents
   - API reference is generated from OpenAPI specs
   - May want consistent versioning across guides and reference

5. **Commit message filtering**: Should certain commits be excluded from count?
   - Example: Skip commits with "[skip version]" in message
   - Recommendation: Count all commits (simpler, more transparent)

## Future Enhancements

### Phase 2 Features (Post-Rollout)

1. **Changelog generation**: Auto-generate changelog from commit messages
   - Link version numbers to git history
   - Display recent changes in guide

2. **Version comparison**: Show diff between guide versions
   - "What changed since v1.0.10?"
   - Link to git diff

3. **Version badge**: Display version as badge in page header
   - Visual indicator of documentation maturity
   - Color-coded by age or commit count

4. **Version API**: Expose versions via JSON API
   - Allow external tools to query documentation versions
   - Support automation and monitoring

5. **Multi-API version display**: For guides covering multiple APIs
   - Display versions for all related APIs
   - Example: "Covers User API v1.0, Site API v1.0"

6. **Rollout to other product areas**:
   - Apply to Connect CPaaS guides
   - Apply to Analytics API guides
   - Apply to Jaas guides

## References

### Research Sources

- [Docusaurus plugin-content-docs](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs)
- [Docusaurus showLastUpdateTime feature](https://github.com/facebook/docusaurus/issues/2798)
- [GitLab CI showLastUpdate configuration](https://bwgjoseph.com/docusaurus-how-to-enable-showlastupdate-feature-when-deployed-via-gitlab-ci)
- [Vercel deployment with git history](https://github.com/facebook/docusaurus/issues/10031)
- [Antora documentation generator](https://antora.org/)
- [Spectro Cloud Docusaurus versioning approach](https://www.spectrocloud.com/blog/when-docs-and-a-dinosaur-git-along-enabling-versioning-in-docusaurus)

### Internal Documentation

- [CLAUDE.md](../CLAUDE.md) - Repository overview and conventions
- [Project Structure](project-structure.md) - Repository directory structure
- [Development Scripts](development-scripts.md) - Build and validation scripts

## Changelog

| Date | Author | Changes |
|------|--------|---------|
| 2025-12-22 | Initial | Created proof-of-concept design |
