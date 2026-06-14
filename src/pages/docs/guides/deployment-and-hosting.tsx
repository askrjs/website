import { DocLayout } from '../../../components/doc-layout';
import type { DocMeta } from '../../../pages/shared/doc-types';

export const meta: DocMeta = {
  slug: 'guides/deployment-and-hosting',
  title: 'Deployment and hosting',
  summary:
    'Generate static output, attach build artifacts, and deploy with confidence.',
  section: 'Guides',
  order: 7,
  goal: 'Move from local validation to repeatable deploys on any static host.',
  outcome:
    'A release process where every environment gets the same generated shape.',
  prerequisites: ['Static registry working', 'Checked build gate'],
  next: '/docs/guides/seo-and-metadata',
  nextLabel: 'Finish metadata',
  toc: [
    { id: 'host-matrix', label: 'Host matrix' },
    { id: 'artifact-review', label: 'Artifact review' },
  ],
};

export function DeploymentAndHostingDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section id="host-matrix">
        <h2>Host matrix</h2>
        <p>
          Keep one canonical output target and host-specific rewrites. Most
          static providers accept the same folder structure.
        </p>
        <table class="docs-table">
          <thead>
            <tr>
              <th>Host</th>
              <th>Publish directory</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GitHub Pages</td>
              <td>dist</td>
              <td>Use a static artifact upload step.</td>
            </tr>
            <tr>
              <td>Netlify</td>
              <td>dist</td>
              <td>Set build command to npm run build.</td>
            </tr>
            <tr>
              <td>Vercel</td>
              <td>dist</td>
              <td>Disable framework auto-detection if needed.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section id="artifact-review">
        <h2>Artifact review</h2>
        <ul>
          <li>Track route count and generated file count per release.</li>
          <li>Inspect CSS and theme token files for missing assets.</li>
          <li>Verify immutable cache headers for hashed bundles.</li>
        </ul>
      </section>
    </DocLayout>
  );
}
