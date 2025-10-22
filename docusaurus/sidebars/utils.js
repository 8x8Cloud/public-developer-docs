const fs = require('fs');
const path = require('path');

/**
 * Transform sidebar doc items to external links.
 *
 * This function recursively processes sidebar items and converts `type: 'doc'`
 * items to `type: 'link'` items pointing to the live developer.8x8.com site.
 * This is a temporary solution for testing the reference documentation
 *
 * @param {Array} items - Array of sidebar items to transform
 * @returns {Array} Transformed sidebar items with docs converted to links
 */
function transformDocsToLinks(items) {
  return items.map(item => {
    if (item.type === 'doc') {
      // Check if the markdown file exists
      const filePath = path.join(__dirname, '../../../docs', `${item.id}.md`);
      const fileExists = fs.existsSync(filePath);

      // If file exists, keep it as a doc (so sidebar works)
      if (fileExists) {
        return item;
      }

      // If file doesn't exist, convert to external link
      // Extract a readable label from the doc ID
      // e.g., 'actions-events/reference/getwebhooks-1' -> 'getwebhooks-1'
      const docId = item.id;
      const endpointName = docId.split('/').pop();

      // Convert to title case for better readability
      const label = endpointName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        type: 'link',
        label: label,
        href: `/${docId}`,
        className: item.className, // Preserve API method styling (GET/POST/etc.)
      };
    } else if (item.type === 'category' && item.items) {
      // Recursively transform nested category items
      return {
        ...item,
        items: transformDocsToLinks(item.items),
      };
    }

    // Return other item types unchanged
    return item;
  });
}

module.exports = transformDocsToLinks;
