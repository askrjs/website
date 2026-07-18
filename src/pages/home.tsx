import { Link } from '@askrjs/askr/router';
import { ArrowRightIcon } from '@askrjs/lucide';
import { Button } from '@askrjs/themes/components';

const capabilities = [
  {
    title: 'Runtime',
    description:
      'A small reactive runtime with explicit state, scopes, and predictable rendering.',
  },
  {
    title: 'UI',
    description:
      'Accessible headless primitives and a complete default theme that stay composable.',
  },
  {
    title: 'Server',
    description:
      'Typed routes, loaders, actions, and HTTP foundations for full-stack applications.',
  },
  {
    title: 'Tooling',
    description:
      'Vite-powered development, project generation, and static output with one workflow.',
  },
  {
    title: 'Production',
    description:
      'Choose SPA, SSG, or server rendering without changing the application model.',
  },
] as const;

export function HomePage() {
  return (
    <>
      <section class="hero" aria-labelledby="hero-title">
        <div class="content-container hero__content">
          <p class="eyebrow">The TypeScript application framework</p>
          <h1 id="hero-title">Build full-stack TypeScript apps with Askr.</h1>
          <p class="hero__lede">
            A focused framework for building fast, typed applications across the
            browser and server—without giving up control of the platform beneath
            them.
          </p>
          <div class="hero__actions">
            <Button asChild size="lg">
              <Link href="/docs/getting-started">
                Get started
                <ArrowRightIcon size={18} aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/docs">Read the docs</Link>
            </Button>
          </div>
          <div class="hero__code" aria-label="Install Askr">
            <span>Start a project</span>
            <code>npm create askr@latest</code>
          </div>
        </div>
      </section>

      <section class="capabilities" aria-labelledby="capabilities-title">
        <div class="content-container capabilities__inner">
          <div class="section-heading">
            <p class="eyebrow">One coherent stack</p>
            <h2 id="capabilities-title">
              The pieces you need. Nothing hidden.
            </h2>
            <p>
              Start with a route and grow into a production application using
              contracts that fit together from end to end.
            </p>
          </div>
          <div class="capability-list">
            {capabilities.map(({ title, description }, index) => (
              <article class="capability-item" key={title}>
                <span class="capability-item__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section class="final-cta">
        <div class="content-container final-cta__inner">
          <div>
            <p class="eyebrow">Ready to build?</p>
            <h2>Take the direct path from idea to application.</h2>
          </div>
          <Button asChild size="lg">
            <Link href="/docs/getting-started">
              Open the documentation
              <ArrowRightIcon size={18} aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
