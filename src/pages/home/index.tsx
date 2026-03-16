import {
  CatalogSection,
  HeroActionGrid,
  HeroStatGrid,
  PageSection,
  SpotlightSignals,
} from "../../components/page-primitives";
import { SiteShell } from "../../components/site-shell";
import { createHomeModel } from "../shared/page-models";

export function HomePage() {
  const model = createHomeModel();

  return (
    <SiteShell
      title={model.title}
      intro={model.intro}
      heroChildren={
        <div>
          <HeroActionGrid actions={model.heroActions} />
          <HeroStatGrid stats={model.heroStats} />
        </div>
      }
    >
      <PageSection
        panel
        splitBand
        kicker={model.spotlight.kicker}
        title={model.spotlight.title}
        description={model.spotlight.description}
      >
        <SpotlightSignals signals={model.spotlight.signals} />
      </PageSection>

      {model.discoverSections.map((section) => (
        <CatalogSection
          kicker={section.kicker}
          title={section.title}
          description={section.description}
          links={section.links}
        />
      ))}
    </SiteShell>
  );
}
