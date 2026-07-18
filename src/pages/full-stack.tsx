import {
  CapabilityLedger,
  EditorialHero,
  LedgerItem,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
  Vocabulary,
} from './_marketing';

export function FullStackPage() {
  return (
    <>
      <EditorialHero
        title="Pages, APIs, and actions meet at one explicit composition root."
        lede="Add server capability without adding a second architecture. Page actions, HTTP APIs, policies, and dependencies meet at one visible root."
      />
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Use the browser’s native path first.</h2>
          <p>
            Page actions begin with forms, requests, responses, redirects, and
            progressive enhancement. APIs use the same Web-standard foundation;
            page interactions need no custom client protocol.
          </p>
        </div>
        <CapabilityLedger>
          <LedgerItem title="Page actions">
            <p>
              Native-first mutations attached to the route that presents them.
            </p>
          </LedgerItem>
          <LedgerItem title="HTTP APIs">
            <p>Transport-neutral handlers built on Request and Response.</p>
          </LedgerItem>
          <LedgerItem title="Composition">
            <p>Explicit dependencies supplied at the application boundary.</p>
          </LedgerItem>
        </CapabilityLedger>
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Validate at runtime. Describe the same boundary.</h2>
        </div>
        <div class="editorial-prose">
          <p>
            Executable schemas validate input and output at trust boundaries.
            The same contracts describe OpenAPI operations, making drift visible
            without pretending every application type crosses the network.
          </p>
          <p>
            Authentication enters through policies and principal contracts.
            Identity providers and authorization decisions remain application
            responsibilities.
          </p>
          <Vocabulary>
            <code>handleAction</code>
            <code>Request</code>
            <code>Response</code>
            <code>Schema</code>
            <code>OpenAPI</code>
            <code>policy</code>
          </Vocabulary>
          <RepositoryLink href="https://github.com/askrjs/askr-server">
            View the server foundation
          </RepositoryLink>
        </div>
      </RuledSection>
      <MarketingPageNavigation current="/full-stack" />
    </>
  );
}
