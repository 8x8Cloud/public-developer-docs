const sidebarConfig = [
  {
    type: 'category',
    label: 'Getting Started',
    collapsed: true,
    items: ['tech-partner/docs/getting-started'],
  },
  {
    type: 'category',
    label: 'Partner SDK',
    collapsed: true,
    items: [
      'tech-partner/docs/partner-sdk-overview',
      {
        type: 'category',
        label: 'events',
        link: {
          type: 'doc',
          id: 'tech-partner/docs/partner-sdk-events',
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
