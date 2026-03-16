import { jsx } from "../../../runtime/jsx";

import { DocLayout } from "../../../components/doc-layout";
import type { DocMeta } from "../../../pages/shared/doc-types";

export const meta: DocMeta = {
  slug: "guides/ssg-overview",
  title: "SSG Overview",
  summary: "Generate static pages deterministically with askr-ssg.",
};

export function SsgOverviewDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary}>
      <section>
        <h2>Route Model</h2>
        <p>
          Register each static path in ssg.config.ts using RouteConfig entries.
        </p>
        <p>
          Use props on routes to pass page-level data into reusable view
          components.
        </p>
      </section>
      <section>
        <h2>Build Modes</h2>
        <p>
          Use full builds for release branches and incremental builds during
          rapid iteration.
        </p>
        <p>
          Keep route keys stable so incremental invalidation remains
          predictable.
        </p>
      </section>
    </DocLayout>
  );
}
