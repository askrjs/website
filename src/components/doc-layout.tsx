import { state } from '@askrjs/askr';
import { currentRoute } from '@askrjs/askr/router';
import { BookOpenIcon } from '@askrjs/lucide';
import { Separator } from '../ui/primitives/separator';

import type { Props } from '../types/props';
import type { DocMeta, TocEntry } from '../pages/shared/doc-types';
import {
  docsNavSections,
  findDocsNavItemBySlug,
  type DocsNavItem,
  type DocsNavSection,
} from '../pages/shared/content';
import { SiteAnchor } from './site-link';
import { SiteFrame } from './site-shell';

export interface DocLayoutProps extends Props {
  title: string;
  intro: string;
  meta?: DocMeta;
  children?: unknown;
}

function toggleDocsNavigation() {
  if (typeof document === 'undefined') return;

  const sidebar = document.querySelector('.docs-sidebar');
  const button = document.querySelector('.docs-mobile-nav-toggle');
  const nextOpen = button?.getAttribute('aria-expanded') !== 'true';

  sidebar?.classList.toggle('is-open', nextOpen);
  button?.setAttribute('aria-expanded', nextOpen ? 'true' : 'false');
}

function renderSidebarItem(item: DocsNavItem, currentPath: string) {
  const current = currentPath === item.href;

  return (
    <li>
      <SiteAnchor
        href={item.href}
        className={current ? 'docs-nav-link current' : 'docs-nav-link'}
        aria-current={current ? 'page' : undefined}
      >
        <span>{item.label}</span>
      </SiteAnchor>
    </li>
  );
}

function renderSidebarSection(section: DocsNavSection, currentPath: string) {
  return (
    <section class="docs-sidebar-section">
      <p class="docs-sidebar-section-title">{section.title}</p>
      <ul>
        {section.items.map((item) => renderSidebarItem(item, currentPath))}
      </ul>
    </section>
  );
}

function renderMetaList(items?: string[]) {
  if (!items?.length) return null;

  return (
    <ul class="docs-meta-list">
      {items.map((value) => (
        <li>{value}</li>
      ))}
    </ul>
  );
}

function renderMetaPanel(item: DocsNavItem) {
  if (!item) return null;

  return (
    <div class="docs-meta-panel">
      {item.goal ? (
        <div class="docs-meta-row">
          <span class="docs-meta-label">Goal</span>
          <p>{item.goal}</p>
        </div>
      ) : null}
      {item.outcome ? (
        <div class="docs-meta-row">
          <span class="docs-meta-label">Expected outcome</span>
          <p>{item.outcome}</p>
        </div>
      ) : null}
      {item.prerequisites?.length ? (
        <div class="docs-meta-row">
          <span class="docs-meta-label">Prerequisites</span>
          {renderMetaList(item.prerequisites)}
        </div>
      ) : null}
      {item.next ? (
        <SiteAnchor href={item.next} className="docs-next-link">
          {item.nextLabel ?? 'Continue'}
        </SiteAnchor>
      ) : null}
    </div>
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
  const currentPath = currentRoute().path;
  const currentItem = props.meta
    ? findDocsNavItemBySlug(props.meta.slug)
    : null;
  const [searchQuery, setSearchQuery] = state('');

  const query = searchQuery().trim().toLowerCase();
  const filteredSections = docsNavSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        if (!query) return true;
        const summary = item.description?.toLowerCase() ?? '';
        return (
          item.label.toLowerCase().includes(query) ||
          item.slug.toLowerCase().includes(query) ||
          summary.includes(query)
        );
      }),
    }))
    .filter((section) => section.items.length > 0);

  const toc = props.meta?.toc;
  const hasToc = toc && toc.length > 0;

  return (
    <SiteFrame>
      <div class="container docs-page">
        <div class={hasToc ? 'docs-shell has-toc' : 'docs-shell'}>
          <aside class="docs-sidebar">
            <div class="docs-sidebar-inner">
              <span class="docs-sidebar-kicker">Documentation control room</span>
              <button
                class="docs-mobile-nav-toggle"
                type="button"
                aria-expanded="false"
                onClick={toggleDocsNavigation}
              >
                Browse docs sections
              </button>
              <label class="docs-sidebar-search" for="docs-search">
                <span>Search docs</span>
                <input
                  id="docs-search"
                  type="search"
                  placeholder="Filter pages, guides, and references"
                  value={searchQuery}
                  onInput={(event) => {
                    const target = event.currentTarget as HTMLInputElement;
                    setSearchQuery(target.value);
                  }}
                />
              </label>
              <Separator class="docs-rule" decorative />
              <nav class="docs-sidebar-nav">
                {filteredSections.map((section) =>
                  renderSidebarSection(section, currentPath)
                )}
                {!filteredSections.length ? (
                  <p class="docs-sidebar-empty">No docs pages match that search.</p>
                ) : null}
              </nav>
            </div>
          </aside>

          <main class="docs-main">
            <div class="docs-main-inner">
              <header class="docs-header">
                {currentItem ? (
                  <nav class="docs-breadcrumb" aria-label="Breadcrumb">
                    <SiteAnchor href="/docs">Docs</SiteAnchor>
                    <span>/</span>
                    <span>{currentItem.section}</span>
                    <span>/</span>
                    <span aria-current="page">{currentItem.label}</span>
                  </nav>
                ) : null}
                <div class="docs-header-meta">
                  <span class="docs-kicker docs-header-kicker">
                    <BookOpenIcon size={15} />
                    {currentItem?.section ?? 'Documentation'}
                  </span>
                  {currentItem ? (
                    <SiteAnchor href="/docs" className="docs-header-back">
                      ← Docs
                    </SiteAnchor>
                  ) : null}
                </div>
                <h1>{props.title}</h1>
                <p>{props.intro}</p>
                {currentItem ? renderMetaPanel(currentItem) : null}
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
