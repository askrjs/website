import {
  EditorialHero,
  MarketingPageNavigation,
  RepositoryLink,
  RuledSection,
} from './components';

export function ToolingPage() {
  return (
    <>
      <EditorialHero
        title="The CLI writes files you're expected to read and edit."
        lede="Every generated file shows up as a normal diff. Nothing is written to a hidden build directory you're not supposed to look at."
      />
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Five starters, picked by what you're actually building</h2>
        </div>
        <ol class="starter-path" aria-label="Askr application starters">
          <li>
            <div class="starter-path__marker">
              <span>01</span>
              <span class="starter-path__arrow" aria-hidden="true">
                →
              </span>
            </div>
            <h3>Startkit</h3>
            <p>Components, state, and routes.</p>
            <small>startkit</small>
          </li>
          <li>
            <div class="starter-path__marker">
              <span>02</span>
              <span class="starter-path__arrow" aria-hidden="true">
                →
              </span>
            </div>
            <h3>Single Page Application</h3>
            <p>A browser-owned application.</p>
            <small>spa</small>
          </li>
          <li>
            <div class="starter-path__marker">
              <span>03</span>
              <span class="starter-path__arrow" aria-hidden="true">
                →
              </span>
            </div>
            <h3>Server Side Rendering</h3>
            <p>Server HTML with hydration.</p>
            <small>ssr</small>
          </li>
          <li>
            <div class="starter-path__marker">
              <span>04</span>
              <span class="starter-path__arrow" aria-hidden="true">
                →
              </span>
            </div>
            <h3>Full Stack</h3>
            <p>Pages, actions, APIs, and Node.</p>
            <small>full-stack</small>
          </li>
          <li>
            <div class="starter-path__marker">
              <span>05</span>
            </div>
            <h3>Static Site Generation</h3>
            <p>HTML written at build time.</p>
            <small>ssg</small>
          </li>
        </ol>
      </RuledSection>
      <RuledSection>
        <div class="editorial-section__heading">
          <h2>Generators write plain files; checks catch drift</h2>
        </div>
        <div class="editorial-prose">
          <p>
            <code>askr add page</code> and <code>askr add action</code> write a
            normal component and a normal handler — review them like any other
            change before you commit. <code>askr openapi --check</code> fails CI
            when your schemas and your committed OpenAPI spec disagree, instead
            of letting a client silently go stale.
          </p>
          <p>
            <code>askr update</code> only applies peer-compatible changes;
            reaching for the latest peer set at all is a separate, deliberate{' '}
            <code>askr upgrade</code>. And if you use an AI coding assistant,{' '}
            <code>askr skills</code> checks in project-specific instructions so
            it doesn't have to rediscover your conventions every session.
          </p>
          <RepositoryLink href="https://github.com/askrjs/askr-cli">
            View the CLI and starters
          </RepositoryLink>
        </div>
      </RuledSection>
      <MarketingPageNavigation current="/tooling" />
    </>
  );
}
