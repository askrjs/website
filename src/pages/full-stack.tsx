import {
  EditorialHero,
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
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Use the browser’s native path first.</h2>
          <p>
            Page actions begin with forms, requests, responses, redirects, and
            progressive enhancement. APIs use the same Web-standard foundation;
            page interactions need no custom client protocol.
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
            <code>Request</code>
            <code>Schema</code>
            <code>handler</code>
            <code>Response</code>
            <code>OpenAPI</code>
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
