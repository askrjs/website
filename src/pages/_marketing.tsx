import type { Props } from '@askrjs/askr';
import { Link } from '@askrjs/askr/router';
import { ArrowLeftIcon, ArrowRightIcon } from '@askrjs/lucide';
import { Button, Container } from '@askrjs/themes/components';
import { GitHubMark } from './_layout';
import {
  marketingPage,
  marketingPages,
  type MarketingPath,
} from './_marketing-catalog';

type HeroProps = {
  title: string;
  lede: string;
};

export function EditorialHero({ title, lede }: HeroProps) {
  return (
    <section class="editorial-hero" aria-labelledby="editorial-title">
      <Container size="xl">
        <h1 id="editorial-title">{title}</h1>
        <p class="editorial-hero__lede">{lede}</p>
      </Container>
    </section>
  );
}

export function RuledSection({
  children,
  stacked = false,
}: Props & { stacked?: boolean }) {
  return (
    <section class="editorial-section">
      <Container
        class={`editorial-section__inner${stacked ? ' editorial-section__inner--stacked' : ''}`}
        size="xl"
      >
        {children}
      </Container>
    </section>
  );
}

export function CapabilityLedger({ children }: Props) {
  return <div class="editorial-ledger">{children}</div>;
}

export function LedgerItem({ title, children }: Props & { title: string }) {
  return (
    <article class="editorial-ledger__item">
      <h3>{title}</h3>
      <div>{children}</div>
    </article>
  );
}

export function Vocabulary({ children }: Props) {
  return <div class="editorial-vocabulary">{children}</div>;
}

export function RepositoryLink({ href, children }: Props & { href: string }) {
  return (
    <a class="repository-link" href={href}>
      <GitHubMark />
      <span>{children}</span>
      <ArrowRightIcon size={16} aria-hidden="true" />
    </a>
  );
}

type CTAProps = {
  title: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function EditorialCTA({
  title,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CTAProps) {
  return (
    <section class="editorial-cta">
      <Container class="editorial-cta__inner" size="xl">
        <h2>{title}</h2>
        <div class="editorial-cta__actions">
          <Button asChild>
            <Link href={primaryHref}>
              {primaryLabel}
              <ArrowRightIcon size={18} aria-hidden="true" />
            </Link>
          </Button>
          {secondaryHref && secondaryLabel ? (
            <Button asChild variant="outline">
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

export function MarketingPageNavigation({
  current,
}: {
  current: MarketingPath;
}) {
  const index = marketingPages.findIndex((page) => page.path === current);
  const previous = index > 0 ? marketingPages[index - 1] : undefined;
  const next =
    index < marketingPages.length - 1 ? marketingPages[index + 1] : undefined;
  if (index < 0) throw new Error(`Unknown marketing route: ${current}`);

  return (
    <nav class="page-navigation" aria-label="Marketing pages">
      <Container class="page-navigation__inner" size="xl">
        {previous ? (
          <Link class="page-navigation__link" href={previous.path}>
            <ArrowLeftIcon size={16} aria-hidden="true" />
            <span>
              <small>Previous</small>
              {previous.label}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            class="page-navigation__link page-navigation__link--next"
            href={next.path}
          >
            <span>
              <small>Next</small>
              {next.label}
            </span>
            <ArrowRightIcon size={16} aria-hidden="true" />
          </Link>
        ) : (
          <span />
        )}
      </Container>
    </nav>
  );
}

export function PageIntro({ path }: { path: MarketingPath }) {
  const page = marketingPage(path);
  return <p class="editorial-section__intro">{page.homepageSummary}</p>;
}
