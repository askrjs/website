import type { Props } from '@askrjs/askr';
import { Link, currentRoute } from '@askrjs/askr/router';
import {
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
import {
  BookOpenIcon,
  CompassIcon,
  Layers3Icon,
  LibraryIcon,
  MonitorIcon,
  PanelsTopLeftIcon,
  RocketIcon,
  RouteIcon,
  ServerIcon,
  WrenchIcon,
} from '@askrjs/lucide';
import { SiteLayout } from '../site-layout';
import {
  docsByRoute,
  docsSections,
  docsTableOfContents,
  resolveDocsRoute,
} from './catalog';

function DocsNavigation({ close }: { close?: () => void }) {
  const activePath = resolveDocsRoute(currentRoute());
  const sectionIcons = [
    BookOpenIcon,
    RocketIcon,
    Layers3Icon,
    RouteIcon,
    MonitorIcon,
    ServerIcon,
    PanelsTopLeftIcon,
    WrenchIcon,
    CompassIcon,
    LibraryIcon,
  ] as const;

  return (
    <SidebarContent as="nav" aria-label="Documentation navigation">
      {docsSections.map((section, sectionIndex) => {
        const active = section.pages.some((page) => page.route === activePath);
        const SectionIcon = sectionIcons[sectionIndex] ?? BookOpenIcon;
        const subsections = section.pages.reduce((groups, page) => {
          const label = page.navSection ?? section.label;
          const pages = groups.get(label) ?? [];
          pages.push(page);
          groups.set(label, pages);
          return groups;
        }, new Map<string, (typeof section.pages)[number][]>());

        return (
          <SidebarGroup key={section.id} data-nav-section={section.id}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild active={active}>
                  <Link href={section.landingRoute} onClick={close}>
                    <SectionIcon size={18} aria-hidden="true" />
                    <span>{section.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            {active && (
              <SidebarGroupContent>
                {Array.from(subsections).map(([label, pages]) => (
                  <div key={label}>
                    {label !== section.label && (
                      <SidebarGroupLabel>{label}</SidebarGroupLabel>
                    )}
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
                              aria-current={
                                page.route === activePath ? 'page' : undefined
                              }
                              onClick={close}
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
                  </div>
                ))}
              </SidebarGroupContent>
            )}
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
  return (
    <SiteLayout variant="docs">
      <div class="docs-channel">
        <SidebarScope class="docs-scope">
          <Sidebar collapsible="offcanvas">
            <DocsNavigation />
          </Sidebar>
          <SidebarInset class="docs-main">
            <div class="docs-mobile-bar">
              <SidebarTrigger aria-label="Toggle documentation navigation" />
              <span>Askr documentation</span>
            </div>
            <div class="docs-body">
              <div class="docs-content">{children}</div>
              <TableOfContents />
            </div>
          </SidebarInset>
        </SidebarScope>
      </div>
    </SiteLayout>
  );
}
