import React from 'react';
import Card from './Card';

const cards = [
  {
    title: 'XCaaS Actions & Events',
    description:
      "Actions & Events will allow you to interact with in progress sessions and transactions, get real-time streams and so much more. Lets build what's next.",
    link: '/actions-events',
  },
  {
    title: 'XCaaS Analytics & Content',
    description:
      'Analytics and Content will provide access to analytics, recordings and other content you are generating as an XCaaS customer. Your data is waiting to amaze you, lets jump right in.',
    link: '/analytics',
  },
  {
    title: 'Jitsi as a Service (JaaS)',
    description:
      'Jitsi as a Service (JaaS) enables you to develop and integrate Jitsi Meetings functionality into your web applications.',
    link: '/jaas',
  },
  {
    title: '8x8 Connect CPaaS',
    description:
      'APIs for all your communications needs. Empower rich messaging and voice interactions.',
    link: '/connect',
  },
  {
    title: 'Messaging Apps',
    description:
      'Have rich conversations with your users on all leading messaging platforms.',
    link: '/connect/docs/messaging-apps-api-get-started',
  },
  {
    title: 'Lookup',
    description:
      'Get insights about phone numbers from format to portability and live status.',
    link: '/connect/docs/getting-started-with-number-lookup-api',
  },
  {
    title: 'Mobile Verification',
    description:
      'Generate, send and verify SMS and voice one-time passwords in two smart API requests.',
    link: '/connect/docs/tutorial-mobile-verification',
  },
  {
    title: 'Technical Partners',
    description:
      '8x8 is proud to provide a cohesive user experience for customers when using 8x8 products.',
    link: '/tech-partner',
  },
];

export default function DeveloperHubCards() {
  return (
    <div className="cards-grid cards-grid--3col">
      {cards.map((card, idx) => (
        <Card
          key={idx}
          title={card.title}
          description={card.description}
          link={card.link}
        />
      ))}
    </div>
  );
}
