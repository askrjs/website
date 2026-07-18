import {
  CapabilityLedger,
  EditorialHero,
  LedgerItem,
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
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Choose the artifact the application requires.</h2>
        </div>
        <CapabilityLedger>
          <LedgerItem title="Static output">
            <p>
              Pre-rendered documents, hashed assets, and no required server
              runtime.
            </p>
          </LedgerItem>
          <LedgerItem title="Node adapter">
            <p>
              A thin transport boundary for server rendering and HTTP handlers.
            </p>
          </LedgerItem>
          <LedgerItem title="Document ownership">
            <p>
              The application controls the HTML shell, metadata, and asset
              placement.
            </p>
          </LedgerItem>
        </CapabilityLedger>
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
            <code>dist/</code>
            <code>@askrjs/node</code>
            <code>/livez</code>
            <code>/readyz</code>
            <code>@askrjs/i18n</code>
            <code>@askrjs/otel</code>
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
