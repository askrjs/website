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
        title="Add server routes to your TypeScript application."
        lede="Define page actions and HTTP handlers alongside your routes. Add schemas, access policies, and services in code. Connect the identity system and infrastructure your app already uses."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Forms can submit to server actions</h2>
          <p>
            A page action handles a form POST and can return a redirect or
            field-level errors, including when JavaScript is disabled. HTTP APIs
            use the standard <code>Request</code> and <code>Response</code>
            interfaces.
          </p>
        </div>
        <FlowMap
          label="Pages, actions, and APIs share application setup"
          direction="converge"
          hub={{
            label: 'Application setup',
            title: 'Schemas + services',
            description:
              'Validate requests, apply access policies, and connect services.',
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
          <h2>Keep request validation and the API contract together</h2>
        </div>
        <div class="editorial-prose">
          <p>
            Define executable schemas for your routes. Askr can validate
            requests and generate an OpenAPI document from those definitions.
            Run <code>askr openapi --check</code> in CI to catch when the
            generated document differs from the committed contract.
          </p>
          <p>
            Access is a policy you attach to a route, plus an identity resolver
            you provide. Askr does not include a user database or decide who is
            logged in.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr-server">
            View the server foundation
          </RepositoryLink>
        </div>
      </RuledSection>
      <EditorialCTA
        title="Add server actions and APIs when routes need them."
        primaryHref="/docs/server"
        primaryLabel="Read the server docs"
        secondaryHref="/docs/getting-started"
        secondaryLabel="Create an app"
      />
      <MarketingPageNavigation current="/full-stack" />
    </>
  );
}
