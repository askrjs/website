import { DocLayout } from '../_layout';
import type { DocMeta } from '../types';

export const meta: DocMeta = {
  slug: 'getting-started/cli-workflows',
  title: 'CLI workflows',
  summary:
    'Use the project-local askr CLI for scaffolding, updates, artifacts, and SSG.',
  section: 'Getting Started',
  order: 5,
  goal: 'Keep framework operations reproducible through one versioned command surface.',
  outcome:
    'A project that can scaffold, update, generate, and publish without ad hoc scripts.',
  prerequisites: [
    'Project dependencies installed',
    'Project-local CLI available',
  ],
  next: '/docs/foundations/actor-model',
  nextLabel: 'Understand actors',
  toc: [
    { id: 'command-surface', label: 'Command surface' },
    { id: 'dependency-workflow', label: 'Dependency workflow' },
    { id: 'static-release', label: 'Static release' },
  ],
};

const commandSurface = `askr create startkit my-app
askr create --prompt "Operations console with approvals"
askr add page audit-log
askr add action approve-request --route /requests/{id}
askr skills install
askr generate ./openapi.yml --output ./src/api
askr openapi --check`;

const dependencyWorkflow = `askr outdated
askr update
askr upgrade
npm install
npm run check`;

const staticRelease = `askr ssg \
  --config ./ssg.config.ts \
  --output ./dist \
  --workers auto`;

export function CliWorkflowsDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section id="command-surface">
        <h2>Command surface</h2>
        <p>
          Install <code>@askrjs/cli</code> in the project and invoke its
          <code>askr</code> binary from package scripts or <code>npx</code>. The
          CLI owns app creation, route/action generators, skills, typed client
          generation, OpenAPI artifacts, dependency planning, and SSG.
        </p>
        <pre class="code-block">
          <code>{commandSurface}</code>
        </pre>
      </section>

      <section id="dependency-workflow">
        <h2>Dependency workflow</h2>
        <p>
          <code>askr outdated</code> is read-only, <code>askr update</code>
          applies compatible range changes, and <code>askr upgrade</code>
          permits peer-compatible breaking range changes. These commands edit
          manifests only; install and validate separately.
        </p>
        <pre class="code-block">
          <code>{dependencyWorkflow}</code>
        </pre>
      </section>

      <section id="static-release">
        <h2>Static release</h2>
        <p>
          The SSG command loads a TypeScript config, accepts exactly one route
          source, and exits unsuccessfully when any route fails. Use
          <code>--incremental</code>, repeatable <code>--changed-route</code> or
          <code>--changed-key</code> flags, and <code>--force-full</code> when a
          release needs targeted control.
        </p>
        <pre class="code-block">
          <code>{staticRelease}</code>
        </pre>
      </section>
    </DocLayout>
  );
}
