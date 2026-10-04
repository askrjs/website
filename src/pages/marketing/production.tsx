import {
  EditorialCTA,
  EditorialHero,
  FlowMap,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
} from './components';

export function ProductionPage() {
  return (
    <>
      <EditorialHero
        title="Build static HTML and assets with Askr."
        lede="Deploy the output as static files, with no Node process to run. For routes that need request-time code, configure a server build and use the Node adapter."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>One application, two deployment paths</h2>
          <p>
            Reuse your route registry and components, then configure either an
            SSG build for static hosting or a server entry and Node adapter for
            request-time rendering.
          </p>
        </div>
        <FlowMap
          label="Askr production outputs"
          direction="fan-out"
          hub={{
            label: 'Your application',
            title: 'HTML document + routes',
            description:
              'Provide the document and registry to the selected renderer.',
          }}
          nodes={[
            {
              label: 'Static output',
              title: 'Documents + hashed assets',
              description: 'No server process required.',
            },
            {
              label: 'Node output',
              title: 'Adapter + HTTP handlers',
              description: 'The Node process handles HTTP requests.',
            },
          ]}
        />
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Inspect the generated HTML</h2>
        </div>
        <div class="editorial-prose">
          <p>
            This website is built with <code>askr ssg</code>. Its generated
            pages are HTML files you can inspect with view-source.
          </p>
        </div>
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Configure health checks and telemetry for your deployment</h2>
        </div>
        <div class="editorial-prose">
          <p>
            The Node adapter exposes separate liveness, readiness, and startup
            probes. Keep liveness focused on whether the process is alive and
            readiness focused on whether it can serve traffic; combining those
            checks can cause avoidable restart loops.
          </p>
          <p>
            Askr's localization package checks typed message keys so missing
            translations surface during development or build. The OpenTelemetry
            integration records allowlisted span attributes, not request bodies
            or form values. You choose the provider and exporter; Askr sends no
            telemetry on its own.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr-node">
            View the Node adapter
          </RepositoryLink>
        </div>
      </RuledSection>
      <EditorialCTA
        title="Deploy static files or run the Node adapter."
        primaryHref="/docs/getting-started"
        primaryLabel="Create an app"
        secondaryHref="/docs/guides"
        secondaryLabel="Read the guides"
      />
      <MarketingPageNavigation current="/production" />
    </>
  );
}
