import {
  EditorialHero,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
} from './components';

export function RenderingPage() {
  return (
    <>
      <EditorialHero
        title="You shouldn't have to rewrite an app to change how it's hosted."
        lede="A marketing site that later needs a dashboard, or a dashboard that later needs a fast landing page — both are the same route tree with a different rendering mode switched on."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Same routes and components, three ways to serve them</h2>
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
          <h2>Switching modes is a boot-file change, not a rewrite</h2>
        </div>
        <div class="editorial-prose">
          <p>
            Swap <code>createSPA</code> for <code>hydrateSPA</code> and a
            server-rendered document, and the browser takes over the same
            component tree. Route loaders, params, and render data work the same
            way regardless of where the HTML came from.
          </p>
          <p>
            A loader that shouldn't block the first paint is marked{' '}
            <code>defer</code> explicitly — you choose what's slow and deferred,
            rather than the framework guessing.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr-examples">
            Compare the rendering examples
          </RepositoryLink>
        </div>
      </RuledSection>
      <MarketingPageNavigation current="/rendering" />
    </>
  );
}
