import type { Props } from "../../types/props";

export interface DocMeta {
  slug: string;
  title: string;
  summary: string;
  section: string;
  order?: number;
}

export interface DocEntry {
  meta: DocMeta;
  component: (props: Props) => unknown;
}
