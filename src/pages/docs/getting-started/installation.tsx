import { DocLayout } from "../../../components/doc-layout";
import type { DocMeta } from "../../../pages/shared/doc-types";

export const meta: DocMeta = {
  slug: "getting-started/installation",
  title: "Installation",
  summary: "Install askr, askr-ui, and askr-themes into your app.",
  section: "Getting Started",
  order: 1,
};

export function InstallationDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section>
        <h2>Project Setup</h2>
        <p>
          Create a new app with your preferred toolchain and enable ESM output.
        </p>
        <p>
          Install @askrjs/askr for runtime primitives, @askrjs/askr-ui for
          headless components, and @askrjs/askr-themes for CSS theme tokens.
        </p>
        <p>
          Use one package manager across your workspace to keep lockfiles
          consistent.
        </p>
      </section>
      <section>
        <h2>Recommended Baseline</h2>
        <p>
          Start with a tiny route graph and one interactive island so rendering
          and hydration are easy to validate.
        </p>
        <p>
          Add a CI check that runs typecheck and static generation before merge.
        </p>
      </section>
    </DocLayout>
  );
}
