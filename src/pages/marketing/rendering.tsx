import {
  EditorialCTA,
  EditorialHero,
  FlowMap,
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
        <FlowMap
          label="Shared route model outputs"
          direction="fan-out"
          hub={{
            label: 'Shared input',
            title: 'Routes + components',
            description: 'One authored application model.',
          }}
          nodes={[
            {
              label: 'Browser',
              title: 'Single Page Application',
              meta: 'SPA',
            },
            {
              label: 'Server, then browser',
              title: 'Server Side Rendering',
              meta: 'SSR + hydration',
            },
            {
              label: 'Build',
              title: 'Static Site Generation',
              meta: 'SSG',
            },
          ]}
        />
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
            View the rendering examples
          </RepositoryLink>
        </div>
      </RuledSection>
      <EditorialCTA
        title="Pick a rendering mode when you deploy, not when you start."
        primaryHref="/docs/rendering"
        primaryLabel="Read the rendering docs"
        secondaryHref="/docs/getting-started"
        secondaryLabel="Create an app"
      />
      <MarketingPageNavigation current="/rendering" />
    </>
  );
}
