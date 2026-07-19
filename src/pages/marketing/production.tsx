import {
  EditorialHero,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
} from './components';

export function ProductionPage() {
  return (
    <>
      <EditorialHero
        title="If it doesn't need a server, it doesn't get one."
        lede="A fully static app builds to a folder of HTML and hashed assets — no Node process to keep alive. Add the Node adapter only once a route actually needs to run server code per request."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Two outputs, one build</h2>
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
          <h2>The things your orchestrator actually asks for</h2>
        </div>
        <div class="editorial-prose">
          <p>
            Liveness, readiness, and startup are separate probes, because "is
            the process running" and "can it serve a database-backed request
            right now" are different questions — answering them the same way is
            how you get restart loops.
          </p>
          <p>
            Message keys for localization are typed, so a missing translation
            fails at build time, not in front of a user. OpenTelemetry
            attributes are redaction-aware by default, but you still choose the
            exporter and the sensitive-data policy — Askr doesn't phone data
            anywhere on its own.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr-node">
            View the Node adapter
          </RepositoryLink>
        </div>
      </RuledSection>
      <MarketingPageNavigation current="/production" />
    </>
  );
}
