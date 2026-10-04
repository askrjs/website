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
    description: 'Derived values track their source state.',
    meta: 'depend · compute',
  },
  {
    title: 'Resources',
    description: 'Attach asynchronous work to the active lifecycle.',
    meta: 'load · cancel',
  },
  {
    title: 'Scopes',
    description: 'Provide a typed value down the tree without a global store.',
    meta: 'provide · read',
  },
];

export function ApplicationModelPage() {
  return (
    <>
      <EditorialHero
        title="Keep state and async work with the UI that owns it."
        lede="Askr provides local state, derived values, lifecycle-bound resources, and typed scopes. Declare where each piece of work belongs."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Four things, and where each one lives</h2>
          <p>
            Keep mutable state near the component or scope that uses it. Derived
            values track their source state. Resources can use the owning
            component's lifecycle for cancellation and cleanup.
          </p>
        </div>
        <SequenceList
          label="Application ownership lifecycle"
          items={ownership}
        />
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Declare routes in a typed registry</h2>
        </div>
        <div class="editorial-prose">
          <p>
            Declare paths, parameters, layouts, loaders, and actions in a typed
            registry. The same registry is available to your app and its
            tooling.
          </p>
          <p>
            Resources receive an <code>AbortSignal</code> from their owner, so
            cancellation-aware work can stop when that owner unmounts. When a
            write invalidates a query, affected queries can refetch and update
            the views that depend on them.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr">
            View the core runtime
          </RepositoryLink>
        </div>
      </RuledSection>
      <EditorialCTA
        title="See how Askr models state and routes."
        primaryHref="/docs/core-concepts"
        primaryLabel="Read the fundamentals"
        secondaryHref="/docs/getting-started"
        secondaryLabel="Create an app"
      />
      <MarketingPageNavigation current="/application-model" />
    </>
  );
}
