# Conditional branches

## Contents

- Choose a branch primitive
- Use Show
- Use Case and Match
- Own fallback states

## Choose a branch primitive

Use ordinary JavaScript to compute values. Use an Askr control boundary when
rendered content must mount, unmount, clean up, or retain an explicit position
in the render-scoped sequence.

- Use `Show` for one truthy branch with an optional fallback.
- Use `Case` with direct `Match` children for ordered, mutually exclusive
  branches with an optional fallback.

Import them from the canonical subpath:

```tsx
import { Case, Match, Show } from '@askrjs/askr/control';
```

## Use Show

`Show` accepts a value or getter through `when`. Its function-child form
receives the truthy, narrowed value:

```tsx
<Show when={() => currentUser()} fallback={<LoginFeature />}>
  {(user) => <AccountFeature user={user} />}
</Show>
```

Use the function form when the branch consumes the narrowed value or should
delay creating nested control primitives until active. Keep loading, empty,
failure, and unauthorized states distinct rather than treating all falsy data
as one generic fallback.

## Use Case and Match

`Case` renders the first truthy `Match` in declaration order:

```tsx
<Case fallback={<UnknownState />}>
  <Match when={status() === 'loading'}>
    <LoadingState />
  </Match>
  <Match when={status() === 'error'}>
    <ErrorState />
  </Match>
  <Match when={status() === 'ready'}>
    <ReadyState />
  </Match>
</Case>
```

`Match` is valid only as a direct child of `Case`; the runtime rejects other
placement and rejects non-`Match` children in a `Case`. Order overlapping
conditions from most specific to least specific.

## Own fallback states

A fallback is part of the user-visible contract. Use it for the actual state
that remains when no branch matches, not as a silent substitute for missing
data or an unexpected status. When no rendered fallback is correct, make that
choice deliberate and still verify cleanup of the branch that disappeared.
