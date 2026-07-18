export type MarketingPageDefinition = {
  path: `/${string}`;
  label: string;
  homepageSummary: string;
  title: string;
  description: string;
};

export const marketingPages = [
  {
    path: '/platform',
    label: 'Platform',
    homepageSummary:
      'Build from a component to production without changing the application model.',
    title: 'Platform — Askr',
    description:
      'See how Askr composes runtime, routes, UI, server capabilities, rendering, and production output without hiding application ownership.',
  },
  {
    path: '/application-model',
    label: 'Application model',
    homepageSummary:
      'Explicit state, visible routes, scoped resources, and lifecycle-aware data.',
    title: 'Application model — Askr',
    description:
      'Explore Askr’s explicit model for state, typed routes, lifecycle-aware resources, queries, cancellation, and invalidation.',
  },
  {
    path: '/rendering',
    label: 'Rendering',
    homepageSummary:
      'Choose browser rendering, server rendering, or static generation from one route model.',
    title: 'Rendering — Askr',
    description:
      'Choose SPA, server rendering with hydration, or static generation without changing how an Askr application is written.',
  },
  {
    path: '/full-stack',
    label: 'Full stack',
    homepageSummary:
      'Compose pages, APIs, actions, schemas, and auth policies at one visible root.',
    title: 'Full stack — Askr',
    description:
      'Compose pages, native-first actions, validated APIs, OpenAPI contracts, auth policies, and explicit dependencies with Askr.',
  },
  {
    path: '/themes',
    label: 'Themes',
    homepageSummary:
      'Layer replaceable themes and tokens over headless components.',
    title: 'Themes — Askr',
    description:
      'See how Askr headless components connect to replaceable themes, design tokens, icons, logos, charts, and editor integrations.',
  },
  {
    path: '/tooling',
    label: 'Tooling',
    homepageSummary:
      'Readable starters, verifiable commands, guarded updates, and local skills.',
    title: 'Tooling — Askr',
    description:
      'Use readable Askr starters, Vite Plus, generators, static output, OpenAPI drift checks, guarded updates, and project-local agent skills.',
  },
  {
    path: '/production',
    label: 'Production',
    homepageSummary:
      'Ship static or Node artifacts behind clear operational boundaries.',
    title: 'Production — Askr',
    description:
      'Ship static or Node output with explicit document, middleware, probe, auth, localization, redaction, and telemetry boundaries.',
  },
] as const satisfies readonly MarketingPageDefinition[];

export type MarketingPath = (typeof marketingPages)[number]['path'];

export function marketingPage(path: MarketingPath) {
  const page = marketingPages.find((candidate) => candidate.path === path);
  if (!page) throw new Error(`Unknown marketing route: ${path}`);
  return page;
}
