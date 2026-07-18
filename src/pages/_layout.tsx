import type { Props } from '@askrjs/askr';
import { Link } from '@askrjs/askr/router';
import { GitBranchIcon, MoonIcon, SunIcon } from '@askrjs/lucide';
import { Button } from '@askrjs/themes/components';
import { ThemeScope, ThemeToggle } from '@askrjs/themes/theme';

export function AskrBrand({ compact = false }: { compact?: boolean }) {
  return (
    <Link class="site-brand" href="/" aria-label="Askr home">
      <img
        class="site-brand__logo"
        src="/assets/askr-logo.png"
        alt=""
        width="32"
        height="32"
      />
      {!compact && <span>Askr</span>}
    </Link>
  );
}

export function SiteThemeToggle() {
  return (
    <ThemeToggle
      aria-label="Toggle color theme"
      variant="ghost"
      size="icon"
      lightIcon={<SunIcon size={18} aria-hidden="true" />}
      darkIcon={<MoonIcon size={18} aria-hidden="true" />}
    />
  );
}

export function MarketingLayout({ children }: Props) {
  return (
    <ThemeScope defaultTheme="light" storageKey="askr-theme">
      <div class="marketing-shell" data-layout="marketing">
        <header class="site-header">
          <div class="site-header__inner">
            <AskrBrand />
            <nav class="site-nav" aria-label="Primary navigation">
              <Link href="/docs">Docs</Link>
              <a
                class="site-nav__github"
                href="https://github.com/askrjs"
                aria-label="Askr on GitHub"
              >
                <GitBranchIcon size={18} aria-hidden="true" />
                <span>GitHub</span>
              </a>
              <SiteThemeToggle />
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer class="site-footer">
          <div class="site-footer__inner">
            <AskrBrand />
            <p>Full-stack TypeScript, from first route to production.</p>
            <div class="site-footer__links">
              <Link href="/docs">Documentation</Link>
              <Button asChild variant="ghost" size="sm">
                <a href="https://github.com/askrjs">GitHub</a>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </ThemeScope>
  );
}
