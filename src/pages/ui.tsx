import { Link } from '@askrjs/askr/router';
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

import { SiteFrame } from '../components/site-shell';
import { PageSection } from '../components/page-primitives/section';
import {
  IconFeatureList,
  ProofStrip,
} from '../components/site-primitives';
import type { IconFeature } from '../components/site-primitives';
import { uiComponents } from '../features/ui/registry';

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
      'Menus, dialogs, selects, sliders, toggles, and disclosure components include expected keyboard movement.',
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
                <Link href="/showcase/ui" class="cta-primary">
                  Browse components
                </Link>
                <Link
                  href="/docs/guides/styling-with-themes"
                  class="cta-secondary"
                >
                  Styling guide
                </Link>
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

          <PageSection
            className="section-band"
            kicker="Component behavior"
            title="The library handles interaction detail so your design can stay yours"
            description="askr-ui gives you accessible behavior without forcing a visual system. Pair it with askr-themes or bring your own CSS."
          >
            <IconFeatureList features={features} />
          </PageSection>

          <PageSection
            className="section-band"
            kicker="Catalog"
            title="Components for common app interfaces"
            description="Start with forms and overlays, then add feedback, navigation, and layout primitives as the app grows."
          >
            <div class="component-cloud">
              {componentPreview.map((component, index) => (
                <Link
                  key={component.slug}
                  href={`/showcase/ui/${component.slug}`}
                  class={index % 5 === 0 ? 'is-featured' : ''}
                >
                  <LayersIcon size={15} />
                  {component.title}
                </Link>
              ))}
            </div>
          </PageSection>

          <PageSection
            className="section-band"
            kicker="Next"
            title="Browse behavior first, then style with tokens"
            description="Inspect components, then use the theme guide to make them match your product."
          >
            <div class="next-step-row">
              <Link href="/showcase/ui">Component reference</Link>
              <Link href="/docs/getting-started/installation">
                Install askr-ui
              </Link>
              <Link href="/docs/guides/styling-with-themes">
                Style with themes
              </Link>
            </div>
          </PageSection>
        </div>
      </main>
    </SiteFrame>
  );
}
