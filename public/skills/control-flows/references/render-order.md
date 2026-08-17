# Render order and lifecycle

## Contents

- Preserve render-scoped order
- Nest controls safely
- Understand component boundaries
- Diagnose failures

## Preserve render-scoped order

`state()`, `derive()`, lifecycle operations, `For`, `Show`, `Case`, and other
primitives retaining render-owned state must be evaluated in the same order on
every render. Do not place the primitive call itself behind a changing `if`,
ternary, `&&`, or loop.

This is unsafe because the `For` boundary disappears from the render sequence:

```tsx
return open() ? (
  <For each={() => projects()} by={(project) => project.id}>
    {(project) => <ProjectRow project={project} />}
  </For>
) : null;
```

## Nest controls safely

Keep the outer retained boundary unconditional and move the changing branch
inside it:

```tsx
<Show when={() => open()}>
  {() => (
    <For each={() => projects()} by={(project) => project.id}>
      {(project) => <ProjectRow project={project} />}
    </For>
  )}
</Show>
```

Use `Case` and direct `Match` children when several branches share that
position. This preserves identity, mount/unmount order, and cleanup ownership.

## Understand component boundaries

The invariant applies to primitives evaluated in the current component's
render scope. An ordinary JSX child component owns its own internal sequence;
selecting that child with normal JavaScript does not conditionally call the
child's internal hooks in the parent.

## Diagnose failures

When the runtime reports a changed render-scoped sequence, compare consecutive
renders and find the first conditional hook or eager control boundary. Restore
an unconditional call order and express the changing UI through `Show` or
`Case`. Do not catch or suppress the invariant error; it identifies lost
render ownership that can otherwise corrupt lifecycle and reconciliation.
