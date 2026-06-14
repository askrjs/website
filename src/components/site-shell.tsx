import { currentRoute } from '@askrjs/askr/router';
import { GitHubLogo } from '@askrjs/logos';
import { MenuIcon, MoonIcon, SunIcon, XIcon } from '@askrjs/lucide';
import type { Props } from '../types/props';
import {
  headerNav,
  primaryNav,
  type PrimaryNavItem,
  type SiteLink,
  type SiteNavGroup,
} from '../pages/shared/content';
import { SiteAnchor } from './site-link';
import { BrandMark, IconButton } from './site-primitives';

export interface AppShellProps extends Props {
  title: string;
  intro: string;
  heroChildren?: unknown;
  children?: unknown;
}

export interface SiteFrameProps extends Props {
  children?: unknown;
}

export interface DocumentMeta {
  title: string;
  description?: string;
}

export interface DocumentShellProps extends Props {
  meta: DocumentMeta;
  appHtml: unknown;
  includeClientScript?: boolean;
}

export const themeInitScript = `(function(){var s=localStorage.getItem('theme'),d=document.documentElement;if(s==='dark'||(s===null&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.setAttribute('data-theme','dark');}else{d.setAttribute('data-theme','light');}})();`;

function toggleTheme() {
  if (typeof document === 'undefined') return;
  const element = document.documentElement;
  const nextTheme =
    element.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  element.setAttribute('data-theme', nextTheme);
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', nextTheme);
  }
}

function toggleNavigation() {
  if (typeof document === 'undefined') return;

  const nav = document.querySelector('.site-mobile-nav');
  const button = document.querySelector('.nav-menu-btn');
  const menuIcon = button?.querySelector('.menu-icon');
  const closeIcon = button?.querySelector('.close-icon');
  const nextOpen = button?.getAttribute('aria-expanded') !== 'true';

  nav?.classList.toggle('is-open', nextOpen);
  button?.setAttribute('aria-expanded', nextOpen ? 'true' : 'false');
  menuIcon?.classList.toggle('is-hidden', nextOpen);
  closeIcon?.classList.toggle('is-hidden', !nextOpen);
}

function isNavGroup(item: PrimaryNavItem): item is SiteNavGroup {
  return item.kind === 'group';
}

function isCurrentPath(currentPath: string, href: string) {
  if (href === '/') return currentPath === href;
  return currentPath === href || currentPath.startsWith(`${href}/`);
}

function navLink(link: SiteLink, currentPath: string) {
  const current = isCurrentPath(currentPath, link.href);

  return (
    <SiteAnchor
      className={current ? 'nav-link current' : 'nav-link'}
      href={link.href}
      aria-current={current ? 'page' : undefined}
    >
      {link.label}
    </SiteAnchor>
  );
}

function navGroup(group: SiteNavGroup, currentPath: string) {
  const current = group.links.some((link) =>
    isCurrentPath(currentPath, link.href)
  );

  return (
    <li class={current ? 'nav-group current' : 'nav-group'}>
      <span class="nav-group-label">{group.label}</span>
      <ul class="nav-sub">
        {group.links.map((link) => (
          <li>{navLink(link, currentPath)}</li>
        ))}
      </ul>
    </li>
  );
}

function navItem(item: PrimaryNavItem, currentPath: string) {
  return isNavGroup(item) ? (
    navGroup(item, currentPath)
  ) : (
    <li class="nav-leaf">{navLink(item, currentPath)}</li>
  );
}

function headerNavItem(link: SiteLink, currentPath: string) {
  return <li>{navLink(link, currentPath)}</li>;
}

export function SiteFrame(props: SiteFrameProps) {
  const currentPath = currentRoute().path;

  return (
    <>
      <header class="site-header">
        <div class="container topbar">
          <SiteAnchor href="/" className="brand" aria-label="Askr home">
            <BrandMark />
          </SiteAnchor>
          <nav class="site-nav" aria-label="Primary">
            <ul class="topnav-list">
              {headerNav.map((link) => headerNavItem(link, currentPath))}
            </ul>
          </nav>
          <nav class="site-mobile-nav" aria-label="Primary">
            <ul class="topnav-list">
              {primaryNav.map((item) => navItem(item, currentPath))}
            </ul>
          </nav>
          <div class="header-actions">
            <SiteAnchor
              href="/docs/start"
              className="header-start"
              aria-label="Start building with Askr"
            >
              Start
            </SiteAnchor>
            <a
              href="https://github.com/nickrepa/askr"
              target="_blank"
              rel="noopener noreferrer"
              class="header-github"
              aria-label="View on GitHub"
            >
              <GitHubLogo title="GitHub" size={18} />
            </a>
            <IconButton
              label="Toggle light and dark mode"
              className="theme-btn"
              onPress={toggleTheme}
            >
              <SunIcon class="theme-icon theme-icon-sun" size={16} />
              <MoonIcon class="theme-icon theme-icon-moon" size={16} />
            </IconButton>
            <IconButton
              label="Toggle navigation"
              className="nav-menu-btn"
              aria-expanded="false"
              onPress={toggleNavigation}
            >
              <MenuIcon class="menu-icon" size={18} />
              <XIcon class="close-icon is-hidden" size={18} />
            </IconButton>
          </div>
        </div>
      </header>
      {props.children}

      <footer>
        <div class="container site-footer">
          <div class="footer-grid">
            <div class="footer-col">
              <strong>Ecosystem</strong>
              <ul>
                <li>
                  <SiteAnchor href="/framework">Framework</SiteAnchor>
                </li>
                <li>
                  <SiteAnchor href="/ui">UI</SiteAnchor>
                </li>
                <li>
                  <SiteAnchor href="/themes">Themes</SiteAnchor>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <strong>Reference</strong>
              <ul>
                <li>
                  <SiteAnchor href="/showcase/askr">Runtime</SiteAnchor>
                </li>
                <li>
                  <SiteAnchor href="/showcase/ui">Components</SiteAnchor>
                </li>
                <li>
                  <SiteAnchor href="/showcase/themes">Theme tokens</SiteAnchor>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <strong>Docs</strong>
              <ul>
                <li>
                  <SiteAnchor href="/docs">Documentation</SiteAnchor>
                </li>
                <li>
                  <SiteAnchor href="/docs/getting-started/installation">
                    Get Started
                  </SiteAnchor>
                </li>
                <li>
                  <SiteAnchor href="/docs/guides/ssg-overview">
                    Guides
                  </SiteAnchor>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <strong>Community</strong>
              <ul>
                <li>
                  <a
                    href="https://github.com/nickrepa/askr"
                    target="_blank"
                    rel="noopener"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/@askrjs/askr"
                    target="_blank"
                    rel="noopener"
                  >
                    npm
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="footer-bottom">
            Apache-2.0 License &middot; Built with askr, askr-ui, and
            askr-themes.
          </div>
        </div>
      </footer>
    </>
  );
}

export function AppShell(props: AppShellProps) {
  return (
    <SiteFrame>
      <main class="container app-main">
        <section class="hero">
          <h1>{props.title}</h1>
          <p>{props.intro}</p>
          {props.heroChildren}
        </section>
        {props.children}
      </main>
    </SiteFrame>
  );
}

export function DocumentShell(props: DocumentShellProps) {
  const description = props.meta.description;

  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{props.meta.title} | askr</title>
        {description ? <meta name="description" content={description} /> : null}
        <link rel="icon" type="image/png" href="/assets/askr-logo.png" />
        <link rel="apple-touch-icon" href="/assets/askr-logo.png" />
        <link rel="stylesheet" href="/theme-tokens.css" />
        <link rel="stylesheet" href="/styles.css" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <div id="app">{props.appHtml}</div>
        {props.includeClientScript === false ? null : (
          <script type="module" src="/app.js" />
        )}
      </body>
    </html>
  );
}
