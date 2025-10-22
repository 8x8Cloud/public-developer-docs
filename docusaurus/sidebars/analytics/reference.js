// Analytics API Reference Sidebar
// Based on structure from https://developer.8x8.com/analytics/reference/

const sidebarConfig = [
  {
    type: 'category',
    label: 'Work Analytics Historical',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Authentication',
        collapsed: true,
        items: ['analytics/reference/authentication-1'],
      },
      {
        type: 'category',
        label: 'Analytics',
        collapsed: true,
        items: [
          'analytics/reference/call-detail-record-legs',
          'analytics/reference/call-detail-records',
          'analytics/reference/company-summary',
          'analytics/reference/extension-summary-v-2',
          'analytics/reference/ring-group-summary',
          'analytics/reference/ring-group-members-summary',
          'analytics/reference/extension-summary-deprecated',
          'analytics/reference/call-detail-record-deprecated',
          'analytics/reference/ring-group-summary-deprecated',
        ],
      },
    ],
  },
  {
    type: 'category',
    label: '8x8 Analytics for Contact Center Real-time Metrics API',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Agents',
        collapsed: true,
        items: [
          'analytics/reference/cc-real-time-get-agents-metrics-by-queue',
          'analytics/reference/cc-real-time-get-agent-metrics-by-queue-by-id',
          'analytics/reference/cc-real-time-get-agents-metrics-by-group',
          'analytics/reference/cc-real-time-get-agent-metrics-by-group-by-id',
          'analytics/reference/getagentsinqueue',
          'analytics/reference/all-tenant-agents-metrics',
        ],
      },
      {
        type: 'category',
        label: 'Queues',
        collapsed: true,
        items: [
          'analytics/reference/cc-real-time-get-queues-metrics',
          'analytics/reference/cc-real-time-get-queue-metrics-by-id',
        ],
      },
      {
        type: 'category',
        label: 'Groups',
        collapsed: true,
        items: [
          'analytics/reference/cc-real-time-get-groups-metrics',
          'analytics/reference/cc-real-time-get-group-metrics-by-id',
        ],
      },
    ],
  },
  {
    type: 'category',
    label: '8x8 Analytics for Contact Center Historical Metrics API',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Report Access',
        collapsed: true,
        items: [
          'analytics/reference/cc-historical-report-create',
          'analytics/reference/cc-historical-report-details-by-id',
          'analytics/reference/cc-historical-report-status-by-id',
          'analytics/reference/cc-historical-report-data-by-id',
          'analytics/reference/cc-historical-report-download-by-id',
          'analytics/reference/cc-historical-report-links-by-id',
          'analytics/reference/cc-detailed-report-create',
          'analytics/reference/cc-detailed-report-data-by-id',
        ],
      },
      {
        type: 'category',
        label: 'Report Definitions',
        collapsed: true,
        items: [
          'analytics/reference/cc-historical-analytics-report-types',
          'analytics/reference/cc-historical-analytics-report-type-by-type',
        ],
      },
    ],
  },
  {
    type: 'category',
    label: '8x8 Contact Center Customer Experience',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Customer Experience Data',
        collapsed: true,
        items: ['analytics/reference/recentcalldata'],
      },
    ],
  },
  {
    type: 'category',
    label: '8x8 Contact Center Post Call Survey',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Obtain Call Survey Data',
        collapsed: true,
        items: ['analytics/reference/postcallsurvey'],
      },
    ],
  },
  {
    type: 'category',
    label: 'Cloud Storage Service Public API',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Objects',
        collapsed: true,
        items: [
          'analytics/reference/searchobject',
          'analytics/reference/getobject',
          'analytics/reference/downloadmetadata',
          'analytics/reference/downloadobject',
        ],
      },
      {
        type: 'category',
        label: 'Bulk Downloads',
        collapsed: true,
        items: [
          'analytics/reference/removecontent',
          'analytics/reference/cancelbulkdownload',
          'analytics/reference/cleardownloads',
          'analytics/reference/startdownload',
          'analytics/reference/downloadstatuses',
          'analytics/reference/downloadstatus',
          'analytics/reference/downloadbulk',
        ],
      },
      {
        type: 'category',
        label: 'Buckets',
        collapsed: true,
        items: [
          'analytics/reference/searchbucket',
          'analytics/reference/getbucket',
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'Quality Management and Speech Analytics API',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Interactions',
        collapsed: true,
        items: [
          'analytics/reference/interactions-count',
          'analytics/reference/interactions',
          'analytics/reference/delete-interaction',
          'analytics/reference/purge-interaction',
          'analytics/reference/update-custom-field',
          'analytics/reference/deletes-the-custom-field',
          'analytics/reference/interaction-transcription',
          'analytics/reference/topics',
          'analytics/reference/labels',
          'analytics/reference/notes',
          'analytics/reference/interaction-media-file',
          'analytics/reference/webpage-redirect',
        ],
      },
      {
        type: 'category',
        label: 'Users',
        collapsed: true,
        items: [
          'analytics/reference/users-count',
          'analytics/reference/users',
          'analytics/reference/supervisors',
          'analytics/reference/trainers',
          'analytics/reference/user-details',
        ],
      },
      {
        type: 'category',
        label: 'Evaluations',
        collapsed: true,
        items: [
          'analytics/reference/evaluations-count',
          'analytics/reference/evaluations',
          'analytics/reference/evaluation-details',
        ],
      },
      {
        type: 'category',
        label: 'Speech Analytics',
        collapsed: true,
        items: [
          'analytics/reference/categories-count',
          'analytics/reference/list',
          'analytics/reference/topics-count',
          'analytics/reference/topics-list',
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'Work Analytics Customer Data',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Pbxes',
        collapsed: true,
        items: ['analytics/reference/get-pbxes'],
      },
      {
        type: 'category',
        label: 'Sites',
        collapsed: true,
        items: ['analytics/reference/get-pbx-sites'],
      },
      {
        type: 'category',
        label: 'Queues Per Site',
        collapsed: true,
        items: ['analytics/reference/get-pbx-site-queues'],
      },
      {
        type: 'category',
        label: 'Queues per PBX',
        collapsed: true,
        items: ['analytics/reference/get-pbx-queues'],
      },
      {
        type: 'category',
        label: 'Agents',
        collapsed: true,
        items: ['analytics/reference/get-pbx-agents'],
      },
    ],
  },
  {
    type: 'category',
    label: 'Audit Records API',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Audit',
        collapsed: true,
        items: ['analytics/reference/get-audit-records'],
      },
    ],
  },
  {
    type: 'category',
    label: 'Work Analytics',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Get Agent Activity Metrics per Queues',
        collapsed: true,
        items: ['analytics/reference/get-agent-queue-activity'],
      },
      {
        type: 'category',
        label: 'Agent Activity',
        collapsed: true,
        items: ['analytics/reference/get-agent-activity'],
      },
      {
        type: 'category',
        label: 'Get Call Queue Metrics',
        collapsed: true,
        items: ['analytics/reference/get-queue-metrics'],
      },
      {
        type: 'category',
        label: 'Call Queue Data Table',
        collapsed: true,
        items: ['analytics/reference/aggregated-3'],
      },
      {
        type: 'category',
        label: 'Call Details',
        collapsed: true,
        items: ['analytics/reference/detailed'],
      },
    ],
  },
];

module.exports = sidebarConfig;
