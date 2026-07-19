import {
  EditorialHero,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
} from './components';

export function FullStackPage() {
  return (
    <>
      <EditorialHero
        title="Adding a server doesn't mean adding a second framework."
        lede="Page actions, HTTP APIs, and auth policies register on the same router your routes use — no separate client SDK, no parallel backend project to keep in sync."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Forms submit to actions. Actions are just handlers.</h2>
          <p>
            A page action is a POST handler that returns a redirect or a
            field-level error — it works with JavaScript disabled, and the same
            Request/Response primitives back your JSON APIs.
          </p>
        </div>
        <div class="composition-map" aria-label="Full-stack composition root">
          <ul>
            <li>
              <span>Pages</span>
              <p>Routes and loaders</p>
            </li>
            <li>
              <span>Actions</span>
              <p>Forms and mutations</p>
            </li>
            <li>
              <span>APIs</span>
              <p>Request and Response</p>
            </li>
          </ul>
          <div class="composition-map__root">
            <span>Composition root</span>
            <h3>Policies + dependencies</h3>
            <p>Schemas, auth contracts, and application services meet here.</p>
          </div>
        </div>
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>One schema, checked twice</h2>
        </div>
        <div class="editorial-prose">
          <p>
            Define an input schema once with <code>@askrjs/schema</code> and it
            validates the request at runtime <em>and</em> generates the matching
            OpenAPI operation — so a CI check can catch the day your handler and
            your published API contract disagree.
          </p>
          <p>
            Auth is a policy function you attach to a route, plus whatever
            identity provider you plug in — Askr doesn't ship its own user
            database or decide who counts as logged in.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr-server">
            View the server foundation
          </RepositoryLink>
        </div>
      </RuledSection>
      <MarketingPageNavigation current="/full-stack" />
    </>
  );
}
