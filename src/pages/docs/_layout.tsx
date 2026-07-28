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
import {
  docsByRoute,
  docsSections,
  docsTableOfContents,
  resolveDocsRoute,
} from './catalog';

function DocsNavigation({ close }: { close?: () => void }) {
  const activePath = resolveDocsRoute(currentRoute());

  return (
    <SidebarContent as="nav" aria-label="Documentation navigation">
      {docsSections.map((section) => {
        return (
          <SidebarGroup key={section.id} data-nav-section={section.id}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.pages.map((page) => (
                  <SidebarMenuItem key={page.route}>
                    <SidebarMenuButton
                      asChild
                      active={page.route === activePath}
                      size="sm"
                    >
                      <Link
                        href={page.route}
                        aria-current={
                          page.route === activePath ? 'page' : undefined
                        }
                        onClickCapture={close}
                      >
                        <span>{page.title}</span>
                        {page.status !== 'stable' && (
                          <span
                            class="docs-sidebar-nav__status"
                            title={page.status}
                          >
                            •
                          </span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        );
      })}
    </SidebarContent>
  );
}

function TableOfContents() {
  const page = docsByRoute.get(resolveDocsRoute(currentRoute()));
  const headings = page ? docsTableOfContents(page) : [];
  if (!headings.length) return null;

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
      <Container size="xl" class="docs-channel">
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
