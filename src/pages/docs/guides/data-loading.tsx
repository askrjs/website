import { DocLayout } from '../_layout';
import type { DocMeta } from '../types';

export const meta: DocMeta = {
  slug: 'guides/data-loading',
  title: 'Data loading',
  summary:
    'Use resource() for async state with cancellation and explicit UX states.',
  section: 'Guides',
  order: 3,
  goal: 'Fetch remote data with explicit loading, success, and error states.',
  outcome: 'Async UI without stale responses or duplicate updates.',
  prerequisites: [
    'Route and page shell ready',
    'Basic understanding of derive',
  ],
  next: '/docs/guides/styling-with-themes',
  nextLabel: 'Apply theme strategy',
  toc: [
    { id: 'resource-setup', label: 'Resource setup' },
    { id: 'state-feedback', label: 'State feedback' },
  ],
};

const dataCode = `import { resource } from "@askrjs/askr/resources";

export function TeamList() {
  const team = resource(async ({ signal }) => {
    const res = await fetch("/api/team", { signal });
    if (!res.ok) throw new Error("Unable to load team");
    return res.json();
  });

  if (team.pending) return <p>Loading team...</p>;
  if (team.error) return <p>Could not load team.</p>;
  return <pre>{JSON.stringify(team.value, null, 2)}</pre>;
}`;

export function DataLoadingDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section id="resource-setup">
        <h2>Resource setup</h2>
        <p>
          Use resource() for fetch calls that need lifecycle-aware cancellation
          and automatic state transitions.
        </p>
        <pre class="landing-code">
          <code>{dataCode}</code>
        </pre>
      </section>

      <section id="state-feedback">
        <h2>State feedback</h2>
        <ul>
          <li>
            Represent loading, success, and failure in distinct render branches.
          </li>
          <li>Debounce rapid user-triggered requests to avoid churn.</li>
          <li>
            Cache with intent and provide stale-while-revalidate behavior if
            needed.
          </li>
        </ul>
        <table class="docs-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Render</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>pending</td>
              <td>Skeleton, spinner, or preserved stale content.</td>
            </tr>
            <tr>
              <td>error</td>
              <td>Actionable retry message with no silent fallback.</td>
            </tr>
            <tr>
              <td>value</td>
              <td>The committed data shape for the route.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </DocLayout>
  );
}
