import type { Props } from '@askrjs/askr';
import { ThemeScope } from '@askrjs/themes/theme';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

export function SiteLayout({
  variant,
  children,
}: Props & { variant: 'marketing' | 'docs' }) {
  return (
    <ThemeScope defaultTheme="light" storageKey="askr-theme">
      <div class="site-shell" data-layout={variant}>
        <SiteHeader />
        <main class="site-main">{children}</main>
        <SiteFooter />
      </div>
    </ThemeScope>
  );
}
