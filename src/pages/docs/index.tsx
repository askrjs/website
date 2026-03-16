import { CatalogSection } from "../../components/page-primitives";
import { CatalogTemplate } from "../../components/page-templates";
import { createDocsIndexModel } from "../shared/page-models";

export function DocsIndexPage() {
  const model = createDocsIndexModel();

  return (
    <CatalogTemplate
      title={model.title}
      intro={model.intro}
      jumpLinks={model.jumpLinks}
      sections={[
        {
          render: () => (
            <CatalogSection
              kicker={model.featuredSection.kicker}
              title={model.featuredSection.title}
              description={model.featuredSection.description}
              links={model.featuredSection.links}
              gridClassName={model.featuredSection.gridClassName}
            />
          ),
        },
        ...model.groupedSections.map((section) => ({
          render: () => (
            <CatalogSection
              id={section.id}
              kicker={section.kicker}
              title={section.title}
              description={section.description}
              links={section.links}
              gridClassName={section.gridClassName}
            />
          ),
        })),
      ]}
    />
  );
}
