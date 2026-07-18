import {
  EditorialHero,
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
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Local state. Derived values. Lexical lifetimes.</h2>
          <p>
            Create state where it is owned. Derived values track dependencies.
            Scopes make cleanup part of the model.
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
            <code>resource</code>
            <code>scope</code>
            <code>dispose</code>
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
