import { Link } from '@askrjs/askr/router';
import {
  ArrowRightIcon,
  BookOpenIcon,
  ExternalLinkIcon,
  RouteIcon,
} from '@askrjs/lucide';

import { PageSection } from '../../shared/page-primitives/section';
import { DocsPathway } from '../../site/primitives';
import { DocLayout } from './_layout';
import {
  docsFeatured,
  docsLearningPath,
  docsNavSections,
  docsStarterLanes,
} from './content';
import type { DocsNavItem, DocsNavSection } from './content';

function renderFeaturedLink(link: (typeof docsFeatured)[number]) {
  return (
    <Link key={link.href} href={link.href} class="docs-feature-row">
      <span>{link.badge ?? 'Guide'}</span>
      <strong>{link.label}</strong>
      {link.description ? <p>{link.description}</p> : null}
      <ArrowRightIcon size={15} />
    </Link>
  );
}

function renderDocsStarter(
  link: DocsNavItem | (typeof docsStarterLanes.links)[number]
) {
  return (
    <Link key={link.href} href={link.href} class="docs-starter-row">
      <span>{link.badge ?? 'Lane'}</span>
      <strong>{link.label}</strong>
      {link.description ? <p>{link.description}</p> : null}
    </Link>
  );
}

function renderDocsRow(item: DocsNavItem) {
  return (
    <Link key={item.href} href={item.href} class="docs-reference-row">
      <span>{item.section}</span>
      <strong>{item.label}</strong>
      <p>{item.goal ?? item.description}</p>
      <small>{item.outcome ?? item.nextLabel ?? 'Open guide'}</small>
    </Link>
  );
}

export function DocsIndexPage() {
  const learningLookup = new Map(
    docsNavSections.flatMap((section) =>
      section.items.map((item) => [item.href, item])
    )
  );

  return (
    <DocLayout
      title="Documentation"
      intro="A practical path for building Askr apps, docs, and static output from the same route model."
    >
      <section class="docs-hub-hero">
        <div>
          <span class="docs-kicker">Start here</span>
          <h2>Start with a working route, then choose how it renders.</h2>
          <p>
            The docs move from install to routing, rendering, styling, testing,
            deployment, and troubleshooting.
          </p>
        </div>
        <div class="docs-hub-actions">
          <Link class="cta-primary" href="/docs/start">
            Open onboarding lane
          </Link>
          <Link class="cta-secondary" href="/framework">
            Open runtime overview
          </Link>
        </div>
      </section>

      <section class="docs-feature-rows">
        {docsFeatured.map(renderFeaturedLink)}
      </section>

      <PageSection
        className="section-band"
        kicker="Learning spine"
        title="From install to generated output"
        description="Follow this path to install Askr, build a route, choose a render mode, add data, style with tokens, and verify the generated files."
      >
        <DocsPathway
          items={docsLearningPath.map((item) => {
            const linkedDoc = learningLookup.get(item.href);
            return {
              stage: item.stage,
              title: item.label,
              description: linkedDoc?.goal ?? item.description,
              href: item.href,
              cta: item.cta,
            };
          })}
        />
      </PageSection>

      <PageSection
        className="section-band"
        kicker="Starter lanes"
        title="Choose the outcome first"
        description="Pick the lane that matches the task you need to finish next."
      >
        <div class="docs-starter-list">
          {docsStarterLanes.links.map(renderDocsStarter)}
        </div>
      </PageSection>

      {docsNavSections.map((section: DocsNavSection) => (
        <section
          key={section.id}
          id={section.id}
          class="docs-reference-section"
        >
          <div class="docs-reference-heading">
            <BookOpenIcon size={18} />
            <div>
              <span class="docs-kicker">{section.title}</span>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
            </div>
          </div>
          <div class="docs-reference-table">
            {section.items.map(renderDocsRow)}
          </div>
        </section>
      ))}

      <section class="docs-context-strip">
        <Link href="/docs/reference/troubleshooting">
          <RouteIcon size={17} />
          Troubleshooting index
        </Link>
        <a
          href="https://github.com/askrjs/askr/blob/main/CHANGELOG.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLinkIcon size={17} />
          Changelog
        </a>
        <a
          href="https://github.com/askrjs/askr/tree/main/examples"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLinkIcon size={17} />
          Examples
        </a>
      </section>
    </DocLayout>
  );
}
