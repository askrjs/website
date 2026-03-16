import { Fragment, jsx } from "../../runtime/jsx";

import { CatalogSection, HeroStatGrid } from "../../components/page-primitives";
import {
  CatalogTemplate,
  ShowcaseTemplate,
} from "../../components/page-templates";
import { createUiShowcaseModel } from "./page-models";

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
      badge="Framework"
      title="Askr Framework Showcase"
      summary="Use deterministic state, explicit reactivity, and strict runtime guarantees for predictable apps."
      bullets={[
        "Rendering model and component lifecycle walkthrough",
        "State and resource orchestration examples",
        "Routing and static generation patterns for production deployments",
      ]}
      metrics={[
        { label: "Primary tracks", value: "3" },
        { label: "Architecture pages", value: "6+" },
        { label: "Starter demos", value: "5" },
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
      sections={[
        {
          render: () => <HeroStatGrid stats={model.heroStats} />,
        },
        ...model.groups.map((group) => ({
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
        })),
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
        "Token explorer and semantic color map",
        "Theme extension strategy and override examples",
        "Component-level style application guidance",
      ]}
      metrics={[
        { label: "Token groups", value: "10+" },
        { label: "Modes covered", value: "2" },
        { label: "Theme guides", value: "4" },
      ]}
    />
  );
}
