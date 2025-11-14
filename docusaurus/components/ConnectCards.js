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
    title: 'Voice API',
    items: [
      {
        label: 'Getting started with Voice API',
        link: '/connect/reference/voice-messaging',
      },
      { label: 'Voice Messaging', link: '/connect/reference/ivr' },
      { label: 'IVR', link: '/connect/reference/ivr-1' },
      { label: 'View More…', link: '/connect/reference/voice-messaging' },
    ],
  },
  {
    title: 'Number Masking API',
    items: [
      {
        label: 'Getting started with Number Masking',
        link: '/connect/reference/getting-started-with-number-masking',
      },
      {
        label: 'How to implement 8x8 Number Masking?',
        link: '/connect/reference/how-number-masking-protects-customer-privacy',
      },
      { label: 'Webhooks API', link: '/connect/reference/webhooks-api' },
      {
        label: 'View More…',
        link: '/connect/reference/getting-started-with-number-masking',
      },
    ],
  },
  {
    title: 'Video Interaction API',
    items: [
      { label: 'Introduction', link: '/connect/reference/vi-introduction' },
      { label: 'Management API', link: '/connect/reference/management-api' },
      {
        label: 'Getting Started',
        link: '/connect/reference/vi-gettingstarted',
      },
      { label: 'View More…', link: '/connect/reference/vi-introduction' },
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
      { label: 'WhatsApp', link: '/connect/docs/usage-samples-whatsapp' },
      { label: 'RCS', link: '/connect/docs/guide-rcs' },
      { label: 'Viber', link: '/connect/docs/usage-samples-viber' },
      { label: 'View More…', link: '/connect/docs/usage-samples-whatsapp' },
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
      { label: 'Overview', link: '/connect/docs/overview' },
      {
        label: 'Android - Integrating the SDK',
        link: '/connect/docs/android-integrating-the-sdk',
      },
      {
        label: 'iOS - Integrating the SDK',
        link: '/connect/docs/ios-integrating-the-sdk',
      },
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
