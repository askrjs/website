import { DocLayout } from "../../../components/doc-layout";
import type { DocMeta } from "../../../pages/shared/doc-types";

export const meta: DocMeta = {
  slug: "guides/styling-with-themes",
  title: "Styling with Themes",
  summary: "Use askr-themes tokens and component styles to skin your app.",
};

export function StylingWithThemesDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary}>
      <section>
        <h2>Token Layers</h2>
        <p>
          Define semantic tokens once and consume them in app-level and
          component-level styles.
        </p>
        <p>
          Prefer semantic names over hardcoded color literals so themes can
          evolve safely.
        </p>
      </section>
      <section>
        <h2>Dark and Light Modes</h2>
        <p>Switch mode by toggling a top-level class or data attribute.</p>
        <p>Audit contrast and focus visibility in both modes before release.</p>
      </section>
    </DocLayout>
  );
}
