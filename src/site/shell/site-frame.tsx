import type { Props } from '../../types/props';
import { SiteFooter } from './footer';
import { SiteHeader } from './header';

export interface SiteFrameProps extends Props {
  children?: unknown;
}

function toChildArray(children: unknown) {
  if (children === null || children === undefined || children === false) {
    return [];
  }

  return Array.isArray(children) ? children : [children];
}

export function SiteFrame(props: SiteFrameProps) {
  const children = toChildArray(props.children);

  return <>{[<SiteHeader />, ...children, <SiteFooter />]}</>;
}
