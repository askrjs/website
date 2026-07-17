import { Link } from '@askrjs/askr/router';

import { DocLayout } from './_layout';

const startFlow = [
  {
    title: 'Install the stack',
    href: '/docs/getting-started/installation',
    copy: 'Install the Askr runtime, UI, themes, Vite integration, and CLI.',
    cta: 'Install',
  },
  {
    title: 'Ship a first page',
    href: '/docs/getting-started/quick-start',
    copy: 'Create your first route and click through a state update.',
    cta: 'Quick start',
  },
  {
    title: 'Choose architecture patterns',
    href: '/docs/getting-started/project-structure',
    copy: 'Place pages, docs, features, and shared components where contributors can find them.',
    cta: 'Project structure',
  },
  {
    title: 'Drive the workflow with askr',
    href: '/docs/getting-started/cli-workflows',
    copy: 'Scaffold, plan package updates, generate artifacts, and build static output.',
    cta: 'CLI workflows',
  },
];

const routeMatrix = [
  {
    intent: 'First commit quickly',
    decision: 'I need one working page now.',
    route: '/docs/getting-started/installation',
    next: '/docs/getting-started/quick-start',
    tradeoff: 'Prioritize speed over advanced routing and theme nuance.',
  },
  {
    intent: 'Stabilize architecture',
    decision: 'I want a clear structure before adding pages.',
    route: '/docs/getting-started/project-structure',
    next: '/docs/foundations/actor-model',
    tradeoff: 'Spend an extra pass on contracts to save future refactor time.',
  },
  {
    intent: 'Verify before release',
    decision: 'I need checks before publishing.',
    route: '/docs/getting-started/development-checklist',
    next: '/docs/foundations/actor-model',
    tradeoff: 'Shift effort from manual inspection to repeatable checks.',
  },
  {
    intent: 'Diagnose a production issue',
    decision: 'I need to recover from a regression fast.',
    route: '/docs/reference/troubleshooting',
    next: '/docs/reference/migration-guide',
    tradeoff: 'Trade short-term speed for a safer change window.',
  },
];

export function DocsStartPage() {
  return (
    <DocLayout
      title="Start here with Askr"
      intro="A short path from install to a first deployable page, with each step linked to a practical guide."
    >
      <section class="docs-start-actions">
        <div class="docs-start-hero-links">
          <Link class="cta-primary" href="/docs/getting-started/installation">
            Begin setup
          </Link>
          <Link class="cta-secondary" href="/docs">
            Open docs hub
          </Link>
        </div>
      </section>
      <section class="docs-start-zone">
        <div class="docs-start-lane">
          <span class="docs-kicker">Execution path</span>
          <h2>Four steps to a working static site</h2>
          <p>
            Complete these in order when you want the shortest path through the
            docs.
          </p>
          <ol class="docs-start-list">
            {startFlow.map((item) => (
              <li key={item.href}>
                <strong>{item.title}</strong>
                <span>{item.copy}</span>
                <Link href={item.href} class="docs-start-link">
                  {item.cta} →
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <div class="docs-start-lane">
          <span class="docs-kicker">Choose by outcome</span>
          <h2>Pick the right next page</h2>
          <p>Use this when you already know what you need to unblock.</p>
          <div class="docs-start-matrix">
            {routeMatrix.map((item) => (
              <article key={item.route} class="docs-start-matrix-card">
                <span class="docs-kicker docs-matrix-kicker">
                  {item.intent}
                </span>
                <h3>{item.decision}</h3>
                <p>{item.tradeoff}</p>
                <Link
                  href={item.route}
                  class="docs-start-link docs-start-link-strong"
                >
                  Start here →
                </Link>
                <Link href={item.next} class="docs-start-link">
                  Then →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </DocLayout>
  );
}
