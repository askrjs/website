---
name: routes
description: Build, change, debug, or review routing in an Askr application. Use for route registries, nested layouts, paths and parameters, search state, typed destinations, navigation, loaders, deferred data, access policies, route metadata, fallbacks, base paths, SPA, SSR, or SSG route reuse.
---

# Build Askr routes

Declare one explicit route tree and pass the resulting registry to every
renderer that needs it. Do not infer routes from files or maintain separate
SPA, SSR, and SSG route manifests.

## Verify the installed router

Read the installed `@askrjs/askr/router` declarations before selecting helpers
or signatures. Use returned typed route references to construct destinations.
Do not borrow path syntax, file-routing conventions, loader semantics, or
navigation APIs from another framework.

## Select the needed references

- Read [registries-and-layouts.md](references/registries-and-layouts.md) when
  declaring a registry, nested pages, layouts, groups, indexes, fallbacks, or a
  deployment base path.
- Read [navigation-and-url-state.md](references/navigation-and-url-state.md)
  for parameters, search schemas, typed destinations, links, navigation, and
  URL-owned state.
- Read [loaders-access-and-metadata.md](references/loaders-access-and-metadata.md)
  for route data, deferred work, cancellation, authorization policies,
  metadata, SSR, and SSG entries.
- Compose the sibling
  [project structures skill](../project-structures/SKILL.md) for where page,
  feature, and route-group files live.

## Verify route behavior

Exercise direct entry, client navigation, back/forward history, parameters,
search updates, cancellation, loader failure, redirects, denials, nested and
root fallbacks, metadata updates, and the configured base path where those
behaviors exist. For SSR or SSG, prove the same registry produces the expected
server or static route output.
