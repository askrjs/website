import {
  CatalogSection,
  HeroActionGrid,
  PageSection,
} from "../../components/page-primitives";
import { AppShell } from "../../components/site-shell";
import { createHomeModel } from "../shared/page-models";

export function HomePage() {
  const model = createHomeModel();

  return (
    <AppShell
      title={model.title}
      intro={model.intro}
      heroChildren={<HeroActionGrid actions={model.heroActions} />}
    >
      <PageSection
        kicker={model.featureSection.kicker}
        title={model.featureSection.title}
        description={model.featureSection.description}
      />

      {model.sections.map((section) => (
        <CatalogSection
          kicker={section.kicker}
          title={section.title}
          description={section.description}
          links={section.links}
          gridClassName="grid-docs"
        />
      ))}
    </AppShell>
  );
}
