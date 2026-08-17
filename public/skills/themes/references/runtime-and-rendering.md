# Theme runtime and rendering

## Contents

- Select theme state
- Register custom names
- Integrate SSR and SSG
- Preserve deterministic output

## Select theme state

Use the installed `@askrjs/themes/theme` exports for runtime theme selection.
`ThemeScope` establishes theme context, while `ThemePicker` and `ThemeToggle`
provide selection UI. The lower-level `theme` helper reads or controls the
document theme according to its installed contract. Do not invent helpers from
stale capability metadata or examples; verify the current declarations.

Theme selection must be explicit at an appropriate ancestor. The resulting
DOM uses `data-theme` values such as `light` or `dark` for token selection.
Provide application-owned content or icons to `ThemeToggle`; it intentionally
does not supply icons.

## Register custom names

Custom theme names are intentionally allowed. Register each name in the
scope's theme options and supply a matching `[data-theme="..."]` token block.
Because arbitrary names type-check, a misspelling can silently select a name
with no matching token block; keep the option registry and CSS selector in the
same change.

## Integrate SSR and SSG

Responsive theme components can register render-time CSS. Wrap the SSR or SSG
document renderer with `withThemeStyles` from `@askrjs/themes/ssr` so styles
used by the rendered application are present before hydration:

```ts
import { withThemeStyles } from '@askrjs/themes/ssr';

export const renderDocument = withThemeStyles(baseDocumentRenderer);
```

Use the renderer's strict style-registration validation when available so a
missing registration fails the build instead of producing an unstyled or
hydration-divergent page. Preserve any CSP nonce carried by the rendering
context.

## Preserve deterministic output

Resolve the initial theme deterministically for server and client. The server
HTML, `data-theme`, registered styles, and initial client state must agree
before hydration. Inspect generated HTML and CSS directly, then hydrate it in
a browser and check for console diagnostics, flashes of the wrong theme, or
layout changes.
