import { DocLayout } from "../../../components/doc-layout";
import type { DocMeta } from "../../../pages/shared/doc-types";

export const meta: DocMeta = {
  slug: "guides/styling-with-themes",
  title: "Styling with Themes",
  summary: "Use askr-themes tokens to create a cohesive, maintainable visual system.",
  section: "Guides",
  order: 3,
  toc: [
    { id: "token-foundations", label: "Token Foundations" },
    { id: "mode-strategy", label: "Mode Strategy" },
  ],
};

export function StylingWithThemesDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section>
        <h2 id="token-foundations">Token Foundations</h2>
        <p>
          Start from semantic tokens for color, spacing, typography, and radius
          so components inherit a coherent language.
        </p>
        <p>
          Keep local overrides sparse and prefer system-level token changes over
          component-specific forks.
        </p>
      </section>
      <section>
        <h2 id="mode-strategy">Mode Strategy</h2>
        <p>
          Define light and dark values at the token layer and let components
          consume them without branching.
        </p>
        <p>
          A small theme bootstrap script can prevent color-mode flash before the
          page paints.
        </p>
      </section>
    </DocLayout>
  );
}
