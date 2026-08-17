---
name: build-askr-app
description: Build, change, or review an Askr application using explicit pages, features, components, data boundaries, rendering modes, and deployment paths. Use for Askr SPAs, SSR applications, SSG sites, full-stack applications, and API-backed features.
---

# Build an Askr app

Build the smallest application mode that owns the requested behavior while
keeping every route, state transition, external boundary, and cleanup owner
visible.

## Establish the contract

1. Inspect the existing application before scaffolding or restructuring it.
2. Read its `package.json`, route registry, build configuration, and installed
   `@askrjs/*` declarations.
3. Treat installed package declarations as authoritative. Verify exports,
   props, token values, CLI flags, and declaration status rather than inferring
   them from examples or another framework. An exported compatibility alias is
   not a recommendation for new code. Avoid legacy and deprecated APIs; use
   limited or experimental APIs only when their documented constraints fit the
   request. For example,
   `grep -n "<name>" node_modules/@askrjs/<package>/dist/*.d.ts` before relying
   on a prop or export named in this skill's references.
4. Identify the requested routes, rendering mode, external systems, mutable
   actions, deployment target, and completion evidence.
5. Do not invent production URLs, repository names, contact destinations,
   analytics identifiers, pricing, customer claims, or credentials.

## Select the needed references

Compose only the skills and references that apply:

- Read the sibling [project structures skill](../project-structures/SKILL.md)
  when placing pages, features, components, adapters, queries, mutations, or
  server code.
- Read the sibling [routes skill](../routes/SKILL.md) when declaring routes,
  layouts, URL state, loaders, access, navigation, metadata, or fallbacks.
- Read the sibling [themes skill](../themes/SKILL.md) when selecting a theme,
  composing themed UI, customizing tokens, or integrating theme styles with
  SSR or SSG.
- Read the sibling [control flows skill](../control-flows/SKILL.md) when
  rendering conditional branches, keyed collections, or reactive row state.
- Read the sibling [icons skill](../icons/SKILL.md) when selecting icons or
  logos, composing icon-only controls, or aligning custom SVGs with the shared
  icon contract.
- Read the sibling
  [queries and mutations skill](../queries-and-mutations/SKILL.md) when a
  feature owns cached async data, writes, invalidation, consistency, or server
  query hydration.
- Read the sibling [i18n skill](../i18n/SKILL.md) when the application owns
  multiple locales, translated catalogs, direction, or locale hydration.
- Read the sibling [charts skill](../charts/SKILL.md) when a feature needs
  typed plots, interaction, live visualization, or plot export.
- Read [static-delivery.md](references/static-delivery.md) when generating an
  SSG, configuring a base path, or deploying static output to GitHub Pages.

These skills compose. A marketing SSG normally needs project structures,
routes, themes, and static delivery. A small static feature does not need data
boundaries merely because a larger application might.

## Implement in ownership order

1. Register the route tree and its layouts.
2. Make each page compose its route-facing features.
3. Make features compose application components and own their visible states.
4. Add services, adapters, queries, and mutations only for real external or
   mutable data, preserving their documented dependency direction.
5. Compose published Askr primitives using their installed contracts.
6. Configure the selected rendering and delivery path without adding a second
   route manifest or build pipeline.

## Verify the application

Run the repository-owned format, lint, type, analysis, test, and production
build gates appropriate to the change. Then inspect the actual output:

- exercise valid, empty, loading, failure, cancellation, retry, and access
  states that exist;
- verify keyboard navigation, focus, accessible names, landmarks, headings,
  responsive layout, hydration, and the browser console;
- inspect SSR or SSG HTML before hydration;
- for a deployment, verify the live routes, assets, metadata, fallback, and
  deployment status rather than treating a local build or push as proof.
