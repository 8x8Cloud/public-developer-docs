# Theming

## Introduction

After configuring your web flow, you may want to be able to change the configuration of your invitation, form, window, while you can do this within configuration manager, this doesn’t give the flexibility to theme all of the areas. Previously, we allow CSS to use this, however this needed the help of a web developer, so this way it makes it available for who even is configuring the web design to build the script.

When a colour is entered in, you can either use a word or hex colour, but using the hex colour will give more flexibility.

Eg. `red` or `#FF0000`

Nearly all of the components on the webchat, have been defined so you can change configurations in each area, however these are only configuration at a global level, within the theme property. To see the glossary of all items you can theme, go to all theming items. However, we are going to first cover some of the main usecases that customers want to cover

:::note
The widget injects its styles at runtime, so if your website enforces a Content
Security Policy it must allow `style-src 'unsafe-inline'` or the widget renders
unstyled. See [Content Security Policy](./content-security-policy.md).
:::
