// Converse Guides Sidebar
// Product guides for Converse. API documentation lives in ./reference.js

const sidebarConfig = [
  {
    type: 'doc',
    id: 'converse/overview',
    label: 'Overview',
  },
  {
    type: 'category',
    label: 'Using Converse',
    collapsed: false,
    items: [
      'converse/docs/getting-started',
      'converse/docs/user-roles',
      'converse/docs/contacts',
      'converse/docs/agents',
      'converse/docs/queue',
      'converse/docs/conversations',
      'converse/docs/reports',
      'converse/docs/settings',
    ],
  },
  {
    type: 'category',
    label: 'Converse 2.0 APIs',
    collapsed: true,
    items: [
      {
        type: 'link',
        label: 'APIs overview',
        href: '/converse/docs/api-overview',
      },
      {
        type: 'link',
        label: 'API reference',
        href: '/converse/reference/close-conversation',
      },
    ],
  },
];

module.exports = sidebarConfig;
