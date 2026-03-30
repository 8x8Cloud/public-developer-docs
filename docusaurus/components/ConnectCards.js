import React from 'react';
import Card from './Card';

import styles from './card.module.css';

const cards = [
  {
    title: 'SMS API',
    items: [
      {
        label: 'Getting started with SMS API',
        link: '/connect/reference/getting-started-with-sms-api',
      },
      { label: 'Send SMS API', link: '/connect/reference/send-sms-api' },
      { label: 'Reporting API', link: '/connect/reference/reporting-api-2' },
      {
        label: 'View More…',
        link: '/connect/reference/getting-started-with-sms-api',
      },
    ],
  },
  {
    title: 'Business Messaging API',
    items: [
      {
        label: 'Getting started with Messaging API',
        link: '/connect/reference/messaging-apps-api-get-started',
      },
      {
        label: 'Send Message API',
        link: '/connect/reference/send-message-api',
      },
      {
        label: 'Supported Messaging Apps',
        link: '/connect/reference/list-of-supported-chatapps-channels',
      },
      {
        label: 'View More…',
        link: '/connect/reference/messaging-apps-api-get-started',
      },
    ],
  },
  {
    title: 'Verification API',
    items: [
      {
        label: 'Getting started with Verification API',
        link: '/connect/reference/verification-api-get-started',
      },
      {
        label: 'Verification API',
        link: '/connect/reference/verify-request-v-2',
      },
    ],
  },
  {
    title: 'Callflows API',
    items: [
      {
        label: 'Getting started with Voice API',
        link: '/connect/docs/voice/cpaas-voice-offerings',
      },
      { label: 'Send Callflow API', link: '/connect/reference/send-callflow' },
      { label: 'Session Summary Guide', link: '/connect/docs/voice/webhook-guides/voice-session-summary-webhook' },
      { label: 'Webhook Setup Guide', link: '/connect/docs/voice/webhook-guides/webhooks-overview' },
      { label: 'View More…', link: '/connect/docs/voice/cpaas-voice-offerings' },
    ],
  },
  {
    title: 'Voice Messaging',
    items: [
      {
        label: 'Voice Messaging Guide',
        link: '/connect/docs/voice/voice-messaging/voice-messaging-guide',
      },
      { label: 'Session Status', link: '/connect/docs/voice/voice-messaging/session-status' },
      { label: 'View More…', link: '/connect/docs/voice/voice-messaging/voice-messaging-guide' },
    ],
  },
  {
    title: 'IVR',
    items: [
      {
        label: 'IVR Introduction',
        link: '/connect/docs/voice/ivr/ivr-introduction',
      },
      { label: 'Simple IVR', link: '/connect/docs/voice/ivr/simple-ivr-guide' },
      { label: 'Advanced IVR', link: '/connect/docs/voice/ivr/advanced-ivr-guide' },
      { label: 'View More…', link: '/connect/docs/voice/ivr/ivr-introduction' },
    ],
  },
  {
    title: 'WhatsApp Business Calling',
    items: [
      {
        label: 'Overview',
        link: '/connect/docs/voice/whatsapp-business-calling/whatsapp-business-calling-overview',
      },
      { label: 'User Initiated Calls', link: '/connect/docs/voice/whatsapp-business-calling/whatsapp-business-calling-user-initiated' },
      { label: 'Business Initiated Calls', link: '/connect/docs/voice/whatsapp-business-calling/whatsapp-business-calling-business-initiated' },
      { label: 'View More…', link: '/connect/docs/voice/whatsapp-business-calling/whatsapp-business-calling-overview' },
    ],
  },
  {
    title: 'Number Masking',
    items: [
      {
        label: 'Getting started with Number Masking',
        link: '/connect/docs/voice/number-masking/getting-started',
      },
      {
        label: 'How to implement 8x8 Number Masking?',
        link: '/connect/docs/voice/number-masking/how-number-masking-protects-customer-privacy',
      },
      { label: 'Call Action Handling', link: '/connect/docs/voice/number-masking/call-action-handling' },
      {
        label: 'View More…',
        link: '/connect/docs/voice/number-masking/getting-started',
      },
    ],
  },
  {
    title: 'Video Interaction',
    items: [
      { label: 'Overview', link: '/connect/docs/vi-overview' },
      { label: 'Introduction', link: '/connect/reference/vi-introduction' },
      { label: 'Management API', link: '/connect/reference/management-api' },
      {
        label: 'Getting Started',
        link: '/connect/reference/vi-gettingstarted',
      },
      { label: 'View More…', link: '/connect/docs/vi-overview' },
    ],
  },
  {
    title: 'Number Lookup API',
    items: [
      {
        label: 'Getting started with Number Lookup API',
        link: '/connect/reference/getting-started-with-number-lookup-api',
      },
      {
        label: 'Number Lookup API',
        link: '/connect/reference/phone-number-lookup',
      },
      {
        label: 'Number Lookup Error Codes',
        link: '/connect/reference/number-lookup-error-codes',
      },
    ],
  },
  {
    title: 'Automation API',
    items: [
      {
        label: 'Getting started with Automation API',
        link: '/connect/reference/getting-started-with-automation-api',
      },
      {
        label: 'Workflow Definition Management',
        link: '/connect/reference/workflow-definition-management',
      },
      {
        label: 'Workflow Instance Management',
        link: '/connect/reference/workflow-instance-management',
      },
      {
        label: 'View More…',
        link: '/connect/reference/getting-started-with-automation-api',
      },
    ],
  },
  {
    title: 'Contacts API',
    items: [
      {
        label: 'Getting started with Contacts API',
        link: '/connect/reference/getting-started-with-contacts-api',
      },
      { label: 'Contacts API', link: '/connect/reference/contact-search' },
      { label: 'Groups API', link: '/connect/reference/groups-api' },
      {
        label: 'View More…',
        link: '/connect/reference/getting-started-with-contacts-api',
      },
    ],
  },
  {
    title: 'General API information',
    items: [
      { label: 'API Error codes', link: '/connect/reference/api-error-codes' },
      {
        label: 'Message status reference',
        link: '/connect/reference/message-status-references',
      },
      {
        label: 'Price object reference',
        link: '/connect/reference/price-object-reference',
      },
      { label: 'View More…', link: '/connect/reference/api-error-codes' },
    ],
  },
  {
    title: 'SMPP',
    items: [
      {
        label: 'SMPP - Connection',
        link: '/connect/reference/smpp-connection',
      },
      { label: 'SMPP TLVs', link: '/connect/reference/smpp-tlvs' },
      {
        label: 'SMPP - Delivery receipts',
        link: '/connect/reference/smpp-delivery-receipts',
      },
      { label: 'View More…', link: '/connect/reference/smpp-connection' },
    ],
  },
  {
    title: 'API Information',
    items: [
      { label: 'Getting Started', link: '/connect/docs/getting-started' },
      { label: 'API Rate Limiting', link: '/connect/docs/api-rate-limiting' },
      { label: 'Security', link: '/connect/docs/security-1' },
      { label: 'View More…', link: '/connect/docs/getting-started' },
    ],
  },
  {
    title: 'SMS',
    items: [
      { label: 'Send SMS API', link: '/connect/docs/send-sms-api-reference' },
      { label: 'Single SMS', link: '/connect/docs/tutorial-single-sms' },
      { label: 'Batch SMS', link: '/connect/docs/tutorial-batch-sms' },
      { label: 'View More…', link: '/connect/docs/send-sms-api-reference' },
    ],
  },
  {
    title: 'Messaging Apps',
    items: [
      { label: 'WhatsApp', link: '/connect/docs/whatsapp/whatsapp-hub' },
      { label: 'RCS', link: '/connect/docs/guide-rcs' },
      { label: 'Viber', link: '/connect/docs/usage-samples-viber' },
      { label: 'View More…', link: '/connect/docs/whatsapp/whatsapp-hub' },
    ],
  },
  {
    title: 'Connect Portal',
    items: [
      { label: 'Overview', link: '/connect/docs/connect-overview' },
      { label: 'Multi-channel Sender (MCS)', link: '/connect/docs/sender' },
      {
        label: 'Sender ID Self Registration Module',
        link: '/connect/docs/sender-id-self-registration-module',
      },
      { label: 'View More…', link: '/connect/docs/connect-overview' },
    ],
  },
  {
    title: 'Contacts API Tutorials',
    items: [
      { label: 'Creating a contact', link: '/connect/docs/creating-a-contact' },
      {
        label: 'Create a group and add a contact to that group',
        link: '/connect/docs/create-a-group-and-add-a-contact-to-that-group',
      },
    ],
  },
  {
    title: 'Integrations',
    items: [
      { label: 'Adobe Campaigns', link: '/connect/docs/adobe-campaigns' },
      { label: "Apple's Shortcuts", link: '/connect/docs/apples-shortcuts' },
      { label: 'Auth0', link: '/connect/docs/auth0' },
      { label: 'View More…', link: '/connect/docs/adobe-campaigns' },
    ],
  },
  {
    title: 'Voice SDK',
    items: [
      { label: 'Overview', link: '/connect/docs/voice/voice-sdk/overview' },
      {
        label: 'Android - Integrating the SDK',
        link: '/connect/docs/voice/voice-sdk/android-integration',
      },
      {
        label: 'iOS - Integrating the SDK',
        link: '/connect/docs/voice/voice-sdk/ios-integration',
      },
      { label: 'View More…', link: '/connect/docs/voice/voice-sdk/overview' },
    ],
  },
  {
    title: 'Converse',
    items: [
      {
        label: '8x8 Converse - Overview',
        link: '/connect/docs/converse-overview',
      },
      { label: 'Dashboard', link: '/connect/docs/dashboard' },
      { label: 'My Conversations', link: '/connect/docs/my-conversations' },
      { label: 'View More…', link: '/connect/docs/converse-overview' },
    ],
  },
  {
    title: 'Moobidesk',
    items: [
      {
        label: 'Overview',
        link: '/connect/docs/moobidesk',
      },
      { label: 'Getting Started', link: '/connect/docs/moobidesk/getting-started' },
      { label: 'Conversations', link: '/connect/docs/moobidesk/conversations' },
      { label: 'View More…', link: '/connect/docs/moobidesk' },
    ],
  },
  {
    title: 'Video Interaction',
    items: [
      { label: 'Overview', link: '/connect/docs/vi-overview' },
      { label: 'Agent Interface', link: '/connect/docs/vi-agent-interface' },
      {
        label: 'Customer Interface',
        link: '/connect/docs/vi-customer-interface',
      },
      { label: 'View More…', link: '/connect/docs/vi-overview' },
    ],
  },
];

export default function ConnectCards() {
  return (
    <div className={styles.grid}>
      {cards.map((card, idx) => (
        <Card key={idx} title={card.title} items={card.items} />
      ))}
    </div>
  );
}
