import { DocLayout } from '../_layout';
import type { DocMeta } from '../types';

export const meta: DocMeta = {
  slug: 'guides/styling-with-themes',
  title: 'Styling with themes',
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
    { id: 'token-foundations', label: 'Token foundations' },
    { id: 'mode-strategy', label: 'Mode strategy' },
  ],
};

const tokenCode = `:root {
  --site-signal: #10926f;
  --site-cyan: #0b8fad;
  --site-oxide: #b5522b;
}

.feature-card {
  background: var(--ak-color-surface);
  color: var(--ak-color-fg);
  border: 1px solid var(--ak-color-border);
}`;

const modeCode = `(function () {
  var stored = localStorage.getItem("theme");
  var root = document.documentElement;
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var explicit = stored === "light" || stored === "dark";
  var theme = stored === "dark" || (!explicit && prefersDark) ? "dark" : "light";
  root.setAttribute("data-theme", theme);
  root.setAttribute("data-theme-choice", explicit ? stored : "system");
})();`;

export function StylingWithThemesDocPage() {
  return (
    <DocLayout title={meta.title} intro={meta.summary} meta={meta}>
      <section>
        <h2 id="token-foundations">Token foundations</h2>
        <p>
          Start from semantic tokens for color, spacing, typography, and radius.
          Components should read roles like surface, foreground, border, and
          primary instead of page-specific color names.
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
        <h2 id="mode-strategy">Mode strategy</h2>
        <p>
          Define light and dark values at the token layer and let components
          consume them without branching.
        </p>
        <p>
          A small theme bootstrap script prevents color-mode flash before the
          page paints and keeps <code>data-theme-choice</code> aligned with
          <code>ThemeProvider</code> and <code>useTheme()</code>.
        </p>
        <pre class="code-block">
          <code>{modeCode}</code>
        </pre>
      </section>
    </DocLayout>
  );
}
