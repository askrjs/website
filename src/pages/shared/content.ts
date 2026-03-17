import type { DocMeta } from "./doc-types";
import { docRegistry } from "./doc-registry";

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

export interface DocsNavItem extends SiteLink {
  slug: string;
  section: string;
  order: number;
}

export interface DocsNavSection {
  id: string;
  title: string;
  description: string;
  items: DocsNavItem[];
}

export const primaryNav: SiteLink[] = [
  { href: "/docs", label: "Docs" },
  { href: "/docs/getting-started/installation", label: "Get Started" },
  { href: "/docs/guides/ssg-overview", label: "Guides" },
  { href: "/showcase/ui", label: "Reference" },
];

export const docsPages: DocMeta[] = docRegistry.map((entry) => entry.meta);

function toSectionId(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
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
      cta: "Read guide",
    });
    groups.set(doc.section, links);
  }

  return Array.from(groups, ([title, items]) => ({
    id: toSectionId(title),
    title,
    description: `Focused ${title.toLowerCase()} material for the askr ecosystem.`,
    items: items.sort(
      (a, b) => a.order - b.order || a.label.localeCompare(b.label),
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
    href: "/docs/getting-started/installation",
    label: "Install Askr",
    cta: "Start here",
  },
  {
    href: "/docs/getting-started/quick-start",
    label: "Build your first page",
    cta: "Open quick start",
  },
  {
    href: "/docs/guides/ssg-overview",
    label: "Choose a rendering mode",
    cta: "Read guide",
  },
];

export const onboardingTracks: LinkSection[] = [
  {
    title: "Start Here",
    description:
      "Read these first to install the stack, boot the app shell, and validate the first route.",
    links: [
      {
        href: "/docs/getting-started/installation",
        label: "Install the stack",
        description: "Add askr, askr-ui, and askr-themes to your workspace.",
        badge: "Step 1",
        meta: "Setup",
        cta: "Read installation",
      },
      {
        href: "/docs/getting-started/quick-start",
        label: "Build your first page",
        description:
          "Create an initial component, wire state, and render the first usable view.",
        badge: "Step 2",
        meta: "Quick start",
        cta: "Open quick start",
      },
      {
        href: "/docs/guides/building-pages",
        label: "Organize routes and pages",
        description:
          "Move from a first page to a coherent route and page structure.",
        badge: "Step 3",
        meta: "Architecture",
        cta: "Read building pages",
      },
    ],
  },
  {
    title: "Core Guides",
    description:
      "Use these guides when you are deciding how to render, style, and ship the site.",
    links: [
      {
        href: "/docs/guides/ssg-overview",
        label: "Choose a rendering mode",
        description:
          "Understand SPA, SSR, and SSG tradeoffs and how the site is deployed.",
        badge: "Guide",
        meta: "Rendering",
        cta: "Read SSG overview",
      },
      {
        href: "/docs/guides/styling-with-themes",
        label: "Apply the default theme",
        description:
          "Use theme tokens to keep the visual system consistent as the site grows.",
        badge: "Guide",
        meta: "Styling",
        cta: "Read theme guide",
      },
    ],
  },
];

export const referenceBands: LinkSection[] = [
  {
    title: "Reference Surfaces",
    description:
      "Use these supporting sections when you need concrete runtime, UI, or theme examples.",
    links: [
      {
        href: "/showcase/askr",
        label: "Runtime Reference",
        badge: "Reference",
        meta: "State · routing · rendering",
        cta: "Open runtime reference",
        description:
          "Reference notes for rendering patterns, runtime behavior, and architecture choices.",
      },
      {
        href: "/showcase/ui",
        label: "UI Components",
        badge: "Reference",
        meta: "Component catalog",
        cta: "Browse UI reference",
        description:
          "Component pages and usage notes for the available headless UI primitives.",
      },
      {
        href: "/showcase/themes",
        label: "Theme Reference",
        badge: "Reference",
        meta: "Tokens · light/dark",
        cta: "Inspect theme reference",
        description:
          "Theme tokens, mode defaults, and styling guidance for consistent interfaces.",
      },
    ],
  },
  {
    title: "Common Next Steps",
    description:
      "After the first page is running, these are the usual places developers go next.",
    links: [
      {
        href: "/docs",
        label: "Browse the docs index",
        description:
          "Scan the available guides and move directly into the next relevant section.",
        badge: "Docs",
        meta: "Overview",
        cta: "Open docs index",
      },
      {
        href: "/showcase/ui",
        label: "Find a component pattern",
        description:
          "Open the UI reference when you need a concrete primitive or interaction pattern.",
        badge: "Reference",
        meta: "UI",
        cta: "Open UI reference",
      },
      {
        href: "/docs/guides/styling-with-themes",
        label: "Standardize styling",
        description:
          "Move the site onto theme tokens before design drift starts to spread.",
        badge: "Guide",
        meta: "Themes",
        cta: "Read styling guide",
      },
    ],
  },
];

export const docsFeatured: SiteLink[] = docsPages.slice(0, 3).map((doc) => ({
  href: `/docs/${doc.slug}`,
  label: doc.title,
  description: doc.summary,
  badge: doc.section,
  cta: "Read article",
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
  })),
);
