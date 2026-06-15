import {
  PageSection,
  CodeSnippetBlock,
  InputRequirementsList,
  ThemeExampleCard,
} from '../../../components/page-primitives';
import { DetailTemplate } from '../../../components/page-templates';
import { createUiComponentDetailModel } from './_model/component-detail-model';
import type { UiComponentMeta } from './_registry';
import { getDemoForSlug } from './_demos';

export function UiComponentDetailPage(props: { meta: UiComponentMeta }) {
  const model = createUiComponentDetailModel(props.meta);
  const Demo = getDemoForSlug(props.meta.slug);

  const sections = [];

  if (Demo) {
    sections.push({
      id: 'demo',
      label: 'Demo',
      render: () => (
        <PageSection
          id="demo"
          panel
          className="component-section"
          kicker="Interactive"
          title={`${props.meta.title} in action`}
          description="Try the component behavior in the hydrated app; use the sections below for static source, state, and accessibility checks."
        >
          {typeof window === 'undefined' ? (
            <div class="component-demo-static">
              <strong>{props.meta.title} demo</strong>
              <p>
                The interactive demo runs in the browser so static output can
                keep the reference content readable and framework-safe.
              </p>
            </div>
          ) : (
            <Demo />
          )}
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
    }
  );

  return (
    <DetailTemplate
      title={model.title}
      intro={model.intro}
      sections={sections}
    />
  );
}
