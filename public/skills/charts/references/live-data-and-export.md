# Live data and export

## Contents

- Update rows immutably
- Follow recent data without stealing control
- Capture the mounted API
- Export the intended view

## Update rows immutably

Use `appendPlotRows`, `upsertPlotRows`, `removePlotRows`, and `trimPlotRows` to
produce readonly arrays for live data. `upsertPlotRows` rejects duplicate keys;
use the same stable row identity as the plot. Pass an Askr state getter directly
as root data when updates are reactive.

Bound retained history by a row count or temporal window. Do not let an
unbounded polling or streaming series grow for the life of the page.

## Follow recent data without stealing control

Configure `followLatest` with a row count or `{ durationMs, field }` matching
the retained data window. User pan or zoom pauses following. Resume only after
explicit operator intent through `PlotApi.resumeLive()`; new data must not pull
someone away from a range they are investigating.

## Capture the mounted API

Use `onApiChange` to receive the mounted `PlotApi<Row>` and clear the reference
when it becomes `null` during cleanup. The API exposes resolved rows,
`resetView`, `resumeLive`, and export operations. Do not assume it exists during
SSR or before mounted dimensions resolve.

## Export the intended view

- PNG export chooses current or full view, pixel ratio, background, and whether
  transient overlays are included.
- SVG export uses the same immutable scene but is an export format, not the
  mounted renderer; referenced fonts are not embedded.
- Data export chooses current or full view, source or transformed rows,
  all/visible/selected scope, and CSV or JSON.

PNG and SVG require a mounted plot with resolved dimensions. Transient hover,
crosshair, and brush overlays are excluded unless requested. CSV export
neutralizes formula-like strings, while JSON serializes dates and non-finite
values according to the installed contract. Verify exported data and graphics
against the visible filters, selection, and product wording.
