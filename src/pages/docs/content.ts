import { docRegistry } from './registry';
import type { DocMeta } from './types';
import type { LinkSection, SiteLink } from '../../site/navigation';

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

export const docsPages: DocMeta[] = docRegistry.map((entry) => entry.meta);

function toSectionId(value: string) {
  return value.toLowerCase().replace(/\s+/g, '-');
}

const sectionDescriptions: Record<string, string> = {
  'Getting Started':
    'Install the packages, render one route, and set a project structure you can keep using.',
  Foundations:
    'Understand state updates, rendering modes, and route ownership before the site grows.',
  Guides:
    'Apply Askr patterns for pages, data, themes, tests, deployment, and metadata.',
  Reference: 'Troubleshoot releases and plan upgrades without guessing.',
};

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
    description:
      sectionDescriptions[title] ?? `${title} material for the Askr ecosystem.`,
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
    slug: 'getting-started/cli-workflows',
    stage: 'Phase 3',
    cta: 'Use the CLI',
  },
  {
    slug: 'foundations/actor-model',
    stage: 'Phase 4',
    cta: 'Review state model',
  },
  {
    slug: 'foundations/rendering-strategy',
    stage: 'Phase 5',
    cta: 'Choose render strategy',
  },
  { slug: 'guides/ssg-overview', stage: 'Phase 6', cta: 'Inspect build model' },
  {
    slug: 'guides/building-pages',
    stage: 'Phase 7',
    cta: 'Scale route authoring',
  },
  {
    slug: 'guides/data-loading',
    stage: 'Phase 8',
    cta: 'Stabilize async data',
  },
  {
    slug: 'guides/styling-with-themes',
    stage: 'Phase 9',
    cta: 'Standardize tokens',
  },
  {
    slug: 'guides/testing-strategy',
    stage: 'Phase 10',
    cta: 'Harden behavior',
  },
  {
    slug: 'guides/deployment-and-hosting',
    stage: 'Phase 11',
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
  title: 'Starter lanes',
  description:
    'Short paths for common starts, from a fresh install to a deployable build.',
  links: [
    {
      href: '/docs/getting-started/installation',
      label: 'Fresh install lane',
      badge: 'Start',
      meta: 'Minimal setup',
      cta: 'Open install',
      description:
        'Use this when you need the dependency and script baseline first.',
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
        'Use this when your app grows beyond one route or docs section.',
    },
    {
      href: '/docs/guides/deployment-and-hosting',
      label: 'Release lane',
      badge: 'Production',
      meta: 'Ship lane',
      cta: 'Deploy',
      description:
        'Use this once local checks pass and static output is ready.',
    },
  ],
};
