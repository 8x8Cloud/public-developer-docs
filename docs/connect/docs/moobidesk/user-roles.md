---
slug: /connect/docs/moobidesk/user-roles
---

# User Roles & Permissions

Moobidesk provides role-based access control with four distinct user types, each with specific capabilities and access levels.

## Role Overview

| Role | Primary Function | Access Level |
|------|-----------------|--------------|
| **Agent** | Handle customer conversations | Limited - Own chats only |
| **Supervisor** | Monitor team performance | Extended - Team visibility |
| **Manager** | Analyze and optimize operations | Broad - All data access |
| **Administrator** | Configure system settings | Full - System configuration |

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

## Manager

Managers analyze performance data and make strategic operational decisions.

### Capabilities

- All Supervisor capabilities
- Generate comprehensive reports across all queues and agents
- View historical analytics and trends
- Access SLA performance metrics
- Export data for external analysis
- Configure broadcast campaigns

### Limitations

- Cannot modify user roles or permissions
- Cannot configure system integrations
- Cannot manage authentication settings

## Administrator

Administrators have full system access and configure all platform settings.

### Capabilities

- All Manager capabilities
- Create and manage user accounts
- Configure queues and routing rules
- Set up skill sets and proficiency levels
- Manage canned messages and templates
- Configure conversation tags and labels
- Set up auxiliary (Aux) codes
- Integrate with external systems
- Configure SLA thresholds
- Manage system security settings

## Permission Matrix

| Feature | Agent | Supervisor | Manager | Administrator |
|---------|-------|------------|---------|---------------|
| Handle conversations | ✓ | ✓ | ✓ | ✓ |
| View team conversations | - | ✓ | ✓ | ✓ |
| Real-time statistics | Limited | ✓ | ✓ | ✓ |
| Generate reports | - | Limited | ✓ | ✓ |
| Broadcast campaigns | - | - | ✓ | ✓ |
| Manage users | - | - | - | ✓ |
| System configuration | - | - | - | ✓ |

## Best Practices

- Assign the minimum role required for each user's responsibilities
- Regularly review user access and remove inactive accounts
- Use Supervisor role for quality assurance teams
- Limit Administrator access to IT and senior operations staff
