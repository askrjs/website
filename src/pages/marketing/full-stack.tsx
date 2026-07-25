import {
  EditorialCTA,
  EditorialHero,
  FlowMap,
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
        <FlowMap
          label="Full-stack composition root"
          direction="converge"
          hub={{
            label: 'Composition root',
            title: 'Policies + dependencies',
            description:
              'Schemas, auth contracts, and application services meet here.',
          }}
          nodes={[
            { title: 'Pages', description: 'Routes and loaders' },
            { title: 'Actions', description: 'Forms and mutations' },
            { title: 'APIs', description: 'Request and Response' },
          ]}
        />
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
      <EditorialCTA
        title="Add the server when a route actually needs one."
        primaryHref="/docs/server"
        primaryLabel="Read the server docs"
        secondaryHref="/docs/getting-started"
        secondaryLabel="Create an app"
      />
      <MarketingPageNavigation current="/full-stack" />
    </>
  );
}
