// Connect redirects
const redirects = [
  // docs -> docs
  {
    from: '/connect/docs',
    to: '/connect/docs/getting-started',
  },
  {
    from: '/connect/docs/guide-whatsapp',
    to: '/connect/docs/usage-samples-whatsapp',
  },
  {
    from: '/connect/docs/endpoint-migration-reference',
    to: '/connect/docs/api-endpoint-migration-guide',
  },
  {
    from: '/connect/docs/zendesk-notifications-targets',
    to: '/connect/docs/zendesk-notifications-webhooks',
  },
  // reference -> reference
  {
    from: '/connect/reference',
    to: '/connect/reference/getting-started-with-sms-api',
  },
  {
    from: '/connect/reference/http_request_trigger',
    to: '/connect/reference/http-request-trigger',
  },
  {
    from: '/connect/reference/check-virtual-number-1',
    to: '/connect/reference/check-virtual-number',
  },
  {
    from: '/connect/reference/start-voice-log-export-job-',
    to: '/connect/reference/start-voice-log-export-job',
  },
  {
    from: '/connect/reference/code-validation-v2',
    to: '/connect/reference/code-validation-v-2',
  },
  {
    from: '/connect/reference/verify-request-v2',
    to: '/connect/reference/verify-request-v-2',
  },
  {
    from: '/connect/reference/send-sms-api',
    to: '/connect/reference/send-sms-single',
  },
  {
    from: '/connect/reference/reporting-api-2',
    to: '/connect/reference/start-log-export-job',
  },
  {
    from: '/connect/reference/send-message-api',
    to: '/connect/reference/send-message',
  },
  {
    from: '/connect/reference/ivr',
    to: '/connect/reference/ivr-send-callflow',
  },
  {
    from: '/connect/reference/webhooks-api',
    to: '/connect/reference/get-webhooks-information',
  },
  {
    from: '/connect/reference/management-api',
    to: '/connect/reference/tokens',
  },
  {
    from: '/connect/reference/workflow-definition-management',
    to: '/connect/reference/get-all-definitions',
  },
  {
    from: '/connect/reference/workflow-instance-management',
    to: '/connect/reference/get-workflow-instances',
  },
  {
    from: '/connect/reference/groups-api',
    to: '/connect/reference/search-groups',
  },
  {
    from: '/connect/reference/webhook-configuration-api',
    to: '/connect/reference/get-webhooks-2',
  },
  {
    from: '/connect/reference/session-status',
    to: '/connect/reference/vm-session-status',
  },
  {
    from: '/connect/reference/page',
    to: '/connect/reference/verification-api-get-started',
  },
  // reference -> docs
  {
    from: '/connect/reference/api-error-codes',
    to: '/connect/docs/api-error-codes',
  },
  {
    from: '/connect/reference/message-status-references',
    to: '/connect/docs/message-status-references',
  },
  {
    from: '/connect/reference/price-object-reference',
    to: '/connect/docs/price-object-reference',
  },
  {
    from: '/connect/reference/webhook-object-structure',
    to: '/connect/docs/webhook-object-structure',
  },
  {
    from: '/connect/reference/security',
    to: '/connect/docs/security',
  },
  {
    from: '/connect/reference/ip-address-list',
    to: '/connect/docs/ip-address-list',
  },
  {
    from: '/connect/reference/smpp-connection',
    to: '/connect/docs/smpp-connection',
  },
  {
    from: '/connect/reference/smpp-tlvs',
    to: '/connect/docs/smpp-tlvs',
  },
  {
    from: '/connect/reference/smpp-delivery-receipts',
    to: '/connect/docs/smpp-delivery-receipts',
  },
  {
    from: '/connect/reference/smpp-data-encoding',
    to: '/connect/docs/smpp-data-encoding',
  },
  {
    from: '/connect/reference/getting-started-with-number-masking',
    to: '/connect/docs/getting-started-with-number-masking',
  },
  {
    from: '/connect/reference/how-number-masking-protects-customer-privacy',
    to: '/connect/docs/how-number-masking-protects-customer-privacy',
  },
  {
    from: '/connect/reference/webhook-setup-guide-for-ivr',
    to: '/connect/docs/webhook-setup-guide-for-ivr',
  },
  {
    from: '/connect/reference/call-status',
    to: '/connect/docs/call-status',
  },
  {
    from: '/connect/reference/call-action-handling',
    to: '/connect/docs/call-action-handling',
  },
  {
    from: '/connect/reference/session-summary-number-masking',
    to: '/connect/docs/session-summary-number-masking',
  },
  {
    from: '/connect/reference/error-codes-number-masking',
    to: '/connect/docs/error-codes-number-masking',
  },
  {
    from: '/connect/reference/virtual-number-updated-event',
    to: '/connect/docs/virtual-number-updated-event',
  },
  {
    from: '/connect/reference/call-recordings',
    to: '/connect/docs/call-recordings',
  },
  {
    from: '/connect/reference/call-action-handling-ivr',
    to: '/connect/docs/call-action-handling-ivr',
  },
  {
    from: '/connect/reference/status-error-code',
    to: '/connect/docs/status-error-code',
  },
  {
    from: '/connect/reference/webhook-setup-guide-for-ivr-',
    to: '/connect/docs/webhook-setup-guide-for-ivr-',
  },
  {
    from: '/connect/reference/simple-ivr',
    to: '/connect/docs/simple-ivr',
  },
  {
    from: '/connect/reference/context-scripting',
    to: '/connect/docs/context-scripting',
  },
  {
    from: '/connect/reference/triggers-steps',
    to: '/connect/docs/triggers-steps',
  },
  {
    from: '/connect/reference/getting-started-with-automation-api-1',
    to: '/connect/docs/getting-started-with-automation-api-1',
  },
  {
    from: '/connect/reference/time-zone-onboarding',
    to: '/connect/docs/time-zone-onboarding',
  },
  {
    from: '/connect/reference/examples',
    to: '/connect/docs/examples',
  },
  {
    from: '/connect/reference/getting-started-with-contacts-api',
    to: '/connect/docs/getting-started-with-contacts-api',
  },
  {
    from: '/connect/reference/number-lookup-error-codes',
    to: '/connect/docs/number-lookup-error-codes',
  },
  {
    from: '/connect/reference/getting-started-with-number-lookup-api',
    to: '/connect/docs/getting-started-with-number-lookup-api',
  },
  {
    from: '/connect/reference/iframe-integration',
    to: '/connect/docs/iframe-integration',
  },
  {
    from: '/connect/reference/token-example-creation',
    to: '/connect/docs/token-example-creation',
  },
  {
    from: '/connect/reference/vi-gettingstarted',
    to: '/connect/docs/vi-gettingstarted',
  },
  {
    from: '/connect/reference/vi-introduction',
    to: '/connect/docs/vi-introduction',
  },
  {
    from: '/connect/reference/inbound-sms',
    to: '/connect/docs/inbound-sms',
  },
  {
    from: '/connect/reference/delivery-receipts-for-outbound-sms',
    to: '/connect/docs/delivery-receipts-for-outbound-sms',
  },
  {
    from: '/connect/reference/sms-engage-response-webhook',
    to: '/connect/docs/sms-engage-response-webhook',
  },
  {
    from: '/connect/reference/delivery-receipts-error-codes',
    to: '/connect/docs/delivery-receipts-error-codes',
  },
  {
    from: '/connect/reference/chatapps-fallback-management',
    to: '/connect/docs/chatapps-fallback-management',
  },
  {
    from: '/connect/reference/delivery-error-codes',
    to: '/connect/docs/delivery-error-codes',
  },
  {
    from: '/connect/reference/delivery-receipts-for-outbound-chatapps',
    to: '/connect/docs/delivery-receipts-for-outbound-chatapps',
  },
  {
    from: '/connect/reference/inbound-chatapps-message',
    to: '/connect/docs/inbound-chatapps-message',
  },
  {
    from: '/connect/reference/whatsapp-template-change-webhook',
    to: '/connect/docs/whatsapp-template-change-webhook',
  },
  {
    from: '/connect/reference/whatsapp-phone-number-quality-change-webhook',
    to: '/connect/docs/whatsapp-phone-number-quality-change-webhook',
  },
  {
    from: '/connect/reference/messaging-apps-api-get-started',
    to: '/connect/docs/messaging-apps-api-get-started',
  },
  {
    from: '/connect/reference/list-of-supported-chatapps-channels',
    to: '/connect/docs/list-of-supported-chatapps-channels',
  },
  {
    from: '/connect/reference/supported-chat-apps-content-type',
    to: '/connect/docs/supported-chat-apps-content-type',
  },
  {
    from: '/connect/reference/download-chatapps-logs',
    to: '/connect/docs/download-chatapps-logs',
  },
  {
    from: '/connect/reference/getting-started-with-sms-api',
    to: '/connect/docs/getting-started-with-sms-api',
  },
  {
    from: '/connect/reference/verification-api-get-started',
    to: '/connect/docs/verification-api-get-started',
  },
  {
    from: '/connect/reference/vm-session-status',
    to: '/connect/docs/vm-session-status',
  },
  {
    from: '/connect/reference/voice-messaging',
    to: '/connect/docs/voice-messaging',
  },
  {
    from: '/connect/reference/voice-messaging-guide',
    to: '/connect/docs/voice-messaging-guide',
  },
  {
    from: '/connect/reference/webhooks-configuration-api',
    to: '/connect/docs/webhooks-configuration-api',
  },
  {
    from: '/connect/reference/ivr-1',
    to: '/connect/docs/ivr-1',
  },
  {
    from: '/connect/reference/getting-started-with-automation-api',
    to: '/connect/docs/getting-started-with-automation-api',
  },
  {
    from: '/connect/reference/title-page',
    to: '/connect/docs/getting-started-with-number-masking',
  },
  // docs -> reference
  {
    from: '/connect/docs/survey-send-many',
    to: '/connect/reference/survey-send-many',
  },
];

module.exports = redirects;
