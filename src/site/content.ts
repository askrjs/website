import type { DocMeta } from './doc-types';
import { docRegistry } from './doc-registry';

export interface SiteLink {
  href: string;
  label: string;
  description?: string;
  badge?: string;
  meta?: string;
  cta?: string;
}

export interface LinkSection {
  title: string;
  description: string;
  links: SiteLink[];
}

export const primaryNav: SiteLink[] = [
  { href: '/', label: 'Home' },
  { href: '/showcase/askr', label: 'Askr' },
  { href: '/showcase/ui', label: 'Askr UI' },
  { href: '/showcase/themes', label: 'Askr Themes' },
  { href: '/docs', label: 'Docs' },
];

export const homeCards: SiteLink[] = [
  {
    href: '/showcase/askr',
    label: 'Framework Showcase',
    badge: 'Core Runtime',
    meta: 'SSR • SSG • deterministic updates',
    cta: 'View runtime patterns',
    description:
      'Runtime guarantees, deterministic rendering, SSR and SSG patterns.',
  },
  {
    href: '/showcase/ui',
    label: 'UI Showcase',
    badge: 'Headless Components',
    meta: 'Accessibility-first primitives',
    cta: 'Browse components',
    description: 'Component catalog and accessibility-first usage patterns.',
  },
  {
    href: '/showcase/themes',
    label: 'Themes Showcase',
    badge: 'Default Theme',
    meta: 'Tokens • light/dark • overrides',
    cta: 'Inspect tokens',
    description: 'Tokens, palettes, and theme extension strategies.',
  },
  {
    href: '/docs',
    label: 'Documentation',
    badge: 'Learning Path',
    meta: 'Install • build • deploy',
    cta: 'Open docs hub',
    description: 'Website-owned docs for learning and implementing askr.',
  },
];

export const docsPages: DocMeta[] = docRegistry.map((entry) => entry.meta);

function sectionTitleFromSlug(slug: string) {
  const segment = slug.split('/')[0] ?? 'guides';
  const labels: Record<string, string> = {
    'getting-started': 'Getting Started',
    guides: 'Guides',
    reference: 'Reference',
    advanced: 'Advanced',
  };
  return labels[segment] ?? segment.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
}

function groupDocsPages() {
  const groups = new Map<string, SiteLink[]>();

  for (const doc of docsPages) {
    const title = sectionTitleFromSlug(doc.slug);
    const links = groups.get(title) ?? [];
    links.push({
      href: `/docs/${doc.slug}`,
      label: doc.title,
      description: doc.summary,
      cta: 'Read guide',
    });
    groups.set(title, links);
  }

  return Array.from(groups, ([title, links]) => ({
    title,
    description: `Focused ${title.toLowerCase()} material for the askr ecosystem.`,
    links,
  }));
}

export const homeHeroLinks: SiteLink[] = [
  { href: '/docs/getting-started/installation', label: 'Install', cta: 'Get started' },
  { href: '/showcase/ui', label: 'Component Catalog', cta: 'Browse UI' },
  { href: '/showcase/themes', label: 'Theme Tokens', cta: 'Explore tokens' },
];

export const homeTracks: SiteLink[] = [
  {
    href: '/docs/getting-started/quick-start',
    label: 'Start a new app',
    description: 'Bootstrap the repo shape, build flow, and first route.',
    badge: 'Getting Started',
    meta: 'Fastest path',
    cta: 'Open quick start',
  },
  {
    href: '/docs/guides/ssg-overview',
    label: 'Ship static output',
    description: 'Understand route generation, static HTML output, and deployment shape.',
    badge: 'Deployment',
    meta: 'SSG workflow',
    cta: 'Read SSG guide',
  },
  {
    href: '/docs/guides/styling-with-themes',
    label: 'Adopt the default theme',
    description: 'Use askr-themes tokens and extend them without fragmenting the design system.',
    badge: 'Design System',
    meta: 'Light + dark',
    cta: 'Read styling guide',
  },
];

export const ecosystemBands: LinkSection[] = [
  {
    title: 'Build Paths',
    description: 'Pick the surface you are working on and move directly into the relevant material.',
    links: homeCards,
  },
  {
    title: 'Start Here',
    description: 'These are the shortest paths to getting something real on screen.',
    links: homeTracks,
  },
];

export const docsFeatured: SiteLink[] = docsPages.slice(0, 3).map((doc) => ({
  href: `/docs/${doc.slug}`,
  label: doc.title,
  description: doc.summary,
  badge: sectionTitleFromSlug(doc.slug),
  cta: 'Read article',
}));

export const docsSections: LinkSection[] = groupDocsPages();

export const docsNav: SiteLink[] = docsPages.map((doc) => ({
  href: `/docs/${doc.slug}`,
  label: doc.title,
  description: doc.summary,
  badge: sectionTitleFromSlug(doc.slug),
  cta: 'Read article',
}));
