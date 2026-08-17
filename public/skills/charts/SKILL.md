---
name: charts
description: Build, change, debug, or review typed data visualizations in an Askr application. Use for @askrjs/charts, createPlot, typed channels, marks, transforms, scales, axes, legends, tooltips, selection, zoom, brush, live rows, accessible summaries, Canvas rendering, SVG or PNG export, or chart styling.
---

# Build Askr charts

Use `@askrjs/charts` as a typed plotting engine. It compiles row-typed JSX
descriptors into one immutable scene used by mounted Canvas rendering and PNG,
SVG, and data export. The application still owns loading, errors, filters,
cards, routes, and product actions around the plot.

## Verify the installed surface

Read the installed root declarations and packaged charting documentation before
using a primitive. JavaScript comes from `@askrjs/charts`; structural styles
come from `@askrjs/charts/styles`. Do not use removed chart-specific wrappers or
invent `/components`, `/core`, `/default`, or per-chart CSS entrypoints.

## Select the needed references

- Read [plots-and-data.md](references/plots-and-data.md) for the typed factory,
  root, row keys, channels, marks, scales, transforms, and missing-value rules.
- Read [interaction-and-accessibility.md](references/interaction-and-accessibility.md)
  for labels, summaries, legends, tooltips, selection, keyboard inspection,
  zoom, brush, meter semantics, and non-graphical access.
- Read [live-data-and-export.md](references/live-data-and-export.md) for
  immutable row updates, follow-latest behavior, controlled view/selection,
  APIs, and PNG, SVG, CSV, or JSON export.
- Read [styling-and-rendering.md](references/styling-and-rendering.md) for CSS
  imports, tokens, responsive sizing, SSR, hydration, Canvas limits, and motion.
- Compose [queries and mutations](../queries-and-mutations/SKILL.md) for data
  acquisition and [themes](../themes/SKILL.md) for the surrounding interface.

## Verify the visualization

Verify source, transformed, omitted, visible, and selected rows against the
product question. Exercise empty, missing, negative, zero, large, dense, and
live datasets; keyboard and pointer interaction; reduced motion; resizing;
light and dark themes; server output; and every enabled export path. Never use
a tooltip, color, or canvas pixel as the only representation of essential
information.
