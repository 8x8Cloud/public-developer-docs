# Click-through tour

`ClickThroughTour` (`docusaurus/components/ClickThroughTour/`) steps through product screenshots like a carousel. Each step spotlights one area of a screenshot and explains it in a callout. The 8x8 Resolve quick tour and analytics tour use it.

## Use it in a page

Keep the steps in a JavaScript module next to the docs, and render the component from MDX:

```mdx
import ClickThroughTour from '@site/docusaurus/components/ClickThroughTour';
import { chapters, steps } from '../tours/quick-tour';

<ClickThroughTour
  title="Quick tour of 8x8 Resolve"
  imageAltPrefix="8x8 Resolve screen"
  chapters={chapters}
  steps={steps}
/>
```

## Props

| Prop | Required | Description |
|---|---|---|
| `title` | Yes | Accessible name of the tour. |
| `steps` | Yes | The steps, in order. Renders nothing when empty. |
| `chapters` | No | `[{ id, label }]`. With two or more, tabs above the screenshot jump to each chapter's first step. |
| `imageAltPrefix` | No | Prepended to each screenshot's alt text, such as `8x8 Resolve screen`. |

## Step fields

| Field | Required | Description |
|---|---|---|
| `image` | Yes | Screenshot URL, usually `require('…/x.jpg').default`. |
| `rect` | Yes | Spotlight as `[x, y, width, height]`, each a fraction (0–1) of the screenshot. |
| `title` | Yes | Callout heading. |
| `text` | Yes | Callout body. |
| `chapter` | With chapters | Must match a `chapters[].id`. Keep each chapter's steps together. |
| `kicker` | No | Small label above the title. Defaults to the chapter's label, so set it only when it differs. |
| `note` | No | Secondary line below the body. |
| `alt` | No | Screenshot alt text. Defaults to `title`. |

## Measure a spotlight

`rect` is in fractions, not pixels, so a spotlight stays in place when a screenshot is re-exported at another resolution. Measure the area in pixels in any image editor, then divide by the image size:

```text
[x / imageWidth, y / imageHeight, width / imageWidth, height / imageHeight]
```

Four decimal places are enough: at 1,418 px wide, 0.0001 is 0.14 px.

If you crop a screenshot or change what it shows, re-measure every `rect` that uses it.

## Screenshots

The Resolve tours share one folder, `docs/resolve/images/tours/`, through the `shot()` helper in `docs/resolve/tours/shots.js`. A screenshot used by both tours is stored once. Screenshots don't need to share a size.

## Behaviour

- From 720 px wide, the callout floats over the screenshot beside the spotlight. Below that, it moves under the screenshot. The placement logic is in `placement.js`, and `yarn test` runs `placement.test.js`.
- Only the previous and next screenshots are preloaded.
- ← and → step through the tour while focus is inside it. With a modifier key held, they're left to the browser.
- Full screen fits the screenshot to the viewport height, where the browser allows it.
- "Show all steps as text" lists every step, numbered by its position in the tour.

## Styling

Chapter tabs (`@8x8/oxygen-tabs`), the Back, Next and Full screen buttons (`@8x8/oxygen-button`) and the "Show all steps as text" transcript (`@8x8/oxygen-accordion`) are Oxygen components. Docs pages are wrapped in `OxygenProvider`, so they follow light and dark mode. Everything else in `styles.module.css` uses the Oxygen tokens in `docusaurus/css/custom.css`.
