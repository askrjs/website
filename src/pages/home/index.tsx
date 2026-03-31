import { state } from "@askrjs/askr";
import { Button } from "@askrjs/askr-ui/primitives/button";
import { Badge } from "@askrjs/askr-ui/primitives/badge";
import {
  CatalogSection,
  HeroActionGrid,
  HeroStatGrid,
  PageSection,
} from "../../components/page-primitives";
import { AppShell } from "../../components/site-shell";
import { SiteAnchor } from "../../components/site-link";
import { createHomeModel } from "../shared/page-models";

function HomeDemo() {
  const count = state(0);

  return (
    <div class="home-demo">
      <h2>Reactivity in action</h2>
      <p>
        Fine-grained updates with <code>state()</code> — no virtual DOM, no
        re-renders. Click to see it work.
      </p>
      <div class="home-demo-counter">
        <Button onPress={() => count.set((v) => Math.max(0, v - 1))}>
          -
        </Button>
        <span class="home-demo-value">{count}</span>
        <Button onPress={() => count.set((v) => v + 1)}>+</Button>
      </div>
    </div>
  );
}

interface EcoCard {
  title: string;
  description: string;
  badge: string;
  href: string;
}

function EcosystemCards(props: { cards: EcoCard[] }) {
  return (
    <div class="grid">
      {props.cards.map((card) => (
        <SiteAnchor className="card" href={card.href}>
          <Badge>{card.badge}</Badge>
          <h2>{card.title}</h2>
          <p>{card.description}</p>
          <span class="card-cta">Explore &rarr;</span>
        </SiteAnchor>
      ))}
    </div>
  );
}

export function HomePage() {
  const model = createHomeModel();

  return (
    <AppShell
      title={model.title}
      intro={model.intro}
      heroChildren={
        <>
          <HeroActionGrid actions={model.heroActions} />
          <HeroStatGrid stats={model.stats} />
        </>
      }
    >
      <HomeDemo />

      <PageSection
        kicker="Ecosystem"
        title="Three packages, one coherent stack"
        description="Each package does one thing well. Use them together or pick what you need."
      >
        <EcosystemCards cards={model.ecosystemCards} />
      </PageSection>

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
