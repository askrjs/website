import { DocLayout } from '../_layout';
import type { DocMeta } from '../types';

export const meta: DocMeta = {
  slug: 'getting-started/installation',
  title: 'Installation',
  summary: 'Install the Askr runtime, packages, Vite plugin, and CLI.',
  section: 'Getting Started',
  order: 1,
  goal: 'Set up dependencies with clear versions and a single package-manager strategy.',
  outcome: 'A workspace that installs and boots reliably on fresh machines.',
  prerequisites: [
    'Node.js 20.19+ or 22.12+ for the current build toolchain',
    'A modern package manager (pnpm, npm, or yarn)',
  ],
  next: '/docs/getting-started/quick-start',
  nextLabel: 'Continue to quick start',
  toc: [
    { id: 'project-setup', label: 'Project setup' },
    { id: 'tooling', label: 'CLI and build tooling' },
    { id: 'recommended-baseline', label: 'Recommended baseline' },
  ],
};

const installCommand = `npm install @askrjs/askr @askrjs/ui @askrjs/themes @askrjs/lucide @askrjs/logos`;
const toolingCommand = `npm install --save-dev @askrjs/cli @askrjs/vite vite-plus typescript`;

const scriptBaseline = `"scripts": {
  "dev": "vp dev",
  "fmt": "vp fmt .",
  "lint": "vp lint src scripts ssg.config.ts vite.config.ts",
  "typecheck": "tsc --noEmit",
  "build": "npm run build:client && npm run build:ssr && npm run generate",
  "generate": "askr ssg --config ./ssg.config.ts --output ./dist",
  "verify:static": "tsx --tsconfig ./tsconfig.ssg.json ./scripts/verify-static-output.ts",
  "preview": "vp preview"
}`;

export function InstallationDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section id="project-setup">
        <h2>Project setup</h2>
        <p>
          Start with an ESM TypeScript project and install the runtime,
          component, theme, icon, and logo packages from the same package
          manager.
        </p>
        <pre class="code-block">
          <code>{installCommand}</code>
        </pre>
        <dl class="docs-definition-grid">
          <div>
            <dt>@askrjs/askr</dt>
            <dd>State, derived values, routing, boot, SSR, and SSG.</dd>
          </div>
          <div>
            <dt>@askrjs/ui</dt>
            <dd>
              Headless primitives for forms, overlays, navigation, and feedback.
            </dd>
          </div>
          <div>
            <dt>@askrjs/themes</dt>
            <dd>
              Semantic CSS tokens and themed controls used by the site layer.
            </dd>
          </div>
        </dl>
      </section>
      <section id="tooling">
        <h2>CLI and build tooling</h2>
        <p>
          Keep the CLI project-local so builds use the version recorded in the
          lockfile. The <code>askr</code> command owns scaffolding, generators,
          skills, dependency planning, OpenAPI artifacts, and SSG.
        </p>
        <pre class="code-block">
          <code>{toolingCommand}</code>
        </pre>
      </section>
      <section id="recommended-baseline">
        <h2>Recommended baseline</h2>
        <p>
          Add the scripts before the first page lands. The important part is not
          the exact names; it is that formatting, linting, typing, client build,
          SSR build, static generation, static verification, and preview are
          ordinary local commands.
        </p>
        <pre class="code-block">
          <code>{scriptBaseline}</code>
        </pre>
        <ul class="docs-checklist">
          <li>One lockfile is committed.</li>
          <li>Vite Plus owns dev, formatting, linting, build, and preview.</li>
          <li>
            The build creates client assets and the SSR bundle before static
            generation publishes routes and assets through the Askr CLI.
          </li>
        </ul>
      </section>
    </DocLayout>
  );
}
