import { Link } from '@askrjs/askr/router';
import {
  ArrowRightIcon,
  BoxIcon,
  Code2Icon,
  GaugeIcon,
  ServerIcon,
  WrenchIcon,
} from '@askrjs/lucide';
import { Button } from '@askrjs/themes/components';

const capabilities = [
  {
    title: 'Runtime',
    description:
      'A small reactive runtime with explicit state, scopes, and predictable rendering.',
    icon: GaugeIcon,
  },
  {
    title: 'UI',
    description:
      'Accessible headless primitives and a complete default theme that stay composable.',
    icon: BoxIcon,
  },
  {
    title: 'Server',
    description:
      'Typed routes, loaders, actions, and HTTP foundations for full-stack applications.',
    icon: ServerIcon,
  },
  {
    title: 'Tooling',
    description:
      'Vite-powered development, project generation, and static output with one workflow.',
    icon: WrenchIcon,
  },
  {
    title: 'Production',
    description:
      'Choose SPA, SSG, or server rendering without changing the application model.',
    icon: Code2Icon,
  },
] as const;

export function HomePage() {
  return (
    <>
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero__glow" aria-hidden="true" />
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
            <span>$</span>
            <code>npm create askr@latest</code>
          </div>
        </div>
      </section>

      <section class="capabilities" aria-labelledby="capabilities-title">
        <div class="content-container">
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
          <div class="capability-grid">
            {capabilities.map(({ title, description, icon: Icon }, index) => (
              <article
                class={`capability-card capability-card--${String(index + 1)}`}
                key={title}
              >
                <div class="capability-card__icon">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section class="final-cta">
        <div class="content-container final-cta__panel">
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
