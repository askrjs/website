import { Link } from '@askrjs/askr/router';
import { GitHubLogo } from '@askrjs/logos';
import { MoonIcon, SunIcon } from '@askrjs/lucide';
import { Header, Navbar, NavGroup, NavLink } from '@askrjs/themes/components';

import { docsStartPath, headerNav } from '../../site/navigation';
import { BrandMark } from '../brand/brand-mark';

function toggleDocumentTheme() {
  if (typeof document === 'undefined') return;

  const currentTheme = document.documentElement.getAttribute('data-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', nextTheme);
  document.documentElement.setAttribute('data-theme-choice', nextTheme);

  try {
    localStorage.setItem('theme', nextTheme);
  } catch {
    // Theme persistence is optional when storage is unavailable.
  }
}

function HeaderThemeToggle() {
  return (
    <button
      type="button"
      class="theme-btn header-theme-toggle"
      aria-label="Toggle light and dark mode"
      data-theme-control="toggle"
      onPress={toggleDocumentTheme}
    >
      <SunIcon class="theme-icon theme-icon-light" size={16} />
      <MoonIcon class="theme-icon theme-icon-dark" size={16} />
    </button>
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
              <NavLink href={link.href}>{link.label}</NavLink>
            ))}
          </NavGroup>
          <NavGroup align="end" class="header-actions">
            <Link
              href={docsStartPath}
              class="header-start"
              aria-label="Start building with Askr"
            >
              Start
            </Link>
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
