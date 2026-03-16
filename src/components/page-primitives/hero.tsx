export interface HeroChipLink {
  href: string;
  label: string;
}

export function HeroChipRow(props: { links: HeroChipLink[] }) {
  return (
    <div class="hero-chip-row">
      {props.links.map((link) => (
        <a class="hero-chip" href={link.href}>
          {link.label}
        </a>
      ))}
    </div>
  );
}

export interface HeroAction {
  href: string;
  label: string;
  cta?: string;
}

export function HeroActionGrid(props: { actions: HeroAction[] }) {
  return (
    <div class="hero-actions">
      {props.actions.map((action) => (
        <a class="hero-action" href={action.href}>
          <strong>{action.label}</strong>
          <span>{action.cta ?? "Open"}</span>
        </a>
      ))}
    </div>
  );
}

export interface HeroStat {
  value: string;
  label: string;
}

export function HeroStatGrid(props: { stats: HeroStat[] }) {
  return (
    <div class="hero-stats">
      {props.stats.map((stat) => (
        <article>
          <strong>{stat.value}</strong>
          <span>{stat.label}</span>
        </article>
      ))}
    </div>
  );
}
