import {
  PageSection,
  CodeSnippetBlock,
  InputRequirementsList,
  ThemeExampleCard,
} from "../../components/page-primitives";
import { DetailTemplate } from "../../components/page-templates";
import { createUiComponentDetailModel } from "../shared/page-models";
import type { UiComponentMeta } from "../shared/ui-component-registry";
import { getDemoForSlug } from "./demos";

export function UiComponentDetailPage(props: { meta: UiComponentMeta }) {
  const model = createUiComponentDetailModel(props.meta);
  const Demo = getDemoForSlug(props.meta.slug);

  const sections = [];

  if (Demo) {
    sections.push({
      id: "demo",
      label: "Demo",
      render: () => (
        <PageSection
          id="demo"
          panel
          className="component-section"
          kicker="Interactive"
          title={`${props.meta.title} in action`}
          description="Live interactive demo powered by askr-ui and askr-themes."
        >
          <Demo />
        </PageSection>
      ),
    });
  }

  sections.push(
    {
      id: model.sections[0].id,
      label: model.sections[0].label,
      render: () => (
        <PageSection
          id={model.sections[0].id}
          panel
          className="component-section"
          kicker={model.sections[0].kicker}
          title={model.sections[0].title}
          description={model.sections[0].description}
        >
          <InputRequirementsList items={model.inputRequirements} />
        </PageSection>
      ),
    },
    {
      id: model.sections[1].id,
      label: model.sections[1].label,
      render: () => (
        <PageSection
          id={model.sections[1].id}
          panel
          className="component-section"
          kicker={model.sections[1].kicker}
          title={model.sections[1].title}
          description={model.sections[1].description}
        >
          <ThemeExampleCard
            category={model.themeExample.category}
            title={model.themeExample.title}
            description={model.themeExample.description}
          />
        </PageSection>
      ),
    },
    {
      id: model.sections[2].id,
      label: model.sections[2].label,
      render: () => (
        <PageSection
          id={model.sections[2].id}
          panel
          className="component-section"
          kicker={model.sections[2].kicker}
          title={model.sections[2].title}
          description={model.sections[2].description}
        >
          <CodeSnippetBlock snippet={model.snippet} />
        </PageSection>
      ),
    },
  );

  return <DetailTemplate title={model.title} intro={model.intro} sections={sections} />;
}
