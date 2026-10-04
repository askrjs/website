import { Link } from '@askrjs/askr/router';
import { ArrowRightIcon } from '@askrjs/lucide';
import { Button, Container } from '@askrjs/themes/components';
import { marketingPages } from './catalog';
import { RepositoryLink } from './components';

const capabilities = marketingPages.slice(1);
const routeSpecimen = `import {
  createRouteRegistry,
  fallback,
  group,
  route,
} from '@askrjs/askr/router';

export const pageRegistry = createRouteRegistry(() => {
  group({ layout: AppLayout }, () => {
    route('/', OverviewPage);
    route('/activity', ActivityPage);
    fallback(NotFoundPage);
  });
});`;

export function HomePage() {
  return (
    <>
      <section class="hero" aria-labelledby="hero-title">
        <Container class="hero__content" size="xl">
          <h1 id="hero-title">
            Build full-stack TypeScript apps with routes declared in code.
          </h1>
          <p class="hero__lede">
            Routes, layouts, and loaders live in one explicit registry. Reuse it
            for browser navigation, server rendering, or static generation.
          </p>
          <div class="hero__actions">
            <Button asChild>
              <Link href="/docs/getting-started">
                Get started
                <ArrowRightIcon size={18} aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/platform">Explore the platform</Link>
            </Button>
          </div>
          <div class="hero__code" aria-label="Install Askr">
            <span>Start a project</span>
            <code>npx @askrjs/cli@latest create startkit my-app</code>
          </div>
          <p class="hero__proof">
            This site is built with Askr's static-site generator and served as
            static files.
          </p>
        </Container>
      </section>

      <section class="differentiation" aria-labelledby="differentiation-title">
        <Container class="differentiation__inner" direction="column" size="xl">
          <div class="differentiation__heading">
            <h2 id="differentiation-title">
              Routes are explicit data you can inspect.
            </h2>
            <p>
              Askr does not infer routes from folder names. You declare paths,
              layouts, and route behavior in code, then pass that registry to
              the browser, server renderer, or static generator.
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
                  <h3>Export the route table as a value</h3>
                  <p>
                    Define paths, layouts, and parameters in one registry, then
                    pass it to the code that renders the app.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Reuse routes across rendering modes</h3>
                  <p>
                    Use the same route registry for a client-rendered app, a
                    server-rendered page with hydration, or static output. Each
                    mode has its own entry point and build setup.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Make server requirements explicit</h3>
                  <p>
                    Compose route policies, schemas, and services in code, so
                    you can see what each server route needs.
                  </p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <h3>Choose static files or a server</h3>
                  <p>
                    Build HTML and assets for static hosting, or use the Node
                    adapter for request-time server code.
                  </p>
                </div>
              </li>
            </ol>
          </div>
          <div class="differentiation__links">
            <RepositoryLink href="https://github.com/askrjs/askr">
              Read the runtime source
            </RepositoryLink>
            <RepositoryLink href="https://github.com/askrjs/askr-examples">
              Compare the example applications
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
              Add components, server code, and build tools as the app grows.
            </h2>
            <p>
              A themed component library, a server, auth, and build tooling are
              available to add as your application needs them.
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
            <h2>Start with a project template.</h2>
            <p>
              Choose a starter, keep its generated files in your project, and
              add rendering or server capabilities when your application needs
              them. Your route registry stays explicit as the app grows.
            </p>
          </div>
          <Button asChild>
            <Link href="/docs/getting-started">
              Create an app
              <ArrowRightIcon size={18} aria-hidden="true" />
            </Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
