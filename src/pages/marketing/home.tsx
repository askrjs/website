import { Link } from '@askrjs/askr/router';
import { ArrowRightIcon } from '@askrjs/lucide';
import { Button, Container } from '@askrjs/themes/components';

const example = `import { state } from '@askrjs/askr';
import { createSPA } from '@askrjs/askr/boot';
import { createRouteRegistry, route } from '@askrjs/askr/router';

function Counter() {
  const [count, setCount] = state(0);
  return (
    <button onClick={() => setCount((value) => value + 1)}>
      Count: {count()}
    </button>
  );
}

const registry = createRouteRegistry(() => route('/', Counter));
await createSPA({ root: '#app', registry });`;

const paths = [
  {
    title: 'Create your first app',
    description:
      'Install Askr, choose a starter, and build your first application.',
    href: '/docs/getting-started',
  },
  {
    title: 'Build your interface',
    description: 'Explore components, interaction patterns, and themes.',
    href: '/docs/components',
  },
  {
    title: 'Connect the server',
    description: 'Work with HTTP routes, validation, and authentication.',
    href: '/docs/server',
  },
  {
    title: 'Look up an API',
    description:
      'Find package exports, TypeScript signatures, and reference material.',
    href: '/docs/reference',
  },
] as const;

export function HomePage() {
  return (
    <>
      <section class="landing-hero" aria-labelledby="hero-title">
        <Container class="hero__content landing-hero__inner" size="xl">
          <div class="landing-hero__copy">
            <p class="landing-eyebrow">
              Askr · TypeScript application framework
            </p>
            <h1 id="hero-title">
              TypeScript apps.
              <br />
              Explicit by design.
            </h1>
            <p class="landing-hero__lede">
              Build interfaces with function components and explicit state.
              Connect routes, data, and server code as your application grows.
            </p>
            <div class="hero__actions">
              <Button asChild>
                <Link href="/docs/getting-started">
                  Get started <ArrowRightIcon size={18} aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/docs">Read the docs</Link>
              </Button>
            </div>
            <div class="landing-install">
              <span>Create an application</span>
              <pre>
                <code>npx @askrjs/cli@latest create startkit my-app</code>
              </pre>
            </div>
            <p class="landing-hero__note">
              Open source. Apache 2.0. Built with TypeScript.
            </p>
          </div>
          <div class="landing-example">
            <div class="landing-example__header">
              <span>State and routes, in one file</span>
              <span>app.tsx</span>
            </div>
            <pre aria-label="An Askr application with state and an explicit route registry">
              <code>{example}</code>
            </pre>
            <p>
              Read the current value, update it on click, and register the page.
            </p>
          </div>
        </Container>
      </section>
      <section class="landing-paths" aria-labelledby="landing-paths-title">
        <Container direction="column" size="xl">
          <div class="landing-paths__heading">
            <h2 id="landing-paths-title">Start with the docs.</h2>
            <p>Follow a guide, explore components, or look up an API.</p>
          </div>
          <div class="landing-paths__grid">
            {paths.map((path) => (
              <Link key={path.href} href={path.href} class="landing-path">
                <h3>
                  {path.title}
                  <ArrowRightIcon size={17} aria-hidden="true" />
                </h3>
                <p>{path.description}</p>
              </Link>
            ))}
          </div>
          <p class="landing-proof">
            This site is built with Askr's static-site generator and served as
            static files.
          </p>
        </Container>
      </section>
    </>
  );
}
