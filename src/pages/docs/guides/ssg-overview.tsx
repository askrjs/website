import { DocLayout } from '../_layout';
import type { DocMeta } from '../types';

export const meta: DocMeta = {
  slug: 'guides/ssg-overview',
  title: 'SSG overview',
  summary:
    'Understand the static generation flow, output structure, and deployment model.',
  section: 'Guides',
  order: 1,
  goal: 'Choose when static output is the right delivery model for your site.',
  outcome: 'A clear model for route rendering and file output.',
  prerequisites: [
    'A route registry in your Askr app',
    'A package lockfile with build scripts',
  ],
  next: '/docs/guides/building-pages',
  nextLabel: 'Build pages',
  toc: [
    { id: 'static-build-flow', label: 'Static build flow' },
    { id: 'deployment-shape', label: 'Deployment shape' },
  ],
};

const ssgConfigCode = `import { websiteRouteRegistry } from "./src/pages/_routes";

export const registry = websiteRouteRegistry;
export const outputDir = "dist";
export const seed = 20260315;

export default {
  registry,
  outputDir,
  seed,
};`;

const outputShape = `dist/
  index.html
  app.js
  theme-init.js
  assets/
    index-*.css
    font-and-image-assets
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
        <h2 id="static-build-flow">Static build flow</h2>
        <p>
          The Askr CLI can render your route registry into HTML at build time
          and emit output that works on static hosting platforms.
        </p>
        <p>
          The generated metadata makes it easier to verify route coverage and
          inspect render cost per page.
        </p>
        <pre class="code-block">
          <code>{ssgConfigCode}</code>
        </pre>
        <p>
          Run <code>askr ssg --config ./ssg.config.ts --output ./dist</code>.
          Add <code>--workers auto</code> for host-selected parallelism or
          <code>--incremental</code> with changed route/key flags for targeted
          rebuilds.
        </p>
      </section>
      <section>
        <h2 id="deployment-shape">Deployment shape</h2>
        <p>
          Each route becomes an index.html file inside a folder structure that
          mirrors the URL path.
        </p>
        <p>
          Keep document HTML in index.html. The SSG step renders route bodies
          and wraps each generated page with the built template so assets and
          boot scripts stay consistent.
        </p>
        <pre class="code-block">
          <code>{outputShape}</code>
        </pre>
      </section>
    </DocLayout>
  );
}
