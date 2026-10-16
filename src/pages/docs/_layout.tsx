import { state, type Props } from '@askrjs/askr';
import { Link, currentRoute } from '@askrjs/askr/router';
import { MenuIcon, XIcon } from '@askrjs/lucide';
import {
  Container,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  SidebarInset,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarScope,
  SidebarTrigger,
} from '@askrjs/themes/components';
import { SiteLayout } from '../site-layout';
import { docsPrimarySections } from './primary-sections';
import type { DocsPageDefinition } from './types';
import {
  docsByRoute,
  docsSections,
  docsTableOfContents,
  resolveDocsRoute,
} from './catalog';

function DocsSectionNavigation() {
  const page = docsByRoute.get(resolveDocsRoute(currentRoute()));
  return (
    <nav class="docs-section-nav" aria-label="Documentation sections">
      <div class="docs-section-nav__inner">
        {docsPrimarySections.map((section) => (
          <Link
            key={section.route}
            href={section.route}
            aria-current={page?.navGroup === section.label ? 'true' : undefined}
          >
            {section.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function DocsNavigationLinks({
  pages,
  close,
}: {
  pages: readonly DocsPageDefinition[];
  close?: () => void;
}) {
  const activePath = resolveDocsRoute(currentRoute());
  return (
    <SidebarMenu>
      {pages.map((page) => (
        <SidebarMenuItem key={page.route}>
          <SidebarMenuButton
            asChild
            active={page.route === activePath}
            size="sm"
          >
            <Link
              href={page.route}
              aria-current={page.route === activePath ? 'page' : undefined}
              onPress={close}
            >
              <span>{page.title}</span>
              {page.status !== 'stable' && (
                <span class="docs-sidebar-nav__status" title={page.status}>
                  •
                </span>
              )}
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

function DocsNavigation({ close }: { close?: () => void }) {
  const activePath = resolveDocsRoute(currentRoute());
  const page = docsByRoute.get(activePath);
  const section =
    docsSections.find((candidate) => candidate.label === page?.navGroup) ??
    docsSections[0];
  const groups = [
    ...new Set(section.pages.map((item) => item.navSection ?? section.label)),
  ];

  return (
    <SidebarContent as="nav" aria-label="Documentation navigation">
      <SidebarGroup data-nav-section={section.id}>
        <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
        <SidebarGroupContent>
          {groups.length === 1 ? (
            <DocsNavigationLinks pages={section.pages} close={close} />
          ) : (
            groups.map((group) => {
              const pages = section.pages.filter(
                (item) => (item.navSection ?? section.label) === group
              );
              return (
                <details
                  class="docs-nav-group"
                  key={group}
                  open={pages.some((item) => item.route === activePath)}
                >
                  <summary>{group}</summary>
                  <DocsNavigationLinks pages={pages} close={close} />
                </details>
              );
            })
          )}
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

function TableOfContents() {
  const page = docsByRoute.get(resolveDocsRoute(currentRoute()));
  const headings = page ? docsTableOfContents(page) : [];
  if (!headings.length) return null;

  return <TableOfContentsLinks headings={headings} />;
}

function TableOfContentsLinks({
  headings,
}: {
  headings: ReturnType<typeof docsTableOfContents>;
}) {
  return (
    <aside class="docs-toc" aria-label="On this page">
      <p>On this page</p>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`}>{heading.title}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function DocsLayout({ children }: Props) {
  const mobileNavigationOpen = state(false);

  return (
    <SiteLayout variant="docs">
      <DocsSectionNavigation />
      <Container direction="column" size="xl" class="docs-channel">
        <SidebarScope class="docs-scope">
          <Sidebar class="docs-desktop-sidebar">
            <DocsNavigation />
          </Sidebar>
          <SidebarInset class="docs-main">
            <div class="docs-mobile-bar">
              <Sheet
                open={mobileNavigationOpen()}
                onOpenChange={mobileNavigationOpen.set}
              >
                <SheetTrigger asChild>
                  <SidebarTrigger aria-label="Open documentation navigation">
                    <MenuIcon size={18} aria-hidden="true" />
                  </SidebarTrigger>
                </SheetTrigger>
                <SheetPortal>
                  <SheetOverlay />
                  <SheetContent side="left" class="docs-mobile-sheet">
                    <SheetHeader class="docs-mobile-sheet__header">
                      <SheetTitle>Documentation</SheetTitle>
                      <SheetClose aria-label="Close documentation navigation">
                        <XIcon size={18} aria-hidden="true" />
                      </SheetClose>
                    </SheetHeader>
                    <DocsNavigation
                      close={() => mobileNavigationOpen.set(false)}
                    />
                  </SheetContent>
                </SheetPortal>
              </Sheet>
              <span>Askr documentation</span>
            </div>
            <div class="docs-body">
              <div class="docs-content">{children}</div>
              <TableOfContents />
            </div>
          </SidebarInset>
        </SidebarScope>
      </Container>
    </SiteLayout>
  );
}
