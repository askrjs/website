import { SiteFrame } from "../../components/site-shell";
import { SiteAnchor } from "../../components/site-link";
import { PageSection } from "../../components/page-primitives";

interface FeatureCell {
  icon: string;
  title: string;
  description: string;
}

const features: FeatureCell[] = [
  {
    icon: "🎨",
    title: "CSS custom properties",
    description:
      "All tokens are --ak-* CSS variables. Override any token in your own stylesheet — no build step, no config.",
  },
  {
    icon: "🌓",
    title: "Light & dark mode",
    description:
      "Semantic color tokens automatically adapt to light and dark. One attribute switch, instant update.",
  },
  {
    icon: "🎁",
    title: "Multiple themes",
    description:
      "Four built-in themes to choose from. Swap by changing data-theme on the root element.",
  },
  {
    icon: "⚡",
    title: "Zero JavaScript",
    description:
      "Theming is pure CSS. A tiny inline script prevents color-mode flash on initial load — that's all the JS you need.",
  },
];

interface TokenSwatch {
  name: string;
  label: string;
  cssVar: string;
}

const swatches: TokenSwatch[] = [
  { name: "Background", label: "--ak-color-bg", cssVar: "var(--ak-color-bg)" },
  { name: "Surface", label: "--ak-color-surface", cssVar: "var(--ak-color-surface)" },
  { name: "Primary", label: "--ak-color-primary", cssVar: "var(--ak-color-primary)" },
  { name: "Muted", label: "--ak-color-muted", cssVar: "var(--ak-color-muted)" },
  { name: "Border", label: "--ak-color-border", cssVar: "var(--ak-color-border)" },
  { name: "Foreground", label: "--ak-color-fg", cssVar: "var(--ak-color-fg)" },
];

export function ThemesLandingPage() {
  return (
    <SiteFrame>
      <main>
        <div class="container">
          <div class="landing-hero">
            <span class="landing-hero-badge">askr-themes</span>
            <h1>
              Token-driven theming.
              <br />
              Light, dark, and beyond.
            </h1>
            <p>
              askr-themes uses CSS custom properties and data-slot selectors. Apply a complete
              visual system with one HTML attribute — zero JavaScript required.
            </p>
            <div class="landing-hero-ctas">
              <SiteAnchor href="/showcase/themes" className="cta-primary">
                Explore themes
              </SiteAnchor>
              <SiteAnchor href="/docs/guides/styling-with-themes" className="cta-secondary">
                Styling guide →
              </SiteAnchor>
            </div>
          </div>

          <PageSection
            kicker="How it works"
            title="CSS all the way down"
            description="Every design decision in askr-themes is expressed as a --ak-* CSS variable. Override what you need, keep the rest."
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
            kicker="Tokens"
            title="Semantic color tokens"
            description="Colors are defined semantically — background, surface, primary, muted — so components adapt automatically to any theme."
          >
            <div class="token-preview-grid">
              {swatches.map((s) => (
                <div class="token-swatch">
                  <div class="token-swatch-color" style={`background: ${s.cssVar};`} />
                  <span>{s.name}</span>
                  <code>{s.label}</code>
                </div>
              ))}
            </div>
          </PageSection>

          <PageSection
            kicker="Usage"
            title="One attribute to rule them all"
            description="Set a theme by adding a data-theme attribute to your root element. Switch themes at runtime — no page reload needed."
          >
            <div class="landing-code">
              <pre>{`<!-- Apply the default theme -->
<html data-theme="light">

<!-- Switch to dark mode -->
<html data-theme="dark">

<!-- Apply a named theme variant -->
<html data-theme="ocean">

<!-- In your CSS, just use the tokens -->
.my-component {
  background: var(--ak-color-surface);
  color: var(--ak-color-fg);
  border: 1px solid var(--ak-color-border);
  border-radius: var(--ak-radius-md);
}`}</pre>
            </div>
          </PageSection>

          <PageSection
            kicker="Next steps"
            title="Apply your first theme"
            description="Follow the styling guide or browse the theme reference for a complete token inventory."
          >
            <div class="grid" style="margin-top: 1rem;">
              <SiteAnchor href="/docs/guides/styling-with-themes" className="card">
                <h2>Styling with Themes</h2>
                <p>Learn how to apply tokens and manage light/dark mode in your app.</p>
                <span class="card-cta">Read guide →</span>
              </SiteAnchor>
              <SiteAnchor href="/showcase/themes" className="card">
                <h2>Theme Reference</h2>
                <p>Complete token inventory with light and dark defaults for every token group.</p>
                <span class="card-cta">Browse reference →</span>
              </SiteAnchor>
              <SiteAnchor href="/docs/getting-started/installation" className="card">
                <h2>Installation</h2>
                <p>Add askr-themes to your project alongside askr and askr-ui.</p>
                <span class="card-cta">Get started →</span>
              </SiteAnchor>
            </div>
          </PageSection>
        </div>
      </main>
    </SiteFrame>
  );
}
