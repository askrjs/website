import { Link } from '@askrjs/askr/router';
import { GitHubLogo } from '@askrjs/logos';
import { MoonIcon, SunIcon } from '@askrjs/lucide';
import { Header, Navbar, NavGroup, NavLink } from '@askrjs/themes/shells';
import {
  ThemeToggle,
  type ThemeToggleRenderContext,
} from '@askrjs/themes/theme';

import { docsStartPath, headerNav } from '../../lib/site-nav';
import { BrandMark } from '../site-primitives';

function HeaderThemeToggle() {
  if (typeof window === 'undefined') {
    return (
      <button
        class="theme-btn header-theme-toggle"
        type="button"
        aria-label="Toggle light and dark mode"
        data-theme-control="toggle"
      >
        <SunIcon class="theme-icon" size={16} />
      </button>
    );
  }

  return (
    <ThemeToggle
      class="theme-btn header-theme-toggle"
      aria-label="Toggle light and dark mode"
      themes={['light', 'dark']}
    >
      {({ theme }: ThemeToggleRenderContext) =>
        theme === 'dark' ? (
          <MoonIcon key="theme-dark" class="theme-icon" size={16} />
        ) : (
          <SunIcon key="theme-light" class="theme-icon" size={16} />
        )
      }
    </ThemeToggle>
  );
}

export function SiteHeader() {
  return (
    <Header class="site-header" position="sticky">
      <div class="container topbar">
        <Link href="/" class="brand header-brand" aria-label="Askr home">
          <BrandMark />
        </Link>
        <Navbar
          id="site-navbar"
          class="site-navbar"
          breakpoint="md"
          collapseLabel="Menu"
          aria-label="Primary navigation"
        >
          <NavGroup align="center" class="site-nav-group">
            {headerNav.map((link) => (
              <NavLink href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </NavGroup>
          <NavGroup align="end" class="header-actions">
            <NavLink
              href={docsStartPath}
              class="header-start"
              aria-label="Start building with Askr"
              match="exact"
            >
              Start
            </NavLink>
            <a
              href="https://github.com/askrjs/askr"
              target="_blank"
              rel="noopener noreferrer"
              class="header-github"
              aria-label="View on GitHub"
            >
              <GitHubLogo title="GitHub" size={18} />
            </a>
          </NavGroup>
        </Navbar>
        <HeaderThemeToggle />
      </div>
    </Header>
  );
}
