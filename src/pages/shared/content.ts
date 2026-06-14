import type { DocMeta } from './doc-types';
import { docRegistry } from './doc-registry';

export const docsStartPath = '/docs/start';

export interface SiteLink {
  href: string;
  label: string;
  description?: string;
  badge?: string;
  meta?: string;
  cta?: string;
}

export interface SiteNavLink extends SiteLink {
  kind?: 'link';
}

export interface SiteNavGroup {
  kind: 'group';
  label: string;
  links: SiteNavLink[];
}

export type PrimaryNavItem = SiteNavLink | SiteNavGroup;

export interface LinkSection {
  title: string;
  description: string;
  links: SiteLink[];
}

export interface DocsNavItem extends SiteLink {
  slug: string;
  section: string;
  order: number;
  goal?: string;
  outcome?: string;
  prerequisites?: string[];
  next?: string;
  nextLabel?: string;
}

export interface DocsNavSection {
  id: string;
  title: string;
  description: string;
  items: DocsNavItem[];
}

export interface DocsLearningStep {
  href: string;
  label: string;
  description: string;
  stage: string;
  badge: string;
  cta: string;
}

export const primaryNav: PrimaryNavItem[] = [
  {
    kind: 'group',
    label: 'Product',
    links: [
      { href: '/', label: 'Home' },
      { href: '/framework', label: 'Why Askr' },
      { href: '/showcase/askr', label: 'Runtime lens' },
    ],
  },
  {
    kind: 'group',
    label: 'Build',
    links: [
      { href: '/docs/start', label: 'Start here' },
      {
        href: '/docs/getting-started/project-structure',
        label: 'Project structure',
      },
      { href: '/ui', label: 'UI' },
      { href: '/themes', label: 'Themes' },
    ],
  },
  {
    kind: 'group',
    label: 'Reference',
    links: [
      { href: '/docs', label: 'Docs' },
      { href: '/docs/guides/ssg-overview', label: 'Routing & SSG' },
      { href: '/docs/reference/troubleshooting', label: 'Troubleshooting' },
      { href: '/showcase/ui', label: 'Component reference' },
    ],
  },
];

export const headerNav: SiteNavLink[] = [
  { href: '/framework', label: 'Why Askr' },
  { href: '/showcase/askr', label: 'Runtime' },
  { href: '/ui', label: 'UI' },
  { href: '/themes', label: 'Themes' },
  { href: '/docs', label: 'Docs' },
];

export const docsPages: DocMeta[] = docRegistry.map((entry) => entry.meta);

function toSectionId(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-');
}

function groupDocsPages() {
  const groups = new Map<string, DocsNavItem[]>();

  for (const doc of docsPages) {
    const links = groups.get(doc.section) ?? [];
    links.push({
      slug: doc.slug,
      section: doc.section,
      order: doc.order ?? 0,
      href: `/docs/${doc.slug}`,
      label: doc.title,
      description: doc.summary,
      cta: 'Read guide',
      goal: doc.goal,
      outcome: doc.outcome,
      prerequisites: doc.prerequisites,
      next: doc.next,
      nextLabel: doc.nextLabel,
    });
    groups.set(doc.section, links);
  }

  return Array.from(groups, ([title, items]) => ({
    id: toSectionId(title),
    title,
    description: `Focused ${title.toLowerCase()} material for the askr ecosystem.`,
    items: items.sort(
      (a, b) => a.order - b.order || a.label.localeCompare(b.label)
    ),
  }));
}

export const docsNavSections: DocsNavSection[] = groupDocsPages();

export function findDocsNavItemBySlug(slug: string) {
  for (const section of docsNavSections) {
    const item = section.items.find((entry) => entry.slug === slug);
    if (item) return item;
  }

  return null;
}

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
      'Install, scaffold, and land your first route as fast as possible.',
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
          'Choose page, doc, and asset conventions before the first feature lands.',
        badge: 'Step 3',
        meta: 'Architecture',
        cta: 'Open structure',
      },
      {
        href: '/docs/getting-started/development-checklist',
        label: 'Lock local quality',
        description:
          'Create a deterministic checklist for linting, type-checking, and build output checks.',
        badge: 'Step 4',
        meta: 'Quality',
        cta: 'Open checklist',
      },
    ],
  },
  {
    title: 'Core guides',
    description:
      'Use these guides when you are deciding how to render, style, and ship the site.',
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
    title: 'Reference surfaces',
    description:
      'Use these sections when you need concrete runtime, UI, or theme examples.',
    links: [
      {
        href: '/showcase/askr',
        label: 'Runtime Reference',
        badge: 'Reference',
        meta: 'State · routing · rendering',
        cta: 'Open runtime reference',
        description:
          'Reference notes for rendering patterns, runtime behavior, and architecture choices.',
      },
      {
        href: '/showcase/ui',
        label: 'UI Components',
        badge: 'Reference',
        meta: 'Component catalog',
        cta: 'Browse UI reference',
        description:
          'Component pages and usage notes for the available askr-ui primitives.',
      },
      {
        href: '/showcase/themes',
        label: 'Theme Reference',
        badge: 'Reference',
        meta: 'Tokens · light/dark',
        cta: 'Inspect theme reference',
        description:
          'Theme tokens, mode defaults, and styling guidance for consistency.',
      },
    ],
  },
  {
    title: 'Common next steps',
    description:
      'Move from a working page to reliable release and predictable maintenance.',
    links: [
      {
        href: '/docs',
        label: 'Browse the docs index',
        description:
          'Scan the available guides and move directly into the next relevant section.',
        badge: 'Docs',
        meta: 'Overview',
        cta: 'Open docs index',
      },
      {
        href: '/docs/guides/deployment-and-hosting',
        label: 'Deploy with confidence',
        description:
          'Move from local validation to static output and hosting workflows.',
        badge: 'Guide',
        meta: 'Production',
        cta: 'Read deployment',
      },
      {
        href: '/docs/guides/seo-and-metadata',
        label: 'Refine SEO and metadata',
        description:
          'Lock in social cards, route metadata, and predictable crawler behavior before launch.',
        badge: 'Guide',
        meta: 'Quality',
        cta: 'Read SEO guide',
      },
      {
        href: '/docs/reference/migration-guide',
        label: 'Plan migration safely',
        description:
          'Use a controlled migration playbook when you are changing package surface area.',
        badge: 'Reference',
        meta: 'Upgrade',
        cta: 'Read migration guide',
      },
    ],
  },
];

const featuredDocSlugs = [
  'getting-started/installation',
  'getting-started/quick-start',
  'foundations/actor-model',
  'foundations/rendering-strategy',
  'guides/ssg-overview',
  'guides/data-loading',
];

const docsBySlug = new Map(docsPages.map((doc) => [doc.slug, doc]));

export const docsFeatured: SiteLink[] = featuredDocSlugs
  .map((slug) => docsBySlug.get(slug))
  .filter((doc): doc is DocMeta => Boolean(doc))
  .map((doc) => ({
    href: `/docs/${doc.slug}`,
    label: doc.title,
    description: doc.summary,
    badge: doc.section,
    cta: 'Read article',
  }));

export const docsSections: LinkSection[] = docsNavSections.map((section) => ({
  title: section.title,
  description: section.description,
  links: section.items.map((item) => ({
    href: item.href,
    label: item.label,
    description: item.description,
    badge: item.section,
    cta: item.cta,
  })),
}));

export const docsNav: SiteLink[] = docsNavSections.flatMap((section) =>
  section.items.map((item) => ({
    href: item.href,
    label: item.label,
    description: item.description,
    badge: item.section,
    cta: item.cta,
  }))
);

const learningPathBlueprint = [
  { slug: 'getting-started/installation', stage: 'Phase 1', cta: 'Install' },
  {
    slug: 'getting-started/quick-start',
    stage: 'Phase 2',
    cta: 'Ship first page',
  },
  {
    slug: 'foundations/actor-model',
    stage: 'Phase 3',
    cta: 'Review state model',
  },
  {
    slug: 'foundations/rendering-strategy',
    stage: 'Phase 4',
    cta: 'Choose render strategy',
  },
  { slug: 'guides/ssg-overview', stage: 'Phase 5', cta: 'Inspect build model' },
  {
    slug: 'guides/building-pages',
    stage: 'Phase 6',
    cta: 'Scale route authoring',
  },
  {
    slug: 'guides/data-loading',
    stage: 'Phase 7',
    cta: 'Stabilize async data',
  },
  {
    slug: 'guides/styling-with-themes',
    stage: 'Phase 8',
    cta: 'Standardize tokens',
  },
  { slug: 'guides/testing-strategy', stage: 'Phase 9', cta: 'Harden behavior' },
  {
    slug: 'guides/deployment-and-hosting',
    stage: 'Phase 10',
    cta: 'Publish static output',
  },
] as const;

export const docsLearningPath = learningPathBlueprint
  .map((entry): DocsLearningStep | null => {
    const doc = docsBySlug.get(entry.slug);
    if (!doc) return null;

    return {
      href: `/docs/${doc.slug}`,
      label: doc.title,
      description: doc.summary,
      stage: entry.stage,
      badge: doc.section,
      cta: entry.cta,
    };
  })
  .filter((entry): entry is DocsLearningStep => entry !== null);

export const docsStarterLanes: LinkSection = {
  title: 'Starter templates',
  description:
    'Internal pathways for repeating the same architecture with fewer decisions.',
  links: [
    {
      href: '/docs/getting-started/installation',
      label: 'Fresh install lane',
      badge: 'Start',
      meta: 'Minimal setup',
      cta: 'Open install',
      description:
        'Use this when you want the fastest dependency and script boot.',
    },
    {
      href: '/docs/getting-started/quick-start',
      label: 'First page lane',
      badge: 'Start',
      meta: 'Prototype lane',
      cta: 'Build first page',
      description: 'Use this when you need one interactive route quickly.',
    },
    {
      href: '/docs/guides/building-pages',
      label: 'Page-authoring lane',
      badge: 'Build',
      meta: 'Scale lane',
      cta: 'Build pages',
      description:
        'Use this when your app grows beyond a single path and docs surface.',
    },
    {
      href: '/docs/guides/deployment-and-hosting',
      label: 'Release lane',
      badge: 'Production',
      meta: 'Ship lane',
      cta: 'Deploy',
      description:
        'Use this once local proof is stable and review checks are green.',
    },
  ],
};
