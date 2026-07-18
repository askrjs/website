import {
  EditorialHero,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
  Vocabulary,
} from './_marketing';

export function RenderingPage() {
  return (
    <>
      <EditorialHero
        title="Choose where the HTML is produced, not how the application is written."
        lede="The same routes and components can start in the browser, arrive as server-rendered HTML, or be written ahead as static documents."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>One route model, three deliberate choices.</h2>
        </div>
        <div class="rendering-map" aria-label="Shared route model outputs">
          <div class="rendering-map__source">
            <span>Shared input</span>
            <h3>Routes + components</h3>
            <p>One authored application model.</p>
          </div>
          <ol>
            <li>
              <span>Browser</span>
              <h3>Single Page Application</h3>
              <small>SPA</small>
            </li>
            <li>
              <span>Server, then browser</span>
              <h3>Server Side Rendering</h3>
              <small>SSR + hydration</small>
            </li>
            <li>
              <span>Build</span>
              <h3>Static Site Generation</h3>
              <small>SSG</small>
            </li>
          </ol>
        </div>
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
            <code>route</code>
            <code>loader</code>
            <code>render</code>
            <code>hydrateSPA</code>
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
