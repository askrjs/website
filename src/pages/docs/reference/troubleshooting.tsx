import { DocLayout } from '../_layout';
import type { DocMeta } from '../types';

export const meta: DocMeta = {
  slug: 'reference/troubleshooting',
  title: 'Troubleshooting',
  summary:
    'Find and fix the highest-frequency breakages in Askr docs and apps.',
  section: 'Reference',
  order: 1,
  goal: 'Resolve stale markup, route errors, and missing styles quickly.',
  outcome: 'A reduced time-to-recovery for common regressions.',
  prerequisites: [
    'At least one fully generated page available',
    'Build logs accessible',
  ],
  next: '/docs/reference/migration-guide',
  nextLabel: 'Review migration guide',
  toc: [
    { id: 'common-failures', label: 'Common failures' },
    { id: 'resolution-playbook', label: 'Resolution playbook' },
  ],
};

export function TroubleshootingDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section id="common-failures">
        <h2>Common failures</h2>
        <ul>
          <li>Theme flash before CSS load.</li>
          <li>Routes rendering without expected wrappers.</li>
          <li>Static page missing assets after deployment.</li>
        </ul>
        <table class="docs-table">
          <thead>
            <tr>
              <th>Symptom</th>
              <th>Likely cause</th>
              <th>First fix</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SSG reports failed routes</td>
              <td>Render-time router API misuse or thrown component.</td>
              <td>
                Check metadata.json, then render the failed route locally.
              </td>
            </tr>
            <tr>
              <td>Theme changes after paint</td>
              <td>Theme attribute is set after CSS loads.</td>
              <td>Run the theme init script in the document head.</td>
            </tr>
            <tr>
              <td>Assets missing on deep routes</td>
              <td>Relative paths in generated HTML.</td>
              <td>Use root-relative CSS and JS asset URLs.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="resolution-playbook">
        <h2>Resolution playbook</h2>
        <p>
          Start from the most recent build and verify config, then trace route
          metadata and file paths.
        </p>
        <ol class="docs-checklist">
          <li>Run typecheck to catch API drift.</li>
          <li>Run the SSG build and inspect failed route messages.</li>
          <li>Open the generated HTML for the failing path.</li>
          <li>Verify shared CSS, tokens, and app bundle paths.</li>
        </ol>
      </section>
    </DocLayout>
  );
}
