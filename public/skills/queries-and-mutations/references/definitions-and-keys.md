# Query definitions and keys

## Contents

- Define reusable queries
- Treat keys as contracts
- Build scoped keys
- Isolate runtimes deliberately

## Define reusable queries

Use `defineQuery` for a reusable contract. Its input determines a stable key
and is passed with an `AbortSignal` to the fetch function:

```ts
import { defineQuery } from '@askrjs/askr/data';
import { usersService } from '../../services/users-service';

export const userById = defineQuery({
  key: ({ id }: { id: string }) => `users:${id}`,
  fetch: ({ id, signal }) => usersService.getById(id, { signal }),
});
```

Create the reactive reader in the owning feature with
`createQuery(userById, input)`. Do not copy query data into component state
unless the user is editing a separate draft.

Use inline `createQuery({ key, fetch, ... })` only when the contract is truly
local and will not be shared with server prefetch or another reader.

## Treat keys as contracts

Readers with the same key share cache state. The key therefore identifies not
only data but the query contract. Keep `fetch`, `isConsistent`, and `reconcile`
aligned for every reader of that key; development builds diagnose conflicting
definitions.

Keys and invalidation prefixes must be stable and collision-safe. Do not
include incidental render state, non-serializable values, or ordering that can
change for the same data identity.

## Build scoped keys

Raw `invalidate(prefix)` uses literal string-prefix matching, so
`invalidate('user:1')` also matches `user:10`. Use explicit delimiters in
hand-built schemes or prefer `queryScope(namespace)` for structured feature
keys and prefixes:

```ts
import { queryScope } from '@askrjs/askr/data';

export const users = queryScope('users');
const key = users.key('detail', userId);
users.invalidate(['detail', userId]);
```

The namespace must remain non-empty after trimming.

## Isolate runtimes deliberately

The default runtime is sufficient for one browser application instance. Use
`createDataRuntime()` for tests, embedded or multi-root applications, server
requests, and static build entries that require isolated caches. Pass the same
runtime explicitly to queries, invalidation, prefetch, dehydration, and
hydration that belong to that owner. Never share a request cache between
unrelated users.
