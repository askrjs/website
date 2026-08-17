# Plots and data

## Contents

- Create one typed factory
- Establish root semantics
- Select channels and marks
- Use scales and transforms deliberately
- Preserve data truth

## Create one typed factory

Create a factory at module scope for one row contract:

```tsx
import { createPlot } from '@askrjs/charts';

type RevenueRow = {
  id: string;
  day: Date;
  revenue: number;
  target: number;
};

const RevenuePlot = createPlot<RevenueRow>();
```

Do not create it during render or mix descriptors from another factory into
its root. The factory binds field names, accessors, marks, scales, and
interaction to the row type.

## Establish root semantics

Every `Root` requires readonly data or a data getter, a stable `rowKey`, and an
accessible `label`:

```tsx
<RevenuePlot.Root data={rows} rowKey="id" label="Daily revenue">
  <RevenuePlot.Bar x="day" y="revenue" />
  <RevenuePlot.Line x="day" y="target" />
</RevenuePlot.Root>
```

Use unique string or number row keys. They preserve identity for selection,
transitions, and live updates. The root also owns plot title, description,
summary, empty state, dimensions, view, selection, activation, and API access.

## Select channels and marks

Channels accept a typed field, accessor, or immutable expression. Bare strings
name fields. Wrap literal strings such as fixed colors in `constant(...)`.

Compose chart families from marks rather than named chart wrappers:

- `Bar`, `Line`, `Area`, and `Point` for Cartesian plots.
- `Arc` for pie, donut, and bounded gauge compositions.
- `Cell` for heatmaps.
- `Rect` with `partition(...)` for hierarchical rectangles.
- `Rule`, `Point`, and `Text` for timelines.

## Use scales and transforms deliberately

Let inferred scales and axes handle a simple composition. Add explicit named
`Scale`, `Axis`, `Grid`, `Legend`, or `Tooltip` descriptors when domains, units,
time zones, or interaction differ. Use `utc` when calendar boundaries must not
depend on viewer locale. Use `symlog` when signed values or zero matter; a log
scale accepts strictly positive data only.

Use immutable expressions for binning, grouping, aggregation, stacking,
normalization, moving windows, and regression. Use mark-local `filterRows`,
`sortRows`, or `partition` without mutating source rows.

## Preserve data truth

Finite negative values remain negative. `null`, `undefined`, invalid dates,
and non-finite numbers are missing, not zero. Aggregates skip missing numeric
inputs, and log scales omit zero and negative values. Enable diagnostics and
write a summary that reports omitted rows when omission affects interpretation.

Normalize transport date strings and models before passing them to the plot.
Do not repair malformed data inside a visual channel accessor.
