import type { Props } from "../../types/props";

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
}

export interface DocEntry {
  meta: DocMeta;
  component: (props: Props) => unknown;
}
