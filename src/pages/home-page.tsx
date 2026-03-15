import { jsx } from '../runtime/jsx';

import { LinkCardGrid } from '../components/cards';
import { SiteShell } from '../components/site-shell';
import { ecosystemBands, homeHeroLinks } from '../site/content';

function heroAction(link: { href: string; label: string; cta?: string }) {
  return (
    <a class="hero-action" href={link.href}>
      <strong>{link.label}</strong>
      <span>{link.cta ?? 'Open'}</span>
    </a>
  );
}

export function HomePage() {
  return (
    <SiteShell
      title="Askr Ecosystem"
      intro="A product-style hub for the askr runtime, UI primitives, themes, and the docs that tie them together."
      heroChildren={
        <div>
          <div class="hero-actions">{homeHeroLinks.map(heroAction)}</div>
          <div class="hero-stats">
            <article>
              <strong>4</strong>
              <span>core paths</span>
            </article>
            <article>
              <strong>2</strong>
              <span>theme modes</span>
            </article>
            <article>
              <strong>SSG</strong>
              <span>first-class deploy target</span>
            </article>
          </div>
        </div>
      }
    >
      <section class="section-block split-band panel">
        <div>
          <span class="section-kicker">Spotlight</span>
          <h2>One ecosystem, distinct entry points</h2>
          <p>
            Use the runtime showcase for architecture patterns, the UI showcase for accessible
            primitives, and the themes showcase for token-driven styling. The docs hub then
            connects those pieces into install, build, and deployment flows.
          </p>
        </div>
        <ul class="signal-list">
          <li><strong>Runtime</strong><span>deterministic rendering and explicit state</span></li>
          <li><strong>UI</strong><span>headless components with clear contracts</span></li>
          <li><strong>Themes</strong><span>official tokens with light and dark defaults</span></li>
        </ul>
      </section>

      {ecosystemBands.map((section) => (
        <section class="section-block">
          <div class="section-head">
            <span class="section-kicker">Discover</span>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
          <LinkCardGrid links={section.links} />
        </section>
      ))}
    </SiteShell>
  );
}
