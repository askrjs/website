import { DocLayout } from '../_layout';
import type { DocMeta } from '../types';
import {
  canonicalProjectStructureTree,
  structureOwnershipRows,
  structureRuleRows,
} from '../../../shared/project-structure';

export const meta: DocMeta = {
  slug: 'getting-started/project-structure',
  title: 'Project structure',
  summary:
    'Lock the repo around route-owned files, thin components, and small primitives.',
  section: 'Getting Started',
  order: 3,
  goal: 'Create folders and contracts that keep docs, pages, and components discoverable.',
  outcome: 'A workspace that multiple contributors can navigate quickly.',
  prerequisites: ['Installed Askr stack', 'A first app entrypoint'],
  next: '/docs/getting-started/development-checklist',
  nextLabel: 'Run release checklist',
  toc: [
    { id: 'directory-pattern', label: 'Directory pattern' },
    { id: 'file-rules', label: 'File rules' },
    { id: 'ownership-matrix', label: 'Ownership matrix' },
  ],
};

const routeRegistrySnippet = `import { docsRoutes } from "./docs/_routes";
import { frameworkRoutes } from "./framework/_routes";
import { homeRoutes } from "./home/_routes";
import { showcaseRoutes } from "./showcase/_routes";
import { themesRoutes } from "./themes/_routes";
import { uiRoutes } from "./ui/_routes";

export const websiteRoutes = [
  ...homeRoutes,
  ...frameworkRoutes,
  ...uiRoutes,
  ...themesRoutes,
  ...docsRoutes,
  ...showcaseRoutes,
];`;

export function ProjectStructureDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section id="directory-pattern">
        <h2>Directory pattern</h2>
        <p>
          The source tree is split by responsibility, not by framework
          abstraction. Route packs live in <code>src/pages</code>, shared
          helpers live in <code>src/shared</code>, branding lives in
          <code>src/site</code>, and framework entrypoints stay in
          <code>src/app</code>.
        </p>
        <pre class="landing-code">
          <code>{canonicalProjectStructureTree}</code>
        </pre>
      </section>

      <section id="file-rules">
        <h2>File rules</h2>
        <p>
          The checker and this page use the same rule table. That keeps the
          route contract and the docs contract aligned.
        </p>
        <table class="docs-table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Rule</th>
              <th>Examples</th>
            </tr>
          </thead>
          <tbody>
            {structureRuleRows.map((row) => (
              <tr key={row.layer}>
                <td>{row.layer}</td>
                <td>{row.rule}</td>
                <td>{row.examples.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <pre class="code-block">
          <code>{routeRegistrySnippet}</code>
        </pre>
      </section>

      <section id="ownership-matrix">
        <h2>Ownership matrix</h2>
        <p>
          Pages orchestrate, components compose, primitives stay small, shared
          code stays generic, and the site layer only wraps package-provided
          chrome when it needs to be branded.
        </p>
        <table class="docs-table">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Owns</th>
              <th>Composition</th>
              <th>Does not own</th>
            </tr>
          </thead>
          <tbody>
            {structureOwnershipRows.map((row) => (
              <tr key={row.layer}>
                <td>{row.layer}</td>
                <td>{row.owns}</td>
                <td>{row.composition}</td>
                <td>{row.doesNotOwn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </DocLayout>
  );
}
