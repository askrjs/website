import { DocLayout } from '../../../components/doc-layout';
import type { DocMeta } from '../../../pages/shared/doc-types';

export const meta: DocMeta = {
  slug: 'getting-started/project-structure',
  title: 'Project structure',
  summary: 'Define a repeatable structure before adding features.',
  section: 'Getting Started',
  order: 3,
  goal: 'Create folders and contracts that keep docs, pages, and components discoverable.',
  outcome:
    'A predictable workspace for multiple contributors and future pages.',
  prerequisites: ['Installed Askr stack', 'A first app entrypoint'],
  next: '/docs/getting-started/development-checklist',
  nextLabel: 'Run quality checklist',
  toc: [
    { id: 'directory-pattern', label: 'Directory pattern' },
    { id: 'route-contracts', label: 'Route contracts' },
  ],
};

const layoutTree = `src/
  client.tsx
  server/
    entry-server.tsx
  components/
    site-shell.tsx
  pages/
    routes.tsx
    docs/
    shared/
    home/
  assets/
    fonts/
  styles.css
scripts/
  ssg-build.ts
ssg.config.ts`;

const routeContract = `export const websiteRoutes = [
  { path: "/", render: HomePage },
  { path: "/docs", render: DocsIndexPage },
  { path: "/docs/start", render: DocsStartPage },
];

export function getStaticRoutes() {
  return websiteRoutes.map((route) => ({
    path: route.path,
    handler: createDocumentRoute(route),
  }));
}`;

export function ProjectStructureDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section id="directory-pattern">
        <h2>Directory pattern</h2>
        <p>
          Build a route-aware structure where docs and showcase content can be
          versioned side by side.
        </p>
        <pre class="landing-code">
          <code>{layoutTree}</code>
        </pre>
      </section>

      <section id="route-contracts">
        <h2>Route contracts</h2>
        <ul>
          <li>Keep registry-driven routes in a single module.</li>
          <li>
            Group content by domain: getting-started, guides, foundations,
            reference.
          </li>
          <li>
            Keep shared page sections in `page-models` so marketing and docs
            remain aligned.
          </li>
        </ul>
        <pre class="code-block">
          <code>{routeContract}</code>
        </pre>
      </section>
    </DocLayout>
  );
}
