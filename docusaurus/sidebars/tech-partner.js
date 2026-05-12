const sidebarConfig = [
  {
    type: 'category',
    label: 'Getting Started',
    collapsed: true,
    link: {
      type: 'doc',
      id: 'tech-partner/docs/getting-started-overview',
    },
    items: [
      {
        type: 'doc',
        id: 'tech-partner/docs/getting-started-overview',
        label: 'Overview',
      },
      {
        type: 'doc',
        id: 'tech-partner/docs/ui-guidelines',
        label: 'UI Guidelines',
      },
    ],
  },
  {
    type: 'category',
    label: 'Partner SDK',
    collapsed: true,
    items: [
      'tech-partner/docs/partner-sdk-integration-guide',
      'tech-partner/docs/partner-sdk-events',
    ],
  },
  {
    type: 'category',
    label: 'Maestro SDK',
    collapsed: true,
    items: [
      'tech-partner/docs/partner-sdk-maestro-sdk-overview',
      {
        type: 'category',
        label: 'Events',
        link: {
          type: 'doc',
          id: 'tech-partner/docs/partner-sdk-maestro-sdk-events',
        },
        collapsed: true,
        items: [
          'tech-partner/docs/events/mashell-chat-accepted-cc-event-v1',
          'tech-partner/docs/events/mashell-chat-completed-cc-event-v1',
          'tech-partner/docs/events/mashell-chat-nextgen-accepted-cc-event-v1',
          'tech-partner/docs/events/mashell-chat-nextgen-completed-cc-event-v1',
          'tech-partner/docs/events/mashell-chat-nextgen-offered-cc-event-v1',
          'tech-partner/docs/events/mashell-chat-nextgen-terminated-cc-event-v1',
          'tech-partner/docs/events/mashell-chat-offered-cc-event-v1',
          'tech-partner/docs/events/mashell-chat-terminated-cc-event-v1',
          'tech-partner/docs/events/mashell-email-accepted-cc-event-v1',
          'tech-partner/docs/events/mashell-email-terminated-cc-event-v1',
          'tech-partner/docs/events/mashell-voice-phone-accepted-cc-event-v1',
          'tech-partner/docs/events/mashell-voice-phone-accepted-uc-event-v1',
          'tech-partner/docs/events/mashell-voice-phone-completed-cc-event-v1',
          'tech-partner/docs/events/mashell-voice-phone-offered-cc-event-v1',
          'tech-partner/docs/events/mashell-voice-phone-offered-uc-event-v1',
          'tech-partner/docs/events/mashell-voice-phone-terminated-cc-event-v1',
          'tech-partner/docs/events/mashell-voice-phone-terminated-uc-event-v1',
          'tech-partner/docs/events/mashell-voicemail-accepted-cc-event-v1',
          'tech-partner/docs/events/mashell-voicemail-completed-cc-event-v1',
          'tech-partner/docs/events/mashell-voicemail-offered-cc-event-v1',
          'tech-partner/docs/events/mashell-voicemail-terminated-cc-event-v1',
        ],
      },
    ],
  },
];

module.exports = sidebarConfig;
