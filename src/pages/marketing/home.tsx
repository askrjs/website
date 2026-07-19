import { Link } from '@askrjs/askr/router';
import { ArrowRightIcon } from '@askrjs/lucide';
import { Button, Container } from '@askrjs/themes/components';
import { marketingPages } from './catalog';
import { RepositoryLink } from './components';

const capabilities = marketingPages.slice(1);
const routeSpecimen = `import {
  createRouteRegistry,
  group,
  route,
} from '@askrjs/askr/router';

export const routes = createRouteRegistry(() => {
  group({ layout: AppLayout }, () => {
    route('/', OverviewPage);
    route('/activity', ActivityPage);
    route('/*', NotFoundPage);
  });
});`;

export function HomePage() {
  return (
    <>
      <section class="hero" aria-labelledby="hero-title">
        <Container class="hero__content" size="xl">
          <h1 id="hero-title">
            A full-stack TypeScript framework you can read top to bottom.
          </h1>
          <p class="hero__lede">
            One route registry drives your components, your server, and your
            build output — so you can trace a request from URL to response
            without guessing what a file-based convention decided for you.
          </p>
          <div class="hero__actions">
            <Button asChild>
              <Link href="/platform">
                Get started
                <ArrowRightIcon size={18} aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild>
              <a href="/docs">Read the docs</a>
            </Button>
          </div>
          <div class="hero__code" aria-label="Install Askr">
            <span>Start a project</span>
            <code>npx @askrjs/cli@latest create startkit my-app</code>
          </div>
        </Container>
      </section>

      <section class="differentiation" aria-labelledby="differentiation-title">
        <Container class="differentiation__inner" size="xl">
          <div class="differentiation__heading">
            <h2 id="differentiation-title">This is the whole routing layer.</h2>
            <p>
              No folder-name magic, no generated manifest to reverse-engineer.
              Routes, layouts, and the data they load are declared once, in code
              you can open and read.
            </p>
          </div>
          <div class="differentiation__body">
            <pre aria-label="An explicit Askr route registry">
              <code>
                <span>{routeSpecimen}</span>
              </code>
            </pre>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <h3>Grep the route table, not a file tree</h3>
                  <p>
                    Every path, layout, and param lives in this one registry —
                    not scattered across a folder-naming convention.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Pick your rendering mode later</h3>
                  <p>
                    Write the app once. Ship it as an SPA, hydrate it from
                    server HTML, or pre-render it — swap modes without a
                    rewrite.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Server code lives next to the routes it serves</h3>
                  <p>
                    Auth policies, schemas, and dependencies are wired in at the
                    same root, so you can see what a route requires.
                  </p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <h3>Deploy a folder of HTML or a small Node process</h3>
                  <p>
                    Nothing exotic to operate — static hosting or a plain
                    adapter, your call.
                  </p>
                </div>
              </li>
            </ol>
          </div>
          <div class="differentiation__links">
            <RepositoryLink href="https://github.com/askrjs/askr">
              Read the framework source
            </RepositoryLink>
            <RepositoryLink href="https://github.com/askrjs/askr-examples">
              Compare first-party examples
            </RepositoryLink>
          </div>
        </Container>
      </section>

      <section
        class="capabilities"
        id="platform"
        aria-labelledby="capabilities-title"
      >
        <Container class="capabilities__inner" size="xl">
          <div class="section-heading">
            <h2 id="capabilities-title">
              Start with routes and a runtime. Add the rest when you need it.
            </h2>
            <p>
              A themed component library, a server, auth, and build tooling are
              all available — none of them required on day one.
            </p>
            <Link class="section-heading__link" href="/platform">
              Explore the platform
              <ArrowRightIcon size={16} aria-hidden="true" />
            </Link>
          </div>
          <div class="capability-list">
            {capabilities.map((capability, index) => (
              <Link
                key={capability.path}
                class="capability-item"
                href={capability.path}
              >
                <span class="capability-item__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{capability.label}</h3>
                <p>{capability.homepageSummary}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section class="final-cta" id="get-started">
        <Container class="final-cta__inner" size="xl">
          <div>
            <h2>Start with the application you need to ship.</h2>
            <p>
              Choose the closest starter, keep the generated files in view, and
              add rendering, server, and production capabilities only when the
              application calls for them.
            </p>
          </div>
          <Button asChild>
            <a href="/docs/getting-started">
              Open the documentation
              <ArrowRightIcon size={18} aria-hidden="true" />
            </a>
          </Button>
        </Container>
      </section>
    </>
  );
}
