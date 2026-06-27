import type { SiteLink } from '../../../site/navigation';

export interface HomeSection {
  kicker: string;
  title: string;
  description: string;
  links: SiteLink[];
}

export interface LaunchStep {
  phase: string;
  title: string;
  detail: string;
  href: string;
  cta: string;
}

export interface ArchitectureNode {
  title: string;
  claim: string;
  snippet: string;
  href: string;
  cta: string;
}

export interface HomeStat {
  value: string;
  label: string;
}
