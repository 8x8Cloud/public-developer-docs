const sidebarConfig = [
  {
    "type": "category",
    "label": "Getting Started",
    "collapsed": true,
    "link": {
      "type": "doc",
      "id": "tech-partner/docs/getting-started-overview"
    },
    "items": [
      {
        "type": "doc",
        "id": "tech-partner/docs/getting-started-overview",
        "label": "Overview"
      },
      {
        "type": "doc",
        "id": "tech-partner/docs/ui-guidelines",
        "label": "UI Guidelines"
      }
    ]
  },
  {
    "type": "category",
    "label": "Partner SDK",
    "collapsed": true,
    "items": [
      "tech-partner/docs/partner-sdk-integration-guide",
      {
        "type": "category",
        "label": "Events",
        "link": {
          "type": "doc",
          "id": "tech-partner/docs/partner-sdk-events"
        },
        "collapsed": true,
        "items": [
          {
            "type": "category",
            "label": "Global",
            "collapsed": true,
            "items": [
              "tech-partner/docs/events/global-user-details-v1"
            ]
          },
          {
            "type": "category",
            "label": "Agent Workspace",
            "collapsed": true,
            "items": [
              "tech-partner/docs/events/aw-chat-init-v1",
              "tech-partner/docs/events/aw-chat-message-received-v1",
              "tech-partner/docs/events/aw-chat-message-sent-v1",
              "tech-partner/docs/events/aw-close-agent-assist-v1",
              "tech-partner/docs/events/aw-interaction-ended-v1",
              "tech-partner/docs/events/aw-interaction-focus-v3",
              "tech-partner/docs/events/aw-interaction-hold-v1",
              "tech-partner/docs/events/aw-interaction-mute-v1",
              "tech-partner/docs/events/aw-interaction-resume-v1",
              "tech-partner/docs/events/aw-interaction-started-v1",
              "tech-partner/docs/events/aw-interaction-unmute-v1",
              "tech-partner/docs/events/aw-interaction-wrap-up-codes-received-v1",
              "tech-partner/docs/events/aw-interaction-wrap-up-codes-v1",
              {
                "type": "doc",
                "id": "tech-partner/docs/events/aw-interaction-focus-v1",
                "label": "[Deprecated] aw-interaction-focus-v1",
                "className": "deprecated-sidebar-item"
              },
              {
                "type": "doc",
                "id": "tech-partner/docs/events/aw-interaction-focus-v2",
                "label": "[Deprecated] aw-interaction-focus-v2",
                "className": "deprecated-sidebar-item"
              }
            ]
          },
          {
            "type": "category",
            "label": "Call Manager",
            "collapsed": true,
            "items": [
              "tech-partner/docs/events/call-manager-call-autoanswer-first-connect-v1",
              "tech-partner/docs/events/call-manager-call-caller-number-change-v1",
              "tech-partner/docs/events/call-manager-call-conference-drop-v1",
              "tech-partner/docs/events/call-manager-call-conference-start-v1",
              "tech-partner/docs/events/call-manager-call-connect-v1",
              "tech-partner/docs/events/call-manager-call-disconnected-v1",
              "tech-partner/docs/events/call-manager-call-failed-v1",
              "tech-partner/docs/events/call-manager-call-hold-v1",
              "tech-partner/docs/events/call-manager-call-inbound-first-connect-v1",
              "tech-partner/docs/events/call-manager-call-incoming-first-v1",
              "tech-partner/docs/events/call-manager-call-incoming-v1",
              "tech-partner/docs/events/call-manager-call-outbound-first-connect-v1",
              "tech-partner/docs/events/call-manager-call-outgoing-v1",
              "tech-partner/docs/events/call-manager-call-record-end-v1",
              "tech-partner/docs/events/call-manager-call-record-failed-v1",
              "tech-partner/docs/events/call-manager-call-record-start-v1",
              "tech-partner/docs/events/call-manager-call-transfer-blind-success-v1",
              "tech-partner/docs/events/call-manager-call-transfer-failed-v1",
              "tech-partner/docs/events/call-manager-call-transfer-success-v1",
              "tech-partner/docs/events/call-manager-call-transfer-voicemail-success-v1",
              "tech-partner/docs/events/call-manager-mute-disabled-v1",
              "tech-partner/docs/events/call-manager-mute-enabled-v1"
            ]
          }
        ]
      }
    ]
  },
  {
    "type": "category",
    "label": "Maestro SDK",
    "collapsed": true,
    "items": [
      "tech-partner/docs/partner-sdk-maestro-sdk-overview",
      {
        "type": "category",
        "label": "Events",
        "link": {
          "type": "doc",
          "id": "tech-partner/docs/partner-sdk-maestro-sdk-events"
        },
        "collapsed": true,
        "items": [
          "tech-partner/docs/events/mashell-chat-accepted-cc-event-v1",
          "tech-partner/docs/events/mashell-chat-completed-cc-event-v1",
          "tech-partner/docs/events/mashell-chat-nextgen-accepted-cc-event-v1",
          "tech-partner/docs/events/mashell-chat-nextgen-completed-cc-event-v1",
          "tech-partner/docs/events/mashell-chat-nextgen-offered-cc-event-v1",
          "tech-partner/docs/events/mashell-chat-nextgen-terminated-cc-event-v1",
          "tech-partner/docs/events/mashell-chat-offered-cc-event-v1",
          "tech-partner/docs/events/mashell-chat-terminated-cc-event-v1",
          "tech-partner/docs/events/mashell-email-accepted-cc-event-v1",
          "tech-partner/docs/events/mashell-email-terminated-cc-event-v1",
          "tech-partner/docs/events/mashell-voice-phone-accepted-cc-event-v1",
          "tech-partner/docs/events/mashell-voice-phone-accepted-uc-event-v1",
          "tech-partner/docs/events/mashell-voice-phone-completed-cc-event-v1",
          "tech-partner/docs/events/mashell-voice-phone-offered-cc-event-v1",
          "tech-partner/docs/events/mashell-voice-phone-offered-uc-event-v1",
          "tech-partner/docs/events/mashell-voice-phone-terminated-cc-event-v1",
          "tech-partner/docs/events/mashell-voice-phone-terminated-uc-event-v1",
          "tech-partner/docs/events/mashell-voicemail-accepted-cc-event-v1",
          "tech-partner/docs/events/mashell-voicemail-completed-cc-event-v1",
          "tech-partner/docs/events/mashell-voicemail-offered-cc-event-v1",
          "tech-partner/docs/events/mashell-voicemail-terminated-cc-event-v1"
        ]
      }
    ]
  }
];

module.exports = sidebarConfig;
