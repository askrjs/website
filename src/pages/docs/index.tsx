import { DocLayout } from "../../components/doc-layout";
import { Badge } from "@askrjs/askr-ui/primitives/badge";
import {
  docsFeatured,
  docsNavSections,
} from "../shared/content";

function renderFeaturedLink(link: (typeof docsFeatured)[number]) {
  return (
    <SiteAnchor href={link.href} className="docs-feature-link">
      {link.badge ? <Badge class="badge">{link.badge}</Badge> : null}
      <strong>{link.label}</strong>
      {link.description ? <p>{link.description}</p> : null}
    </SiteAnchor>
  );
}

import { SiteAnchor } from "../../components/site-link";

export function DocsIndexPage() {
  return (
    <DocLayout
      title="Documentation"
      intro="Guides, setup notes, and implementation references for building with askr."
    >
      <section class="docs-landing-section">
        <div class="docs-landing-heading">
          <span class="docs-kicker">Start here</span>
          <h2>Read the pages that establish the stack and workflow</h2>
          <p>
            Begin with installation and quick start, then move into build and
            theming guidance as your app structure firms up.
          </p>
        </div>
        <div class="docs-featured-list">{docsFeatured.map(renderFeaturedLink)}</div>
      </section>

      {docsNavSections.map((section) => (
        <section id={section.id} class="docs-landing-section">
          <div class="docs-landing-heading">
            <span class="docs-kicker">Section</span>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
          <div class="docs-portal-list">
            {section.items.map((item) => (
              <SiteAnchor href={item.href} className="docs-portal-link">
                <div>
                  <strong>{item.label}</strong>
                  {item.description ? <p>{item.description}</p> : null}
                </div>
                <span class="docs-portal-arrow">Open</span>
              </SiteAnchor>
            ))}
          </div>
        </section>
      ))}
    </DocLayout>
  );
}
