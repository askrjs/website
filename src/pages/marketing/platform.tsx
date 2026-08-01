import { packagePeers } from '../docs/package-peers';
import {
  EditorialCTA,
  EditorialHero,
  MarketingPageNavigation,
  PackageTable,
  RepositoryLink,
  RuledSection,
  SequenceList,
  type SequenceItem,
} from './components';

const packagePurpose: Record<string, string> = {
  askr: 'Components, state, routing, resources, and the SSR/SSG renderers.',
  cli: 'Scaffolding, generators, OpenAPI checks, and dependency updates.',
  vite: 'The build plugin for JSX, SSR, and static generation.',
  ui: 'Headless components: keyboard behavior, focus, and ARIA.',
  themes: 'Styled components and design tokens on top of the headless layer.',
  lucide: 'The Lucide icon set as Askr components.',
  logos: 'A curated set of brand logo components.',
  charts: 'Typed Canvas plots with SVG and data export.',
  monaco: 'A Monaco editor wrapper for in-app code editing.',
  server: 'Transport-neutral HTTP built on Request and Response.',
  node: 'The Node adapter that runs the server in production.',
  schema: 'Executable schemas that also project to OpenAPI.',
  auth: 'Identity resolution and route access policies.',
  fetch: 'Typed HTTP clients, generated from an OpenAPI document.',
  i18n: 'Typed message keys that fail the build when a translation is missing.',
  otel: 'Redaction-aware OpenTelemetry instrumentation.',
  testing: 'Request injection and HTTP testing helpers.',
};

const packageOrder = [
  'askr',
  'cli',
  'vite',
  'ui',
  'themes',
  'lucide',
  'logos',
  'charts',
  'monaco',
  'server',
  'node',
  'schema',
  'auth',
  'fetch',
  'i18n',
  'otel',
  'testing',
] as const;

const packageRows = packageOrder.map((name) => ({
  name,
  purpose: packagePurpose[name],
  peers: packagePeers[name] ?? [],
}));

const packageCount = packageRows.length;
// Packages other than the runtime itself that require no @askrjs peer at all.
const standaloneCount = packageRows.filter(
  (row) => row.name !== 'askr' && row.peers.length === 0
).length;

const journey: readonly SequenceItem[] = [
  {
    label: 'Build',
    title: 'Start with a component',
    description: 'Core runtime, CLI scaffolding, and Vite Plus.',
    meta: '@askrjs/askr · @askrjs/cli · @askrjs/vite',
  },
  {
    label: 'Compose',
    title: 'Shape the application',
    description:
      'State, routes, data, headless components, themes, schemas, and an optional server.',
    meta: '@askrjs/ui · @askrjs/themes · @askrjs/schema · @askrjs/server',
  },
  {
    label: 'Deliver',
    title: 'Choose when HTML happens',
    description:
      'Single Page Application, Server Side Rendering with hydration, Static Site Generation, or full-stack delivery.',
    meta: 'SPA · SSR + hydration · SSG',
  },
  {
    label: 'Operate',
    title: 'Ship the production site',
    description:
      'Static files or Node output, with clear security, localization, probe, and telemetry seams.',
    meta: '@askrjs/node · @askrjs/auth · @askrjs/i18n · @askrjs/otel',
  },
];

export function PlatformPage() {
  return (
    <>
      <EditorialHero
        title="Everything a full-stack app needs, none of it required upfront."
        lede="Start with the runtime and a route registry. Pull in themed components, a server, and production tooling as the app actually grows into them."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Four stages from component to production</h2>
          <p>
            Each one builds on the last — adding a server later doesn't mean
            rewriting the routes and components you already have.
          </p>
        </div>
        <SequenceList label="From component to production" items={journey} />
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
            View the example applications
          </RepositoryLink>
        </div>
      </RuledSection>
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>{packageCount} packages with explicit peer boundaries</h2>
          <p>
            {standaloneCount} packages beyond the runtime have no Askr peer
            requirement. Packages that compose with the runtime declare it
            explicitly, and <code>@askrjs/themes</code> also declares its
            headless <code>@askrjs/ui</code> layer. The &ldquo;requires&rdquo;
            column is generated from each installed package&rsquo;s published
            peer dependencies.
          </p>
        </div>
        <PackageTable label="Published Askr packages" rows={packageRows} />
      </RuledSection>
      <EditorialCTA
        title="Start with the runtime. Add the rest when the app asks for it."
        primaryHref="/docs/getting-started"
        primaryLabel="Create an app"
        secondaryHref="/docs"
        secondaryLabel="Browse the documentation"
      />
      <MarketingPageNavigation current="/platform" />
    </>
  );
}
