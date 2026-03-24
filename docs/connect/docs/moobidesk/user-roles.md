---
slug: /connect/docs/moobidesk/user-roles
---

# User Roles & Permissions

Moobidesk provides role-based access control with two distinct user types, each with specific capabilities and access levels.

## Role Overview

| Role | Primary Function | Access Level |
|------|-----------------|--------------|
| **Agent** | Handle customer conversations | Limited - Own chats only |
| **Supervisor** | Monitor team performance | Extended - Team visibility |

## Agent

Agents are frontline users who handle customer interactions across all supported channels.

### Capabilities

- View and respond to assigned conversations
- Access customer contact information and history
- Use canned messages and templates
- Apply conversation tags and labels
- Transfer conversations to other agents or queues
- Set availability status (Available, Busy, Away, Offline)

### Limitations

- Cannot view other agents' conversations
- Cannot access system configuration
- Cannot generate system-wide reports

## Supervisor

Supervisors oversee agent teams and ensure service quality.

### Capabilities

- All Agent capabilities
- View all conversations in assigned queues
- Monitor real-time agent status and performance
- Reassign conversations between agents
- View team-level statistics and metrics
- Access skill set assignments

### Limitations

- Cannot modify system settings
- Cannot manage user accounts
- Limited report customization

## Permission Matrix

| Feature | Agent | Supervisor |
|---------|-------|------------|
| Handle conversations | ✓ | ✓ |
| View team conversations | - | ✓ |
| Real-time statistics | Limited | ✓ |
| Generate reports | - | Limited |

## Best Practices

- Assign the minimum role required for each user's responsibilities
- Regularly review user access and remove inactive accounts
- Use Supervisor role for quality assurance teams
