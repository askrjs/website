# Brand logos

## Contents

- Choose an included logo
- Import exact components
- Preserve brand treatment
- Name meaningful marks

## Choose an included logo

Use `@askrjs/logos` for an authorized brand mark, not for general interface
concepts. The installed package currently determines which marks are available.
At version 0.2.0 it exports Apple, Facebook, GitHub, Google, and Microsoft logo
components. Verify the installed declarations rather than assuming another
brand is present.

Do not approximate a missing trademark with a Lucide interface icon. Use the
authorized asset supplied by the product owner when the package does not
contain the required brand.

## Import exact components

Import a named logo from the package root:

```tsx
import { GitHubLogo, GoogleLogo } from '@askrjs/logos';
```

Focused subpaths such as `@askrjs/logos/logos/github` are also published.
Verify the installed export before using one. The package has no runtime logo
registry or string-selected logo component.

## Preserve brand treatment

Logo geometry and color are brand assets, not ordinary theme decoration.
Apple and GitHub currently inherit `currentColor`; Facebook, Google, and
Microsoft retain fixed brand colors. Verify the installed implementation and
applicable brand rules before recoloring, reshaping, combining, or animating a
mark.

Keep enough space and contrast around a logo, and do not use a logo as an
unexplained action symbol.

## Name meaningful marks

When a logo is the only content identifying a destination or organization,
give the owning link or control an accessible name and decide whether the SVG
should remain decorative. When the standalone logo is meaningful content,
pass its `title`. Avoid making assistive technology announce the brand twice
when adjacent text already names it.
