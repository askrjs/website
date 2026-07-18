import { state, type Props } from '@askrjs/askr';
import { Link, currentRoute } from '@askrjs/askr/router';
import {
  BookOpenIcon,
  GitBranchIcon,
  Layers3Icon,
  MenuIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  RocketIcon,
} from '@askrjs/lucide';
import { ThemeScope } from '@askrjs/themes/theme';
import { AskrBrand, SiteThemeToggle } from '../_layout';

const DOCS_SIDEBAR_STORAGE_KEY = 'askr-docs-sidebar-collapsed';

const docsNavigation = [
  { href: '/docs', label: 'Overview', icon: BookOpenIcon },
  {
    href: '/docs/getting-started',
    label: 'Getting started',
    icon: RocketIcon,
  },
  {
    href: '/docs/core-concepts',
    label: 'Core concepts',
    icon: Layers3Icon,
  },
] as const;

function DocsNavigation({
  activePath,
  collapsed,
}: {
  activePath: string;
  collapsed: boolean;
}) {
  return (
    <nav class="docs-nav" aria-label="Documentation navigation">
      <p class="docs-nav__label">Documentation</p>
      <ul>
        {docsNavigation.map(({ href, label, icon: Icon }) => {
          const active = activePath === href;

          return (
            <li key={href}>
              <Link
                class="docs-nav__link"
                data-active={active ? 'true' : undefined}
                href={href}
                aria-current={active ? 'page' : undefined}
                title={collapsed ? label : undefined}
              >
                <Icon size={18} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function DocsLayout({ children }: Props) {
  const collapsed = state(false);
  const persistenceAdopted = state(false);
  const activePath = currentRoute().path;

  const setCollapsed = (nextCollapsed: boolean) => {
    collapsed.set(nextCollapsed);
    try {
      window.localStorage.setItem(
        DOCS_SIDEBAR_STORAGE_KEY,
        String(nextCollapsed)
      );
    } catch {
      // The preference is optional when storage is unavailable.
    }
  };

  return (
    <ThemeScope defaultTheme="light" storageKey="askr-theme">
      <div
        class="docs-shell"
        data-layout="docs"
        data-sidebar-collapsed={collapsed() ? 'true' : 'false'}
        ref={(element: HTMLElement | null) => {
          if (!element || persistenceAdopted()) return;
          persistenceAdopted.set(true);

          try {
            const stored = window.localStorage.getItem(
              DOCS_SIDEBAR_STORAGE_KEY
            );
            if (stored === 'true') collapsed.set(true);
          } catch {
            // Keep the deterministic expanded default.
          }
        }}
      >
        <aside class="docs-sidebar">
          <div class="docs-sidebar__header">
            <AskrBrand compact={collapsed()} />
            <button
              class="icon-button docs-sidebar__toggle"
              type="button"
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
            </button>
          </div>
          <DocsNavigation activePath={activePath} collapsed={collapsed()} />
          <div class="docs-sidebar__footer">
            <a
              class="docs-sidebar__github"
              href="https://github.com/askrjs"
              title={collapsed() ? 'GitHub' : undefined}
            >
              <GitBranchIcon size={18} aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <SiteThemeToggle />
          </div>
        </aside>

        <aside
          class="docs-mobile-rail"
          aria-label="Compact documentation navigation"
        >
          <Link class="icon-button" href="/" aria-label="Askr home">
            <img src="/assets/askr-logo.png" alt="" width="28" height="28" />
          </Link>
          <DocsNavigation activePath={activePath} collapsed />
          <div class="docs-mobile-rail__footer">
            <SiteThemeToggle />
            <MenuIcon size={18} aria-hidden="true" />
          </div>
        </aside>

        <main class="docs-main">
          <div class="docs-content">{children}</div>
        </main>
      </div>
    </ThemeScope>
  );
}
