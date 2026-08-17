# Sizing and custom icons

## Contents

- Use the shared SVG contract
- Prefer semantic sizes
- Style through theme tokens
- Integrate custom SVGs
- Treat logos carefully

## Use the shared SVG contract

Official icons and logos render through the same foundation and expose:

- `data-slot="icon"` for theme targeting;
- `data-icon` for the exact asset identity;
- `data-size` for named sizes;
- `data-decorative="true"` when no title is supplied;
- `data-color="current"` when color inherits `currentColor`.

Their public props include `size`, `strokeWidth`, `color`, `title`, `class`,
and `style` along with compatible SVG props. Verify the installed declaration
before passing additional attributes.

## Prefer semantic sizes

Use `sm`, `md`, `lg`, or `xl` when an icon participates in the application
design system. Named sizes resolve through theme variables. Use a numeric or
CSS string size only when a real illustration or integration constraint falls
outside that semantic scale.

Let the owning themed component size ordinary child icons when it documents
that behavior. Avoid specifying a competing literal size on every icon inside
buttons, badges, menu items, or sidebars.

## Style through theme tokens

Theme defaults use `--ak-icon-size-sm|md|lg|xl` and
`--ak-icon-stroke-width-sm|md|lg|xl`. Override those semantic tokens for a
coherent application-wide icon scale. Use the lower-level `--ak-icon-size` and
`--ak-icon-stroke-width` only for a deliberately scoped exception.

Prefer `currentColor` for interface icons so state and contrast follow the
owning component. Recheck contrast and forced-color behavior after custom
color overrides.

## Integrate custom SVGs

Prefer `IconBase` from `@askrjs/askr/foundations/icon` when building an
application-owned icon component so sizing, title, decorative state, refs, and
public hooks remain aligned. Ensure the SVG uses a stable view box and does
not embed unsafe remote references or depend on internal theme DOM.

If a third-party SVG cannot use `IconBase`, make it emit the same public hooks
and accessibility behavior before placing it beside official icons. A raw SVG
that lacks `data-slot="icon"` will not receive automatic theme sizing.

## Treat logos carefully

Logo components share icon sizing and accessibility props but may intentionally
retain fixed brand colors. Apple and GitHub currently inherit `currentColor`;
Facebook, Google, and Microsoft retain their published colors. Verify the
installed package and applicable brand rules before modifying a logo.
