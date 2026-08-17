# Collections

## Contents

- Use For
- Choose identity
- Understand row reactivity
- Render indexes and fallbacks

## Use For

Import `For` from `@askrjs/askr/control`. Pass an array or reactive source to
`each` and choose exactly one identity mode:

```tsx
<For each={() => projects()} by={(project) => project.id}>
  {(project) => <ProjectRow project={project} />}
</For>
```

`For` reconciles rows by identity, moving, inserting, removing, or replacing
owned DOM without rebuilding every stable row.

## Choose identity

Prefer `by={(item) => item.id}` with a stable string or number key. Keys must
be unique and retain their type; numeric `1` and string `"1"` are distinct.
Changing a key means changing row identity and therefore remounting that row.

Use `byIndex={true}` only when positional identity is intentional, such as a
fixed sequence whose items have no durable identity and are not meaningfully
reordered. `by` and `byIndex` are mutually exclusive, and one is required.

## Understand row reactivity

The row callback runs when a row is created or reconciled; it is not a general
reactive scope. A changing parent value captured as a plain closure can be
snapshotted for an existing row.

Use `selector()` for keyed membership such as selection:

```tsx
import { selector } from '@askrjs/askr';
import { For } from '@askrjs/askr/control';

const isSelected = selector(() => selectedId());

<For each={() => projects()} by={(project) => project.id}>
  {(project) => (
    <ProjectRow active={isSelected(project.id)} project={project} />
  )}
</For>;
```

Declare `selector()` during component render. When only one DOM property needs
the changing value, pass a function-valued prop so the renderer can reevaluate
that property:

```tsx
<li data-active={() => (selectedId() === project.id ? 'true' : 'false')} />
```

Do not assume a plain captured parent `state()`, `derive()`, or getter will
rerun every stable row.

## Render indexes and fallbacks

The row callback's second argument is an index getter, not a fixed number. Read
it when rendering a position that must follow reordering. Supply `fallback`
when an empty collection needs visible content, and distinguish a truly empty
successful result from a collection that is still loading or failed.
