import { Button } from '@askrjs/themes/controls';
import { ArrowRightIcon } from '@askrjs/lucide';

import type { Props } from '../types/props';
import { PageSection } from './page-primitives/section';
import { SiteAnchor } from './site-link';

type IconComponent = (props: {
  class?: string;
  className?: string;
  title?: string;
  size?: number | string;
}) => unknown;

export interface BrandMarkProps {
  compact?: boolean;
}

export function BrandMark(props: BrandMarkProps) {
  return (
    <span class={props.compact ? 'brand-mark compact' : 'brand-mark'}>
      <img
        class="brand-mark-symbol"
        src="/assets/askr-logo.png"
        alt=""
        width="40"
        height="40"
      />
      <span class="brand-mark-word">Askr</span>
    </span>
  );
}

export interface IconButtonProps extends Props {
  label: string;
  className?: string;
  onPress?: () => void;
  children?: unknown;
  'aria-expanded'?: string | (() => string);
  'aria-pressed'?: string | (() => string);
}

export function IconButton(props: IconButtonProps) {
  return (
    <Button
      class={`icon-button ${props.className ?? ''}`}
      aria-label={props.label}
      aria-expanded={props['aria-expanded']}
      aria-pressed={props['aria-pressed']}
      title={props.label}
      onPress={props.onPress}
    >
      {props.children}
    </Button>
  );
}

export interface SectionBandProps extends Props {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
  children?: unknown;
}

export function SectionBand(props: SectionBandProps) {
  return (
    <PageSection
      kicker={props.kicker}
      title={props.title}
      description={props.description}
      className={`section-band ${props.className ?? ''}`.trim()}
    >
      {props.children}
    </PageSection>
  );
}

export interface CodeWindowProps {
  label: string;
  code: string;
  meta?: string;
}

export function CodeWindow(props: CodeWindowProps) {
  return (
    <figure class="code-window">
      <figcaption>
        <span>{props.label}</span>
        {props.meta ? <small>{props.meta}</small> : null}
      </figcaption>
      <pre>
        <code>{props.code}</code>
      </pre>
    </figure>
  );
}

export interface ProofItem {
  value: string;
  label: string;
  detail: string;
}

export function ProofStrip(props: { items: ProofItem[] }) {
  return (
    <dl class="proof-strip">
      {props.items.map((item) => (
        <div class="proof-item">
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
          <span>{item.detail}</span>
        </div>
      ))}
    </dl>
  );
}

export interface PathwayItem {
  stage: string;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export function DocsPathway(props: { items: PathwayItem[] }) {
  return (
    <ol class="docs-pathway">
      {props.items.map((item) => (
        <li>
          <span>{item.stage}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <SiteAnchor href={item.href}>
            {item.cta}
            <ArrowRightIcon size={15} />
          </SiteAnchor>
        </li>
      ))}
    </ol>
  );
}

export interface IconFeature {
  icon: IconComponent;
  title: string;
  description: string;
}

export function IconFeatureList(props: { features: IconFeature[] }) {
  return (
    <div class="icon-feature-list">
      {props.features.map((feature) => {
        const Icon = feature.icon;
        return (
          <article>
            <span class="feature-icon" aria-hidden="true">
              <Icon size={20} />
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        );
      })}
    </div>
  );
}

export interface SignalHeroAction {
  href: string;
  label: string;
  detail: string;
}

export interface SignalHeroProps {
  eyebrow: string;
  title: string;
  intro: string;
  primary: SignalHeroAction;
  secondary: SignalHeroAction;
  children?: unknown;
}

export function SignalHero(props: SignalHeroProps) {
  return (
    <section class="signal-hero">
      <div class="signal-hero-copy">
        <span class="section-kicker">{props.eyebrow}</span>
        <h1>{props.title}</h1>
        <p>{props.intro}</p>
        <div class="signal-hero-actions">
          <SiteAnchor href={props.primary.href} className="cta-primary">
            <span>{props.primary.label}</span>
            <small>{props.primary.detail}</small>
          </SiteAnchor>
          <SiteAnchor href={props.secondary.href} className="cta-secondary">
            <span>{props.secondary.label}</span>
            <small>{props.secondary.detail}</small>
          </SiteAnchor>
        </div>
      </div>
      <div class="signal-hero-stage">{props.children}</div>
    </section>
  );
}
