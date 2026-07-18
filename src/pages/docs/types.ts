import type { Props } from '@askrjs/askr';

export type DocsStatus = 'stable' | 'experimental' | 'limited';

export type PackageReference = {
  name: `@askrjs/${string}`;
  version: string;
  importPath?: string;
};

export type DocsHeadingDefinition = {
  id: string;
  title: string;
  body: string;
  code?: string;
};

export type ComponentDemoDefinition = {
  title: string;
  description: string;
  load: () => Promise<{ default: (props: Props) => any }>;
};

export type DocsPageDefinition = {
  route: `/docs${string}`;
  title: string;
  description: string;
  navGroup: string;
  navSection?: string;
  status: DocsStatus;
  packages: readonly PackageReference[];
  headings: readonly DocsHeadingDefinition[];
  keywords: readonly string[];
  aliases?: readonly string[];
  previous?: `/docs${string}`;
  next?: `/docs${string}`;
  loader: () => Promise<{ default: (...args: any[]) => any }>;
};

export type DocsSectionDefinition = {
  id: string;
  label: string;
  landingRoute: `/docs${string}`;
  pages: readonly DocsPageDefinition[];
};

export type DocsSearchRecord = {
  route: `/docs${string}`;
  anchor?: string;
  title: string;
  description: string;
  group: string;
  terms: readonly string[];
};
