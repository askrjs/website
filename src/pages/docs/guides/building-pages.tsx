import { DocLayout } from '../../../components/doc-layout';
import type { DocMeta } from '../../../pages/shared/doc-types';

export const meta: DocMeta = {
  slug: 'guides/building-pages',
  title: 'Building Pages',
  summary: 'Author pages, reuse templates, and organize your website routes.',
  section: 'Guides',
  order: 2,
  goal: 'Create modular page patterns that scale with route growth.',
  outcome:
    'A clean page model with reusable templates and predictable file structure.',
  prerequisites: ['Installed and scaffolded project', 'Routing table in place'],
  next: '/docs/guides/data-loading',
  nextLabel: 'Learn data loading',
  toc: [
    { id: 'page-composition', label: 'Page Composition' },
    { id: 'route-registration', label: 'Route Registration' },
  ],
};

const pageModelCode = `export function createHomeModel() {
  return {
    title: "Askr",
    proof: ["state", "routes", "SSG"],
    next: "/docs/start",
  };
}`;

const pageRouteCode = `const staticRoutes = [
  {
    path: "/",
    render: HomePage,
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
        <h2 id="page-composition">Page Composition</h2>
        <p>
          Build each page from small view primitives and keep content modeling
          separate from shell composition.
        </p>
        <p>
          Shared templates help keep route output consistent across landing
          pages, docs, and showcase content.
        </p>
        <pre class="code-block">
          <code>{pageModelCode}</code>
        </pre>
      </section>
      <section>
        <h2 id="route-registration">Route Registration</h2>
        <p>
          Register each static path in ssg.config.ts using RouteConfig entries.
        </p>
        <p>
          Prefer explicit route tables so SPA, SSR, and SSG can share the same
          page inventory.
        </p>
        <pre class="code-block">
          <code>{pageRouteCode}</code>
        </pre>
      </section>
    </DocLayout>
  );
}
