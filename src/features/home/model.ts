import { homeHeroLinks, onboardingTracks, referenceBands } from './content';

export function createHomeModel() {
  return {
    title: 'Build Askr apps with routes you can reuse.',
    intro:
      'Askr is a fine-grained reactive framework for apps, docs, and static sites. Define pages once, boot them as SPA or SSR, and generate static output from the same route table.',
    heroActions: homeHeroLinks,
    launchPath: [
      {
        phase: 'Start',
        title: 'Install the stack',
        detail:
          'Install the runtime, UI components, themes, icons, and logos together.',
        href: '/docs/getting-started/installation',
        cta: 'Install',
      },
      {
        phase: 'Build',
        title: 'Create first route',
        detail:
          'Create a route, render a component, and wire a state update.',
        href: '/docs/getting-started/quick-start',
        cta: 'Quick start',
      },
      {
        phase: 'Scale',
        title: 'Set structure',
        detail:
          'Choose folders for pages, docs, features, shared components, and static assets.',
        href: '/docs/getting-started/project-structure',
        cta: 'Set structure',
      },
      {
        phase: 'Ship',
        title: 'Go live',
        detail: 'Build static output, verify metadata, and preview direct route loads.',
        href: '/docs/guides/deployment-and-hosting',
        cta: 'Prepare deploy',
      },
    ],
    architecturePass: [
      {
        title: 'Reactive core',
        claim:
          'state()/derive() updates only the nodes that need to rerender, so app shape stays stable.',
        snippet: `import { state, derive } from "@askrjs/askr";\n\nconst [count, setCount] = state(0);\nconst doubled = derive(() => count() * 2);`,
        cta: 'Read actor model',
        href: '/docs/foundations/actor-model',
      },
      {
        title: 'Shared routes',
        claim:
          'A single registry can drive SPA, SSR, and SSG output without duplicate route definitions.',
        snippet: `import { route, Router } from "@askrjs/askr/router";`,
        cta: 'Read routing and SSG',
        href: '/docs/guides/ssg-overview',
      },
      {
        title: 'Theme tokens',
        claim:
          'Theme variables keep colors, spacing, radius, and component states in one place.',
        snippet: `.hero-shell {\n  background: var(--ak-color-surface);\n  color: var(--ak-color-fg);\n}`,
        cta: 'Read themes',
        href: '/docs/guides/styling-with-themes',
      },
    ],
    ecosystemCards: [
      {
        title: 'askr',
        description:
          'Core runtime for state(), derive(), resource(), routing, SSR, and SSG.',
        badge: 'Runtime',
        href: '/showcase/askr',
      },
      {
        title: 'askr-ui',
        description:
          'Headless controls and overlay primitives with keyboard and ARIA behavior built in.',
        badge: 'Components',
        href: '/showcase/ui',
      },
      {
        title: 'askr-themes',
        description:
          'Theme tokens, light/dark defaults, data-slot selectors, and low-specificity CSS hooks.',
        badge: 'Styling',
        href: '/showcase/themes',
      },
    ],
    stats: [
      { value: '36+', label: 'UI components' },
      { value: '4', label: 'CSS themes' },
      { value: '0', label: 'Runtime dependencies' },
      { value: 'small', label: 'Core runtime' },
    ],
    featureSection: {
      kicker: 'Onboarding',
      title: 'Start with the shortest path to a working app',
      description:
        'Install the packages, render one route, then add rendering, data, and styling decisions as the site grows.',
    },
    sections: [...onboardingTracks, ...referenceBands].map((section) => ({
      kicker: section.title.toLowerCase().includes('reference')
        ? 'Reference'
        : 'Read next',
      title: section.title,
      description: section.description,
      links: section.links,
    })),
  };
}
