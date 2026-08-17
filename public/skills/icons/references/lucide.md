# Lucide icons

## Contents

- Choose an interface icon
- Import exact components
- Keep meanings consistent
- Preserve bundle behavior

## Choose an interface icon

Use `@askrjs/lucide` for general interface concepts such as search, menu,
close, edit, status, or directional navigation. Prefer visible words when an
action is unfamiliar, consequential, or ambiguous. An icon should reinforce
understanding rather than make the user decode a novel symbol.

Choose by meaning, not visual resemblance alone. Use one symbol for one meaning
throughout the application and do not mix unrelated icon families without a
product reason.

## Import exact components

Import the named component exposed by the installed package:

```tsx
import { MenuIcon, SearchIcon } from '@askrjs/lucide';
```

The package also publishes focused paths such as:

```tsx
import { SearchIcon } from '@askrjs/lucide/icons/search';
```

Verify the installed export before using it. Do not assume every name on the
upstream Lucide site exists in the installed Askr package version.

## Keep meanings consistent

Do not reuse the same icon for conflicting actions. Pair icons with visible
labels until the action is genuinely conventional in its context. For status
and feedback, pair shape and color with text; an icon alone must not carry the
only explanation of success, warning, or failure.

## Preserve bundle behavior

`@askrjs/lucide` is a generated static binding layer with named exports and
individual icon subpaths. It does not ship a runtime registry or a string-based
`<Icon name="..." />` API. Keep component selection explicit in source so
missing names fail during development and bundlers can eliminate unused icons.
Do not generate import paths from user input or import the whole catalog merely
to render a dynamic name.
