import { SiteFrame } from "../../components/site-shell";
import { SiteAnchor } from "../../components/site-link";
import { PageSection } from "../../components/page-primitives";
import { uiComponents } from "../shared/ui-component-registry";

interface FeatureCell {
  icon: string;
  title: string;
  description: string;
}

const features: FeatureCell[] = [
  {
    icon: "🎛️",
    title: "Headless by design",
    description:
      "No opinionated styles shipped. Bring your own CSS or use askr-themes tokens — components only manage behavior.",
  },
  {
    icon: "♿",
    title: "ARIA & keyboard built in",
    description:
      "Every component meets WAI-ARIA patterns. Focus management, keyboard navigation, and screen reader support are included.",
  },
  {
    icon: "🔷",
    title: "TypeScript first",
    description:
      "Full type coverage across props, events, and refs. Autocomplete works out of the box — no extra config needed.",
  },
  {
    icon: "🧩",
    title: "Composable primitives",
    description:
      "Combine Button, Dialog, Select, and 33+ more into your own design system without fighting the library.",
  },
];

export function UiLandingPage() {
  return (
    <SiteFrame>
      <main>
        <div class="container">
          <div class="landing-hero">
            <span class="landing-hero-badge">askr-ui</span>
            <h1>36+ headless UI components.<br />Fully accessible.</h1>
            <p>
              askr-ui gives you keyboard-navigable, ARIA-compliant primitives
              — styled by you, powered by askr's fine-grained reactivity.
            </p>
            <div class="landing-hero-ctas">
              <SiteAnchor href="/showcase/ui" className="cta-primary">
                Browse components
              </SiteAnchor>
              <SiteAnchor href="/docs/getting-started/installation" className="cta-secondary">
                Get started →
              </SiteAnchor>
            </div>
          </div>

          <PageSection
            kicker="Why headless"
            title="Behavior without opinions"
            description="askr-ui handles the hard parts — focus traps, ARIA roles, keyboard shortcuts — while leaving visual design entirely to you."
          >
            <div class="feature-grid">
              {features.map((f) => (
                <div class="feature-cell">
                  <div class="feature-cell-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              ))}
            </div>
          </PageSection>

          <PageSection
            kicker="Components"
            title="Everything you need"
            description={`${uiComponents.length}+ components across forms, overlays, disclosure, navigation, and layout.`}
          >
            <div class="component-badge-grid">
              {uiComponents.map((c) => (
                <SiteAnchor
                  href={`/showcase/ui/${c.slug}`}
                  className="component-badge"
                >
                  {c.title}
                </SiteAnchor>
              ))}
            </div>
          </PageSection>

          <PageSection
            kicker="Next steps"
            title="Start building"
            description="Browse the component catalog or follow the installation guide to add askr-ui to your project."
          >
            <div class="grid" style="margin-top: 1rem;">
              <SiteAnchor href="/showcase/ui" className="card">
                <h2>Component catalog</h2>
                <p>Browse all 36+ components with usage notes and interactive demos.</p>
                <span class="card-cta">Open catalog →</span>
              </SiteAnchor>
              <SiteAnchor href="/docs/getting-started/installation" className="card">
                <h2>Installation</h2>
                <p>Add askr-ui to your project alongside askr and askr-themes.</p>
                <span class="card-cta">Read guide →</span>
              </SiteAnchor>
              <SiteAnchor href="/docs/guides/styling-with-themes" className="card">
                <h2>Styling guide</h2>
                <p>Learn how to style components using askr-themes design tokens.</p>
                <span class="card-cta">Read guide →</span>
              </SiteAnchor>
            </div>
          </PageSection>
        </div>
      </main>
    </SiteFrame>
  );
}
