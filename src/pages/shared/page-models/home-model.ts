import { homeHeroLinks, onboardingTracks, referenceBands } from '../content';

export function createHomeModel() {
  return {
    title: 'Build with Askr, with the runtime in view.',
    intro:
      'Askr is a fine-grained reactive framework for static sites, app surfaces, and docs where the route table, state graph, and generated output stay inspectable.',
    heroActions: homeHeroLinks,
    launchPath: [
      {
        phase: 'Start',
        title: 'Install the stack',
        detail:
          'Bring runtime, UI components, and themes into one workspace dependency set.',
        href: '/docs/getting-started/installation',
        cta: 'Install',
      },
      {
        phase: 'Build',
        title: 'Create first route',
        detail:
          'Render a page with fine-grained state updates and verify interaction behavior.',
        href: '/docs/getting-started/quick-start',
        cta: 'Quick start',
      },
      {
        phase: 'Scale',
        title: 'Set structure',
        detail:
          'Lock your route, doc, and asset conventions before adding more pages.',
        href: '/docs/getting-started/project-structure',
        cta: 'Set structure',
      },
      {
        phase: 'Ship',
        title: 'Go live',
        detail: 'Run deployment and SEO checks before you publish.',
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
        title: 'Routing model',
        claim:
          'A single registry can drive SPA, SSR, and SSG output without duplicate route definitions.',
        snippet: `import { route, Router } from "@askrjs/askr/router";`,
        cta: 'Read routing and SSG',
        href: '/docs/guides/ssg-overview',
      },
      {
        title: 'Visual system',
        claim:
          'Token contracts keep style updates central and prevent component-level visual drift.',
        snippet: `.hero-shell {\n  background: var(--ak-color-surface);\n  color: var(--ak-color-fg);\n}`,
        cta: 'Read themes',
        href: '/docs/guides/styling-with-themes',
      },
    ],
    ecosystemCards: [
      {
        title: 'askr',
        description:
          'Core runtime - state(), derive(), resource(), routing, SSR, and SSG with actor-backed reactivity.',
        badge: 'Runtime',
        href: '/showcase/askr',
      },
      {
        title: 'askr-ui',
        description:
          '36+ headless components — Button, Tabs, Accordion, Dialog, Select, and more. Full keyboard and ARIA support out of the box.',
        badge: 'Components',
        href: '/showcase/ui',
      },
      {
        title: 'askr-themes',
        description:
          'CSS-only theming via data-slot selectors and --ak-* design tokens. Light/dark mode, multiple themes, zero JS.',
        badge: 'Styling',
        href: '/showcase/themes',
      },
    ],
    stats: [
      { value: '36+', label: 'UI components' },
      { value: '4', label: 'CSS themes' },
      { value: '0', label: 'Dependencies' },
      { value: 'small', label: 'Core runtime' },
    ],
    featureSection: {
      kicker: 'Onboarding',
      title: 'Start with the shortest path to a working app',
      description:
        'Begin with installation, move into quick start, then use the rendering and styling guides once the first route is on screen.',
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
