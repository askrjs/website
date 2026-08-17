---
name: project-structures
description: Structure or review an Askr project using explicit ownership and dependency direction. Use when placing pages, layouts, features, components, adapters, queries, mutations, browser entry points, server code, or deciding when a small application should introduce another layer.
---

# Structure an Askr project

Make the codebase explain who owns each route, capability, external boundary,
state transition, and cleanup path without relying on inferred file magic.

## Preserve dependency direction

```text
pages -> features -> components -> Askr primitives
```

Pages connect routes to features. Features own coherent product capabilities
and visible states. Components are reusable application UI with explicit
props. Components do not import features, and features do not import pages.

For external or mutable data:

```text
features -> queries and mutations -> services -> adapters
```

Queries and mutations call application services. Services map transport data
into application models. Adapters remain raw boundaries to generated clients,
`fetch`, storage, SDKs, or other systems. Reusable components do not fetch
application data, and pages do not call transport clients directly.

## Select the needed references

- Read [application-structure.md](references/application-structure.md) when
  placing pages, layouts, features, components, entries, or server code.
- Read [data-boundaries.md](references/data-boundaries.md) when a feature reads
  external data or needs a service and adapter boundary.
- Compose the sibling
  [queries and mutations skill](../queries-and-mutations/SKILL.md) for query
  definitions, cache identity, consistency, invalidation, mutations, and
  server hydration.
- Compose the sibling [routes skill](../routes/SKILL.md) for the contents of
  `_routes.tsx`, `_layout.tsx`, route inputs, loaders, and access.
- Compose the sibling [themes skill](../themes/SKILL.md) for the primitive and
  visual layers below application components.
- Compose the sibling [control flows skill](../control-flows/SKILL.md) for
  conditional branches, keyed collections, and retained render boundaries.

## Keep structure proportional

The directory model is a responsibility map, not a folder quota. Do not add an
adapter, query, mutation, nested route group, or server layer until a real
boundary needs it. Once a boundary exists, name and locate its owner explicitly
rather than collapsing responsibilities into a page or generic utility file.
