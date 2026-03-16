import { jsx } from '../runtime/jsx';

import { SiteShell } from './site-shell';
import type { Props } from '../types/props';

export interface DocLayoutProps extends Props {
  title: string;
  intro: string;
  children?: unknown;
}

export function DocLayout(props: DocLayoutProps) {
  return (
    <SiteShell title={props.title} intro={props.intro}>
      <article class="panel">{props.children}</article>
    </SiteShell>
  );
}