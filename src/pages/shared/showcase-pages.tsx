import { CatalogSection } from '../../components/page-primitives';
import {
  CatalogTemplate,
  ShowcaseTemplate,
} from '../../components/page-templates';
import { createUiShowcaseModel } from './page-models';

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
    <ShowcaseTemplate
      badge={props.badge}
      title={props.title}
      summary={props.summary}
      bullets={props.bullets}
      metrics={props.metrics}
    />
  );
}

export function AskrShowcasePage() {
  return (
    <ShowcasePage
      badge="Reference"
      title="Runtime Reference"
      summary="Reference notes for deterministic rendering, routing, and state patterns you will likely need while implementing the docs and onboarding flow."
      bullets={[
        'Review rendering and lifecycle behavior when choosing execution modes',
        'Check state and resource orchestration patterns during implementation',
        'Use routing notes when connecting docs, onboarding, and reference surfaces',
      ]}
      metrics={[
        { label: 'Reference tracks', value: '3' },
        { label: 'Primary concepts', value: '6+' },
        { label: 'Starter paths', value: '5' },
      ]}
    />
  );
}

export function UiShowcasePage() {
  const model = createUiShowcaseModel();

  return (
    <CatalogTemplate
      title={model.title}
      intro={model.intro}
      jumpLinks={model.jumpLinks}
      sections={model.groups.map((group) => ({
        render: () => (
          <CatalogSection
            id={group.id}
            kicker={group.kicker}
            title={group.title}
            description={group.description}
            links={group.links}
            gridClassName="grid-docs"
          />
        ),
      }))}
    />
  );
}

export function ThemesShowcasePage() {
  return (
    <ShowcasePage
      badge="Reference"
      title="Theme Reference"
      summary="Theme tokens, light and dark defaults, and styling guidance you can apply while turning an initial app into a coherent documentation experience."
      bullets={[
        'Inspect token groups before introducing bespoke styling rules',
        'Review light and dark behavior when validating theme initialization',
        'Use the examples here when aligning reference and docs surfaces visually',
      ]}
      metrics={[
        { label: 'Token groups', value: '10+' },
        { label: 'Modes covered', value: '2' },
        { label: 'Theme guides', value: '4' },
      ]}
    />
  );
}
