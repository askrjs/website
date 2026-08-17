# Application structure

## Contents

- Choose an application mode
- Use the responsibility map
- Keep pages thin
- Own state and cleanup

## Choose an application mode

- SPA for browser-owned routing and rendering.
- SSR when the server must render the initial route.
- SSG when routes can become static files at build time.
- API when the project owns HTTP contracts without browser UI.
- Full stack when browser routes and server APIs belong to one application.

Choose the smallest mode that owns the requested behavior.

## Use the responsibility map

```text
src/
  pages/
    _routes.tsx
    _layout.tsx
    not-found.tsx
    public/
      _routes.tsx
      _layout.tsx
      home.tsx
    app/
      _routes.tsx
      _layout.tsx
      dashboard.tsx
  features/
    projects/
      project-list.tsx
      queries.ts
      mutations.ts
  services/
    projects-service.ts
  adapters/
    projects-client.ts
  components/
    project-card.tsx
  main.tsx
  server.ts
```

Keep a small application smaller. Retain `pages/_routes.tsx` and
`pages/_layout.tsx` as the readable root of a browser application's route tree.
Add a nested page group only when it needs its own route prefix, layout, access
boundary, or navigation context.

The browser entry owns mounting or hydration. A server entry owns server
composition. Neither should become a dumping ground for feature behavior.

## Keep pages thin

A page owns route-facing inputs, metadata, access, and composition. It normally
delegates product behavior and visible states to a feature:

```tsx
import { PricingFeature } from '../../features/pricing/pricing';

export default function PricingPage() {
  return <PricingFeature />;
}
```

A feature may be a small static composition. A dynamic feature also owns its
loading, empty, failure, refresh, cancellation, and success states. An
application component accepts explicit props and remains reusable without
knowing which page or feature rendered it.

## Own state and cleanup

Create state in the component that owns the interaction. Derive display values
instead of copying them into another cell. Compose the sibling
[control flows skill](../../control-flows/SKILL.md) when rendering branches or
collections rather than importing another framework's lifecycle model.

Start browser-only work in the documented lifecycle boundary, not during
render. Keep cancellation and cleanup beside the timer, subscription, request,
observer, or external resource that created it. Preserve actionable Askr error
categories instead of swallowing them into a generic failure.
