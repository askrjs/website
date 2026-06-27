import { DocLayout } from '../_layout';
import type { DocMeta } from '../types';

export const meta: DocMeta = {
  slug: 'foundations/actor-model',
  title: 'Actor model fundamentals',
  summary: 'Understand how actor-backed state reduces accidental re-rendering.',
  section: 'Foundations',
  order: 1,
  goal: 'Grasp how state updates are scoped to dependent DOM updates.',
  outcome: 'You can reason about performance and avoid broad UI invalidation.',
  prerequisites: ['Installed packages', 'Basic familiarity with components'],
  next: '/docs/foundations/rendering-strategy',
  nextLabel: 'Learn rendering strategy',
  toc: [
    { id: 'actor-boundaries', label: 'Actor boundaries' },
    { id: 'state-vs-derive', label: 'State vs derive' },
  ],
};

const actorCode = `import { state, derive } from "@askrjs/askr";

export function PriceCell() {
  const [quantity, setQuantity] = state(1);
  const subtotal = derive(() => quantity() * 24);

  return (
    <output data-quantity={quantity()}>
      ${'${subtotal()}'}
    </output>
  );
}`;

export function ActorModelDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section id="actor-boundaries">
        <h2>Actor boundaries</h2>
        <p>
          Treat each state holder as its own runtime actor. Updates should
          change only the nodes that reference the signal.
        </p>
        <ul>
          <li>Model mutable domain state in dedicated atoms.</li>
          <li>Keep async effects off of render paths when possible.</li>
          <li>Use derived values for computed read-only outputs.</li>
        </ul>
        <pre class="code-block">
          <code>{actorCode}</code>
        </pre>
      </section>

      <section id="state-vs-derive">
        <h2>State vs derive</h2>
        <p>
          Use base state for mutable source-of-truth. Use derive for anything
          computed from one or more sources.
        </p>
        <table class="docs-table">
          <thead>
            <tr>
              <th>Need</th>
              <th>Use</th>
              <th>Why</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>User-editable value</td>
              <td>state()</td>
              <td>It owns writes through an explicit setter.</td>
            </tr>
            <tr>
              <td>Computed display value</td>
              <td>derive()</td>
              <td>
                It recomputes from tracked reads without becoming mutable.
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </DocLayout>
  );
}
