const sidebarConfig = [
  {
    type: 'category',
    label: 'Administration',
    collapsed: true,
    items: [
      'administration/docs/overview',
      {
        type: 'doc',
        id: 'administration/docs/suite-common',
        label: 'Administration API Essentials',
      },
      'administration/docs/api-change-policy',
    ],
  },
  {
    type: 'category',
    label: 'User Management',
    collapsed: true,
    items: [
      'administration/docs/user-management-api-guide',
    ],
  },
  {
    type: 'category',
    label: 'Ring Group Management',
    collapsed: true,
    items: [
      'administration/docs/ring-group-management-api-guide',
    ],
  },
  {
    type: 'category',
    label: 'Phone Number Management',
    collapsed: true,
    items: [
      'administration/docs/phone-number-management-api-guide',
    ],
  },
  {
    type: 'category',
    label: 'Site Management',
    collapsed: true,
    items: [
      'administration/docs/site-management-api-guide',
    ],
  },
  {
    type: 'category',
    label: 'Contact Management',
    collapsed: true,
    items: [
      'administration/docs/search-contacts',
      'administration/docs/create-contact',
      'administration/docs/contact-object-structure-guide',
    ],
  },
];

module.exports = sidebarConfig;
