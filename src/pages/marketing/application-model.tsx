import {
  EditorialHero,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
} from './components';

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
        <ol
          class="concept-sequence"
          aria-label="Application ownership lifecycle"
        >
          <li>
            <span>01</span>
            <h3>State</h3>
            <p>Store mutable facts where they are owned.</p>
            <small>read · write</small>
          </li>
          <li>
            <span>02</span>
            <h3>Derived values</h3>
            <p>Track relationships instead of synchronizing copies.</p>
            <small>depend · compute</small>
          </li>
          <li>
            <span>03</span>
            <h3>Resources</h3>
            <p>Attach asynchronous work to the active lifecycle.</p>
            <small>load · cancel</small>
          </li>
          <li>
            <span>04</span>
            <h3>Scopes</h3>
            <p>End effects and resources with their lexical owner.</p>
            <small>own · dispose</small>
          </li>
        </ol>
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
      <MarketingPageNavigation current="/application-model" />
    </>
  );
}
