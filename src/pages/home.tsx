import { Link } from '@askrjs/askr/router';
import { ArrowRightIcon } from '@askrjs/lucide';
import { Button, Container } from '@askrjs/themes/components';
import { marketingPages } from './_marketing-catalog';
import { RepositoryLink } from './_marketing';

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
            Build full-stack TypeScript that stays explicit.
          </h1>
          <p class="hero__lede">
            One visible route model. Inspectable state and dependencies.
            Browser, server, or static output from ordinary project files.
          </p>
          <div class="hero__actions">
            <Button asChild>
              <Link href="/platform">
                Get started
                <ArrowRightIcon size={18} aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild>
              <Link href="/docs">Read the docs</Link>
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
            <h2 id="differentiation-title">
              The framework composes. Your application stays visible.
            </h2>
            <p>
              Askr connects the layers without turning them into hidden
              conventions or a second application architecture.
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
                  <h3>One visible route graph</h3>
                  <p>
                    Routes, layouts, loaders, and actions remain inspectable.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Rendering is a delivery choice</h3>
                  <p>
                    Use the same routes for browser, server, or static HTML.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Full-stack seams stay named</h3>
                  <p>
                    Schemas, policies, and dependencies meet at a visible root.
                  </p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <h3>Output stays ordinary</h3>
                  <p>
                    Ship static documents and assets or a thin Node adapter.
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
              Take the layers you need. Keep the boundaries explicit.
            </h2>
            <p>
              Start with runtime and routes. Add themes, server capabilities,
              and build tooling as requirements grow.
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
            <Link href="/docs/getting-started">
              Open the documentation
              <ArrowRightIcon size={18} aria-hidden="true" />
            </Link>
          </Button>
        </Container>
      </section>
    </>
  );
}
