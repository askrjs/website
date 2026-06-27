import { Link } from '@askrjs/askr/router';
import {
  GaugeIcon,
  MoonIcon,
  PaintbrushIcon,
  PaletteIcon,
  SunIcon,
} from '@askrjs/lucide';
import { Button } from '@askrjs/themes/controls';
import { useTheme } from '@askrjs/themes/theme';

import { SiteFrame } from '../../site/shell/site-frame';
import { PageSection } from '../../shared/page-primitives/section';
import { CodeWindow, IconFeatureList, ProofStrip } from '../../site/primitives';
import type { IconFeature } from '../../site/primitives';

const features: IconFeature[] = [
  {
    icon: PaletteIcon,
    title: 'Semantic tokens',
    description:
      'Background, foreground, surface, border, and primary values are named by role instead of page section.',
  },
  {
    icon: MoonIcon,
    title: 'Mode-aware by default',
    description:
      'The site can switch light and dark mode through one attribute without changing component code.',
  },
  {
    icon: PaintbrushIcon,
    title: 'Override friendly',
    description:
      'The branded layer changes tokens and low-specificity selectors before reaching for bespoke CSS.',
  },
  {
    icon: GaugeIcon,
    title: 'Static-first styling',
    description:
      'No runtime theme engine is needed for the visual system to render in SSG output.',
  },
];

const swatches = [
  { name: 'Ink', label: '--ak-color-fg', cssVar: 'var(--ak-color-fg)' },
  { name: 'Canvas', label: '--ak-color-bg', cssVar: 'var(--ak-color-bg)' },
  {
    name: 'Surface',
    label: '--ak-color-surface',
    cssVar: 'var(--ak-color-surface)',
  },
  {
    name: 'Signal',
    label: '--ak-color-primary',
    cssVar: 'var(--ak-color-primary)',
  },
  {
    name: 'Border',
    label: '--ak-color-border',
    cssVar: 'var(--ak-color-border)',
  },
  { name: 'Muted', label: '--ak-color-muted', cssVar: 'var(--ak-color-muted)' },
];

const themeCode = `:root {
  --site-signal: #10b981;
  --site-cyan: #0891b2;
  --site-oxide: #b45309;
}

.feature-card {
  background: var(--ak-color-surface);
  color: var(--ak-color-fg);
  border: 1px solid var(--ak-color-border);
}`;

function ThemeLab() {
  return (
    <div class="theme-lab" aria-label="Theme token lab">
      <div class="theme-lab-modes">
        <Button class="theme-lab-mode theme-lab-mode-light">
          <SunIcon size={16} />
          light
        </Button>
        <Button class="theme-lab-mode theme-lab-mode-dark">
          <MoonIcon size={16} />
          dark
        </Button>
      </div>
      <div class="theme-lab-card">
        <strong>token layer</strong>
        <span>--ak-color-surface</span>
        <span>--ak-color-primary</span>
        <span>--ak-radius-md</span>
      </div>
    </div>
  );
}

function InteractiveThemeLab() {
  if (typeof window === 'undefined') {
    return <ThemeLab />;
  }

  const theme = useTheme();

  return (
    <div class="theme-lab" aria-label="Theme token lab">
      <div class="theme-lab-modes">
        <Button
          class="theme-lab-mode theme-lab-mode-light"
          onPress={() => theme.setTheme('light')}
        >
          <SunIcon size={16} />
          light
        </Button>
        <Button
          class="theme-lab-mode theme-lab-mode-dark"
          onPress={() => theme.setTheme('dark')}
        >
          <MoonIcon size={16} />
          dark
        </Button>
      </div>
      <div class="theme-lab-card">
        <strong>token layer</strong>
        <span>--ak-color-surface</span>
        <span>--ak-color-primary</span>
        <span>--ak-radius-md</span>
      </div>
    </div>
  );
}

export function ThemesLandingPage() {
  return (
    <SiteFrame>
      <main class="site-main">
        <section class="product-hero themes-hero">
          <div class="container product-hero-grid">
            <div>
              <span class="section-kicker">askr-themes</span>
              <h1>Theme tokens for Askr apps and documentation.</h1>
              <p>
                askr-themes provides semantic CSS variables and default
                component styles. Use the token layer first, then add brand CSS
                only where the site needs a specific treatment.
              </p>
              <div class="landing-hero-ctas">
                <Link href="/showcase/themes" class="cta-primary">
                  Explore theme reference
                </Link>
                <Link
                  href="/docs/guides/styling-with-themes"
                  class="cta-secondary"
                >
                  Styling guide
                </Link>
              </div>
            </div>
            <InteractiveThemeLab />
          </div>
        </section>

        <div class="container">
          <ProofStrip
            items={[
              {
                value: 'CSS',
                label: 'Runtime',
                detail: 'tokens render statically',
              },
              {
                value: '1',
                label: 'Attribute',
                detail: 'data-theme controls mode',
              },
              {
                value: '--ak-*',
                label: 'Contract',
                detail: 'shared design variables',
              },
            ]}
          />

          <PageSection
            className="section-band"
            kicker="Theme contract"
            title="Lean on the shared tokens, then add a branded layer"
            description="Use askr-themes for shared colors, radius, spacing, and component states. Keep site-specific selectors small and easy to audit."
          >
            <IconFeatureList features={features} />
          </PageSection>

          <section class="proof-split">
            <div>
              <span class="section-kicker">Token lab</span>
              <h2>Every visual decision has a variable behind it</h2>
              <p>
                The landing pages, docs shell, code blocks, and buttons all read
                from the same semantic layer before applying site-specific
                accents.
              </p>
            </div>
            <div class="token-lab-grid">
              {swatches.map((swatch) => (
                <article key={swatch.label}>
                  <span style={`background: ${swatch.cssVar};`} />
                  <strong>{swatch.name}</strong>
                  <code>{swatch.label}</code>
                </article>
              ))}
            </div>
          </section>

          <PageSection
            className="section-band"
            kicker="CSS"
            title="Override the site without owning a theme engine"
            description="The brand layer is ordinary CSS, so generated pages can be inspected without running a theme runtime."
          >
            <CodeWindow label="precision-lab.css" code={themeCode} />
          </PageSection>

          <PageSection
            className="section-band"
            kicker="Next"
            title="Use the theme guide before styling components by hand"
            description="The fastest way to keep the interface consistent is to change tokens first."
          >
            <div class="next-step-row">
              <Link href="/docs/guides/styling-with-themes">
                Styling with themes
              </Link>
              <Link href="/showcase/themes">Token reference</Link>
              <Link href="/ui">Style askr-ui</Link>
            </div>
          </PageSection>
        </div>
      </main>
    </SiteFrame>
  );
}
