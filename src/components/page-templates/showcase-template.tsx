import { jsx } from "../../runtime/jsx";

import { SiteShell } from "../site-shell";

export interface ShowcaseMetric {
  label: string;
  value: string;
}

export interface ShowcaseTemplateProps {
  badge: string;
  title: string;
  summary: string;
  bullets: string[];
  metrics: ShowcaseMetric[];
}

export function ShowcaseTemplate(props: ShowcaseTemplateProps) {
  return (
    <SiteShell title={props.title} intro={props.summary}>
      <div class="panel">
        <span class="badge">{props.badge}</span>
        <ul class="toc">
          {props.bullets.map((bullet) => (
            <li>{bullet}</li>
          ))}
        </ul>
        <div class="kpi">
          {props.metrics.map((metric) => (
            <article>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>
      </div>
    </SiteShell>
  );
}
