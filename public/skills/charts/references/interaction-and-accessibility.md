# Interaction and accessibility

## Contents

- Explain the plot without pixels
- Add inspection and selection
- Add navigation carefully
- Represent bounded values
- Keep application states outside

## Explain the plot without pixels

Provide a useful root `label` and, where appropriate, `title`,
`headingLevel`, `description`, and `summary`. A summary callback can report
source, transformed, omitted, and visible row counts. Do not make a tooltip,
canvas mark, or color the only source of essential meaning.

Use redundant series encoding. The defaults cycle dash patterns for lines and
shapes for points when color creates multiple series; preserve or deliberately
replace that behavior rather than relying on hue alone.

## Add inspection and selection

`Tooltip` supports automatic, nearest-mark, or shared nearest-x inspection.
Add it for detail, not as a substitute for semantic context or data access.
`Crosshair` adds an inspection guide. `Legend` explains a scale and may filter
an interactive color scale.

`Select` provides single or toggle selection. Pointer and keyboard selection
updates before `onActivate(row, key, target)`, which the application may use
for drill-down. Keep the product action outside the chart engine.

## Add navigation carefully

Add `Zoom` or `Brush` only when users need to inspect a domain. Arrow keys
inspect marks; Enter or Space activates; plus and minus zoom; Home resets; and
Shift plus arrows pans. Prefer Shift-modified brushing so ordinary dragging
remains available to the page. Verify equivalent pointer and keyboard paths.

Use controlled `view` or `selection` only when a route, URL, or shared owner
must persist it; otherwise prefer the corresponding default state.

## Represent bounded values

For progress or gauge compositions, provide root `meter` semantics with
minimum, maximum, current value, and useful value text. A bounded bar or arc is
not accessible as a meter merely because it looks like one.

## Keep application states outside

Use root `empty` only for a successfully loaded dataset with no renderable
rows. Route or feature code owns loading, failure, authorization, and retry.
Keep those states distinct and do not mount a misleading empty plot while data
is still unknown.
