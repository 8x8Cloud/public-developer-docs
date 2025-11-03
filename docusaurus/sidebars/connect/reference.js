// Connect API Reference Sidebar
// Generated from: https://developer.8x8.com/connect/reference/getting-started-with-sms-api

const sidebarConfig = [
  {
    type: 'category',
    label: 'SMS API',
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'connect/docs/getting-started-with-sms-api',
      },
      {
        type: 'category',
        label: 'Send SMS API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/send-sms-single',
          },
          {
            type: 'doc',
            id: 'connect/reference/send-many-sms',
          },
          {
            type: 'doc',
            id: 'connect/reference/cancel-many-sms-messages',
          },
          {
            type: 'doc',
            id: 'connect/reference/api-sms-feedback',
          },
          {
            type: 'doc',
            id: 'connect/reference/cancel-scheduled-message',
          },
        ],
      },
      {
        type: 'category',
        label: 'Reporting API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/start-log-export-job',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-log-export-job-result',
          },
          {
            type: 'doc',
            id: 'connect/reference/cancel-log-export-job',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-sms-message-details',
          },
          {
            type: 'doc',
            id: 'connect/reference/delete-pii',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-price-list',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-account-balance',
          },
        ],
      },
      {
        type: 'category',
        label: 'Engage API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/survey-send',
          },
          {
            type: 'doc',
            id: 'connect/reference/survey-send-many',
          },
        ],
      },
      {
        type: 'category',
        label: 'Webhook Configuration API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/get-webhooks-2',
          },
          {
            type: 'doc',
            id: 'connect/reference/add-webhooks-2',
          },
          {
            type: 'doc',
            id: 'connect/reference/delete-webhooks-2',
          },
        ],
      },
      {
        type: 'category',
        label: 'SMS Callbacks Reference',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/docs/inbound-sms',
          },
          {
            type: 'doc',
            id: 'connect/docs/delivery-receipts-for-outbound-sms',
          },
          {
            type: 'doc',
            id: 'connect/docs/sms-engage-response-webhook',
          }, 
          {
            type: 'doc',
            id: 'connect/docs/short-url-clicks',
          },
        ],
      },
      {
        type: 'doc',
        id: 'connect/docs/delivery-receipts-error-codes',
      },
    ],
  },
  {
    type: 'category',
    label: 'Business Messaging API',
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'connect/docs/messaging-apps-api-get-started',
      },
      {
        type: 'category',
        label: 'Send Message API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/send-message',
          },
          {
            type: 'doc',
            id: 'connect/reference/send-message-many',
          },
          {
            type: 'doc',
            id: 'connect/reference/send-lon-message',
          },
          {
            type: 'doc',
            id: 'connect/reference/send-lon-messages',
          },
          {
            type: 'doc',
            id: 'connect/reference/cancel-scheduled-message-1',
          },
          {
            type: 'doc',
            id: 'connect/reference/cancel-many-chat-apps-messages',
          },
        ],
      },
      {
        type: 'doc',
        id: 'connect/docs/list-of-supported-chatapps-channels',
      },
      {
        type: 'doc',
        id: 'connect/docs/supported-chat-apps-content-type',
      },
      {
        type: 'category',
        label: 'Management API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/mark-message-read',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-whatsapp-templates',
          },
          {
            type: 'doc',
            id: 'connect/reference/add-whatsapp-template',
          },
          {
            type: 'doc',
            id: 'connect/reference/remove-wa-template',
          },
        ],
      },
      {
        type: 'category',
        label: 'Reporting API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/docs/download-chatapps-logs',
          },
          {
            type: 'doc',
            id: 'connect/reference/start-log-export-job-1',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-log-export-job-result-1',
          },
          {
            type: 'doc',
            id: 'connect/reference/cancel-log-export-job-1',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-chatapps-message-details',
          },
        ],
      },
      {
        type: 'category',
        label: 'Webhook Configuration API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/get-webhooks-1',
          },
          {
            type: 'doc',
            id: 'connect/reference/add-webhooks-1',
          },
          {
            type: 'doc',
            id: 'connect/reference/delete-webhooks-1',
          },
        ],
      },
      {
        type: 'category',
        label: 'Messaging Apps Callbacks Reference',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/docs/inbound-chatapps-message',
          },
          {
            type: 'doc',
            id: 'connect/docs/delivery-receipts-for-outbound-chatapps',
          },
          {
            type: 'doc',
            id: 'connect/docs/whatsapp-template-change-webhook',
          },
          {
            type: 'doc',
            id: 'connect/docs/whatsapp-phone-number-quality-change-webhook',
          },
        ],
      },
      {
        type: 'doc',
        id: 'connect/docs/chatapps-fallback-management',
      },
      {
        type: 'doc',
        id: 'connect/docs/delivery-error-codes',
      },
      {
        type: 'category',
        label: 'File Upload API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/upload-file',
          },
          {
            type: 'doc',
            id: 'connect/reference/download-file',
          },
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'Verification API',
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'connect/docs/verification-api-get-started',
      },
      {
        type: 'category',
        label: 'Verification API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/verify-request-v-2',
          },
          {
            type: 'doc',
            id: 'connect/reference/code-validation-v-2',
          },
          {
            type: 'doc',
            id: 'connect/reference/sma-coverage-check',
          },
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'Voice API',
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'connect/docs/voice-messaging',
      },
      {
        type: 'category',
        label: 'Voice Messaging',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/send-callflow',
          },
          {
            type: 'doc',
            id: 'connect/docs/voice-messaging-guide',
          },
          {
            type: 'doc',
            id: 'connect/docs/vm-session-status',
          },
        ],
      },
      {
        type: 'category',
        label: 'IVR',
        link: { type: 'doc', id: 'connect/docs/ivr-1' },
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/ivr-send-callflow',
          },
          {
            type: 'doc',
            id: 'connect/docs/webhook-setup-guide-for-ivr-',
          },
          {
            type: 'doc',
            id: 'connect/docs/simple-ivr',
          },
        ],
      },
      {
        type: 'category',
        label: 'Voice Profile API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/get-voice-profile-information',
          },
        ],
      },
      {
        type: 'category',
        label: 'Webhooks API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/get-webhooks-information-1',
          },
          {
            type: 'doc',
            id: 'connect/reference/create-a-new-webhook-1',
          },
          {
            type: 'doc',
            id: 'connect/reference/delete-a-specific-type-of-webhook-1',
          },
        ],
      },
      {
        type: 'category',
        label: 'Voice Call Action Webhook',
        link: { type: 'doc', id: 'connect/docs/voice-call-action-webhook' },
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/docs/call-action-handling-ivr',
          },
        ],
      },
      {
        type: 'category',
        label: 'Error Code (Voice Messaging & IVR)',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/docs/status-error-code',
          },
        ],
      },
      {
        type: 'category',
        label: 'Recording API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/get-recording-push-config-information',
          },
          {
            type: 'doc',
            id: 'connect/reference/create-a-new-recording-push-config',
          },
          {
            type: 'doc',
            id: 'connect/reference/delete-recording-push-config',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-recording-status-information',
          },
        ],
      },
      {
        type: 'category',
        label: 'Virtual Number Management API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/get-virtual-numbers',
          },
          {
            type: 'doc',
            id: 'connect/reference/check-virtual-number',
          },
        ],
      },
      {
        type: 'category',
        label: 'Reporting API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/start-voice-log-export-job',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-voice-log-export-job-result',
          },
          {
            type: 'doc',
            id: 'connect/reference/cancel-voice-log-export-job',
          },
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'Number Masking API',
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'connect/docs/getting-started-with-number-masking',
      },
      {
        type: 'doc',
        id: 'connect/docs/how-number-masking-protects-customer-privacy',
      },
      {
        type: 'category',
        label: 'Webhooks API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/get-webhooks-information',
          },
          {
            type: 'doc',
            id: 'connect/reference/create-a-new-webhook',
          },
          {
            type: 'doc',
            id: 'connect/reference/delete-a-specific-type-of-webhook',
          },
          {
            type: 'doc',
            id: 'connect/docs/webhook-setup-guide-for-ivr',
          },
        ],
      },
      {
        type: 'doc',
        id: 'connect/docs/call-status',
      },
      {
        type: 'doc',
        id: 'connect/docs/call-action-handling',
      },
      {
        type: 'doc',
        id: 'connect/docs/session-summary-number-masking',
      },
      {
        type: 'doc',
        id: 'connect/docs/error-codes-number-masking',
      },
      {
        type: 'doc',
        id: 'connect/docs/virtual-number-updated-event',
      },
      {
        type: 'doc',
        id: 'connect/docs/call-recordings',
      },
    ],
  },
  {
    type: 'category',
    label: 'Video Interaction API',
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'connect/docs/vi-introduction',
      },
      {
        type: 'category',
        label: 'Management API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/tokens',
          },
        ],
      },
      {
        type: 'doc',
        id: 'connect/docs/vi-gettingstarted',
      },
      {
        type: 'category',
        label: 'Reporting API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/call-log',
          },
          {
            type: 'doc',
            id: 'connect/reference/call-detail',
          },
          {
            type: 'doc',
            id: 'connect/reference/retrieve-image',
          },
        ],
      },
      {
        type: 'doc',
        id: 'connect/docs/token-example-creation',
      },
      {
        type: 'doc',
        id: 'connect/docs/iframe-integration',
      },
    ],
  },
  {
    type: 'category',
    label: 'Number Lookup API',
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'connect/docs/getting-started-with-number-lookup-api',
      },
      {
        type: 'category',
        label: 'Number Lookup API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/phone-number-lookup',
          },
        ],
      },
      {
        type: 'doc',
        id: 'connect/docs/number-lookup-error-codes',
      },
    ],
  },
  {
    type: 'category',
    label: 'Automation API',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Getting started with Automation API',
        link: {
          type: 'doc',
          id: 'connect/docs/getting-started-with-automation-api',
        },
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/docs/triggers-steps',
          },
          {
            type: 'doc',
            id: 'connect/docs/getting-started-with-automation-api-1',
          },
          {
            type: 'doc',
            id: 'connect/docs/context-scripting',
          },
          {
            type: 'doc',
            id: 'connect/docs/time-zone-onboarding',
          },
          {
            type: 'doc',
            id: 'connect/docs/examples',
          },
        ],
      },
      {
        type: 'category',
        label: 'Workflow Definition Management',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/get-all-definitions',
          },
          {
            type: 'doc',
            id: 'connect/reference/create-definition',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-specific-definition',
          },
          {
            type: 'doc',
            id: 'connect/reference/update-existing-definition',
          },
          {
            type: 'doc',
            id: 'connect/reference/delete-definitions',
          },
          {
            type: 'doc',
            id: 'connect/reference/start-workflow-instance',
          },
        ],
      },
      {
        type: 'category',
        label: 'Workflow Instance Management',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/get-workflow-instances',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-instance-status',
          },
          {
            type: 'doc',
            id: 'connect/reference/patch-workflow-instance',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-instance-errors',
          },
        ],
      },
      {
        type: 'category',
        label: 'Workflow Triggers',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/http-request-trigger',
          },
        ],
      },
      {
        type: 'category',
        label: 'Miscellaneous',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/get-timezones',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-functions',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-usage',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-usage-history',
          },
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'Contacts API',
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'connect/docs/getting-started-with-contacts-api',
      },
      {
        type: 'category',
        label: 'Contacts API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/contact-search',
          },
          {
            type: 'doc',
            id: 'connect/reference/create-contact',
          },
          {
            type: 'doc',
            id: 'connect/reference/blacklist-msisdn',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-contact-by-id',
          },
          {
            type: 'doc',
            id: 'connect/reference/delete-single-contact',
          },
          {
            type: 'doc',
            id: 'connect/reference/update-contact',
          },
        ],
      },
      {
        type: 'category',
        label: 'Groups API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/search-groups',
          },
          {
            type: 'doc',
            id: 'connect/reference/create-group',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-group-by-id',
          },
          {
            type: 'doc',
            id: 'connect/reference/delete-group',
          },
          {
            type: 'doc',
            id: 'connect/reference/update-group',
          },
          {
            type: 'doc',
            id: 'connect/reference/add-contacts-to-group',
          },
          {
            type: 'doc',
            id: 'connect/reference/delete-contacts-from-group',
          },
        ],
      },
      {
        type: 'category',
        label: 'Batch API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'connect/reference/batch-upload-contacts',
          },
          {
            type: 'doc',
            id: 'connect/reference/batch-delete-contacts',
          },
          {
            type: 'doc',
            id: 'connect/reference/batch-copy-contacts',
          },
          {
            type: 'doc',
            id: 'connect/reference/batch-move-contacts',
          },
          {
            type: 'doc',
            id: 'connect/reference/batch-delete-groups',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-batch-by-id',
          },
          {
            type: 'doc',
            id: 'connect/reference/get-batch-job-list',
          },
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'General API information',
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'connect/docs/api-error-codes',
      },
      {
        type: 'doc',
        id: 'connect/docs/message-status-references',
      },
      {
        type: 'doc',
        id: 'connect/docs/price-object-reference',
      },
      {
        type: 'doc',
        id: 'connect/docs/webhook-object-structure',
      },
      {
        type: 'doc',
        id: 'connect/docs/security',
      },
      {
        type: 'doc',
        id: 'connect/docs/ip-address-list',
      },
    ],
  },
  {
    type: 'category',
    label: 'SMPP',
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'connect/docs/smpp-connection',
      },
      {
        type: 'doc',
        id: 'connect/docs/smpp-tlvs',
      },
      {
        type: 'doc',
        id: 'connect/docs/smpp-delivery-receipts',
      },
      {
        type: 'doc',
        id: 'connect/docs/smpp-data-encoding',
      },
    ],
  },
];

module.exports = sidebarConfig;
