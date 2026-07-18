import { Link } from '@askrjs/askr/router';
import { ArrowRightIcon } from '@askrjs/lucide';

export function DocsOverviewPage() {
  return (
    <article class="docs-article">
      <header class="docs-article__header">
        <h1>Build with Askr</h1>
        <p>
          Askr is a TypeScript application framework with one component and
          routing model across browser rendering, static generation, and server
          rendering.
        </p>
      </header>

      <section>
        <h2>Start with the path you need</h2>
        <p>
          If this is your first Askr project, begin with installation and a
          small route. Once it runs, the core concepts guide explains how state,
          rendering, and hydration fit together.
        </p>
        <div class="docs-link-grid">
          <Link class="docs-link-card" href="/docs/getting-started">
            <span>
              <strong>Getting started</strong>
              <small>Create and run your first application.</small>
            </span>
            <ArrowRightIcon size={18} aria-hidden="true" />
          </Link>
          <Link class="docs-link-card" href="/docs/core-concepts">
            <span>
              <strong>Core concepts</strong>
              <small>Learn the runtime and rendering model.</small>
            </span>
            <ArrowRightIcon size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section>
        <h2>Choose a rendering mode</h2>
        <p>
          Use an SPA for client-rendered applications, SSG for HTML generated at
          build time, or SSR for HTML rendered at request time. The same page
          route registry drives all three.
        </p>
      </section>
    </article>
  );
}
