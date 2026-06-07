import type { Props } from "../types/props";
import { Button } from "@askrjs/askr-ui/primitives/button";
import { primaryNav, type SiteLink } from "../pages/shared/content";
import { SiteAnchor } from "./site-link";

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
  if (typeof document === "undefined") return;
  const element = document.documentElement;
  const nextTheme = element.getAttribute("data-theme") === "dark" ? "light" : "dark";
  element.setAttribute("data-theme", nextTheme);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("theme", nextTheme);
  }
}

function navItem(link: SiteLink) {
  return (
    <li>
      <SiteAnchor href={link.href}>{link.label}</SiteAnchor>
    </li>
  );
}

export function SiteFrame(props: SiteFrameProps) {
  return (
    <>
      <header>
        <div class="container topbar">
          <SiteAnchor href="/" className="brand" aria-label="Askr home">
            askr
          </SiteAnchor>
          <nav>
            <ul>{primaryNav.map(navItem)}</ul>
          </nav>
          <div class="header-actions">
            <a
              href="https://github.com/nickrepa/askr"
              target="_blank"
              rel="noopener noreferrer"
              class="header-github"
              aria-label="View on GitHub"
            >
              GitHub
            </a>
            <Button
              id="theme-toggle"
              class="theme-btn"
              aria-label="Toggle light/dark mode"
              onPress={toggleTheme}
            />
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
                  <SiteAnchor href="/docs/getting-started/installation">Get Started</SiteAnchor>
                </li>
                <li>
                  <SiteAnchor href="/docs/guides/ssg-overview">Guides</SiteAnchor>
                </li>
              </ul>
            </div>
            <div class="footer-col">
              <strong>Community</strong>
              <ul>
                <li>
                  <a href="https://github.com/nickrepa/askr" target="_blank" rel="noopener">
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
            Apache-2.0 License &middot; Built with askr, askr-ui, and askr-themes.
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
        <link rel="stylesheet" href="/theme-tokens.css" />
        <link rel="stylesheet" href="/styles.css" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <div id="app">{props.appHtml}</div>
        {props.includeClientScript === false ? null : <script type="module" src="/app.js" />}
      </body>
    </html>
  );
}
