import { route } from "@askrjs/askr/router";
import { Separator } from "@askrjs/askr-ui/primitives/separator";

import type { Props } from "../types/props";
import type { DocMeta, TocEntry } from "../pages/shared/doc-types";
import {
  docsNavSections,
  findDocsNavItemBySlug,
  type DocsNavItem,
  type DocsNavSection,
} from "../pages/shared/content";
import { SiteAnchor } from "./site-link";
import { SiteFrame } from "./site-shell";

export interface DocLayoutProps extends Props {
  title: string;
  intro: string;
  meta?: DocMeta;
  children?: unknown;
}

function renderSidebarItem(item: DocsNavItem, currentPath: string) {
  const current = currentPath === item.href;

  return (
    <li>
      <SiteAnchor
        href={item.href}
        className={current ? "docs-nav-link current" : "docs-nav-link"}
        aria-current={current ? "page" : undefined}
      >
        <span>{item.label}</span>
      </SiteAnchor>
    </li>
  );
}

function renderSidebarSection(section: DocsNavSection, currentPath: string) {
  return (
    <section class="docs-sidebar-section">
      <h2>{section.title}</h2>
      <ul>{section.items.map((item) => renderSidebarItem(item, currentPath))}</ul>
    </section>
  );
}

function TocSidebar(props: { toc: TocEntry[] }) {
  return (
    <aside class="docs-toc">
      <div class="docs-toc-inner">
        <p class="docs-toc-heading">On this page</p>
        <ul class="docs-toc-list">
          {props.toc.map((entry) => (
            <li>
              <a href={`#${entry.id}`} class="docs-toc-link">
                {entry.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export function DocLayout(props: DocLayoutProps) {
  const currentRoute = route();
  const currentPath = currentRoute.path;
  const currentItem = props.meta
    ? findDocsNavItemBySlug(props.meta.slug)
    : null;

  const toc = props.meta?.toc;
  const hasToc = toc && toc.length > 0;

  return (
    <SiteFrame>
      <div class="container docs-page">
        <div class={hasToc ? "docs-shell has-toc" : "docs-shell"}>
          <aside class="docs-sidebar">
            <div class="docs-sidebar-inner">
              <SiteAnchor href="/docs" className="docs-sidebar-home">
                <span class="docs-sidebar-kicker">Documentation</span>
                <strong>Askr Docs</strong>
              </SiteAnchor>
              <Separator class="docs-rule" decorative />
              <nav class="docs-sidebar-nav">
                {docsNavSections.map((section) =>
                  renderSidebarSection(section, currentPath),
                )}
              </nav>
            </div>
          </aside>

          <main class="docs-main">
            <div class="docs-main-inner">
              <header class="docs-header">
                <div class="docs-header-meta">
                  <span class="docs-kicker">
                    {currentItem?.section ?? "Documentation"}
                  </span>
                  {currentItem ? (
                    <SiteAnchor href="/docs" className="docs-header-back">
                      ← Docs
                    </SiteAnchor>
                  ) : null}
                </div>
                <h1>{props.title}</h1>
                <p>{props.intro}</p>
              </header>

              <Separator class="docs-rule" decorative />
              <article class="docs-article">{props.children}</article>
            </div>
          </main>

          {hasToc ? <TocSidebar toc={toc} /> : null}
        </div>
      </div>
    </SiteFrame>
  );
}
