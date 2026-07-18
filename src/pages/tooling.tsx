import {
  EditorialHero,
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
      <RuledSection stacked>
        <div class="editorial-section__heading">
          <h2>Begin near the application you intend to ship.</h2>
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
            <code>scaffold</code>
            <code>generate</code>
            <code>check</code>
            <code>build</code>
            <code>update</code>
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
