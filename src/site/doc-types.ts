import type { Props } from '../types/props';

export interface DocMeta {
  slug: string;
  title: string;
  summary: string;
}

export interface DocEntry {
  meta: DocMeta;
  component: (props: Props) => unknown;
}