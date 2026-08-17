# Mutations and invalidation

## Contents

- Create mutations in the owning feature
- Render mutation lifecycle
- Invalidate affected reads
- Keep invalidation bounded

## Create mutations in the owning feature

Create a mutation while rendering the feature that owns the action. Give it a
stable key when tests or runtime-scoped overrides need to identify it. Its
`action` calls an application service and forwards the cancellation signal:

```ts
import { createMutation } from '@askrjs/askr/data';

export function createSaveUserMutation() {
  return createMutation({
    key: 'users/save',
    action: (input: SaveUserInput, { signal }) =>
      usersService.save(input, { signal }),
    affects: (input) => [`users:${input.id}`],
    afterSuccess: 'invalidate',
  });
}
```

## Render mutation lifecycle

Call `execute(input)` from the user action. A new execution aborts the previous
one. Use `status` to narrow idle, pending, success, and error; `pending`,
`result`, and `error` follow that status. Prevent duplicate user submission
where appropriate and expose failure, recovery, and success honestly.

`abort()` cancels in-flight execution. `reset()` clears settled mutation state
to idle. Do not hide failed writes behind success or modify unrelated caches.

## Invalidate affected reads

`affects(input, result)` returns the query prefixes made stale by a successful
write. With `afterSuccess: 'invalidate'`, the runtime invalidates them and can
surface `pending-write` before confirmation refresh begins. Return the narrowest
complete prefixes that represent the changed data.

Use `invalidate(prefix, { markPendingWrite: true })` for an explicit write
boundary outside automatic mutation handling. Use the same runtime as the
queries being invalidated.

## Keep invalidation bounded

Invalidation listeners run synchronously and may trigger a short acyclic
cascade. Re-entering an active prefix throws a cyclic-cascade diagnostic, and
changing-prefix cascades have a runtime depth limit. Keep the invalidation graph
small, narratable, and acyclic rather than relying on broad refresh storms.

Use `invalidateOnInterval` only when periodic freshness is a demonstrated
requirement. Scope it by active routes, visibility, or focus as appropriate and
let component cleanup own its lifetime.
