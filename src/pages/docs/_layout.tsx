import { state } from '@askrjs/askr';
import { Link } from '@askrjs/askr/router';
import { BookOpenIcon } from '@askrjs/lucide';
import { Flex, Stack } from '@askrjs/themes/layouts';
import {
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@askrjs/themes/navs';
import { Separator } from '@askrjs/themes/surfaces';

import type { Props } from '../../types/props';
import type { DocMeta } from './_types';
import { docsNavSections, findDocsNavItemBySlug } from './_content';
import { SiteFrame } from '../../components/site-shell';
import { DocsMetaPanel } from './_meta-panel';
import { DocsSidebar } from './_sidebar';
import { TocSidebar } from './_toc-sidebar';

export interface DocLayoutProps extends Props {
  title: string;
  intro: string;
  meta?: DocMeta;
  children?: unknown;
}

export function DocLayout(props: DocLayoutProps) {
  const currentItem = props.meta
    ? findDocsNavItemBySlug(props.meta.slug)
    : null;
  const [searchQuery, setSearchQuery] = state('');

  const query = String(searchQuery() ?? '').trim().toLowerCase();
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
          <DocsSidebar
            searchQuery={searchQuery()}
            onSearchInput={setSearchQuery}
            sections={filteredSections}
          />

          <main class="docs-main">
            <Stack class="docs-main-inner" gap="4">
              <Stack asChild gap="3">
                <header class="docs-header">
                  {currentItem ? (
                    <Breadcrumb class="docs-breadcrumb">
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link href="/docs">Docs</Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <span>{currentItem.section}</span>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbCurrent>{currentItem.label}</BreadcrumbCurrent>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  ) : null}
                  <Flex
                    class="docs-header-meta"
                    justify="between"
                    align="center"
                    gap="3"
                    wrap="wrap"
                  >
                    <span class="docs-kicker docs-header-kicker">
                      <BookOpenIcon size={15} />
                      {currentItem?.section ?? 'Documentation'}
                    </span>
                    {currentItem ? (
                      <Link href="/docs" class="docs-header-back">
                        ← Docs
                      </Link>
                    ) : null}
                  </Flex>
                  <h1>{props.title}</h1>
                  <p>{props.intro}</p>
                  <DocsMetaPanel item={currentItem} />
                </header>
              </Stack>

              <Separator class="docs-rule" decorative />
              <article class="docs-article">{props.children}</article>
            </Stack>
          </main>

          {hasToc ? <TocSidebar toc={toc} /> : null}
        </div>
      </div>
    </SiteFrame>
  );
}
