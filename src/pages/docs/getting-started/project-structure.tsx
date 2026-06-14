import { DocLayout } from '../_layout';
import type { DocMeta } from '../_types';

export const meta: DocMeta = {
  slug: 'getting-started/project-structure',
  title: 'Project structure',
  summary: 'Define a repeatable structure before adding features.',
  section: 'Getting Started',
  order: 3,
  goal: 'Create folders and contracts that keep docs, pages, and components discoverable.',
  outcome: 'A workspace that multiple contributors can navigate quickly.',
  prerequisites: ['Installed Askr stack', 'A first app entrypoint'],
  next: '/docs/getting-started/development-checklist',
  nextLabel: 'Run release checklist',
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
    app-providers.tsx
    site-shell/
    page-templates/
    page-primitives/
  features/
    home/
      content.ts
      model.ts
      sections/
    ui/
      registry/
      demos/
      model/
  lib/
    site-nav.ts
  pages/
    _routes.tsx
    _types.ts
    home.tsx
    framework.tsx
    ui.tsx
    themes.tsx
    docs/
      _routes.tsx
      _layout.tsx
      _content.ts
      _registry.ts
      getting-started/
      guides/
    showcase/
      _routes.tsx
      askr.tsx
      ui.tsx
      themes.tsx
      ui/
        _component-detail.tsx
        components/
          _routes.tsx
          button.tsx
  styles.css
scripts/
  ssg-build.ts
ssg.config.ts`;

const routeContract = `import { docsRoutes } from "./docs/_routes";
import { showcaseRoutes } from "./showcase/_routes";

const staticRoutes = [
  { path: "/", render: HomePage, invalidationKeys: ["route:/", "home"] },
  { path: "/ui", render: UiLandingPage, invalidationKeys: ["route:/ui", "ui-components"] },
];

export const websiteRoutes = [
  ...staticRoutes,
  ...docsRoutes,
  ...showcaseRoutes,
];

export function getStaticRoutes() {
  return websiteRoutes.map((route) => ({
    path: route.path,
    handler: route.render,
    invalidationKeys: route.invalidationKeys,
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
          <li>
            Keep route group registries in `_routes.tsx` files beside the pages
            they own.
          </li>
          <li>
            Group content by domain: getting-started, guides, foundations,
            reference.
          </li>
          <li>
            Move reusable content, models, demos, and registries into
            `features`; reserve `lib` for cross-site contracts.
          </li>
        </ul>
        <pre class="code-block">
          <code>{routeContract}</code>
        </pre>
      </section>
    </DocLayout>
  );
}
