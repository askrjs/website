import {
  ArrowRightIcon,
  BookOpenIcon,
  ExternalLinkIcon,
  RouteIcon,
} from '@askrjs/lucide';

import { SiteAnchor } from '../../components/site-link';
import { DocLayout } from '../../components/doc-layout';
import { DocsPathway, SectionBand } from '../../components/site-primitives';
import {
  docsFeatured,
  docsLearningPath,
  docsNavSections,
  docsStarterLanes,
} from '../shared/content';
import type { DocsNavItem, DocsNavSection } from '../shared/content';

function renderFeaturedLink(link: (typeof docsFeatured)[number]) {
  return (
    <SiteAnchor href={link.href} className="docs-feature-row">
      <span>{link.badge ?? 'Guide'}</span>
      <strong>{link.label}</strong>
      {link.description ? <p>{link.description}</p> : null}
      <ArrowRightIcon size={15} />
    </SiteAnchor>
  );
}

function renderDocsStarter(
  link: DocsNavItem | (typeof docsStarterLanes.links)[number]
) {
  return (
    <SiteAnchor href={link.href} className="docs-starter-row">
      <span>{link.badge ?? 'Lane'}</span>
      <strong>{link.label}</strong>
      {link.description ? <p>{link.description}</p> : null}
    </SiteAnchor>
  );
}

function renderDocsRow(item: DocsNavItem) {
  return (
    <SiteAnchor href={item.href} className="docs-reference-row">
      <span>{item.section}</span>
      <strong>{item.label}</strong>
      <p>{item.goal ?? item.description}</p>
      <small>{item.outcome ?? item.nextLabel ?? 'Open guide'}</small>
    </SiteAnchor>
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
      intro="A practical learning system for building Askr apps and static sites without losing the architecture thread."
    >
      <section class="docs-hub-hero">
        <div>
          <span class="docs-kicker">Start here</span>
          <h2>Follow one path from install to deployable output.</h2>
          <p>
            The docs are organized as a spine, not a pile: install, route,
            render, style, test, deploy, and troubleshoot.
          </p>
        </div>
        <div class="docs-hub-actions">
          <SiteAnchor className="cta-primary" href="/docs/start">
            Open onboarding lane
          </SiteAnchor>
          <SiteAnchor className="cta-secondary" href="/framework">
            See framework proof
          </SiteAnchor>
        </div>
      </section>

      <section class="docs-feature-rows">
        {docsFeatured.map(renderFeaturedLink)}
      </section>

      <SectionBand
        kicker="Learning spine"
        title="From first install to production output"
        description="Use this rail when you want the framework, UI, themes, and SSG model to stay connected."
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
      </SectionBand>

      <SectionBand
        kicker="Starter lanes"
        title="Choose the outcome first"
        description="These lanes keep common starts short without hiding the next guide."
      >
        <div class="docs-starter-list">
          {docsStarterLanes.links.map(renderDocsStarter)}
        </div>
      </SectionBand>

      {docsNavSections.map((section: DocsNavSection) => (
        <section id={section.id} class="docs-reference-section">
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
        <SiteAnchor href="/docs/reference/troubleshooting">
          <RouteIcon size={17} />
          Troubleshooting index
        </SiteAnchor>
        <SiteAnchor href="https://github.com/nickrepa/askr/blob/main/CHANGELOG.md">
          <ExternalLinkIcon size={17} />
          Changelog
        </SiteAnchor>
        <SiteAnchor href="https://github.com/nickrepa/askr/tree/main/examples">
          <ExternalLinkIcon size={17} />
          Examples
        </SiteAnchor>
      </section>
    </DocLayout>
  );
}
