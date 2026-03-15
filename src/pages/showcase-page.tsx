import { Fragment, jsx } from '../runtime/jsx';

import { SiteShell } from '../components/site-shell';

interface ShowcaseMetric {
  label: string;
  value: string;
}

export interface ShowcasePageProps {
  badge: string;
  title: string;
  summary: string;
  bullets: string[];
  metrics: ShowcaseMetric[];
}

export function ShowcasePage(props: ShowcasePageProps) {
  return (
    <SiteShell title={props.title} intro={props.summary}>
      <div class="panel">
        <span class="badge">{props.badge}</span>
        <ul class="toc">{props.bullets.map((bullet) => <li>{bullet}</li>)}</ul>
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

export function AskrShowcasePage() {
  return (
    <ShowcasePage
      badge="Framework"
      title="Askr Framework Showcase"
      summary="Use deterministic state, explicit reactivity, and strict runtime guarantees for predictable apps."
      bullets={[
        'Rendering model and component lifecycle walkthrough',
        'State and resource orchestration examples',
        'Routing and static generation patterns for production deployments',
      ]}
      metrics={[
        { label: 'Primary tracks', value: '3' },
        { label: 'Architecture pages', value: '6+' },
        { label: 'Starter demos', value: '5' },
      ]}
    />
  );
}

export function UiShowcasePage() {
  return (
    <ShowcasePage
      badge="Components"
      title="Askr UI Showcase"
      summary="Discover accessibility-first headless components and implementation patterns for app shells."
      bullets={[
        'Core primitive catalog with usage guidance',
        'Navigation and form component patterns',
        'Accessibility expectations and testable interaction contracts',
      ]}
      metrics={[
        { label: 'Component families', value: '12+' },
        { label: 'Initial featured comps', value: '6' },
        { label: 'A11y review scope', value: '100%' },
      ]}
    />
  );
}

export function ThemesShowcasePage() {
  return (
    <ShowcasePage
      badge="Design System"
      title="Askr Themes Showcase"
      summary="Explore token-driven styling and compare light/dark mode implementations across components."
      bullets={[
        'Token explorer and semantic color map',
        'Theme extension strategy and override examples',
        'Component-level style application guidance',
      ]}
      metrics={[
        { label: 'Token groups', value: '10+' },
        { label: 'Modes covered', value: '2' },
        { label: 'Theme guides', value: '4' },
      ]}
    />
  );
}
