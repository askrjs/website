import { Link } from '@askrjs/askr/router';
import { Inline, Stack } from '@askrjs/themes/components';

export interface HeroChipLink {
  href: string;
  label: string;
}

export function HeroChipRow(props: { links: HeroChipLink[] }) {
  return (
    <Inline class="hero-chip-row" gap="2" wrap="wrap">
      {props.links.map((link) => (
        <Link key={link.href} class="hero-chip" href={link.href}>
          {link.label}
        </Link>
      ))}
    </Inline>
  );
}

export interface HeroAction {
  href: string;
  label: string;
  cta?: string;
}

export function HeroActionGrid(props: { actions: HeroAction[] }) {
  return (
    <Inline class="hero-actions" gap="3" wrap="wrap">
      {props.actions.map((action) => (
        <Stack asChild gap="2">
          <Link class="hero-action" href={action.href}>
            <strong>{action.label}</strong>
            <span>{action.cta ?? 'Open'}</span>
          </Link>
        </Stack>
      ))}
    </Inline>
  );
}

export interface HeroStat {
  value: string;
  label: string;
}

export function HeroStatGrid(props: { stats: HeroStat[] }) {
  return (
    <Inline class="hero-stats" gap="3" wrap="wrap">
      {props.stats.map((stat) => (
        <Stack asChild gap="2">
          <article>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        </Stack>
      ))}
    </Inline>
  );
}
