# Styling and rendering

## Contents

- Load chart styles once
- Size responsively
- Customize public tokens
- Understand SSR and hydration
- Respect renderer limits

## Load chart styles once

Import chart styles once at the application stylesheet boundary:

```css
@import '@askrjs/charts/styles';
```

The chart stylesheet is self-contained and adopts compatible Askr theme values
when present. A JavaScript import does not replace the CSS side effect.

## Size responsively

Mounted plots observe their container. `width` is an SSR and initial-layout
fallback, not a fixed mounted width. Give the container a real size and use a
deterministic height where layout shift matters. Test narrow containers, high
zoom, long labels, and device-pixel-ratio changes.

## Customize public tokens

Prefer `--ak-chart-*` tokens for height, gap, padding, radius, typography,
series colors, surfaces, borders, focus, selection, crosshair, and motion. Use
stable `data-slot="plot-*"` hooks only when tokens are insufficient. Do not
style generated scene IDs or assume canvas geometry exists as DOM.

Check series contrast in light and dark themes. Preserve non-color encodings
and focus visibility after customization.

## Understand SSR and hydration

SSR emits a reserved region and semantic title, description, legend, summary,
empty state, and keyboard/data instructions. It does not emit graphical marks
or an SVG fallback. After hydration the plot mounts Canvas rendering, and the
transformed DOM table is materialized only when the user opens “View data.”

Without JavaScript, essential semantic context remains but graphics do not.
Design the surrounding feature accordingly and verify hydration does not shift
the region unexpectedly.

## Respect renderer limits

Canvas 2D is the mounted renderer. SVG is export-only. There is no public
WebGL, worker, OffscreenCanvas, or custom-renderer surface. Motion is progressive
enhancement, and reduced-motion preferences disable nonessential transitions
without hiding state changes.
