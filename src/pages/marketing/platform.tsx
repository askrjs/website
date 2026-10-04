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
  node: 'The adapter for running Askr HTTP handlers on Node.',
  schema: 'Executable schemas that also project to OpenAPI.',
  auth: 'Identity resolution and route access policies.',
  fetch:
    'Typed HTTP clients defined in code, or generated from an OpenAPI document via the CLI.',
  i18n: 'Typed message keys that fail the build when a translation is missing.',
  otel: 'OpenTelemetry instrumentation with an attribute allowlist.',
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
    description: 'Core runtime, CLI scaffolding, and the Vite build plugin.',
    meta: '@askrjs/askr · @askrjs/cli · @askrjs/vite',
  },
  {
    label: 'Compose',
    title: 'Add state, data, and UI',
    description:
      'State, routes, data, headless components, themes, schemas, and an optional server.',
    meta: '@askrjs/ui · @askrjs/themes · @askrjs/schema · @askrjs/server',
  },
  {
    label: 'Deliver',
    title: 'Choose a rendering mode',
    description:
      'Single Page Application, Server Side Rendering with hydration, Static Site Generation, or full-stack delivery.',
    meta: 'SPA · SSR + hydration · SSG',
  },
  {
    label: 'Operate',
    title: 'Deploy the application',
    description:
      'Deploy static output or use the Node adapter for HTTP and health probes. Add separate packages for auth, typed localization, and OpenTelemetry.',
    meta: '@askrjs/node · @askrjs/auth · @askrjs/i18n · @askrjs/otel',
  },
];

export function PlatformPage() {
  return (
    <>
      <EditorialHero
        title="Start with the runtime. Add packages when you need them."
        lede="Askr is a set of TypeScript packages for routes, rendering, UI, and server work. Begin with the core runtime, then add the pieces your application calls for."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Choose rendering and server packages as the app grows</h2>
          <p>
            Add server and rendering packages later while keeping the route
            registry and components you already wrote.
          </p>
        </div>
        <SequenceList label="Askr application setup" items={journey} />
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Keep routes as the application changes</h2>
        </div>
        <div class="editorial-prose">
          <p>
            A static site and a full-stack dashboard can use the same route
            registry and component code. Moving between them still takes the
            relevant browser, server, or static-build entry point and
            configuration; your route declarations can stay in place.
          </p>
          <p>
            If a route later needs request-time work, add the{' '}
            <code>@askrjs/server</code> package, define a handler, and attach an
            access policy. The route registry can stay in place as you add
            server code.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr-examples">
            View the example applications
          </RepositoryLink>
        </div>
      </RuledSection>
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>{packageCount} packages with clear dependencies</h2>
          <p>
            {standaloneCount} packages beyond the runtime have no Askr peer
            requirement. Packages that compose with the runtime declare it
            explicitly, and <code>@askrjs/themes</code> also declares its
            headless <code>@askrjs/ui</code> layer. The &ldquo;requires&rdquo;
            column lists peer dependencies for the installed package versions.
          </p>
          <p>
            Askr packages are pre-1.0, so a minor release may include breaking
            changes. Review the ranges proposed by <code>askr upgrade</code> and
            check peer compatibility before installing them.
          </p>
        </div>
        <PackageTable label="Published Askr packages" rows={packageRows} />
      </RuledSection>
      <EditorialCTA
        title="Start with the core runtime."
        primaryHref="/docs/getting-started"
        primaryLabel="Create an app"
        secondaryHref="/docs"
        secondaryLabel="Browse the documentation"
      />
      <MarketingPageNavigation current="/platform" />
    </>
  );
}
