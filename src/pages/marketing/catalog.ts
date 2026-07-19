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
    homepageSummary: 'What you get on day one, and what you can bolt on later.',
    title: 'Platform | Askr',
    description:
      'A tour of what ships in Askr — runtime, routing, UI, server, rendering, and production tooling — and how they fit together.',
  },
  {
    path: '/application-model',
    label: 'Application model',
    homepageSummary:
      'How state, routes, and async work are owned and cleaned up.',
    title: 'Application model | Askr',
    description:
      'How Askr models state, typed routes, and lifecycle-bound resources — including how queries cancel and invalidate.',
  },
  {
    path: '/rendering',
    label: 'Rendering',
    homepageSummary:
      'SPA, server-rendered, or static — pick per deployment, not per rewrite.',
    title: 'Rendering | Askr',
    description:
      'Ship the same route tree as a client-rendered SPA, a hydrated server-rendered app, or a statically generated site.',
  },
  {
    path: '/full-stack',
    label: 'Full stack',
    homepageSummary:
      'Forms, APIs, and auth policies wired to the same route tree.',
    title: 'Full stack | Askr',
    description:
      'Add page actions, validated HTTP APIs, OpenAPI generation, and auth policies without a second server framework.',
  },
  {
    path: '/themes',
    label: 'Themes',
    homepageSummary:
      'Accessible components you can restyle without touching behavior.',
    title: 'Themes | Askr',
    description:
      'Headless, accessible components with a themeable layer on top — plus icons, logos, charts, and editor integration.',
  },
  {
    path: '/tooling',
    label: 'Tooling',
    homepageSummary:
      'A CLI for scaffolding, generating, and checking your app.',
    title: 'Tooling | Askr',
    description:
      'Scaffold with the Askr CLI, generate pages and actions, catch OpenAPI drift, and manage dependency updates.',
  },
  {
    path: '/production',
    label: 'Production',
    homepageSummary:
      'What actually ships: static files or a Node process, and how to run either.',
    title: 'Production | Askr',
    description:
      'Deploy static output or a Node adapter, with health probes, middleware, localization, and telemetry you configure yourself.',
  },
] as const satisfies readonly MarketingPageDefinition[];

export type MarketingPath = (typeof marketingPages)[number]['path'];

export function marketingPage(path: MarketingPath) {
  const page = marketingPages.find((candidate) => candidate.path === path);
  if (!page) throw new Error(`Unknown marketing route: ${path}`);
  return page;
}
