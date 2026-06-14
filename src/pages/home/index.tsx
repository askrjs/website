import { state } from '@askrjs/askr';
import { Button } from '@askrjs/themes/controls';
import {
  ArrowRightIcon,
  BracesIcon,
  CodeXmlIcon,
  GitBranchIcon,
  PackageCheckIcon,
  RadarIcon,
  RouteIcon,
  WaypointsIcon,
} from '@askrjs/lucide';

import { SiteFrame } from '../../components/site-shell';
import { SiteAnchor } from '../../components/site-link';
import {
  CodeWindow,
  DocsPathway,
  ProofStrip,
  SectionBand,
  SignalHero,
} from '../../components/site-primitives';
import { createHomeModel } from '../shared/page-models';
import { docsStartPath } from '../shared/content';
import type { SiteLink } from '../shared/content';

interface HomeSection {
  kicker: string;
  title: string;
  description: string;
  links: SiteLink[];
}

interface LaunchStep {
  phase: string;
  title: string;
  detail: string;
  href: string;
  cta: string;
}

interface ArchitectureNode {
  title: string;
  claim: string;
  snippet: string;
  href: string;
  cta: string;
}

interface HomeStat {
  value: string;
  label: string;
}

function RuntimeSignalMap() {
  const [count, setCount] = state(2);

  return (
    <div class="runtime-map" aria-label="Interactive runtime signal map">
      <div class="runtime-map-topline">
        <span>route:/</span>
        <span>state:{count()}</span>
      </div>
      <div class="runtime-map-grid">
        <article class="runtime-node source">
          <BracesIcon size={18} />
          <strong>state()</strong>
          <span>local signal {count()}</span>
        </article>
        <article class="runtime-node">
          <GitBranchIcon size={18} />
          <strong>derive()</strong>
          <span>computed only where used</span>
        </article>
        <article class="runtime-node route">
          <RouteIcon size={18} />
          <strong>route()</strong>
          <span>registry shared by SPA, SSR, SSG</span>
        </article>
        <article class="runtime-node output">
          <PackageCheckIcon size={18} />
          <strong>SSG</strong>
          <span>static route output</span>
        </article>
        <article class="runtime-node theme">
          <CodeXmlIcon size={18} />
          <strong>tokens</strong>
          <span>theme proof in CSS</span>
        </article>
      </div>
      <div class="runtime-map-controls">
        <Button onPress={() => setCount((value) => Math.max(0, value - 1))}>
          -
        </Button>
        <span>{count()}</span>
        <Button onPress={() => setCount((value) => value + 1)}>+</Button>
      </div>
    </div>
  );
}

function LaunchRail(props: { steps: LaunchStep[] }) {
  return (
    <ol class="launch-path">
      {props.steps.map((step, index) => (
        <li>
          <span>{`0${index + 1}`}</span>
          <small>{step.phase}</small>
          <h3>{step.title}</h3>
          <p>{step.detail}</p>
          <SiteAnchor href={step.href}>
            {step.cta}
            <ArrowRightIcon size={15} />
          </SiteAnchor>
        </li>
      ))}
    </ol>
  );
}

function ArchitecturePass(props: { nodes: ArchitectureNode[] }) {
  return (
    <div class="architecture-pass">
      {props.nodes.map((node, index) => (
        <article>
          <span class="architecture-node-label">{`Layer ${index + 1}`}</span>
          <h3>{node.title}</h3>
          <p>{node.claim}</p>
          <CodeWindow label={node.title} code={node.snippet} />
          <SiteAnchor href={node.href}>
            {node.cta}
            <ArrowRightIcon size={15} />
          </SiteAnchor>
        </article>
      ))}
    </div>
  );
}

function DocsLane(props: { section: HomeSection; index: number }) {
  return (
    <section class={`docs-lane ${props.index % 2 ? 'docs-lane-reverse' : ''}`}>
      <div>
        <span class="section-kicker">{props.section.kicker}</span>
        <h2>{props.section.title}</h2>
        <p>{props.section.description}</p>
      </div>
      <DocsPathway
        items={props.section.links.map((link, index) => ({
          stage: link.badge ?? `Step ${index + 1}`,
          title: link.label,
          description: link.description ?? link.meta ?? 'Open the guide.',
          href: link.href,
          cta: link.cta ?? 'Read guide',
        }))}
      />
    </section>
  );
}

export function HomePage() {
  const model = createHomeModel();

  const sections = model.sections as HomeSection[];
  const launchPath = model.launchPath as LaunchStep[];
  const architecturePass = model.architecturePass as ArchitectureNode[];
  const heroStats = model.stats as HomeStat[];

  return (
    <SiteFrame>
      <main class="site-main home-main">
        <SignalHero
          eyebrow="Precision reactive UI"
          title="Askr"
          intro="A fine-grained framework for static sites, apps, and docs that stay explainable from the first route to production output."
          primary={{
            href: docsStartPath,
            label: 'Start building',
            detail: 'Install, route, ship',
          }}
          secondary={{
            href: '/framework',
            label: 'See the runtime',
            detail: 'State, routing, SSG',
          }}
        >
          <RuntimeSignalMap />
        </SignalHero>

        <div class="container">
          <ProofStrip
            items={heroStats.map((stat) => ({
              value: stat.value,
              label: stat.label,
              detail:
                stat.label === 'Core runtime'
                  ? 'inspectable core'
                  : 'published package surface',
            }))}
          />

          <SectionBand
            kicker="Route to release"
            title="A single path from first page to static output"
            description="Every marketing claim has a matching guide, route, or code artifact. The site teaches the same architecture it uses."
          >
            <LaunchRail steps={launchPath} />
          </SectionBand>

          <SectionBand
            kicker="How it works"
            title="Reactivity, routing, and theme tokens in one model"
            description="Askr keeps the moving parts explicit: state updates stay local, routes can render three ways, and theme tokens carry the visual system."
          >
            <ArchitecturePass nodes={architecturePass} />
          </SectionBand>

          <section class="build-confidence">
            <div>
              <span class="section-kicker">Build with proof</span>
              <h2>{model.featureSection.title}</h2>
              <p>{model.featureSection.description}</p>
            </div>
            <ul>
              <li>
                <RouteIcon size={18} />
                <span>One route registry for SPA, SSR, and SSG.</span>
              </li>
              <li>
                <RadarIcon size={18} />
                <span>Fine-grained updates avoid broad render churn.</span>
              </li>
              <li>
                <WaypointsIcon size={18} />
                <span>
                  Docs, examples, and product pages share the same path.
                </span>
              </li>
              <li>
                <CodeXmlIcon size={18} />
                <span>Theme tokens stay inspectable in ordinary CSS.</span>
              </li>
            </ul>
          </section>

          {sections.map((section, index) => (
            <DocsLane section={section} index={index} />
          ))}

          <section class="home-final">
            <span class="section-kicker">Next move</span>
            <h2>Start with one route, then keep the system honest.</h2>
            <p>
              The fastest way to evaluate Askr is to install the stack, render a
              first page, and inspect how little framework machinery sits
              between state and output.
            </p>
            <div class="home-confidence-grid">
              <SiteAnchor href={docsStartPath} className="home-confidence-link">
                Open onboarding lane
              </SiteAnchor>
              <SiteAnchor
                href="/docs"
                className="home-confidence-link home-confidence-link-muted"
              >
                Open docs hub
              </SiteAnchor>
              <SiteAnchor
                href="/showcase/askr"
                className="home-confidence-link home-confidence-link-muted"
              >
                Inspect runtime reference
              </SiteAnchor>
            </div>
          </section>
        </div>
      </main>
    </SiteFrame>
  );
}
