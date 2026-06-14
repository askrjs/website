import { DocLayout } from '../_layout';
import type { DocMeta } from '../_types';

export const meta: DocMeta = {
  slug: 'foundations/rendering-strategy',
  title: 'Rendering strategy',
  summary:
    'Choose between state-driven updates and route-level rendering modes.',
  section: 'Foundations',
  order: 2,
  goal: 'Understand how updates, hydration, and route transitions behave across modes.',
  outcome:
    'A rendering plan that separates component updates from route delivery.',
  prerequisites: ['Actor model basics', 'Route registry in place'],
  next: '/docs/guides/ssg-overview',
  nextLabel: 'Choose runtime mode',
  toc: [
    { id: 'runtime-choice', label: 'Runtime choice' },
    { id: 'dom-update-path', label: 'DOM update path' },
  ],
};

export function RenderingStrategyDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section id="runtime-choice">
        <h2>Runtime choice</h2>
        <p>
          Fine-grained updates are runtime-agnostic; the execution mode decides
          whether output is hydrated in place, rendered server-side, or
          pre-rendered into static files.
        </p>
        <table class="docs-table">
          <thead>
            <tr>
              <th>Mode</th>
              <th>Use when</th>
              <th>Tradeoff</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SPA</td>
              <td>The page is app-like after first load.</td>
              <td>Fast transitions, more client ownership.</td>
            </tr>
            <tr>
              <td>SSR</td>
              <td>HTML must be generated per request.</td>
              <td>Fresh output, server runtime required.</td>
            </tr>
            <tr>
              <td>SSG</td>
              <td>Routes can be generated at build time.</td>
              <td>Static files, rebuild needed for content changes.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="dom-update-path">
        <h2>DOM update path</h2>
        <p>
          Keep expensive render branches behind route boundaries. If a full
          rerender is not needed, avoid forcing component-wide updates.
        </p>
      </section>
    </DocLayout>
  );
}
