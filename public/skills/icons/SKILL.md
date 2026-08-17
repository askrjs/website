---
name: icons
description: Select, import, compose, style, or review icons and brand logos in an Askr application. Use for @askrjs/lucide, @askrjs/logos, icon-only controls, accessible SVG semantics, semantic icon sizes, theme icon tokens, custom icons, or tree-shakeable icon imports.
---

# Use icons in Askr

Choose an icon for communication, not decoration by default, and preserve the
shared SVG contract so accessibility and themes behave consistently.

## Establish ownership

- `@askrjs/askr/foundations/icon` owns the shared SVG prop and markup contract.
- `@askrjs/lucide` supplies generated Askr components for general interface
  icons.
- `@askrjs/logos` supplies the small published set of brand marks.
- `@askrjs/themes` styles the shared hooks and provides semantic size and
  stroke tokens.
- The application owns icon choice, accessible naming, surrounding control
  semantics, and any product-specific SVG.

## Verify the installed surface

Check the installed package exports and declarations before choosing a name or
subpath. Neither icon package provides a string-based `<Icon name="..." />`
component or runtime registry. Import the exact named component you use. Do not
infer an export from the upstream Lucide site or from an example built against
a different package version.

## Select the needed references

- Read [lucide.md](references/lucide.md) when choosing and importing general
  interface icons from `@askrjs/lucide`.
- Read [logos.md](references/logos.md) when choosing, importing, naming, or
  styling brand marks from `@askrjs/logos`.
- Read [accessibility-and-controls.md](references/accessibility-and-controls.md)
  when an icon conveys meaning, labels a control, appears beside text, or
  participates in feedback and navigation.
- Read [sizing-and-custom-icons.md](references/sizing-and-custom-icons.md) when
  applying semantic sizes, theme tokens, colors, stroke widths, or authoring a
  custom icon or logo wrapper.
- Compose the sibling [themes skill](../themes/SKILL.md) for broader token and
  component styling decisions.

Lucide icons and logos share the foundation contract but serve different
purposes. Do not substitute a general icon for a trademark or treat a brand
logo as ordinary interface decoration.

## Verify the result

Inspect rendered SVG attributes, not only appearance. Verify decorative and
meaningful variants with a screen reader, icon-only controls by keyboard, and
all icons in light, dark, forced-color, narrow, and high-zoom contexts relevant
to the application. Confirm the production bundle does not pull in an icon
registry or unrelated icon set merely to render a few named icons.
