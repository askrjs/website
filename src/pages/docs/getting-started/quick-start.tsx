import { DocLayout } from "../../../components/doc-layout";
import type { DocMeta } from "../../../pages/shared/doc-types";

export const meta: DocMeta = {
  slug: "getting-started/quick-start",
  title: "Quick Start",
  summary: "Build your first page with state, routing, and themed UI.",
};

export function QuickStartDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary}>
      <section>
        <h2>First Island</h2>
        <p>
          Define a component with state() and render it using createIsland().
        </p>
        <p>
          Keep event handlers pure and push async work into resource() so
          cancellation is automatic.
        </p>
      </section>
      <section>
        <h2>Add UI and Theme</h2>
        <p>
          Import a small set of askr-ui components and apply askr-themes CSS at
          the app shell level.
        </p>
        <p>
          Use token variables to tune spacing and color without forking
          component logic.
        </p>
      </section>
    </DocLayout>
  );
}
