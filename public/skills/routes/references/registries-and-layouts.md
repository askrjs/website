# Registries and layouts

## Contents

- Create one registry
- Compose route scopes
- Connect layouts
- Handle fallbacks
- Configure a base path

## Create one registry

Create the root registry in `pages/_routes.tsx` with
`createRouteRegistry(definition, options?)`. Export the resulting ordinary
value and pass it to browser mounting, hydration, SSR, or SSG. Two registries
may coexist when an application intentionally owns two route trees, but a
rendering mode is not a reason to duplicate one tree.

## Compose route scopes

- `route(path, Component, options?)` declares one route and returns a typed
  route reference.
- `group(options, definition)` shares layout, auth, policies, or metadata
  without adding a path segment.
- `page(path, Component, options?, definition)` declares a route and opens a
  nested scope.
- `index(Component, options?)` declares the index inside a `page()` scope.
- `fallback(Component)` declares the catch-all for its valid enclosing scope.

Keep each route group's declarations in its `_routes.tsx`. File placement does
not register a route.

## Connect layouts

Keep the layout adjacent to the route group it wraps. A root `_layout.tsx`
owns root providers and the application-wide shell; a nested `_layout.tsx`
owns only its group's shell, navigation context, or access presentation.
Render nested route content with the installed router's `Outlet` contract.

Do not hide registration inside a page component. Pages compose features and
receive typed route inputs; layouts compose the shared frame around them.

## Handle fallbacks

Use a root `fallback(NotFoundPage)` for unmatched application navigation. A
`page()` scope may own its own fallback. Do not treat `fallback()` as a generic
wildcard; use a documented wildcard or named splat path on a normal route when
that is the actual route shape.

For SSG, also register an explicit `/404` route when the generator must emit a
concrete document. The explicit route and navigation fallback may render the
same page but serve different contracts.

## Configure a base path

Set `RouteRegistryOptions.basePath` when the application is mounted below the
origin root. Coordinate it with the bundler asset base and production URL; the
router base alone does not relocate built assets. Use the actual deployment
segment rather than guessing it.
