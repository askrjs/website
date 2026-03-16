import type { SiteLink } from "../pages/shared/content";

export function LinkCard(props: SiteLink) {
  return (
    <article class="card">
      {props.badge ? <span class="badge">{props.badge}</span> : null}
      <h2>{props.label}</h2>
      <p>{props.description ?? ""}</p>
      {props.meta ? <div class="card-meta">{props.meta}</div> : null}
      <a class="card-cta" href={props.href}>
        {props.cta ?? "Explore"}
      </a>
    </article>
  );
}

export function LinkCardGrid(props: { links: SiteLink[]; className?: string }) {
  const className = props.className ? `grid ${props.className}` : "grid";
  return (
    <div class={className}>
      {props.links.map((link) => (
        <LinkCard {...link} />
      ))}
    </div>
  );
}
