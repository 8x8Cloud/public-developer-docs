# Sidebar Deprecation Pattern

## Overview

When documentation is deprecated but must remain accessible for existing integrations, we use a consistent pattern to mark items as deprecated in the sidebar navigation. This ensures users can still access legacy documentation while clearly understanding its deprecated status.

## Why We Use This Pattern

1. **Backward Compatibility** - Existing integrations may rely on deprecated APIs/features
2. **Clear Communication** - Users immediately see which features are deprecated
3. **Graceful Migration** - Provides time for users to migrate to newer alternatives
4. **Consistent Styling** - The `className` allows future CSS styling of deprecated items

## Requirements

When deprecating sidebar items, you MUST:

1. ✅ Prefix the label with `[Deprecated]`
2. ✅ Add `className: 'deprecated-sidebar-item'` to the item
3. ✅ Apply to ALL items in a deprecated section (parent AND all children)
4. ❌ Do NOT remove the documentation files - they must remain accessible
5. ❌ Do NOT use partial deprecation - if a category is deprecated, ALL its children must be marked

## Pattern Examples

### Single Deprecated Item

For a standalone deprecated documentation page:

```javascript
{
  type: 'doc',
  id: 'analytics/docs/work-analytics-cdr-report',
  label: '[Deprecated] Call Detail Record and Call Legs',
  className: 'deprecated-sidebar-item',
}
```

**Key points:**
- Use `type: 'doc'` with explicit `id` and `label` (not just a string)
- Label starts with `[Deprecated]` prefix
- Include the `className` property

### Deprecated Category (No Link)

For a deprecated category that groups related items:

```javascript
{
  type: 'category',
  label: '[Deprecated] Legacy APIs',
  className: 'deprecated-sidebar-item',
  collapsed: false,
  items: [
    {
      type: 'doc',
      id: 'section/docs/legacy-api-1',
      label: '[Deprecated] Legacy API 1',
      className: 'deprecated-sidebar-item',
    },
    {
      type: 'doc',
      id: 'section/docs/legacy-api-2',
      label: '[Deprecated] Legacy API 2',
      className: 'deprecated-sidebar-item',
    },
  ],
}
```

**Key points:**
- Category itself has `className` and `[Deprecated]` label
- EVERY child item must also be marked deprecated
- No exceptions - all children must follow the same pattern

### Deprecated Category with Link

For a deprecated category that has its own overview page plus sub-items:

```javascript
{
  type: 'category',
  label: '[Deprecated] Webhooks',
  link: {type: 'doc', id: 'contactcenter/docs/create-a-webhook'},
  collapsed: false,
  className: 'deprecated-sidebar-item',
  items: [
    {
      type: 'doc',
      id: 'contactcenter/docs/webhook-events-reference',
      label: '[Deprecated] Webhook Events Reference',
      className: 'deprecated-sidebar-item',
    },
    {
      type: 'doc',
      id: 'contactcenter/docs/verify-webhook-callbacks',
      label: '[Deprecated] Validating webhook events',
      className: 'deprecated-sidebar-item',
    },
  ],
}
```

**Key points:**
- Category has `link` property pointing to overview page
- Category has `className` and `[Deprecated]` label
- Every sub-item is also marked deprecated
- The linked overview page (create-a-webhook) should also have deprecation notice in its content

## Real-World Examples

### Example 1: Analytics Deprecated Items

From `docusaurus/sidebars/analytics.js`:

```javascript
{
  type: 'doc',
  id: 'analytics/docs/work-analytics-cdr-report',
  label: '[Deprecated] Call Detail Record and Call Legs',
  className: 'deprecated-sidebar-item',
},
{
  type: 'doc',
  id: 'analytics/docs/work-analytics-historical-cdr-process',
  label: '[Deprecated] Ring Group & Ring Group Member Summaries',
  className: 'deprecated-sidebar-item',
}
```

### Example 2: Contact Center (Entire Section Deprecated)

From `docusaurus/sidebars/contactcenter.js`:

```javascript
const sidebarConfig = [
  {
    type: 'category',
    label: 'Contact Center Chat API',
    collapsed: false,
    items: [
      {
        type: 'doc',
        id: 'contactcenter/docs/contact-center-chat',
        label: '[Deprecated] Contact Center Chat API',
        className: 'deprecated-sidebar-item',
      },
      {
        type: 'doc',
        id: 'contactcenter/docs/key-elements-in-chat-api',
        label: '[Deprecated] Key Elements',
        className: 'deprecated-sidebar-item',
      },
      // ... all items marked as deprecated
      {
        type: 'category',
        label: '[Deprecated] Webhooks',
        link: {type: 'doc', id: 'contactcenter/docs/create-a-webhook'},
        collapsed: false,
        className: 'deprecated-sidebar-item',
        items: [
          {
            type: 'doc',
            id: 'contactcenter/docs/webhook-events-reference',
            label: '[Deprecated] Webhook Events Reference',
            className: 'deprecated-sidebar-item',
          },
          {
            type: 'doc',
            id: 'contactcenter/docs/verify-webhook-callbacks',
            label: '[Deprecated] Validating webhook events',
            className: 'deprecated-sidebar-item',
          },
        ],
      },
    ],
  },
];
```

**Note:** In this example, the entire Contact Center Chat API section is deprecated, so every single item carries the deprecation markers.

## Common Mistakes to Avoid

### ❌ Mistake 1: Using String Format for Deprecated Items

```javascript
// WRONG - Can't add className to string format
'analytics/docs/deprecated-doc'
```

```javascript
// CORRECT - Use object format
{
  type: 'doc',
  id: 'analytics/docs/deprecated-doc',
  label: '[Deprecated] Documentation Title',
  className: 'deprecated-sidebar-item',
}
```

### ❌ Mistake 2: Forgetting Child Items

```javascript
// WRONG - Parent marked but children not marked
{
  type: 'category',
  label: '[Deprecated] Legacy APIs',
  className: 'deprecated-sidebar-item',
  items: [
    'section/docs/api-1',  // ❌ Missing deprecation markers
    'section/docs/api-2',  // ❌ Missing deprecation markers
  ],
}
```

```javascript
// CORRECT - All children explicitly marked
{
  type: 'category',
  label: '[Deprecated] Legacy APIs',
  className: 'deprecated-sidebar-item',
  items: [
    {
      type: 'doc',
      id: 'section/docs/api-1',
      label: '[Deprecated] API 1',
      className: 'deprecated-sidebar-item',
    },
    {
      type: 'doc',
      id: 'section/docs/api-2',
      label: '[Deprecated] API 2',
      className: 'deprecated-sidebar-item',
    },
  ],
}
```

### ❌ Mistake 3: Missing className Property

```javascript
// WRONG - Label has prefix but no className
{
  type: 'doc',
  id: 'section/docs/deprecated-feature',
  label: '[Deprecated] Feature Name',
  // ❌ Missing className
}
```

```javascript
// CORRECT - Both label and className present
{
  type: 'doc',
  id: 'section/docs/deprecated-feature',
  label: '[Deprecated] Feature Name',
  className: 'deprecated-sidebar-item',  // ✅
}
```

## Checklist for Deprecating Sidebar Items

When deprecating documentation, use this checklist:

- [ ] Add `[Deprecated]` prefix to label
- [ ] Add `className: 'deprecated-sidebar-item'`
- [ ] If category, check ALL child items are also marked
- [ ] If category with link, verify the linked page is also marked
- [ ] Verify documentation files still exist (don't delete them)
- [ ] Run `yarn build` to ensure no broken references
- [ ] Check sidebar navigation in browser to confirm visual indication

## Future Enhancements

The `className: 'deprecated-sidebar-item'` is currently used for semantic purposes and future CSS styling. Potential future enhancements could include:

- Custom CSS styling (grayed out text, warning icon, etc.)
- Tooltip on hover explaining deprecation
- Filter to show/hide deprecated items
- Deprecation date metadata

For now, the `[Deprecated]` text prefix is the primary visual indicator.
