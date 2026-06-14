import { Button } from '@askrjs/themes/controls';
import {
  AccessibilityIcon,
  BracesIcon,
  ComponentIcon,
  KeyboardIcon,
  LayersIcon,
  MousePointerClickIcon,
  ShieldCheckIcon,
} from '@askrjs/lucide';

import { SiteFrame } from '../../components/site-shell';
import { SiteAnchor } from '../../components/site-link';
import {
  IconFeatureList,
  ProofStrip,
  SectionBand,
} from '../../components/site-primitives';
import type { IconFeature } from '../../components/site-primitives';
import { uiComponents } from '../shared/ui-component-registry';

const features: IconFeature[] = [
  {
    icon: AccessibilityIcon,
    title: 'ARIA patterns included',
    description:
      'Components carry the interaction contracts: roles, focus behavior, and screen-reader structure.',
  },
  {
    icon: KeyboardIcon,
    title: 'Keyboard behavior built in',
    description:
      'Tabs, menus, dialogs, selects, and disclosure components ship with expected keyboard movement.',
  },
  {
    icon: BracesIcon,
    title: 'Typed by default',
    description:
      'Props, events, and component boundaries are available to TypeScript without extra wrappers.',
  },
  {
    icon: ComponentIcon,
    title: 'Headless composition',
    description:
      'Behavior stays packaged while the visual layer remains yours through tokens and CSS.',
  },
];

const componentPreview = uiComponents.slice(0, 18);

export function UiLandingPage() {
  return (
    <SiteFrame>
      <main class="site-main">
        <section class="product-hero ui-hero">
          <div class="container product-hero-grid">
            <div>
              <span class="section-kicker">askr-ui</span>
              <h1>Accessible primitives that do the hard behavior work.</h1>
              <p>
                askr-ui gives Askr apps the pieces teams expect: inputs,
                dialogs, menus, tabs, disclosure, and navigation primitives that
                are ready for real keyboard and assistive-tech use.
              </p>
              <div class="landing-hero-ctas">
                <SiteAnchor href="/showcase/ui" className="cta-primary">
                  Browse components
                </SiteAnchor>
                <SiteAnchor
                  href="/docs/guides/styling-with-themes"
                  className="cta-secondary"
                >
                  Styling guide
                </SiteAnchor>
              </div>
            </div>
            <div class="component-bench" aria-label="askr-ui component bench">
              <div class="bench-toolbar">
                <Button>Save</Button>
                <Button variant="secondary">Preview</Button>
                <Button variant="ghost">Cancel</Button>
              </div>
              <div class="bench-list">
                <span>
                  <ShieldCheckIcon size={16} />
                  Focus trap
                </span>
                <span>
                  <KeyboardIcon size={16} />
                  Arrow keys
                </span>
                <span>
                  <MousePointerClickIcon size={16} />
                  Pointer safe
                </span>
              </div>
            </div>
          </div>
        </section>

        <div class="container">
          <ProofStrip
            items={[
              {
                value: `${uiComponents.length}+`,
                label: 'Components',
                detail: 'forms, overlays, disclosure',
              },
              {
                value: 'ARIA',
                label: 'Contract',
                detail: 'interaction patterns included',
              },
              {
                value: 'CSS',
                label: 'Styling',
                detail: 'headless, token-friendly',
              },
            ]}
          />

          <SectionBand
            kicker="Component behavior"
            title="The library handles interaction detail so your design can stay yours"
            description="askr-ui gives you accessible behavior without forcing a visual system. Pair it with askr-themes or bring your own CSS."
          >
            <IconFeatureList features={features} />
          </SectionBand>

          <SectionBand
            kicker="Catalog"
            title="A practical surface area for app interfaces"
            description="The catalog stays broad enough for real applications while remaining small enough to understand."
          >
            <div class="component-cloud">
              {componentPreview.map((component, index) => (
                <SiteAnchor
                  href={`/showcase/ui/${component.slug}`}
                  className={index % 5 === 0 ? 'is-featured' : ''}
                >
                  <LayersIcon size={15} />
                  {component.title}
                </SiteAnchor>
              ))}
            </div>
          </SectionBand>

          <SectionBand
            kicker="Next"
            title="Browse behavior first, then style with tokens"
            description="Inspect components, then use the theme guide to make them match your product."
          >
            <div class="next-step-row">
              <SiteAnchor href="/showcase/ui">Component reference</SiteAnchor>
              <SiteAnchor href="/docs/getting-started/installation">
                Install askr-ui
              </SiteAnchor>
              <SiteAnchor href="/docs/guides/styling-with-themes">
                Style with themes
              </SiteAnchor>
            </div>
          </SectionBand>
        </div>
      </main>
    </SiteFrame>
  );
}
