import {
  GaugeIcon,
  MoonIcon,
  PaintbrushIcon,
  PaletteIcon,
  SunIcon,
} from '@askrjs/lucide';

import { SiteFrame } from '../../components/site-shell';
import { SiteAnchor } from '../../components/site-link';
import {
  CodeWindow,
  IconFeatureList,
  ProofStrip,
  SectionBand,
} from '../../components/site-primitives';
import type { IconFeature } from '../../components/site-primitives';

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

.product-proof {
  background: var(--ak-color-surface);
  color: var(--ak-color-fg);
  border: 1px solid var(--ak-color-border);
}`;

export function ThemesLandingPage() {
  return (
    <SiteFrame>
      <main class="site-main">
        <section class="product-hero themes-hero">
          <div class="container product-hero-grid">
            <div>
              <span class="section-kicker">askr-themes</span>
              <h1>Theme tokens as the product interface.</h1>
              <p>
                askr-themes gives the site a stable semantic base. The Askr
                brand layer then adds precision, contrast, and motion without
                breaking the token contract.
              </p>
              <div class="landing-hero-ctas">
                <SiteAnchor href="/showcase/themes" className="cta-primary">
                  Explore theme reference
                </SiteAnchor>
                <SiteAnchor
                  href="/docs/guides/styling-with-themes"
                  className="cta-secondary"
                >
                  Styling guide
                </SiteAnchor>
              </div>
            </div>
            <div class="theme-lab" aria-label="Theme token lab">
              <div class="theme-lab-modes">
                <span>
                  <SunIcon size={16} />
                  light
                </span>
                <span>
                  <MoonIcon size={16} />
                  dark
                </span>
              </div>
              <div class="theme-lab-card">
                <strong>token layer</strong>
                <span>--ak-color-surface</span>
                <span>--ak-color-primary</span>
                <span>--ak-radius-md</span>
              </div>
            </div>
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

          <SectionBand
            kicker="Theme contract"
            title="Lean on the shared tokens, then add a branded layer"
            description="The site should prove that askr-themes is useful by using it directly: token first, overrides second, bespoke selectors last."
          >
            <IconFeatureList features={features} />
          </SectionBand>

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
                <article>
                  <span style={`background: ${swatch.cssVar};`} />
                  <strong>{swatch.name}</strong>
                  <code>{swatch.label}</code>
                </article>
              ))}
            </div>
          </section>

          <SectionBand
            kicker="CSS"
            title="Override the site without owning a theme engine"
            description="The brand layer is ordinary CSS. That keeps SSG output predictable and makes inspection straightforward."
          >
            <CodeWindow label="precision-lab.css" code={themeCode} />
          </SectionBand>

          <SectionBand
            kicker="Next"
            title="Use the theme guide before styling components by hand"
            description="The fastest way to keep the interface consistent is to change tokens first."
          >
            <div class="next-step-row">
              <SiteAnchor href="/docs/guides/styling-with-themes">
                Styling with themes
              </SiteAnchor>
              <SiteAnchor href="/showcase/themes">Token reference</SiteAnchor>
              <SiteAnchor href="/ui">Style askr-ui</SiteAnchor>
            </div>
          </SectionBand>
        </div>
      </main>
    </SiteFrame>
  );
}
