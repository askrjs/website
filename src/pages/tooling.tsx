import {
  CapabilityLedger,
  EditorialHero,
  LedgerItem,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
  Vocabulary,
} from './_marketing';

export function ToolingPage() {
  return (
    <>
      <EditorialHero
        title="Scaffolds you can read. Commands you can verify."
        lede="Askr creates ordinary project files, builds with Vite Plus, and keeps generators and updates reviewable in version control."
      />
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Begin near the application you intend to ship.</h2>
        </div>
        <CapabilityLedger>
          <LedgerItem title="Startkit">
            <p>A minimal introduction to components, state, and routes.</p>
          </LedgerItem>
          <LedgerItem title="Single Page Application (SPA)">
            <p>
              A browser-owned application built from the shared route model.
            </p>
          </LedgerItem>
          <LedgerItem title="Server Side Rendering (SSR)">
            <p>
              Server-produced HTML that the browser resumes through hydration.
            </p>
          </LedgerItem>
          <LedgerItem title="Full Stack">
            <p>Pages, actions, APIs, and a Node delivery boundary.</p>
          </LedgerItem>
          <LedgerItem title="Static Site Generation (SSG)">
            <p>Deterministic HTML and assets written ahead of deployment.</p>
          </LedgerItem>
        </CapabilityLedger>
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Generate the repetitive parts. Keep the result inspectable.</h2>
        </div>
        <div class="editorial-prose">
          <p>
            Page and action generators add readable modules. Static generation
            writes the routes you define. OpenAPI checks compare executable
            contracts with their committed description.
          </p>
          <p>
            Compatibility guards constrain dependency updates. Project-local
            agent skills carry the application’s commands and conventions into
            assisted work.
          </p>
          <Vocabulary>
            <code>vp dev</code>
            <code>vp check</code>
            <code>askr generate page</code>
            <code>askr generate action</code>
            <code>askr ssg</code>
            <code>askr update</code>
          </Vocabulary>
          <RepositoryLink href="https://github.com/askrjs/askr-cli">
            View the CLI and starters
          </RepositoryLink>
        </div>
      </RuledSection>
      <MarketingPageNavigation current="/tooling" />
    </>
  );
}
