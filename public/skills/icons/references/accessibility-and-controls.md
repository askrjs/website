# Accessibility and controls

## Contents

- Decide whether the SVG is decorative
- Name icon-only controls
- Compose icons with text
- Preserve interaction semantics

## Decide whether the SVG is decorative

Generated icons and logos are decorative by default. With no `title`, they
render `aria-hidden="true"` and `data-decorative="true"`. Keep that default
when adjacent text or the owning control already communicates the meaning.

Pass `title` when the standalone SVG itself conveys meaningful content:

```tsx
<GitHubLogo title="GitHub" />
```

This removes `aria-hidden` and renders an SVG `<title>`. Do not give a
decorative icon a redundant title that causes a screen reader to repeat the
visible label.

## Name icon-only controls

Name the interactive element, not only the SVG:

```tsx
<Button aria-label="Search" size="icon">
  <SearchIcon />
</Button>
```

Keep the nested icon decorative because the button supplies the accessible
name. Use a stable action name rather than a visual description such as
“magnifying glass.” A tooltip may help sighted users discover the action, but
it does not replace a reliable accessible name on the control.

## Compose icons with text

When a button, link, alert, or navigation item already contains visible text,
leave its supporting icon decorative. Preserve a sensible DOM reading order
and do not hide the text at narrow widths unless the remaining control still
has an accessible name and discoverable purpose.

For status and error messages, icons reinforce but never solely encode the
state. Pair color and shape with text users can understand and act upon.

## Preserve interaction semantics

An SVG is not a button or link. Place it inside the published interactive
primitive that owns focus, keyboard behavior, disabled state, and activation.
Do not attach click behavior directly to a bare icon. Verify focus visibility,
target size, accessible name, disabled behavior, and high-contrast rendering.
