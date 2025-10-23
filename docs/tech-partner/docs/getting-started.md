# Getting started as an 8x8 Technology Partner

## The purpose of this guide

8x8 is proud to provide a cohesive user experience for customers when using 8x8 products. Providing an easy to understand user experience and a consistent UI is essential in achieving that.

This guide helps to style your products to fit within the 8x8 ecosystem allowing a smooth user experience and easy to follow UI.

---

## Areas of focus when building for 8x8

### Location

Integrations can be deployed where needed the most but the primary location is the "meta data" panel. It's a place where supporting content or integrations live to help the user complete tasks.

### Style

The 8x8 design system is called Oxygen. It contains specifications for a large range of web and mobile components with guidance on how to use each one.

### Accessibility

Accessible products and integrations are important. Any 3rd party integration deployed inside an 8x8 product should be WCAG 2.1 AA compliant.

### Theme

8x8 products support switching between dark and light mode so integrations must also support dark and light styles.

---

## The meta data panel

The meta data panel is a common place where integrations could live inside 8x8. It's a place where supporting content and integrations can help users complete their tasks.

![The meta data panel lives in the right-hand side of the UI and takes up just under half the size of the window. The UI is on a flexible grid so integrations should change width depending on the users screen size.](../images/1200.png)

The meta data panel lives in the right-hand side of the UI and takes up just under half the size of the window. The UI is on a flexible grid so integrations should change width depending on the users screen size.

![](../images/1200-2.png)

---

## 8x8 Notifications

If your integration has notifications we can feed the user events where ever they are in the app so they are aware when something happens.

If your integration supports notifications then here's an explanation of how they would work inside 8x8 and how they can be styled.

![Notifications float in the top right corner of the UI. The user can dismiss or action them once they've seen it.](../images/noti-frame.png)

Notifications float in the top right corner of the UI. The user can dismiss or action them once they've seen it.

### Types of notifications

![image](../images/Notification.svg)
The success message is shown when a task has been completed successfully

![image](../images/Notification-3.svg)
The warning message is shown when something might require the users attention

![image](../images/Notification-1.svg)
The error message is shown when something needs the users urgent attention

![image](../images/Notification-2.svg)
The info message can be used for anything else that the user needs to be notified on

## Oxygen - 8x8's design system

Oxygen is 8x8's design system. It's a comprehensive library of components and styles that make up the UI. It's been extended to help integrations style their own products to fit inside 8x8 products.

The design system includes three main components:

### Color palette

- Primary: `#0056e0`
- Text: `#26252a`
- Background: `#FFFFFF`
- Success: `#127440`
- Warning: `#F8AE1A`
- Error: `#CB2233`

### Typography

8x8 use the font Inter which is available and easily embeddable from Google fonts. The typography library contains 9 type styles covering small text to headings:

- `$label01`
- `$bodyBold01`
- `$heading01`
- `$heading02`

### Iconography

A comprehensive icon library for consistent visual communication.

![Icon library](../images/icon-library.svg)

---

## Theme

In 8x8 products users can choose whether to use view in light or dark mode by switching in the settings. Therefore it's important integrations have the support for both light and dark themes.

### Light mode

- Primary button bg and form controls: `#0056e0`
- Secondary button bg: `#26252a`
- Destructive button and errors: `#CB2233`
- Warnings and badge notifications: `#F8AE1A`
- Success: `#127440`
- Text and icons: `#26252a`
- Background color: `#FFFFFF`
- Secondary background color: `#F4F3EE`

### Dark mode

- Primary button bg and form controls: `#246FE5`
- Secondary button bg: `#E0E0E0`
- Destructive button and errors: `#D83848`
- Warnings and badge notifications: `#F8AE1A`
- Success: `#189B55`
- Text and icons: `#ffffff`
- Background color: `#666666`

---

## Accessibility

Any 3rd party integration deployed inside an 8x8 product should be WCAG 2.1 AA compliant.

A comprehensive guide of WCAG 2.1 AA can be found here [https://www.w3.org/TR/WCAG22/](https://www.w3.org/TR/WCAG22/)

---

## Stickersheet

Common styles and components to get you started. For anything extra please reach out to us.

1. Typography
2. Color palette
3. Icons
4. Buttons
5. Form elements
6. Tabs, tags, loading and badges

---

### Typography

**Inter**: [https://fonts.google.com/specimen/Inter](https://fonts.google.com/specimen/Inter)

| Style         | Weight | Size     | Line-height | Spacing   |
|---------------|--------|----------|-------------|-----------|
| $heading02    | 600    | 1.75rem  | 2.5rem      | -0.020rem |
| $heading01    | 600    | 1.25rem  | 1.75rem     | -0.017rem |
| $body02       | 400    | 1rem     | 1.5rem      | -0.011rem |
| $bodyBold02   | 600    | 1rem     | 1.5rem      | -0.011rem |
| $body01       | 400    | 0.875rem | 1.25rem     | -0.006rem |
| $bodyBold01   | 600    | 0.875rem | 1.25rem     | -0.006rem |
| $bulletList01 | 400    | 0.875rem | 1.5rem      | -0.006rem |
| $label01      | 400    | 0.75rem  | 1rem        | Normal    |
| $labelBold01  | 600    | 0.75rem  | 1rem        | Normal    |

---

### Color Palette

| Light mode | Dark mode |
|------------|-----------|
| <span style="display: inline-block; width: 16px; height: 16px; background-color: #0056e0; border-radius: 50%; vertical-align: middle; margin-right: 8px;"></span>**Primary button bg and form controls**<br/>`#0056e0` | <span style="display: inline-block; width: 16px; height: 16px; background-color: #246FE5; border-radius: 50%; vertical-align: middle; margin-right: 8px;"></span>**Primary button bg and form controls**<br/>`#246FE5` |
| <span style="display: inline-block; width: 16px; height: 16px; background-color: #26252a; border-radius: 50%; vertical-align: middle; margin-right: 8px;"></span>**Secondary button bg**<br/>`#26252a` | <span style="display: inline-block; width: 16px; height: 16px; background-color: #E0E0E0; border-radius: 50%; vertical-align: middle; margin-right: 8px;"></span>**Secondary button bg**<br/>`#E0E0E0` |
| <span style="display: inline-block; width: 16px; height: 16px; background-color: #CB2233; border-radius: 50%; vertical-align: middle; margin-right: 8px;"></span>**Destructive button and errors**<br/>`#CB2233` | <span style="display: inline-block; width: 16px; height: 16px; background-color: #D83848; border-radius: 50%; vertical-align: middle; margin-right: 8px;"></span>**Destructive button and errors**<br/>`#D83848` |
| <span style="display: inline-block; width: 16px; height: 16px; background-color: #F8AE1A; border-radius: 50%; vertical-align: middle; margin-right: 8px;"></span>**Warnings and badge notifications**<br/>`#F8AE1A` | <span style="display: inline-block; width: 16px; height: 16px; background-color: #F8AE1A; border-radius: 50%; vertical-align: middle; margin-right: 8px;"></span>**Warnings and badge notifications**<br/>`#F8AE1A` |
| <span style="display: inline-block; width: 16px; height: 16px; background-color: #127440; border-radius: 50%; vertical-align: middle; margin-right: 8px;"></span>**Success**<br/>`#127440` | <span style="display: inline-block; width: 16px; height: 16px; background-color: #189B55; border-radius: 50%; vertical-align: middle; margin-right: 8px;"></span>**Success**<br/>`#189B55` |
| <span style="display: inline-block; width: 16px; height: 16px; background-color: #26252a; border-radius: 50%; vertical-align: middle; margin-right: 8px;"></span>**Text and icons**<br/>`#26252a` | <span style="display: inline-block; width: 16px; height: 16px; background-color: #ffffff; border: 1px solid #ccc; border-radius: 50%; vertical-align: middle; margin-right: 8px;"></span>**Text and icons**<br/>`#ffffff` |
| <span style="display: inline-block; width: 16px; height: 16px; background-color: #FFFFFF; border: 1px solid #ccc; border-radius: 50%; vertical-align: middle; margin-right: 8px;"></span>**Background color**<br/>`#FFFFFF` | <span style="display: inline-block; width: 16px; height: 16px; background-color: #666666; border-radius: 50%; vertical-align: middle; margin-right: 8px;"></span>**Background color**<br/>`#666666` |
| <span style="display: inline-block; width: 16px; height: 16px; background-color: #F4F3EE; border-radius: 50%; vertical-align: middle; margin-right: 8px;"></span>**Secondary background color**<br/>`#F4F3EE` | |

---

### Iconography

A sample of our icon library

![](../images/icon-library.svg)

---

### Buttons

**Primary button**

![](../images/primary-button-anatomy.svg)

**Secondary button**

![](../images/secondary-button-anatomy.svg)

**Destructive button**

![](../images/destructive-button-anatomy.svg)
  
**Text button**

![](../images/text-button.svg)

### Form elements

**Text input**

![](../images/text-input-anatomy.svg)

**Checkbox**

![](../images/checkbox-anatomy.svg)

**Toggle**

![](../images/toggle-anatomy.svg)

**Radio**

![](../images/radio-anatomy.svg)

---

### Inline notifications

**Success**

![](../images/success-notification.svg)
  
**Error**

![](../images/error.svg)

**Info**

![](../images/info-notification.svg)
  
**Warning**

![](../images/warning-notification.svg)

### Others

**Tabs**

![](../images/tabs-anatomy.svg)

**Tags**

![](../images/tags-anatomy.svg)
  
**Loading**

![](../images/loading-anatomy.svg)
  
**Badge**

![](../images/badges-anatomy.svg)
  
---

## Thank you

This guide is a small part of the documentation and specifications we can provide. For more details or direct help feel free to reach out to us.
