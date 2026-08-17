---
name: queries-and-mutations
description: Build, change, debug, or review Askr query and mutation data flow. Use for @askrjs/askr/data, defineQuery, createQuery, createMutation, query keys and scopes, consistency and reconciliation, invalidation, pending writes, data runtimes, server query handlers, prefetch, dehydration, or hydration.
---

# Build Askr queries and mutations

Use the data runtime for application data that needs stable cache identity,
reactive read states, invalidation after writes, consistency checks, or shared
identity across server rendering and browser hydration.

## Preserve the application boundary

```text
feature -> query or mutation -> service -> adapter
```

Queries and mutations own reactive data state and cache effects. Services map
application operations and models. Adapters remain raw transport boundaries.
Do not fetch directly from reusable components or place transport mapping in a
query's UI consumer.

Skip this layer for static content or lifecycle-local async work that does not
need cache identity, invalidation, or server/client continuity.

## Verify the installed data API

Read the installed `@askrjs/askr/data` declarations before using an option or
state field. Query state is a discriminated contract, not a generic
`data/isLoading/error` tuple. Do not infer semantics from another query
library.

## Select the needed references

- Read [definitions-and-keys.md](references/definitions-and-keys.md) for
  reusable definitions, cache identity, scopes, runtimes, and ownership.
- Read [states-and-consistency.md](references/states-and-consistency.md) for
  loading, fresh, refreshing, pending-write, stale reasons, consistency checks,
  reconciliation, retry, and visible UI states.
- Read [mutations-and-invalidation.md](references/mutations-and-invalidation.md)
  for mutation lifecycle, cancellation, affected prefixes, invalidation, and
  bounded invalidation graphs.
- Read [server-prefetch-and-hydration.md](references/server-prefetch-and-hydration.md)
  for server handlers, isolated runtimes, route prefetch, dehydration,
  hydration, SSR, or SSG.
- Compose the sibling
  [project structures skill](../project-structures/SKILL.md) for feature,
  service, and adapter placement.

## Verify behavior

Exercise first load, fresh data, empty success, refresh with previous data,
first-load failure, refresh failure with previous data, inconsistent data,
aborted refresh, pending write, mutation failure, retry, cancellation, and
invalidation where applicable. For server rendering, prove the first browser
read adopts the hydrated cache identity without a duplicate request.
