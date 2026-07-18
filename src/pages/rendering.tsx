import {
  CapabilityLedger,
  EditorialHero,
  LedgerItem,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
  Vocabulary,
} from './_marketing';

export function RenderingPage() {
  return (
    <>
      <EditorialHero
        title="Choose where the HTML is produced—not how the application is written."
        lede="The same routes and components can start in the browser, arrive as server-rendered HTML, or be written ahead as static documents."
      />
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>One route model, three deliberate choices.</h2>
        </div>
        <CapabilityLedger>
          <LedgerItem title="Single Page Application (SPA)">
            <p>The browser starts the application and owns the first render.</p>
          </LedgerItem>
          <LedgerItem title="Server Side Rendering (SSR)">
            <p>The server produces the document; the browser resumes it.</p>
          </LedgerItem>
          <LedgerItem title="Static Site Generation (SSG)">
            <p>The build writes deterministic HTML for known routes.</p>
          </LedgerItem>
        </CapabilityLedger>
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Share components. Name deferred work.</h2>
        </div>
        <div class="editorial-prose">
          <p>
            Route resolution, components, and render data share contracts across
            modes. Static output remains ordinary HTML and hashed assets.
          </p>
          <p>
            If a loader should not block the first document, the application
            marks it as deferred. Asynchronous components do not silently become
            a streaming protocol.
          </p>
          <Vocabulary>
            <code>createSPA</code>
            <code>renderRouteRequest</code>
            <code>hydrateSPA</code>
            <code>askr ssg</code>
            <code>defer</code>
          </Vocabulary>
          <RepositoryLink href="https://github.com/askrjs/askr-examples">
            Compare the rendering examples
          </RepositoryLink>
        </div>
      </RuledSection>
      <MarketingPageNavigation current="/rendering" />
    </>
  );
}
