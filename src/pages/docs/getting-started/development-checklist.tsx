import { DocLayout } from '../../../components/doc-layout';
import type { DocMeta } from '../../../pages/shared/doc-types';

export const meta: DocMeta = {
  slug: 'getting-started/development-checklist',
  title: 'Development checklist',
  summary:
    'Establish quality gates that prevent regressions as pages multiply.',
  section: 'Getting Started',
  order: 4,
  goal: 'Create a stable baseline process for local and CI validation.',
  outcome:
    'Reliable builds with repeatable checks and faster onboarding for new contributors.',
  prerequisites: ['Project structure complete', 'Script runner configured'],
  next: '/docs/foundations/actor-model',
  nextLabel: 'Understand actors',
  toc: [
    { id: 'toolchain-gates', label: 'Toolchain gates' },
    { id: 'build-proofs', label: 'Build proofs' },
  ],
};

const qualityCommand = `npm run fmt
npm run lint
npm run typecheck
npm run build`;

const metadataCheck = `node -e "const m=require('./dist/metadata.json');
if (m.failed || m.successful !== m.totalRoutes) process.exit(1);
console.log({ total: m.totalRoutes, successful: m.successful });"`;

export function DevelopmentChecklistDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section id="toolchain-gates">
        <h2>Toolchain gates</h2>
        <ul>
          <li>
            Run type-check, lint, and build in one command so failures stay in
            one location.
          </li>
          <li>
            Keep environment-specific configs at the boundary, not inside page
            files.
          </li>
          <li>
            Fail fast on route registration mismatches and missing shared
            tokens.
          </li>
        </ul>
        <pre class="code-block">
          <code>{qualityCommand}</code>
        </pre>
      </section>

      <section id="build-proofs">
        <h2>Build proofs</h2>
        <p>
          Keep a `dist` inspection step in your CI to detect asset shape changes
          early.
        </p>
        <p>
          Store one sample build output and compare route count, generated file
          count, and route-level errors before merging large content changes.
        </p>
        <pre class="code-block">
          <code>{metadataCheck}</code>
        </pre>
      </section>
    </DocLayout>
  );
}
