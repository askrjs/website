# Loaders, access, and metadata

## Contents

- Load route data
- Defer non-blocking work
- Enforce access
- Own metadata
- Reuse routes across renderers

## Load route data

A route `loader` receives route context and an optional request; its result is
available through the route-data contract during rendering and hydration.
Forward its `AbortSignal` to cancellable work so superseded navigation cannot
finish late and overwrite current state. Keep transport translation in an
adapter rather than embedding it in a page.

Use route `preload` to warm query data through its query-prefetch context. A
loader owns route data; a query owns cached reactive data. Choose by ownership,
not by habit.

## Defer non-blocking work

Use `defer(promise)` when a loader value may resolve after the route begins
rendering. Render it with `Resolve`, including explicit pending and rejected
content. Use `routeData<T>()` to read the loader result. Do not collapse
loading, empty, and error into one branch.

## Enforce access

Configure auth resolution at the registry boundary. Apply route or group auth
requirements and policies before rendering. Policies return explicit allow,
redirect, or denial decisions such as unauthorized, forbidden, or not found.
Client presentation is not authorization; preserve the same decisions on the
server request path.

## Own metadata

Provide `meta` at route or group registration. A metadata source may be static
or computed from resolved route context. Outer-to-inner metadata composes into
the final document contract. Public pages should normally provide distinct
titles, descriptions, canonical URLs, and Open Graph values; canonical and
social URLs must be absolute production URLs.

Do not maintain page metadata in a second route list. Verify initial server or
static head markup and client navigation reconciliation.

## Reuse routes across renderers

The same registry supports SPA, SSR, and SSG resolution. Route context exposes
the active mode when behavior legitimately differs. Dynamic SSG routes use the
installed `entries` contract to enumerate parameter combinations. Do not fork
the route tree merely because the renderer changes.
