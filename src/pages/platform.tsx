import {
  EditorialCTA,
  EditorialHero,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
} from './_marketing';

const journey = [
  {
    step: '01',
    verb: 'Build',
    title: 'Start with a component',
    description: 'Core runtime, CLI scaffolding, and Vite Plus.',
    packages: '@askrjs/askr · @askrjs/cli · @askrjs/vite',
  },
  {
    step: '02',
    verb: 'Compose',
    title: 'Shape the application',
    description:
      'State, routes, data, headless components, themes, schemas, and an optional server.',
    packages: '@askrjs/ui · @askrjs/themes · @askrjs/schema · @askrjs/server',
  },
  {
    step: '03',
    verb: 'Deliver',
    title: 'Choose when HTML happens',
    description:
      'Single Page Application, Server Side Rendering with hydration, Static Site Generation, or full-stack delivery.',
    packages: 'SPA · SSR + hydration · SSG',
  },
  {
    step: '04',
    verb: 'Operate',
    title: 'Ship the production site',
    description:
      'Static files or Node output, with clear security, localization, probe, and telemetry seams.',
    packages: '@askrjs/node · @askrjs/auth · @askrjs/i18n · @askrjs/otel',
  },
] as const;

export function PlatformPage() {
  return (
    <>
      <EditorialHero
        title="A clear path from component to production."
        lede="Start with components and routes. Add themes, server capability, rendering, and operational layers without hiding the composition root."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>From component to production</h2>
          <p>
            Each step adds capability without replacing the routes and
            components beneath it.
          </p>
        </div>
        <ol class="platform-journey" aria-label="From component to production">
          {journey.map((item) => (
            <li class="platform-journey__step">
              <span class="platform-journey__number">{item.step}</span>
              <strong>{item.verb}</strong>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <small>{item.packages}</small>
            </li>
          ))}
        </ol>
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Optional layers. Visible boundaries.</h2>
        </div>
        <div class="editorial-prose">
          <p>
            Askr supplies compatible primitives; the application decides where
            they meet. Routes stay inspectable, server dependencies stay
            visible, and production concerns enter through named adapters.
          </p>
          <p>
            A static site stays small. The same model can grow into a
            server-rendered or full-stack application as requirements change.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr-examples">
            Explore first-party examples
          </RepositoryLink>
        </div>
      </RuledSection>
      <EditorialCTA
        title="See how the application stays explicit."
        primaryHref="/application-model"
        primaryLabel="Explore the application model"
        secondaryHref="/docs/getting-started"
        secondaryLabel="Create an app"
      />
      <MarketingPageNavigation current="/platform" />
    </>
  );
}
