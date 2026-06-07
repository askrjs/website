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
    icon: "⚡",
    title: "Fine-grained reactivity",
    description:
      "state() and derive() propagate changes directly to the nodes that need them — no virtual DOM, no component re-renders.",
  },
  {
    icon: "🎭",
    title: "Actor model",
    description:
      "Each reactive unit is backed by an actor. Updates are synchronous by default, predictable, and easy to trace.",
  },
  {
    icon: "📦",
    title: "Three render modes",
    description:
      "Build SPAs, server-rendered apps, or fully static sites from the same route table — just switch the entry point.",
  },
  {
    icon: "🔁",
    title: "Async with resource()",
    description:
      "resource() wraps async data with automatic cancellation, loading state, and error handling built in.",
  },
  {
    icon: "🛣️",
    title: "First-class routing",
    description:
      "Declarative route tables shared between SPA, SSR, and SSG modes. No adapter gymnastics.",
  },
  {
    icon: "🪶",
    title: "Under 4kb",
    description:
      "The core runtime has zero dependencies and ships in under 4kb gzipped. Pay only for what you use.",
  },
];

const codeExample = `import { state, derive } from "@askrjs/askr";

// Reactive state — updates propagate directly to the DOM
const count = state(0);
const doubled = derive(() => count.get() * 2);

// No virtual DOM, no reconciliation
function Counter() {
  return (
    <div>
      <button onPress={() => count.set(v => v + 1)}>+</button>
      <span>{count}</span>
      <p>Doubled: {doubled}</p>
    </div>
  );
}`;

export function FrameworkPage() {
  return (
    <SiteFrame>
      <main>
        <div class="container">
          <div class="landing-hero">
            <span class="landing-hero-badge">askr</span>
            <h1>
              Fine-grained reactivity.
              <br />
              Zero virtual DOM.
            </h1>
            <p>
              Askr is a lightweight reactive framework powered by actors. State updates flow
              directly to the DOM — no diffing, no full component re-renders, no overhead.
            </p>
            <div class="landing-hero-ctas">
              <SiteAnchor href="/docs/getting-started/installation" className="cta-primary">
                Get started
              </SiteAnchor>
              <SiteAnchor href="/docs/getting-started/quick-start" className="cta-secondary">
                Quick start →
              </SiteAnchor>
              <SiteAnchor href="/showcase/askr" className="cta-secondary">
                Runtime reference
              </SiteAnchor>
            </div>
          </div>

          <PageSection
            kicker="How it works"
            title="Reactivity without the overhead"
            description="Askr uses actors to track fine-grained dependencies. Only the exact DOM nodes that depend on changed state are updated."
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
            kicker="Example"
            title="Reactive state, no boilerplate"
            description="state() and derive() give you reactive primitives that compose naturally into components."
          >
            <div class="landing-code">
              <pre>{codeExample}</pre>
            </div>
          </PageSection>

          <PageSection
            kicker="Stats"
            title="Built to stay small"
            description="The runtime ships with zero dependencies and no build-time magic."
          >
            <div class="hero-stats" style="justify-content: flex-start; margin-top: 1rem;">
              <article>
                <strong>&lt;4kb</strong>
                <span>Core runtime</span>
              </article>
              <article>
                <strong>0</strong>
                <span>Dependencies</span>
              </article>
              <article>
                <strong>3</strong>
                <span>Render modes</span>
              </article>
              <article>
                <strong>100%</strong>
                <span>TypeScript</span>
              </article>
            </div>
          </PageSection>

          <PageSection
            kicker="Next steps"
            title="Start building"
            description="Follow the installation guide to add askr to your project in minutes."
          >
            <div class="grid" style="margin-top: 1rem;">
              <SiteAnchor href="/docs/getting-started/installation" className="card">
                <h2>Installation</h2>
                <p>Add askr, askr-ui, and askr-themes to your workspace.</p>
                <span class="card-cta">Read guide →</span>
              </SiteAnchor>
              <SiteAnchor href="/docs/getting-started/quick-start" className="card">
                <h2>Quick Start</h2>
                <p>Build your first page with state, routing, and themed UI.</p>
                <span class="card-cta">Open quick start →</span>
              </SiteAnchor>
              <SiteAnchor href="/docs/guides/ssg-overview" className="card">
                <h2>SSG Overview</h2>
                <p>Understand static generation, output structure, and deployment.</p>
                <span class="card-cta">Read guide →</span>
              </SiteAnchor>
            </div>
          </PageSection>
        </div>
      </main>
    </SiteFrame>
  );
}
