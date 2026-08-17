---
name: themes
description: Select, apply, compose, customize, or review Askr themes and themed components. Use for @askrjs/themes imports, Block-first layout, component styling, design tokens, light and dark modes, custom themes, themed accessibility, and SSR or SSG style integration.
---

# Use Askr themes

Use themes as the visual layer of an Askr application without moving
application behavior or product-specific composition into the theme.

## Establish the package boundary

- `@askrjs/askr` owns what exists and when.
- `@askrjs/ui` owns behavior, state, focus, and ARIA coordination.
- `@askrjs/themes` owns tokens, default styling, visual-only composition, and
  Block-first structural components.
- The application owns product-specific page and feature composition.

Do not repair a behavior problem with theme CSS or put a product-specific
dashboard, marketing section, or workflow into the shared theme.

## Verify the installed contract

Inspect the installed package exports, declarations, declaration comments,
and `THEMING.md` before selecting an API. Export presence alone is not an
endorsement. Avoid legacy and deprecated aliases in new work, and use limited
or experimental components only when their documented constraints fit the
request.

Use `@askrjs/themes/components` for the aggregate styled catalog or a real
documented component subpath when a focused import is useful. Do not invent a
subpath from a component name.

## Select the needed references

- Read [components.md](references/components.md) when choosing building
  blocks, composing application chrome, forms, feedback, or responsive UI.
- Read [tokens-and-customization.md](references/tokens-and-customization.md)
  when selecting a shipped theme, changing visual language, overriding tokens,
  or authoring component CSS.
- Read [runtime-and-rendering.md](references/runtime-and-rendering.md) when
  using theme selection controls, custom theme names, SSR, SSG, hydration, or
  CSP-aware style output.
- Compose the sibling [icons skill](../icons/SKILL.md) for icon selection,
  accessibility, imports, and the SVG contract. This skill owns only the theme
  tokens and selectors that style that contract.

The references compose. A static marketing page may need components and token
customization; an SSG using responsive `Block` props also needs runtime and
rendering guidance.

## Verify the themed result

Check light and dark modes at 320, 390, 768, 1024, and desktop widths. Verify
contrast, focus visibility, forced colors, reduced motion, text wrapping,
overflow, control sizing, elevated surfaces, and realistic long content.
Inspect server-rendered HTML and styles before hydration when SSR or SSG is in
scope. Run the owning repository's formatting, type, analysis, build, and
browser gates appropriate to the change.
