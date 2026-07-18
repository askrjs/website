import {
  CapabilityLedger,
  EditorialHero,
  LedgerItem,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
  Vocabulary,
} from './_marketing';

export function ApplicationModelPage() {
  return (
    <>
      <EditorialHero
        title="Explicit state. Explicit routes. Explicit ownership."
        lede="State, routes, resources, and ownership stay visible: where work begins, when it ends, and which scope controls it."
      />
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Local state. Derived values. Lexical lifetimes.</h2>
          <p>
            Create state where it is owned. Derived values track dependencies.
            Scopes make cleanup part of the model.
          </p>
        </div>
        <CapabilityLedger>
          <LedgerItem title="State">
            <p>Mutable facts with explicit reads and writes.</p>
          </LedgerItem>
          <LedgerItem title="Derived values">
            <p>Computed relationships that update from their dependencies.</p>
          </LedgerItem>
          <LedgerItem title="Lexical scopes">
            <p>Ownership boundaries for effects, resources, and teardown.</p>
          </LedgerItem>
        </CapabilityLedger>
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>The application’s visible, typed map.</h2>
        </div>
        <div class="editorial-prose">
          <p>
            Routes form a graph the application can inspect. Parameters,
            layouts, loaders, and actions meet at named points instead of hiding
            behind a filesystem convention.
          </p>
          <p>
            Resources attach work to that lifecycle. Queries cancel when
            ownership ends and invalidate when events make cached data stale.
          </p>
          <Vocabulary>
            <code>state</code>
            <code>derived</code>
            <code>scope</code>
            <code>route</code>
            <code>resource</code>
            <code>query</code>
            <code>cancel</code>
            <code>invalidate</code>
          </Vocabulary>
          <RepositoryLink href="https://github.com/askrjs/askr">
            View the core runtime
          </RepositoryLink>
        </div>
      </RuledSection>
      <MarketingPageNavigation current="/application-model" />
    </>
  );
}
