// 8x8 Resolve Guides Sidebar
// Product guides for 8x8 Resolve, listed under CPaaS. Resolve has no public API reference yet.

const sidebarConfig = [
  {
    type: 'doc',
    id: 'resolve/docs/overview',
    label: 'Overview',
  },
  {
    type: 'category',
    label: 'Interactive tours',
    collapsed: false,
    items: ['resolve/docs/quick-tour', 'resolve/docs/analytics-tour'],
  },
  {
    type: 'category',
    label: 'Using Resolve',
    collapsed: false,
    items: [
      'resolve/docs/dashboard',
      'resolve/docs/incidents',
      'resolve/docs/scenarios',
      'resolve/docs/contacts',
      'resolve/docs/analytics',
      {
        type: 'category',
        label: 'Settings',
        link: { type: 'doc', id: 'resolve/docs/settings' },
        items: ['resolve/docs/templates'],
      },
    ],
  },
];

module.exports = sidebarConfig;
