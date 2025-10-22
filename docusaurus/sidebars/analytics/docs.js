const sidebarConfig = [
  {
    type: 'category',
    label: 'Analytics & Content',
    collapsed: true,
    items: ['analytics/docs/introduction'],
  },
  {
    type: 'category',
    label: 'Access & Authentication',
    collapsed: true,
    items: [
      'analytics/docs/how-to-get-api-keys',
      'analytics/docs/oauth-authentication-for-8x8-xcaas-apis',
    ],
  },
  {
    type: 'category',
    label: 'Work Historical Analytics',
    collapsed: true,
    items: [
      'analytics/docs/work-analytics-call-detail-records',
      'analytics/docs/work-analytics-call-legs',
      'analytics/docs/work-analytics-company-summary',
      'analytics/docs/work-analytics-extension-summary',
      'analytics/docs/wa-ring-group-summary',
      'analytics/docs/ring-group-member-summary',
      {
        type: 'doc',
        id: 'analytics/docs/work-analytics-cdr-report',
        label: '[Deprecated] Call Detail Record and Call Legs',
        className: 'deprecated-sidebar-item',
      },
      {
        type: 'doc',
        id: 'analytics/docs/work-analytics-ring-group-summary',
        label: '[Deprecated] Ring Group & Ring Group Member Summaries',
        className: 'deprecated-sidebar-item',
      },
    ],
  },
  {
    type: 'category',
    label: 'Contact Center Realtime Analytics',
    collapsed: true,
    items: ['analytics/docs/cc-realtime-statistics'],
  },
  {
    type: 'category',
    label: 'Contact Center Historical Analytics',
    collapsed: true,
    items: [
      'analytics/docs/cc-historical-analytics-summary-report',
      'analytics/docs/cc-historical-analytics-detailed-report',
      'analytics/docs/customer-experience-post-call-survey',
    ],
  },
  {
    type: 'category',
    label: 'Customer Experience',
    collapsed: true,
    items: ['analytics/docs/customer-experience-recent-calls'],
  },
  {
    type: 'category',
    label: 'Cloud Storage Service',
    collapsed: true,
    items: [
      'analytics/docs/cloud-storage-service-bulk-download',
      'analytics/docs/cloud-storage-service-objects',
    ],
  },
  {
    type: 'category',
    label: 'Contact Management',
    collapsed: true,
    items: [
      'analytics/docs/search-contacts',
      'analytics/docs/create-contact',
      'analytics/docs/contact-object-structure-guide',
    ],
  },
  {
    type: 'category',
    label: 'Audit Records',
    collapsed: true,
    items: ['analytics/docs/audit-records'],
  },
  {
    type: 'category',
    label: 'CIDP',
    collapsed: true,
    items: ['analytics/docs/end-to-end-journey-api'],
  },
];

module.exports = sidebarConfig;
