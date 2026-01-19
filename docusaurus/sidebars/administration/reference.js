// Administration API Reference Sidebar

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebarConfig = [
  {
    type: 'doc',
    id: 'administration/docs/api-reference-overview',
  },
  {
    type: 'category',
    label: 'User Management',
    collapsed: true,
    items: [
      'administration/reference/8-x-8-administration-user-management-api',
      {
        type: 'category',
        label: 'Users',
        collapsed: true,
        items: [
          'administration/reference/list-users',
          'administration/reference/create-user',
          'administration/reference/get-user',
          'administration/reference/update-user',
          'administration/reference/delete-user',
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'Ring Group Management',
    collapsed: true,
    items: [
      'administration/reference/8-x-8-administration-ring-group-management-api',
      {
        type: 'category',
        label: 'Ring Groups',
        collapsed: true,
        items: [
          'administration/reference/list-ring-groups',
          'administration/reference/create-ring-group',
          'administration/reference/get-ring-group',
          'administration/reference/update-ring-group',
          'administration/reference/delete-ring-group',
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'Phone Number Management',
    collapsed: true,
    items: [
      'administration/reference/8-x-8-administration-phone-number-management-api',
      {
        type: 'category',
        label: 'Phone Numbers',
        collapsed: true,
        items: [
          'administration/reference/list-phone-numbers',
          'administration/reference/get-phone-number',
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'Site Management',
    collapsed: true,
    items: [
      'administration/reference/8-x-8-administration-site-management-api',
      {
        type: 'category',
        label: 'Sites',
        collapsed: true,
        items: [
          'administration/reference/list-sites',
          'administration/reference/create-site',
          'administration/reference/get-site',
          'administration/reference/update-site',
          'administration/reference/delete-site',
        ],
      },
      'administration/reference/8-x-8-administration-address-management-api',
      {
        type: 'category',
        label: 'Addresses',
        collapsed: true,
        items: [
          'administration/reference/list-addresses',
          'administration/reference/create-address',
          'administration/reference/get-address',
          'administration/reference/delete-address',
        ],
      },
    ],
  },
];

module.exports = sidebarConfig;
