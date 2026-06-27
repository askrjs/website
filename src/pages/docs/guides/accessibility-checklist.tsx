import { DocLayout } from '../_layout';
import type { DocMeta } from '../types';

export const meta: DocMeta = {
  slug: 'guides/accessibility-checklist',
  title: 'Accessibility checklist',
  summary:
    'Keep UI behavior and keyboard flow clear across interactive modules.',
  section: 'Guides',
  order: 5,
  goal: 'Check keyboard, focus, label, and status behavior before release.',
  outcome:
    'A product that keeps focus management, labels, and semantics consistent.',
  prerequisites: [
    'Theme and page structure complete',
    'Primary components in place',
  ],
  next: '/docs/guides/testing-strategy',
  nextLabel: 'Build testing strategy',
  toc: [
    { id: 'focus-control', label: 'Focus control' },
    { id: 'semantic-audit', label: 'Semantic audit' },
  ],
};

export function AccessibilityChecklistDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section id="focus-control">
        <h2>Focus control</h2>
        <p>
          Confirm initial focus, trap boundaries, and logical tab order for
          every overlay, menu, and dialog.
        </p>
        <ul class="docs-checklist">
          <li>Open overlays move focus to the first meaningful control.</li>
          <li>Escape and outside interactions close dismissable layers.</li>
          <li>Tab order never leaves a modal dialog while it is open.</li>
        </ul>
      </section>

      <section id="semantic-audit">
        <h2>Semantic audit</h2>
        <ul>
          <li>Each control has an accessible name.</li>
          <li>Status and validation states are communicated clearly.</li>
          <li>Interactive elements keep expected keyboard bindings.</li>
        </ul>
        <table class="docs-table">
          <thead>
            <tr>
              <th>Component family</th>
              <th>Keyboard check</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tabs, menu, select</td>
              <td>Arrow keys move between options.</td>
            </tr>
            <tr>
              <td>Dialog, popover, tooltip</td>
              <td>Escape closes the layer and returns focus.</td>
            </tr>
          </tbody>
        </table>
      </section>
    </DocLayout>
  );
}
