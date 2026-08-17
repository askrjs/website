# Tokens and customization

## Contents

- Load a shipped theme
- Understand token ownership
- Customize in contract order
- Author stable selectors
- Check visual quality

## Load a shipped theme

Import one selected theme once from the application stylesheet:

```css
@import '@askrjs/themes/default';
```

CSS imports are side effects. Do not scatter duplicate imports through
components. Confirm the installed package exposes the selected CSS entry.

## Understand token ownership

Official tokens use the global `--ak-*` prefix and express semantic color,
typography, spacing, radius, borders, shadows, focus, motion, icons, layout,
and z-index. Prefer semantic tokens over component-specific or raw visual
values. Layout, spacing, typography scale, icon scale, and breakpoints normally
belong at the global root; theme mode blocks override values that genuinely
change between themes.

The default light and dark token sets are contrast-tested. Consumer overrides
are ordinary CSS and cannot be validated by the runtime.

## Customize in contract order

1. Select the closest shipped theme.
2. Override semantic tokens for application visual identity and density.
3. Use published component props and variants.
4. Add narrow component CSS only when tokens and props cannot express the
   requirement.

```css
:root {
  --ak-color-primary: purple;
  --ak-radius-md: 12px;
}
```

Recheck every affected foreground/background contrast pair after color
overrides. Tune shared density, focus, motion, and icon tokens rather than
patching each component independently.

## Author stable selectors

Style public hooks: `data-slot`, `data-state`, `data-disabled`,
`data-orientation`, `data-variant`, and `data-size`. Prefer low-specificity
`:where(...)` rules. Do not target undocumented internal DOM, use deep
selectors, depend on generated class names, or reach for `!important`.

Class aliases are conveniences; public `data-*` hooks are the canonical
contract. Product-specific styles belong in the application, not the shared
theme package.

## Check visual quality

Review light and dark mode with realistic content at phone, tablet, and
desktop widths. Look for clipped text, accidental page overflow, broken icon
alignment, inconsistent control heights, weak focus treatment, unreadable line
length, and flat or inconsistent elevated surfaces. Honor reduced motion and
verify forced-color behavior where interactive controls are present.
