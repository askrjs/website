import type { Props } from '@askrjs/askr';
import { Link } from '@askrjs/askr/router';
import { ArrowLeftIcon, ArrowRightIcon } from '@askrjs/lucide';
import { Button, Container } from '@askrjs/themes/components';
import { marketingPages, type MarketingPath } from './catalog';

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

export function RepositoryLink({ href, children }: Props & { href: string }) {
  return (
    <a class="repository-link" href={href}>
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

export type SequenceItem = {
  /** Optional eyebrow above the title. Mirrors FlowNode.label. */
  label?: string;
  title: string;
  description: string;
  /** Terse trailing line — package names, mode labels, verb pairs. */
  meta?: string;
};

/**
 * An ordered progression: numbered steps read left to right.
 * Use when the items have a sequence. For a fan-out or a convergence,
 * reach for FlowMap instead.
 */
export function SequenceList({
  label,
  items,
}: {
  label: string;
  items: readonly SequenceItem[];
}) {
  return (
    <ol class="sequence" aria-label={label} data-columns={items.length}>
      {items.map((item, index) => (
        <li key={item.title} class="sequence__item">
          <span class="sequence__number">
            {String(index + 1).padStart(2, '0')}
          </span>
          {item.label && <span class="sequence__label">{item.label}</span>}
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {item.meta && <small>{item.meta}</small>}
        </li>
      ))}
    </ol>
  );
}

export type PackageRow = {
  name: string;
  version: string;
  purpose: string;
  /** Other @askrjs packages this one requires, from its peerDependencies. */
  peers: readonly string[];
};

/**
 * The published package set, with what each one requires. Rows come from the
 * generated version map, so the table cannot drift from what is installed.
 */
export function PackageTable({
  label,
  rows,
}: {
  label: string;
  rows: readonly PackageRow[];
}) {
  return (
    <div class="package-table-wrap">
      <table class="package-table">
        <caption class="visually-hidden">{label}</caption>
        <thead>
          <tr>
            <th scope="col">Package</th>
            <th scope="col">What it gives you</th>
            <th scope="col">Requires</th>
            <th scope="col">Version</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <th scope="row">
                <code>@askrjs/{row.name}</code>
              </th>
              <td>{row.purpose}</td>
              <td>
                {row.peers.length === 0 ? (
                  <span class="package-table__standalone">Nothing</span>
                ) : (
                  row.peers.map((peer, index) => (
                    <>
                      {index > 0 && ' '}
                      <code>@askrjs/{peer}</code>
                    </>
                  ))
                )}
              </td>
              <td>
                <span class="package-table__version">{row.version}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type FlowNode = {
  /** Optional eyebrow above the title. */
  label?: string;
  title: string;
  description?: string;
  meta?: string;
};

/**
 * A hub and the nodes it relates to. `fan-out` renders the hub first
 * (one input, several outputs); `converge` renders it last (several
 * inputs meeting at one root).
 */
export function FlowMap({
  label,
  direction,
  hub,
  nodes,
}: {
  label: string;
  direction: 'fan-out' | 'converge';
  hub: FlowNode;
  nodes: readonly FlowNode[];
}) {
  const hubBlock = (
    <div class="flow-map__hub">
      {hub.label && <span>{hub.label}</span>}
      <h3>{hub.title}</h3>
      {hub.description && <p>{hub.description}</p>}
    </div>
  );
  return (
    <div
      class="flow-map"
      role="group"
      aria-label={label}
      data-direction={direction}
    >
      {direction === 'fan-out' && hubBlock}
      <ol class="flow-map__nodes" data-count={nodes.length}>
        {nodes.map((node) => (
          <li key={node.title}>
            {node.label && <span>{node.label}</span>}
            <h3>{node.title}</h3>
            {node.description && <p>{node.description}</p>}
            {node.meta && <small>{node.meta}</small>}
          </li>
        ))}
      </ol>
      {direction === 'converge' && hubBlock}
    </div>
  );
}
