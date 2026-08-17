# Themed components

## Contents

- Choose the right layer
- Build with Block
- Compose page structure
- Compose behavior-backed controls
- Represent application states
- Preserve accessibility

## Choose the right layer

Use `@askrjs/themes` when the shipped visual language should own appearance.
Use `@askrjs/ui` directly when the application or another design system must
own appearance. When a themed component wraps a headless primitive, behavior,
state, focus, and ARIA remain owned by `@askrjs/ui`; the theme supplies its
visual treatment.

Some theme-only components are visual composition wrappers and need no
headless counterpart. Verify ownership and stability in the installed
declarations rather than assuming every themed export has a UI subpath.

## Build with Block

`Block` is the canonical layout engine. It owns direction, alignment,
justification, spacing, sizing, responsive values, borders, backgrounds,
radius, shadows, and semantic element selection.

```tsx
import { Block, Container, Text } from '@askrjs/themes/components';

<Container size="xl" paddingY="lg">
  <Block direction="column" gap="md">
    <Text as="strong" size="lg">
      Projects
    </Text>
    <Text tone="muted">Active work in this workspace.</Text>
  </Block>
</Container>;
```

Use exact installed prop and token values. Use `paddingY`, not an invented
`py`. Use `Block direction="column"` or `Block direction="row"` rather than
the legacy `Stack` and `Inline` compatibility aliases. Use `Grid` when the
layout genuinely needs explicit rows or columns. Use `Container` for content
width and gutters; use its `size` contract instead of overriding `maxWidth`.

## Compose page structure

Use semantic components such as `Header`, `Main`, `Aside`, `Footer`, `Page`,
`PageHeader`, and `Section` for the regions they name. Compose navigation from
`Navbar` or `Sidebar`. Use `Link` from `@askrjs/askr/router` for ordinary
internal navigation and themed `NavLink` when navigation also needs
route-aware active styling.

These components compose Block's layout contract; they are not alternate
layout engines. Avoid the legacy `Shell`, `ShellNav`, and `ShellMain` aliases
in new code. Product-specific shells remain application composition.

## Compose behavior-backed controls

Use the themed versions of behavior-backed controls such as `Button`,
`Checkbox`, `Dialog`, `Select`, and `Switch` when default styling is desired.
Keep their published compound structure intact. Use `Button` for actions and
links for navigation.

Use `Field` with the installed label, control, hint, and error contracts for
forms. Associate help and validation feedback with the control. Do not infer
compound parts or props from similarly named components in another library.

## Represent application states

Use canonical feedback components according to the state being communicated:

- `Alert` for contextual information or actionable problems.
- `EmptyState` for an all-in-one empty result; use the separate compound
  `Empty` family only when its parts are required.
- `Progress`, `Skeleton`, or `Spinner` for real pending work.
- `Toast` for transient feedback that does not replace an inline recoverable
  error.
- `Card` for a bounded content group, not as default spacing.

Never leave a loading indicator indefinitely where a failure state should
appear.

## Preserve accessibility

The theme does not relieve the application of content semantics. Maintain one
meaningful `h1`, logical heading order, landmarks, labels, accessible names,
focus order, useful alternative text, and actionable error recovery. Choose
configurable heading elements such as `titleAs` from the surrounding document
hierarchy. Verify behavior-backed components with a keyboard and screen
reader, not appearance alone.
