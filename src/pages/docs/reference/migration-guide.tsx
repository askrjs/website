import { DocLayout } from '../_layout';
import type { DocMeta } from '../_types';

export const meta: DocMeta = {
  slug: 'reference/migration-guide',
  title: 'Migration guide',
  summary:
    'Move between package versions and architecture choices with less risk.',
  section: 'Reference',
  order: 2,
  goal: 'Plan package and pattern upgrades using low-risk rollout phases.',
  outcome:
    'Upgrades that preserve current feature delivery while removing outdated usage.',
  prerequisites: [
    'Issue triage checklist complete',
    'Current docs and tests passing',
  ],
  next: '/docs',
  nextLabel: 'Back to docs index',
  toc: [
    { id: 'migration-stages', label: 'Migration stages' },
    { id: 'rollback-plan', label: 'Rollback plan' },
  ],
};

export function MigrationGuideDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section id="migration-stages">
        <h2>Migration stages</h2>
        <p>
          Split work into three steps: compatibility pass, incremental rollout,
          then verification.
        </p>
        <table class="docs-table">
          <thead>
            <tr>
              <th>Stage</th>
              <th>Work</th>
              <th>Exit signal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Compatibility</td>
              <td>Update imports and type contracts without changing UI.</td>
              <td>Typecheck and SSG pass.</td>
            </tr>
            <tr>
              <td>Rollout</td>
              <td>Move one route or component family at a time.</td>
              <td>Previewed route has no visual regression.</td>
            </tr>
            <tr>
              <td>Verification</td>
              <td>Run full build and inspect generated metadata.</td>
              <td>Failed route count is zero.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="rollback-plan">
        <h2>Rollback plan</h2>
        <ul>
          <li>Tag each change with an explicit gate and rollback point.</li>
          <li>
            Keep old and new paths behind controlled feature flags where
            possible.
          </li>
          <li>Verify static outputs before unpinning old versions.</li>
        </ul>
      </section>
    </DocLayout>
  );
}
