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
      'Start with the runtime and add packages as you need them.',
    title: 'Platform | Askr',
    description:
      'See how Askr packages cover routes, UI, server work, rendering, and production tooling.',
  },
  {
    path: '/application-model',
    label: 'Application model',
    homepageSummary:
      'Keep state and async work with the component or route that owns it.',
    title: 'Application model | Askr',
    description:
      'Learn how Askr handles state, typed routes, lifecycle-bound resources, cancellation, and query invalidation.',
  },
  {
    path: '/rendering',
    label: 'Rendering',
    homepageSummary:
      'Reuse route definitions for browser, server, or static rendering.',
    title: 'Rendering | Askr',
    description:
      'Use one route registry for client rendering, server rendering with hydration, or static generation.',
  },
  {
    path: '/full-stack',
    label: 'Full stack',
    homepageSummary:
      'Add page actions, HTTP APIs, schemas, and access policies.',
    title: 'Full stack | Askr',
    description:
      'Build page actions and HTTP APIs with request validation, OpenAPI output, and route access policies.',
  },
  {
    path: '/themes',
    label: 'Themes',
    homepageSummary:
      'Change component styles without rewriting their interaction behavior.',
    title: 'Themes | Askr',
    description:
      'Use headless interaction components with Askr themes, plus optional icons, logos, charts, and editor tools.',
  },
  {
    path: '/tooling',
    label: 'Tooling',
    homepageSummary:
      'Scaffold apps, generate files, and check OpenAPI contracts.',
    title: 'Tooling | Askr',
    description:
      'Use the Askr CLI to create apps, generate pages and actions, check OpenAPI changes, and review dependency updates.',
  },
  {
    path: '/production',
    label: 'Production',
    homepageSummary:
      'Build static files or run request-time code with the Node adapter.',
    title: 'Production | Askr',
    description:
      'Choose static output or a Node server, then configure probes, localization, and OpenTelemetry for your application.',
  },
] as const satisfies readonly MarketingPageDefinition[];

export type MarketingPath = (typeof marketingPages)[number]['path'];

export function marketingPage(path: MarketingPath) {
  const page = marketingPages.find((candidate) => candidate.path === path);
  if (!page) throw new Error(`Unknown marketing route: ${path}`);
  return page;
}
