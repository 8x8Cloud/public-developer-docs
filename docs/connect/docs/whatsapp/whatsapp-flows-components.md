---
sidebar_label: 'Flow Component Reference'
---

# WhatsApp Flow Component Reference

Complete technical reference for all UI components available in WhatsApp Flows. Use this guide when building Flow JSON definitions to understand component properties, validation rules, and usage patterns.

## Overview

WhatsApp Flows support a rich set of UI components for data collection and user interaction. Each component is defined in JSON format within your Flow definition.

**Component Categories:**
- **[Layout Components](#layout-components)** - Container structures
- **[Text Components](#text-components)** - Headings, body text, captions
- **[Input Components](#input-components)** - Form fields for data entry
- **[Navigation Components](#navigation-components)** - Buttons and actions
- **[Advanced Components](#advanced-components)** - Conditional logic, carousels, rich text

**Usage:**
- All components are defined within a screen's `layout` property
- Most components go inside a `Form` wrapper
- Use the exact `type` values shown below
- All field `name` values must be unique within a screen

---

## Layout Components

### SingleColumnLayout

Container for vertically stacked components. This is the primary layout type for Flow screens.

**Properties:**
- `type` (required): `"SingleColumnLayout"`
- `children` (required): Array of component objects

**Example:**

```json
{
  "type": "SingleColumnLayout",
  "children": [
    {
      "type": "TextHeading",
      "text": "Welcome"
    },
    {
      "type": "TextBody",
      "text": "Please complete the form below."
    }
  ]
}
```

---

## Text Components

### TextHeading

Large, bold text for screen titles and section headers.

**Properties:**
- `type` (required): `"TextHeading"`
- `text` (required): String content

**Example:**

```json
{
  "type": "TextHeading",
  "text": "Contact Information"
}
```

### TextBody

Regular text for descriptions and instructions.

**Properties:**
- `type` (required): `"TextBody"`
- `text` (required): String content

**Example:**

```json
{
  "type": "TextBody",
  "text": "Please provide your contact details so we can reach you."
}
```

### TextCaption

Small text for hints, footnotes, or disclaimers.

**Properties:**
- `type` (required): `"TextCaption"`
- `text` (required): String content

**Example:**

```json
{
  "type": "TextCaption",
  "text": "Your information is kept confidential."
}
```

---

## Input Components

### TextInput

Single-line or multi-line text entry field.

**Properties:**
- `type` (required): `"TextInput"`
- `name` (required): Unique field identifier
- `label` (required): Display label
- `input-type` (required): One of: `"text"`, `"email"`, `"number"`, `"phone"`, `"password"`, `"passcode"`
- `required` (optional): Boolean, default `false`
- `helper-text` (optional): Help text shown below field
- `min-chars` (optional): Minimum character count
- `max-chars` (optional): Maximum character count

**Example:**

```json
{
  "type": "TextInput",
  "name": "customer_name",
  "label": "Full Name",
  "input-type": "text",
  "required": true,
  "helper-text": "Enter your first and last name",
  "min-chars": 2,
  "max-chars": 100
}
```

**Input Types:**
- `text` - General text input
- `email` - Email with built-in validation
- `number` - Numeric keyboard, validates numbers
- `phone` - Phone number input
- `password` - Masked text input
- `passcode` - Numeric passcode input

### TextArea

Multi-line text input for longer responses.

**Properties:**
- `type` (required): `"TextArea"`
- `name` (required): Unique field identifier
- `label` (required): Display label
- `required` (optional): Boolean, default `false`
- `helper-text` (optional): Help text shown below field
- `max-length` (optional): Maximum character count

**Example:**

```json
{
  "type": "TextArea",
  "name": "feedback",
  "label": "Your Feedback",
  "required": false,
  "helper-text": "Share your thoughts (optional)",
  "max-length": 500
}
```

### Dropdown

Select one option from a dropdown list.

**Properties:**
- `type` (required): `"Dropdown"`
- `name` (required): Unique field identifier
- `label` (required): Display label
- `required` (optional): Boolean, default `false`
- `data-source` (required): Array of option objects with `id` and `title`

**Example:**

```json
{
  "type": "Dropdown",
  "name": "preferred_location",
  "label": "Preferred Location",
  "required": true,
  "data-source": [
    { "id": "loc1", "title": "Downtown Office" },
    { "id": "loc2", "title": "Westside Clinic" },
    { "id": "loc3", "title": "Northside Branch" }
  ]
}
```

### RadioButtonsGroup

Select one option from a vertical list of radio buttons.

**Properties:**
- `type` (required): `"RadioButtonsGroup"`
- `name` (required): Unique field identifier
- `label` (required): Display label
- `required` (optional): Boolean, default `false`
- `data-source` (required): Array of option objects with `id` and `title`

**Example:**

```json
{
  "type": "RadioButtonsGroup",
  "name": "appointment_type",
  "label": "Appointment Type",
  "required": true,
  "data-source": [
    { "id": "consultation", "title": "Consultation" },
    { "id": "followup", "title": "Follow-up" },
    { "id": "emergency", "title": "Emergency" }
  ]
}
```

**When to use RadioButtons vs Dropdown:**
- Use **RadioButtons** for 2-5 options that users should see at a glance
- Use **Dropdown** for 5+ options or when space is limited

### CheckboxGroup

Select multiple options from a list.

**Properties:**
- `type` (required): `"CheckboxGroup"`
- `name` (required): Unique field identifier
- `label` (required): Display label
- `required` (optional): Boolean, default `false`
- `data-source` (required): Array of option objects with `id` and `title`

**Example:**

```json
{
  "type": "CheckboxGroup",
  "name": "services",
  "label": "Services Needed",
  "required": false,
  "data-source": [
    { "id": "cleaning", "title": "Cleaning" },
    { "id": "repair", "title": "Repair" },
    { "id": "maintenance", "title": "Maintenance" }
  ]
}
```

**Note:** The submitted value will be an array of selected IDs.

### DatePicker

Select a date from a calendar interface.

**Properties:**
- `type` (required): `"DatePicker"`
- `name` (required): Unique field identifier
- `label` (required): Display label
- `required` (optional): Boolean, default `false`
- `helper-text` (optional): Help text shown below field
- `min-date` (optional): Minimum selectable date (ISO 8601 format)
- `max-date` (optional): Maximum selectable date (ISO 8601 format)

**Example:**

```json
{
  "type": "DatePicker",
  "name": "appointment_date",
  "label": "Preferred Date",
  "required": true,
  "helper-text": "Select your preferred appointment date",
  "min-date": "2026-02-01",
  "max-date": "2026-12-31"
}
```

**Note:** Submitted date format is `YYYY-MM-DD`.

### OptIn

Checkbox for terms, consent, or agreements.

**Properties:**
- `type` (required): `"OptIn"`
- `name` (required): Unique field identifier
- `label` (required): Display text for checkbox
- `required` (optional): Boolean, default `false`
- `on-click-action` (optional): Navigation action when clicked

**Example:**

```json
{
  "type": "OptIn",
  "name": "terms_accepted",
  "label": "I agree to the terms and conditions",
  "required": true,
  "on-click-action": {
    "name": "navigate",
    "next": {
      "type": "screen",
      "name": "TERMS_SCREEN"
    }
  }
}
```

**Use Cases:**
- Terms and conditions acceptance
- Privacy policy consent
- Marketing opt-ins
- Legal disclaimers

### PhotoPicker

Upload a photo from device camera or gallery.

**Properties:**
- `type` (required): `"PhotoPicker"`
- `name` (required): Unique field identifier
- `label` (required): Display label
- `description` (optional): Additional context text
- `required` (optional): Boolean, default `false`

**Example:**

```json
{
  "type": "PhotoPicker",
  "name": "id_photo",
  "label": "Upload ID Photo",
  "description": "Take a photo of your ID document",
  "required": true
}
```

**Important:**
- Photo is base64-encoded in submission
- Maximum file size varies by WhatsApp limits
- Useful for KYC, verification, proof of purchase, damage reports

---

## Navigation Components

### Footer

Action button at the bottom of each screen for navigation or submission.

**Properties:**
- `type` (required): `"Footer"`
- `label` (required): Button text
- `on-click-action` (required): Action object (see below)

**Action Types:**

**1. Navigate to Another Screen:**

```json
{
  "type": "Footer",
  "label": "Continue",
  "on-click-action": {
    "name": "navigate",
    "next": {
      "type": "screen",
      "name": "NEXT_SCREEN"
    },
    "payload": {
      "field_name": "${form.field_name}"
    }
  }
}
```

**2. Complete Flow (Terminal Screen):**

```json
{
  "type": "Footer",
  "label": "Submit",
  "on-click-action": {
    "name": "complete",
    "payload": {
      "customer_name": "${form.customer_name}",
      "email": "${form.email}"
    }
  }
}
```

**Payload Syntax:**
- Use `${form.field_name}` to reference current screen's form fields
- Use `${data.field_name}` to reference data passed from previous screens

---

## Advanced Components

### If (Conditional Logic)

Show components conditionally based on form values.

**Properties:**
- `type` (required): `"If"`
- `condition` (required): Expression to evaluate
- `then` (required): Array of components to show if true
- `else` (optional): Array of components to show if false

**Example:**

```json
{
  "type": "If",
  "condition": "${form.appointment_type} == 'emergency'",
  "then": [
    {
      "type": "TextBody",
      "text": "For emergencies, please call our hotline: 1-800-URGENT"
    }
  ],
  "else": [
    {
      "type": "TextBody",
      "text": "Standard appointments available within 48 hours."
    }
  ]
}
```

**Supported Operators:**
- `==` (equals)
- `!=` (not equals)
- `>`, `<`, `>=`, `<=` (comparison)
- `&&` (and), `||` (or)

### Image

Display a static image using base64 encoding or URL.

**Properties:**
- `type` (required): `"Image"`
- `src` (required): Base64-encoded image data or URL
- `alt-text` (optional): Alternative text for accessibility
- `scale-type` (optional): `"cover"` or `"contain"`

**Example (Base64):**

```json
{
  "type": "Image",
  "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "alt-text": "Company Logo",
  "scale-type": "contain"
}
```

**Example (URL):**

```json
{
  "type": "Image",
  "src": "https://example.com/banner.jpg",
  "alt-text": "Promotional Banner"
}
```

### ImageCarousel

Display multiple images in a horizontal scrollable carousel.

**Properties:**
- `type` (required): `"ImageCarousel"`
- `images` (required): Array of image objects with `src` and `alt-text`

**Example:**

```json
{
  "type": "ImageCarousel",
  "images": [
    {
      "src": "https://example.com/image1.jpg",
      "alt-text": "Product Image 1"
    },
    {
      "src": "https://example.com/image2.jpg",
      "alt-text": "Product Image 2"
    },
    {
      "src": "https://example.com/image3.jpg",
      "alt-text": "Product Image 3"
    }
  ]
}
```

**Use Cases:**
- Product galleries
- Before/after photos
- Multi-angle views
- Feature showcases

### RichText

Formatted text with markdown support.

**Properties:**
- `type` (required): `"RichText"`
- `text` (required): Markdown-formatted text

**Example:**

```json
{
  "type": "RichText",
  "text": "**Bold text**, *italic text*, and [links](https://example.com)\n\n- Bullet point 1\n- Bullet point 2\n\n1. Numbered item\n2. Another item"
}
```

**Supported Markdown:**
- `**bold**` → **bold**
- `*italic*` → *italic*
- `[link text](url)` → clickable links
- Bullet lists with `-` or `*`
- Numbered lists with `1.`, `2.`, etc.
- Line breaks with `\n`

### EmbeddedLink

Inline link within text that navigates to another screen.

**Properties:**
- `type` (required): `"EmbeddedLink"`
- `text` (required): Link text
- `on-click-action` (required): Navigation action

**Example:**

```json
{
  "type": "EmbeddedLink",
  "text": "Read our Terms of Service",
  "on-click-action": {
    "name": "navigate",
    "next": {
      "type": "screen",
      "name": "TERMS_SCREEN"
    }
  }
}
```

**Use Cases:**
- Link to terms/privacy screens
- Show additional information screens
- Navigate to help/FAQ screens

---

## Form Wrapper

Most input components must be wrapped in a `Form` component.

**Properties:**
- `type` (required): `"Form"`
- `name` (required): Unique form identifier
- `children` (required): Array of input components and Footer

**Example:**

```json
{
  "type": "Form",
  "name": "contact_form",
  "children": [
    {
      "type": "TextInput",
      "name": "name",
      "label": "Your Name",
      "input-type": "text",
      "required": true
    },
    {
      "type": "TextInput",
      "name": "email",
      "label": "Email Address",
      "input-type": "email",
      "required": true
    },
    {
      "type": "Footer",
      "label": "Submit",
      "on-click-action": {
        "name": "complete",
        "payload": {
          "name": "${form.name}",
          "email": "${form.email}"
        }
      }
    }
  ]
}
```

---

## Data Passing Between Screens

### Using Payload

When navigating between screens, pass data via the `payload` property:

```json
{
  "type": "Footer",
  "label": "Continue",
  "on-click-action": {
    "name": "navigate",
    "next": {
      "type": "screen",
      "name": "SCREEN_2"
    },
    "payload": {
      "first_name": "${form.first_name}",
      "last_name": "${form.last_name}"
    }
  }
}
```

### Accessing Data on Next Screen

Define data schema on receiving screen and reference with `${data.field_name}`:

```json
{
  "id": "SCREEN_2",
  "title": "Confirm Details",
  "data": {
    "first_name": {
      "type": "string",
      "__example__": "John"
    },
    "last_name": {
      "type": "string",
      "__example__": "Doe"
    }
  },
  "layout": {
    "type": "SingleColumnLayout",
    "children": [
      {
        "type": "TextBody",
        "text": "Hello ${data.first_name} ${data.last_name}!"
      }
    ]
  }
}
```

---

## Best Practices

### Field Naming

- Use descriptive, lowercase names with underscores: `customer_email`, `preferred_date`
- Avoid special characters except underscores
- Keep names consistent across similar Flows
- Use meaningful names that indicate the data type

### Validation

- Set `required: true` for mandatory fields
- Use appropriate `input-type` for built-in validation (email, number, phone)
- Add `helper-text` to clarify expected format
- Use `min-chars` and `max-chars` for text length validation
- Use `min-date` and `max-date` for date restrictions

### User Experience

- Keep screens focused (5-7 fields maximum per screen)
- Use clear, concise labels
- Provide helpful `helper-text` for complex fields
- Group related fields on the same screen
- Use RadioButtons for 2-5 options, Dropdown for more
- Show progress indicators in screen titles ("Step 1 of 3")

### Mobile Optimization

- Keep text concise (small screens)
- Test all Flows in mobile preview
- Ensure images are optimized for mobile data
- Avoid very long dropdown lists
- Use appropriate keyboard types via `input-type`

---

## Complete Example

Here's a complete two-screen Flow demonstrating multiple components:

```json
{
  "version": "7.3",
  "screens": [
    {
      "id": "CONTACT_INFO",
      "title": "Contact Information",
      "layout": {
        "type": "SingleColumnLayout",
        "children": [
          {
            "type": "TextHeading",
            "text": "Let's Get Started"
          },
          {
            "type": "TextBody",
            "text": "Please provide your contact details."
          },
          {
            "type": "Form",
            "name": "contact_form",
            "children": [
              {
                "type": "TextInput",
                "name": "full_name",
                "label": "Full Name",
                "input-type": "text",
                "required": true,
                "helper-text": "First and last name"
              },
              {
                "type": "TextInput",
                "name": "email",
                "label": "Email Address",
                "input-type": "email",
                "required": true
              },
              {
                "type": "TextInput",
                "name": "phone",
                "label": "Phone Number",
                "input-type": "phone",
                "required": true
              },
              {
                "type": "Footer",
                "label": "Continue",
                "on-click-action": {
                  "name": "navigate",
                  "next": {
                    "type": "screen",
                    "name": "PREFERENCES"
                  },
                  "payload": {
                    "full_name": "${form.full_name}",
                    "email": "${form.email}",
                    "phone": "${form.phone}"
                  }
                }
              }
            ]
          }
        ]
      }
    },
    {
      "id": "PREFERENCES",
      "title": "Your Preferences",
      "terminal": true,
      "data": {
        "full_name": { "type": "string", "__example__": "John Doe" },
        "email": { "type": "string", "__example__": "john@example.com" },
        "phone": { "type": "string", "__example__": "+15551234567" }
      },
      "layout": {
        "type": "SingleColumnLayout",
        "children": [
          {
            "type": "TextHeading",
            "text": "Almost Done, ${data.full_name}!"
          },
          {
            "type": "Form",
            "name": "preferences_form",
            "children": [
              {
                "type": "RadioButtonsGroup",
                "name": "contact_method",
                "label": "Preferred Contact Method",
                "required": true,
                "data-source": [
                  { "id": "email", "title": "Email" },
                  { "id": "phone", "title": "Phone" },
                  { "id": "whatsapp", "title": "WhatsApp" }
                ]
              },
              {
                "type": "CheckboxGroup",
                "name": "interests",
                "label": "Areas of Interest",
                "data-source": [
                  { "id": "products", "title": "New Products" },
                  { "id": "promotions", "title": "Promotions" },
                  { "id": "events", "title": "Events" }
                ]
              },
              {
                "type": "OptIn",
                "name": "newsletter",
                "label": "Subscribe to newsletter",
                "required": false
              },
              {
                "type": "Footer",
                "label": "Submit",
                "on-click-action": {
                  "name": "complete",
                  "payload": {
                    "full_name": "${data.full_name}",
                    "email": "${data.email}",
                    "phone": "${data.phone}",
                    "contact_method": "${form.contact_method}",
                    "interests": "${form.interests}",
                    "newsletter": "${form.newsletter}"
                  }
                }
              }
            ]
          }
        ]
      }
    }
  ]
}
```

---

## Next Steps

- **[Flow Examples](./whatsapp-flows-examples.md)** - See these components in action
- **[Creating Flows with Connect UI](./whatsapp-flows-ui-guide.md)** - Build Flows using the visual editor
- **[Flow API Reference](./whatsapp-flows-api.md)** - Create Flows programmatically
- **[Best Practices](./whatsapp-flows-best-practices.md)** - Design and validation guidelines
