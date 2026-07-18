import { state, type Props } from '@askrjs/askr';
import { Link, currentRoute } from '@askrjs/askr/router';
import {
  BookOpenIcon,
  CompassIcon,
  Layers3Icon,
  LibraryIcon,
  MenuIcon,
  MonitorIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  PanelsTopLeftIcon,
  RocketIcon,
  RouteIcon,
  ServerIcon,
  WrenchIcon,
  XIcon,
} from '@askrjs/lucide';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@askrjs/themes/components';
import { ThemeScope } from '@askrjs/themes/theme';
import { AskrBrand, GitHubMark, SiteThemeToggle } from '../_layout';
import { docsByRoute, docsSections } from './catalog';
import { DocsSearch } from './search';

const STORAGE_KEY = 'askr-docs-sidebar-collapsed';
const adoptedShells = new WeakSet<HTMLElement>();

function DocsNavigation({
  activePath,
  collapsed = false,
  close,
}: {
  activePath: string;
  collapsed?: boolean;
  close?: () => void;
}) {
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
    <SidebarContent
      as="nav"
      class="docs-sidebar-nav"
      aria-label="Documentation navigation"
    >
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
          <div key={section.id}>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    active={active}
                    tooltip={collapsed ? section.label : undefined}
                    tooltipSide="right"
                  >
                    <Link href={section.landingRoute} onClick={close}>
                      <SectionIcon size={18} aria-hidden="true" />
                      <span>{section.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
              {active && !collapsed && (
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
          </div>
        );
      })}
    </SidebarContent>
  );
}

function TableOfContents({ activePath }: { activePath: string }) {
  const page = docsByRoute.get(activePath as `/docs${string}`);
  const headings = page
    ? [{ id: 'how-to-use', title: 'How to use it' }, ...page.headings]
    : [{ id: 'exports', title: 'Exports' }];
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
  const collapsed = state(false);
  const drawerOpen = state(false);
  const activePath = currentRoute().path;
  const setCollapsed = (value: boolean) => {
    collapsed.set(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(value));
    } catch {}
  };
  return (
    <ThemeScope defaultTheme="light" storageKey="askr-theme">
      <div
        class="docs-shell"
        data-layout="docs"
        data-sidebar-collapsed={collapsed() ? 'true' : 'false'}
        ref={(element: HTMLElement | null) => {
          if (!element || adoptedShells.has(element)) return;
          adoptedShells.add(element);
          try {
            collapsed.set(window.localStorage.getItem(STORAGE_KEY) === 'true');
          } catch {}
          window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') drawerOpen.set(false);
          });
        }}
      >
        <Sidebar
          class="docs-sidebar-shell"
          collapsible={collapsed() ? 'icon' : 'none'}
        >
          <SidebarHeader class="docs-sidebar-shell__header">
            <AskrBrand compact={collapsed()} />
            <SidebarTrigger
              aria-label={
                collapsed()
                  ? 'Expand docs navigation'
                  : 'Collapse docs navigation'
              }
              aria-pressed={collapsed()}
              onClick={() => setCollapsed(!collapsed())}
            >
              {collapsed() ? (
                <PanelLeftOpenIcon size={18} aria-hidden="true" />
              ) : (
                <PanelLeftCloseIcon size={18} aria-hidden="true" />
              )}
            </SidebarTrigger>
          </SidebarHeader>
          {!collapsed() && <DocsSearch />}
          <DocsNavigation activePath={activePath} collapsed={collapsed()} />
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={collapsed() ? 'GitHub' : undefined}
                  tooltipSide="right"
                >
                  <a href="https://github.com/askrjs">
                    <GitHubMark />
                    <span>GitHub</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SiteThemeToggle />
          </SidebarFooter>
        </Sidebar>
        <header class="docs-mobile-header">
          <button
            class="icon-button"
            type="button"
            aria-label="Open documentation navigation"
            aria-expanded={drawerOpen()}
            onClick={() => drawerOpen.set(true)}
          >
            <MenuIcon size={20} aria-hidden="true" />
          </button>
          <AskrBrand />
          <DocsSearch />
          <SiteThemeToggle />
        </header>
        {drawerOpen() && (
          <div
            class="docs-drawer-backdrop"
            role="presentation"
            onClick={(event: Event) => {
              if (event.target === event.currentTarget) drawerOpen.set(false);
            }}
          >
            <Sidebar
              class="docs-drawer"
              collapsible="none"
              aria-label="Documentation navigation"
            >
              <SidebarHeader class="docs-sidebar-shell__header">
                <AskrBrand />
                <SidebarTrigger
                  aria-label="Close documentation navigation"
                  onClick={() => drawerOpen.set(false)}
                >
                  <XIcon size={20} aria-hidden="true" />
                </SidebarTrigger>
              </SidebarHeader>
              <DocsNavigation
                activePath={activePath}
                close={() => drawerOpen.set(false)}
              />
            </Sidebar>
          </div>
        )}
        <main class="docs-main">
          <div class="docs-content">{children}</div>
        </main>
        <TableOfContents activePath={activePath} />
      </div>
    </ThemeScope>
  );
}
