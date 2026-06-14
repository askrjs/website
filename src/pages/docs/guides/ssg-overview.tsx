import { DocLayout } from '../../../components/doc-layout';
import type { DocMeta } from '../../../pages/shared/doc-types';

export const meta: DocMeta = {
  slug: 'guides/ssg-overview',
  title: 'SSG Overview',
  summary:
    'Understand the static generation flow, output structure, and deployment model.',
  section: 'Guides',
  order: 1,
  goal: 'Choose when static output is the right delivery model for your site.',
  outcome:
    'A reliable mental model for deterministic route rendering and predictable file output.',
  prerequisites: [
    'A route registry in your Askr app',
    'A package lockfile with build scripts',
  ],
  next: '/docs/guides/building-pages',
  nextLabel: 'Build pages',
  toc: [
    { id: 'static-build-flow', label: 'Static Build Flow' },
    { id: 'deployment-shape', label: 'Deployment Shape' },
  ],
};

const ssgConfigCode = `import type { RouteConfig } from "@askrjs/askr/ssg";
import { getStaticRoutes } from "./src/pages/routes";

export const routes: RouteConfig[] = getStaticRoutes();
export const outputDir = "dist";
export const seed = 20260315;`;

const outputShape = `dist/
  index.html
  app.js
  styles.css
  theme-tokens.css
  docs/
    start/
      index.html
  metadata.json
  .askr/
    ssg-manifest.json`;

export function SsgOverviewDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section>
        <h2 id="static-build-flow">Static Build Flow</h2>
        <p>
          Askr can render your route table into deterministic HTML at build time
          and emit output that works on static hosting platforms.
        </p>
        <p>
          The generated metadata makes it easier to verify route coverage and
          inspect render cost per page.
        </p>
        <pre class="code-block">
          <code>{ssgConfigCode}</code>
        </pre>
      </section>
      <section>
        <h2 id="deployment-shape">Deployment Shape</h2>
        <p>
          Each route becomes an index.html file inside a folder structure that
          mirrors the URL path.
        </p>
        <p>
          Keep CSS and theme assets shared at the root of the output directory
          so every page resolves them consistently.
        </p>
        <pre class="code-block">
          <code>{outputShape}</code>
        </pre>
      </section>
    </DocLayout>
  );
}
