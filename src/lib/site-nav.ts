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
      { href: docsStartPath, label: 'Start here' },
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
