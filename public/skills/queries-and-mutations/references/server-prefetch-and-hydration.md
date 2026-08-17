# Server prefetch and hydration

## Contents

- Register server handlers
- Prefetch at the route boundary
- Dehydrate and hydrate one identity
- Isolate request and build-entry caches

## Register server handlers

Pair each reusable query definition with its server implementation through
`serveQuery`, then collect entries with `defineServerQueries`. The handler
receives validated application input, the request when available, and an
`AbortSignal`. Keep request authentication and service dependencies on this
server path.

The definition is shared identity; the server handler is not browser code. Do
not put secrets or server-only transport into the query definition shipped to
the client.

## Prefetch at the route boundary

Create an isolated runtime and a `createQueryPrefetchContext` with the server
registry, request, signal, and installed mode. Prefetch the same definition and
input the feature will later pass to `createQuery`. Route `preload` may use its
provided query-prefetch context directly.

If the input or key differs between prefetch and render, hydration cannot adopt
the cached value and the browser will fetch again.

## Dehydrate and hydrate one identity

After prefetch, serialize the runtime with `dehydrateDataRuntime(runtime)` and
embed that JSON-safe payload in the rendered document. Before the first client
`createQuery` read, create the browser runtime and call
`hydrateDataRuntime(runtime, payload)`.

The definition, input, key construction, and runtime passed to the browser
reader must match the server path. Verify that initial rendering adopts the
payload without a duplicate request, then that explicit refresh and
invalidation still use the browser runtime.

## Isolate request and build-entry caches

Create one runtime per SSR request. Never share it across users. For SSG,
create an isolated runtime per generated entry when entry data differs, then
embed only that entry's snapshot. Dehydration drops non-serializable cache
values; treat a missing value as a contract problem rather than silently
depending on client refetch.
