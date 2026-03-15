import { Fragment, jsx } from '../runtime/jsx';
import type { Props } from '../types/props';

import { primaryNav, type SiteLink } from '../site/content';

// Runs before body paint to prevent flash of wrong theme.
const initThemeScript = `(function(){var s=localStorage.getItem('theme'),d=document.documentElement;if(s==='dark'||(s===null&&window.matchMedia('(prefers-color-scheme:dark)').matches)){d.setAttribute('data-theme','dark');}else{d.setAttribute('data-theme','light');}})();`;

// Toggle handler — wired after DOM is ready.
const toggleScript = `document.getElementById('theme-toggle').addEventListener('click',function(){var d=document.documentElement,n=d.getAttribute('data-theme')==='dark'?'light':'dark';d.setAttribute('data-theme',n);localStorage.setItem('theme',n);});`;

function navItem(link: SiteLink) {
  return (
    <li>
      <a href={link.href}>{link.label}</a>
    </li>
  );
}

export interface SiteShellProps extends Props {
  title: string;
  intro: string;
  heroChildren?: unknown;
  children?: unknown;
}

export function SiteShell(props: SiteShellProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{props.title} | askr</title>
        <link rel="stylesheet" href="/theme-tokens.css" />
        <link rel="stylesheet" href="/styles.css" />
        <script dangerouslySetInnerHTML={{ __html: initThemeScript }} />
      </head>
      <body>
        <header>
          <div class="container topbar">
            <a href="/" class="brand">
              askr<span>ecosystem site</span>
            </a>
            <nav>
              <ul>{primaryNav.map(navItem)}</ul>
            </nav>
            <button id="theme-toggle" class="theme-btn" aria-label="Toggle light/dark mode" />
          </div>
        </header>

        <main class="container">
          <section class="hero">
            <h1>{props.title}</h1>
            <p>{props.intro}</p>
            {props.heroChildren}
          </section>
          {props.children}
        </main>

        <footer>
          <div class="container">Built with askr SSG for GitHub Pages.</div>
        </footer>
        <script dangerouslySetInnerHTML={{ __html: toggleScript }} />
      </body>
    </html>
  );
}
