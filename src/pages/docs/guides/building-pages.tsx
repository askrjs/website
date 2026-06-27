import { DocLayout } from '../_layout';
import type { DocMeta } from '../types';

export const meta: DocMeta = {
  slug: 'guides/building-pages',
  title: 'Building pages',
  summary: 'Author pages, reuse templates, and organize your website routes.',
  section: 'Guides',
  order: 2,
  goal: 'Create modular page patterns that scale with route growth.',
  outcome:
    'A clean page model with reusable templates and clear file ownership.',
  prerequisites: ['Installed and scaffolded project', 'Routing table in place'],
  next: '/docs/guides/data-loading',
  nextLabel: 'Learn data loading',
  toc: [
    { id: 'page-composition', label: 'Page composition' },
    { id: 'route-registration', label: 'Route registration' },
  ],
};

const pageModelCode = `export function createHomeModel() {
  return {
    title: "Askr",
    topics: ["state", "routes", "SSG"],
    next: "/docs/start",
  };
}`;

const pageRouteCode = `export const homeRoutes = [
  {
    path: "/",
    render: HomePage,
    invalidationKeys: ["route:/", "home", "site"],
    getDocumentMeta: () => ({
      title: "Askr",
      description: "Fine-grained framework and static docs.",
    }),
  },
];`;

export function BuildingPagesDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section>
        <h2 id="page-composition">Page composition</h2>
        <p>
          Build each page from small view primitives. Keep route content,
          reusable page templates, and document HTML in separate files.
        </p>
        <p>
          Shared templates help keep route output consistent across landing
          pages, docs, and showcase pages without moving page copy into the site
          shell.
        </p>
        <pre class="code-block">
          <code>{pageModelCode}</code>
        </pre>
      </section>
      <section>
        <h2 id="route-registration">Route registration</h2>
        <p>
          Register static paths through the website route table, then let
          ssg.config.ts consume those routes.
        </p>
        <p>
          Prefer route-owned `_routes` files so SPA, SSR, and SSG can share the
          same page inventory without turning the root registry into page
          content.
        </p>
        <pre class="code-block">
          <code>{pageRouteCode}</code>
        </pre>
      </section>
    </DocLayout>
  );
}
