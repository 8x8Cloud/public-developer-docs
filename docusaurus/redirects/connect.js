module.exports = [
  // CRITICAL: Section navigation tab redirects
  // These redirects are required because SectionNavigation.js component creates links to these paths
  // on every Connect documentation page. Without these redirects, they appear as 690 broken links.
  {
    from: '/connect/docs',
    to: '/connect/docs/8x8-cpaas-products',
  },
  {
    from: '/connect/reference',
    to: '/connect/reference/send-sms-single',
  },

  // ============================================================================
  // Reference -> Docs redirects
  // Legacy /connect/reference/* URLs that were moved to /connect/docs/*
  // ============================================================================
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
    from: '/connect/reference/delivery-error-codes',
    to: '/connect/docs/delivery-error-codes',
  },
  {
    from: '/connect/reference/delivery-receipts-error-codes',
    to: '/connect/docs/delivery-receipts-error-codes',
  },
  {
    from: '/connect/reference/delivery-receipts-for-outbound-sms',
    to: '/connect/docs/delivery-receipts-for-outbound-sms',
  },
  {
    from: '/connect/reference/delivery-receipts-for-outbound-chatapps',
    to: '/connect/docs/delivery-receipts-for-outbound-chatapps',
  },
  {
    from: '/connect/reference/inbound-sms',
    to: '/connect/docs/inbound-sms',
  },
  {
    from: '/connect/reference/inbound-chatapps-message',
    to: '/connect/docs/inbound-chatapps-message',
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
    from: '/connect/reference/verification-api-get-started',
    to: '/connect/docs/verification-api-get-started',
  },
  {
    from: '/connect/reference/getting-started-with-sms-api',
    to: '/connect/docs/getting-started-with-sms-api',
  },
  {
    from: '/connect/reference/getting-started-with-number-lookup-api',
    to: '/connect/docs/getting-started-with-number-lookup-api',
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
    from: '/connect/reference/getting-started-with-contacts-api',
    to: '/connect/docs/getting-started-with-contacts-api',
  },
  {
    from: '/connect/reference/getting-started-with-automation-api',
    to: '/connect/docs/getting-started-with-automation-api',
  },
  {
    from: '/connect/reference/webhooks-configuration-api',
    to: '/connect/docs/webhooks-configuration-api',
  },
  {
    from: '/connect/reference/iframe-integration',
    to: '/connect/docs/iframe-integration',
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
    from: '/connect/reference/chatapps-fallback-management',
    to: '/connect/docs/chatapps-fallback-management',
  },
  {
    from: '/connect/reference/messaging-apps-api-get-started',
    to: '/connect/docs/messaging-apps-api-get-started',
  },
  {
    from: '/connect/reference/number-lookup-error-codes',
    to: '/connect/docs/number-lookup-error-codes',
  },
  {
    from: '/connect/reference/voice-messaging',
    to: '/connect/docs/voice/voice-messaging/voice-messaging-guide',
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
    from: '/connect/reference/send-sms-api',
    to: '/connect/docs/send-sms-api-reference',
  },
  {
    from: '/connect/reference/send-sms-batch-compact',
    to: '/connect/reference/send-many-sms',
  },
  {
    from: '/connect/reference/send-sms-batch',
    to: '/connect/reference/send-many-sms',
  },

  // ============================================================================
  // Reference -> Reference redirects
  // Legacy API reference URLs that point to new API reference URLs
  // ============================================================================
  {
    from: '/connect/reference/code-validation-v2',
    to: '/connect/reference/code-validation-v-2',
  },
  {
    from: '/connect/reference/verify-request-v2',
    to: '/connect/reference/verify-request-v-2',
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
    to: '/connect/reference/send-callflow',
  },
  {
    from: '/connect/reference/ivr-send-callflow',
    to: '/connect/reference/send-callflow',
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
    from: '/connect/reference/groups-api',
    to: '/connect/reference/search-groups',
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
    from: '/connect/reference/page',
    to: '/connect/reference/verification-api-get-started',
  },
  {
    from: '/connect/reference/title-page',
    to: '/connect/docs/getting-started-with-number-masking',
  },

  // ============================================================================
  // Docs -> Docs redirects
  // Legacy docs URLs that were renamed or moved
  // ============================================================================
  {
    from: '/connect/docs/zendesk-notifications-targets',
    to: '/connect/docs/zendesk-notifications-webhooks',
  },

  // ============================================================================
  // Docs -> Reference redirects
  // Docs pages that were moved to API reference
  // ============================================================================
  {
    from: '/connect/docs/survey-send-many',
    to: '/connect/reference/survey-send-many',
  },

  // Redirect from /connect/docs/index to /connect/docs/overview
  // { from: '/connect/docs/', to: '/connect/docs/overview' },
  // { from: '/connect/docs/index', to: '/connect/docs/overview' },

  // NOTE: The following redirects are commented out because the target pages don't exist
  // They were likely planned but never implemented

  // API Reference redirects - DISABLED (target pages don't exist)
  // { from: '/connect/docs/api-reference', to: '/connect/api-reference/overview' },
  // { from: '/connect/docs/api-reference/overview', to: '/connect/api-reference/overview' },
  // { from: '/connect/docs/api-reference/authentication', to: '/connect/api-reference/authentication' },
  // { from: '/connect/docs/api-reference/errors', to: '/connect/api-reference/errors' },
  // { from: '/connect/docs/api-reference/pagination', to: '/connect/api-reference/pagination' },
  // { from: '/connect/docs/api-reference/rate-limiting', to: '/connect/api-reference/rate-limiting' },
  // { from: '/connect/docs/api-reference/webhooks', to: '/connect/api-reference/webhooks' },
  // { from: '/connect/docs/api-reference/media', to: '/connect/api-reference/media' },
  // { from: '/connect/docs/api-reference/messages', to: '/connect/api-reference/messages' },
  // { from: '/connect/docs/api-reference/contacts', to: '/connect/api-reference/contacts' },
  // { from: '/connect/docs/api-reference/channels', to: '/connect/api-reference/channels' },
  // { from: '/connect/docs/api-reference/templates', to: '/connect/api-reference/templates' },
  // { from: '/connect/docs/api-reference/users', to: '/connect/api-reference/users' },
  // { from: '/connect/docs/api-reference/teams', to: '/connect/api-reference/teams' },
  // { from: '/connect/docs/api-reference/queues', to: '/connect/api-reference/queues' },
  // { from: '/connect/docs/api-reference/analytics', to: '/connect/api-reference/analytics' },

  // Guides redirects - DISABLED (target pages don't exist)
  // { from: '/connect/docs/guides', to: '/connect/docs/guides/overview' },
  // { from: '/connect/docs/guides/getting-started', to: '/connect/docs/guides/getting-started' },
  // { from: '/connect/docs/guides/sending-messages', to: '/connect/docs/guides/sending-messages' },
  // { from: '/connect/docs/guides/receiving-messages', to: '/connect/docs/guides/receiving-messages' },
  // { from: '/connect/docs/guides/media-handling', to: '/connect/docs/guides/media-handling' },
  // { from: '/connect/docs/guides/message-templates', to: '/connect/docs/guides/message-templates' },
  // { from: '/connect/docs/guides/webhooks-setup', to: '/connect/docs/guides/webhooks-setup' },
  // { from: '/connect/docs/guides/authentication-setup', to: '/connect/docs/guides/authentication-setup' },
  // { from: '/connect/docs/guides/error-handling', to: '/connect/docs/guides/error-handling' },
  // { from: '/connect/docs/guides/best-practices', to: '/connect/docs/guides/best-practices' },

  // WhatsApp specific redirects - DISABLED (target pages don't exist)
  // { from: '/connect/docs/whatsapp', to: '/connect/docs/channels/whatsapp/overview' },
  // { from: '/connect/docs/whatsapp/overview', to: '/connect/docs/channels/whatsapp/overview' },
  // { from: '/connect/docs/whatsapp/getting-started', to: '/connect/docs/channels/whatsapp/getting-started' },
  // { from: '/connect/docs/whatsapp/message-types', to: '/connect/docs/channels/whatsapp/message-types' },
  // { from: '/connect/docs/whatsapp/templates', to: '/connect/docs/channels/whatsapp/templates' },
  // { from: '/connect/docs/whatsapp/media', to: '/connect/docs/channels/whatsapp/media' },
  // { from: '/connect/docs/whatsapp/interactive-messages', to: '/connect/docs/channels/whatsapp/interactive-messages' },
  // { from: '/connect/docs/whatsapp/webhooks', to: '/connect/docs/channels/whatsapp/webhooks' },
  // { from: '/connect/docs/whatsapp/business-features', to: '/connect/docs/channels/whatsapp/business-features' },
  // { from: '/connect/docs/whatsapp/best-practices', to: '/connect/docs/channels/whatsapp/best-practices' },
  // { from: '/connect/docs/whatsapp/limitations', to: '/connect/docs/channels/whatsapp/limitations' },

  // SMS specific redirects - DISABLED (target pages don't exist)
  // { from: '/connect/docs/sms', to: '/connect/docs/channels/sms/overview' },
  // { from: '/connect/docs/sms/overview', to: '/connect/docs/channels/sms/overview' },
  // { from: '/connect/docs/sms/getting-started', to: '/connect/docs/channels/sms/getting-started' },
  // { from: '/connect/docs/sms/sending-messages', to: '/connect/docs/channels/sms/sending-messages' },
  // { from: '/connect/docs/sms/receiving-messages', to: '/connect/docs/channels/sms/receiving-messages' },
  // { from: '/connect/docs/sms/delivery-receipts', to: '/connect/docs/channels/sms/delivery-receipts' },
  // { from: '/connect/docs/sms/best-practices', to: '/connect/docs/channels/sms/best-practices' },
  
  // Facebook Messenger specific redirects
  // { from: '/connect/docs/messenger', to: '/connect/docs/channels/messenger/overview' },
  // { from: '/connect/docs/messenger/overview', to: '/connect/docs/channels/messenger/overview' },
  // { from: '/connect/docs/messenger/getting-started', to: '/connect/docs/channels/messenger/getting-started' },
  // { from: '/connect/docs/messenger/message-types', to: '/connect/docs/channels/messenger/message-types' },
  // { from: '/connect/docs/messenger/quick-replies', to: '/connect/docs/channels/messenger/quick-replies' },
  // { from: '/connect/docs/messenger/buttons', to: '/connect/docs/channels/messenger/buttons' },
  // { from: '/connect/docs/messenger/webhooks', to: '/connect/docs/channels/messenger/webhooks' },
  
  // Instagram specific redirects
  // { from: '/connect/docs/instagram', to: '/connect/docs/channels/instagram/overview' },
  // { from: '/connect/docs/instagram/overview', to: '/connect/docs/channels/instagram/overview' },
  // { from: '/connect/docs/instagram/getting-started', to: '/connect/docs/channels/instagram/getting-started' },
  // { from: '/connect/docs/instagram/message-types', to: '/connect/docs/channels/instagram/message-types' },
  // { from: '/connect/docs/instagram/stories', to: '/connect/docs/channels/instagram/stories' },
  // { from: '/connect/docs/instagram/webhooks', to: '/connect/docs/channels/instagram/webhooks' },
  
  // Web Chat specific redirects
  // { from: '/connect/docs/webchat', to: '/connect/docs/channels/webchat/overview' },
  // { from: '/connect/docs/webchat/overview', to: '/connect/docs/channels/webchat/overview' },
  // { from: '/connect/docs/webchat/installation', to: '/connect/docs/channels/webchat/installation' },
  // { from: '/connect/docs/webchat/configuration', to: '/connect/docs/channels/webchat/configuration' },
  // { from: '/connect/docs/webchat/customization', to: '/connect/docs/channels/webchat/customization' },
  // { from: '/connect/docs/webchat/events', to: '/connect/docs/channels/webchat/events' },
  // { from: '/connect/docs/webchat/api', to: '/connect/docs/channels/webchat/api' },
  
  // SDK redirects
  // { from: '/connect/docs/sdks', to: '/connect/docs/sdks/overview' },
  // { from: '/connect/docs/sdks/javascript', to: '/connect/docs/sdks/javascript' },
  // { from: '/connect/docs/sdks/python', to: '/connect/docs/sdks/python' },
  // { from: '/connect/docs/sdks/java', to: '/connect/docs/sdks/java' },
  // { from: '/connect/docs/sdks/ruby', to: '/connect/docs/sdks/ruby' },
  // { from: '/connect/docs/sdks/php', to: '/connect/docs/sdks/php' },
  // { from: '/connect/docs/sdks/csharp', to: '/connect/docs/sdks/csharp' },
  
  // Legacy path redirects
  // { from: '/docs/connect/overview', to: '/connect/docs/overview' },
  // { from: '/docs/connect/api-reference', to: '/connect/api-reference/overview' },
  // { from: '/docs/connect/guides', to: '/connect/docs/guides/overview' },
  
  // Additional common redirects
  // { from: '/connect/docs/quick-start', to: '/connect/docs/guides/getting-started' },
  // { from: '/connect/docs/introduction', to: '/connect/docs/overview' },
  // { from: '/connect/getting-started', to: '/connect/docs/guides/getting-started' },
  
  // Redirect old API paths
  // { from: '/connect/api/v1', to: '/connect/api-reference/overview' },
  // { from: '/connect/api/v2', to: '/connect/api-reference/overview' },
  
  // Webhook specific redirects
  // { from: '/connect/webhooks', to: '/connect/api-reference/webhooks' },
  // { from: '/connect/docs/webhook-setup', to: '/connect/docs/guides/webhooks-setup' },
  // { from: '/connect/docs/webhook-events', to: '/connect/api-reference/webhooks' },
  
  // Template redirects
  // { from: '/connect/templates', to: '/connect/api-reference/templates' },
  // { from: '/connect/docs/template-management', to: '/connect/docs/guides/message-templates' },
  
  // Analytics redirects
  // { from: '/connect/analytics', to: '/connect/api-reference/analytics' },
  // { from: '/connect/docs/analytics', to: '/connect/api-reference/analytics' },
  // { from: '/connect/docs/reporting', to: '/connect/api-reference/analytics' },
  
  // Team management redirects
  // { from: '/connect/teams', to: '/connect/api-reference/teams' },
  // { from: '/connect/docs/team-management', to: '/connect/api-reference/teams' },
  
  // User management redirects
  // { from: '/connect/users', to: '/connect/api-reference/users' },
  // { from: '/connect/docs/user-management', to: '/connect/api-reference/users' },
  
  // Queue management redirects
  // { from: '/connect/queues', to: '/connect/api-reference/queues' },
  // { from: '/connect/docs/queue-management', to: '/connect/api-reference/queues' },
  
  // Contact management redirects
  // { from: '/connect/contacts', to: '/connect/api-reference/contacts' },
  // { from: '/connect/docs/contact-management', to: '/connect/api-reference/contacts' },
  
  // Media handling redirects
  // { from: '/connect/media', to: '/connect/api-reference/media' },
  // { from: '/connect/docs/media', to: '/connect/docs/guides/media-handling' },
  
  // Message handling redirects
  // { from: '/connect/messages', to: '/connect/api-reference/messages' },
  // { from: '/connect/docs/messages', to: '/connect/docs/guides/sending-messages' },
  
  // Channel management redirects
  // { from: '/connect/channels', to: '/connect/api-reference/channels' },
  // { from: '/connect/docs/channel-management', to: '/connect/api-reference/channels' },
  
  // Authentication redirects
  // { from: '/connect/authentication', to: '/connect/api-reference/authentication' },
  // { from: '/connect/docs/auth', to: '/connect/docs/guides/authentication-setup' },
  
  // Error handling redirects
  // { from: '/connect/errors', to: '/connect/api-reference/errors' },
  // { from: '/connect/docs/errors', to: '/connect/docs/guides/error-handling' },
  
  // Rate limiting redirects
  // { from: '/connect/rate-limits', to: '/connect/api-reference/rate-limiting' },
  // { from: '/connect/docs/rate-limits', to: '/connect/api-reference/rate-limiting' },
  
  // Pagination redirects
  // { from: '/connect/pagination', to: '/connect/api-reference/pagination' },
  // { from: '/connect/docs/pagination', to: '/connect/api-reference/pagination' },
  
  // Best practices redirects
  // { from: '/connect/best-practices', to: '/connect/docs/guides/best-practices' },
  // { from: '/connect/docs/recommendations', to: '/connect/docs/guides/best-practices' },
  
  // Tutorial redirects
  // { from: '/connect/tutorials', to: '/connect/docs/guides/overview' },
  // { from: '/connect/docs/tutorials', to: '/connect/docs/guides/overview' },
  
  // Integration redirects
  // { from: '/connect/integrations', to: '/connect/docs/guides/overview' },
  // { from: '/connect/docs/integrations', to: '/connect/docs/guides/overview' },
  
  // Support redirects
  { from: '/connect/support', to: '/connect/docs/overview' },
  { from: '/connect/help', to: '/connect/docs/overview' },
  
  // Changelog redirects
  { from: '/connect/changelog', to: '/connect/docs/overview' },
  { from: '/connect/docs/changelog', to: '/connect/docs/overview' },
  { from: '/connect/docs/release-notes', to: '/connect/docs/overview' },
  
  // FAQ redirects
  { from: '/connect/faq', to: '/connect/docs/overview' },
  { from: '/connect/docs/faq', to: '/connect/docs/overview' },
  
  // Glossary redirects
  { from: '/connect/glossary', to: '/connect/docs/overview' },
  { from: '/connect/docs/glossary', to: '/connect/docs/overview' },
  
  // API versioning redirects
  // { from: '/connect/docs/versioning', to: '/connect/api-reference/overview' },
  // { from: '/connect/api-versioning', to: '/connect/api-reference/overview' },
  
  // Security redirects
  // { from: '/connect/security', to: '/connect/api-reference/authentication' },
  // { from: '/connect/docs/security', to: '/connect/api-reference/authentication' },
  
  // Compliance redirects
  { from: '/connect/compliance', to: '/connect/docs/overview' },
  { from: '/connect/docs/compliance', to: '/connect/docs/overview' },
  
  // Privacy redirects
  { from: '/connect/privacy', to: '/connect/docs/overview' },
  { from: '/connect/docs/privacy', to: '/connect/docs/overview' },
  
  // Terms redirects
  { from: '/connect/terms', to: '/connect/docs/overview' },
  { from: '/connect/docs/terms', to: '/connect/docs/overview' },
  
  // Pricing redirects
  { from: '/connect/pricing', to: '/connect/docs/overview' },
  { from: '/connect/docs/pricing', to: '/connect/docs/overview' },
  
  // Service status redirects
  { from: '/connect/status', to: '/connect/docs/overview' },
  { from: '/connect/docs/status', to: '/connect/docs/overview' },
  
  // Migration guides
  // { from: '/connect/docs/migration', to: '/connect/docs/guides/overview' },
  // { from: '/connect/migration', to: '/connect/docs/guides/overview' },
  
  // Troubleshooting redirects
  // { from: '/connect/troubleshooting', to: '/connect/docs/guides/error-handling' },
  // { from: '/connect/docs/troubleshooting', to: '/connect/docs/guides/error-handling' },
  
  // API explorer redirects
  // { from: '/connect/api-explorer', to: '/connect/api-reference/overview' },
  // { from: '/connect/docs/api-explorer', to: '/connect/api-reference/overview' },
  
  // Sandbox redirects
  // { from: '/connect/sandbox', to: '/connect/docs/guides/getting-started' },
  // { from: '/connect/docs/sandbox', to: '/connect/docs/guides/getting-started' },
  
  // Testing redirects
  // { from: '/connect/testing', to: '/connect/docs/guides/best-practices' },
  // { from: '/connect/docs/testing', to: '/connect/docs/guides/best-practices' },
  
  // Deployment redirects
  // { from: '/connect/deployment', to: '/connect/docs/guides/overview' },
  // { from: '/connect/docs/deployment', to: '/connect/docs/guides/overview' },
  
  // Monitoring redirects
  // { from: '/connect/monitoring', to: '/connect/api-reference/analytics' },
  // { from: '/connect/docs/monitoring', to: '/connect/api-reference/analytics' },
  
  // Performance redirects
  // { from: '/connect/performance', to: '/connect/docs/guides/best-practices' },
  // { from: '/connect/docs/performance', to: '/connect/docs/guides/best-practices' },
  
  // Scalability redirects
  // { from: '/connect/scalability', to: '/connect/docs/guides/best-practices' },
  // { from: '/connect/docs/scalability', to: '/connect/docs/guides/best-practices' },
  
  // Architecture redirects
  { from: '/connect/architecture', to: '/connect/docs/overview' },
  { from: '/connect/docs/architecture', to: '/connect/docs/overview' },
  
  // Use cases redirects
  // { from: '/connect/use-cases', to: '/connect/docs/guides/overview' },
  // { from: '/connect/docs/use-cases', to: '/connect/docs/guides/overview' },
  
  // Examples redirects
  // { from: '/connect/examples', to: '/connect/docs/guides/overview' },
  // { from: '/connect/docs/examples', to: '/connect/docs/guides/overview' },
  
  // Code samples redirects
  // { from: '/connect/code-samples', to: '/connect/docs/guides/overview' },
  // { from: '/connect/docs/code-samples', to: '/connect/docs/guides/overview' },
  
  // Reference redirects
  // { from: '/connect/reference', to: '/connect/api-reference/overview' },
  // { from: '/connect/docs/reference', to: '/connect/api-reference/overview' },
  
  // Voice SDK old files redirect to new voice/ subdirectory
  { from: '/connect/docs/overview', to: '/connect/docs/voice/voice-sdk-overview' },
  { from: '/connect/docs/android-integrating-the-sdk', to: '/connect/docs/voice/voice-sdk-android-integrating' },
  { from: '/connect/docs/ios-integrating-the-sdk', to: '/connect/docs/voice/voice-sdk-ios-integrating' },
  { from: '/connect/docs/using-the-sdk', to: '/connect/docs/voice/voice-sdk-using' },
  { from: '/connect/docs/using-the-ios-sdk', to: '/connect/docs/voice/voice-sdk-using-ios' },
  { from: '/connect/docs/api-specification-android', to: '/connect/docs/voice/voice-sdk-api-specification-android' },
  { from: '/connect/docs/api-specification-ios', to: '/connect/docs/voice/voice-sdk-api-specification-ios' },

  // Voice documentation restructuring redirects
  { from: '/connect/docs/ivr-1', to: '/connect/docs/voice/ivr-introduction' },
  { from: '/connect/docs/ivr-introduction', to: '/connect/docs/voice/ivr-introduction' },
  { from: '/connect/docs/simple-ivr', to: '/connect/docs/voice/simple-ivr' },
  { from: '/connect/docs/advanced-ivr', to: '/connect/docs/voice/advanced-ivr' },
  { from: '/connect/docs/voice-messaging-guide', to: '/connect/docs/voice/voice-messaging-guide' },
  { from: '/connect/docs/vm-session-status', to: '/connect/docs/voice/session-status' },
  { from: '/connect/docs/getting-started-with-number-masking', to: '/connect/docs/voice/getting-started-with-number-masking' },
  { from: '/connect/docs/how-number-masking-protects-customer-privacy', to: '/connect/docs/voice/how-number-masking-protects-customer-privacy' },
  { from: '/connect/docs/call-status', to: '/connect/docs/voice/number-masking-call-status' },
  { from: '/connect/docs/call-action-handling', to: '/connect/docs/voice/number-masking/call-action-handling' },
  { from: '/connect/docs/session-summary-number-masking', to: '/connect/docs/voice/session-summary-number-masking' },
  { from: '/connect/docs/error-codes-number-masking', to: '/connect/docs/voice/number-masking-error-codes' },
  { from: '/connect/docs/call-recordings', to: '/connect/docs/voice/number-masking-call-recordings' },
  { from: '/connect/docs/virtual-number-updated-event', to: '/connect/docs/voice/virtual-number-updated' },
  { from: '/connect/docs/webhook-setup-guide-for-ivr', to: '/connect/docs/voice/webhook-setup-guide-for-ivr' },
  { from: '/connect/docs/voice-call-action-webhook', to: '/connect/docs/voice/voice-call-action-webhook-guide' },
  { from: '/connect/docs/call-action-handling-ivr', to: '/connect/docs/voice/ivr/call-action-handling' },
  { from: '/connect/docs/status-error-code', to: '/connect/docs/voice/ivr-voicemessaging-error-codes' },
  { from: '/connect/docs/whatsapp-calling-introduction', to: '/connect/docs/voice/whatsapp-business-calling-overview' },
  { from: '/connect/reference/ivr-1', to: '/connect/docs/voice/ivr-introduction' },
  { from: '/connect/reference/ivr-introduction', to: '/connect/docs/voice/ivr-introduction' },

  // Voice documentation reorganization 2025 - subfolder structure with simplified slugs

  // Voice SDK redirects
  { from: '/connect/docs/voice/voice-sdk-overview', to: '/connect/docs/voice/voice-sdk/overview' },
  { from: '/connect/docs/voice/voice-sdk-android-integrating', to: '/connect/docs/voice/voice-sdk/android-integration' },
  { from: '/connect/docs/voice/voice-sdk-using', to: '/connect/docs/voice/voice-sdk/android-usage' },
  { from: '/connect/docs/voice/voice-sdk-api-specification-android', to: '/connect/docs/voice/voice-sdk/android-api-reference' },
  { from: '/connect/docs/voice/voice-sdk-ios-integrating', to: '/connect/docs/voice/voice-sdk/ios-integration' },
  { from: '/connect/docs/voice/voice-sdk-using-ios', to: '/connect/docs/voice/voice-sdk/ios-usage' },
  { from: '/connect/docs/voice/voice-sdk-api-specification-ios', to: '/connect/docs/voice/voice-sdk/ios-api-reference' },

  // IVR redirects
  { from: '/connect/docs/voice/simple-ivr', to: '/connect/docs/voice/ivr/simple-ivr-guide' },
  { from: '/connect/docs/voice/advanced-ivr', to: '/connect/docs/voice/ivr/advanced-ivr-guide' },
  { from: '/connect/docs/voice/ivr-introduction', to: '/connect/docs/voice/ivr/ivr-introduction' },
  { from: '/connect/docs/voice/webhook-setup-guide-for-ivr', to: '/connect/docs/voice/ivr/webhook-setup-guide-for-ivr' },

  // Number Masking redirects
  { from: '/connect/docs/voice/getting-started-with-number-masking', to: '/connect/docs/voice/number-masking/getting-started' },
  { from: '/connect/docs/voice/session-summary-number-masking', to: '/connect/docs/voice/number-masking/session-summary' },
  { from: '/connect/docs/voice/number-masking-call-status', to: '/connect/docs/voice/number-masking/call-status' },
  { from: '/connect/docs/voice/number-masking-call-recordings', to: '/connect/docs/voice/number-masking/call-recordings' },
  { from: '/connect/docs/voice/how-number-masking-protects-customer-privacy', to: '/connect/docs/voice/number-masking/how-number-masking-protects-customer-privacy' },
  { from: '/connect/docs/voice/virtual-number-updated', to: '/connect/docs/voice/number-masking/virtual-number-updated' },
  { from: '/connect/docs/voice/number-masking-error-codes', to: '/connect/docs/voice/error-codes/number-masking-error-codes' },

  // Webhook Guides redirects
  { from: '/connect/docs/voice/voice-call-action-webhook-guide', to: '/connect/docs/voice/webhook-guides/voice-call-action-webhook-guide' },
  { from: '/connect/docs/voice/voice-session-summary-webhook', to: '/connect/docs/voice/webhook-guides/voice-session-summary-webhook' },

  // Error Codes redirects
  { from: '/connect/docs/voice/ivr-voicemessaging-error-codes', to: '/connect/docs/voice/error-codes/voice-status-codes' },
  { from: '/connect/docs/voice/error-codes/ivr-voicemessaging-error-codes', to: '/connect/docs/voice/error-codes/voice-status-codes' },

  // Voice Messaging redirects
  { from: '/connect/docs/voice/voice-messaging-guide', to: '/connect/docs/voice/voice-messaging/voice-messaging-guide' },
  { from: '/connect/docs/voice/session-status', to: '/connect/docs/voice/voice-messaging/session-status' },

  // WhatsApp Business Calling redirects
  { from: '/connect/docs/voice/whatsapp-business-calling-overview', to: '/connect/docs/voice/whatsapp-business-calling/overview' },
  { from: '/connect/docs/voice/whatsapp-business-calling/whatsapp-business-calling-overview', to: '/connect/docs/voice/whatsapp-business-calling/overview' },
  { from: '/connect/docs/voice/whatsapp-business-calling/whatsapp-business-calling-user-initiated', to: '/connect/docs/voice/whatsapp-business-calling/user-initiated' },
  { from: '/connect/docs/voice/whatsapp-business-calling/whatsapp-business-calling-business-initiated', to: '/connect/docs/voice/whatsapp-business-calling/business-initiated' },
  { from: '/connect/docs/voice/whatsapp-business-calling/whatsapp-business-calling-scenarios', to: '/connect/docs/voice/whatsapp-business-calling/scenarios' },

  // Voice API Reference redirects - Legacy -1 webhook endpoints
  { from: '/connect/reference/create-a-new-webhook-1', to: '/connect/reference/create-a-new-webhook' },
  { from: '/connect/reference/delete-a-specific-type-of-webhook-1', to: '/connect/reference/delete-a-specific-type-of-webhook' },
  { from: '/connect/reference/get-webhooks-information-1', to: '/connect/reference/get-webhooks-information' },

  // Voice error code reference pages moved to docs
  { from: '/connect/reference/voice-error-codes', to: '/connect/docs/voice/error-codes/voice-error-codes-reference' },
  { from: '/connect/reference/voice-status-codes', to: '/connect/docs/voice/error-codes/voice-status-codes-reference' },
];