import { AppShell } from '../../components/site-shell';
import { SiteAnchor } from '../../components/site-link';

const startFlow = [
  {
    title: 'Install the stack',
    href: '/docs/getting-started/installation',
    copy: 'Get askr, askr-ui, and askr-themes into your project with one pass.',
    cta: 'Install',
  },
  {
    title: 'Ship a first page',
    href: '/docs/getting-started/quick-start',
    copy: 'Create your first route and validate reactive output in minutes.',
    cta: 'Quick start',
  },
  {
    title: 'Choose architecture patterns',
    href: '/docs/getting-started/project-structure',
    copy: 'Set a structure that scales for docs, components, and future packages.',
    cta: 'Project structure',
  },
  {
    title: 'Prepare quality gates',
    href: '/docs/getting-started/development-checklist',
    copy: 'Lock checks for build output, type safety, and route coverage.',
    cta: 'Quality checklist',
  },
];

const confidenceMatrix = [
  {
    intent: 'First commit quickly',
    decision: 'I need one working page now.',
    route: '/docs/getting-started/installation',
    next: '/docs/getting-started/quick-start',
    tradeoff: 'Prioritize speed over advanced routing and theme nuance.',
  },
  {
    intent: 'Stabilize architecture',
    decision: 'I want predictable structure before adding pages.',
    route: '/docs/getting-started/project-structure',
    next: '/docs/foundations/actor-model',
    tradeoff: 'Spend an extra pass on contracts to save future refactor time.',
  },
  {
    intent: 'Ship with quality signal',
    decision: 'I need deterministic validation before release.',
    route: '/docs/getting-started/development-checklist',
    next: '/docs/foundations/actor-model',
    tradeoff: 'Shift effort from local experiments to repeatable checks.',
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
    <AppShell
      title="Start here with Askr"
      intro="One deterministic onboarding route from install to deploy, with every step linked to a practical guide."
      heroChildren={
        <div class="docs-start-hero-links">
          <SiteAnchor
            className="cta-primary"
            href="/docs/getting-started/installation"
          >
            Begin setup
          </SiteAnchor>
          <SiteAnchor className="cta-secondary" href="/docs">
            Open docs hub
          </SiteAnchor>
        </div>
      }
    >
      <section class="docs-landing-hero">
        <div class="docs-landing-heading">
          <span class="docs-kicker">Execution path</span>
          <h2>From zero to first deploy in four moves</h2>
          <p>
            This lane is the shortest route to working output. Use it when you
            want momentum before exploring optional guidance.
          </p>
        </div>
      </section>
      <section class="docs-start-zone">
        <div class="docs-start-lane">
          <span class="docs-kicker">Execution path</span>
          <h2>One-click onboarding lane</h2>
          <p>
            Each step links to a concrete page you can complete and move forward
            from.
          </p>
          <ol class="docs-start-list">
            {startFlow.map((item, index) => (
              <li>
                <strong>{`${index + 1}. ${item.title}`}</strong>
                <span>{item.copy}</span>
                <SiteAnchor href={item.href} className="docs-start-link">
                  {item.cta} →
                </SiteAnchor>
              </li>
            ))}
          </ol>
        </div>

        <div class="docs-start-lane">
          <span class="docs-kicker">Choose by outcome</span>
          <h2>Decision matrix</h2>
          <p>
            Pick a lane by desired outcome, then follow the explicit next route.
          </p>
          <div class="docs-start-matrix">
            {confidenceMatrix.map((item) => (
              <article class="docs-start-matrix-card">
                <span class="docs-kicker docs-matrix-kicker">
                  {item.intent}
                </span>
                <h3>{item.decision}</h3>
                <p>{item.tradeoff}</p>
                <SiteAnchor
                  href={item.route}
                  className="docs-start-link docs-start-link-strong"
                >
                  Start here →
                </SiteAnchor>
                <SiteAnchor href={item.next} className="docs-start-link">
                  Then →
                </SiteAnchor>
              </article>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
