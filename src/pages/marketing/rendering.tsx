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
        title="Reuse your route registry across rendering modes."
        lede="Askr can render an application in the browser, on a server before hydration, or at build time. Each mode needs its own entry point and setup, while the route registry and component code can stay shared."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>One route model, three ways to render it</h2>
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
          <h2>Keep route definitions; configure the new entry point</h2>
        </div>
        <div class="editorial-prose">
          <p>
            A client-only app starts with <code>createSPA</code>. For server
            rendering, the server creates the initial document and the browser
            uses <code>hydrateSPA</code> to take it over. The route registry and
            components can be shared, but you still provide the server entry,
            document, and initial data.
          </p>
          <p>
            Mark non-blocking loader data with <code>defer</code> when you want
            it to resolve after the initial render. You decide which data can
            wait.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr-examples">
            View the rendering examples
          </RepositoryLink>
        </div>
      </RuledSection>
      <EditorialCTA
        title="See the SPA, SSR, and SSG setup."
        primaryHref="/docs/rendering"
        primaryLabel="Read the rendering docs"
        secondaryHref="/docs/getting-started"
        secondaryLabel="Create an app"
      />
      <MarketingPageNavigation current="/rendering" />
    </>
  );
}
