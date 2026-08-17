# Build an Askr application

Use this guide when creating or changing an application built with Askr. Keep
the application legible: routes, state, data, server boundaries, and cleanup
must have an owner a reader can identify from the code.

## Start with the installed contract

The installed `@askrjs/*` packages are authoritative for exports, props,
types, runtime behavior, and errors. Examples are teaching aids and may lag
behind a published package. When they disagree, follow the installed package
declarations and report the stale example.

Before using a prop, export, or CLI flag, verify it in the installed package.
Existence is not endorsement: read its declaration comments and canonical
documentation too. Do not choose an API marked legacy, deprecated, limited,
or experimental unless the task specifically calls for that status and
accepts its constraints. Do not fill gaps with assumptions from React,
Next.js, Solid, or another framework.

## Structure the application

Keep the route tree visible under `src/pages`:

- `src/pages/_routes.tsx` owns the root route registry and composes route
  groups.
- `src/pages/_layout.tsx` owns root providers and the application-wide shell.
- A nested route group owns its adjacent `_routes.tsx` and `_layout.tsx`.
- Files do not become routes merely because they are under `pages`.

Preserve this composition direction:

```text
pages -> features -> components -> Askr primitives
```

Pages connect routes to features. Features own coherent application
capabilities and their visible states. Components are reusable application UI
with explicit props. Components do not import features, and features do not
import pages.

When a feature uses external or mutable data, preserve this second direction:

```text
features -> queries and mutations -> services -> adapters
```

Queries and mutations call application services; services map raw adapter
results into application models. Do not make reusable components fetch
application data or make pages call transport clients directly.

## Use the building blocks

Import themed application components from `@askrjs/themes/components`.
`Block` is the general-purpose layout primitive. Use `Container` for content
width and page gutters, `Text` for themed copy, and `Grid` for explicit rows
and columns. Compose semantic page structure from published components such as
`Header`, `Main`, `Section`, `PageHeader`, and `Footer`.

Use the exact props and token values accepted by the installed declarations.
For example, use `paddingY`, not an invented `py` shorthand. Use themed
components when the shared theme owns appearance and headless `@askrjs/ui`
primitives when the application must own it.

## Load the composable skill

For an end-to-end application workflow, read
[`/skills/build-askr-app/SKILL.md`](https://askrjs.com/skills/build-askr-app/SKILL.md).
It composes these capability skills:

- [`/skills/project-structures/SKILL.md`](https://askrjs.com/skills/project-structures/SKILL.md)
  for pages, features, components, adapters, queries, mutations, and ownership;
- [`/skills/routes/SKILL.md`](https://askrjs.com/skills/routes/SKILL.md) for
  registries, layouts, URL state, data loading, access, navigation, metadata,
  and fallbacks;
- [`/skills/themes/SKILL.md`](https://askrjs.com/skills/themes/SKILL.md) for
  building blocks, tokens, visual customization, and rendered styles.
- [`/skills/control-flows/SKILL.md`](https://askrjs.com/skills/control-flows/SKILL.md)
  for conditional rendering, keyed collections, row reactivity, and retained
  render order.
- [`/skills/icons/SKILL.md`](https://askrjs.com/skills/icons/SKILL.md) for icon
  and logo selection, imports, accessibility, sizing, and themed composition.
- [`/skills/queries-and-mutations/SKILL.md`](https://askrjs.com/skills/queries-and-mutations/SKILL.md)
  for cache identity, query consistency, writes, invalidation, prefetch, and
  hydration.
- [`/skills/i18n/SKILL.md`](https://askrjs.com/skills/i18n/SKILL.md) for typed
  catalogs, locale ownership, direction, formatting, and hydration.
- [`/skills/charts/SKILL.md`](https://askrjs.com/skills/charts/SKILL.md) for
  typed plot composition, data rules, interaction, accessibility, and export.

Load only the references needed by the task. A five-page marketing SSG, an
authenticated SPA, and a server-rendered application compose these capabilities
differently; they are not separate outcome-specific skills.

## Verify the result

Run the repository-owned format, lint, type, analysis, test, and production
build gates appropriate to the application. Inspect SSR or SSG output before
hydration and exercise the hydrated browser at narrow and desktop widths.
Verify loading, empty, failure, cancellation, retry, and unauthorized states
where they exist. A pushed commit is not proof that a deployment succeeded.

## Canonical references

- [Getting started](https://askrjs.com/docs/getting-started/index.md)
- [Project structure](https://askrjs.com/docs/getting-started/project-structure/index.md)
- [Routing and data](https://askrjs.com/docs/routing/index.md)
- [Server and APIs](https://askrjs.com/docs/server/index.md)
- [UI and components](https://askrjs.com/docs/components/index.md)
- [Layout primitives and exact props](https://askrjs.com/docs/components/application-layout/index.md)
- [Production readiness](https://askrjs.com/docs/guides/production-readiness/index.md)
- [Generated API reference](https://askrjs.com/docs/reference/api/index.md)

Use [llms.txt](https://askrjs.com/llms.txt) for documentation discovery and
[llms-full.txt](https://askrjs.com/llms-full.txt) for the complete generated
documentation corpus.
