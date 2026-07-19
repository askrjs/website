import {
  EditorialCTA,
  EditorialHero,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
} from './components';

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
        title="Everything a full-stack app needs, none of it required upfront."
        lede="Start with the runtime and a route registry. Pull in themed components, a server, and production tooling as the app actually grows into them."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Four packages you'll actually reach for, in order</h2>
          <p>
            Each one builds on the last — adding a server later doesn't mean
            rewriting the routes and components you already have.
          </p>
        </div>
        <ol class="platform-journey" aria-label="From component to production">
          {journey.map((item) => (
            <li key={item.step} class="platform-journey__step">
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
          <h2>You don't have to decide the shape of the app up front</h2>
        </div>
        <div class="editorial-prose">
          <p>
            A static marketing site and a full-stack dashboard can share the
            same route registry and component code. What changes is which
            packages you add and which adapter renders the output — not how you
            write routes or components.
          </p>
          <p>
            That means a project that starts as static HTML doesn't hit a wall
            the day it needs a server: you add <code>@askrjs/server</code> and a
            route policy, not a second framework.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr-examples">
            Explore first-party examples
          </RepositoryLink>
        </div>
      </RuledSection>
      <EditorialCTA
        title="Next: how state, routes, and data are actually owned."
        primaryHref="/application-model"
        primaryLabel="Explore the application model"
        secondaryHref="/docs/getting-started"
        secondaryLabel="Create an app"
      />
      <MarketingPageNavigation current="/platform" />
    </>
  );
}
