import {
  EditorialCTA,
  EditorialHero,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
  SequenceList,
  type SequenceItem,
} from './components';

const ownership: readonly SequenceItem[] = [
  {
    title: 'State',
    description: 'Store mutable facts where they are owned.',
    meta: 'read · write',
  },
  {
    title: 'Derived values',
    description: 'Track relationships instead of synchronizing copies.',
    meta: 'depend · compute',
  },
  {
    title: 'Resources',
    description: 'Attach asynchronous work to the active lifecycle.',
    meta: 'load · cancel',
  },
  {
    title: 'Scopes',
    description: 'End effects and resources with their lexical owner.',
    meta: 'own · dispose',
  },
];

export function ApplicationModelPage() {
  return (
    <>
      <EditorialHero
        title="If you can't say who owns a piece of state, something's wrong."
        lede="Askr pushes state, derived values, and async work into whatever component or scope actually owns them — instead of a global store you have to trace backward."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Four things, and where each one lives</h2>
          <p>
            State lives with the component that changes it. Derived values
            recompute instead of drifting out of sync. When the owning scope
            goes away, its resources are cleaned up automatically.
          </p>
        </div>
        <SequenceList
          label="Application ownership lifecycle"
          items={ownership}
        />
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Routes are data, not a folder structure</h2>
        </div>
        <div class="editorial-prose">
          <p>
            You declare params, layouts, loaders, and actions in a typed
            registry, so tooling (and you) can enumerate every route the app has
            — no need to reverse-engineer it from a file tree.
          </p>
          <p>
            Async work — a query, a resource — is tied to the component or route
            that requested it. Navigate away mid-fetch and the request is
            cancelled instead of resolving into a component that no longer
            exists. When a write invalidates a query, dependents refetch.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr">
            View the core runtime
          </RepositoryLink>
        </div>
      </RuledSection>
      <EditorialCTA
        title="Put state, routes, and lifecycle to work."
        primaryHref="/docs/core-concepts"
        primaryLabel="Read the fundamentals"
        secondaryHref="/docs/getting-started"
        secondaryLabel="Create an app"
      />
      <MarketingPageNavigation current="/application-model" />
    </>
  );
}
