import {
  docsStartPath,
  type LinkSection,
  type SiteLink,
} from '../../lib/site-nav';

export const homeHeroLinks: SiteLink[] = [
  {
    href: docsStartPath,
    label: 'Start here',
    cta: 'One-click onboarding',
  },
  {
    href: '/docs/getting-started/quick-start',
    label: 'Build your first page',
    cta: 'Open quick start',
  },
  {
    href: '/docs/guides/ssg-overview',
    label: 'Choose a rendering mode',
    cta: 'Read SSG guide',
  },
];

export const onboardingTracks: LinkSection[] = [
  {
    title: 'Start here',
    description:
      'Install the packages, create a route, and verify the app boots.',
    links: [
      {
        href: '/docs/getting-started/installation',
        label: 'Install the stack',
        description: 'Add askr, askr-ui, and askr-themes to your workspace.',
        badge: 'Step 1',
        meta: 'Setup',
        cta: 'Read installation',
      },
      {
        href: '/docs/getting-started/quick-start',
        label: 'Build your first page',
        description:
          'Create an initial component, wire state, and render the first usable view.',
        badge: 'Step 2',
        meta: 'Quick start',
        cta: 'Open quick start',
      },
      {
        href: '/docs/getting-started/project-structure',
        label: 'Define a structure',
        description:
          'Choose where pages, docs, features, shared components, and assets live.',
        badge: 'Step 3',
        meta: 'Architecture',
        cta: 'Open structure',
      },
      {
        href: '/docs/getting-started/development-checklist',
        label: 'Lock local checks',
        description:
          'Create a repeatable checklist for linting, type-checking, and build output checks.',
        badge: 'Step 4',
        meta: 'Checks',
        cta: 'Open checklist',
      },
    ],
  },
  {
    title: 'Core guides',
    description:
      'Use these guides when choosing render mode, data loading, and styling.',
    links: [
      {
        href: '/docs/guides/ssg-overview',
        label: 'Choose rendering and SSG model',
        description:
          'Understand SPA, SSR, and SSG tradeoffs and how the site is deployed.',
        badge: 'Guide',
        meta: 'Rendering',
        cta: 'Read SSG overview',
      },
      {
        href: '/docs/guides/data-loading',
        label: 'Load data safely',
        description:
          'Use resource() for cancellation-aware loading and explicit async state control.',
        badge: 'Guide',
        meta: 'Data',
        cta: 'Read data loading',
      },
      {
        href: '/docs/guides/styling-with-themes',
        label: 'Apply the default theme',
        description:
          'Use theme tokens to keep the visual system consistent as the site grows.',
        badge: 'Guide',
        meta: 'Styling',
        cta: 'Read theme guide',
      },
    ],
  },
];

export const referenceBands: LinkSection[] = [
  {
    title: 'Reference pages',
    description:
      'Open these when you need concrete runtime, UI, or theme examples.',
    links: [
      {
        href: '/showcase/askr',
        label: 'Runtime reference',
        badge: 'Reference',
        meta: 'State · routing · rendering',
        cta: 'Open runtime reference',
        description:
          'State, routing, resource(), SSR, and SSG notes for implementation work.',
      },
      {
        href: '/showcase/ui',
        label: 'UI components',
        badge: 'Reference',
        meta: 'Component catalog',
        cta: 'Browse UI reference',
        description:
          'Component pages with behavior notes, demos, and integration checks.',
      },
      {
        href: '/showcase/themes',
        label: 'Theme reference',
        badge: 'Reference',
        meta: 'Tokens · light/dark',
        cta: 'Inspect theme reference',
        description:
          'Token groups, mode defaults, and guidance for styling Askr components.',
      },
    ],
  },
  {
    title: 'Common next steps',
    description:
      'Move from a working page to a reliable release and easier maintenance.',
    links: [
      {
        href: '/docs',
        label: 'Browse the docs index',
        description:
          'Find guides by task: setup, routing, data, styling, testing, or deployment.',
        badge: 'Docs',
        meta: 'Overview',
        cta: 'Open docs index',
      },
      {
        href: '/docs/guides/deployment-and-hosting',
        label: 'Deploy the output',
        description:
          'Move from local validation to static output and hosting workflows.',
        badge: 'Guide',
        meta: 'Deploy',
        cta: 'Read deployment',
      },
      {
        href: '/docs/guides/seo-and-metadata',
        label: 'Refine SEO and metadata',
        description:
          'Set titles, descriptions, canonical paths, and social preview data.',
        badge: 'Guide',
        meta: 'Metadata',
        cta: 'Read SEO guide',
      },
      {
        href: '/docs/reference/migration-guide',
        label: 'Plan migration safely',
        description:
          'Use a controlled migration playbook when package APIs or route patterns change.',
        badge: 'Reference',
        meta: 'Upgrade',
        cta: 'Read migration guide',
      },
    ],
  },
];
