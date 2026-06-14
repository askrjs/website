import type { Props } from '../../types/props';
import { SiteFrame } from '../site-shell';

export interface PageShellProps extends Props {
  title: string;
  intro: string;
  heroChildren?: unknown;
  children?: unknown;
}

function toChildArray(children: unknown) {
  if (children === null || children === undefined || children === false) {
    return [];
  }

  return Array.isArray(children) ? children : [children];
}

export function PageShell(props: PageShellProps) {
  const sections = toChildArray(props.children);
  const hero = (
    <section class="hero">
      <h1>{props.title}</h1>
      <p>{props.intro}</p>
      {props.heroChildren}
    </section>
  );

  return (
    <SiteFrame>
      <main class="container app-main">
        {[hero, ...sections]}
      </main>
    </SiteFrame>
  );
}
