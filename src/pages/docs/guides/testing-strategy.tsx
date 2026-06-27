import { DocLayout } from '../_layout';
import type { DocMeta } from '../types';

export const meta: DocMeta = {
  slug: 'guides/testing-strategy',
  title: 'Testing strategy',
  summary: 'Build coverage around rendering flow, routes, and async behavior.',
  section: 'Guides',
  order: 6,
  goal: 'Verify route output, loading behavior, and interaction contracts before production.',
  outcome:
    'Lower incident rate from regressions in navigation and dynamic content.',
  prerequisites: ['Core pages and data loading working'],
  next: '/docs/guides/deployment-and-hosting',
  nextLabel: 'Prepare deployment',
  toc: [
    { id: 'test-pyramid', label: 'Test pyramid' },
    { id: 'route-contract', label: 'Route contract tests' },
  ],
};

const routeSmokeCode = `import { websiteRoutes } from "../pages/_routes";

for (const route of websiteRoutes) {
  if (!route.path.startsWith("/")) {
    throw new Error("Route must be absolute: " + route.path);
  }
}`;

export function TestingStrategyDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section id="test-pyramid">
        <h2>Test pyramid</h2>
        <ul>
          <li>
            Unit tests for pure helpers, derive pipelines, and route selectors.
          </li>
          <li>Integration checks for page models and route tables.</li>
          <li>Smoke checks for generated static output paths.</li>
        </ul>
        <pre class="code-block">
          <code>npm run lint && npm run typecheck && npm run build</code>
        </pre>
      </section>

      <section id="route-contract">
        <h2>Route contract tests</h2>
        <p>
          Validate that every route in your registry renders and carries
          complete metadata.
        </p>
        <pre class="code-block">
          <code>{routeSmokeCode}</code>
        </pre>
      </section>
    </DocLayout>
  );
}
