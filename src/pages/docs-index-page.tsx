import { jsx } from '../runtime/jsx';

import { LinkCardGrid } from '../components/cards';
import { SiteShell } from '../components/site-shell';
import { docsFeatured, docsSections } from '../site/content';

function docsJump(link: { href: string; label: string }) {
  return <a class="hero-chip" href={link.href}>{link.label}</a>;
}

export function DocsIndexPage() {
  return (
    <SiteShell
      title="Documentation"
      intro="Website-owned docs for learning, implementation, and deployment workflows."
      heroChildren={
        <div>
          <div class="hero-chip-row">{docsSections.map((section) => docsJump({ href: `#${section.title.toLowerCase().replace(/\s+/g, '-')}`, label: section.title }))}</div>
        </div>
      }
    >
      <section class="section-block">
        <div class="section-head">
          <span class="section-kicker">Featured</span>
          <h2>Start with the docs that establish the system</h2>
          <p>These pages explain installation, the initial build path, and how theming fits into the stack.</p>
        </div>
        <LinkCardGrid links={docsFeatured} className="grid-featured" />
      </section>

      {docsSections.map((section) => (
        <section class="section-block" id={section.title.toLowerCase().replace(/\s+/g, '-')}>
          <div class="section-head">
            <span class="section-kicker">Category</span>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
          <LinkCardGrid links={section.links} className="grid-docs" />
        </section>
      ))}
    </SiteShell>
  );
}
