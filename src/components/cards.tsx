import type { SiteLink } from "../pages/shared/content";
import { Badge } from "@askrjs/askr-ui/badge";
import { SiteAnchor } from "./site-link";

export function LinkCard(props: SiteLink) {
  return (
    <article class="card">
      {props.badge ? <Badge class="badge">{props.badge}</Badge> : null}
      <h2>{props.label}</h2>
      <p>{props.description ?? ""}</p>
      {props.meta ? <div class="card-meta">{props.meta}</div> : null}
      <SiteAnchor className="card-cta" href={props.href}>
        {props.cta ?? "Explore"}
      </SiteAnchor>
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
