import React from 'react';
import Card from './Card';

import styles from './card.module.css';

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
    title: 'CPaaS: Connect & Communication APIs',
    description:
      'APIs for all your communications needs. Empower rich messaging and voice interactions.',
    link: '/connect',
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
    <div className={styles.grid}>
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
