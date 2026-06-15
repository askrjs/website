import { derive, state } from '@askrjs/askr';
import { Link } from '@askrjs/askr/router';
import { Button } from '@askrjs/themes/controls';
import {
  BracesIcon,
  GaugeIcon,
  GitBranchIcon,
  NetworkIcon,
  PackageCheckIcon,
  RouteIcon,
  WorkflowIcon,
  ZapIcon,
} from '@askrjs/lucide';

import { SiteFrame } from '../../components/site-shell';
import { PageSection } from '../../components/page-primitives/section';
import {
  CodeWindow,
  IconFeatureList,
  ProofStrip,
} from '../../components/site-primitives';
import type { IconFeature } from '../../components/site-primitives';

const features: IconFeature[] = [
  {
    icon: ZapIcon,
    title: 'Fine-grained reactivity',
    description:
      'state() and derive() propagate changes directly to the nodes that read them.',
  },
  {
    icon: NetworkIcon,
    title: 'Actor-backed updates',
    description:
      'Each reactive unit has a traceable update boundary, so data flow stays explainable.',
  },
  {
    icon: RouteIcon,
    title: 'One route contract',
    description:
      'The same route table can drive SPA, SSR, and static generation output.',
  },
  {
    icon: WorkflowIcon,
    title: 'Async with resource()',
    description:
      'Cancellation, loading state, and error handling are explicit at the data boundary.',
  },
];

const codeExample = `import { state, derive } from "@askrjs/askr";

export function Counter() {
  const [count, setCount] = state(0);
  const doubled = derive(() => count() * 2);

  return (
    <button onPress={() => setCount((value) => value + 1)}>
      Count {count()} / doubled {doubled()}
    </button>
  );
}`;

function RuntimeBench() {
  const [count, setCount] = state(3);
  const doubled = derive(() => count() * 2);
  const routeCount = derive(() => count() + 4);

  return (
    <div class="runtime-bench" aria-label="Live runtime example">
      <div class="runtime-bench-readout">
        <span>state</span>
        <strong>{count()}</strong>
      </div>
      <div class="runtime-bench-readout">
        <span>derive</span>
        <strong>{doubled()}</strong>
      </div>
      <div class="runtime-bench-readout">
        <span>routes</span>
        <strong>{routeCount()}</strong>
      </div>
      <div class="runtime-bench-controls">
        <Button onPress={() => setCount((value) => Math.max(0, value - 1))}>
          Decrease
        </Button>
        <Button onPress={() => setCount((value) => value + 1)}>Increase</Button>
      </div>
    </div>
  );
}

export function FrameworkPage() {
  return (
    <SiteFrame>
      <main class="site-main">
        <section class="product-hero framework-hero">
          <div class="container product-hero-grid">
            <div>
              <span class="section-kicker">askr runtime</span>
              <h1>Fine-grained state, shared routes, static output.</h1>
              <p>
                Askr keeps the runtime small and the mental model direct: state
                changes flow to the DOM nodes that read them, and the route
                table remains the source of truth across render modes.
              </p>
              <div class="landing-hero-ctas">
                <Link
                  href="/docs/getting-started/installation"
                  class="cta-primary"
                >
                  Get started
                </Link>
                <Link href="/showcase/askr" class="cta-secondary">
                  Runtime reference
                </Link>
              </div>
            </div>
            <div class="product-proof-panel">
              <div class="pipeline-row">
                <BracesIcon size={18} />
                <span>state()</span>
              </div>
              <div class="pipeline-row">
                <GitBranchIcon size={18} />
                <span>derive()</span>
              </div>
              <div class="pipeline-row">
                <PackageCheckIcon size={18} />
                <span>SSG route output</span>
              </div>
            </div>
          </div>
        </section>

        <div class="container">
          <ProofStrip
            items={[
              {
                value: 'small',
                label: 'Core runtime',
                detail: 'small enough to inspect',
              },
              {
                value: '0',
                label: 'Runtime dependencies',
                detail: 'no runtime dependency chain',
              },
              {
                value: '3',
                label: 'Render modes',
                detail: 'SPA, SSR, and SSG',
              },
            ]}
          />

          <PageSection
            className="section-band"
            kicker="Runtime contract"
            title="The runtime model is small enough to inspect"
            description="Use state() for writable values, derive() for computed reads, resource() for async data, and routes for delivery. Each piece has a clear job."
          >
            <IconFeatureList features={features} />
          </PageSection>

          <section class="proof-split">
            <div>
              <span class="section-kicker">Example</span>
              <h2>Reactive state without component churn</h2>
              <p>
                Change a signal and only the reads that depend on it update.
                That keeps interaction code local without forcing a full page
                rerender.
              </p>
              <Link
                href="/docs/foundations/actor-model"
                class="text-link"
              >
                Read the actor model
              </Link>
            </div>
            <RuntimeBench />
          </section>

          <section class="proof-split">
            <CodeWindow
              label="counter.tsx"
              meta="state + derive"
              code={codeExample}
            />
            <div>
              <span class="section-kicker">Render modes</span>
              <h2>One route inventory, three delivery choices</h2>
              <p>
                Use the same route registry for app navigation, request-time
                rendering, and static HTML generation. Choose the delivery mode
                by content freshness, not by rewriting pages.
              </p>
              <table class="docs-table runtime-mode-table">
                <thead>
                  <tr>
                    <th>Mode</th>
                    <th>Best fit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>SPA</td>
                    <td>Interactive apps with client-owned transitions.</td>
                  </tr>
                  <tr>
                    <td>SSR</td>
                    <td>Fresh HTML at request time.</td>
                  </tr>
                  <tr>
                    <td>SSG</td>
                    <td>Docs, marketing pages, and reference routes as files.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <PageSection
            className="section-band"
            kicker="Next"
            title="Build the first route, then inspect the output"
            description="Start with installation, render the first page, then use the SSG guide to inspect the generated files."
          >
            <div class="next-step-row">
              <Link href="/docs/getting-started/quick-start">
                Quick start
                <GaugeIcon size={16} />
              </Link>
              <Link href="/docs/guides/ssg-overview">
                Routing and SSG
                <RouteIcon size={16} />
              </Link>
              <Link href="/docs/guides/deployment-and-hosting">
                Deploy output
                <PackageCheckIcon size={16} />
              </Link>
            </div>
          </PageSection>
        </div>
      </main>
    </SiteFrame>
  );
}
