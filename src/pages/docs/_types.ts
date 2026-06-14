import type { RouteHandler } from '@askrjs/askr/router';

export interface TocEntry {
  id: string;
  label: string;
}

export interface DocMeta {
  slug: string;
  title: string;
  summary: string;
  section: string;
  order?: number;
  toc?: TocEntry[];
  goal?: string;
  outcome?: string;
  prerequisites?: string[];
  next?: string;
  nextLabel?: string;
}

export interface DocEntry {
  meta: DocMeta;
  component: RouteHandler;
}
