import { DocLayout } from '../../../components/doc-layout';
import type { DocMeta } from '../../../pages/shared/doc-types';

export const meta: DocMeta = {
  slug: 'guides/styling-with-themes',
  title: 'Styling with Themes',
  summary:
    'Use askr-themes tokens to create a cohesive, maintainable visual system.',
  section: 'Guides',
  order: 4,
  goal: 'Apply semantic tokens so components remain style-consistent across features.',
  outcome: 'A theming strategy that avoids local overrides and selector drift.',
  prerequisites: [
    'Built and routed page in place',
    'A global theme stylesheet loaded',
  ],
  next: '/docs/guides/accessibility-checklist',
  nextLabel: 'Check accessibility basics',
  toc: [
    { id: 'token-foundations', label: 'Token Foundations' },
    { id: 'mode-strategy', label: 'Mode Strategy' },
  ],
};

const tokenCode = `:root {
  --site-signal: #10926f;
  --site-cyan: #0b8fad;
  --site-oxide: #b5522b;
}

.product-proof {
  background: var(--ak-color-surface);
  color: var(--ak-color-fg);
  border: 1px solid var(--ak-color-border);
}`;

const modeCode = `(function () {
  var stored = localStorage.getItem("theme");
  var element = document.documentElement;
  var dark = window.matchMedia("(prefers-color-scheme:dark)").matches;
  element.setAttribute("data-theme", stored || (dark ? "dark" : "light"));
})();`;

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
        <pre class="code-block">
          <code>{tokenCode}</code>
        </pre>
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
        <pre class="code-block">
          <code>{modeCode}</code>
        </pre>
      </section>
    </DocLayout>
  );
}
