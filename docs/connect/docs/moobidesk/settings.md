---
slug: /connect/docs/moobidesk/settings
---

# Settings & Configuration

The Settings module provides system-wide configuration for administrators to customize Moobidesk for their organization's needs.

## Skill Sets

### Defining Skills

Create skill categories for intelligent routing:

1. Navigate to Settings → Skills → Add Skill
2. Enter skill name (e.g., "Spanish Language", "Technical Support", "VIP Handling")
3. Add description for internal reference
4. Save skill

### Assigning Skills to Agents

1. Select agent in User Management
2. Navigate to Skills tab
3. Add skills with proficiency levels:
   - **1**: Beginner
   - **2**: Basic
   - **3**: Intermediate
   - **4**: Advanced
   - **5**: Expert

**Routing Logic**: Higher proficiency agents receive priority for skill-based queues

## Auxiliary (Aux) Codes

### Creating Aux Codes

Define reasons for agent unavailability:

1. Navigate to Settings → Aux Codes → Add Code
2. Configure code:
   - **Code Name**: "Break", "Lunch", "Training", "Technical Issue"
   - **Status**: Away or Busy
   - **Paid/Unpaid**: For payroll integration
   - **Color**: Visual identifier in dashboards

3. Save code

### Common Aux Codes

| Code | Status | Use Case |
|------|--------|----------|
| Break | Away | Scheduled 15-minute breaks |
| Lunch | Away | Meal breaks |
| Training | Away | Learning activities |
| Meeting | Away | Team or client meetings |
| Technical Issue | Away | System problems |
| Wrap-up | Busy | Post-conversation documentation |
| Admin | Busy | Administrative tasks |

## Canned Messages

![Canned Messages Settings](../../images/moobidesk/page65_img1.png)

### Creating Templates

Build pre-written message library:

1. Navigate to Settings → Canned Messages → Add Message
2. Configure template:
   - **Title**: Internal reference name
   - **Category**: Group similar messages (Greetings, FAQs, Closings)
   - **Shortcut**: Quick trigger (e.g., `/greeting`, `/refund`)
   - **Message**: Template content with variables
   - **Channels**: WhatsApp, Email, Facebook, or All

3. Save template

### Variable Substitution

Use placeholders for personalization:
- `{{first_name}}`: Contact first name
- `{{last_name}}`: Contact last name
- `{{email}}`: Contact email
- `{{phone}}`: Contact phone number
- `{{agent_name}}`: Current agent name
- `{{agent_email}}`: Current agent email
- `{{queue_name}}`: Current queue
- Custom attributes: `{{custom_field_name}}`

**Example**:

```text
Hi {{first_name}}, I'm {{agent_name}} from the {{queue_name}} team.
How can I help you today?
```

### Categories

Organize templates by purpose:
- **Greetings**: Welcome messages
- **Information**: Product details, policies
- **Troubleshooting**: Step-by-step instructions
- **Apologies**: Service recovery
- **Closings**: End conversation messages

## Conversation Tags

### Creating Tags

Categorize conversations for reporting:

1. Navigate to Settings → Tags → Add Tag
2. Enter tag name (e.g., "Billing Issue", "Product Question", "Complaint")
3. Select color for visual identification
4. Save tag

### Tag Categories

**Issue Types**:
- Billing Issue
- Technical Problem
- Account Question
- Product Inquiry

**Resolution Types**:
- Resolved - First Contact
- Escalated
- Follow-up Required
- Cannot Resolve

**Customer Types**:
- VIP Customer
- New Customer
- Returning Customer
- At-Risk Customer

**Use in Reports**: Filter and segment conversation analytics by tags

## Conversation Labels

### Creating Labels

Workflow management markers:

1. Navigate to Settings → Labels → Add Label
2. Configure label:
   - **Name**: "Follow-up Required", "Escalated", "Bug Report"
   - **Color**: Visual indicator
   - **Auto-Apply Rules**: Automatically label based on conditions (optional)

3. Save label

### Label Automation

Configure automatic labeling:
- **Keyword Triggers**: Label if message contains "refund", "cancel", "broken"
- **SLA Breach**: Auto-label when SLA exceeded
- **Transfer Count**: Label after 2+ transfers
- **Customer Sentiment**: Label based on negative keywords

## Email Signatures

### Creating Signatures

Configure agent email signatures:

1. Navigate to Settings → Signatures → Add Signature
2. Enter signature content (supports HTML):

   ```html
   Best regards,
   {{agent_name}}
   {{queue_name}} Team

   Email: {{agent_email}}
   Phone: +1-800-XXX-XXXX
   ```

3. Assign to users or queues
4. Save signature

**Variables**: Same as canned messages

### Default Signatures

- Set default signature for all agents
- Override with queue-specific signatures
- Agent-specific signatures take highest priority

## Data & Privacy

### Data Retention

Configure data storage policies:

1. Navigate to Settings → Data & Privacy → Retention
2. Set retention periods:
   - **Conversations**: 90 days, 1 year, 3 years, Indefinitely
   - **Attachments**: Same as conversations or separate
   - **Logs**: 30 days, 90 days, 1 year

3. Configure auto-deletion for expired data

### GDPR Compliance

Tools for privacy regulation adherence:

**Data Export**: Generate complete contact data export on request
**Right to Deletion**: Permanently delete contact and all associated data
**Audit Logs**: Track all data access and modifications

## Backup & Restore

### Automated Backups

System automatically backs up:
- All conversations and messages
- Contact database
- System configuration
- Frequency: Daily (retained for 30 days)

### Manual Backup

Create on-demand backup before major changes:
1. Navigate to Settings → Backup
2. Click "Create Backup"
3. Download backup file
4. Store securely offline

### Restore

Restore from backup:
1. Navigate to Settings → Restore
2. Select backup date
3. Choose restore scope (Full system, Contacts only, Conversations only)
4. Confirm restore (overwrites current data)

## Best Practices

### Initial Setup Checklist

- Create user accounts for all agents
- Configure queues aligned to business functions
- Set up skill sets for specialized routing
- Create canned message library
- Define aux codes
- Configure business hours and SLA targets
- Test channel integrations

### Ongoing Maintenance

- Review and update canned messages monthly
- Audit user access quarterly
- Optimize queue routing based on performance data
- Keep skill assignments current as agents develop
- Archive inactive users promptly
- Back up configuration before major changes
