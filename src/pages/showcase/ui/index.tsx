import { CatalogSection } from '../../../components/page-primitives';
import { CatalogTemplate } from '../../../components/page-templates';
import { createUiShowcaseModel } from './_model/showcase-model';

export function UiPage() {
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
