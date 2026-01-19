# Decap CMS Integration Report for 8x8 Developer Portal

## Executive Summary

Decap CMS (formerly Netlify CMS) is an open-source, Git-based content management system that can be integrated into the 8x8 Developer Portal to enable non-technical users to edit documentation through a user-friendly interface. It creates GitHub branches and pull requests automatically, allowing edits to go through the normal review process rather than directly modifying the repository.

**Key Benefits:**
- Web-based editing interface (no Git knowledge required)
- Automatic PR creation for all changes
- Editorial workflow with draft/review/publish states
- Deploy preview integration for reviewing changes before merge
- Completely free and open-source
- Self-hosted on your own domain

---

## 1. How Decap CMS Works

### Architecture Overview

Decap CMS is a single-page React application that runs in the browser at `/admin` on your site. It:

1. **Authenticates** users via GitHub OAuth
2. **Reads/writes** files directly to your GitHub repository using GitHub's API
3. **Creates branches** and pull requests for all content changes
4. **Provides a GUI** for editing markdown/MDX files with live preview
5. **Integrates** with deployment platforms (Netlify, Vercel, etc.) to show preview links

```
┌─────────────┐
│   Browser   │
│ /admin page │
└──────┬──────┘
       │ GitHub OAuth
       ▼
┌─────────────────┐        ┌──────────────┐
│   GitHub API    │◄──────►│   Your Repo  │
│  (via browser)  │        │  (branches)  │
└─────────────────┘        └──────────────┘
       │
       │ Commit Status API
       ▼
┌─────────────────┐
│  Deploy Service │
│ (Netlify/etc.)  │
│ Preview builds  │
└─────────────────┘
```

### Important Characteristics

- **Git-based**: Every change is a Git commit with proper attribution
- **Client-side only**: No server component needed (except OAuth proxy)
- **Direct to GitHub**: Users need write access to the repository
- **Branch-per-change**: Each saved draft creates a new branch and PR

---

## 2. Editorial Workflow: The PR Creation Process

When you enable `publish_mode: editorial_workflow`, here's what happens:

### Content Lifecycle

```
┌──────────┐        ┌────────────┐        ┌───────────┐
│  DRAFT   │───────►│ IN REVIEW  │───────►│ PUBLISHED │
└──────────┘        └────────────┘        └───────────┘
     │                     │                      │
     │ Creates branch      │ Commits pushed       │ PR merged
     │ & opens PR         │ to same PR           │ & branch deleted
```

### Step-by-Step User Flow

#### 1. Editor Creates/Edits Content
- User logs into `/admin` with GitHub account
- Navigates to "Content" or "Workflow" view
- Creates new document or edits existing one
- **Action**: Clicks "Save"

**What Happens Behind the Scenes:**
```bash
# Decap CMS creates:
git checkout -b cms/docs/new-api-guide
git add docs/administration/docs/new-api-guide.mdx
git commit -m "Create new-api-guide"
git push origin cms/docs/new-api-guide
# Opens PR from this branch to main
```

Branch naming pattern: `cms/{collection-name}/{slug}`

#### 2. Draft State
- Content appears in "Draft" column of workflow board
- Draft is NOT on main branch
- PR is open but not yet ready for review
- Editor can continue making changes (adds commits to same PR)

#### 3. Moving to "In Review"
- Editor drags card to "In Review" column (or clicks "Set Status")
- **No Git action** - this is metadata in the PR
- Signals to reviewers that content is ready for feedback

#### 4. Review Process
- Technical reviewers see PR in GitHub
- Can comment, request changes, review code
- Editor can make revisions (adds more commits to PR)
- Deploy preview link available in PR checks

#### 5. Publishing
- Editor drags to "Ready" or clicks "Publish"
- **Action**: Decap CMS merges PR and deletes branch

```bash
# What happens:
git checkout main
git merge --squash cms/docs/new-api-guide  # if squash_merges: true
git push origin main
git branch -d cms/docs/new-api-guide
git push origin :cms/docs/new-api-guide
```

### Configuration for This Workflow

```yaml
backend:
  name: github
  repo: 8x8/developer-docs  # Your actual repo path
  branch: master  # Your main branch
  squash_merges: true  # Cleaner history - consolidates commits

publish_mode: editorial_workflow
```

---

## 3. Complete Setup Process

### Phase 1: Add Decap CMS to Repository

#### Step 1: Create Admin Directory Structure

```bash
mkdir -p static/admin
touch static/admin/index.html
touch static/admin/config.yml
```

#### Step 2: Create Admin HTML (`static/admin/index.html`)

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <!-- Include the Decap CMS script -->
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

This single-page app will be accessible at `https://developer.8x8.com/admin`

#### Step 3: Configure Collections (`static/admin/config.yml`)

See Section 4 for detailed configuration examples specific to your repository structure.

### Phase 2: Authentication Setup

Decap CMS requires GitHub OAuth to authenticate users. You have two options:

#### Option A: Using Netlify (Simplest)

If you deploy to Netlify, authentication is built-in:

1. **In Netlify Dashboard:**
   - Go to Site Settings → Access Control → OAuth
   - Click "Install Provider" → Select GitHub
   - Enter GitHub OAuth credentials

2. **No changes needed in config.yml** - Netlify handles the proxy automatically

#### Option B: Custom OAuth Proxy (More Flexible)

For other deployment platforms or more control:

1. **Register GitHub OAuth App:**
   - Go to GitHub Settings → Developer Settings → OAuth Apps → New OAuth App
   - **Application name**: "8x8 Developer Portal CMS"
   - **Homepage URL**: `https://developer.8x8.com`
   - **Authorization callback URL**: `https://your-oauth-proxy.com/callback`
   - Copy Client ID and Client Secret

2. **Deploy OAuth Proxy:**
   - Use a serverless function (AWS Lambda, Cloudflare Worker, Vercel Function)
   - Example: [Cloudflare Worker template](https://github.com/i40west/netlify-cms-cloudflare-pages)
   - Configure with GitHub Client ID/Secret

3. **Update config.yml:**
```yaml
backend:
  name: github
  repo: 8x8/developer-docs
  branch: master
  base_url: https://your-oauth-proxy.com  # Your OAuth proxy endpoint
```

### Phase 3: Preview Deployment Integration

To show preview links in the CMS:

1. **Configure Your CI/CD:**
   - Ensure your platform (Netlify/Vercel/GitHub Actions) builds PRs
   - Confirm it sends commit statuses back to GitHub with "deploy" in the name

2. **Add to config.yml:**
```yaml
backend:
  name: github
  repo: 8x8/developer-docs
  branch: master
  preview_context: netlify/deploy-preview  # or your platform's context name

# Then in each collection:
collections:
  - name: docs
    preview_path: "{{slug}}"  # Path from site root to content
```

3. **How It Works:**
   - PR is created → CI builds preview → Sends status to GitHub
   - Decap fetches status URL → Combines with preview_path
   - Result: Direct link to changed page in preview environment

---

## 4. Configuration for 8x8 Developer Portal

Here's a proposed configuration tailored to your repository structure:

```yaml
# static/admin/config.yml

backend:
  name: github
  repo: 8x8/developer-docs  # Update to actual repo path
  branch: master  # Your main branch name
  squash_merges: true  # Clean commit history
  # base_url: https://your-oauth-proxy.com  # If using custom OAuth

# Enable editorial workflow (PR-based)
publish_mode: editorial_workflow

# Show deploy preview links
show_preview_links: true

# Media storage
media_folder: "static/img"
public_folder: "/img"

# Content Collections
collections:
  # Administration Section
  - name: administration
    label: "Administration Docs"
    folder: "docs/administration/docs"
    create: true
    slug: "{{slug}}"
    preview_path: "administration/{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Sidebar Position", name: "sidebar_position", widget: "number", required: false }
      - { label: "Body", name: "body", widget: "markdown" }

  # Analytics Section
  - name: analytics
    label: "Analytics Docs"
    folder: "docs/analytics/docs"
    create: true
    slug: "{{slug}}"
    preview_path: "analytics/{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Sidebar Position", name: "sidebar_position", widget: "number", required: false }
      - { label: "Body", name: "body", widget: "markdown" }

  # Connect Section
  - name: connect
    label: "Connect Docs"
    folder: "docs/connect/docs"
    create: true
    slug: "{{slug}}"
    preview_path: "connect/{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Sidebar Position", name: "sidebar_position", widget: "number", required: false }
      - { label: "Body", name: "body", widget: "markdown" }

  # Contact Center Section
  - name: contactcenter
    label: "Contact Center Docs"
    folder: "docs/contactcenter/docs"
    create: true
    slug: "{{slug}}"
    preview_path: "contactcenter/{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Sidebar Position", name: "sidebar_position", widget: "number", required: false }
      - { label: "Body", name: "body", widget: "markdown" }

  # JaaS Section
  - name: jaas
    label: "JaaS Docs"
    folder: "docs/jaas/docs"
    create: true
    slug: "{{slug}}"
    preview_path: "jaas/{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Sidebar Position", name: "sidebar_position", widget: "number", required: false }
      - { label: "Body", name: "body", widget: "markdown" }

  # Tech Partner Section
  - name: tech-partner
    label: "Tech Partner Docs"
    folder: "docs/tech-partner/docs"
    create: true
    slug: "{{slug}}"
    preview_path: "tech-partner/{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Sidebar Position", name: "sidebar_position", widget: "number", required: false }
      - { label: "Body", name: "body", widget: "markdown" }

  # Actions & Events Section
  - name: actions-events
    label: "Actions & Events Docs"
    folder: "docs/actions-events/docs"
    create: true
    slug: "{{slug}}"
    preview_path: "actions-events/{{slug}}"
    fields:
      - { label: "Title", name: "title", widget: "string" }
      - { label: "Sidebar Position", name: "sidebar_position", widget: "number", required: false }
      - { label: "Body", name: "body", widget: "markdown" }
```

### Notes on Configuration

- **`create: true`**: Allows editors to create new documents
- **`slug`**: Determines filename (uses title by default)
- **`preview_path`**: Maps to URL structure on your site
- **`fields`**: Defines the editing interface
- **`sidebar_position`**: Optional Docusaurus frontmatter field

### Advanced Field Types

For MDX-specific features or more complex fields:

```yaml
fields:
  - { label: "Title", name: "title", widget: "string" }
  - { label: "Description", name: "description", widget: "text", required: false }
  - { label: "Sidebar Label", name: "sidebar_label", widget: "string", required: false }
  - { label: "Sidebar Position", name: "sidebar_position", widget: "number", required: false }

  # Custom frontmatter
  - label: "Custom ID"
    name: "custom_id"
    widget: "string"
    required: false

  # Tags
  - label: "Tags"
    name: "tags"
    widget: "list"
    required: false

  # Main content
  - { label: "Body", name: "body", widget: "markdown" }
```

---

## 5. User Experience: Editor's Perspective

### First-Time Setup for Editors

1. **Access CMS:**
   - Navigate to `https://developer.8x8.com/admin`
   - See login screen with "Login with GitHub" button

2. **Authenticate:**
   - Click login button → Redirected to GitHub
   - Authorize the OAuth application
   - Redirected back to CMS (now authenticated)

3. **Dashboard View:**
   - See "Workflow" board (Draft/In Review/Ready columns)
   - See "Content" menu listing all collections
   - Quick search for existing documents

### Typical Editing Session

#### Scenario: Update Existing API Guide

1. **Find Document:**
   - Click "Content" → "Administration Docs"
   - See list of all documents in that folder
   - Search or scroll to find "User Management API Guide"

2. **Edit Content:**
   - Click document to open
   - See rich text editor with markdown toolbar
   - Make changes (add section, update example, fix typo)
   - Live preview on right side (optional)

3. **Save Draft:**
   - Click "Save" button
   - Toast notification: "Entry saved"
   - Return to workflow board
   - See new card in "Draft" column

4. **Check Preview:**
   - Card shows "Check for Preview" button
   - Click to fetch deploy status
   - Once ready: "View Preview" link appears
   - Click to see changes on staging site

5. **Mark Ready for Review:**
   - Drag card to "In Review" column
   - Or click card → Change status dropdown
   - Notify technical reviewer via Slack/email

6. **Address Feedback:**
   - Reviewer comments in GitHub PR
   - Editor reopens document in CMS
   - Makes requested changes
   - Saves (adds another commit to PR)
   - Reviewer sees updates in preview

7. **Publish:**
   - Reviewer approves PR in GitHub
   - Editor drags card to "Ready" column
   - Clicks "Publish" button
   - Confirmation modal: "Are you sure?"
   - Confirms → PR merged, branch deleted
   - Card disappears from workflow board
   - Changes live on production site

### Editor Interface Features

**Content Editor:**
- Rich text toolbar (bold, italic, links, headings, lists)
- Toggle between "Rich Text" and "Markdown" mode
- Side-by-side preview (optional)
- Frontmatter fields at top (title, description, etc.)
- Image upload via drag-and-drop
- Auto-save drafts to localStorage (survives browser refresh)

**Workflow Board:**
- Kanban-style columns
- Drag-and-drop status changes
- Preview link integration
- Last edit timestamp and author
- Quick edit from card

**Media Library:**
- Upload images, PDFs, etc.
- Browse all media in `/static/img`
- Drag to insert into markdown
- Delete unused files

---

## 6. Access Control and Permissions

### GitHub Repository Access Required

**Important**: All CMS users need **write access** to the repository. This is a fundamental requirement because:

- Decap uses the authenticated user's GitHub token
- Must be able to create branches and PRs
- Cannot be granular (can't restrict to specific folders)

### Recommended Approach

1. **GitHub Team Setup:**
   ```
   8x8-developer-docs (repository)
   ├── Admins (full access)
   ├── Developers (write access)
   └── Content-Editors (write access via Decap CMS only)
   ```

2. **Branch Protection Rules:**
   - Protect `master` branch
   - Require PR reviews before merge
   - Require status checks (build, tests)
   - Prevent force push
   - Prevent deletion

3. **Training:**
   - Content editors use **only** the CMS interface
   - Never push directly to repository
   - All changes via PR workflow

### Alternative: Open Authoring (Fork-Based)

For external contributors without write access:

```yaml
backend:
  name: github
  repo: 8x8/developer-docs
  open_authoring: true
```

**How it works:**
- User forks repository
- CMS creates branch in their fork
- Opens PR from fork to main repo
- Maintainers review and merge

**Limitations:**
- No editorial workflow board
- Each edit creates new PR (can't update existing)
- More complex for non-technical users

---

## 7. Preview Functionality Deep Dive

### How Preview Links Work

```
┌─────────────────────────────────────────────────┐
│  1. Editor saves draft                          │
│     → Creates branch + PR                       │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│  2. GitHub webhook notifies CI/CD               │
│     → Netlify/Vercel starts build               │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│  3. Build completes                             │
│     → Deploy to preview URL                     │
│     → Send commit status to GitHub              │
│       (status includes deploy URL)              │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│  4. Decap CMS polls GitHub API                  │
│     → Fetches commit statuses                   │
│     → Finds status with "deploy" context        │
│     → Extracts URL from status                  │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────┐
│  5. CMS constructs preview link                 │
│     Base: https://deploy-preview-123.netlify... │
│     + preview_path: /administration/api-guide   │
│     = Full preview URL to specific page         │
└─────────────────────────────────────────────────┘
```

### Configuration Example

```yaml
backend:
  name: github
  repo: 8x8/developer-docs
  branch: master
  preview_context: netlify/deploy-preview  # Status name to look for

collections:
  - name: administration
    folder: "docs/administration/docs"
    preview_path: "administration/{{slug}}"  # URL path on preview site
```

### Preview Context Options

Different platforms use different status names:

| Platform | preview_context Value |
|----------|----------------------|
| Netlify | `netlify/deploy-preview` |
| Vercel | `vercel` or `deployment-preview` |
| GitHub Actions + Netlify | Custom (check commit statuses) |
| Custom CI | Whatever you name your status check |

**Finding your context name:**
```bash
# Look at a PR with a preview deploy
gh pr view 123
# Or check commit statuses
gh api repos/8x8/developer-docs/commits/COMMIT_SHA/status
```

### Troubleshooting Previews

**Problem**: "Check for Preview" never shows link

**Possible causes:**
1. Deploy didn't send status back to GitHub
2. Wrong `preview_context` name in config
3. Status doesn't include URL in `target_url` field
4. Deploy still in progress

**Solution**: Check GitHub commit statuses manually:
```bash
gh api repos/8x8/developer-docs/commits/COMMIT_SHA/status --jq '.statuses[] | {context, target_url, state}'
```

---

## 8. Customization Options

### Custom Widgets

For specialized content types, you can create custom field widgets:

```html
<!-- static/admin/index.html -->
<script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
<script>
  // Custom widget for API version selection
  var VersionControl = createClass({
    render: function() {
      return h('select', {
        value: this.props.value,
        onChange: (e) => this.props.onChange(e.target.value)
      }, [
        h('option', {value: 'v1'}, 'v1'),
        h('option', {value: 'v2'}, 'v2'),
        h('option', {value: 'v3'}, 'v3')
      ]);
    }
  });

  CMS.registerWidget('version-select', VersionControl);
</script>
```

Then use in config.yml:
```yaml
fields:
  - { label: "API Version", name: "api_version", widget: "version-select" }
```

### Custom Previews

Render content in CMS preview panel exactly as it appears on site:

```html
<script>
  var PostPreview = createClass({
    render: function() {
      var entry = this.props.entry;
      var title = entry.getIn(['data', 'title']);
      var body = this.props.widgetFor('body');

      return h('div', {className: 'docusaurus-preview'},
        h('h1', {}, title),
        body
      );
    }
  });

  CMS.registerPreviewTemplate('administration', PostPreview);
</script>
```

### Custom Commit Messages

```yaml
backend:
  name: github
  repo: 8x8/developer-docs
  commit_messages:
    create: 'docs: create {{collection}} "{{slug}}"'
    update: 'docs: update {{collection}} "{{slug}}"'
    delete: 'docs: delete {{collection}} "{{slug}}"'
    uploadMedia: 'docs: upload "{{path}}"'
    deleteMedia: 'docs: delete "{{path}}"'
```

### Workflow Labels/Status Names

Customize the workflow column names:

```yaml
publish_mode: editorial_workflow

# Customize status labels (optional)
workflow:
  draft:
    label: "Draft"
    color: "#999"
  review:
    label: "In Review"
    color: "#ff9800"
  ready:
    label: "Ready to Publish"
    color: "#4caf50"
```

---

## 9. Limitations and Considerations

### Technical Limitations

1. **No Git LFS Support**
   - Large binary files (>100MB) not supported
   - Workaround: Use external media hosting

2. **Repository Access Required**
   - All editors need GitHub write access
   - Cannot restrict to specific folders via CMS
   - Relies on branch protection for safety

3. **No Multi-File Operations**
   - Can't move/rename files across folders
   - Can't bulk edit metadata
   - Each file edited individually

4. **MDX Limitations**
   - Basic markdown editing works well
   - Complex MDX components may not preview correctly
   - Editors can break React components if not careful

5. **No Conflict Resolution**
   - If same file edited in multiple PRs, manual merge needed
   - CMS doesn't detect conflicts until publish attempt

### Workflow Considerations

1. **One PR Per Draft**
   - Each draft = separate branch/PR
   - Can accumulate many open PRs
   - Need discipline to close/merge regularly

2. **Sidebar Management**
   - Decap CMS doesn't edit sidebar files
   - New docs won't appear in nav automatically
   - Requires manual sidebar updates by developers

3. **OpenAPI Spec Files**
   - Files in `docs_oas/` are YAML, not markdown
   - Would need separate collection config
   - Complex structure difficult in CMS
   - Recommendation: Keep OpenAPI files out of CMS

4. **Image Management**
   - All images go to single folder (`static/img`)
   - Can get cluttered without organization
   - Consider prefixing: `administration-user-flow.png`

5. **Learning Curve**
   - Editors need to understand:
     - Markdown syntax basics
     - Docusaurus frontmatter fields
     - PR review workflow
   - Training required for non-technical users

### Performance Considerations

1. **API Rate Limits**
   - CMS uses GitHub API (5,000 requests/hour authenticated)
   - Large collections load slowly
   - Consider splitting large collections

2. **Branch Cleanup**
   - Merged PRs leave branches in Git history
   - Use `squash_merges: true` to reduce clutter
   - Periodically clean up stale branches

3. **Preview Build Times**
   - Large sites take time to build previews
   - Editors wait for deploy before seeing changes
   - Consider faster preview builds (subset of site)

---

## 10. Recommended Implementation Plan

### Phase 1: Proof of Concept (1-2 weeks)

**Goal**: Validate Decap CMS works with your setup

**Tasks:**
1. Create `static/admin/` directory with basic config
2. Set up GitHub OAuth (Netlify or custom proxy)
3. Configure one collection (e.g., Administration docs)
4. Test editorial workflow with 2-3 team members
5. Verify preview links work with your deploy platform

**Success Criteria:**
- Can login and see documents
- Can edit and save drafts
- PRs created automatically
- Preview links functional

### Phase 2: Full Configuration (1 week)

**Goal**: Configure all documentation sections

**Tasks:**
1. Add all product area collections to config.yml
2. Define field schemas for each collection
3. Customize commit messages
4. Set up custom preview templates (optional)
5. Document editor workflows

**Success Criteria:**
- All doc sections accessible in CMS
- Field schemas match Docusaurus frontmatter
- Custom features working (if any)

### Phase 3: Training and Rollout (1-2 weeks)

**Goal**: Onboard content editors

**Tasks:**
1. Create editor training materials
2. Hold training sessions for content team
3. Establish PR review process
4. Monitor initial usage
5. Gather feedback and iterate

**Success Criteria:**
- Editors comfortable using CMS
- PRs created via CMS merge successfully
- Feedback incorporated

### Phase 4: Optimization (Ongoing)

**Goal**: Improve based on usage

**Tasks:**
1. Add custom widgets for repeated patterns
2. Optimize collection structure
3. Improve preview templates
4. Automate sidebar updates (if possible)
5. Regular maintenance

---

## 11. Comparison with Alternatives

| Feature | Decap CMS | Dhub | Spinal | Direct GitHub Editing |
|---------|-----------|------|--------|----------------------|
| **Cost** | Free (open-source) | Commercial | Commercial | Free |
| **Hosting** | Self-hosted | Cloud | Cloud | N/A |
| **PR Creation** | ✅ Automatic | ✅ Automatic | ✅ Automatic | ✅ Manual |
| **Editorial Workflow** | ✅ Built-in | ✅ Built-in | ✅ Built-in | ❌ Via PR status |
| **Preview** | ✅ Via CI/CD | ✅ Built-in | ✅ Built-in | ✅ Via PR checks |
| **Customization** | ✅ High | ⚠️ Limited | ⚠️ Limited | ✅ Unlimited |
| **Markdown Editor** | ✅ WYSIWYG | ✅ Notion-like | ✅ Basic | ❌ Plain text |
| **Learning Curve** | Medium | Low | Low | High |
| **Non-Technical Users** | ✅ Good | ✅ Excellent | ✅ Good | ❌ Poor |
| **Setup Complexity** | Medium | Low | Low | None |
| **Vendor Lock-in** | ❌ None | ✅ Yes | ✅ Yes | ❌ None |

---

## 12. Decision Checklist

Consider Decap CMS if:
- ✅ You want a free, open-source solution
- ✅ You're comfortable with some technical setup
- ✅ You want full control and customization
- ✅ You already use Netlify/Vercel for deployment
- ✅ Your team can handle markdown editing
- ✅ You want to avoid vendor lock-in

Consider alternatives if:
- ❌ You need zero-setup, plug-and-play solution → Dhub
- ❌ You want Notion-like editing experience → Dhub
- ❌ You don't have technical resources for setup → Commercial options
- ❌ You need real-time collaboration → Dhub
- ❌ You need complex content modeling → Headless CMS

---

## 13. Next Steps

If you decide to proceed with Decap CMS:

1. **Choose OAuth Strategy**
   - If using Netlify: Use built-in auth (easiest)
   - If not: Set up custom OAuth proxy (more work)

2. **Plan Repository Access**
   - Decide who gets write access
   - Set up GitHub teams
   - Configure branch protection rules

3. **Prototype Configuration**
   - Start with one section (Administration?)
   - Test with small group of editors
   - Iterate based on feedback

4. **Document Workflows**
   - Create editor guide
   - Document PR review process
   - Establish naming conventions

5. **Run Pilot**
   - 2-3 weeks with limited group
   - Monitor for issues
   - Gather feedback

6. **Full Rollout**
   - Train all editors
   - Monitor usage
   - Provide ongoing support

---

## 14. Additional Resources

### Official Documentation
- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Docusaurus Integration Guide](https://decapcms.org/docs/docusaurus/)
- [Editorial Workflows](https://decapcms.org/docs/editorial-workflows/)
- [Deploy Preview Links](https://decapcms.org/docs/deploy-preview-links/)
- [GitHub Backend](https://decapcms.org/docs/github-backend/)

### Example Implementations
- [Template Repository](https://github.com/AhmedCoolProjects/template-decap-cms-docusaurus)
- [Real-world Integration Case Study](https://hkdocs.com/en/docs/tech/docusaurus/docusaurus-decap-cms-with-cloud-run-and-netlify/)

### Community Resources
- [Decap CMS GitHub](https://github.com/decaporg/decap-cms)
- [Feature Requests](https://github.com/decaporg/decap-cms/issues)
- [Community Discord](https://decapcms.org/community/)

---

## Conclusion

Decap CMS provides a solid, open-source solution for enabling non-technical editors to contribute to your documentation through a user-friendly interface while maintaining your existing Git-based PR review workflow. The initial setup requires some technical effort, but once configured, it offers a streamlined editing experience that integrates seamlessly with your Docusaurus site and GitHub workflow.

The key advantages are:
- **Free and open-source** (no ongoing costs)
- **Git-based workflow** (all changes via PRs)
- **Editorial workflow** (draft → review → publish)
- **Preview integration** (see changes before merge)
- **Full control** (self-hosted, customizable)

The main trade-offs are:
- Requires initial technical setup
- All users need GitHub write access
- Basic markdown editing (not as polished as commercial alternatives)
- Some manual processes (sidebar updates, etc.)

For the 8x8 Developer Portal, Decap CMS would enable content editors, product managers, and technical writers to update documentation without needing deep technical knowledge, while still ensuring all changes go through proper technical review via your established PR process.
