import {
  EditorialHero,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
  Vocabulary,
} from './_marketing';

export function ProductionPage() {
  return (
    <>
      <EditorialHero
        title="Ordinary artifacts. Explicit operational boundaries."
        lede="Ship static files when they are enough. Add the Node adapter when requests need a runtime. Both outputs stay inspectable."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Choose the artifact the application requires.</h2>
        </div>
        <div class="production-map" aria-label="Askr production outputs">
          <div class="production-map__source">
            <span>Application-owned</span>
            <h3>Document + routes</h3>
            <p>HTML shell, metadata, and asset placement stay visible.</p>
          </div>
          <ol>
            <li>
              <span>Static output</span>
              <h3>Documents + hashed assets</h3>
              <p>No required server runtime.</p>
            </li>
            <li>
              <span>Node output</span>
              <h3>Adapter + HTTP handlers</h3>
              <p>A thin runtime boundary.</p>
            </li>
          </ol>
        </div>
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Name the seams production depends on.</h2>
        </div>
        <div class="editorial-prose">
          <p>
            Middleware surrounds the request boundary. Separate liveness,
            readiness, startup, and target probes answer distinct operational
            questions. Auth remains an application-supplied contract.
          </p>
          <p>
            Typed localization keeps message keys and parameters visible.
            OpenTelemetry uses redaction-safe attributes; operators retain
            exporter choice and sensitive-data policy.
          </p>
          <Vocabulary>
            <code>document</code>
            <code>adapter</code>
            <code>probes</code>
            <code>localization</code>
            <code>telemetry</code>
          </Vocabulary>
          <RepositoryLink href="https://github.com/askrjs/askr-node">
            View the Node adapter
          </RepositoryLink>
        </div>
      </RuledSection>
      <MarketingPageNavigation current="/production" />
    </>
  );
}
