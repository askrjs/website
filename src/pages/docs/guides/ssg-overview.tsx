import { DocLayout } from "../../../components/doc-layout";
import type { DocMeta } from "../../../pages/shared/doc-types";

export const meta: DocMeta = {
  slug: "guides/ssg-overview",
  title: "SSG Overview",
  summary: "Understand the static generation flow, output structure, and deployment model.",
  section: "Guides",
  order: 1,
};

export function SsgOverviewDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section>
        <h2>Static Build Flow</h2>
        <p>
          Askr can render your route table into deterministic HTML at build
          time and emit output that works on static hosting platforms.
        </p>
        <p>
          The generated metadata makes it easier to verify route coverage and
          inspect render cost per page.
        </p>
      </section>
      <section>
        <h2>Deployment Shape</h2>
        <p>
          Each route becomes an index.html file inside a folder structure that
          mirrors the URL path.
        </p>
        <p>
          Keep CSS and theme assets shared at the root of the output directory
          so every page resolves them consistently.
        </p>
      </section>
    </DocLayout>
  );
}
